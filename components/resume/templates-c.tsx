'use client'

/*
 * Templates batch C — additional recreations from reference designs.
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

/* ================================ CRIMSON ================================== */
/* Ref: "Red Black Bold Graphic Designer Resume" — bold red/black design       */
function CrimsonTemplate({ data, theme }: TP) {
  const Bold: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[13px] font-extrabold uppercase tracking-wide text-slate-900">
        <span style={{ color: theme.accent }}>/</span> {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[12px] text-slate-700">
      <header className="mb-5 flex items-start gap-6">
        <Photo
          data={data}
          className="size-28 shrink-0 rounded-lg text-3xl text-white"
          fallbackStyle={{ background: theme.accent }}
        />
        <div>
          <h1 className="text-[36px] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            {data.fullName}
          </h1>
          <p
            className="mt-1 inline-block px-2 py-0.5 text-[13px] font-bold uppercase text-white"
            style={{ background: theme.accent }}
          >
            {data.role}
          </p>
          {hasContact(data) && (
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-0.5 text-[10.5px] text-slate-500">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </div>
      </header>

      {data.summary && (
        <p className="mb-5 border-l-4 pl-4 text-slate-600" style={{ borderColor: theme.accent }}>
          {data.summary}
        </p>
      )}

      <div className="grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          <EducationBlock data={data} theme={theme} S={Bold} />
          {data.skills.length > 0 && (
            <Bold title="Skills" theme={theme}>
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
            </Bold>
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Bold} />
          )}
          {data.languages.length > 0 && (
            <LanguagesBlock data={data} theme={theme} S={Bold} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={Bold} />
          <ProjectsBlock data={data} theme={theme} S={Bold} />
          <AchievementsBlock data={data} theme={theme} S={Bold} />
          <ReferencesBlock data={data} theme={theme} S={Bold} />
        </div>
      </div>
    </div>
  )
}

/* ================================ IVORY ==================================== */
/* Ref: "White Black Elegant Modern Corporate CV Resume" — elegant two-col     */
function IvoryTemplate({ data, theme }: TP) {
  const ElSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 font-serif text-[13px] font-semibold uppercase tracking-[0.15em] text-slate-800">
        {title}
        <span className="mt-1 block h-px w-10 bg-slate-300" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[11.5px] text-slate-600">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[30px] uppercase tracking-[0.08em] text-slate-900">
            {data.fullName.split(' ')[0]}{' '}
            <span className="font-bold">{data.fullName.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="italic text-slate-500">{data.role}</p>
        </div>
        {hasContact(data) && (
          <div className="flex flex-col items-end gap-0.5 text-right text-[10.5px] text-slate-500">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>

      <div className="mb-5 h-0.5 w-full bg-slate-900" />

      {data.summary && (
        <div className="mb-6 border-y border-slate-300 py-4 text-center">
          <p className="mx-auto max-w-[90%] leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-[38%_1fr] gap-8">
        <div className="flex flex-col gap-6">
          <EducationBlock data={data} theme={theme} S={ElSec} />
          {data.skills.length > 0 && (
            <ElSec title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </ElSec>
          )}
          <CertificationsBlock data={data} theme={theme} S={ElSec} />
          <LanguagesBlock data={data} theme={theme} S={ElSec} />
        </div>
        <div className="flex flex-col gap-6">
          <ExperienceBlock data={data} theme={theme} S={ElSec} />
          <ProjectsBlock data={data} theme={theme} S={ElSec} />
          <AchievementsBlock data={data} theme={theme} S={ElSec} />
          <ReferencesBlock data={data} theme={theme} S={ElSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ FERN ===================================== */
/* Ref: "White and Green Simple Student CV Resume" — green accents            */
function FernTemplate({ data, theme }: TP) {
  const FernSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        <span className="size-2 rounded-full" style={{ background: theme.accent }} />
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
            <FernSec title="Contact Me" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </FernSec>
          )}
          {data.education.length > 0 && (
            <FernSec title="Education" theme={theme}>
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
            </FernSec>
          )}
          {data.skills.length > 0 && (
            <FernSec title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </FernSec>
          )}
          {data.languages.length > 0 && (
            <FernSec title="Language" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` — ${l.level}`}
                  </span>
                ))}
              </div>
            </FernSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.summary && (
            <FernSec title="Profile" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </FernSec>
          )}
          <ExperienceBlock data={data} theme={theme} S={FernSec} />
          <ProjectsBlock data={data} theme={theme} S={FernSec} />
          <AchievementsBlock data={data} theme={theme} S={FernSec} />
          <ReferencesBlock data={data} theme={theme} S={FernSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ ASH ====================================== */
/* Ref: "Minimalist CV Resume" (Image 7) — clean minimalist with timeline      */
function AshTemplate({ data, theme }: TP) {
  const AshSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        <span className="size-2 rotate-45" style={{ background: theme.accent }} />
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
          {hasContact(data) && (
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          {data.summary && (
            <AshSec title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </AshSec>
          )}
          {data.skills.length > 0 && (
            <AshSec title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </AshSec>
          )}
          {data.languages.length > 0 && (
            <AshSec title="Language" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </AshSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {data.education.length > 0 && (
            <AshSec title="Education" theme={theme}>
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
            </AshSec>
          )}
          <ExperienceBlock data={data} theme={theme} S={AshSec} />
          <ProjectsBlock data={data} theme={theme} S={AshSec} />
          <CertificationsBlock data={data} theme={theme} S={AshSec} />
          <ReferencesBlock data={data} theme={theme} S={AshSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ PEARL ==================================== */
/* Ref: "White Minimalist Clean Marketing Manager Resume" — clean professional */
function PearlTemplate({ data, theme }: TP) {
  const Pearl: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-200" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5">
        <h1 className="text-[28px] font-bold tracking-tight text-slate-900">{data.fullName}</h1>
        <p className="text-[13px] font-semibold" style={{ color: theme.accent }}>{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <Pearl title="Professional Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Pearl>
      )}

      <div className="mt-5 grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          <EducationBlock data={data} theme={theme} S={Pearl} />
          {data.skills.length > 0 && (
            <Pearl title="Skills" theme={theme}>
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
            </Pearl>
          )}
          {data.languages.length > 0 && (
            <Pearl title="Languages" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </Pearl>
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Pearl} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={Pearl} />
          <ProjectsBlock data={data} theme={theme} S={Pearl} />
          <AchievementsBlock data={data} theme={theme} S={Pearl} />
          <ReferencesBlock data={data} theme={theme} S={Pearl} />
        </div>
      </div>
    </div>
  )
}

/* ================================ OBSIDIAN ================================= */
/* Ref: "Black Modern Professional Resume" — dark header section               */
function ObsidianTemplate({ data, theme }: TP) {
  const ObsSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12.5px] font-bold uppercase tracking-[0.12em] text-slate-900">
        {title}
      </h2>
      <div className="border-t border-slate-300 pt-2">{children}</div>
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header className="bg-slate-900 px-9 py-7 text-white">
        <h1 className="text-[28px] font-bold leading-tight">{data.fullName}</h1>
        <p className="text-[12px] uppercase tracking-[0.2em] text-white/75">{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[10.5px] text-white/70">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="grid grid-cols-[36%_1fr] gap-7 p-9 pt-6">
        <div className="flex flex-col gap-5">
          {data.summary && (
            <ObsSec title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </ObsSec>
          )}
          {data.education.length > 0 && (
            <ObsSec title="Education" theme={theme}>
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
            </ObsSec>
          )}
          {data.skills.length > 0 && (
            <ObsSec title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </ObsSec>
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={ObsSec} />
          )}
          {data.languages.length > 0 && (
            <ObsSec title="Languages" theme={theme}>
              <div className="flex flex-col gap-0.5">
                {data.languages.map((l) => (
                  <span key={l.id}>
                    {l.name}
                    {l.level && ` · ${l.level}`}
                  </span>
                ))}
              </div>
            </ObsSec>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={ObsSec} />
          <ProjectsBlock data={data} theme={theme} S={ObsSec} />
          <AchievementsBlock data={data} theme={theme} S={ObsSec} />
          <ReferencesBlock data={data} theme={theme} S={ObsSec} />
        </div>
      </div>
    </div>
  )
}

/* ================================ DOVE ===================================== */
/* Ref: "Black and White Minimalist CV Resume" (Image 7) — minimalist side    */
function DoveTemplate({ data, theme }: TP) {
  const DovSec: SectionComp = ({ title, children }) => (
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
          <DovSec title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </DovSec>
        )}
        <ExperienceBlock data={data} theme={theme} S={DovSec} />
        <ProjectsBlock data={data} theme={theme} S={DovSec} />
        <CertificationsBlock data={data} theme={theme} S={DovSec} />
        <AchievementsBlock data={data} theme={theme} S={DovSec} />
        <ReferencesBlock data={data} theme={theme} S={DovSec} />
      </main>
    </div>
  )
}

/* ================================ STONE ==================================== */
/* Ref: "Professional Modern CV Resume" (Image 6) — sidebar with photo        */
function StoneTemplate({ data, theme }: TP) {
  const Stn: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[13px] font-bold uppercase tracking-wide text-slate-900">
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
        <ExperienceBlock data={data} theme={theme} S={Stn} />
        <ProjectsBlock data={data} theme={theme} S={Stn} />
        <CertificationsBlock data={data} theme={theme} S={Stn} />
        <AchievementsBlock data={data} theme={theme} S={Stn} />
        <ReferencesBlock data={data} theme={theme} S={Stn} />
      </main>
    </div>
  )
}

/* ================================ CLOUD ==================================== */
/* Ref: "White Minimalist Resume" (Image 6) — airy white layout               */
function CloudTemplate({ data, theme }: TP) {
  const Cld: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[11.5px] text-slate-600">
      <header className="mb-6 text-center">
        <h1 className="text-[30px] font-semibold uppercase tracking-[0.15em] text-slate-900">
          {data.fullName}
        </h1>
        <p className="text-[12px] uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
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

      <div className="mb-5 h-px w-full bg-slate-200" />

      {data.summary && (
        <p className="mb-6 text-center italic text-slate-600">{data.summary}</p>
      )}

      <div className="grid grid-cols-[38%_1fr] gap-8">
        <div className="flex flex-col gap-6">
          <EducationBlock data={data} theme={theme} S={Cld} />
          {data.skills.length > 0 && (
            <Cld title="Skills" theme={theme}>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {data.skills.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </Cld>
          )}
          {data.languages.length > 0 && (
            <LanguagesBlock data={data} theme={theme} S={Cld} />
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Cld} />
          )}
        </div>
        <div className="flex flex-col gap-6">
          <ExperienceBlock data={data} theme={theme} S={Cld} />
          <ProjectsBlock data={data} theme={theme} S={Cld} />
          <AchievementsBlock data={data} theme={theme} S={Cld} />
          <ReferencesBlock data={data} theme={theme} S={Cld} />
        </div>
      </div>
    </div>
  )
}

/* ================================ HAZEL ==================================== */
/* Ref: "Classic professional with borders" — bordered sections               */
function HazelTemplate({ data, theme }: TP) {
  const Haz: SectionComp = ({ title, children }) => (
    <section className="border border-slate-200 p-4">
      <h2
        className="mb-2 text-[12px] font-bold uppercase tracking-wide"
        style={{ color: theme.accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5 border-b-2 pb-4 text-center" style={{ borderColor: theme.accent }}>
        <h1 className="text-[28px] font-bold text-slate-900">{data.fullName}</h1>
        <p className="text-[13px] font-medium" style={{ color: theme.accent }}>{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-col gap-4">
        {data.summary && (
          <Haz title="Summary" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Haz>
        )}
        <ExperienceBlock data={data} theme={theme} S={Haz} />
        <EducationBlock data={data} theme={theme} S={Haz} />
        {data.skills.length > 0 && (
          <Haz title="Skills" theme={theme}>
            <div className="grid grid-cols-3 gap-x-6 gap-y-1">
              {data.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </Haz>
        )}
        <ProjectsBlock data={data} theme={theme} S={Haz} />
        <CertificationsBlock data={data} theme={theme} S={Haz} />
        <LanguagesBlock data={data} theme={theme} S={Haz} />
        <AchievementsBlock data={data} theme={theme} S={Haz} />
        <ReferencesBlock data={data} theme={theme} S={Haz} />
      </div>
    </div>
  )
}

/* ================================ FOG ====================================== */
/* Ref: "Subtle gray professional" — muted gray accents                      */
function FogTemplate({ data, theme }: TP) {
  const Fg: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b border-slate-200 pb-1 text-[12.5px] font-bold text-slate-700">
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
          <p className="text-[12px] text-slate-500">{data.role}</p>
        </div>
        {hasContact(data) && (
          <div className="flex flex-col items-end gap-0.5 text-right text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <Fg title="Profile" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Fg>
      )}

      <div className="mt-5 grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          <EducationBlock data={data} theme={theme} S={Fg} />
          {data.skills.length > 0 && (
            <Fg title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </Fg>
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Fg} />
          )}
          {data.languages.length > 0 && (
            <LanguagesBlock data={data} theme={theme} S={Fg} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={Fg} />
          <ProjectsBlock data={data} theme={theme} S={Fg} />
          <AchievementsBlock data={data} theme={theme} S={Fg} />
          <ReferencesBlock data={data} theme={theme} S={Fg} />
        </div>
      </div>
    </div>
  )
}

/* ================================ INK ====================================== */
/* Ref: "Bold black accent sections" — strong black headers                  */
function InkTemplate({ data, theme }: TP) {
  const InkSec: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 bg-slate-900 px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white">
        {title}
      </h2>
      <div className="px-1">{children}</div>
    </section>
  )
  return (
    <div className="flex flex-col gap-4.5 p-9 text-[11.5px] text-slate-600">
      <header>
        <h1 className="text-[26px] font-bold tracking-tight text-slate-900">{data.fullName}</h1>
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: theme.accent }}
        >
          {data.role}
        </p>
        {hasContact(data) && (
          <p className="mt-1 text-[10.5px] text-slate-400">
            {contactBits(data)
              .map((b) => b.text)
              .join('  |  ')}
          </p>
        )}
      </header>

      {data.summary && (
        <InkSec title="Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </InkSec>
      )}
      {data.skills.length > 0 && (
        <InkSec title="Skills" theme={theme}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {data.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </InkSec>
      )}
      <ExperienceBlock data={data} theme={theme} S={InkSec} />
      <EducationBlock data={data} theme={theme} S={InkSec} />
      <ProjectsBlock data={data} theme={theme} S={InkSec} />
      <CertificationsBlock data={data} theme={theme} S={InkSec} />
      <AchievementsBlock data={data} theme={theme} S={InkSec} />
      <LanguagesBlock data={data} theme={theme} S={InkSec} />
      <ReferencesBlock data={data} theme={theme} S={InkSec} />
    </div>
  )
}

/* ================================ PINE ===================================== */
/* Ref: "Green accent sidebar layout" — green-tinted sidebar                 */
function PineTemplate({ data, theme }: TP) {
  const Pn: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full" style={{ background: `${theme.accent}44` }} />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[34%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6 text-white" style={{ background: theme.accent }}>
        <Photo
          data={data}
          className="size-24 self-center rounded-full border-3 border-white/30 text-2xl"
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
          <Pn title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Pn>
        )}
        <ExperienceBlock data={data} theme={theme} S={Pn} />
        <ProjectsBlock data={data} theme={theme} S={Pn} />
        <CertificationsBlock data={data} theme={theme} S={Pn} />
        <AchievementsBlock data={data} theme={theme} S={Pn} />
        <ReferencesBlock data={data} theme={theme} S={Pn} />
      </main>
    </div>
  )
}

/* ================================ MIST ===================================== */
/* Ref: "Soft muted professional" — soft muted tones                         */
function MistTemplate({ data, theme }: TP) {
  const Mst: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-700">
        {title}
      </h2>
      <div className="border-t border-slate-200 pt-2">{children}</div>
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5 flex items-center gap-5">
        <Photo
          data={data}
          className="size-20 shrink-0 rounded-2xl text-2xl text-white"
          fallbackStyle={{ background: theme.accent }}
        />
        <div>
          <h1 className="text-[24px] font-bold leading-tight text-slate-900">{data.fullName}</h1>
          <p className="text-[13px] font-semibold" style={{ color: theme.accent }}>{data.role}</p>
          {hasContact(data) && (
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </div>
      </header>

      {data.summary && (
        <Mst title="Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Mst>
      )}

      <div className="mt-5 flex flex-col gap-5">
        <ExperienceBlock data={data} theme={theme} S={Mst} />
        <EducationBlock data={data} theme={theme} S={Mst} />
        {data.skills.length > 0 && (
          <Mst title="Skills" theme={theme}>
            <SkillChips data={data} theme={theme} />
          </Mst>
        )}
        <ProjectsBlock data={data} theme={theme} S={Mst} />
        <CertificationsBlock data={data} theme={theme} S={Mst} />
        <LanguagesBlock data={data} theme={theme} S={Mst} />
        <AchievementsBlock data={data} theme={theme} S={Mst} />
        <ReferencesBlock data={data} theme={theme} S={Mst} />
      </div>
    </div>
  )
}

/* ================================ TAUPE ==================================== */
/* Ref: "Warm taupe sidebar layout" — warm taupe tones                       */
function TaupeTemplate({ data, theme }: TP) {
  const Tp: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 text-[12px] font-bold uppercase tracking-wide text-slate-800">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-200" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-5 p-6" style={{ background: '#f5f0eb' }}>
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
          <p className="text-[12px] uppercase tracking-wide" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </header>
        {data.summary && (
          <Tp title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Tp>
        )}
        <ExperienceBlock data={data} theme={theme} S={Tp} />
        <ProjectsBlock data={data} theme={theme} S={Tp} />
        <CertificationsBlock data={data} theme={theme} S={Tp} />
        <AchievementsBlock data={data} theme={theme} S={Tp} />
        <ReferencesBlock data={data} theme={theme} S={Tp} />
      </main>
    </div>
  )
}

/* ================================ LINEN ==================================== */
/* Ref: "Simple linen textured layout" — clean simple                        */
function LinenTemplate({ data, theme }: TP) {
  const Lin: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b-2 pb-1 text-[12.5px] font-bold text-slate-800"
        style={{ borderColor: theme.accent }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-9 text-[11.5px] text-slate-600">
      <header className="mb-5 text-center">
        <h1 className="text-[28px] font-bold text-slate-900">{data.fullName}</h1>
        <p className="text-[13px] font-medium" style={{ color: theme.accent }}>{data.role}</p>
        {hasContact(data) && (
          <div className="mt-2 flex flex-wrap justify-center gap-x-3 gap-y-0.5 text-[10.5px] text-slate-400">
            {contactBits(data).map((b, i) => (
              <ContactBit key={i} icon={b.icon} text={b.text} />
            ))}
          </div>
        )}
      </header>

      {data.summary && (
        <Lin title="Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Lin>
      )}

      <div className="mt-5 grid grid-cols-[38%_1fr] gap-7">
        <div className="flex flex-col gap-5">
          <EducationBlock data={data} theme={theme} S={Lin} />
          {data.skills.length > 0 && (
            <Lin title="Skills" theme={theme}>
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
            </Lin>
          )}
          {data.languages.length > 0 && (
            <LanguagesBlock data={data} theme={theme} S={Lin} />
          )}
          {data.certifications.length > 0 && (
            <CertificationsBlock data={data} theme={theme} S={Lin} />
          )}
        </div>
        <div className="flex flex-col gap-5">
          <ExperienceBlock data={data} theme={theme} S={Lin} />
          <ProjectsBlock data={data} theme={theme} S={Lin} />
          <AchievementsBlock data={data} theme={theme} S={Lin} />
          <ReferencesBlock data={data} theme={theme} S={Lin} />
        </div>
      </div>
    </div>
  )
}

/* ================================ EXPORT =================================== */

export const TEMPLATES_C: Partial<Record<TemplateId, (p: TP) => React.ReactNode>> = {
  crimson: CrimsonTemplate,
  ivory: IvoryTemplate,
  fern: FernTemplate,
  ash: AshTemplate,
  pearl: PearlTemplate,
  obsidian: ObsidianTemplate,
  dove: DoveTemplate,
  stone: StoneTemplate,
  cloud: CloudTemplate,
  hazel: HazelTemplate,
  fog: FogTemplate,
  ink: InkTemplate,
  pine: PineTemplate,
  mist: MistTemplate,
  taupe: TaupeTemplate,
  linen: LinenTemplate,
}
