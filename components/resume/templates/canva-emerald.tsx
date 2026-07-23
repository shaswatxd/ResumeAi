'use client'

import type { SectionId } from '@/lib/resume-types'
import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaEmeraldTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  const sidebarSections: SectionId[] = ['skills', 'languages', 'certifications', 'interests']

  return (
    <div
      className="grid min-h-full grid-cols-12 text-[12.5px] text-slate-800"
      style={{ lineHeight: 'var(--doc-line-height)' }}
    >
      {/* Sidebar */}
      <aside
        className="col-span-4 flex flex-col p-6 text-white"
        style={{
          background: 'linear-gradient(180deg, var(--doc-accent) 0%, #064e3b 100%)',
          gap: 'var(--doc-section-gap)',
        }}
      >
        <div className="flex flex-col items-center text-center">
          <Photo
            data={data}
            className="size-28 rounded-full border-4 border-white/20 text-3xl font-bold shadow-xl"
            fallbackStyle={{ background: 'rgba(255, 255, 255, 0.2)' }}
          />
          <EditableText
            as="h1"
            className="mt-4 font-bold leading-tight tracking-tight text-white"
            style={{ fontSize: 'calc(var(--doc-heading-size) * 0.9)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="mt-1 text-[13px] font-medium text-emerald-100"
            value={data.role}
            placeholder="Job Title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
        </div>

        <div className="rounded-xl bg-white/10 p-3.5 backdrop-blur-sm">
          <ContactRow data={data} className="flex-col gap-2 text-[11px] text-emerald-50" />
        </div>

        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={SidebarSection}
          only={sidebarSections}
        />
      </aside>

      {/* Main Content */}
      <main
        className="col-span-8 flex flex-col p-8"
        style={{ gap: 'var(--doc-section-gap)' }}
      >
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={EmeraldMainSection}
          skip={sidebarSections}
        />
      </main>
    </div>
  )
}

function SidebarSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 border-b border-emerald-400/30 pb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-200">
        {title}
      </h2>
      {children}
    </section>
  )
}

function EmeraldMainSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest text-slate-700">
        <span
          className="h-4 w-1.5 rounded-full"
          style={{ background: 'var(--doc-accent)' }}
        />
        {title}
      </h2>
      {children}
    </section>
  )
}
