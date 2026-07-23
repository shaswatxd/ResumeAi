'use client'

import type { SectionId } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaInfographicTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  const sidebarSections: SectionId[] = ['skills', 'certifications', 'languages', 'achievements']

  return (
    <div
      className="flex flex-col p-8 text-[12.5px] text-slate-800"
      style={{ lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center justify-between rounded-2xl bg-indigo-900 p-6 text-white shadow-lg">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-300">
            Infographic Resume
          </span>
          <EditableText
            as="h1"
            className="mt-1 font-extrabold leading-tight text-white"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-0.5 text-[14px] font-medium text-indigo-200"
            value={data.role}
            placeholder="Data Analyst / Growth Strategist"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-3 text-[11px] text-indigo-100" />
        </div>

        <Photo
          data={data}
          className="size-24 shrink-0 rounded-full border-4 border-indigo-400/40 text-2xl font-bold text-white shadow-md"
          fallbackStyle={{ background: '#312e81' }}
        />
      </header>

      {/* Highlights Bar */}
      {data.achievements?.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {data.achievements.slice(0, 3).map((ach, idx) => (
            <div key={idx} className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-3 text-center">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                Key Metric #{idx + 1}
              </span>
              <span className="mt-0.5 block text-[11.5px] font-semibold text-slate-800">
                {ach}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        <main className="col-span-8 flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={InfographicMainSection}
            skip={sidebarSections}
          />
        </main>

        <aside className="col-span-4 flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList
            data={data}
            theme={theme}
            design={design}
            S={InfographicSidebarSection}
            only={sidebarSections}
          />
        </aside>
      </div>
    </div>
  )
}

function InfographicMainSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 flex items-center gap-2 border-b-2 border-slate-100 pb-1 text-[12px] font-bold uppercase tracking-wider text-slate-900">
        <span className="size-2 rounded-full" style={{ background: 'var(--doc-accent)' }} />
        {title}
      </h2>
      {children}
    </section>
  )
}

function InfographicSidebarSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-slate-50 p-4 border border-slate-150">
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-indigo-900">
        {title}
      </h2>
      {children}
    </section>
  )
}
