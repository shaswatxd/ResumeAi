'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaNordicTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div
      className="flex flex-col p-8 text-[12.5px] text-zinc-800"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex justify-between items-start border-b border-zinc-200 pb-6">
        <div>
          <EditableText
            as="h1"
            className="font-black leading-tight tracking-tight text-zinc-900"
            style={{ fontSize: 'calc(var(--doc-heading-size) * 1.1)' }}
            value={data.fullName}
            placeholder="Firstname Lastname"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-1 text-[14px] font-semibold text-zinc-500 tracking-wide uppercase"
            value={data.role}
            placeholder="Product Designer & Lead"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-4 text-[11px] text-zinc-600" />
        </div>

        <Photo
          data={data}
          className="size-20 shrink-0 rounded-lg text-xl font-bold text-zinc-700 bg-zinc-100"
        />
      </header>

      <main className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={NordicSection}
        />
      </main>
    </div>
  )
}

function NordicSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="pl-4 border-l-2" style={{ borderColor: 'var(--doc-accent)' }}>
      <h2 className="mb-2 text-[11.5px] font-extrabold uppercase tracking-widest text-zinc-900">
        {title}
      </h2>
      {children}
    </section>
  )
}
