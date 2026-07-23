'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaObsidianTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div
      className="flex min-h-full flex-col bg-slate-950 p-8 text-[12.5px] text-slate-300"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center gap-6 rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl backdrop-blur-md">
        <Photo
          data={data}
          className="size-24 shrink-0 rounded-xl border border-slate-700 text-2xl font-bold text-slate-100 shadow-md"
          fallbackStyle={{ background: '#1e293b' }}
        />

        <div className="flex flex-1 flex-col">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-white tracking-tight"
            style={{ fontSize: 'var(--doc-heading-size)', color: 'var(--doc-accent)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-0.5 text-[14px] font-semibold text-slate-300"
            value={data.role}
            placeholder="Senior Software Architect"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-3 text-[11px] text-slate-400" />
        </div>
      </header>

      <main className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={ObsidianSection}
        />
      </main>
    </div>
  )
}

function ObsidianSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4">
      <h2 className="mb-2.5 flex items-center gap-2 border-b border-slate-800 pb-1.5 text-[11.5px] font-bold uppercase tracking-widest text-slate-200">
        <span
          className="size-2 rounded-full"
          style={{ background: 'var(--doc-accent)' }}
        />
        {title}
      </h2>
      {children}
    </section>
  )
}
