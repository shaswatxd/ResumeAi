'use client'

import { Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  TEMPLATES,
  THEMES,
  type DocSettings,
  type FontScale,
  type Spacing,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

type Props = {
  open: boolean
  onClose: () => void
  template: TemplateId
  theme: ThemeId
  settings: DocSettings
  onTemplate: (t: TemplateId) => void
  onTheme: (t: ThemeId) => void
  onSettings: (patch: Partial<DocSettings>) => void
}

const FONT_SCALES: { id: FontScale; label: string }[] = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
]

const SPACINGS: { id: Spacing; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal', label: 'Normal' },
  { id: 'relaxed', label: 'Relaxed' },
]

export function TemplateDrawer({
  open,
  onClose,
  template,
  theme,
  settings,
  onTemplate,
  onTheme,
  onSettings,
}: Props) {
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[360px] max-w-[92vw] flex-col border-r border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        role="dialog"
        aria-label="Templates and themes"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Design</h2>
            <p className="text-xs text-muted-foreground">
              Layout, color & typography
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        <div className="scroll-thin flex-1 overflow-y-auto p-5">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Layout — {TEMPLATES.length} templates
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {TEMPLATES.map((t) => {
              const active = t.id === template
              return (
                <button
                  key={t.id}
                  onClick={() => onTemplate(t.id)}
                  className={cn(
                    'group relative overflow-hidden rounded-xl border p-2.5 text-left transition-all',
                    active
                      ? 'border-primary ring-2 ring-primary/40'
                      : 'border-border hover:border-primary/50',
                  )}
                >
                  <TemplateThumb id={t.id} />
                  <div className="mt-2 flex items-center gap-1.5">
                    <p className="text-sm font-medium">{t.name}</p>
                    {t.tag && (
                      <span className="rounded bg-primary/15 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-primary">
                        {t.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] leading-tight text-muted-foreground">
                    {t.description}
                  </p>
                  {active && (
                    <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <h3 className="mb-3 mt-7 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Accent color
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {THEMES.map((th) => {
              const active = th.id === theme
              return (
                <button
                  key={th.id}
                  onClick={() => onTheme(th.id)}
                  title={th.name}
                  className={cn(
                    'flex items-center gap-2 rounded-lg border px-2.5 py-1.5 text-xs transition-all',
                    active
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-border hover:border-primary/50',
                  )}
                >
                  <span
                    className="size-4 rounded-full"
                    style={{ background: th.accent }}
                  />
                  {th.name}
                </button>
              )
            })}
          </div>

          <h3 className="mb-3 mt-7 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Font size
          </h3>
          <SegmentedControl
            options={FONT_SCALES}
            value={settings.fontScale}
            onChange={(v) => onSettings({ fontScale: v })}
          />

          <h3 className="mb-3 mt-6 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Line spacing
          </h3>
          <SegmentedControl
            options={SPACINGS}
            value={settings.spacing}
            onChange={(v) => onSettings({ spacing: v })}
          />
        </div>
      </aside>
    </>
  )
}

function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-secondary/30 p-1">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={cn(
            'flex-1 rounded-md py-1.5 text-xs font-medium transition-colors',
            o.id === value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

/* Small abstract preview of each layout using neutral blocks */
function TemplateThumb({ id }: { id: TemplateId }) {
  const bar = 'rounded-full bg-slate-300'
  const accent = 'rounded-full bg-primary/70'
  return (
    <div className="flex h-24 w-full overflow-hidden rounded-lg bg-white p-2">
      {id === 'sidebar' ? (
        <>
          <div className="mr-1.5 flex w-1/3 flex-col gap-1 rounded bg-primary/70 p-1.5">
            <div className="h-3 w-3 rounded-full bg-white/70" />
            <div className="h-1 w-full rounded-full bg-white/50" />
            <div className="h-1 w-4/5 rounded-full bg-white/50" />
          </div>
          <div className="flex flex-1 flex-col gap-1 pt-1">
            <div className={cn('h-1.5 w-3/4', accent)} />
            <div className={cn('h-1 w-full', bar)} />
            <div className={cn('h-1 w-full', bar)} />
            <div className={cn('h-1 w-2/3', bar)} />
          </div>
        </>
      ) : id === 'modern' ? (
        <>
          <div className="flex flex-1 flex-col gap-1 pt-1">
            <div className={cn('h-1.5 w-3/4', accent)} />
            <div className={cn('h-1 w-full', bar)} />
            <div className={cn('h-1 w-full', bar)} />
            <div className={cn('h-1 w-2/3', bar)} />
          </div>
          <div className="ml-1.5 flex w-1/3 flex-col gap-1 rounded bg-primary/15 p-1.5">
            <div className="h-1 w-full rounded-full bg-primary/40" />
            <div className="h-1 w-4/5 rounded-full bg-primary/40" />
            <div className="h-1 w-full rounded-full bg-primary/40" />
          </div>
        </>
      ) : id === 'banded' ? (
        <div className="flex w-full flex-col gap-1">
          <div className="mb-1 h-6 w-full rounded bg-primary/70" />
          <div className={cn('h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
          <div className={cn('h-1 w-full', bar)} />
          <div className={cn('h-1 w-2/3', bar)} />
        </div>
      ) : id === 'classic' ? (
        <div className="flex w-full flex-col items-center gap-1">
          <div className={cn('h-2 w-2/3', accent)} />
          <div className="h-px w-full bg-slate-200" />
          <div className={cn('mt-0.5 h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
          <div className={cn('h-1 w-full', bar)} />
        </div>
      ) : id === 'minimal' ? (
        <div className="flex w-full flex-col gap-1.5">
          <div className={cn('h-2 w-1/2', bar)} />
          <div className={cn('h-1 w-full', bar)} />
          <div className={cn('h-1 w-full', bar)} />
          <div className={cn('h-1 w-3/4', bar)} />
        </div>
      ) : id === 'executive' ? (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-end justify-between">
            <div className={cn('h-2 w-1/2', bar)} />
            <div className={cn('h-1 w-1/4', bar)} />
          </div>
          <div className="h-0.5 w-full rounded bg-primary/70" />
          <div className={cn('mt-0.5 h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
          <div className={cn('h-1 w-full', bar)} />
        </div>
      ) : id === 'compact' ? (
        <div className="flex w-full flex-col gap-[3px]">
          <div className="flex items-baseline gap-1">
            <div className={cn('h-1.5 w-1/3', bar)} />
            <div className={cn('h-1 w-1/4', accent)} />
          </div>
          <div className="h-px w-full bg-primary/60" />
          <div className={cn('h-[3px] w-full', bar)} />
          <div className={cn('h-[3px] w-5/6', bar)} />
          <div className={cn('h-[3px] w-full', bar)} />
          <div className={cn('h-[3px] w-full', bar)} />
          <div className={cn('h-[3px] w-2/3', bar)} />
          <div className={cn('h-[3px] w-full', bar)} />
          <div className={cn('h-[3px] w-4/5', bar)} />
        </div>
      ) : id === 'elegant' ? (
        <div className="flex w-full flex-col items-center gap-1">
          <div className={cn('h-1.5 w-1/2', bar)} />
          <div className={cn('h-1 w-1/3', accent)} />
          <div className="mt-1 flex w-full items-center gap-1">
            <div className="h-px flex-1 bg-slate-200" />
            <div className={cn('h-1 w-1/4', bar)} />
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className={cn('h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
        </div>
      ) : id === 'timeline' ? (
        <div className="flex w-full gap-1.5">
          <div className="flex flex-col items-center pt-2">
            <div className="size-1.5 rounded-full bg-primary/70" />
            <div className="w-px flex-1 bg-primary/30" />
            <div className="size-1.5 rounded-full bg-primary/70" />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <div className={cn('h-1.5 w-3/4', accent)} />
            <div className={cn('h-1 w-full', bar)} />
            <div className={cn('h-1 w-5/6', bar)} />
            <div className={cn('h-1 w-full', bar)} />
          </div>
        </div>
      ) : id === 'bold' ? (
        <div className="flex w-full flex-col gap-1">
          <div className={cn('h-3.5 w-5/6 rounded', bar)} />
          <div className="h-2 w-1/3 rounded bg-primary/70" />
          <div className={cn('mt-1 h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
        </div>
      ) : id === 'mono' ? (
        <div className="flex w-full flex-col gap-1 font-mono">
          <div className="h-1 w-1/4 rounded bg-primary/60" />
          <div className={cn('h-2 w-1/2', bar)} />
          <div className="h-px w-full bg-slate-200" />
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded bg-primary/70" />
            <div className={cn('h-1 w-3/4', bar)} />
          </div>
          <div className="flex items-center gap-1">
            <div className="h-1 w-1 rounded bg-primary/70" />
            <div className={cn('h-1 w-2/3', bar)} />
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded-md bg-primary/70" />
            <div className="flex flex-1 flex-col gap-1">
              <div className={cn('h-1.5 w-3/4', accent)} />
              <div className={cn('h-1 w-1/2', bar)} />
            </div>
          </div>
          <div className={cn('mt-1 h-1 w-full', bar)} />
          <div className={cn('h-1 w-5/6', bar)} />
          <div className={cn('h-1 w-full', bar)} />
        </div>
      )}
    </div>
  )
}
