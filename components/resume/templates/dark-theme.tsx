'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Midnight Pro — self-contained dark paper with a glowing accent name.
 * Independent of the global light/dark colorMode toggle: this template is
 * always dark by design, the same way a real "dark theme" template is. */
export function DarkThemeTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div
      className="flex flex-col text-[13px] text-slate-300"
      style={{
        padding: 'var(--doc-margin)',
        lineHeight: 'var(--doc-line-height)',
        gap: 'var(--doc-section-gap)',
        background: '#0b0f1a',
        color: '#cbd5e1',
      }}
    >
      <header className="flex items-center gap-5">
        <Photo
          data={data}
          className="size-20 shrink-0 text-2xl text-white ring-2"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="min-w-0 flex-1">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-white"
            style={{ fontSize: 'var(--doc-heading-size)', textShadow: '0 0 24px color-mix(in srgb, var(--doc-accent) 55%, transparent)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="text-[15px] font-semibold"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-2 text-[11.5px] text-slate-400" />
        </div>
      </header>

      <EditableText
        as="p"
        className="text-slate-400"
        value={data.summary}
        placeholder="A short professional summary…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={DarkSection} skip={['summary']} />
      </div>
    </div>
  )
}

function DarkSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <span className="h-0.5 w-5 rounded-full" style={{ background: 'var(--doc-accent)' }} />
        {title}
      </h2>
      <div className="text-slate-300 [&_.text-slate-900]:text-white [&_.text-slate-800]:text-white [&_.text-slate-600]:text-slate-300 [&_.text-slate-500]:text-slate-400 [&_.text-slate-400]:text-slate-500">
        {children}
      </div>
    </section>
  )
}
