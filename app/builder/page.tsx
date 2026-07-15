import type { Metadata } from 'next'
import { BuilderShell } from '@/components/builder/builder-shell'

export const metadata: Metadata = {
  title: 'Resume Builder',
  description:
    'Live-preview resume editor with 20 premium templates, inline editing, AI writing help, ATS scoring and PDF export.',
}

export default function BuilderPage() {
  return <BuilderShell />
}
