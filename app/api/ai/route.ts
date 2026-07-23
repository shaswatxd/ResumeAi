import { generateText, type LanguageModel } from 'ai'
import { createGroq } from '@ai-sdk/groq'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createCerebras } from '@ai-sdk/cerebras'
import { TEMPLATES } from '@/lib/resume-types'

export const maxDuration = 60

/*
 * Provider chain: first configured provider wins; on runtime failure
 * (rate limit, bad key) the next one is tried.
 */
function providerChain(): { name: string; model: LanguageModel }[] {
  const chain: { name: string; model: LanguageModel }[] = []
  const groqKey = process.env.GROQ_API_KEY
  if (groqKey) {
    const groq = createGroq({ apiKey: groqKey })
    chain.push({ name: 'groq', model: groq('llama-3.3-70b-versatile') })
  }
  const googleKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (googleKey) {
    const google = createGoogleGenerativeAI({ apiKey: googleKey })
    chain.push({ name: 'gemini', model: google('gemini-2.0-flash') })
  }
  const cerebrasKey = process.env.CEREBRAS_API_KEY
  if (cerebrasKey) {
    const cerebras = createCerebras({ apiKey: cerebrasKey })
    chain.push({ name: 'cerebras', model: cerebras('llama-3.3-70b') })
  }
  return chain
}

async function generate(opts: { system: string; prompt: string }) {
  const providers = providerChain()
  if (providers.length === 0) {
    throw new Error('No AI API key found in server environment. Please ensure GROQ_API_KEY is configured in .env.local and restart the server.')
  }
  let lastErr: Error | null = null
  for (const { name, model } of providers) {
    try {
      const { text } = await generateText({ model, ...opts })
      return text
    } catch (err) {
      lastErr = err as Error
      console.error(`[ai] provider ${name} failed:`, lastErr.message)
    }
  }
  throw lastErr ?? new Error('All configured AI providers failed to respond.')
}

function extractJson(text: string): unknown {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '')
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')
  const slice = start !== -1 && end !== -1 ? cleaned.slice(start, end + 1) : cleaned
  return JSON.parse(slice)
}

const RESUME_JSON_SHAPE = `{
  "templateId": "<one of: ${TEMPLATES.map((t) => t.id).join(', ')}>",
  "templateReason": "<one short sentence why this template fits>",
  "resume": {
    "fullName": "", "role": "", "email": "", "phone": "", "location": "",
    "linkedin": "", "github": "", "website": "", "summary": "",
    "skills": ["..."], "achievements": ["..."], "interests": ["..."],
    "experience": [{ "role": "", "company": "", "start": "", "end": "", "bullets": ["..."] }],
    "education": [{ "degree": "", "school": "", "start": "", "end": "", "detail": "" }],
    "projects": [{ "name": "", "link": "", "tech": "", "description": "" }]
  }
}`

type Body = {
  action: 'chat' | 'summary' | 'bullets' | 'skills' | 'ats' | 'cover' | 'tailor' | 'build' | 'enhance-all'
  prompt?: string
  history?: { role: 'user' | 'ai'; text: string }[]
  jobDescription?: string
  company?: string
  hiringManager?: string
  tone?: string
  context?: {
    name?: string
    role?: string
    skills?: string[]
    company?: string
    summary?: string
    bullets?: string[]
    experience?: { role: string; company: string; bullets: string[] }[]
    education?: { degree: string; school: string }[]
    projects?: { name: string; description: string }[]
  }
}

