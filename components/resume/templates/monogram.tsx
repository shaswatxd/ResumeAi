'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Initials, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Monogram Crest — a circular initials badge as the branding centerpiece,
 * centered layout below. Creative but restrained. */
export function MonogramTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col items-center text-center text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex flex-col items-center gap-3">
        <div
          className="flex size-20 items-center justify-center rounded-full border-2 text-xl font-bold"
          style={{ borderColor: 'var(--doc-accent)', color: 'var(--doc-accent)' }}
        >
          <Initials name={data.fullName} />
        </div>
        <div>
          <EditableText
            as="h1"
            className="font-bold uppercase tracking-[0.1em] text-slate-900"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-1 text-[13px] font-medium"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <ContactRow data={data} className="justify-center text-[11.5px] text-slate-500" />
      </header>

      <div className="h-px w-24" style={{ background: 'var(--doc-accent)' }} />

      <div className="flex w-full flex-col text-left" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} />
      </div>
    </div>
  )
}
