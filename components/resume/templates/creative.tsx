'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

/* Creative Edge — a bold accent color-block header sliced by a diagonal
 * edge, with a circular photo straddling the seam into the white body.
 * Built for portfolio-adjacent roles that want a splash of personality. */
export function CreativeTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  return (
    <div className="flex flex-col text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header
        className="relative text-white"
        style={{
          background: 'var(--doc-accent)',
          padding: 'var(--doc-margin)',
          paddingBottom: '3.5rem',
          clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0 100%)',
        }}
      >
        <EditableText
          as="h1"
          className="font-bold leading-tight text-white"
          style={{ fontSize: 'var(--doc-heading-size)' }}
          value={data.fullName}
          placeholder="Your Name"
          onChange={(v) => update((d) => ({ ...d, fullName: v }))}
        />
        <EditableText
          as="p"
          className="mt-1 text-[15px] font-medium text-white/90"
          value={data.role}
          placeholder="Job title"
          onChange={(v) => update((d) => ({ ...d, role: v }))}
        />
        <ContactRow data={data} className="mt-3 text-[11.5px] text-white/85" />
      </header>

      <div className="flex justify-center" style={{ marginTop: '-3rem' }}>
        <Photo
          data={data}
          className="size-24 text-2xl text-white shadow-lg ring-4 ring-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
      </div>

      <div
        className="flex flex-col"
        style={{ padding: 'var(--doc-margin)', paddingTop: '0.75rem', gap: 'var(--doc-section-gap)' }}
      >
        <EditableText
          as="p"
          className="text-center text-slate-600"
          value={data.summary}
          placeholder="A short, energetic professional summary…"
          multiline
          onChange={(v) => update((d) => ({ ...d, summary: v }))}
        />

        <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
          <SectionList data={data} theme={theme} design={design} S={DotSection} skip={['summary']} />
        </div>
      </div>
    </div>
  )
}

function DotSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <span className="size-2 shrink-0 rounded-full" style={{ background: 'var(--doc-accent)' }} />
        {title}
      </h2>
      {children}
    </section>
  )
}
