'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'

export function CanvaCreativeTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()

  return (
    <div className="flex flex-col text-[13px] text-slate-700" style={{ lineHeight: 'var(--doc-line-height)' }}>
      <header
        className="relative flex flex-col p-8 pb-14 text-white"
        style={{
          background: 'linear-gradient(135deg, var(--doc-accent) 0%, #4338ca 100%)',
          borderRadius: '0 0 2rem 2rem',
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              Creative Portfolio
            </span>
            <EditableText
              as="h1"
              className="mt-2 font-black leading-tight text-white"
              style={{ fontSize: 'var(--doc-heading-size)' }}
              value={data.fullName}
              placeholder="Your Full Name"
              onChange={(v) => update((d) => ({ ...d, fullName: v }))}
            />
            <EditableText
              as="p"
              className="mt-1 text-[15px] font-semibold text-white/90"
              value={data.role}
              placeholder="Creative Director / Lead Designer"
              onChange={(v) => update((d) => ({ ...d, role: v }))}
            />
          </div>

          <Photo
            data={data}
            className="size-24 shrink-0 rounded-2xl border-4 border-white/30 text-2xl text-white shadow-2xl"
            fallbackStyle={{ background: 'rgba(255,255,255,0.2)' }}
          />
        </div>

        <ContactRow data={data} className="mt-4 text-[11.5px] text-white/90" />
      </header>

      <main
        className="flex flex-col p-8"
        style={{ gap: 'var(--doc-section-gap)' }}
      >
        <SectionList
          data={data}
          theme={theme}
          design={design}
          S={CreativeSection}
        />
      </main>
    </div>
  )
}

function CreativeSection({ title, children }: { title: string; theme: unknown; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-100 bg-slate-50/50 p-4 shadow-sm">
      <h2 className="mb-3 flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-widest text-slate-800">
        <span
          className="size-2.5 rounded-sm"
          style={{ background: 'var(--doc-accent)' }}
        />
        {title}
      </h2>
      {children}
    </section>
  )
}
