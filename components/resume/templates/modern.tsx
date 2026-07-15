'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Modern Edge — geometric photo, bold name, accent underline rule. */
export function ModernTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center gap-5">
        <Photo
          data={data}
          className="size-20 shrink-0 text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="min-w-0 flex-1">
          <EditableText
            as="h1"
            className="font-extrabold leading-tight text-slate-900"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="text-[15px] font-semibold"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-2 text-[11.5px] text-slate-500" />
        </div>
      </header>
      <div className="h-[3px] w-full rounded-full" style={{ background: 'var(--doc-accent)' }} />

      <EditableText
        as="p"
        className="text-slate-600"
        value={data.summary}
        placeholder="A short, punchy professional summary…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary']} />
      </div>
    </div>
  )
}
