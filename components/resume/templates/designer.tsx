'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Portfolio Grid — every section lives inside its own bordered, rounded
 * card, echoing a designer's portfolio layout while staying a single
 * print-safe stacked column (no CSS grid). */
export function DesignerTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header
        className="flex items-center gap-5 border border-slate-200 p-5 shadow-sm"
        style={{ borderRadius: 'var(--doc-radius)' }}
      >
        <Photo
          data={data}
          className="size-20 shrink-0 text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="min-w-0 flex-1">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-slate-900"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-0.5 font-medium"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-2 text-[11px] text-slate-500" />
        </div>
      </header>

      <div className="border border-slate-200 p-4 shadow-sm" style={{ borderRadius: 'var(--doc-radius)' }}>
        <EditableText
          as="p"
          className="text-slate-600"
          value={data.summary}
          placeholder="A short professional summary…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={CardSection} skip={['summary']} />
      </div>
    </div>
  )
}

function CardSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="border border-slate-200 p-4 shadow-sm" style={{ borderRadius: 'var(--doc-radius)' }}>
      <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--doc-accent)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}
