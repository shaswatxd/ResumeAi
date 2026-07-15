'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Elegant Atelier — a centered, letter-spaced header framed by twin hairline
 * rules, contact items strung together with small centered dots, and a
 * custom "— SECTION —" chrome with rules flanking the title. Airy, refined,
 * single column throughout. */
export function ElegantTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  const contactCount = [data.email, data.phone, data.location, data.linkedin, data.github, data.website].filter(
    Boolean,
  ).length

  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex flex-col items-center text-center">
        <EditableText
          as="h1"
          className="font-semibold uppercase tracking-[0.15em] text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.1em]"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />

        <div className="mt-4 h-px w-24" style={{ background: 'color-mix(in srgb, var(--doc-accent) 45%, transparent)' }} />
        <ContactRow
          data={data}
          variant="row"
          className={contactCount > 0 ? 'mt-3 justify-center gap-x-0 text-[11.5px] text-slate-500 [&>span]:after:mx-2.5 [&>span]:after:text-slate-300 [&>span]:after:content-["·"] [&>span:last-child]:after:content-none' : 'mt-3 justify-center text-[11.5px] text-slate-500'}
        />
        <div className="mt-3 h-px w-24" style={{ background: 'color-mix(in srgb, var(--doc-accent) 45%, transparent)' }} />
      </header>

      <EditableText
        as="p"
        className="text-center text-slate-600"
        value={data.summary}
        placeholder="A refined, brief statement of your professional story…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={ElegantSection} skip={['summary']} />
      </div>
    </div>
  )
}

function ElegantSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
        <span className="h-px w-8 bg-slate-300" />
        {title}
        <span className="h-px w-8 bg-slate-300" />
      </h2>
      {children}
    </section>
  )
}
