'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Photo Frame — large portrait hero on the left, photo-forward design for
 * the "Photo" genre. */
export function PhotoFrameTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <aside className="flex w-[38%] shrink-0 flex-col items-center gap-4 bg-slate-50" style={{ padding: 'var(--doc-margin)' }}>
        <Photo
          data={data}
          className="aspect-[4/5] w-full text-4xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="text-center">
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
            className="mt-1 text-[13px] font-medium"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <ContactRow data={data} variant="side" className="w-full text-[11.5px] text-slate-500" />
        <SectionList data={data} theme={theme} design={design} S={Section} only={['skills', 'languages']} />
      </aside>

      <main className="flex flex-1 flex-col" style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['skills', 'languages']} />
      </main>
    </div>
  )
}
