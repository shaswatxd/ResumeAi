'use client'

import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as Linkedin,
  Code2 as Github,
  Link2,
} from 'lucide-react'
import type { AccentTheme, ResumeData } from '@/lib/resume-types'

export type TP = { data: ResumeData; theme: AccentTheme }

export type SectionComp = (p: {
  title: string
  theme: AccentTheme
  children: React.ReactNode
}) => React.ReactNode

export function hasContact(d: ResumeData) {
  return d.email || d.phone || d.location || d.linkedin || d.github || d.website
}

export function contactBits(d: ResumeData) {
  return [
    d.email && { icon: Mail, text: d.email },
    d.phone && { icon: Phone, text: d.phone },
    d.location && { icon: MapPin, text: d.location },
    d.linkedin && { icon: Linkedin, text: d.linkedin },
    d.github && { icon: Github, text: d.github },
    d.website && { icon: Globe, text: d.website },
  ].filter(Boolean) as { icon: typeof Mail; text: string }[]
}

export function Initials({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('')
  return <span>{initials || 'AB'}</span>
}

/* Round/square photo with initials fallback. Caller sizes via className. */
export function Photo({
  data,
  className,
  fallbackStyle,
}: {
  data: ResumeData
  className: string
  fallbackStyle?: React.CSSProperties
}) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden font-semibold ${className}`}
      style={data.photo ? undefined : fallbackStyle}
    >
      {data.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={data.photo || '/placeholder.svg'}
          alt={data.fullName}
          className="size-full object-cover"
        />
      ) : (
        <Initials name={data.fullName} />
      )}
    </div>
  )
}

export function ContactBit({
  icon: Icon,
  text,
}: {
  icon: typeof Mail
  text: string
}) {
  return (
    <span className="flex items-center gap-1">
      <Icon className="size-3" />
      {text}
    </span>
  )
}

export function SideBit({ icon: Icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <span className="flex items-center gap-2 break-all">
      <Icon className="size-3 shrink-0" />
      {text}
    </span>
  )
}

export function Section({
  title,
  theme,
  children,
}: {
  title: string
  theme: AccentTheme
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        <span className="h-0.5 w-5 rounded-full" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
}

export function ClassicSection({
  title,
  theme,
  children,
}: {
  title: string
  theme: AccentTheme
  children: React.ReactNode
}) {
  return (
    <section>
      <h2
        className="mb-2 border-b pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800"
        style={{ borderColor: `${theme.accent}55` }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export function MinimalSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function BulletList({
  bullets,
  theme,
}: {
  bullets: string[]
  theme: AccentTheme
}) {
  const items = bullets.filter((b) => b.trim())
  if (items.length === 0) return null
  return (
    <ul className="mt-1.5 flex flex-col gap-1">
      {items.map((b, i) => (
        <li key={i} className="flex gap-2">
          <span
            className="mt-[7px] size-1 shrink-0 rounded-full"
            style={{ background: theme.accent }}
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

/* --------------------- shared extra-section renderers --------------------- */
export function ProjectsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.projects.length === 0) return null
  return (
    <S title="Projects" theme={theme}>
      <div className="flex flex-col gap-3">
        {data.projects.map((p) => (
          <div key={p.id}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <p className="font-semibold text-slate-900">{p.name}</p>
              {p.tech && (
                <span className="text-[11px] text-slate-400">{p.tech}</span>
              )}
              {p.link && (
                <span
                  className="flex items-center gap-1 text-[11px]"
                  style={{ color: theme.accent }}
                >
                  <Link2 className="size-3" />
                  {p.link}
                </span>
              )}
            </div>
            {p.description && <p className="text-slate-600">{p.description}</p>}
          </div>
        ))}
      </div>
    </S>
  )
}

export function CertificationsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.certifications.length === 0) return null
  return (
    <S title="Certifications" theme={theme}>
      <div className="flex flex-col gap-1.5">
        {data.certifications.map((c) => (
          <div key={c.id} className="flex items-baseline justify-between gap-3">
            <p>
              <span className="font-semibold text-slate-900">{c.name}</span>
              {c.issuer && <span className="text-slate-500"> — {c.issuer}</span>}
            </p>
            {c.year && (
              <span className="shrink-0 text-[11px] text-slate-400">{c.year}</span>
            )}
          </div>
        ))}
      </div>
    </S>
  )
}

export function AchievementsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const items = data.achievements.filter((a) => a.trim())
  if (items.length === 0) return null
  return (
    <S title="Achievements" theme={theme}>
      <BulletList bullets={items} theme={theme} />
    </S>
  )
}

export function LanguagesBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.languages.length === 0) return null
  return (
    <S title="Languages" theme={theme}>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {data.languages.map((l) => (
          <span key={l.id}>
            <span className="font-medium text-slate-900">{l.name}</span>
            {l.level && <span className="text-slate-500"> · {l.level}</span>}
          </span>
        ))}
      </div>
    </S>
  )
}

export function InterestsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const items = data.interests.filter((i) => i.trim())
  if (items.length === 0) return null
  return (
    <S title="Interests" theme={theme}>
      <p className="text-slate-600">{items.join('  ·  ')}</p>
    </S>
  )
}

export function ReferencesBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.references.length === 0) return null
  return (
    <S title="References" theme={theme}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {data.references.map((r) => (
          <div key={r.id}>
            <p className="font-semibold text-slate-900">{r.name}</p>
            {r.title && <p className="text-slate-500">{r.title}</p>}
            {r.phone && (
              <p className="text-[11px] text-slate-500">
                <span className="font-medium">Phone:</span> {r.phone}
              </p>
            )}
            {r.email && (
              <p className="text-[11px] text-slate-500">
                <span className="font-medium">Email:</span> {r.email}
              </p>
            )}
          </div>
        ))}
      </div>
    </S>
  )
}

/* All extra sections in default order, with a given section chrome */
export function ExtraBlocks({ data, theme, S }: TP & { S: SectionComp }) {
  return (
    <>
      <ProjectsBlock data={data} theme={theme} S={S} />
      <CertificationsBlock data={data} theme={theme} S={S} />
      <AchievementsBlock data={data} theme={theme} S={S} />
      <LanguagesBlock data={data} theme={theme} S={S} />
      <InterestsBlock data={data} theme={theme} S={S} />
      <ReferencesBlock data={data} theme={theme} S={S} />
    </>
  )
}

export function SkillChips({ data, theme }: TP) {
  if (data.skills.length === 0) return null
  return (
    <div className="flex flex-wrap gap-2">
      {data.skills.map((s) => (
        <span
          key={s}
          className="rounded-md px-2.5 py-1 text-[11.5px] font-medium"
          style={{ background: theme.soft, color: theme.accent }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

export function ExperienceBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.experience.length === 0) return null
  return (
    <S title="Experience" theme={theme}>
      <div className="flex flex-col gap-4">
        {data.experience.map((e) => (
          <div key={e.id}>
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900">{e.role}</p>
                <p style={{ color: theme.accent }} className="font-medium">
                  {e.company}
                </p>
              </div>
              <span className="shrink-0 text-[11px] text-slate-400">
                {[e.start, e.end].filter(Boolean).join(' — ')}
              </span>
            </div>
            <BulletList bullets={e.bullets} theme={theme} />
          </div>
        ))}
      </div>
    </S>
  )
}

export function EducationBlock({ data, theme, S }: TP & { S: SectionComp }) {
  if (data.education.length === 0) return null
  return (
    <S title="Education" theme={theme}>
      <div className="flex flex-col gap-3">
        {data.education.map((ed) => (
          <div key={ed.id} className="flex items-baseline justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-900">{ed.degree}</p>
              <p style={{ color: theme.accent }} className="font-medium">
                {ed.school}
              </p>
              {ed.detail && <p className="text-slate-500">{ed.detail}</p>}
            </div>
            <span className="shrink-0 text-[11px] text-slate-400">
              {[ed.start, ed.end].filter(Boolean).join(' — ')}
            </span>
          </div>
        ))}
      </div>
    </S>
  )
}
