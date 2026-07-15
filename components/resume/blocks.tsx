'use client'

import { Camera } from 'lucide-react'
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Link as Linkedin,
  Code2 as Github,
  Link2,
} from 'lucide-react'
import type { AccentTheme, CustomSection, ResumeData } from '@/lib/resume-types'
import { EditableBulletList, EditableChips, EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'
import { uid } from '@/lib/resume-types'
import { cn } from '@/lib/utils'

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

/* Round/square/rounded photo (shape driven by design.photoShape), with
 * initials fallback and a hover "change photo" affordance while editable. */
export function Photo({
  data,
  className,
  fallbackStyle,
}: {
  data: ResumeData
  className: string
  fallbackStyle?: React.CSSProperties
}) {
  const { isEditable, openPhotoEditor } = useResumeEdit()
  return (
    <div
      className={cn(
        'group/photo relative flex items-center justify-center overflow-hidden font-semibold',
        className,
        isEditable && openPhotoEditor && 'cursor-pointer',
      )}
      style={{
        borderRadius: 'var(--doc-photo-radius)',
        ...(data.photo ? undefined : fallbackStyle),
      }}
      onClick={isEditable ? openPhotoEditor : undefined}
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
      {isEditable && openPhotoEditor && (
        <div className="no-print absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover/photo:opacity-100">
          <Camera className="size-6 text-white" />
        </div>
      )}
    </div>
  )
}

/* icon wrapper respecting design.iconStyle: outline | filled (soft accent
 * circle) | none (label only, no icon) */
function IconWrap({ icon: Icon, size = 'size-3' }: { icon: typeof Mail; size?: string }) {
  const { design } = useResumeEdit()
  if (design.iconStyle === 'none') return null
  if (design.iconStyle === 'filled') {
    return (
      <span
        className="flex size-4 shrink-0 items-center justify-center rounded-full"
        style={{ background: 'var(--doc-accent-soft)', color: 'var(--doc-accent)' }}
      >
        <Icon className="size-2.5" />
      </span>
    )
  }
  return <Icon className={cn(size, 'shrink-0')} />
}

export function ContactBit({ icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <span className="flex items-center gap-1">
      <IconWrap icon={icon} />
      {text}
    </span>
  )
}

export function SideBit({ icon, text }: { icon: typeof Mail; text: string }) {
  return (
    <span className="flex items-center gap-2 break-all">
      <IconWrap icon={icon} />
      {text}
    </span>
  )
}

type ContactKey = 'email' | 'phone' | 'location' | 'linkedin' | 'github' | 'website'

const CONTACT_META: { key: ContactKey; icon: typeof Mail; placeholder: string }[] = [
  { key: 'email', icon: Mail, placeholder: 'you@email.com' },
  { key: 'phone', icon: Phone, placeholder: 'Phone number' },
  { key: 'location', icon: MapPin, placeholder: 'City, Country' },
  { key: 'linkedin', icon: Linkedin, placeholder: 'linkedin.com/in/you' },
  { key: 'github', icon: Github, placeholder: 'github.com/you' },
  { key: 'website', icon: Globe, placeholder: 'yourwebsite.com' },
]

/* Editable contact info — horizontal (header) or vertical (sidebar) — used
 * by every template instead of hand-rolling contactBits() + ContactBit. */
export function ContactRow({
  data,
  className,
  variant = 'row',
}: {
  data: ResumeData
  className?: string
  variant?: 'row' | 'side'
}) {
  const { update, isEditable } = useResumeEdit()
  const fields = CONTACT_META.filter((f) => data[f.key] || isEditable)
  if (fields.length === 0) return null
  return (
    <div
      className={cn(
        variant === 'side' ? 'flex flex-col gap-2' : 'flex flex-wrap items-center gap-x-4 gap-y-1.5',
        className,
      )}
    >
      {fields.map(({ key, icon, placeholder }) => (
        <span
          key={key}
          className={cn('flex items-center gap-1.5', variant === 'side' && 'break-all')}
        >
          <IconWrap icon={icon} />
          <EditableText
            value={data[key]}
            placeholder={placeholder}
            onChange={(v) => update((d) => ({ ...d, [key]: v }))}
          />
        </span>
      ))}
    </div>
  )
}

/* thin accent-bar heading, used by most templates */
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
        <span className="h-0.5 w-5 rounded-full" style={{ background: 'var(--doc-accent)' }} />
        {title}
      </h2>
      {children}
    </section>
  )
}

