'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileText, Check, Search } from 'lucide-react'
import { TemplateThumbnail } from '@/components/builder/template-thumbnail'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  THEMES,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

const STORAGE_KEY = 'resumeai:v2'

export default function TemplatesPage() {
  const router = useRouter()
  const [themeId, setThemeId] = useState<ThemeId>('blue')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const theme = THEMES.find((t) => t.id === themeId) ?? THEMES[0]

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  const applyTemplate = (id: TemplateId) => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : {}
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...parsed, template: id, theme: themeId }))
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
        <h1 className="text-3xl font-bold sm:text-4xl">{TEMPLATES.length} premium templates</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Every template is original, print-perfect, and fully editable — colors, fonts, section
          order and photo all switch instantly, and your content carries over.
        </p>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search templates…"
              className="w-full rounded-lg border border-border bg-secondary/30 py-2.5 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
            />
          </div>
          <div className="flex items-center gap-2">
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
                  'relative flex size-8 items-center justify-center rounded-full border transition-all',
                  th.id === themeId ? 'border-primary ring-2 ring-primary/40' : 'border-border hover:border-primary/50',
                )}
              >
                <span className="size-5 rounded-full" style={{ background: th.accent }} />
                {th.id === themeId && <Check className="absolute size-3 text-white" />}
              </button>
            ))}
          </div>
        </div>

        <div className="scroll-thin mt-5 flex gap-1.5 overflow-x-auto pb-1">
          {['All', ...TEMPLATE_CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'shrink-0 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors',
                category === c
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground',
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 pb-20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <div key={t.id} className="group flex flex-col">
            <div className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-slate-100 shadow-xl transition-all group-hover:-translate-y-1 group-hover:border-primary/50 group-hover:shadow-2xl">
              <TemplateThumbnail template={t.id} theme={theme} scale={0.44} className="rounded-xl shadow-lg" />
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
        {filtered.length === 0 && (
          <p className="col-span-full py-16 text-center text-muted-foreground">
            No templates match “{query}”.
          </p>
        )}
      </div>
    </main>
  )
}