function resumeContext(c: Body['context']): string {
  if (!c) return ''
  const parts: string[] = []
  if (c.name) parts.push(`Name: ${c.name}`)
  if (c.role) parts.push(`Target role/title: ${c.role}`)
  if (c.company) parts.push(`Company: ${c.company}`)
  if (c.skills?.length) parts.push(`Skills: ${c.skills.join(', ')}`)
  if (c.summary) parts.push(`Current summary: ${c.summary}`)
  if (c.bullets?.length)
    parts.push(`Current bullet points:\n- ${c.bullets.join('\n- ')}`)
  if (c.experience?.length)
    parts.push(
      `Experience:\n${c.experience
        .map(
          (e) =>
            `- ${e.role} at ${e.company}\n${e.bullets.map((b) => `  · ${b}`).join('\n')}`,
        )
        .join('\n')}`,
    )
  if (c.education?.length)
    parts.push(
      `Education: ${c.education.map((e) => `${e.degree}, ${e.school}`).join(' | ')}`,
    )
  if (c.projects?.length)
    parts.push(
      `Projects:\n${c.projects.map((p) => `- ${p.name}: ${p.description}`).join('\n')}`,
    )
  return parts.join('\n')
}

export async function POST(req: Request) {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { action, prompt, history, context, jobDescription } = body

  try {
    if (action === 'summary') {
      const text = await generate({
        system:
          'You are an expert resume writer. Write a concise, ATS-friendly professional summary in 3 sentences. Use first-person implied voice (no "I"), lead with experience and a flagship strength, and quantify impact where reasonable. Return ONLY the summary text, no preamble, no quotes.',
        prompt: `Write a professional summary for this candidate.\n\n${resumeContext(context)}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'enhance-all') {
      const text = await generate({
        system:
          'You are an elite executive resume writer. Enhance the candidate\'s resume in professional ENGLISH ONLY: 1) Write an impactful 3-sentence summary with strong action verbs and key skills. 2) For each experience entry, rewrite its bullets into 3-4 quantified, high-impact achievement statements starting with powerful action verbs. Respond ONLY with a raw JSON object matching this shape, no markdown fences: {"summary": "...", "experience": [{"id": "<matching exp id>", "bullets": ["bullet 1", "bullet 2"]}]}',
        prompt: `Enhance all experience entries and summary for this candidate.\n\n${resumeContext(context)}`,
      })
      let parsed: { summary?: string; experience?: { id: string; bullets: string[] }[] }
      try {
        parsed = extractJson(text) as typeof parsed
      } catch {
        return Response.json({ error: 'AI response error during auto-enhance.' }, { status: 500 })
      }
      return Response.json({ summary: parsed.summary, experience: parsed.experience })
    }

    if (action === 'bullets') {
      const text = await generate({
        system:
          'You are an expert resume writer. Rewrite the given work experience into 3-4 punchy, achievement-oriented bullet points. Each bullet starts with a strong action verb and includes a measurable result where plausible. Return ONLY the bullets, one per line, with no numbering, no dashes, and no extra text.',
        prompt: `Rewrite the highlights for this role into strong resume bullets.\n\n${resumeContext(context)}`,
      })
      const bullets = text
        .split('\n')
        .map((l) => l.replace(/^[-*•\d.\s]+/, '').trim())
        .filter(Boolean)
      return Response.json({ bullets })
    }

    if (action === 'skills') {
      const text = await generate({
        system:
          'You are a resume expert. Suggest 8-10 additional relevant, in-demand skills for the candidate based on their role and existing skills. Mix hard skills and tools. Do NOT repeat skills they already have. Return ONLY skill names, one per line, no numbering, no extra text.',
        prompt: `Suggest additional skills.\n\n${resumeContext(context)}`,
      })
      const skills = text
        .split('\n')
        .map((l) => l.replace(/^[-*•\d.\s]+/, '').trim())
        .filter(Boolean)
        .slice(0, 10)
      return Response.json({ skills })
    }

    if (action === 'ats') {
      const text = await generate({
        system:
          'You are an ATS (applicant tracking system) expert and senior recruiter. Analyze the resume against the job description if provided. Respond in EXACTLY this format:\nSCORE: <number 0-100>\nVERDICT: <one sentence overall verdict>\nSTRENGTHS:\n- <strength 1>\n- <strength 2>\nIMPROVEMENTS:\n- <specific improvement 1>\n- <specific improvement 2>\n- <specific improvement 3>\nMISSING_KEYWORDS: <comma-separated keywords from the JD missing in the resume, or "none">',
        prompt: `Analyze this resume.\n\nRESUME:\n${resumeContext(context)}\n\n${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : 'No job description provided — analyze general ATS readiness.'}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'tailor') {
      const text = await generate({
        system:
          'You are an expert resume coach. Given a resume and a job description, give the 5 most impactful, specific changes the candidate should make to tailor the resume for this job. Be concrete: name exact keywords to add, bullets to rewrite (show the rewrite), and sections to reorder. Use a numbered list. Keep it under 250 words.',
        prompt: `RESUME:\n${resumeContext(context)}\n\nJOB DESCRIPTION:\n${jobDescription ?? ''}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'cover') {
      const text = await generate({
        system:
          'You are an expert cover letter writer. Write a compelling, specific cover letter (250-350 words) in a confident but warm tone. Structure: hook opening tied to the company/role, 2 body paragraphs connecting the candidate\'s strongest achievements to the job requirements, and a clear closing call to action. Do NOT use placeholder brackets. Do NOT invent facts beyond the provided resume. Return ONLY the letter body starting with the greeting.',
        prompt: [
          `Candidate resume:\n${resumeContext(context)}`,
          body.company ? `Company: ${body.company}` : '',
          body.hiringManager ? `Hiring manager: ${body.hiringManager}` : '',
          body.tone ? `Tone: ${body.tone}` : '',
          jobDescription ? `Job description:\n${jobDescription}` : '',
        ]
          .filter(Boolean)
          .join('\n\n'),
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'build') {
      const templateList = TEMPLATES.map(
        (t) => `${t.id}: ${t.name} — ${t.description}`,
      ).join('\n')
      const text = await generate({
        system:
          'You are an expert resume writer and career coach. Build a complete, realistic, ATS-friendly resume from the description the user gives you (their background, role, experience, education). Invent plausible specific details (dates, metrics, bullet points) only to fill unavoidable gaps — never contradict facts the user stated. Write 3-5 strong achievement bullets per role. Then pick the single best-fitting resume template from the provided list for this candidate\'s field and seniority, and explain why in one sentence. Respond with ONLY raw JSON matching this exact shape, no markdown fences, no commentary:\n' +
          RESUME_JSON_SHAPE,
        prompt: [
          `Candidate description:\n${prompt}`,
          context ? `Existing resume data to build on / preserve where relevant:\n${resumeContext(context)}` : '',
          `Available templates:\n${templateList}`,
        ]
          .filter(Boolean)
          .join('\n\n'),
      })

      let parsed: {
        templateId?: string
        templateReason?: string
        resume?: Record<string, unknown>
      }
      try {
        parsed = extractJson(text) as typeof parsed
      } catch {
        return Response.json(
          { error: 'AI returned an unreadable resume. Please try again.' },
          { status: 500 },
        )
      }
      if (!parsed.resume) {
        return Response.json(
          { error: 'AI response was missing resume data. Please try again.' },
          { status: 500 },
        )
      }
      const templateId = TEMPLATES.some((t) => t.id === parsed.templateId)
        ? parsed.templateId
        : 'classic'
      return Response.json({
        templateId,
        templateReason: parsed.templateReason ?? '',
        resume: parsed.resume,
      })
    }

    // chat
    const convo = (history ?? [])
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n')

    const text = await generate({
      system:
        'You are a friendly, expert resume coach inside a resume builder app. ALWAYS write in professional ENGLISH ONLY. Give specific, actionable advice. Keep replies short (2-4 sentences or a tight list). When useful, offer concrete rewrites. Never invent facts about the user beyond the context provided.',
      prompt: [
        context ? `Candidate context:\n${resumeContext(context)}` : '',
        convo ? `Conversation so far:\n${convo}` : '',
        `User: ${prompt}`,
      ]
        .filter(Boolean)
        .join('\n\n'),
    })
    return Response.json({ text: text.trim() })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : 'AI request failed. Please try again.'
    console.error('[ai] route error:', errorMsg)
    return Response.json(
      { error: errorMsg },
      { status: 500 },
    )
  }
}
