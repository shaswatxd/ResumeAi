'use client'

import { useMemo, useState } from 'react'
import {
  X,
  Gauge,
  CheckCircle2,
  XCircle,
  Sparkles,
  Target,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label, Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import type { ResumeData } from '@/lib/resume-types'

const ACTION_VERBS =
  /^(led|built|architected|designed|developed|launched|shipped|created|improved|optimized|reduced|increased|drove|managed|mentored|migrated|automated|delivered|implemented|scaled|owned|spearheaded|established|streamlined|negotiated|analyzed|engineered|founded|grew|won|achieved|transformed|modernized|accelerated|championed|orchestrated|pioneered)/i

const STOPWORDS = new Set(
  'the a an and or but with for from into onto over under of in on at to by as is are was were be been being have has had do does did will would can could should may might must that this these those you your we our they their it its not no yes if then than so such very more most other some any all each every both few many much own same able about across after against along among around because before behind below beneath beside between beyond during except inside near outside since through throughout till toward until upon within without work team job role company candidate experience years responsibilities requirements qualifications skills ability strong excellent looking join us'.split(
    ' ',
  ),
)

type Check = { label: string; pass: boolean; hint: string }

function resumeText(d: ResumeData): string {
  return [
    d.fullName,
    d.role,
    d.summary,
    ...d.experience.flatMap((e) => [e.role, e.company, ...e.bullets]),
    ...d.education.map((e) => `${e.degree} ${e.school} ${e.detail}`),
    ...d.skills,
    ...d.projects.map((p) => `${p.name} ${p.tech} ${p.description}`),
    ...d.certifications.map((c) => `${c.name} ${c.issuer}`),
    ...d.achievements,
  ]
    .join(' ')
    .toLowerCase()
}

function extractKeywords(jd: string): string[] {
  const counts = new Map<string, number>()
  for (const raw of jd.toLowerCase().split(/[^a-z0-9+#./-]+/)) {
    const w = raw.trim()
    if (w.length < 3 || STOPWORDS.has(w) || /^\d+$/.test(w)) continue
    counts.set(w, (counts.get(w) ?? 0) + 1)
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 25)
    .map(([w]) => w)
}

function computeChecks(d: ResumeData): Check[] {
  const bullets = d.experience.flatMap((e) => e.bullets).filter((b) => b.trim())
  const quantified = bullets.filter((b) => /\d/.test(b))
  const verbStarts = bullets.filter((b) => ACTION_VERBS.test(b.trim()))
  const summaryWords = d.summary.trim().split(/\s+/).filter(Boolean).length
  const totalWords = resumeText(d).split(/\s+/).filter(Boolean).length

  return [
    {
      label: 'Contact info complete',
      pass: Boolean(d.email && d.phone && (d.linkedin || d.website || d.github)),
      hint: 'Add email, phone and at least one link (LinkedIn/GitHub/site).',
    },
    {
      label: 'Professional summary (30–90 words)',
      pass: summaryWords >= 30 && summaryWords <= 90,
      hint: `Currently ${summaryWords} words — aim for a tight 3-sentence summary.`,
    },
    {
      label: 'Work experience with bullet points',
      pass: d.experience.length > 0 && bullets.length >= 3,
      hint: 'Add at least one role with 3+ achievement bullets.',
    },
    {
      label: 'Bullets are quantified',
      pass: bullets.length > 0 && quantified.length / bullets.length >= 0.4,
      hint: 'Add numbers (%, ₹/$, time saved) to at least 40% of bullets.',
    },
    {
      label: 'Bullets start with action verbs',
      pass: bullets.length > 0 && verbStarts.length / bullets.length >= 0.6,
      hint: 'Start bullets with verbs like Led, Built, Reduced, Shipped.',
    },
    {
      label: '6+ relevant skills listed',
      pass: d.skills.length >= 6,
      hint: `You have ${d.skills.length} — recruiters and ATS scan for 6-12.`,
    },
    {
      label: 'Education present',
      pass: d.education.length > 0,
      hint: 'Add your degree or main program.',
    },
    {
      label: 'Good overall length (250–900 words)',
      pass: totalWords >= 250 && totalWords <= 900,
      hint: `Currently ~${totalWords} words. One page ≈ 400-600 words.`,
    },
  ]
}

export function AtsPanel({
  open,
  onClose,
  resume,
}: {
  open: boolean
  onClose: () => void
  resume: ResumeData
}) {
  const [jd, setJd] = useState('')
  const [aiResult, setAiResult] = useState('')
  const [tailorResult, setTailorResult] = useState('')
  const [loading, setLoading] = useState<'ats' | 'tailor' | null>(null)

  const checks = useMemo(() => computeChecks(resume), [resume])
  const passCount = checks.filter((c) => c.pass).length

  const { keywordScore, matched, missing } = useMemo(() => {
    if (!jd.trim()) return { keywordScore: null, matched: [], missing: [] }
    const keywords = extractKeywords(jd)
    if (keywords.length === 0)
      return { keywordScore: null, matched: [], missing: [] }
    const text = resumeText(resume)
    const matched = keywords.filter((k) => text.includes(k))
    const missing = keywords.filter((k) => !text.includes(k))
    return {
      keywordScore: Math.round((matched.length / keywords.length) * 100),
      matched,
      missing,
    }
  }, [jd, resume])

  const baseScore = Math.round((passCount / checks.length) * 100)
  const score =
    keywordScore === null
      ? baseScore
      : Math.round(baseScore * 0.55 + keywordScore * 0.45)

  const scoreColor =
    score >= 80 ? 'text-emerald-400' : score >= 55 ? 'text-amber-400' : 'text-red-400'

  const context = {
    name: resume.fullName,
    role: resume.role,
    skills: resume.skills,
    summary: resume.summary,
    experience: resume.experience.map((e) => ({
      role: e.role,
      company: e.company,
      bullets: e.bullets,
    })),
    education: resume.education.map((e) => ({
      degree: e.degree,
      school: e.school,
    })),
    projects: resume.projects.map((p) => ({
      name: p.name,
      description: p.description,
    })),
  }

  const runAi = async (action: 'ats' | 'tailor') => {
    setLoading(action)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          jobDescription: jd.trim() || undefined,
          context,
        }),
      })
      const json = await res.json()
      const text = json.text ?? json.error ?? 'Something went wrong.'
      if (action === 'ats') setAiResult(text)
      else setTailorResult(text)
    } catch {
      const msg = 'Network error — please try again.'
      if (action === 'ats') setAiResult(msg)
      else setTailorResult(msg)
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[440px] max-w-[94vw] flex-col border-l border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="ATS score"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Gauge className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">ATS Score & Job Match</h2>
              <p className="text-[11px] text-muted-foreground">
                Beat the resume-screening bots
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        <div className="scroll-thin flex-1 overflow-y-auto p-5">
          {/* Score */}
          <div className="flex items-center gap-5 rounded-2xl border border-border bg-secondary/25 p-5">
            <div className="relative flex size-24 shrink-0 items-center justify-center">
              <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="10"
                  className="stroke-border"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(score / 100) * 264} 264`}
                  className={cn(
                    'transition-all duration-700',
                    score >= 80
                      ? 'stroke-emerald-400'
                      : score >= 55
                        ? 'stroke-amber-400'
                        : 'stroke-red-400',
                  )}
                />
              </svg>
              <span
                className={cn('absolute text-2xl font-bold tabular-nums', scoreColor)}
              >
                {score}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold">
                {score >= 80
                  ? 'Great — recruiter ready'
                  : score >= 55
                    ? 'Decent — room to improve'
                    : 'Needs work'}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {passCount}/{checks.length} structure checks passed
                {keywordScore !== null && (
                  <> · {keywordScore}% keyword match with the job description</>
                )}
              </p>
            </div>
          </div>

          {/* Checklist */}
          <h3 className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Structure checklist
          </h3>
          <div className="flex flex-col gap-1.5">
            {checks.map((c) => (
              <div
                key={c.label}
                className="flex items-start gap-2.5 rounded-lg border border-border bg-secondary/20 px-3 py-2"
              >
                {c.pass ? (
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="mt-0.5 size-4 shrink-0 text-red-400" />
                )}
                <div>
                  <p className="text-sm">{c.label}</p>
                  {!c.pass && (
                    <p className="text-xs text-muted-foreground">{c.hint}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* JD matching */}
          <h3 className="mb-2 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Match against a job description
          </h3>
          <Label htmlFor="jd" className="sr-only">
            Job description
          </Label>
          <Textarea
            id="jd"
            className="min-h-[110px]"
            placeholder="Paste the job description here to get a keyword-match score and tailoring advice..."
            value={jd}
            onChange={(e) => setJd(e.target.value)}
          />

          {keywordScore !== null && (
            <div className="mt-3 flex flex-col gap-2">
              {missing.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-red-400">
                    Missing keywords ({missing.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.map((k) => (
                      <span
                        key={k}
                        className="rounded-md border border-red-400/30 bg-red-400/10 px-2 py-0.5 text-xs text-red-300"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {matched.length > 0 && (
                <div>
                  <p className="mb-1.5 text-xs font-semibold text-emerald-400">
                    Matched keywords ({matched.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {matched.map((k) => (
                      <span
                        key={k}
                        className="rounded-md border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* AI buttons */}
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              className="h-10 flex-1 border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
              disabled={loading !== null}
              onClick={() => runAi('ats')}
            >
              {loading === 'ats' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              AI Deep Analysis
            </Button>
            <Button
              variant="outline"
              className="h-10 flex-1"
              disabled={loading !== null || !jd.trim()}
              onClick={() => runAi('tailor')}
            >
              {loading === 'tailor' ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Target className="size-4" />
              )}
              Tailor to this job
            </Button>
          </div>

          {aiResult && (
            <ResultCard title="AI analysis" text={aiResult} />
          )}
          {tailorResult && (
            <ResultCard title="Tailoring advice" text={tailorResult} />
          )}
        </div>
      </aside>
    </>
  )
}

function ResultCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </p>
      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
        {text}
      </p>
    </div>
  )
}
