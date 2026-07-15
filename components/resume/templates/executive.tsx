'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section, SkillChips } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Executive Summit — dark charcoal sidebar (photo, contact, skills) beside
 * a refined serif-leaning main column. Built for senior leadership roles. */
export function ExecutiveTemplate({ data, theme }: TP) {
  const { design, update, isEditable } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <aside
        className="flex w-[34%] shrink-0 flex-col gap-6 bg-slate-900 text-slate-200"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <Photo
          data={data}
          className="size-24 self-center text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="text-center">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-white"
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
        <ContactRow data={data} variant="side" className="text-[11.5px] text-slate-300" />
        {(data.skills.length > 0 || isEditable) && (
          <div>
            <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Skills</h2>
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
