'use client'

import { ResumeDocument } from '@/components/resume/resume-document'
import { DEFAULT_DESIGN_SETTINGS, SAMPLE_DATA, type AccentTheme, type TemplateId } from '@/lib/resume-types'
import { cn } from '@/lib/utils'

const PAGE_W = 794
const PAGE_H = 1123

/* Live-rendered, scaled-down resume preview — used by both the design
 * panel's template grid and the /templates gallery, so a thumbnail is
 * always a pixel-accurate miniature of the real template, never a
 * hand-drawn stand-in that can drift out of sync. */
export function TemplateThumbnail({
  template,
  theme,
  scale = 0.19,
  className,
}: {
  template: TemplateId
  theme: AccentTheme
  scale?: number
  className?: string
}) {
  return (
    <div
      className={cn('pointer-events-none select-none overflow-hidden bg-white', className)}
      style={{ width: PAGE_W * scale, height: PAGE_H * scale }}
    >
      <div style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        <ResumeDocument
          data={SAMPLE_DATA}
          template={template}
          theme={theme}
          design={DEFAULT_DESIGN_SETTINGS}
          isEditable={false}
        />
      </div>
    </div>
  )
}
