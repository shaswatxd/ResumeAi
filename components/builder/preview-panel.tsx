'use client'

import { useMemo } from 'react'
import { ResumeDocument } from '@/components/resume/resume-document'
import { PrintSheet } from '@/components/print-sheet'
import {
  SAMPLE_DATA,
  THEMES,
  type DocSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

type Props = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  settings?: DocSettings
}

/* If everything is empty, show the sample so the preview is never blank */
function isEmpty(d: ResumeData) {
  return (
    !d.fullName &&
    !d.role &&
    !d.summary &&
    d.experience.length === 0 &&
    d.education.length === 0 &&
    d.skills.length === 0
  )
}

export function PreviewPanel({ data, template, theme, settings }: Props) {
  const accent = useMemo(
    () => THEMES.find((t) => t.id === theme) ?? THEMES[0],
    [theme],
  )
  const showSample = isEmpty(data)
  const rendered = showSample ? SAMPLE_DATA : data

  return (
    <div className="flex h-full flex-col">
      <div className="no-print flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live Preview
          </span>
          {showSample && (
            <span className="rounded-full border border-border bg-secondary/40 px-2 py-0.5 text-[10px] text-muted-foreground">
              Empty sections show sample data
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">A4 · {accent.name}</span>
      </div>

      <div className="scroll-thin flex-1 overflow-auto p-4 sm:p-8">
        <div className="mx-auto w-full max-w-[820px]">
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
            <ResumeDocument
              data={rendered}
              template={template}
              theme={accent}
              settings={settings}
            />
          </div>
        </div>
      </div>

      {/* body-level copy that is the only thing visible when printing */}
      <PrintSheet>
        <ResumeDocument
          data={rendered}
          template={template}
          theme={accent}
          settings={settings}
        />
      </PrintSheet>
    </div>
  )
}
