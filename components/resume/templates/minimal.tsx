'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, MinimalSection } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Minimal Quiet — no color blocks, no photo, a centered small-caps name and
 * a single hairline under the contact row. Whitespace does the work: extra
 * breathing room between sections beyond the usual rhythm, accent color
 * reserved for the role line alone. Understated and confident. */
export function MinimalTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)' }}
    >
      <header className="flex flex-col items-center text-center">
        <EditableText
          as="h1"
          className="font-semibold uppercase tracking-[0.22em] text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1.5 text-[13px] font-medium"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 justify-center text-[11.5px] text-slate-500" />
      </header>

      <div className="mt-4 border-b border-slate-200" />

      <div className="mt-8 flex flex-col gap-8">
        {(data.summary || false) && (
          <MinimalSection title="Summary">
            <EditableText
              as="p"
              className="text-slate-600"
              value={data.summary}
              placeholder="A quiet, confident summary of who you are…"
              multiline
              onChange={(v) => update((d) => ({ ...d, summary: v }))}
            />
          </MinimalSection>
        )}

        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={MinimalSection}
          skip={['summary']}
        />
      </div>
    </div>
  )
}
