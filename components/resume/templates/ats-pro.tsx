'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow } from '@/components/resume/blocks'
import { ClassicSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* ATS Professional — pure single column, no photo, no color graphics.
 * Optimized for resume parsers: plain headings, no tables, no icons. */
export function AtsProTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-800"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="border-b-2 border-slate-800 pb-3">
        <EditableText
          as="h1"
          className="font-bold uppercase tracking-wide text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-0.5 font-medium text-slate-600"
          value={data.role}
          placeholder="Target job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-2 text-[11.5px] text-slate-600" />
      </header>

      <ClassicSection title="Summary" theme={theme}>
        <EditableText
          as="p"
          className="text-slate-700"
          value={data.summary}
          placeholder="Two to three sentence professional summary…"
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
