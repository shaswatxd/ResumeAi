import { generateText } from 'ai'

export const maxDuration = 60

const MODEL = 'openai/gpt-4.1-mini'

type Body = {
  action: 'chat' | 'summary' | 'bullets' | 'skills' | 'ats' | 'cover' | 'tailor'
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
      const { text } = await generateText({
        model: MODEL,
        system:
          'You are an expert resume writer. Write a concise, ATS-friendly professional summary in 3 sentences. Use first-person implied voice (no "I"), lead with experience and a flagship strength, and quantify impact where reasonable. Return ONLY the summary text, no preamble, no quotes.',
        prompt: `Write a professional summary for this candidate.\n\n${resumeContext(context)}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'bullets') {
      const { text } = await generateText({
        model: MODEL,
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
      const { text } = await generateText({
        model: MODEL,
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
      const { text } = await generateText({
        model: MODEL,
        system:
          'You are an ATS (applicant tracking system) expert and senior recruiter. Analyze the resume against the job description if provided. Respond in EXACTLY this format:\nSCORE: <number 0-100>\nVERDICT: <one sentence overall verdict>\nSTRENGTHS:\n- <strength 1>\n- <strength 2>\nIMPROVEMENTS:\n- <specific improvement 1>\n- <specific improvement 2>\n- <specific improvement 3>\nMISSING_KEYWORDS: <comma-separated keywords from the JD missing in the resume, or "none">',
        prompt: `Analyze this resume.\n\nRESUME:\n${resumeContext(context)}\n\n${jobDescription ? `JOB DESCRIPTION:\n${jobDescription}` : 'No job description provided — analyze general ATS readiness.'}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'tailor') {
      const { text } = await generateText({
        model: MODEL,
        system:
          'You are an expert resume coach. Given a resume and a job description, give the 5 most impactful, specific changes the candidate should make to tailor the resume for this job. Be concrete: name exact keywords to add, bullets to rewrite (show the rewrite), and sections to reorder. Use a numbered list. Keep it under 250 words.',
        prompt: `RESUME:\n${resumeContext(context)}\n\nJOB DESCRIPTION:\n${jobDescription ?? ''}`,
      })
      return Response.json({ text: text.trim() })
    }

    if (action === 'cover') {
      const { text } = await generateText({
        model: MODEL,
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

    // chat
    const convo = (history ?? [])
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n')

    const { text } = await generateText({
      model: MODEL,
      system:
        'You are a friendly, expert resume coach inside a resume builder app. Give specific, actionable advice. Keep replies short (2-4 sentences or a tight list). When useful, offer concrete rewrites. Never invent facts about the user beyond the context provided.',
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
    console.log('[ai] route error:', (err as Error).message)
    return Response.json(
      { error: 'AI request failed. Please try again.' },
      { status: 500 },
    )
  }
}
