'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { HexColorPicker } from 'react-colorful'
import {
  Check,
  Eye,
  EyeOff,
  GripVertical,
  LayoutTemplate,
  Palette,
  Plus,
  Search,
  Sliders,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TemplateThumbnail } from '@/components/builder/template-thumbnail'
import { allSectionEntries } from '@/lib/section-registry'
import { FONTS, fontCssValue } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  THEMES,
  isSectionVisible,
  uid,
  type DesignSettings,
  type ResumeData,
  type SectionId,
  type SizeScale,
  type TemplateId,
  type ThemeId,
} from '@/lib/resume-types'

type Props = {
  open: boolean
  onClose: () => void
  data: ResumeData
  template: TemplateId
  theme: ThemeId
  design: DesignSettings
  onTemplate: (t: TemplateId) => void
  onTheme: (t: ThemeId) => void
  onDesign: (patch: Partial<DesignSettings>) => void
  onData: (updater: (prev: ResumeData) => ResumeData) => void
}

type Tab = 'templates' | 'design'

export function DesignPanel({
  open,
  onClose,
  data,
  template,
  theme,
  design,
  onTemplate,
  onTheme,
  onDesign,
  onData,
}: Props) {
  const [tab, setTab] = useState<Tab>('templates')
  const [hasOpened, setHasOpened] = useState(false)
  const accentTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0]

  useEffect(() => {
    if (open) setHasOpened(true)
  }, [open])

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
          'fixed inset-y-0 left-0 z-50 flex w-[400px] max-w-[94vw] flex-col border-r border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
        role="dialog"
        aria-label="Design"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Design</h2>
            <p className="text-xs text-muted-foreground">Layout, color, typography & sections</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex shrink-0 gap-1 border-b border-border p-1.5">
          <TabButton active={tab === 'templates'} onClick={() => setTab('templates')} icon={LayoutTemplate} label="Templates" />
          <TabButton active={tab === 'design'} onClick={() => setTab('design')} icon={Sliders} label="Design" />
        </div>

        <div className="scroll-thin flex-1 overflow-y-auto p-5">
          {/* Defer mounting until first opened — the Templates tab renders 20
           * live resume previews, which is wasted work while the panel is
           * hidden. Once opened, keep it mounted to avoid remount cost on
           * every toggle. */}
          {hasOpened && (
            <AnimatePresence mode="wait">
              {tab === 'templates' ? (
                <motion.div key="templates" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                  <TemplatesTab template={template} theme={accentTheme} onTemplate={onTemplate} />
                </motion.div>
              ) : (
                <motion.div key="design" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
                  <DesignTab
                    data={data}
                    theme={theme}
                    design={design}
                    onTheme={onTheme}
                    onDesign={onDesign}
                    onData={onData}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </aside>
    </>
  )
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof Sliders
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-sm font-medium transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}

/* --------------------------------- templates -------------------------------- */

function TemplatesTab({
  template,
  theme,
  onTemplate,
}: {
  template: TemplateId
  theme: (typeof THEMES)[number]
  onTemplate: (t: TemplateId) => void
}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<string>('All')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return TEMPLATES.filter((t) => {
      const matchesCategory = category === 'All' || t.category === category
      const matchesQuery =
        !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <div>
      <div className="relative mb-3">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search templates…"
          className="w-full rounded-lg border border-border bg-secondary/30 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/50"
        />
      </div>

      <div className="scroll-thin mb-4 flex gap-1.5 overflow-x-auto pb-1">
        {['All', ...TEMPLATE_CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              'shrink-0 rounded-full border px-3 py-1 text-[11.5px] font-medium transition-colors',
              category === c ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:border-primary/50',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {filtered.length} template{filtered.length === 1 ? '' : 's'}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((t) => {
          const active = t.id === template
          return (
            <motion.button
              key={t.id}
              onClick={() => onTemplate(t.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'group relative overflow-hidden rounded-xl border text-left shadow-sm transition-colors',
                active ? 'border-primary ring-2 ring-primary/40' : 'border-border hover:border-primary/50',
              )}
            >
              <div className="flex items-center justify-center bg-slate-100 p-2.5">
                <TemplateThumbnail template={t.id} theme={theme} className="rounded-md shadow" />
              </div>
              <div className="p-2.5 pt-2">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  {t.tag && (
                    <span className="shrink-0 rounded bg-primary/15 px-1.5 py-px text-[9px] font-semibold uppercase tracking-wide text-primary">
                      {t.tag}
                    </span>
                  )}
                </div>
                <p className="truncate text-[11px] text-muted-foreground">{t.category}</p>
              </div>
              {active && (
                <span className="absolute right-2 top-2 flex size-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Check className="size-3" />
                </span>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ----------------------------------- design ---------------------------------- */

function DesignTab({
  data,
  theme,
  design,
  onTheme,
  onDesign,
  onData,
}: {
  data: ResumeData
  theme: ThemeId
  design: DesignSettings
  onTheme: (t: ThemeId) => void
  onDesign: (patch: Partial<DesignSettings>) => void
  onData: (updater: (prev: ResumeData) => ResumeData) => void
}) {
  return (
    <div className="flex flex-col gap-7">
      <Field label="Color theme">
        <div className="flex flex-wrap gap-2">
          {THEMES.map((th) => {
            const active = th.id === theme && design.accentColor === th.accent
            return (
              <button
                key={th.id}
                title={th.name}
                onClick={() => {
                  onTheme(th.id)
                  onDesign({ accentColor: th.accent })
                }}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all',
                  active ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50',
                )}
              >
                <span className="size-3.5 rounded-full" style={{ background: th.accent }} />
                {th.name}
              </button>
            )
          })}
          <ColorPickerButton
            label="Custom"
            color={design.accentColor}
            onChange={(hex) => onDesign({ accentColor: hex })}
          />
        </div>
      </Field>

      <Field label="Background color">
        <div className="flex items-center gap-2">
          <ColorPickerButton label="Background" color={design.backgroundColor} onChange={(hex) => onDesign({ backgroundColor: hex })} swatchOnly />
          <button
            onClick={() => onDesign({ backgroundColor: '#ffffff' })}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-primary/50"
          >
            Reset to white
          </button>
        </div>
      </Field>

      <Field label="Font family">
        <div className="grid grid-cols-2 gap-2">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => onDesign({ fontFamily: f.id })}
              style={{ fontFamily: fontCssValue(f.id) }}
              className={cn(
                'truncate rounded-lg border px-3 py-2 text-left text-sm transition-colors',
                design.fontFamily === f.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Font size">
        <Segmented options={SIZE_OPTIONS} value={design.fontSize} onChange={(v) => onDesign({ fontSize: v })} />
      </Field>

      <Field label="Heading size">
        <Segmented options={SIZE_OPTIONS} value={design.headingScale} onChange={(v) => onDesign({ headingScale: v })} />
      </Field>

      <Field label="Line height">
        <Segmented options={DENSITY_OPTIONS} value={design.lineHeight} onChange={(v) => onDesign({ lineHeight: v })} />
      </Field>

      <Field label="Section spacing">
        <Segmented options={DENSITY_OPTIONS} value={design.sectionSpacing} onChange={(v) => onDesign({ sectionSpacing: v })} />
      </Field>

      <Field label="Page margin">
        <Segmented
          options={[
            { id: 'narrow', label: 'Narrow' },
            { id: 'normal', label: 'Normal' },
            { id: 'wide', label: 'Wide' },
          ]}
          value={design.pageMargin}
          onChange={(v) => onDesign({ pageMargin: v })}
        />
      </Field>

      <Field label="Border radius">
        <Segmented
          options={[
            { id: 'none', label: 'None' },
            { id: 'soft', label: 'Soft' },
            { id: 'rounded', label: 'Rounded' },
          ]}
          value={design.borderRadius}
          onChange={(v) => onDesign({ borderRadius: v })}
        />
      </Field>

      <Field label="Photo shape">
        <Segmented
          options={[
            { id: 'circle', label: 'Circle' },
            { id: 'rounded', label: 'Rounded' },
            { id: 'square', label: 'Square' },
          ]}
          value={design.photoShape}
          onChange={(v) => onDesign({ photoShape: v })}
        />
      </Field>

      <Field label="Icon style">
        <Segmented
          options={[
            { id: 'outline', label: 'Outline' },
            { id: 'filled', label: 'Filled' },
            { id: 'none', label: 'None' },
          ]}
          value={design.iconStyle}
          onChange={(v) => onDesign({ iconStyle: v })}
        />
      </Field>

      <Field label="Divider style">
        <Segmented
          options={[
            { id: 'line', label: 'Line' },
            { id: 'dashed', label: 'Dashed' },
            { id: 'dotted', label: 'Dotted' },
            { id: 'none', label: 'None' },
          ]}
          value={design.dividerStyle}
          onChange={(v) => onDesign({ dividerStyle: v })}
        />
      </Field>

      <Field label="Page size">
        <Segmented
          options={[
            { id: 'a4', label: 'A4' },
            { id: 'letter', label: 'Letter' },
          ]}
          value={design.pageSize}
          onChange={(v) => onDesign({ pageSize: v })}
        />
      </Field>

      <Field label="Appearance">
        <Segmented
          options={[
            { id: 'light', label: 'Light' },
            { id: 'dark', label: 'Dark' },
          ]}
          value={design.colorMode}
          onChange={(v) => onDesign({ colorMode: v })}
        />
      </Field>

      <Field label="Sections">
        <SectionOrderList data={data} design={design} onDesign={onDesign} onData={onData} />
      </Field>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</h3>
      {children}
    </div>
  )
}

const SIZE_OPTIONS: { id: SizeScale; label: string }[] = [
  { id: 'sm', label: 'Small' },
  { id: 'md', label: 'Medium' },
  { id: 'lg', label: 'Large' },
]

const DENSITY_OPTIONS: { id: 'compact' | 'normal' | 'relaxed'; label: string }[] = [
  { id: 'compact', label: 'Compact' },
  { id: 'normal', label: 'Normal' },
  { id: 'relaxed', label: 'Relaxed' },
]

function Segmented<T extends string>({
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
            o.id === value ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

function ColorPickerButton({
  label,
  color,
  onChange,
  swatchOnly,
}: {
  label: string
  color: string
  onChange: (hex: string) => void
  swatchOnly?: boolean
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg border border-dashed border-border px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50',
          swatchOnly && 'border-solid',
        )}
      >
        <Palette className="size-3.5" style={{ color }} />
        {label}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute left-0 top-full z-50 mt-2 rounded-xl border border-border bg-popover p-3 shadow-2xl">
            <HexColorPicker color={color} onChange={onChange} />
            <input
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="mt-2 w-full rounded-md border border-border bg-secondary/30 px-2 py-1 text-center text-xs uppercase outline-none"
            />
          </div>
        </>
      )}
    </div>
  )
}

/* ------------------------------ section order ------------------------------- */

function SectionOrderList({
  data,
  design,
  onDesign,
  onData,
}: {
  data: ResumeData
  design: DesignSettings
  onDesign: (patch: Partial<DesignSettings>) => void
  onData: (updater: (prev: ResumeData) => ResumeData) => void
}) {
  const entries = allSectionEntries(data)
  const orderedIds = useMemo(() => {
    const known = new Set(design.sectionOrder)
    return [...design.sectionOrder, ...entries.map((e) => e.id).filter((id) => !known.has(id))]
  }, [design.sectionOrder, entries])
  const items = orderedIds
    .map((id) => entries.find((e) => e.id === id))
    .filter((e): e is { id: SectionId; label: string } => Boolean(e))

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 4 } }))

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = orderedIds.indexOf(active.id as SectionId)
    const newIndex = orderedIds.indexOf(over.id as SectionId)
    onDesign({ sectionOrder: arrayMove(orderedIds, oldIndex, newIndex) })
  }

  const addCustomSection = () => {
    const id = uid('sec')
    onData((d) => ({ ...d, customSections: [...d.customSections, { id, title: 'New Section', items: [] }] }))
    onDesign({ sectionOrder: [...design.sectionOrder, `custom:${id}` as SectionId] })
  }

  return (
    <div className="flex flex-col gap-1.5">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedIds} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableRow
              key={item.id}
              id={item.id}
              label={item.label}
              visible={isSectionVisible(design, item.id)}
              onToggle={() =>
                onDesign({
                  sectionVisibility: {
                    ...design.sectionVisibility,
                    [item.id]: isSectionVisible(design, item.id) ? false : true,
                  },
                })
              }
              onRemove={
                item.id.startsWith('custom:')
                  ? () => {
                      onData((d) => ({
                        ...d,
                        customSections: d.customSections.filter((s) => `custom:${s.id}` !== item.id),
                      }))
                      onDesign({ sectionOrder: design.sectionOrder.filter((sid) => sid !== item.id) })
                    }
                  : undefined
              }
              onRename={
                item.id.startsWith('custom:')
                  ? (title: string) =>
                      onData((d) => ({
                        ...d,
                        customSections: d.customSections.map((s) =>
                          `custom:${s.id}` === item.id ? { ...s, title } : s,
                        ),
                      }))
                  : undefined
              }
            />
          ))}
        </SortableContext>
      </DndContext>
      <button
        onClick={addCustomSection}
        className="mt-1 flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <Plus className="size-3.5" /> Add custom section
      </button>
    </div>
  )
}

function SortableRow({
  id,
  label,
  visible,
  onToggle,
  onRemove,
  onRename,
}: {
  id: SectionId
  label: string
  visible: boolean
  onToggle: () => void
  onRemove?: () => void
  onRename?: (label: string) => void
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center gap-2 rounded-lg border border-border bg-secondary/20 px-2.5 py-2"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <GripVertical className="size-4" />
      </button>
      {onRename ? (
        <input
          value={label}
          onChange={(e) => onRename(e.target.value)}
          placeholder="Section title"
          className="flex-1 truncate bg-transparent text-sm outline-none focus:underline"
        />
      ) : (
        <span className={cn('flex-1 truncate text-sm', !visible && 'text-muted-foreground line-through')}>{label}</span>
      )}
      <button onClick={onToggle} className="text-muted-foreground hover:text-foreground" aria-label={visible ? 'Hide section' : 'Show section'}>
        {visible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
      </button>
      {onRemove && (
        <button onClick={onRemove} className="text-muted-foreground hover:text-destructive" aria-label="Delete section">
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
