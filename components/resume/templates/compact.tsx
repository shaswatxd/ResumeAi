'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, MinimalSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Compact — dense two-column layout tuned to fit maximum content on a
 * single page: smaller type, tight fixed gaps, quiet section chrome. */
export function CompactTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex min-h-full text-[12px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <div
        className="flex w-[30%] shrink-0 flex-col gap-3 border-r border-slate-200"
        style={{ padding: 'var(--doc-margin)' }}
      >
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
            className="mt-0.5 text-[11px] font-medium"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>
        <ContactRow data={data} variant="side" className="text-[10.5px] text-slate-600" />
        <div className="flex flex-col gap-3">
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={MinimalSection}
            only={['skills', 'languages', 'certifications']}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2" style={{ padding: 'var(--doc-margin)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={MinimalSection}
          skip={['skills', 'languages', 'certifications']}
        />
      </div>
    </div>
  )
}
