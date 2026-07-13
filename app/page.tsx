import Link from 'next/link'
import {
  ArrowRight,
  Sparkles,
  LayoutTemplate,
  Download,
  Eye,
  ShieldCheck,
  Wand2,
  FileText,
  Gauge,
  PenLine,
  FileJson,
  type LucideIcon,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { ResumeDocument } from '@/components/resume/resume-document'
import { SAMPLE_DATA, TEMPLATES, THEMES } from '@/lib/resume-types'
import { cn } from '@/lib/utils'

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Eye,
    title: 'Real-time preview',
    text: 'See every edit instantly rendered on a pixel-perfect A4 sheet.',
  },
  {
    icon: LayoutTemplate,
    title: `${TEMPLATES.length} premium templates`,
    text: 'Switch layouts and accent colors in one click — content stays intact.',
  },
  {
    icon: Sparkles,
    title: 'Real AI writing',
    text: 'AI writes your summary, rewrites bullets into achievements, and suggests skills.',
  },
  {
    icon: Gauge,
    title: 'ATS score & job match',
    text: 'Instant ATS checklist plus keyword matching against any job description.',
  },
  {
    icon: PenLine,
    title: 'AI cover letters',
    text: 'A tailored cover letter generated from your resume in seconds.',
  },
  {
    icon: Download,
    title: 'One-click PDF',
    text: 'Export a clean, ATS-friendly PDF ready to send anywhere.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    text: 'Your data is saved in your browser — nothing leaves your device.',
  },
  {
    icon: FileJson,
    title: 'Backup & restore',
    text: 'Export your resume as JSON and import it on any device.',
  },
  {
    icon: Wand2,
    title: 'Guided sections',
    text: 'Experience, projects, certifications, languages, awards — all organized.',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Fill in your details',
    text: 'Guided tabs for every section. Empty preview shows sample data so you always see the end result.',
  },
  {
    n: '02',
    title: 'Let AI polish it',
    text: 'Generate a summary, turn duties into quantified achievements, and check your ATS score against the job.',
  },
  {
    n: '03',
    title: 'Pick a design & export',
    text: `Choose from ${TEMPLATES.length} templates and ${THEMES.length} accent colors, then download a crisp PDF.`,
  },
]

const FAQS = [
  {
    q: 'Is ResumeAI really free?',
    a: 'Yes. The builder, all templates, PDF export, ATS scoring and AI assistance are free to use.',
  },
  {
    q: 'Is my data safe?',
    a: 'Your resume lives in your browser (localStorage) — it is never stored on our servers. Only the text you explicitly send to the AI assistant is processed to generate suggestions.',
  },
  {
    q: 'Are the templates ATS-friendly?',
    a: 'Yes. Templates tagged "ATS" use single-column layouts, standard section names and real text (no images of text), which applicant tracking systems parse reliably.',
  },
  {
    q: 'Can I use it on my phone?',
    a: 'Yes — the builder has a dedicated mobile mode with an edit/preview switcher.',
  },
  {
    q: 'How does the ATS score work?',
    a: 'We run 8 structural checks (quantified bullets, action verbs, length, contact info…) locally, and if you paste a job description we compute keyword coverage plus optional AI deep analysis.',
  },
  {
    q: 'Can I move my resume to another device?',
    a: 'Export it as a JSON backup from the builder menu and import it anywhere.',
  },
]

const SHOWCASE = ['glass', 'sidebar', 'executive'] as const

export default function Page() {
  const violet = THEMES[0]
  const emerald = THEMES[1]
  const blue = THEMES[2]
  const showcaseThemes = [violet, emerald, blue]

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* soft accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, oklch(0.62 0.2 292), transparent)',
        }}
      />

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="size-5" />
          </span>
          <span className="text-lg font-semibold">ResumeAI</span>
        </div>
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/templates" className="transition-colors hover:text-foreground">
            Templates
          </Link>
          <Link href="/cover-letter" className="transition-colors hover:text-foreground">
            Cover letter
          </Link>
        </nav>
        <Link
          href="/builder"
          className={cn(buttonVariants({ size: 'lg' }), 'h-10 gap-2 px-4')}
        >
          Open builder <ArrowRight className="size-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-14 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="size-3.5 text-primary" />
          AI resume builder · ATS score · Cover letters
        </span>
        <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
          Craft a standout resume in{' '}
          <span className="text-primary">minutes</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Fill in a few fields, watch a beautiful resume build itself in real
          time, beat the ATS bots, and export a polished PDF.{' '}
          {TEMPLATES.length} premium templates and real AI writing help — free.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'h-12 gap-2 px-6 text-base',
            )}
          >
            Start building <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/templates"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'h-12 gap-2 px-6 text-base',
            )}
          >
            Browse templates
          </Link>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          No sign-up · Saved in your browser · Free forever
        </p>
      </section>

      {/* Template showcase */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {SHOWCASE.map((id, i) => {
            const tpl = TEMPLATES.find((t) => t.id === id)!
            return (
              <Link
                key={id}
                href="/templates"
                className={cn(
                  'group relative overflow-hidden rounded-xl border border-border bg-white shadow-2xl transition-all hover:-translate-y-1 hover:border-primary/50',
                  i === 1 && 'sm:-mt-6',
                )}
              >
                <div className="pointer-events-none h-0 w-full pb-[132%]" />
                <div className="absolute inset-0 overflow-hidden">
                  <div className="w-[794px] origin-top-left scale-[0.40] sm:scale-[0.44]">
                    <div style={{ width: 794, minHeight: 1123 }} className="bg-white">
                      <ResumeDocument
                        data={SAMPLE_DATA}
                        template={id}
                        theme={showcaseThemes[i]}
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                  <span className="text-sm font-semibold text-white">
                    {tpl.name}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/80 opacity-0 transition-opacity group-hover:opacity-100">
                    See all <ArrowRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            View all {TEMPLATES.length} templates <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-3 text-center text-3xl font-bold sm:text-4xl">
          Everything a modern resume needs
        </h2>
        <p className="mx-auto mb-10 max-w-lg text-center text-muted-foreground">
          Built like the paid tools — templates, AI, ATS scoring, cover letters —
          without the paywall.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="glass rounded-2xl border border-border p-6 transition-colors hover:border-primary/40"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
          Three steps to hired
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="rounded-2xl border border-border bg-secondary/20 p-6"
            >
              <span className="text-3xl font-bold text-primary/60">{s.n}</span>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-3xl px-6 pb-20">
        <h2 className="mb-8 text-center text-3xl font-bold sm:text-4xl">
          Frequently asked
        </h2>
        <div className="flex flex-col gap-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-secondary/20 px-5 py-4 transition-colors hover:border-primary/30 open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-90">
                  <ArrowRight className="size-4" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-secondary/20 px-8 py-12 text-center">
          <h2 className="text-balance text-2xl font-semibold sm:text-3xl">
            Ready to build your best resume?
          </h2>
          <p className="max-w-md text-pretty text-muted-foreground">
            Jump straight into the editor — everything saves automatically.
          </p>
          <Link
            href="/builder"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-2 h-12 gap-2 px-6 text-base',
            )}
          >
            Open the builder <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            ResumeAI — free AI resume builder
          </div>
          <nav className="flex gap-5">
            <Link href="/builder" className="transition-colors hover:text-foreground">
              Builder
            </Link>
            <Link href="/templates" className="transition-colors hover:text-foreground">
              Templates
            </Link>
            <Link href="/cover-letter" className="transition-colors hover:text-foreground">
              Cover letter
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  )
}
