'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/*
 * Renders children into a body-level element that is invisible on screen
 * and becomes the ONLY visible element when printing. Avoids every
 * absolute-position/visibility print hack — the sheet is a plain
 * in-flow block, so multi-page content paginates naturally.
 */
export function PrintSheet({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null
  return createPortal(
    <div className="print-sheet bg-white">{children}</div>,
    document.body,
  )
}
