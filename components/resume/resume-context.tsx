'use client'

import { createContext, useContext } from 'react'
import type { AccentTheme, DesignSettings, ResumeData } from '@/lib/resume-types'

export type ResumeUpdater = (updater: (prev: ResumeData) => ResumeData) => void

export type ResumeEditContextValue = {
  design: DesignSettings
  theme: AccentTheme
  isEditable: boolean
  update: ResumeUpdater
  /** opens the photo upload/crop modal; undefined outside the builder (gallery, print) */
  openPhotoEditor?: () => void
}

const noop: ResumeUpdater = () => {}

const ResumeEditContext = createContext<ResumeEditContextValue | null>(null)

export function ResumeEditProvider({
  design,
  theme,
  isEditable,
  update,
  openPhotoEditor,
  children,
}: {
  design: DesignSettings
  theme: AccentTheme
  isEditable: boolean
  update?: ResumeUpdater
  openPhotoEditor?: () => void
  children: React.ReactNode
}) {
  return (
    <ResumeEditContext.Provider
      value={{
        design,
        theme,
        isEditable,
        update: isEditable ? update ?? noop : noop,
        openPhotoEditor: isEditable ? openPhotoEditor : undefined,
      }}
    >
      {children}
    </ResumeEditContext.Provider>
  )
}

/* Templates/blocks render both inside the editable preview and inside
 * read-only contexts (gallery thumbnails, print sheet). Fall back to a
 * sane read-only default instead of throwing so every render site works. */
export function useResumeEdit(): ResumeEditContextValue {
  const ctx = useContext(ResumeEditContext)
  if (ctx) return ctx
  throw new Error('useResumeEdit must be used within a ResumeEditProvider')
}
