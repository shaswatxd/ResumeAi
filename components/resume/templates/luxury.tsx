'use client'

import type { AccentTheme } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Refined, small-caps letter-spaced heading with a thin top rule instead
 * of a bottom divider — delicate, understated section chrome for Luxury. */
function RefinedSection({
  title,
  children,
}: {
  title: string
  theme: AccentTheme
  children: React.ReactNode
}) {
  return (
    <section className="text-center">
      <h2
        className="mx-auto mb-3 w-fit pt-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500"
        style={{ borderTopWidth: 1, borderTopColor: 'var(--doc-accent)' }}
      >
        {title}
      </h2>
      <div className="text-left">{children}</div>
    </section>
  )
}

/* Luxury — a deep charcoal header band with a letter-spaced name, a thin
 * accent hairline, and a centered, delicate single column beneath. */
export function LuxuryTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex min-h-full flex-col text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header
        className="flex flex-col items-center gap-3 bg-slate-950 text-center"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <Photo
          data={data}
          className="size-16 text-lg text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <EditableText
          as="h1"
          className="font-semibold uppercase tracking-[0.2em] text-white"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="text-[12px] font-medium uppercase tracking-[0.15em]"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="justify-center text-[11px] text-slate-400" />
      </header>
      <div className="h-px w-full" style={{ background: 'var(--doc-accent)' }} />

      <div
        className="mx-auto flex w-full max-w-[85%] flex-col"
        style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}
      >
        <EditableText
          as="p"
          className="text-center text-slate-600"
          value={data.summary}
          placeholder="A refined, understated summary of your career…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />
        <SectionList data={data} theme={theme} design={design} S={RefinedSection} skip={['summary']} />
      </div>
    </div>
  )
}
