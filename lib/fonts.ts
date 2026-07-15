import type { FontId } from '@/lib/resume-types'

/*
 * Registry of resume-document fonts. The actual next/font/google loaders live
 * in app/layout.tsx (next/font requires static imports at the module level),
 * this file just maps a FontId to its CSS variable + display label so the
 * design panel and resume-document.tsx don't need to know font internals.
 */
export type FontMeta = {
  id: FontId
  label: string
  cssVar: string
  category: 'sans' | 'serif'
}

export const FONTS: FontMeta[] = [
  { id: 'inter', label: 'Inter', cssVar: '--font-resume-inter', category: 'sans' },
  { id: 'poppins', label: 'Poppins', cssVar: '--font-resume-poppins', category: 'sans' },
  { id: 'roboto', label: 'Roboto', cssVar: '--font-resume-roboto', category: 'sans' },
  { id: 'lato', label: 'Lato', cssVar: '--font-resume-lato', category: 'sans' },
  { id: 'montserrat', label: 'Montserrat', cssVar: '--font-resume-montserrat', category: 'sans' },
  { id: 'nunito', label: 'Nunito', cssVar: '--font-resume-nunito', category: 'sans' },
  { id: 'openSans', label: 'Open Sans', cssVar: '--font-resume-open-sans', category: 'sans' },
  { id: 'playfair', label: 'Playfair Display', cssVar: '--font-resume-playfair', category: 'serif' },
  { id: 'merriweather', label: 'Merriweather', cssVar: '--font-resume-merriweather', category: 'serif' },
  { id: 'raleway', label: 'Raleway', cssVar: '--font-resume-raleway', category: 'sans' },
]

export function fontCssValue(id: FontId) {
  const f = FONTS.find((x) => x.id === id) ?? FONTS[0]
  return `var(${f.cssVar})`
}
