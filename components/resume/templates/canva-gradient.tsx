'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaGradientTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div className="flex flex-col text-[12.5px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      {/* Header Banner */}
      <header
        className="relative flex flex-col items-center justify-center p-8 text-center text-white"
        style={{
          background: 'linear-gradient(135deg, var(--doc-accent) 0%, #3b82f6 50%, #8b5cf6 100%)',
          paddingBottom: '3.5rem',
        }}
      >
        <EditableText
          as="h1"
          className="font-extrabold leading-tight text-white tracking-tight"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1 text-[14px] font-medium text-white/90"
          value={data.role}
          placeholder="Frontend Engineer & Designer"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 justify-center text-[11px] text-white/85" />
      </header>

      {/* Floating Photo */}
      <div className="flex justify-center" style={{ marginTop: '-3rem' }}>
        <Photo
          data={data}
          className="size-24 rounded-full border-4 border-white text-2xl font-bold text-white shadow-lg"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
      </div>

      <main
        className="flex flex-col p-8 pt-4"
        style={{ gap: 'var(--doc-section-gap)' }}
      >
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={GradientSection}
        />
      </main>
    </div>
  )
}

function GradientSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-widest text-slate-800">
        <span
          className="size-2.5 rounded-full"
          style={{ background: 'var(--doc-accent)' }}
        />
        {title}
        <span className="h-px flex-1 bg-slate-200" />
      </h2>
      {children}
    </section>
  )
}
