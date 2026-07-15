'use client'

import { useCallback, useEffect, useRef } from 'react'
import { Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useResumeEdit } from '@/components/resume/resume-context'

type EditableTextProps = {
  value: string
  onChange: (value: string) => void
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2'
  className?: string
  style?: React.CSSProperties
  placeholder?: string
  /** allow line breaks (Enter inserts newline instead of committing) */
  multiline?: boolean
}

/*
 * contentEditable text primitive. Renders uncontrolled — the DOM owns the
 * text while the user types, and we only push the value back into the
 * React tree on commit (debounced input + blur). Forcing React-controlled
 * children on every keystroke would reset the caret position.
 */
export function EditableText({
  value,
  onChange,
  as = 'span',
  className,
  style,
  placeholder = 'Click to edit',
  multiline = false,
}: EditableTextProps) {
  const { isEditable } = useResumeEdit()
  const ref = useRef<HTMLElement | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const Tag = as as unknown as 'span'

  // Content is ALWAYS set imperatively via this effect, in both editable and
  // read-only states — never as a React children prop. Rendering `{value}`
  // as children in one branch and switching to a childless contentEditable
  // node in another (e.g. when a resume flips from "empty/sample" to
  // "has content" mid-keystroke) causes React's reconciliation to fight the
  // imperative DOM writes, which visibly duplicates text. A single, always-
  // imperative code path sidesteps that entirely.
  useEffect(() => {
    const node = ref.current
    if (node && node.innerText !== value) node.innerText = value
  }, [value])

  const commit = useCallback(() => {
    const text = ref.current?.innerText ?? ''
    if (text !== value) onChange(text)
  }, [onChange, value])

  return (
    <Tag
      ref={ref as React.RefObject<HTMLSpanElement>}
      contentEditable={isEditable}
      suppressContentEditableWarning
      data-placeholder={isEditable ? placeholder : undefined}
      style={style}
      className={cn(
        className,
        'whitespace-pre-wrap break-words rounded-[3px] outline-none',
        isEditable && [
          'cursor-text transition-shadow',
          'hover:bg-[color-mix(in_srgb,var(--doc-accent)_8%,transparent)]',
          'focus:bg-[color-mix(in_srgb,var(--doc-accent)_10%,transparent)] focus:shadow-[0_0_0_2px_var(--doc-accent)]',
          'empty:before:pointer-events-none empty:before:text-slate-300 empty:before:content-[attr(data-placeholder)]',
        ],
      )}
      onInput={
        isEditable
          ? () => {
              if (debounceRef.current) clearTimeout(debounceRef.current)
              debounceRef.current = setTimeout(commit, 250)
            }
          : undefined
      }
      onBlur={
        isEditable
          ? () => {
              if (debounceRef.current) clearTimeout(debounceRef.current)
              commit()
            }
          : undefined
      }
      onKeyDown={
        isEditable
          ? (e) => {
              if (!multiline && e.key === 'Enter') {
                e.preventDefault()
                ;(e.currentTarget as HTMLElement).blur()
              }
            }
          : undefined
      }
    />
  )
}

/* Bullet list with inline add/remove, used for experience bullets & achievements */
export function EditableBulletList({
  bullets,
  onChange,
  className,
}: {
  bullets: string[]
  onChange: (bullets: string[]) => void
  className?: string
}) {
  const { isEditable } = useResumeEdit()
  const items = isEditable ? bullets : bullets.filter((b) => b.trim())
  if (!isEditable && items.length === 0) return null

  return (
    <ul className={cn('mt-1.5 flex flex-col gap-1', className)}>
      {items.map((b, i) => (
        <li key={i} className="group/bullet flex items-start gap-2">
          <span
            className="mt-[7px] size-1 shrink-0 rounded-full"
            style={{ background: 'var(--doc-accent)' }}
          />
          <EditableText
            as="span"
            value={b}
            placeholder="Describe an achievement…"
            className="flex-1"
            onChange={(v) => {
              const next = [...bullets]
              next[i] = v
              onChange(next)
            }}
          />
          {isEditable && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onChange(bullets.filter((_, idx) => idx !== i))}
              className="no-print mt-0.5 shrink-0 text-slate-300 opacity-0 transition-opacity hover:text-red-500 group-hover/bullet:opacity-100"
              aria-label="Remove bullet"
            >
              <X className="size-3" />
            </button>
          )}
        </li>
      ))}
      {isEditable && (
        <li>
          <button
            type="button"
            onClick={() => onChange([...bullets, ''])}
            className="no-print flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-[color:var(--doc-accent)]"
          >
            <Plus className="size-3" /> Add bullet
          </button>
        </li>
      )}
    </ul>
  )
}

/* Chip list with inline add/remove, used for skills & interests */
export function EditableChips({
  items,
  onChange,
  placeholder = 'Skill',
}: {
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  const { isEditable } = useResumeEdit()
  const visible = isEditable ? items : items.filter((s) => s.trim())
  if (!isEditable && visible.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2">
      {visible.map((s, i) => (
        <span
          key={i}
          className="group/chip flex items-center gap-1 rounded-md px-2.5 py-1 text-[11.5px] font-medium"
          style={{ background: 'var(--doc-accent-soft)', color: 'var(--doc-accent)' }}
        >
          <EditableText
            as="span"
            value={s}
            placeholder={placeholder}
            onChange={(v) => {
              const next = [...items]
              next[i] = v
              onChange(next)
            }}
          />
          {isEditable && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              className="no-print opacity-0 transition-opacity hover:text-red-500 group-hover/chip:opacity-100"
              aria-label="Remove"
            >
              <X className="size-3" />
            </button>
          )}
        </span>
      ))}
      {isEditable && (
        <button
          type="button"
          onClick={() => onChange([...items, ''])}
          className="no-print flex items-center gap-1 rounded-md border border-dashed border-slate-300 px-2.5 py-1 text-[11.5px] font-medium text-slate-400 hover:border-[color:var(--doc-accent)] hover:text-[color:var(--doc-accent)]"
        >
          <Plus className="size-3" /> Add
        </button>
      )}
    </div>
  )
}
