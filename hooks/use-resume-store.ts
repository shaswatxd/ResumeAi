'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_SETTINGS,
  EMPTY_DATA,
  type DocSettings,
  type ResumeData,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v1'

type StoredState = {
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  settings: DocSettings
}

const DEFAULT_STATE: StoredState = {
  data: EMPTY_DATA,
  template: 'glass',
  theme: 'violet',
  settings: DEFAULT_SETTINGS,
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
          data: { ...EMPTY_DATA, ...parsed.data },
          template: parsed.template ?? 'glass',
          theme: parsed.theme ?? 'violet',
          settings: { ...DEFAULT_SETTINGS, ...parsed.settings },
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

  const setSettings = useCallback((patch: Partial<DocSettings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...patch } }))
  }, [])

  const reset = useCallback(() => {
    setState(DEFAULT_STATE)
  }, [])

  return {
    data: state.data,
    template: state.template,
    theme: state.theme,
    settings: state.settings,
    hydrated,
    setData,
    setTemplate,
    setTheme,
    setSettings,
    reset,
  }
}
