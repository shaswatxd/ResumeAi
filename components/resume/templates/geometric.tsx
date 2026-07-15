'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Geometric Pop — playful overlapping color shapes behind the header, for
 * the "Colorful" genre. Shapes are pure CSS (radial blobs), no images. */
export function GeometricTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="relative overflow-hidden" style={{ padding: 'var(--doc-margin)' }}>
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-16 size-40 rounded-full opacity-90"
          style={{ background: 'var(--doc-accent)' }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-8 -top-10 size-28 rounded-full opacity-40"
          style={{ background: 'var(--doc-accent)' }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute left-24 top-6 size-10 rotate-45 opacity-30"
          style={{ background: 'var(--doc-accent)' }}
        />
        <div className="relative flex items-center gap-5">
          <Photo
            data={data}
            className="size-20 shrink-0 text-2xl text-white ring-4 ring-white"
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
        </div>
      </header>

      <div
        className="flex flex-col"
        style={{ padding: 'var(--doc-margin)', paddingTop: 0, gap: 'var(--doc-section-gap)' }}
      >
        <SectionList data={data} theme={theme} design={design} S={Section} />
      </div>
    </div>
  )
}
