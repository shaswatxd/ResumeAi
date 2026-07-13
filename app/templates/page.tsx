'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileText, Check } from 'lucide-react'
import { ResumeDocument } from '@/components/resume/resume-document'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  SAMPLE_DATA,
  TEMPLATES,
  THEMES,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v1'

export default function TemplatesPage() {
  const router = useRouter()
  const [themeId, setThemeId] = useState<ThemeId>('violet')
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  const applyTemplate = (id: TemplateId) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...parsed, template: id, theme: themeId }),
      )
    } catch {
      /* storage unavailable — builder will use defaults */
    }
    router.push('/builder')
  }

  return (
    <main className="min-h-dvh">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <FileText className="size-5" />
          </span>
          <span className="text-lg font-semibold">ResumeAI</span>
        </Link>
        <Link
          href="/builder"
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Open builder <ArrowRight className="size-4" />
        </Link>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-4">
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> Home
        </Link>
        <h1 className="text-3xl font-bold sm:text-4xl">
          {TEMPLATES.length} professional templates
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Every template is print-perfect, ATS-conscious, and switchable at any
          time — your content carries over instantly.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Accent
          </span>
          {THEMES.map((th) => (
            <button
              key={th.id}
              onClick={() => setThemeId(th.id)}
              title={th.name}
              aria-label={`${th.name} accent`}
              className={cn(
                'flex size-8 items-center justify-center rounded-full border transition-all',
                th.id === themeId
                  ? 'border-primary ring-2 ring-primary/40'
                  : 'border-border hover:border-primary/50',
              )}
            >
              <span
                className="size-5 rounded-full"
                style={{ background: th.accent }}
              />
              {th.id === themeId && (
                <Check className="absolute size-3 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((t) => (
          <div key={t.id} className="group flex flex-col">
            <div className="relative overflow-hidden rounded-xl border border-border bg-white shadow-xl transition-all group-hover:border-primary/50 group-hover:shadow-2xl">
              {/* A4 aspect, scaled-down live render */}
              <div className="pointer-events-none h-0 w-full pb-[141.4%]" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="w-[794px] origin-top-left scale-[var(--tpl-scale)] [--tpl-scale:0.42] sm:[--tpl-scale:0.44]">
                  <div style={{ width: 794, minHeight: 1123 }} className="bg-white">
                    <ResumeDocument
                      data={SAMPLE_DATA}
                      template={t.id}
                      theme={theme}
                    />
                  </div>
                </div>
              </div>
              {/* hover overlay */}
              <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity group-hover:opacity-100">
                <Button size="lg" className="h-11" onClick={() => applyTemplate(t.id)}>
                  Use this template <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <p className="font-semibold">{t.name}</p>
              {t.tag && (
                <span className="rounded bg-primary/15 px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {t.tag}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{t.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
