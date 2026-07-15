'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow } from '@/components/resume/blocks'
import { ClassicSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Corporate Boardroom — full-width accent band carrying the name and role in
 * white, a darker secondary bar directly beneath it for contact details, then
 * a disciplined single-column body with classic rule headings. Built for
 * finance, law, consulting — structured and unmistakably professional. */
export function CorporateTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex flex-col text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header
        className="flex flex-col gap-1"
        style={{
          background: 'var(--doc-accent)',
          padding: 'var(--doc-margin)',
          paddingBottom: '1.1rem',
        }}
      >
        <EditableText
          as="h1"
          className="font-bold leading-tight text-white"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="text-[14px] font-medium uppercase tracking-[0.1em] text-white/85"
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
      </header>

      <div
        className="bg-slate-800"
        style={{ paddingLeft: 'var(--doc-margin)', paddingRight: 'var(--doc-margin)', paddingTop: '0.65rem', paddingBottom: '0.65rem' }}
      >
        <ContactRow data={data} className="text-[11.5px] text-slate-200" />
      </div>

      <div
        className="flex flex-col"
        style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}
      >
        <ClassicSection title="Summary" theme={theme}>
          <EditableText
            as="p"
            className="text-slate-600"
            value={data.summary}
            placeholder="A concise summary of your professional track record…"
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
    </div>
  )
}