/* full-width rule heading, style driven by design.dividerStyle */
export function ClassicSection({
  title,
  children,
}: {
  title: string
  theme: AccentTheme
  children: React.ReactNode
}) {
  const { design } = useResumeEdit()
  const hideRule = design.dividerStyle === 'none'
  return (
    <section>
      <h2
        className="mb-2 pb-1 text-[13px] font-bold uppercase tracking-wide text-slate-800"
        style={
          hideRule
            ? undefined
            : {
                borderBottomWidth: 1,
                borderBottomStyle: design.dividerStyle === 'line' ? 'solid' : design.dividerStyle,
                borderColor: 'color-mix(in srgb, var(--doc-accent) 45%, transparent)',
              }
        }
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

/* -------------------------- editable list blocks ------------------------- */

export function SkillChips({ data }: TP) {
  const { update } = useResumeEdit()
  return (
    <EditableChips
      items={data.skills}
      placeholder="Skill"
      onChange={(skills) => update((d) => ({ ...d, skills }))}
    />
  )
}

export function ExperienceBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.experience.length === 0 && !isEditable) return null
  return (
    <S title="Experience" theme={theme}>
      <div className="flex flex-col gap-4">
        {data.experience.map((e) => (
          <div key={e.id}>
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <EditableText
                  as="p"
                  className="font-semibold text-slate-900"
                  value={e.role}
                  placeholder="Role"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      experience: d.experience.map((x) => (x.id === e.id ? { ...x, role: v } : x)),
                    }))
                  }
                />
                <EditableText
                  as="p"
                  className="font-medium"
                  value={e.company}
                  placeholder="Company"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      experience: d.experience.map((x) => (x.id === e.id ? { ...x, company: v } : x)),
                    }))
                  }
                  style={{ color: 'var(--doc-accent)' }}
                />
              </div>
              <span className="flex shrink-0 items-baseline gap-1 text-[11px] text-slate-400">
                <EditableText
                  value={e.start}
                  placeholder="Start"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      experience: d.experience.map((x) => (x.id === e.id ? { ...x, start: v } : x)),
                    }))
                  }
                />
                —
                <EditableText
                  value={e.end}
                  placeholder="End"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      experience: d.experience.map((x) => (x.id === e.id ? { ...x, end: v } : x)),
                    }))
                  }
                />
              </span>
            </div>
            <EditableBulletList
              bullets={e.bullets}
              onChange={(bullets) =>
                update((d) => ({
                  ...d,
                  experience: d.experience.map((x) => (x.id === e.id ? { ...x, bullets } : x)),
                }))
              }
            />
          </div>
        ))}
      </div>
    </S>
  )
}

export function EducationBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.education.length === 0 && !isEditable) return null
  return (
    <S title="Education" theme={theme}>
      <div className="flex flex-col gap-3">
        {data.education.map((ed) => (
          <div key={ed.id} className="flex items-baseline justify-between gap-3">
            <div>
              <EditableText
                as="p"
                className="font-semibold text-slate-900"
                value={ed.degree}
                placeholder="Degree"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    education: d.education.map((x) => (x.id === ed.id ? { ...x, degree: v } : x)),
                  }))
                }
              />
              <EditableText
                as="p"
                className="font-medium"
                value={ed.school}
                placeholder="School"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    education: d.education.map((x) => (x.id === ed.id ? { ...x, school: v } : x)),
                  }))
                }
                style={{ color: 'var(--doc-accent)' }}
              />
              <EditableText
                as="p"
                className="text-slate-500"
                value={ed.detail}
                placeholder="GPA, honors…"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    education: d.education.map((x) => (x.id === ed.id ? { ...x, detail: v } : x)),
                  }))
                }
              />
            </div>
            <span className="flex shrink-0 items-baseline gap-1 text-[11px] text-slate-400">
              <EditableText
                value={ed.start}
                placeholder="Start"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    education: d.education.map((x) => (x.id === ed.id ? { ...x, start: v } : x)),
                  }))
                }
              />
              —
              <EditableText
                value={ed.end}
                placeholder="End"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    education: d.education.map((x) => (x.id === ed.id ? { ...x, end: v } : x)),
                  }))
                }
              />
            </span>
          </div>
        ))}
      </div>
    </S>
  )
}

