'use client'

/*
 * Templates batch B — recreations from reference designs.
 * Every template renders live ResumeData — nothing hardcoded.
 */

import type { TemplateId } from '@/lib/resume-types'
import {
  type TP,
  type SectionComp,
  hasContact,
  contactBits,
  Photo,
  SideBit,
  ContactBit,
  BulletList,
  ProjectsBlock,
  CertificationsBlock,
  AchievementsBlock,
  LanguagesBlock,
  InterestsBlock,
  ReferencesBlock,
  ExperienceBlock,
  EducationBlock,
  SkillChips,
} from '@/components/resume/blocks'

/* ------------------------------ shared helpers ----------------------------- */

function RailHead({
  children,
  light,
  color,
}: {
  children: React.ReactNode
  light?: boolean
  color?: string
}) {
  return (
    <h2
      className={`mb-2 text-[11px] font-bold uppercase tracking-widest ${
        light ? 'text-white/75' : 'text-slate-500'
      }`}
      style={color ? { color } : undefined}
    >
      {children}
    </h2>
  )
}

/* ================================ TRIAD ==================================== */
/* Ref: "White Modern Business Administration Resume" — clean two-column, no photo */
function TriadTemplate({ data, theme }: TP) {
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b border-slate-200 pb-1 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-6">
        <h1 className="text-[28px] font-bold tracking-tight text-slate-900">{data.fullName}</h1>
        <p className="text-[12px] uppercase tracking-[0.15em]" style={{ color: theme.accent }}>
          {data.role}
        </p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          {data.education.length > 0 && (
            <Main title="Education" theme={theme}>
              <div className="flex flex-col gap-3">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p>{ed.school}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                    {ed.detail && <p className="text-slate-500">{ed.detail}</p>}
                  </div>
                ))}
              </div>
            </Main>
          )}
          {data.skills.length > 0 && (
            <Main title="Skills" theme={theme}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {data.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Main>
          )}
          {data.languages.length > 0 && (
            <Main title="Languages" theme={theme}>
              <div className="flex flex-col gap-1">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && <span className="text-slate-400"> — {l.level}</span>}
                  </span>
                ))}
              </div>
            </Main>
          )}
          {data.certifications.length > 0 && (
            <Main title="Certifications" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {data.certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[c.issuer, c.year].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </Main>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.summary && (
            <Main title="Profile Summary" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Main>
          )}
          <ExperienceBlock data={data} theme={theme} S={Main} />
          <ProjectsBlock data={data} theme={theme} S={Main} />
          <AchievementsBlock data={data} theme={theme} S={Main} />
          <ReferencesBlock data={data} theme={theme} S={Main} />
        </div>
      </div>
    </div>
  )
}

/* ================================ ESTATE =================================== */
/* Ref: "Office Clean Minimalist Resume Real Estate" — two-column with dark left */
function EstateTemplate({ data, theme }: TP) {
  const Dark: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/70">{title}</h2>
      {children}
    </section>
  )
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-200" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6 text-white" style={{ background: theme.accent }}>
        <Photo
          data={data}
          className="size-24 self-center rounded-full border-3 border-white/30 text-2xl"
          fallbackStyle={{ background: 'rgba(255,255,255,0.2)' }}
        />
        <div className="text-center">
          <h1 className="text-[22px] font-bold leading-tight">{data.fullName}</h1>
          <p className="text-[11px] text-white/80">{data.role}</p>
        </div>
        {hasContact(data) && (
          <Dark title="Contact" theme={theme}>
            <div className="flex flex-col gap-1.5 text-[10.5px] text-white/85">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </Dark>
        )}
        {data.education.length > 0 && (
          <Dark title="Education" theme={theme}>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-white/80">{ed.school}</p>
                  <p className="text-[10px] text-white/60">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                </div>
              ))}
            </div>
          </Dark>
        )}
        {data.skills.length > 0 && (
          <Dark title="Skills" theme={theme}>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-white/60" />
                  {s}
                </li>
              ))}
            </ul>
          </Dark>
        )}
        {data.languages.length > 0 && (
          <Dark title="Languages" theme={theme}>
            <div className="flex flex-col gap-0.5 text-white/85">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` — ${l.level}`}
                </span>
              ))}
            </div>
          </Dark>
        )}
      </aside>

      <main className="flex flex-col gap-5 bg-white p-7">
        {data.summary && (
          <Main title="About Me" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Main>
        )}
        <ExperienceBlock data={data} theme={theme} S={Main} />
        <ProjectsBlock data={data} theme={theme} S={Main} />
        <CertificationsBlock data={data} theme={theme} S={Main} />
        <AchievementsBlock data={data} theme={theme} S={Main} />
        <ReferencesBlock data={data} theme={theme} S={Main} />
      </main>
    </div>
  )
}

