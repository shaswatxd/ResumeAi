'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_DESIGN_SETTINGS,
  EMPTY_DATA,
  type DesignSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v2'

type StoredState = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  design: DesignSettings
}

const DEFAULT_STATE: StoredState = {
  data: EMPTY_DATA,
  template: 'classic',
  theme: 'blue',
  design: DEFAULT_DESIGN_SETTINGS,
}

export function useResumeStore() {
  const [state, setState] = useState<StoredState>(DEFAULT_STATE)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<StoredState>
        setState({
          data: { ...EMPTY_DATA, ...parsed.data, customSections: parsed.data?.customSections ?? [] },
          template: parsed.template ?? 'classic',
          theme: parsed.theme ?? 'blue',
          design: {
            ...DEFAULT_DESIGN_SETTINGS,
            ...parsed.design,
            sectionVisibility: { ...parsed.design?.sectionVisibility },
            sectionOrder: parsed.design?.sectionOrder ?? DEFAULT_DESIGN_SETTINGS.sectionOrder,
          },
        })
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage full / unavailable */
    }
  }, [state, hydrated])

  const setData = useCallback(
    (updater: ResumeData | ((prev: ResumeData) => ResumeData)) => {
      setState((prev) => ({
        ...prev,
        data:
          typeof updater === 'function'
            ? (updater as (p: ResumeData) => ResumeData)(prev.data)
            : updater,
      }))
    },
    [],
  )

  const setTemplate = useCallback((template: TemplateId) => {
    setState((prev) => ({ ...prev, template }))
  }, [])

  const setTheme = useCallback((theme: ThemeId) => {
    setState((prev) => ({ ...prev, theme }))
  }, [])

  const setDesign = useCallback((patch: Partial<DesignSettings>) => {
    setState((prev) => ({ ...prev, design: { ...prev.design, ...patch } }))
  }, [])

  const reset = useCallback(() => {
    setState(DEFAULT_STATE)
  }, [])

  return {
    data: state.data,
    template: state.template,
    theme: state.theme,
    design: state.design,
    hydrated,
    setData,
    setTemplate,
    setTheme,
    setDesign,
    reset,
  }
}