export function ProjectsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.projects.length === 0 && !isEditable) return null
  return (
    <S title="Projects" theme={theme}>
      <div className="flex flex-col gap-3">
        {data.projects.map((p) => (
          <div key={p.id}>
            <div className="flex flex-wrap items-baseline gap-x-2">
              <EditableText
                as="p"
                className="font-semibold text-slate-900"
                value={p.name}
                placeholder="Project name"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    projects: d.projects.map((x) => (x.id === p.id ? { ...x, name: v } : x)),
                  }))
                }
              />
              <EditableText
                className="text-[11px] text-slate-400"
                value={p.tech}
                placeholder="Tech stack"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    projects: d.projects.map((x) => (x.id === p.id ? { ...x, tech: v } : x)),
                  }))
                }
              />
              <span className="flex items-center gap-1 text-[11px]" style={{ color: 'var(--doc-accent)' }}>
                <Link2 className="size-3" />
                <EditableText
                  value={p.link}
                  placeholder="Link"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      projects: d.projects.map((x) => (x.id === p.id ? { ...x, link: v } : x)),
                    }))
                  }
                />
              </span>
            </div>
            <EditableText
              as="p"
              className="text-slate-600"
              value={p.description}
              placeholder="What did this project do?"
              multiline
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  projects: d.projects.map((x) => (x.id === p.id ? { ...x, description: v } : x)),
                }))
              }
            />
          </div>
        ))}
      </div>
    </S>
  )
}

export function CertificationsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.certifications.length === 0 && !isEditable) return null
  return (
    <S title="Certifications" theme={theme}>
      <div className="flex flex-col gap-1.5">
        {data.certifications.map((c) => (
          <div key={c.id} className="flex items-baseline justify-between gap-3">
            <p>
              <EditableText
                as="span"
                className="font-semibold text-slate-900"
                value={c.name}
                placeholder="Certification"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    certifications: d.certifications.map((x) => (x.id === c.id ? { ...x, name: v } : x)),
                  }))
                }
              />
              <span className="text-slate-500">
                {' — '}
                <EditableText
                  as="span"
                  value={c.issuer}
                  placeholder="Issuer"
                  onChange={(v) =>
                    update((d) => ({
                      ...d,
                      certifications: d.certifications.map((x) => (x.id === c.id ? { ...x, issuer: v } : x)),
                    }))
                  }
                />
              </span>
            </p>
            <span className="shrink-0 text-[11px] text-slate-400">
              <EditableText
                value={c.year}
                placeholder="Year"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    certifications: d.certifications.map((x) => (x.id === c.id ? { ...x, year: v } : x)),
                  }))
                }
              />
            </span>
          </div>
        ))}
      </div>
    </S>
  )
}

export function AchievementsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.achievements.length === 0 && !isEditable) return null
  return (
    <S title="Achievements" theme={theme}>
      <EditableBulletList
        bullets={data.achievements}
        onChange={(achievements) => update((d) => ({ ...d, achievements }))}
      />
    </S>
  )
}

export function LanguagesBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.languages.length === 0 && !isEditable) return null
  return (
    <S title="Languages" theme={theme}>
      <div className="flex flex-wrap gap-x-5 gap-y-1">
        {data.languages.map((l) => (
          <span key={l.id}>
            <EditableText
              as="span"
              className="font-medium text-slate-900"
              value={l.name}
              placeholder="Language"
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  languages: d.languages.map((x) => (x.id === l.id ? { ...x, name: v } : x)),
                }))
              }
            />
            <span className="text-slate-500">
              {' · '}
              <EditableText
                as="span"
                value={l.level}
                placeholder="Level"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    languages: d.languages.map((x) => (x.id === l.id ? { ...x, level: v } : x)),
                  }))
                }
              />
            </span>
          </span>
        ))}
      </div>
    </S>
  )
}

