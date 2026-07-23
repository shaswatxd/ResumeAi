'use client'

import type { SectionId } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaExecutiveTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  const sidebarSections: SectionId[] = ['skills', 'education', 'certifications', 'languages']

  return (
    <div
      className="flex flex-col text-[12.5px] text-slate-800"
      style={{ lineHeight: 'var(--doc-line-height)' }}
    >
      <header
        className="flex items-center justify-between border-b-2 border-amber-500/40 bg-slate-900 px-8 py-6 text-white"
        style={{ padding: 'var(--doc-margin)' }}
      >
        <div className="flex flex-col">
          <EditableText
            as="h1"
            className="font-serif font-bold tracking-wide text-white"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Executive Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-1 text-[13.5px] font-medium tracking-wider text-amber-400 uppercase"
            value={data.role}
            placeholder="Chief Executive Officer / VP Operations"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-3 text-[11px] text-slate-300" />
        </div>

        <Photo
          data={data}
          className="size-24 shrink-0 rounded-full border-2 border-amber-400 text-2xl font-serif text-amber-400 shadow-md"
          fallbackStyle={{ background: '#1e293b' }}
        />
      </header>

      <div className="grid grid-cols-12 p-8" style={{ gap: 'calc(var(--doc-section-gap) * 1.2)' }}>
        <main className="col-span-8 flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={ExecutiveSection}
            skip={sidebarSections}
          />
        </main>

        <aside className="col-span-4 flex flex-col border-l border-slate-200 pl-6" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={ExecutiveSidebarSection}
            only={sidebarSections}
          />
        </aside>
      </div>
    </div>
  )
}

function ExecutiveSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 border-b border-amber-600/30 pb-1 font-serif text-[13px] font-bold uppercase tracking-widest text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  )
}

function ExecutiveSidebarSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 font-serif text-[11px] font-bold uppercase tracking-widest text-amber-700">
        {title}
      </h2>
      {children}
    </section>
  )
}
