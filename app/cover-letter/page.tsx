'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Sparkles,
  Loader2,
  Copy,
  Check,
  Download,
  ArrowLeft,
  PenLine,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'
import { useResumeStore } from '@/hooks/use-resume-store'
import { PrintSheet } from '@/components/print-sheet'
import { cn } from '@/lib/utils'
import type { ResumeData } from '@/lib/resume-types'

function LetterHead({ data }: { data: ResumeData }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-5">
      <p className="text-xl font-bold text-slate-900">
        {data.fullName || 'Your Name'}
      </p>
      <p className="text-sm text-slate-500">
        {[data.email, data.phone, data.location].filter(Boolean).join(' · ') ||
          'your@email.com'}
      </p>
    </div>
  )
}

const TONES = ['Professional', 'Warm', 'Confident', 'Enthusiastic'] as const

export default function CoverLetterPage() {
  const { data, hydrated } = useResumeStore()
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [hiringManager, setHiringManager] = useState('')
  const [tone, setTone] = useState<(typeof TONES)[number]>('Professional')
  const [jd, setJd] = useState('')
  const [letter, setLetter] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cover',
          company,
          hiringManager,
          tone,
          jobDescription: jd.trim() || undefined,
          context: {
            name: data.fullName,
            role: role || data.role,
            skills: data.skills,
            summary: data.summary,
            experience: data.experience.map((e) => ({
              role: e.role,
              company: e.company,
              bullets: e.bullets,
            })),
            education: data.education.map((e) => ({
              degree: e.degree,
              school: e.school,
            })),
            projects: data.projects.map((p) => ({
              name: p.name,
              description: p.description,
            })),
          },
        }),
      })
      const json = await res.json()
      if (json.text) setLetter(json.text)
      else setError(json.error ?? 'Generation failed. Please try again.')
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copy = async () => {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const print = () => {
    const prev = document.title
    document.title = data.fullName
      ? `${data.fullName} - Cover Letter`
      : 'Cover Letter - ResumeAI'
    window.print()
    document.title = prev
  }

  const resumeEmpty =
    hydrated && !data.fullName && data.experience.length === 0 && !data.summary

  return (
    <main className="min-h-dvh">
      {/* Nav */}
      <header className="no-print mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="size-5" />
          </span>
          <span className="text-lg font-semibold">ResumeAI</span>
        </Link>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Back to builder
        </Link>
      </header>

      <div className="no-print mx-auto max-w-6xl px-6 pb-6">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <PenLine className="size-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold">AI Cover Letter</h1>
            <p className="text-sm text-muted-foreground">
              Generated from your resume — tailored to the company and role.
            </p>
          </div>
        </div>
        {resumeEmpty && (
          <p className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-300">
            Your resume is empty. The letter will be generic —{' '}
            <Link href="/builder" className="underline">
              fill your resume first
            </Link>{' '}
            for a much stronger result.
          </p>
        )}
      </div>

      <div className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-[400px_1fr]">
        {/* Form */}
        <div className="no-print flex h-fit flex-col gap-4 rounded-2xl border border-border bg-popover/50 p-5">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Google"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="role">Role you're applying for</Label>
            <Input
              id="role"
              placeholder={data.role || 'Software Engineer'}
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hm">Hiring manager (optional)</Label>
            <Input
              id="hm"
              placeholder="Ms. Priya Nair"
              value={hiringManager}
              onChange={(e) => setHiringManager(e.target.value)}
            />
          </div>
          <div>
            <Label>Tone</Label>
            <div className="flex gap-1 rounded-lg border border-border bg-secondary/30 p-1">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={cn(
                    'flex-1 rounded-md py-1.5 text-xs font-medium transition-colors',
                    t === tone
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="jd">Job description (optional, recommended)</Label>
            <Textarea
              id="jd"
              className="min-h-[130px]"
              placeholder="Paste the job posting for a letter that mirrors its language..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
            />
          </div>
          <Button
            size="lg"
            className="h-12"
            disabled={loading || !company.trim()}
            onClick={generate}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            {loading ? 'Writing…' : letter ? 'Regenerate' : 'Generate letter'}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        {/* Output */}
        <div className="flex flex-col gap-3">
          <div className="no-print flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Preview — editable
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9"
                disabled={!letter}
                onClick={copy}
              >
                {copied ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
              <Button size="sm" className="h-9" disabled={!letter} onClick={print}>
                <Download className="size-4" /> PDF
              </Button>
            </div>
          </div>

          <div className="rounded-xl bg-white p-10 shadow-2xl ring-1 ring-black/5">
            <LetterHead data={data} />
            {letter ? (
              <textarea
                className="min-h-[520px] w-full resize-y bg-transparent text-[14px] leading-relaxed text-slate-700 focus:outline-none"
                value={letter}
                onChange={(e) => setLetter(e.target.value)}
              />
            ) : (
              <div className="flex min-h-[420px] items-center justify-center text-center text-sm text-slate-400">
                Fill in the company and hit Generate —<br />
                your letter appears here, ready to edit.
              </div>
            )}
          </div>

          {/* body-level copy that is the only thing visible when printing */}
          <PrintSheet>
            <div className="p-12">
              <LetterHead data={data} />
              <div className="whitespace-pre-wrap text-[14px] leading-relaxed text-slate-700">
                {letter}
              </div>
            </div>
          </PrintSheet>
        </div>
      </div>
    </main>
  )
}
