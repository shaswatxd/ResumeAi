'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Terminal — a macOS-style terminal window for a header (traffic-light
 * dots, a `> whoami` prompt) followed by monospace body copy, commented
 * section headings, and accent-colored links/bullets throughout. */
export function DeveloperTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex flex-col font-mono text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header className="bg-slate-900 text-slate-200" style={{ padding: 'var(--doc-margin)' }}>
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-500" />
          <span className="size-2.5 rounded-full bg-amber-500" />
          <span className="size-2.5 rounded-full bg-emerald-500" />
        </div>
        <p className="mt-4 text-[12px] font-medium" style={{ color: 'var(--doc-accent)' }}>
          {'> whoami'}
        </p>
        <EditableText
          as="h1"
          className="mt-1 font-bold leading-tight text-white"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="text-[14px] font-medium"
          style={{ color: 'var(--doc-accent)' }}
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 text-[11.5px] text-slate-400" />
      </header>

      <div
        className="flex flex-col bg-white"
        style={{ padding: 'var(--doc-margin)', gap: 'var(--doc-section-gap)' }}
      >
        <EditableText
          as="p"
          className="text-slate-600"
          value={data.summary}
          placeholder="A short professional summary…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />

        <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList data={data} theme={theme} design={design} S={CodeSection} skip={['summary']} />
        </div>
      </div>
    </div>
  )
}

function CodeSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 text-[12px] font-semibold">
        <span style={{ color: 'var(--doc-accent)' }}>{'// '}{title}</span>
      </h2>
      {children}
    </section>
  )
}
