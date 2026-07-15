'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Fresh Start — an approachable, soft accent-tinted header band for
 * students and early-career candidates, with generous, warm spacing
 * through the body so a lighter resume still feels full and confident. */
export function StudentTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex flex-col text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header
        className="flex items-center gap-5 rounded-b-[28px]"
        style={{ background: 'var(--doc-accent-soft)', padding: 'var(--doc-margin)' }}
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
            placeholder="Aspiring job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-2.5 text-[11.5px] text-slate-600" />
        </div>
      </header>

      <div
        className="flex flex-col"
        style={{
          padding: 'var(--doc-margin)',
          paddingTop: '1.5rem',
          gap: 'calc(var(--doc-section-gap) + 6px)',
        }}
      >
        <EditableText
          as="p"
          className="text-slate-600"
          value={data.summary}
          placeholder="A friendly, forward-looking summary of your goals and strengths…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />

        <div className="flex flex-col" style={{ gap: 'calc(var(--doc-section-gap) + 6px)' }}>
          <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary']} />
        </div>
      </div>
    </div>
  )
}
