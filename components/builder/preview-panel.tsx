import { useMemo, useState } from 'react'
import { ResumeDocument } from '@/components/resume/resume-document'
import { PrintSheet } from '@/components/print-sheet'
import { PhotoEditor } from '@/components/builder/photo-editor'
import {
  SAMPLE_DATA,
  TEMPLATES,
  THEMES,
  type DesignSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'
import { Gauge } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  design: DesignSettings
  onChange: (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => void
  onTemplate?: (id: TemplateId) => void
  onOpenAts?: () => void
}

/* Calculate real-time live ATS readiness score */
function calculateAtsScore(d: ResumeData): number {
  let score = 0
  if (d.fullName?.trim()) score += 15
  if (d.role?.trim()) score += 15
  if (d.email?.trim() && d.phone?.trim()) score += 15
  if (d.summary && d.summary.length > 30) score += 15
  if (d.experience && d.experience.length >= 1 && d.experience.some((e) => e.bullets?.length)) score += 20
  if (d.education && d.education.length >= 1) score += 10
  if (d.skills && d.skills.length >= 4) score += 10
  return Math.min(100, score)
}

/* If everything is empty, show the sample so the preview is never blank */
function isEmpty(d: ResumeData) {
  return (
    !d.fullName &&
    !d.role &&
    !d.summary &&
    !d.photo &&
    d.experience.length === 0 &&
    d.education.length === 0 &&
    d.skills.length === 0
  )
}

export function PreviewPanel({
  data,
  template,
  theme,
  design,
  onChange,
  onTemplate,
  onOpenAts,
}: Props) {
  const accent = useMemo(() => THEMES.find((t) => t.id === theme) ?? THEMES[0], [theme])
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false)
  const showSample = isEmpty(data)
  const rendered = showSample ? SAMPLE_DATA : data
  const atsScore = calculateAtsScore(rendered)

  return (
    <div className="flex h-full flex-col">
      <div className="no-print flex flex-wrap items-center justify-between gap-2 border-b border-border bg-popover/60 px-4 py-2.5 backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Live Preview
          </span>
          <button
            onClick={onOpenAts}
            className={cn(
              'flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-transform hover:scale-105',
              atsScore >= 80
                ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-400'
                : atsScore >= 50
                ? 'border-amber-500/40 bg-amber-500/15 text-amber-400'
                : 'border-rose-500/40 bg-rose-500/15 text-rose-400',
            )}
            title="Click to open detailed ATS Analyzer"
          >
            <Gauge className="size-3.5" />
            <span>{atsScore}% ATS Score</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {onTemplate && (
            <select
              value={template}
              onChange={(e) => onTemplate(e.target.value as TemplateId)}
              className="rounded-lg border border-border bg-popover px-2.5 py-1 text-xs font-semibold text-foreground outline-none transition-colors hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary"
            >
              {TEMPLATES.map((t) => (
                <option
                  key={t.id}
                  value={t.id}
                  className="bg-slate-900 text-slate-100 dark:bg-slate-900 dark:text-slate-100"
                >
                  {t.name}
                </option>
              ))}
            </select>
          )}
          <span className="hidden rounded bg-secondary/80 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider sm:inline">
            {design.pageSize}
          </span>
        </div>
      </div>

      <div className="scroll-thin flex-1 overflow-auto p-4 sm:p-8">
        <div className="mx-auto w-full max-w-[820px]">
          <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
            <ResumeDocument
              data={rendered}
              template={template}
              theme={accent}
              design={design}
              isEditable={!showSample}
              onChange={onChange}
              openPhotoEditor={() => setPhotoEditorOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* body-level copy that is the only thing visible when printing */}
      <PrintSheet>
        <ResumeDocument data={rendered} template={template} theme={accent} design={design} />
      </PrintSheet>

      <PhotoEditor
        open={photoEditorOpen}
        onClose={() => setPhotoEditorOpen(false)}
        photo={data.photo}
        onSave={(photo) => onChange((d) => ({ ...d, photo }))}
        onRemove={() => onChange((d) => ({ ...d, photo: '' }))}
      />
    </div>
  )
}
