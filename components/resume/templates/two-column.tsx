'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Two Column — balanced 42/58 split with a thin vertical accent rail
 * dividing the columns. Left carries identity, contact and skills;
 * right carries the narrative sections in the user's chosen order. */
export function TwoColumnTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <div
        className="flex w-[42%] shrink-0 flex-col gap-6"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <Photo
          data={data}
          className="size-20 text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div>
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
            className="mt-1 font-medium"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <ContactRow data={data} variant="side" className="text-[11.5px] text-slate-600" />
        <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList data={data} theme={theme} design={design} S={Section} only={['skills', 'languages']} />
        </div>
      </div>

      <div className="relative shrink-0 self-stretch">
        <div className="absolute inset-y-6 w-[3px] rounded-full" style={{ background: 'var(--doc-accent)' }} />
      </div>

      <div
        className="flex flex-1 flex-col"
        style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}
      >
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['skills', 'languages']} />
      </div>
    </div>
  )
}
