'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaCoralTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div
      className="flex flex-col p-8 text-[12.5px] text-slate-800"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center gap-6 rounded-2xl bg-rose-50/80 p-6 border border-rose-100 shadow-sm">
        <Photo
          data={data}
          className="size-24 shrink-0 rounded-2xl text-2xl font-bold text-rose-700 shadow-sm"
          fallbackStyle={{ background: '#ffe4e6' }}
        />

        <div className="flex flex-1 flex-col">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-slate-900"
            style={{ fontSize: 'var(--doc-heading-size)', color: 'var(--doc-accent)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-0.5 text-[14px] font-semibold text-slate-600"
            value={data.role}
            placeholder="Product Strategist / Marketing Lead"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-3 text-[11px] text-slate-600" />
        </div>
      </header>

      <main className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={CoralSection}
        />
      </main>
    </div>
  )
}

function CoralSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-150 bg-white p-4 shadow-sm">
      <h2 className="mb-2.5 flex items-center justify-between border-b border-rose-100 pb-1.5 text-[11.5px] font-bold uppercase tracking-widest text-slate-900">
        <span>{title}</span>
        <span className="h-1.5 w-6 rounded-full" style={{ background: 'var(--doc-accent)' }} />
      </h2>
      {children}
    </section>
  )
}
