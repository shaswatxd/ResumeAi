'use client'

import type { TP } from '@/components/resume/blocks'
import { ContactRow, Photo, Section } from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { SectionList } from '@/lib/section-registry'
import { Plus, X } from 'lucide-react'

/* deterministic pseudo-proficiency so bars don't flicker on re-render */
function levelFor(name: string) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return 55 + (h % 41) // 55–95%
}

function SkillBars({ data }: TP) {
  const { update, isEditable } = useResumeEdit()
  const skills = data.skills
  if (skills.length === 0 && !isEditable) return null
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-3">
      {skills.map((s, i) => (
        <div key={i} className="group/bar">
          <div className="mb-1 flex items-center justify-between">
            <EditableText
              value={s}
              placeholder="Skill"
              className="text-[12px] font-medium text-slate-700"
              onChange={(v) => {
                const next = [...skills]
                next[i] = v
                update((d) => ({ ...d, skills: next }))
              }}
            />
            {isEditable && (
              <button
                type="button"
                tabIndex={-1}
                onClick={() => update((d) => ({ ...d, skills: skills.filter((_, idx) => idx !== i) }))}
                className="no-print text-slate-300 opacity-0 transition-opacity hover:text-red-500 group-hover/bar:opacity-100"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--doc-accent-soft)' }}>
            <div className="h-full rounded-full" style={{ width: `${levelFor(s || 'x')}%`, background: 'var(--doc-accent)' }} />
          </div>
        </div>
      ))}
      {isEditable && (
        <button
          type="button"
          onClick={() => update((d) => ({ ...d, skills: [...skills, ''] }))}
          className="no-print col-span-2 flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-[color:var(--doc-accent)]"
        >
          <Plus className="size-3" /> Add skill
        </button>
      )}
    </div>
  )
}

/* Infographic Pro — visual skill-proficiency bars and a stat-row header,
 * for the data-driven "infographic resume" genre. */
export function InfographicTemplate({ data, theme }: TP) {
  const { design, update } = useResumeEdit()
  const stats: { n: number; label: string }[] = [
    { n: data.experience.length, label: 'Roles' },
    { n: data.projects.length, label: 'Projects' },
    { n: data.certifications.length, label: 'Certs' },
  ]
  return (
    <div
      className="flex flex-col text-[13px] text-slate-700"
      style={{ padding: 'var(--doc-margin)', lineHeight: 'var(--doc-line-height)', gap: 'var(--doc-section-gap)' }}
    >
      <header className="flex items-center gap-5">
        <Photo
          data={data}
          className="size-20 shrink-0 text-2xl text-white"
          fallbackStyle={{ background: 'var(--doc-accent)' }}
        />
        <div className="min-w-0 flex-1">
          <EditableText
            as="h1"
            className="font-bold leading-tight text-slate-900"
            style={{ fontSize: 'var(--doc-heading-size)' }}
            value={data.fullName}
            placeholder="Your Name"
            onChange={(v) => update((d) => ({ ...d, fullName: v }))}
          />
          <EditableText
            as="p"
            className="text-[15px] font-semibold"
            style={{ color: 'var(--doc-accent)' }}
            value={data.role}
            placeholder="Job title"
            onChange={(v) => update((d) => ({ ...d, role: v }))}
          />
          <ContactRow data={data} className="mt-2 text-[11.5px] text-slate-500" />
        </div>
        <div className="hidden shrink-0 gap-4 sm:flex">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold" style={{ color: 'var(--doc-accent)' }}>
                {s.n}
              </p>
              <p className="text-[10px] uppercase tracking-wide text-slate-400">{s.label}</p>
            </div>
          ))}
        </div>
      </header>

      <EditableText
        as="p"
        className="text-slate-600"
        value={data.summary}
        placeholder="A short professional summary…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />

      <Section title="Skill Proficiency" theme={theme}>
        <SkillBars data={data} theme={theme} />
      </Section>

      <div className="flex flex-col" style={{ gap: 'var(--doc-section-gap)' }}>
        <SectionList data={data} theme={theme} design={design} S={Section} skip={['summary', 'skills']} />
      </div>
    </div>
  )
}
