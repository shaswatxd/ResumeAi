'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import {
  LayoutTemplate,
  Sparkles,
  Download,
  FileText,
  Eye,
  Pencil,
  RotateCcw,
  Gauge,
  MoreHorizontal,
  FileUp,
  FileDown,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EditorPanel } from '@/components/builder/editor-panel'
import { PreviewPanel } from '@/components/builder/preview-panel'
import { TemplateDrawer } from '@/components/builder/template-drawer'
import { AiPanel } from '@/components/builder/ai-panel'
import { AtsPanel } from '@/components/builder/ats-panel'
import { useResumeStore } from '@/hooks/use-resume-store'
import { EMPTY_DATA, type ResumeData } from '@/lib/resume-types'
import { cn } from '@/lib/utils'

export function BuilderShell() {
  const {
    data,
    template,
    theme,
    settings,
    hydrated,
    setData,
    setTemplate,
    setTheme,
    setSettings,
    reset,
  } = useResumeStore()

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [atsOpen, setAtsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit')
  const importRef = useRef<HTMLInputElement>(null)

  const handleReset = () => {
    if (confirm('Clear all resume fields? This cannot be undone.')) {
      setData(EMPTY_DATA)
      reset()
    }
    setMenuOpen(false)
  }

  const handlePrint = () => {
    const prev = document.title
    document.title = data.fullName
      ? `${data.fullName} - Resume`
      : 'Resume - ResumeAI'
    window.print()
    document.title = prev
  }

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ data, template, theme }, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${(data.fullName || 'resume').replace(/\s+/g, '-').toLowerCase()}-resumeai.json`
    a.click()
    URL.revokeObjectURL(url)
    setMenuOpen(false)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result))
        const incoming = (parsed.data ?? parsed) as Partial<ResumeData>
        setData({ ...EMPTY_DATA, ...incoming })
        if (parsed.template) setTemplate(parsed.template)
        if (parsed.theme) setTheme(parsed.theme)
      } catch {
        alert('Invalid file — expected a ResumeAI JSON export.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
    setMenuOpen(false)
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden print:h-auto print:overflow-visible">
      {/* Top bar */}
      <header className="no-print z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-popover/80 px-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground"
            aria-label="ResumeAI home"
          >
            <FileText className="size-5" />
          </Link>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-none">ResumeAI</p>
            <p className="text-[11px] text-muted-foreground">
              {hydrated ? 'Saved locally' : 'Loading…'}
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="ml-2 h-10"
            onClick={() => setDrawerOpen(true)}
          >
            <LayoutTemplate className="size-4" />
            <span className="hidden sm:inline">Design</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-10"
            onClick={() => setAtsOpen(true)}
          >
            <Gauge className="size-4" />
            <span className="hidden sm:inline">ATS Score</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="lg"
              className="h-10 px-3"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="More options"
            >
              <MoreHorizontal className="size-4" />
            </Button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                  aria-hidden
                />
                <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-2xl">
                  <MenuItem
                    icon={FileDown}
                    label="Export JSON backup"
                    onClick={handleExport}
                  />
                  <MenuItem
                    icon={FileUp}
                    label="Import JSON"
                    onClick={() => importRef.current?.click()}
                  />
                  <MenuItem
                    icon={RotateCcw}
                    label="Reset everything"
                    destructive
                    onClick={handleReset}
                  />
                </div>
              </>
            )}
            <input
              ref={importRef}
              type="file"
              accept="application/json"
              className="sr-only"
              onChange={handleImport}
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="h-10 border-primary/40 bg-primary/10 text-primary hover:bg-primary/20"
            onClick={() => setAiOpen(true)}
          >
            <Sparkles className="size-4" />
            <span className="hidden sm:inline">Ask AI</span>
          </Button>
          <Button size="lg" className="h-10" onClick={handlePrint}>
            <Download className="size-4" />
            PDF
          </Button>
        </div>
      </header>

      {/* Mobile view switcher */}
      <div className="no-print flex shrink-0 gap-1 border-b border-border bg-popover/60 p-1.5 md:hidden">
        <ViewToggle
          active={mobileView === 'edit'}
          onClick={() => setMobileView('edit')}
          icon={Pencil}
          label="Edit"
        />
        <ViewToggle
          active={mobileView === 'preview'}
          onClick={() => setMobileView('preview')}
          icon={Eye}
          label="Preview"
        />
      </div>

      {/* Split workspace */}
      <div className="flex min-h-0 flex-1">
        {/* Editor */}
        <section
          className={cn(
            'w-full flex-col border-r border-border bg-popover/40 md:flex md:w-[46%] md:max-w-[560px] lg:w-[42%]',
            mobileView === 'edit' ? 'flex' : 'hidden',
          )}
        >
          <EditorPanel data={data} onChange={(u) => setData(u)} />
        </section>

        {/* Preview */}
        <section
          className={cn(
            'w-full flex-1 bg-background md:block',
            mobileView === 'preview' ? 'block' : 'hidden md:block',
          )}
        >
          <PreviewPanel
            data={data}
            template={template}
            theme={theme}
            settings={settings}
          />
        </section>
      </div>

      <TemplateDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        template={template}
        theme={theme}
        settings={settings}
        onTemplate={setTemplate}
        onTheme={setTheme}
        onSettings={setSettings}
      />
      <AiPanel
        open={aiOpen}
        onClose={() => setAiOpen(false)}
        resume={data}
        onApplyData={setData}
        onApplyTemplate={setTemplate}
      />
      <AtsPanel open={atsOpen} onClose={() => setAtsOpen(false)} resume={data} />
    </div>
  )
}

function MenuItem({
  icon: Icon,
  label,
  onClick,
  destructive,
}: {
  icon: typeof Eye
  label: string
  onClick: () => void
  destructive?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary',
        destructive && 'text-destructive hover:bg-destructive/10',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}

function ViewToggle({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Eye
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}
