'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaMetroTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div
      className="flex flex-col p-8 text-[12.5px] text-slate-800"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-stretch overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div
          className="flex w-3 shrink-0"
          style={{ background: 'var(--doc-accent)' }}
        />
        <div className="flex flex-1 items-center justify-between p-6">
          <div>
            <EditableText
              as="h1"
              className="font-bold leading-tight tracking-tight text-slate-900"
              style={{ fontSize: 'var(--doc-heading-size)' }}
              value={data.fullName}
              placeholder="Your Name"
              onChange={(v) => update((d) => ({ ...d, fullName: v }))}
            />
            <EditableText
              as="p"
              className="mt-0.5 text-[14px] font-semibold text-slate-600"
              value={data.role}
              placeholder="Full Stack Engineer / Consultant"
              onChange={(v) => update((d) => ({ ...d, role: v }))}
            />
            <ContactRow data={data} className="mt-3 text-[11px] text-slate-600" />
          </div>

          <Photo
            data={data}
            className="size-20 shrink-0 rounded-lg text-xl font-bold text-slate-700 bg-slate-100"
          />
        </div>
      </header>

      <main className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={MetroSection}
        />
      </main>
    </div>
  )
}

function MetroSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4.5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-3.5 w-1 rounded-sm"
          style={{ background: 'var(--doc-accent)' }}
        />
        <h2 className="text-[12px] font-bold uppercase tracking-wider text-slate-900">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}
