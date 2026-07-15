'use client'

import type { AccentTheme, DesignSettings, ResumeData, TemplateId } from '@/lib/resume-types'
import { DEFAULT_DESIGN_SETTINGS } from '@/lib/resume-types'
import { ResumeEditProvider, type ResumeUpdater } from '@/components/resume/resume-context'
import { fontCssValue } from '@/lib/fonts'
import { TEMPLATE_REGISTRY } from '@/components/resume/templates'

type Props = {
  data: ResumeData
  template: TemplateId
  theme: AccentTheme
  design?: DesignSettings
  /** true only for the interactive on-screen preview; false for gallery thumbnails & print output */
  isEditable?: boolean
  onChange?: ResumeUpdater
  openPhotoEditor?: () => void
}

const FONT_SIZE_ZOOM: Record<DesignSettings['fontSize'], number> = { sm: 0.92, md: 1, lg: 1.08 }
const HEADING_SIZE: Record<DesignSettings['headingScale'], string> = { sm: '21px', md: '25px', lg: '30px' }
const LINE_HEIGHT: Record<DesignSettings['lineHeight'], number> = { compact: 1.35, normal: 1.55, relaxed: 1.78 }
const SECTION_GAP: Record<DesignSettings['sectionSpacing'], string> = { compact: '14px', normal: '22px', relaxed: '32px' }
const PAGE_MARGIN: Record<DesignSettings['pageMargin'], string> = { narrow: '22px', normal: '36px', wide: '54px' }
const RADIUS: Record<DesignSettings['borderRadius'], string> = { none: '0px', soft: '8px', rounded: '18px' }
const PHOTO_RADIUS: Record<DesignSettings['photoShape'], string> = { circle: '9999px', rounded: '20%', square: '4px' }
const PAGE_ASPECT: Record<DesignSettings['pageSize'], string> = { a4: '210 / 297', letter: '8.5 / 11' }

/*
 * Thin dispatcher: turns DesignSettings into CSS custom properties on a
 * single `.resume-page` wrapper, provides the editing context, and renders
 * the chosen template from the registry. All visual customization (fonts,
 * colors, spacing, radii, dark mode…) flows through these CSS vars so
 * individual templates stay simple, declarative layouts.
 */
export function ResumeDocument({
  data,
  template,
  theme,
  design = DEFAULT_DESIGN_SETTINGS,
  isEditable = false,
  onChange,
  openPhotoEditor,
}: Props) {
  const accent = design.accentColor || theme.accent
  const background = design.colorMode === 'dark' ? design.backgroundColor || '#0f172a' : design.backgroundColor || '#ffffff'
  const Template = TEMPLATE_REGISTRY[template] ?? TEMPLATE_REGISTRY['classic']

  const vars: React.CSSProperties = {
    ['--doc-accent' as string]: accent,
    ['--doc-accent-soft' as string]: `color-mix(in srgb, ${accent} 14%, ${design.colorMode === 'dark' ? '#0f172a' : 'white'})`,
    ['--doc-font' as string]: fontCssValue(design.fontFamily),
    ['--doc-heading-size' as string]: HEADING_SIZE[design.headingScale],
    ['--doc-line-height' as string]: LINE_HEIGHT[design.lineHeight],
    ['--doc-section-gap' as string]: SECTION_GAP[design.sectionSpacing],
    ['--doc-margin' as string]: PAGE_MARGIN[design.pageMargin],
    ['--doc-radius' as string]: RADIUS[design.borderRadius],
    ['--doc-photo-radius' as string]: PHOTO_RADIUS[design.photoShape],
    ['--doc-page-aspect' as string]: PAGE_ASPECT[design.pageSize],
    background,
    color: design.colorMode === 'dark' ? '#e2e8f0' : undefined,
    fontFamily: 'var(--doc-font)',
    ['zoom' as string]: FONT_SIZE_ZOOM[design.fontSize],
  }

  return (
    <ResumeEditProvider
      design={design}
      theme={theme}
      isEditable={isEditable}
      update={onChange}
      openPhotoEditor={openPhotoEditor}
    >
      <div className="resume-page" data-mode={design.colorMode} style={vars}>
        <Template data={data} theme={theme} />
      </div>
    </ResumeEditProvider>
  )
}
