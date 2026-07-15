'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Magazine Column — newsroom-style masthead with a heavy rule, body flows
 * in two print-style columns via CSS columns (still a single content
 * stream, so it paginates safely). */
export function MagazineTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="border-b-4 pb-3 text-center" style={{ borderColor: 'var(--doc-accent)' }}>
        <EditableText
          as="h1"
          className="font-black uppercase tracking-tight text-slate-900"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="text-[13px] font-semibold uppercase tracking-widest"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-2 justify-center text-[11px] text-slate-500" />
      </header>

      <EditableText
        as="p"
        className="text-center text-slate-600"
        value={data.summary}
        placeholder="A short professional summary…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      {/* CSS multi-column: children must be normal block boxes (not flex) for
       * the browser to distribute them across columns, so spacing here is
       * margin-bottom via an arbitrary child selector, not a flex gap. */}
      <div className="[column-gap:2rem] [&>section]:mb-[var(--doc-section-gap)] [&>section]:break-inside-avoid sm:columns-2">
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary']} />
      </div>
    </div>
  )
}
