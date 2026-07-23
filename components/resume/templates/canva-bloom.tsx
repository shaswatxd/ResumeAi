'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaBloomTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div
      className="flex flex-col p-8 text-[12.5px] text-slate-700"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex flex-col items-center justify-center rounded-3xl bg-teal-50/70 p-6 text-center border border-teal-100/80 shadow-sm">
        <Photo
          data={data}
          className="size-24 rounded-full border-4 border-white text-2xl font-bold text-teal-800 shadow-md"
          fallbackStyle={{ background: '#ccfbf1' }}
        />

        <EditableText
          as="h1"
          className="mt-3 font-extrabold leading-tight text-slate-800 tracking-tight"
          style={{ fontSize: 'var(--doc-heading-size)', color: 'var(--doc-accent)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-0.5 text-[14px] font-semibold text-slate-600"
          value={data.role}
          placeholder="Creative Designer & Specialist"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 justify-center text-[11px] text-slate-600" />
      </header>

      <main className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={BloomSection}
        />
      </main>
    </div>
  )
}

function BloomSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <h2 className="mb-2.5 flex items-center justify-between border-b border-teal-100 pb-1.5 text-[11.5px] font-bold uppercase tracking-widest text-slate-800">
        <span>{title}</span>
        <span className="size-2 rounded-full" style={{ background: 'var(--doc-accent)' }} />
      </h2>
      {children}
    </section>
  )
}
