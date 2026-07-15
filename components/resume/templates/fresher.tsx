'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Fresh Start — warm, upbeat layout for first jobs and new grads. Big
 * centered circular photo, centered identity block, and a highlighted
 * skills band right under the header to lead with potential over tenure. */
export function FresherTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex flex-col items-center text-center">
        <Photo
          data={data}
          className="size-24 text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <EditableText
          as="h1"
          className="mt-4 font-extrabold leading-tight text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1 text-[14px] font-semibold"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Aspiring role"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 justify-center text-[11.5px] text-slate-500" />
      </header>

      <EditableText
        as="p"
        className="text-center text-slate-600"
        value={data.summary}
        placeholder="A quick, friendly intro — who you are and what you're excited to bring to your first role…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <div
        className="p-5"
        style={{ background: 'var(--doc-accent-soft)', borderRadius: 'var(--doc-radius)' }}
      >
        <SectionList data={data} theme={theme} design={design} S={Section} only={['skills']} />
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary', 'skills']} />
      </div>
    </div>
  )
}
