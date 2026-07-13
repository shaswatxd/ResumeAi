'use client'

import {
  type AccentTheme,
  type DocSettings,
  type ResumeData,
  type TemplateId,
  DEFAULT_SETTINGS,
} from '@/lib/resume-types'
import {
  type TP,
  type SectionComp,
  hasContact,
  contactBits,
  Photo,
  ContactBit,
  SideBit,
  Section,
  ClassicSection,
  MinimalSection,
  BulletList,
  ProjectsBlock,
  CertificationsBlock,
  AchievementsBlock,
  LanguagesBlock,
  InterestsBlock,
  ReferencesBlock,
  ExtraBlocks,
  SkillChips,
  ExperienceBlock,
  EducationBlock,
} from '@/components/resume/blocks'
import { TEMPLATES_A } from '@/components/resume/templates-a'
import { TEMPLATES_B } from '@/components/resume/templates-b'
import { TEMPLATES_C } from '@/components/resume/templates-c'

type Props = {
  data: ResumeData
  template: TemplateId
  theme: AccentTheme
  settings?: DocSettings
}

/* ----------------------------- GLASS (default) ---------------------------- */
function GlassTemplate({ data, theme }: TP) {
  return (
    <div className="flex flex-col gap-5 p-9 text-[13px] text-slate-700">
      <header className="flex items-start gap-5">
        <Photo
          data={data}
          className="size-20 shrink-0 rounded-2xl text-2xl text-white"
          fallbackStyle={{ background: theme.accent }}
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-[26px] font-bold leading-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[15px] font-semibold" style={{ color: theme.accent }}>
            {data.role}
          </p>
          {hasContact(data) && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </div>
      </header>

      {data.summary && <p className="text-slate-600">{data.summary}</p>}
      <ExperienceBlock data={data} theme={theme} S={Section} />
      <ProjectsBlock data={data} theme={theme} S={Section} />
      <EducationBlock data={data} theme={theme} S={Section} />
      {data.skills.length > 0 && (
        <Section title="Skills" theme={theme}>
          <SkillChips data={data} theme={theme} />
        </Section>
      )}
      <CertificationsBlock data={data} theme={theme} S={Section} />
      <AchievementsBlock data={data} theme={theme} S={Section} />
      <LanguagesBlock data={data} theme={theme} S={Section} />
      <InterestsBlock data={data} theme={theme} S={Section} />
      <ReferencesBlock data={data} theme={theme} S={Section} />
    </div>
  )
}

/* ------------------------------- CLASSIC ---------------------------------- */
function ClassicTemplate({ data, theme }: TP) {
  return (
    <div className="p-10 font-serif text-[13px] text-slate-700">
      <header className="border-b-2 pb-4 text-center" style={{ borderColor: theme.accent }}>
        <h1 className="text-[30px] font-bold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className="mt-0.5 text-[14px] font-medium tracking-wide text-slate-500">
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[11px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span className="text-slate-300">·</span>}
                {b.text}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-5 flex flex-col gap-5">
        {data.summary && (
          <ClassicSection title="Profile" theme={theme}>
            <p className="text-slate-600">{data.summary}</p>
          </ClassicSection>
        )}
        <ExperienceBlock data={data} theme={theme} S={ClassicSection} />
        <EducationBlock data={data} theme={theme} S={ClassicSection} />
        {data.skills.length > 0 && (
          <ClassicSection title="Skills" theme={theme}>
            <p className="text-slate-600">{data.skills.join('  ·  ')}</p>
          </ClassicSection>
        )}
        <ExtraBlocks data={data} theme={theme} S={ClassicSection} />
      </div>
    </div>
  )
}

/* ------------------------------- MINIMAL ---------------------------------- */
function MinimalTemplate({ data, theme }: TP) {
  const S: SectionComp = ({ title, children }) => (
    <MinimalSection title={title}>{children}</MinimalSection>
  )
  return (
    <div className="p-11 text-[13px] text-slate-600">
      <header className="mb-7">
        <h1 className="text-[28px] font-semibold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className="text-[14px] text-slate-500">{data.role}</p>
        {hasContact(data) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-6">
        {data.summary && <p className="text-slate-600">{data.summary}</p>}
        <ExperienceBlock data={data} theme={theme} S={S} />
        <EducationBlock data={data} theme={theme} S={S} />
        {data.skills.length > 0 && (
          <MinimalSection title="Skills">
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-slate-600">
              {data.skills.map((s, i) => (
                <span key={s}>
                  {s}
                  {i < data.skills.length - 1 && (
                    <span className="ml-3 text-slate-300">/</span>
                  )}
                </span>
              ))}
            </div>
          </MinimalSection>
        )}
        <ExtraBlocks data={data} theme={theme} S={S} />
      </div>
    </div>
  )
}

/* ------------------------------- SIDEBAR ---------------------------------- */
function SidebarTemplate({ data, theme }: TP) {
  return (
    <div className="grid min-h-full grid-cols-[34%_1fr] text-[12.5px]">
      <aside className="flex flex-col gap-6 p-7 text-white" style={{ background: theme.accent }}>
        <div>
          <Photo
            data={data}
            className="mb-3 size-16 rounded-full bg-white/20 text-xl"
          />
          <h1 className="text-[20px] font-bold leading-tight">{data.fullName}</h1>
          <p className="text-[12px] text-white/80">{data.role}</p>
        </div>

        {hasContact(data) && (
          <div className="flex flex-col gap-1.5 text-[11px] text-white/85">
            {contactBits(data).map((b, i) => (
              <SideBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}

        {data.skills.length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span key={s} className="rounded bg-white/15 px-2 py-0.5 text-[10.5px]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.education.length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
              Education
            </h2>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-white/80">{ed.school}</p>
                  <p className="text-[10.5px] text-white/60">
                    {[ed.start, ed.end].filter(Boolean).join(' — ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.languages.length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
              Languages
            </h2>
            <div className="flex flex-col gap-1 text-[11px] text-white/85">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` · ${l.level}`}
                </span>
              ))}
            </div>
          </div>
        )}

        {data.interests.filter((i) => i.trim()).length > 0 && (
          <div>
            <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">
              Interests
            </h2>
            <p className="text-[11px] text-white/85">
              {data.interests.filter((i) => i.trim()).join(' · ')}
            </p>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 bg-white p-8 text-slate-700">
        {data.summary && (
          <Section title="Profile" theme={theme}>
            <p className="text-slate-600">{data.summary}</p>
          </Section>
        )}
        <ExperienceBlock data={data} theme={theme} S={Section} />
        <ProjectsBlock data={data} theme={theme} S={Section} />
        <CertificationsBlock data={data} theme={theme} S={Section} />
        <AchievementsBlock data={data} theme={theme} S={Section} />
        <ReferencesBlock data={data} theme={theme} S={Section} />
      </main>
    </div>
  )
}

/* -------------------------------- BANDED ---------------------------------- */
function BandedTemplate({ data, theme }: TP) {
  return (
    <div className="text-[13px] text-slate-700">
      <header className="px-10 py-8 text-white" style={{ background: theme.accent }}>
        <h1 className="text-[30px] font-bold leading-tight">{data.fullName}</h1>
        <p className="text-[15px] text-white/85">{data.role}</p>
        {hasContact(data) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-white/80">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-5 px-10 py-8">
        {data.summary && (
          <Section title="Summary" theme={theme}>
            <p className="text-slate-600">{data.summary}</p>
          </Section>
        )}
        <ExperienceBlock data={data} theme={theme} S={Section} />
        <EducationBlock data={data} theme={theme} S={Section} />
        {data.skills.length > 0 && (
          <Section title="Skills" theme={theme}>
            <SkillChips data={data} theme={theme} />
          </Section>
        )}
        <ExtraBlocks data={data} theme={theme} S={Section} />
      </div>
    </div>
  )
}

/* ------------------------------- EXECUTIVE --------------------------------- */
function ExecutiveTemplate({ data, theme }: TP) {
  const ExecSection: SectionComp = ({ title, children }) => (
    <section>
      <h2
        className="mb-2.5 font-serif text-[14px] font-semibold tracking-wide"
        style={{ color: theme.accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[13px] text-slate-700">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-[32px] font-semibold leading-tight tracking-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[14px] font-medium" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </div>
        {hasContact(data) && (
          <div className="flex flex-col items-end gap-0.5 text-right text-[11px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>
      <div className="mb-6 mt-4 border-b-2" style={{ borderColor: theme.accent }}>
        <div className="mb-[3px] border-b border-slate-200" />
      </div>

      <div className="flex flex-col gap-6">
        {data.summary && (
          <ExecSection title="Executive Summary" theme={theme}>
            <p className="text-slate-600">{data.summary}</p>
          </ExecSection>
        )}
        <ExperienceBlock data={data} theme={theme} S={ExecSection} />
        <EducationBlock data={data} theme={theme} S={ExecSection} />
        {data.skills.length > 0 && (
          <ExecSection title="Core Competencies" theme={theme}>
            <div className="grid grid-cols-3 gap-x-6 gap-y-1">
              {data.skills.map((s) => (
                <span key={s} className="flex items-center gap-2 text-slate-600">
                  <span
                    className="size-1 rounded-full"
                    style={{ background: theme.accent }}
                  />
                  {s}
                </span>
              ))}
            </div>
          </ExecSection>
        )}
        <ExtraBlocks data={data} theme={theme} S={ExecSection} />
      </div>
    </div>
  )
}

/* ----------------------------- MODERN SPLIT -------------------------------- */
function ModernTemplate({ data, theme }: TP) {
  const RailTitle = ({ children }: { children: React.ReactNode }) => (
    <h2
      className="mb-2 text-[11px] font-bold uppercase tracking-widest"
      style={{ color: theme.accent }}
    >
      {children}
    </h2>
  )
  return (
    <div className="grid min-h-full grid-cols-[1fr_32%] text-[12.5px] text-slate-700">
      <main className="flex flex-col gap-5 p-8">
        <header>
          <h1 className="text-[28px] font-bold leading-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[14px] font-semibold" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </header>
        {data.summary && <p className="text-slate-600">{data.summary}</p>}
        <ExperienceBlock data={data} theme={theme} S={Section} />
        <ProjectsBlock data={data} theme={theme} S={Section} />
        <AchievementsBlock data={data} theme={theme} S={Section} />
        <ReferencesBlock data={data} theme={theme} S={Section} />
      </main>

      <aside className="flex flex-col gap-6 p-7" style={{ background: theme.soft }}>
        {hasContact(data) && (
          <div>
            <RailTitle>Contact</RailTitle>
            <div className="flex flex-col gap-1.5 text-[11px] text-slate-600">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailTitle>Skills</RailTitle>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((s) => (
                <span
                  key={s}
                  className="rounded bg-white px-2 py-0.5 text-[10.5px] font-medium text-slate-700 ring-1 ring-black/5"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailTitle>Education</RailTitle>
            <div className="flex flex-col gap-2.5 text-[11.5px]">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold text-slate-900">{ed.degree}</p>
                  <p className="text-slate-600">{ed.school}</p>
                  <p className="text-[10.5px] text-slate-400">
                    {[ed.start, ed.end].filter(Boolean).join(' — ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.certifications.length > 0 && (
          <div>
            <RailTitle>Certifications</RailTitle>
            <div className="flex flex-col gap-2 text-[11.5px]">
              {data.certifications.map((c) => (
                <div key={c.id}>
                  <p className="font-semibold text-slate-900">{c.name}</p>
                  <p className="text-[10.5px] text-slate-500">
                    {[c.issuer, c.year].filter(Boolean).join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailTitle>Languages</RailTitle>
            <div className="flex flex-col gap-1 text-[11.5px] text-slate-600">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` · ${l.level}`}
                </span>
              ))}
            </div>
          </div>
        )}
        {data.interests.filter((i) => i.trim()).length > 0 && (
          <div>
            <RailTitle>Interests</RailTitle>
            <p className="text-[11.5px] text-slate-600">
              {data.interests.filter((i) => i.trim()).join(' · ')}
            </p>
          </div>
        )}
      </aside>
    </div>
  )
}

/* -------------------------------- COMPACT ---------------------------------- */
function CompactTemplate({ data, theme }: TP) {
  const CompactSection: SectionComp = ({ title, children }) => (
    <section>
      <h2
        className="mb-1.5 text-[10.5px] font-bold uppercase tracking-widest"
        style={{ color: theme.accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="flex flex-col gap-3.5 p-8 text-[11.5px] text-slate-700">
      <header className="flex flex-wrap items-baseline justify-between gap-x-4">
        <div>
          <h1 className="inline text-[22px] font-bold text-slate-900">
            {data.fullName}
          </h1>
          <span className="ml-3 text-[13px] font-semibold" style={{ color: theme.accent }}>
            {data.role}
          </span>
        </div>
        {hasContact(data) && (
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>
      <div className="h-px w-full" style={{ background: theme.accent }} />

      {data.summary && <p className="text-slate-600">{data.summary}</p>}
      <ExperienceBlock data={data} theme={theme} S={CompactSection} />
      {data.skills.length > 0 && (
        <CompactSection title="Skills" theme={theme}>
          <p className="text-slate-600">{data.skills.join(' · ')}</p>
        </CompactSection>
      )}
      <EducationBlock data={data} theme={theme} S={CompactSection} />
      <ExtraBlocks data={data} theme={theme} S={CompactSection} />
    </div>
  )
}

/* -------------------------------- ELEGANT ---------------------------------- */
function ElegantTemplate({ data, theme }: TP) {
  const ElegantSection: SectionComp = ({ title, children }) => (
    <section>
      <div className="mb-3 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <h2 className="font-serif text-[13px] font-medium uppercase tracking-[0.25em] text-slate-700">
          {title}
        </h2>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      {children}
    </section>
  )
  return (
    <div className="p-11 text-[12.5px] text-slate-600">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-[30px] font-medium uppercase tracking-[0.18em] text-slate-900">
          {data.fullName}
        </h1>
        <p
          className="mt-1 text-[12px] font-medium uppercase tracking-[0.3em]"
          style={{ color: theme.accent }}
        >
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <span key={i} className="flex items-center gap-3">
                {i > 0 && <span>—</span>}
                {b.text}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-6">
        {data.summary && (
          <p className="mx-auto max-w-[85%] text-center italic text-slate-600">
            {data.summary}
          </p>
        )}
        <ExperienceBlock data={data} theme={theme} S={ElegantSection} />
        <EducationBlock data={data} theme={theme} S={ElegantSection} />
        {data.skills.length > 0 && (
          <ElegantSection title="Skills" theme={theme}>
            <p className="text-center text-slate-600">{data.skills.join('  ·  ')}</p>
          </ElegantSection>
        )}
        <ExtraBlocks data={data} theme={theme} S={ElegantSection} />
      </div>
    </div>
  )
}

/* -------------------------------- TIMELINE --------------------------------- */
function TimelineTemplate({ data, theme }: TP) {
  return (
    <div className="flex flex-col gap-5 p-9 text-[13px] text-slate-700">
      <header>
        <h1 className="text-[28px] font-bold leading-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className="text-[15px] font-semibold" style={{ color: theme.accent }}>
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      {data.summary && <p className="text-slate-600">{data.summary}</p>}

      {data.experience.length > 0 && (
        <Section title="Experience" theme={theme}>
          <div
            className="ml-1 flex flex-col gap-5 border-l-2 pl-5"
            style={{ borderColor: theme.soft }}
          >
            {data.experience.map((e) => (
              <div key={e.id} className="relative">
                <span
                  className="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-white"
                  style={{ background: theme.accent }}
                />
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
        </Section>
      )}

      {data.education.length > 0 && (
        <Section title="Education" theme={theme}>
          <div
            className="ml-1 flex flex-col gap-4 border-l-2 pl-5"
            style={{ borderColor: theme.soft }}
          >
            {data.education.map((ed) => (
              <div key={ed.id} className="relative">
                <span
                  className="absolute -left-[27px] top-1.5 size-3 rounded-full border-2 border-white"
                  style={{ background: theme.accent }}
                />
                <div className="flex items-baseline justify-between gap-3">
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
              </div>
            ))}
          </div>
        </Section>
      )}

      {data.skills.length > 0 && (
        <Section title="Skills" theme={theme}>
          <SkillChips data={data} theme={theme} />
        </Section>
      )}
      <ExtraBlocks data={data} theme={theme} S={Section} />
    </div>
  )
}

/* -------------------------------- BOLD TYPE -------------------------------- */
function BoldTemplate({ data, theme }: TP) {
  const BoldSection: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[15px] font-extrabold uppercase tracking-tight text-slate-900">
        <span style={{ color: theme.accent }}>/</span> {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="flex flex-col gap-5 p-9 text-[13px] text-slate-700">
      <header>
        <h1 className="text-[40px] font-extrabold leading-[1.05] tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p
          className="mt-1 inline-block px-2 py-0.5 text-[14px] font-bold text-white"
          style={{ background: theme.accent }}
        >
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] font-medium text-slate-500">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <p className="border-l-4 pl-4 text-slate-600" style={{ borderColor: theme.accent }}>
          {data.summary}
        </p>
      )}
      <ExperienceBlock data={data} theme={theme} S={BoldSection} />
      <ProjectsBlock data={data} theme={theme} S={BoldSection} />
      <EducationBlock data={data} theme={theme} S={BoldSection} />
      {data.skills.length > 0 && (
        <BoldSection title="Skills" theme={theme}>
          <SkillChips data={data} theme={theme} />
        </BoldSection>
      )}
      <CertificationsBlock data={data} theme={theme} S={BoldSection} />
      <AchievementsBlock data={data} theme={theme} S={BoldSection} />
      <LanguagesBlock data={data} theme={theme} S={BoldSection} />
      <InterestsBlock data={data} theme={theme} S={BoldSection} />
      <ReferencesBlock data={data} theme={theme} S={BoldSection} />
    </div>
  )
}

/* -------------------------------- TECH MONO -------------------------------- */
function MonoTemplate({ data, theme }: TP) {
  const MonoSection: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold text-slate-900">
        <span style={{ color: theme.accent }}>##</span> {title.toLowerCase()}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="flex flex-col gap-4.5 p-9 font-mono text-[11.5px] text-slate-700">
      <header>
        <p className="text-[10.5px]" style={{ color: theme.accent }}>
          $ whoami
        </p>
        <h1 className="text-[24px] font-bold leading-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className="text-[13px] font-semibold" style={{ color: theme.accent }}>
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>
      <div className="h-px w-full bg-slate-200" />

      {data.summary && <p className="text-slate-600">{data.summary}</p>}

      {data.experience.length > 0 && (
        <MonoSection title="Experience" theme={theme}>
          <div className="flex flex-col gap-3.5">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold text-slate-900">
                    {e.role}
                    {e.company && (
                      <span className="font-normal" style={{ color: theme.accent }}>
                        {' '}
                        @ {e.company}
                      </span>
                    )}
                  </p>
                  <span className="shrink-0 text-[10px] text-slate-400">
                    {[e.start, e.end].filter(Boolean).join(' → ')}
                  </span>
                </div>
                <ul className="mt-1 flex flex-col gap-0.5">
                  {e.bullets
                    .filter((b) => b.trim())
                    .map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span style={{ color: theme.accent }}>&gt;</span>
                        <span>{b}</span>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </MonoSection>
      )}

      <ProjectsBlock data={data} theme={theme} S={MonoSection} />

      {data.skills.length > 0 && (
        <MonoSection title="Skills" theme={theme}>
          <p className="text-slate-600">[ {data.skills.join(', ')} ]</p>
        </MonoSection>
      )}

      <EducationBlock data={data} theme={theme} S={MonoSection} />
      <CertificationsBlock data={data} theme={theme} S={MonoSection} />
      <AchievementsBlock data={data} theme={theme} S={MonoSection} />
      <LanguagesBlock data={data} theme={theme} S={MonoSection} />
      <InterestsBlock data={data} theme={theme} S={MonoSection} />
      <ReferencesBlock data={data} theme={theme} S={MonoSection} />
    </div>
  )
}

/* --------------------------------- switch ---------------------------------- */
const CORE: Partial<Record<TemplateId, (p: TP) => React.ReactNode>> = {
  glass: GlassTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  sidebar: SidebarTemplate,
  banded: BandedTemplate,
  executive: ExecutiveTemplate,
  modern: ModernTemplate,
  compact: CompactTemplate,
  elegant: ElegantTemplate,
  timeline: TimelineTemplate,
  bold: BoldTemplate,
  mono: MonoTemplate,
}

const ALL: Partial<Record<TemplateId, (p: TP) => React.ReactNode>> = {
  ...CORE,
  ...TEMPLATES_A,
  ...TEMPLATES_B,
  ...TEMPLATES_C,
}

const FONT_ZOOM: Record<string, number> = { sm: 0.92, md: 1, lg: 1.08 }
const LINE_HEIGHT: Record<string, number> = {
  compact: 1.4,
  normal: 1.6,
  relaxed: 1.75,
}

export function ResumeDocument({
  data,
  template,
  theme,
  settings = DEFAULT_SETTINGS,
}: Props) {
  const Tpl = ALL[template] ?? GlassTemplate
  return (
    <div
      style={{
        zoom: FONT_ZOOM[settings.fontScale] ?? 1,
        lineHeight: LINE_HEIGHT[settings.spacing] ?? 1.6,
      }}
    >
      <Tpl data={data} theme={theme} />
    </div>
  )
}