/* ================================ OUTLINE ================================== */
/* Ref: "Blue and White Developer Resume" — blue header bar, clean layout      */
function OutlineTemplate({ data, theme }: TP) {
  const DevSection: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        <span className="h-4 w-1 rounded-full" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header className="px-9 py-6 text-white" style={{ background: theme.accent }}>
        <h1 className="text-[28px] font-bold leading-tight">{data.fullName}</h1>
        <p className="text-[12px] text-white/85">{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[10.5px] text-white/80">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-[34%_1fr] gap-7 p-9 pt-6">
        <div className="flex flex-col gap-5">
          {data.summary && (
            <DevSection title="Summary" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </DevSection>
          )}
          {data.education.length > 0 && (
            <DevSection title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p>{ed.school}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </DevSection>
          )}
          {data.skills.length > 0 && (
            <DevSection title="Skills" theme={theme}>
              <div className="flex flex-wrap gap-1.5">
                {data.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded px-2 py-0.5 text-[10.5px] font-medium"
                    style={{ background: theme.soft, color: theme.accent }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </DevSection>
          )}
          {data.certifications.length > 0 && (
            <DevSection title="Certifications" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {data.certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {[c.issuer, c.year].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </DevSection>
          )}
          {data.languages.length > 0 && (
            <DevSection title="Languages" theme={theme}>
              <p>
                {data.languages
                  .map((l) => (l.level ? `${l.name}: ${l.level}` : l.name))
                  .join(' · ')}
              </p>
            </DevSection>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={DevSection} />
          <ProjectsBlock data={data} theme={theme} S={DevSection} />
          <AchievementsBlock data={data} theme={theme} S={DevSection} />
          <ReferencesBlock data={data} theme={theme} S={DevSection} />
        </div>
      </div>
    </div>
  )
}

/* ================================ RULED ==================================== */
/* Ref: "Black and White Minimalist Professional Accountant" — clean two-col, gray bar */
function RuledTemplate({ data, theme }: TP) {
  const Rule: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800">
        {title}
      </h2>
      <div className="border-t border-slate-300 pt-2">{children}</div>
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <div className="mb-5 h-2 w-full bg-slate-800" />
      <header className="mb-5">
        <h1 className="text-[26px] font-bold tracking-tight text-slate-900">{data.fullName}</h1>
        <p className="italic text-slate-500">{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <Rule title="Career Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Rule>
      )}

      <div className="mt-5 grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          <EducationBlock data={data} theme={theme} S={Rule} />
          {data.skills.length > 0 && (
            <Rule title="Skills" theme={theme}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {data.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Rule>
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Rule} />
          )}
          {data.languages.length > 0 && (
            <LanguagesBlock data={data} theme={theme} S={Rule} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={Rule} />
          <ProjectsBlock data={data} theme={theme} S={Rule} />
          <ReferencesBlock data={data} theme={theme} S={Rule} />
        </div>
      </div>
    </div>
  )
}

/* ================================ BLUSH ==================================== */
/* Ref: "White simple student CV resume" (Image 4) — soft panel, student       */
function BlushTemplate({ data, theme }: TP) {
  const Soft: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        <span
          className="size-2 rounded-full"
          style={{ background: theme.accent }}
        />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header className="px-9 py-7" style={{ background: theme.soft }}>
        <h1 className="text-[26px] font-bold text-slate-900">{data.fullName}</h1>
        <p className="text-[12px] italic" style={{ color: theme.accent }}>{data.role}</p>
      </header>

      <div className="grid grid-cols-[36%_1fr] gap-7 p-9 pt-6">
        <div className="flex flex-col gap-5">
          <Photo
            data={data}
            className="size-28 self-center rounded-full border-4 text-3xl text-white"
            fallbackStyle={{ background: theme.accent, borderColor: theme.soft }}
          />
          {hasContact(data) && (
            <Soft title="Contact Me" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Soft>
          )}
          {data.education.length > 0 && (
            <Soft title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold uppercase text-slate-900">{ed.school}</p>
                    <p>{ed.degree}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </Soft>
          )}
          {data.skills.length > 0 && (
            <Soft title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </Soft>
          )}
          {data.languages.length > 0 && (
            <Soft title="Language" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` — ${l.level}`}
                  </span>
                ))}
              </div>
            </Soft>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.summary && (
            <Soft title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Soft>
          )}
          <ExperienceBlock data={data} theme={theme} S={Soft} />
          <ProjectsBlock data={data} theme={theme} S={Soft} />
          <AchievementsBlock data={data} theme={theme} S={Soft} />
          <ReferencesBlock data={data} theme={theme} S={Soft} />
        </div>
      </div>
    </div>
  )
}

/* ================================ NOIRSIDE ================================= */
/* Ref: "Black and White Minimalist CV Resume" (Image 3) — gray sidebar, circle photo */
function NoirsideTemplate({ data, theme }: TP) {
  const NoSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 bg-slate-100 p-6">
        <Photo
          data={data}
          className="size-28 self-center rounded-full border-4 border-white text-3xl text-white shadow"
          fallbackStyle={{ background: theme.accent }}
        />
        {hasContact(data) && (
          <div>
            <RailHead color={theme.accent}>Contact</RailHead>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Education</RailHead>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="text-[10.5px] text-slate-400">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                  <p className="font-bold text-slate-900">{ed.degree}</p>
                  <p>{ed.school}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Skills</RailHead>
            <ul className="flex flex-col gap-1">
              {data.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Languages</RailHead>
            <div className="flex flex-col gap-0.5">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` · ${l.level}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 bg-white p-7">
        <header>
          <h1 className="text-[28px] font-bold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[12px] italic" style={{ color: theme.accent }}>{data.role}</p>
        </header>
        {data.summary && (
          <NoSec title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </NoSec>
        )}
        <ExperienceBlock data={data} theme={theme} S={NoSec} />
        <ProjectsBlock data={data} theme={theme} S={NoSec} />
        <CertificationsBlock data={data} theme={theme} S={NoSec} />
        <AchievementsBlock data={data} theme={theme} S={NoSec} />
        <ReferencesBlock data={data} theme={theme} S={NoSec} />
      </main>
    </div>
  )
}

/* ================================ GRAYSIDE ================================= */
/* Ref: "Black and White Simple CV Resume" — dark sidebar, clean               */
function GraysideTemplate({ data, theme }: TP) {
  const Gray: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-200" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[34%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6 text-white" style={{ background: '#374151' }}>
        <Photo
          data={data}
          className="size-24 self-center rounded-full text-2xl"
          fallbackStyle={{ background: 'rgba(255,255,255,0.2)' }}
        />
        {hasContact(data) && (
          <div>
            <RailHead light>Contact</RailHead>
            <div className="flex flex-col gap-1.5 text-[10.5px] text-white/85">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead light>Education</RailHead>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-white/80">{ed.school}</p>
                  <p className="text-[10px] text-white/60">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead light>Skills</RailHead>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead light>Languages</RailHead>
            <div className="flex flex-col gap-0.5 text-white/85">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` (${l.level})`}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 p-7">
        <header>
          <h1 className="text-[26px] font-bold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[12px] uppercase tracking-wide text-slate-500">{data.role}</p>
        </header>
        {data.summary && (
          <Gray title="About Me" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Gray>
        )}
        <ExperienceBlock data={data} theme={theme} S={Gray} />
        <ProjectsBlock data={data} theme={theme} S={Gray} />
        <CertificationsBlock data={data} theme={theme} S={Gray} />
        <AchievementsBlock data={data} theme={theme} S={Gray} />
        <ReferencesBlock data={data} theme={theme} S={Gray} />
      </main>
    </div>
  )
}

/* ================================ DISPLAY ================================== */
/* Ref: "Modern Minimalist CV Resume" (Image 4) — circle photo, two-column      */
function DisplayTemplate({ data, theme }: TP) {
  const DSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12.5px] font-bold text-slate-900">
        <span className="size-2 rounded-full" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-6 flex items-center gap-6">
        <Photo
          data={data}
          className="size-28 shrink-0 rounded-full border-6 text-3xl text-white"
          fallbackStyle={{ background: theme.accent, borderColor: theme.soft }}
        />
        <div>
          <h1 className="text-[28px] font-semibold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[12px] text-slate-500">{data.role}</p>
        </div>
      </header>

      <div className="grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          {data.summary && (
            <DSec title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </DSec>
          )}
          {hasContact(data) && (
            <DSec title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </DSec>
          )}
          {data.skills.length > 0 && (
            <DSec title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </DSec>
          )}
          {data.languages.length > 0 && (
            <DSec title="Language" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </DSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.education.length > 0 && (
            <DSec title="Education" theme={theme}>
              <div className="ml-1 flex flex-col gap-3 border-l-2 pl-4" style={{ borderColor: theme.soft }}>
                {data.education.map((ed) => (
                  <div key={ed.id} className="relative">
                    <span
                      className="absolute -left-[23px] top-1 size-2.5 rounded-full"
                      style={{ background: theme.accent }}
                    />
                    <p className="text-[10.5px] text-slate-400">
                      ({[ed.start, ed.end].filter(Boolean).join(' – ')})
                    </p>
                    <p className="font-bold uppercase text-slate-900">{ed.school}</p>
                    <p>{ed.degree}</p>
                  </div>
                ))}
              </div>
            </DSec>
          )}
          <ExperienceBlock data={data} theme={theme} S={DSec} />
          <ProjectsBlock data={data} theme={theme} S={DSec} />
          <CertificationsBlock data={data} theme={theme} S={DSec} />
          <ReferencesBlock data={data} theme={theme} S={DSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ EVERGREEN ================================ */
/* Ref: "Green Elegant Professional Resume" — green accents, progress bars     */
function EvergreenTemplate({ data, theme }: TP) {
  const GreenSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header className="px-9 py-7 text-white" style={{ background: theme.accent }}>
        <h1 className="text-[28px] font-bold leading-tight">{data.fullName}</h1>
        <p className="text-[12px] text-white/85">{data.role}</p>
      </header>

      <div className="grid grid-cols-[38%_1fr] gap-7 p-9 pt-6">
        <div className="flex flex-col gap-5">
          <Photo
            data={data}
            className="size-28 self-center rounded-full border-4 border-white text-3xl text-white shadow"
            fallbackStyle={{ background: theme.accent }}
          />
          {data.summary && (
            <GreenSec title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </GreenSec>
          )}
          {data.skills.length > 0 && (
            <GreenSec title="Skills" theme={theme}>
              <div className="flex flex-col gap-2">
                {data.skills.map((s) => (
                  <div key={s}>
                    <div className="mb-0.5 flex items-center justify-between">
                      <span>{s}</span>
                      <span className="text-[10px] text-slate-400">Advanced</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200">
                      <div
                        className="h-1.5 rounded-full"
                        style={{ background: theme.accent, width: '85%' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GreenSec>
          )}
          {data.education.length > 0 && (
            <GreenSec title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p>{ed.school}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </GreenSec>
          )}
          {data.languages.length > 0 && (
            <GreenSec title="Language" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </GreenSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={GreenSec} />
          <ProjectsBlock data={data} theme={theme} S={GreenSec} />
          <CertificationsBlock data={data} theme={theme} S={GreenSec} />
          <AchievementsBlock data={data} theme={theme} S={GreenSec} />
          <ReferencesBlock data={data} theme={theme} S={GreenSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ CLEANMARK ================================ */
/* Ref: "Simple Professional CV Resume" (Image 5) — sidebar with photo, clean  */
function CleanmarkTemplate({ data, theme }: TP) {
  const CM: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-200" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6" style={{ background: theme.soft }}>
        <Photo
          data={data}
          className="aspect-[4/5] w-full rounded-lg text-4xl text-white"
          fallbackStyle={{ background: theme.accent }}
        />
        {hasContact(data) && (
          <div>
            <RailHead color={theme.accent}>Contact</RailHead>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Education</RailHead>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-bold text-slate-900">{ed.degree}</p>
                  <p>{ed.school}</p>
                  <p className="text-[10.5px] text-slate-400">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Expertise</RailHead>
            <ul className="flex flex-col gap-1">
              {data.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Language</RailHead>
            <div className="flex flex-col gap-0.5">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` · ${l.level}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 bg-white p-7">
        <header>
          <h1 className="font-serif text-[28px] font-semibold leading-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.15em]" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </header>
        {data.summary && (
          <CM title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </CM>
        )}
        <ExperienceBlock data={data} theme={theme} S={CM} />
        <ProjectsBlock data={data} theme={theme} S={CM} />
        <CertificationsBlock data={data} theme={theme} S={CM} />
        <AchievementsBlock data={data} theme={theme} S={CM} />
        <ReferencesBlock data={data} theme={theme} S={CM} />
      </main>
    </div>
  )
}

/* ================================ RIBBON =================================== */
/* Ref: "White Professional Web Designer Resume" — clean, horizontal layout    */
function RibbonTemplate({ data, theme }: TP) {
  const RibSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b-2 pb-1 text-[12.5px] font-bold uppercase tracking-wide text-slate-800"
        style={{ borderColor: theme.accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[26px] font-bold tracking-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[13px] font-semibold" style={{ color: theme.accent }}>{data.role}</p>
        </div>
        {hasContact(data) && (
          <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-5">
        {data.summary && (
          <RibSec title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </RibSec>
        )}
        {data.experience.length > 0 && (
          <RibSec title="Experience" theme={theme}>
            <div className="flex flex-col gap-4">
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-bold text-slate-900">{e.role}</p>
                    <span className="shrink-0 text-[10.5px] text-slate-400">
                      {[e.start, e.end].filter(Boolean).join(' – ')}
                    </span>
                  </div>
                  <p className="italic text-slate-500">{e.company}</p>
                  <BulletList bullets={e.bullets} theme={theme} />
                </div>
              ))}
            </div>
          </RibSec>
        )}
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <EducationBlock data={data} theme={theme} S={RibSec} />
            {data.skills.length > 0 && (
              <RibSec title="Skills" theme={theme}>
                <div className="flex flex-wrap gap-1.5">
                  {data.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded px-2 py-0.5 text-[10.5px] font-medium"
                      style={{ background: theme.soft, color: theme.accent }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </RibSec>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <ProjectsBlock data={data} theme={theme} S={RibSec} />
            <CertificationsBlock data={data} theme={theme} S={RibSec} />
            <LanguagesBlock data={data} theme={theme} S={RibSec} />
          </div>
        </div>
        <AchievementsBlock data={data} theme={theme} S={RibSec} />
        <ReferencesBlock data={data} theme={theme} S={RibSec} />
      </div>
    </div>
  )
}

/* ================================ SLATEBAND ================================ */
/* Ref: "Black White Minimalist CV Resume" (Image 4) — dark sidebar, icons    */
function SlatebandTemplate({ data, theme }: TP) {
  const SL: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        <span className="h-3 w-1 rounded-full" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[33%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6 text-white" style={{ background: '#1e293b' }}>
        <Photo
          data={data}
          className="size-24 self-center rounded-full text-2xl"
          fallbackStyle={{ background: 'rgba(255,255,255,0.15)' }}
        />
        <div className="text-center">
          <h1 className="text-[20px] font-bold leading-tight">{data.fullName}</h1>
          <p className="text-[11px] text-white/75">{data.role}</p>
        </div>
        {hasContact(data) && (
          <div>
            <RailHead light>Contact</RailHead>
            <div className="flex flex-col gap-2 text-[10.5px] text-white/85">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead light>Education</RailHead>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold">{ed.degree}</p>
                  <p className="text-white/80">{ed.school}</p>
                  <p className="text-[10px] text-white/60">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead light>Skills</RailHead>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead light>Languages</RailHead>
            <div className="flex flex-col gap-0.5 text-white/85">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` (${l.level})`}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 p-7">
        {data.summary && (
          <SL title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </SL>
        )}
        <ExperienceBlock data={data} theme={theme} S={SL} />
        <ProjectsBlock data={data} theme={theme} S={SL} />
        <CertificationsBlock data={data} theme={theme} S={SL} />
        <AchievementsBlock data={data} theme={theme} S={SL} />
        <ReferencesBlock data={data} theme={theme} S={SL} />
      </main>
    </div>
  )
}

/* ================================ POSTER =================================== */
/* Ref: "Professional Modern CV Resume" (Image 6) — sidebar with circle photo  */
function PosterTemplate({ data, theme }: TP) {
  const PS: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-900">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-300" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[36%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 bg-slate-50 p-6">
        <Photo
          data={data}
          className="size-28 self-center rounded-full border-4 border-white text-3xl text-white shadow-md"
          fallbackStyle={{ background: theme.accent }}
        />
        {data.summary && (
          <div>
            <RailHead color={theme.accent}>Profile</RailHead>
            <p className="leading-relaxed">{data.summary}</p>
          </div>
        )}
        {hasContact(data) && (
          <div>
            <RailHead color={theme.accent}>Contact</RailHead>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Education</RailHead>
            <div className="flex flex-col gap-2.5">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-bold text-slate-900">{ed.degree}</p>
                  <p>{ed.school}</p>
                  <p className="text-[10.5px] text-slate-400">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Skills</RailHead>
            <ul className="flex flex-col gap-1">
              {data.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead color={theme.accent}>Languages</RailHead>
            <div className="flex flex-col gap-0.5">
              {data.languages.map((l) => (
                <span key={l.id}>
                  {l.name}
                  {l.level && ` · ${l.level}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 bg-white p-7">
        <header>
          <h1 className="text-[28px] font-bold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[12px] uppercase tracking-wide text-slate-500">{data.role}</p>
        </header>
        <ExperienceBlock data={data} theme={theme} S={PS} />
        <ProjectsBlock data={data} theme={theme} S={PS} />
        <CertificationsBlock data={data} theme={theme} S={PS} />
        <AchievementsBlock data={data} theme={theme} S={PS} />
        <ReferencesBlock data={data} theme={theme} S={PS} />
      </main>
    </div>
  )
}

/* ================================ HEADLINE ================================= */
/* Ref: "Black and White Corporate Resume" — blue header bar                  */
function HeadlineTemplate({ data, theme }: TP) {
  const Head: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        <span className="size-2 rounded-sm" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header className="px-9 py-5 text-white" style={{ background: theme.accent }}>
        <h1 className="text-[30px] font-bold leading-tight">{data.fullName}</h1>
        <p className="text-[12px] text-white/85">{data.role}</p>
      </header>

      <div className="grid grid-cols-[34%_1fr] gap-7 p-9 pt-6">
        <div className="flex flex-col gap-5">
          {hasContact(data) && (
            <Head title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Head>
          )}
          {data.education.length > 0 && (
            <Head title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p>{ed.school}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </Head>
          )}
          {data.skills.length > 0 && (
            <Head title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </Head>
          )}
          {data.certifications.length > 0 && (
            <Head title="Certifications" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {data.certifications.map((c) => (
                  <div key={c.id}>
                    <p className="font-semibold text-slate-900">{c.name}</p>
                    <p className="text-[10px] text-slate-400">
                      {[c.issuer, c.year].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </Head>
          )}
          {data.languages.length > 0 && (
            <Head title="Languages" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </Head>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.summary && (
            <Head title="Profile" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Head>
          )}
          <ExperienceBlock data={data} theme={theme} S={Head} />
          <ProjectsBlock data={data} theme={theme} S={Head} />
          <AchievementsBlock data={data} theme={theme} S={Head} />
          <ReferencesBlock data={data} theme={theme} S={Head} />
        </div>
      </div>
    </div>
  )
}

/* ================================ SEAFOAM ================================== */
/* Ref: "white simple student cv resume" (Image 5) — minimalist, circle photo  */
function SeafoamTemplate({ data, theme }: TP) {
  const Sea: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-6 flex items-center gap-6">
        <Photo
          data={data}
          className="size-28 shrink-0 rounded-full border-6 text-3xl text-white"
          fallbackStyle={{ background: theme.accent, borderColor: theme.soft }}
        />
        <div>
          <h1 className="text-[26px] font-bold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[12px] italic" style={{ color: theme.accent }}>{data.role}</p>
          {hasContact(data) && (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-col gap-5">
        {data.summary && (
          <Sea title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Sea>
        )}
        <div className="grid grid-cols-2 gap-7">
          <div className="flex flex-col gap-5">
            <EducationBlock data={data} theme={theme} S={Sea} />
            {data.skills.length > 0 && (
              <Sea title="Skills" theme={theme}>
                <ul className="flex flex-col gap-1">
                  {data.skills.map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Sea>
            )}
            {data.languages.length > 0 && (
              <Sea title="Language" theme={theme}>
                <div className="flex flex-col gap-0.5">
                  {data.languages.map((l) => (
                    <span key={l.id}>
                      {l.name}
                      {l.level && ` · ${l.level}`}
                    </span>
                  ))}
                </div>
              </Sea>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <ExperienceBlock data={data} theme={theme} S={Sea} />
            <ProjectsBlock data={data} theme={theme} S={Sea} />
          </div>
        </div>
        <CertificationsBlock data={data} theme={theme} S={Sea} />
        <AchievementsBlock data={data} theme={theme} S={Sea} />
        <ReferencesBlock data={data} theme={theme} S={Sea} />
      </div>
    </div>
  )
}

/* ================================ CITRUS =================================== */
/* Ref: "Orange White Simple Graphic Designer Resume" — orange accents         */
function CitrusTemplate({ data, theme }: TP) {
  const CitSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        <span style={{ color: theme.accent }}>//</span> {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[30px] font-extrabold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[13px] font-bold uppercase tracking-wide" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </div>
        {hasContact(data) && (
          <div className="flex flex-col items-end gap-0.5 text-right text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>

      <div className="mb-4 h-1 w-full rounded-full" style={{ background: theme.accent }} />

      <div className="grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          {data.summary && (
            <CitSec title="Profile" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </CitSec>
          )}
          {data.education.length > 0 && (
            <CitSec title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p>{ed.school}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </CitSec>
          )}
          {data.skills.length > 0 && (
            <CitSec title="Skills" theme={theme}>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                {data.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </CitSec>
          )}
          {data.languages.length > 0 && (
            <CitSec title="Languages" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </CitSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={CitSec} />
          <ProjectsBlock data={data} theme={theme} S={CitSec} />
          <CertificationsBlock data={data} theme={theme} S={CitSec} />
          <AchievementsBlock data={data} theme={theme} S={CitSec} />
          <ReferencesBlock data={data} theme={theme} S={CitSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ EXPORT =================================== */

export const TEMPLATES_B: Partial<Record<TemplateId, (p: TP) => React.ReactNode>> = {
  triad: TriadTemplate,
  estate: EstateTemplate,
  outline: OutlineTemplate,
  ruled: RuledTemplate,
  blush: BlushTemplate,
  noirside: NoirsideTemplate,
  grayside: GraysideTemplate,
  display: DisplayTemplate,
  evergreen: EvergreenTemplate,
  cleanmark: CleanmarkTemplate,
  ribbon: RibbonTemplate,
  slateband: SlatebandTemplate,
  poster: PosterTemplate,
  headline: HeadlineTemplate,
  seafoam: SeafoamTemplate,
  citrus: CitrusTemplate,
}
