'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section, SkillChips } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Business Class — light, airy neutral sidebar (not dark) holding photo,
 * contact and skills, divided from a confident main column by a clean
 * hairline. Professional without feeling heavy. */
export function BusinessTemplate({ data, theme }: TP) {
  const { design, update, isEditable } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <aside
        className="flex w-[32%] shrink-0 flex-col gap-6 border-r border-slate-200 bg-slate-100 text-slate-700"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <Photo
          data={data}
          className="size-20 self-center text-2xl text-white"
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
            className="mt-1 text-[12.5px] font-semibold"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <div className="h-px w-full bg-slate-300" />
        <ContactRow data={data} variant="side" className="text-[11.5px] text-slate-600" />
        {(data.skills.length > 0 || isEditable) && (
          <div>
            <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-500">Skills</h2>
            <SkillChips data={data} theme={theme} />
          </div>
        )}
      </aside>

      <main className="flex flex-1 flex-col" style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['skills']} />
      </main>
    </div>
  )
}
