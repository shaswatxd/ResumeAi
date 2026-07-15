'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Momentum — punchy, stats-forward layout for growth and marketing roles.
 * The role sits on a bold highlighter-marker bar. Body splits into a
 * narrow skills/languages/interests rail and a wide story column. */
export function MarketingTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header>
        <EditableText
          as="h1"
          className="font-extrabold leading-tight text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <div className="relative mt-2 inline-block">
          <span
            className="absolute inset-x-0 bottom-0.5 h-[45%]"
            style={{ background: 'var(--doc-accent-soft)' }}
          />
          <EditableText
            as="p"
            className="relative text-[16px] font-extrabold text-slate-900"
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <ContactRow data={data} className="mt-3 text-[11.5px] text-slate-500" />
      </header>

      <EditableText
        as="p"
        className="text-slate-600"
        value={data.summary}
        placeholder="A bold, results-driven summary — lead with the numbers…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <div className="flex gap-8">
        <div className="flex w-[30%] shrink-0 flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={Section}
            only={['skills', 'languages', 'interests']}
          />
        </div>
        <div className="flex flex-1 flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={Section}
            skip={['summary', 'skills', 'languages', 'interests']}
          />
        </div>
      </div>
    </div>
  )
}
