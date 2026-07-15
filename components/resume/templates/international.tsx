'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, MinimalSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* International — Europass-inspired, neutral and standardized. A quiet
 * grey sidebar carries identity, contact and languages (given priority
 * placement, as international CVs expect); accent is used sparingly. */
export function InternationalTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <aside
        className="flex w-[32%] shrink-0 flex-col gap-6 bg-slate-50"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <Photo
          data={data}
          className="size-20 text-xl text-white"
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
            className="mt-1 font-medium text-slate-600"
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>

        <div>
          <h2 className="mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            <span className="h-0.5 w-4 rounded-full" style={{ background: 'var(--doc-accent)' }} />
            Contact
          </h2>
          <ContactRow data={data} variant="side" className="text-[11.5px] text-slate-600" />
        </div>

        <div className="flex flex-col gap-6">
          <SectionList data={data} theme={theme} design={design} S={MinimalSection} only={['languages', 'skills']} />
        </div>
      </aside>

      <main className="flex flex-1 flex-col" style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={MinimalSection} skip={['languages', 'skills']} />
      </main>
    </div>
  )
}
