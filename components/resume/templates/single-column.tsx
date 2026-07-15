'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Single Column — clean linear flow with a small identity badge riding
 * next to the name. No sidebars, no tables, generous breathing room. */
export function SingleColumnTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center gap-4">
        <Photo
          data={data}
          className="size-14 shrink-0 text-lg text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="min-w-0">
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
        </div>
      </header>

      <ContactRow data={data} className="text-[11.5px] text-slate-500" />

      <Section title="Summary" theme={theme}>
        <EditableText
          as="p"
          className="text-slate-600"
          value={data.summary}
          placeholder="A two-to-three sentence professional summary…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />
      </Section>

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary']} />
      </div>
    </div>
  )
}
