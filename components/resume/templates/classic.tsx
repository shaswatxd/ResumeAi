'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow } from '@/components/resume/blocks'
import { ClassicSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Classic — the timeless, dependable default. Centered name, an italic role
 * subtitle, a single rule beneath the header block, and classic rule-style
 * headings throughout a single column. No flourishes — this is the template
 * every other design is implicitly compared against. */
export function ClassicTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex flex-col items-center text-center">
        <EditableText
          as="h1"
          className="font-bold text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1 italic text-slate-500"
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-2.5 justify-center text-[11.5px] text-slate-500" />
      </header>

      <div className="border-b border-slate-300" />

      <ClassicSection title="Summary" theme={theme}>
        <EditableText
          as="p"
          className="text-slate-600"
          value={data.summary}
          placeholder="A brief, professional summary of your background…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />
      </ClassicSection>

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={ClassicSection}
          skip={['summary']}
        />
      </div>
    </div>
  )
}