export function InterestsBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.interests.length === 0 && !isEditable) return null
  return (
    <S title="Interests" theme={theme}>
      <EditableChips
        items={data.interests}
        placeholder="Interest"
        onChange={(interests) => update((d) => ({ ...d, interests }))}
      />
    </S>
  )
}

export function ReferencesBlock({ data, theme, S }: TP & { S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  if (data.references.length === 0 && !isEditable) return null
  return (
    <S title="References" theme={theme}>
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {data.references.map((r) => (
          <div key={r.id}>
            <EditableText
              as="p"
              className="font-semibold text-slate-900"
              value={r.name}
              placeholder="Name"
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  references: d.references.map((x) => (x.id === r.id ? { ...x, name: v } : x)),
                }))
              }
            />
            <EditableText
              as="p"
              className="text-slate-500"
              value={r.title}
              placeholder="Title, company"
              onChange={(v) =>
                update((d) => ({
                  ...d,
                  references: d.references.map((x) => (x.id === r.id ? { ...x, title: v } : x)),
                }))
              }
            />
            <p className="text-[11px] text-slate-500">
              <span className="font-medium">Phone: </span>
              <EditableText
                value={r.phone}
                placeholder="Phone"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    references: d.references.map((x) => (x.id === r.id ? { ...x, phone: v } : x)),
                  }))
                }
              />
            </p>
            <p className="text-[11px] text-slate-500">
              <span className="font-medium">Email: </span>
              <EditableText
                value={r.email}
                placeholder="Email"
                onChange={(v) =>
                  update((d) => ({
                    ...d,
                    references: d.references.map((x) => (x.id === r.id ? { ...x, email: v } : x)),
                  }))
                }
              />
            </p>
          </div>
        ))}
      </div>
    </S>
  )
}

export function CustomSectionBlock({ section, theme, S }: { section: CustomSection; theme: AccentTheme; S: SectionComp }) {
  const { update, isEditable } = useResumeEdit()
  const patch = (fn: (s: CustomSection) => CustomSection) =>
    update((d) => ({
      ...d,
      customSections: d.customSections.map((s) => (s.id === section.id ? fn(s) : s)),
    }))

  return (
    <S title={section.title || 'Custom Section'} theme={theme}>
      <div className="flex flex-col gap-3">
        {section.items.map((item) => (
          <div key={item.id} className="flex items-baseline justify-between gap-3">
            <div>
              <EditableText
                as="p"
                className="font-semibold text-slate-900"
                value={item.heading}
                placeholder="Heading"
                onChange={(v) => patch((s) => ({ ...s, items: s.items.map((i) => (i.id === item.id ? { ...i, heading: v } : i)) }))}
              />
              {(item.subheading || isEditable) && (
                <EditableText
                  as="p"
                  className="font-medium"
                  value={item.subheading}
                  placeholder="Subheading"
                  onChange={(v) => patch((s) => ({ ...s, items: s.items.map((i) => (i.id === item.id ? { ...i, subheading: v } : i)) }))}
                  style={{ color: 'var(--doc-accent)' }}
                />
              )}
              {(item.description || isEditable) && (
                <EditableText
                  as="p"
                  className="text-slate-600"
                  value={item.description}
                  placeholder="Description"
                  multiline
                  onChange={(v) => patch((s) => ({ ...s, items: s.items.map((i) => (i.id === item.id ? { ...i, description: v } : i)) }))}
                />
              )}
            </div>
            <span className="shrink-0 text-[11px] text-slate-400">
              <EditableText
                value={item.date}
                placeholder="Date"
                onChange={(v) => patch((s) => ({ ...s, items: s.items.map((i) => (i.id === item.id ? { ...i, date: v } : i)) }))}
              />
            </span>
          </div>
        ))}
        {isEditable && (
          <button
            type="button"
            onClick={() =>
              patch((s) => ({
                ...s,
                items: [...s.items, { id: uid('csi'), heading: '', subheading: '', date: '', description: '' }],
              }))
            }
            className="no-print self-start text-[11px] font-medium text-slate-400 hover:text-[color:var(--doc-accent)]"
          >
            + Add item
          </button>
        )}
      </div>
    </S>
  )
}
