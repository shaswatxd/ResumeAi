'use client'

/*
 * Templates recreated from reference designs, batch A.
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

/* ------------------------------ shared bits ------------------------------- */

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

function WhiteEdu({ data }: TP) {
  if (data.education.length === 0) return null
  return (
    <div className="flex flex-col gap-2.5">
      {data.education.map((ed) => (
        <div key={ed.id}>
          <p className="text-[10.5px] text-white/60">
            {[ed.start, ed.end].filter(Boolean).join(' — ')}
          </p>
          <p className="font-semibold">{ed.degree}</p>
          <p className="text-white/80">{ed.school}</p>
        </div>
      ))}
    </div>
  )
}

/* ============================ AZURE CORPORATE ============================== */
/* Ref: "Modern Professional CV" — diagonal accent corner, round photo rail   */
function AzureTemplate({ data, theme }: TP) {
  const Item: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[13px] font-bold text-slate-800">
        <span
          className="flex size-5 items-center justify-center rounded"
          style={{ background: theme.soft }}
        >
          <span className="size-2 rounded-sm" style={{ background: theme.accent }} />
        </span>
        {title}
      </h2>
      <div className="border-l pl-4" style={{ borderColor: `${theme.accent}44` }}>
        {children}
      </div>
    </section>
  )
  return (
    <div className="relative grid min-h-full grid-cols-[36%_1fr] text-[12px] text-slate-600">
      {/* diagonal corner accent */}
      <div
        aria-hidden
        className="absolute left-0 top-0 h-40 w-[36%]"
        style={{
          background: theme.accent,
          clipPath: 'polygon(0 0, 100% 0, 0 78%)',
          opacity: 0.85,
        }}
      />
      <aside className="relative flex flex-col gap-6 bg-slate-50 p-7 pt-10">
        <Photo
          data={data}
          className="size-28 rounded-full border-4 border-white text-3xl shadow-md"
          fallbackStyle={{ background: theme.accent, color: '#fff' }}
        />
        <div>
          <h1 className="text-[24px] font-semibold leading-tight" style={{ color: theme.accent }}>
            {data.fullName}
          </h1>
          <p className="text-[12.5px] text-slate-500">{data.role}</p>
        </div>
        {hasContact(data) && (
          <div>
            <RailHead>Contact</RailHead>
            <div className="flex flex-col gap-1.5 text-[11px]">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.summary && (
          <div>
            <RailHead>About Me</RailHead>
            <p className="text-[11.5px] leading-relaxed">{data.summary}</p>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead>Skills</RailHead>
            <ul className="flex flex-col gap-1 text-[11.5px]">
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
            <RailHead>Languages</RailHead>
            <p className="text-[11.5px]">
              {data.languages
                .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                .join(' · ')}
            </p>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-6 bg-white p-8">
        <EducationBlock data={data} theme={theme} S={Item} />
        <ExperienceBlock data={data} theme={theme} S={Item} />
        <ProjectsBlock data={data} theme={theme} S={Item} />
        <CertificationsBlock data={data} theme={theme} S={Item} />
        <AchievementsBlock data={data} theme={theme} S={Item} />
        <ReferencesBlock data={data} theme={theme} S={Item} />
      </main>
    </div>
  )
}

/* =============================== MERIDIAN ================================== */
/* Ref: "White Minimalist Resume" — centered name, vertical divider, diamonds */
function MeridianTemplate({ data, theme }: TP) {
  const Head = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-2.5 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] text-slate-800">
      <span
        className="size-2 rotate-45"
        style={{ background: theme.accent }}
      />
      {children}
    </h2>
  )
  return (
    <div className="p-10 text-[12px] text-slate-600">
      <header className="mb-8 flex items-center justify-center gap-4">
        <span className="h-8 w-14" style={{ background: theme.soft }} />
        <div className="text-center">
          <h1 className="text-[28px] font-semibold uppercase tracking-[0.25em] text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.2em] text-slate-500">
            {data.role}
          </p>
        </div>
        <span className="h-8 w-14" style={{ background: theme.soft }} />
      </header>

      <div className="grid grid-cols-[38%_1px_1fr] gap-x-7">
        <div className="flex flex-col gap-6">
          {hasContact(data) && (
            <section>
              <Head>Contact</Head>
              <div className="flex flex-col gap-1.5 text-[11.5px]">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </section>
          )}
          {data.education.length > 0 && (
            <section>
              <Head>Education</Head>
              <div className="flex flex-col gap-3">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-semibold text-slate-900">{ed.school}</p>
                    <p>{ed.degree}</p>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
          {data.skills.length > 0 && (
            <section>
              <Head>Skills</Head>
              <ul className="flex flex-col gap-1 text-[11.5px]">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {data.languages.length > 0 && (
            <section>
              <Head>Languages</Head>
              <p className="text-[11.5px]">
                {data.languages
                  .map((l) => (l.level ? `${l.name} · ${l.level}` : l.name))
                  .join('  /  ')}
              </p>
            </section>
          )}
        </div>

        <div className="bg-slate-200" />

        <div className="flex flex-col gap-6">
          {data.summary && (
            <section>
              <Head>Personal Statement</Head>
              <p className="leading-relaxed">{data.summary}</p>
            </section>
          )}
          {data.experience.length > 0 && (
            <section>
              <Head>Work Experience</Head>
              <div className="flex flex-col gap-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <p className="font-semibold text-slate-900">{e.role}</p>
                    <p className="text-[11px] text-slate-400">
                      {e.company}
                      {(e.start || e.end) &&
                        ` · ${[e.start, e.end].filter(Boolean).join(' – ')}`}
                    </p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                ))}
              </div>
            </section>
          )}
          <ProjectsBlock
            data={data}
            theme={theme}
            S={({ title, children }) => (
              <section>
                <Head>{title}</Head>
                {children}
              </section>
            )}
          />
          <ReferencesBlock
            data={data}
            theme={theme}
            S={({ title, children }) => (
              <section>
                <Head>{title}</Head>
                {children}
              </section>
            )}
          />
        </div>
      </div>
    </div>
  )
}

/* ============================== COLLEGIATE ================================= */
/* Ref: "Deep Purple College Student CV" — white contact rail, accent header  */
function CollegiateTemplate({ data, theme }: TP) {
  const Right: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        <span
          className="flex size-5 shrink-0 items-center justify-center rounded-sm text-white"
          style={{ background: theme.accent }}
        >
          <span className="size-1.5 rounded-full bg-white/90" />
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[34%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-6 border-r border-slate-200 p-6">
        <Photo
          data={data}
          className="size-28 self-center rounded-full border-4 text-3xl text-white"
          fallbackStyle={{ background: theme.accent, borderColor: theme.soft }}
        />
        {hasContact(data) && (
          <div>
            <RailHead color={theme.accent}>Contact</RailHead>
            <div className="flex flex-col gap-2">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
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
            <ul className="flex flex-col gap-1">
              {data.languages.map((l) => (
                <li key={l.id}>
                  {l.name}
                  {l.level && <span className="text-slate-400"> ({l.level})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.interests.filter(Boolean).length > 0 && (
          <div>
            <RailHead color={theme.accent}>Interests</RailHead>
            <p>{data.interests.filter(Boolean).join(' · ')}</p>
          </div>
        )}
      </aside>

      <div className="flex flex-col">
        <header className="px-7 py-6 text-white" style={{ background: theme.accent }}>
          <h1 className="text-[26px] font-bold uppercase leading-tight tracking-wide">
            {data.fullName}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.2em] text-white/85">
            {data.role}
          </p>
        </header>
        <main className="flex flex-1 flex-col gap-5 p-7">
          {data.summary && (
            <Right title="Profile" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Right>
          )}
          <EducationBlock data={data} theme={theme} S={Right} />
          <ProjectsBlock data={data} theme={theme} S={Right} />
          <ExperienceBlock data={data} theme={theme} S={Right} />
          <AchievementsBlock data={data} theme={theme} S={Right} />
          <CertificationsBlock data={data} theme={theme} S={Right} />
        </main>
      </div>
    </div>
  )
}

/* ================================ LEDGER =================================== */
/* Ref: "Black and White Simple Infographic" — shaded section header bars     */
function LedgerTemplate({ data, theme }: TP) {
  const Bar: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 rounded bg-slate-100 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">
        {title}
      </h2>
      <div className="px-1">{children}</div>
    </section>
  )
  return (
    <div className="flex flex-col gap-4.5 p-9 text-[12px] text-slate-600">
      <header>
        <h1 className="text-[26px] font-bold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p
          className="text-[13px] font-semibold uppercase tracking-[0.15em]"
          style={{ color: theme.accent }}
        >
          {data.role}
        </p>
        {hasContact(data) && (
          <p className="mt-1 text-[11px] text-slate-400">
            {contactBits(data)
              .map((b) => b.text)
              .join('  |  ')}
          </p>
        )}
      </header>

      {data.summary && (
        <Bar title="Summary" theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Bar>
      )}
      {data.skills.length > 0 && (
        <Bar title="Technical Skills" theme={theme}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {data.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Bar>
      )}
      <ExperienceBlock data={data} theme={theme} S={Bar} />
      <EducationBlock data={data} theme={theme} S={Bar} />
      <ProjectsBlock data={data} theme={theme} S={Bar} />
      <CertificationsBlock data={data} theme={theme} S={Bar} />
      <AchievementsBlock data={data} theme={theme} S={Bar} />
      <LanguagesBlock data={data} theme={theme} S={Bar} />
      <ReferencesBlock data={data} theme={theme} S={Bar} />
    </div>
  )
}

/* ============================== TYPEWRITER ================================= */
/* Ref: "Science and Engineering Resume" — label column, typewriter face      */
function TypewriterTemplate({ data, theme }: TP) {
  const Row = ({
    label,
    children,
  }: {
    label: string
    children: React.ReactNode
  }) => (
    <div className="grid grid-cols-[120px_1fr] gap-x-6 border-t border-slate-200 py-4">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </h2>
      <div>{children}</div>
    </div>
  )
  return (
    <div className="p-10 font-mono text-[11px] leading-relaxed text-slate-700">
      <header className="mb-6 flex items-end justify-between gap-4">
        <h1 className="text-[22px] font-bold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        <p className="text-[12px] text-slate-500">{data.role}</p>
      </header>

      {hasContact(data) && (
        <Row label="Contact">
          <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
            {contactBits(data).map((b, i) => (
              <span key={i}>{b.text}</span>
            ))}
          </div>
        </Row>
      )}
      {data.summary && (
        <Row label="Profile">
          <p>{data.summary}</p>
        </Row>
      )}
      {data.experience.length > 0 && (
        <Row label="Professional Experience">
          <div className="flex flex-col gap-4">
            {data.experience.map((e) => (
              <div key={e.id}>
                <p className="font-bold text-slate-900">
                  {e.role}
                  {(e.start || e.end) && (
                    <span className="font-normal text-slate-400">
                      {' '}
                      | {[e.start, e.end].filter(Boolean).join('–')}
                    </span>
                  )}
                </p>
                <p className="text-slate-500">{e.company}</p>
                <ul className="mt-1 flex flex-col gap-0.5">
                  {e.bullets.filter(Boolean).map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span style={{ color: theme.accent }}>•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Row>
      )}
      {data.education.length > 0 && (
        <Row label="Education">
          <div className="flex flex-col gap-2.5">
            {data.education.map((ed) => (
              <div key={ed.id}>
                <p className="font-bold text-slate-900">
                  {ed.school}
                  {(ed.start || ed.end) && (
                    <span className="font-normal text-slate-400">
                      {' '}
                      | {[ed.start, ed.end].filter(Boolean).join('–')}
                    </span>
                  )}
                </p>
                <p>{ed.degree}</p>
                {ed.detail && <p className="text-slate-500">{ed.detail}</p>}
              </div>
            ))}
          </div>
        </Row>
      )}
      {data.certifications.length > 0 && (
        <Row label="Certificates">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {data.certifications.map((c) => (
              <div key={c.id}>
                <p className="font-bold text-slate-900">
                  {c.name}
                  {c.year && <span className="font-normal"> | {c.year}</span>}
                </p>
                <p className="text-slate-500">{c.issuer}</p>
              </div>
            ))}
          </div>
        </Row>
      )}
      {data.skills.length > 0 && (
        <Row label="Skills">
          <p>{data.skills.join(', ')}</p>
        </Row>
      )}
      {data.projects.length > 0 && (
        <Row label="Projects">
          <div className="flex flex-col gap-2">
            {data.projects.map((p) => (
              <div key={p.id}>
                <p className="font-bold text-slate-900">{p.name}</p>
                <p>{p.description}</p>
              </div>
            ))}
          </div>
        </Row>
      )}
      {data.references.length > 0 && (
        <Row label="References">
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            {data.references.map((r) => (
              <div key={r.id}>
                <p className="font-bold text-slate-900">{r.name}</p>
                <p className="text-slate-500">{r.title}</p>
                <p className="text-[10px]">{[r.phone, r.email].filter(Boolean).join(' · ')}</p>
              </div>
            ))}
          </div>
        </Row>
      )}
    </div>
  )
}

/* ================================ PASTEL =================================== */
/* Ref: "White Simple Sales Representative CV" — soft header band with photo  */
function PastelTemplate({ data, theme }: TP) {
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b border-slate-200 pb-1 text-[12.5px] font-bold text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header
        className="flex items-center gap-6 px-9 py-7"
        style={{ background: theme.soft }}
      >
        <Photo
          data={data}
          className="size-24 shrink-0 rounded-full border-4 border-white text-2xl text-white shadow"
          fallbackStyle={{ background: theme.accent }}
        />
        <div>
          <h1 className="text-[26px] font-bold text-slate-900">{data.fullName}</h1>
          <p className="text-[13px]" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-[34%_1fr] gap-7 p-9 pt-7">
        <aside
          className="flex h-fit flex-col gap-5 rounded-xl p-5"
          style={{ background: `${theme.soft}88` }}
        >
          {hasContact(data) && (
            <div>
              <RailHead>Contact</RailHead>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </div>
          )}
          {data.education.length > 0 && (
            <div>
              <RailHead>Education</RailHead>
              <div className="flex flex-col gap-2">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="font-semibold text-slate-800">{ed.degree}</p>
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
              <RailHead>Skills</RailHead>
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
              <RailHead>Language</RailHead>
              <p>
                {data.languages
                  .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                  .join(' · ')}
              </p>
            </div>
          )}
        </aside>

        <main className="flex flex-col gap-5">
          {data.summary && (
            <Main title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Main>
          )}
          <ExperienceBlock data={data} theme={theme} S={Main} />
          <ProjectsBlock data={data} theme={theme} S={Main} />
          <AchievementsBlock data={data} theme={theme} S={Main} />
          <ReferencesBlock data={data} theme={theme} S={Main} />
        </main>
      </div>
    </div>
  )
}

/* ================================= ONYX ==================================== */
/* Ref: "Professional Modern CV" — black name band, gray photo column         */
function OnyxTemplate({ data, theme }: TP) {
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.2em] text-slate-900">
        {title}
      </h2>
      <div className="border-t border-slate-300 pt-2.5">{children}</div>
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[32%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-6 bg-slate-100 p-6">
        <Photo
          data={data}
          className="size-28 self-center rounded-full border-4 border-white text-3xl text-white shadow"
          fallbackStyle={{ background: '#0f172a' }}
        />
        {data.summary && (
          <div>
            <RailHead>About Me</RailHead>
            <p className="leading-relaxed">{data.summary}</p>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead>Education</RailHead>
            <div className="flex flex-col gap-2">
              {data.education.map((ed) => (
                <div key={ed.id}>
                  <p className="font-semibold text-slate-800">{ed.degree}</p>
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
            <RailHead>Skills</RailHead>
            <div className="flex flex-col gap-1.5">
              {data.skills.map((s) => (
                <div key={s}>
                  <p className="mb-0.5">{s}</p>
                  <div className="h-1 w-full rounded-full bg-slate-300">
                    <div
                      className="h-1 rounded-full"
                      style={{ background: '#0f172a', width: '82%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead>Language</RailHead>
            <p>{data.languages.map((l) => l.name).join(' · ')}</p>
          </div>
        )}
      </aside>

      <div className="flex flex-col">
        <header className="bg-slate-900 px-8 py-6 text-white">
          <h1 className="text-[26px] font-bold uppercase tracking-[0.08em] leading-tight">
            {data.fullName}
          </h1>
          <p className="text-[12px] uppercase tracking-[0.25em] text-white/75">
            {data.role}
          </p>
          {hasContact(data) && (
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-0.5 text-[10.5px] text-white/70">
              {contactBits(data).map((b, i) => (
                <ContactBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          )}
        </header>
        <main className="flex flex-1 flex-col gap-5 p-8">
          {data.experience.length > 0 && (
            <Main title="Experience" theme={theme}>
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
            </Main>
          )}
          <ProjectsBlock data={data} theme={theme} S={Main} />
          <AchievementsBlock data={data} theme={theme} S={Main} />
          <CertificationsBlock data={data} theme={theme} S={Main} />
          <ReferencesBlock data={data} theme={theme} S={Main} />
        </main>
      </div>
    </div>
  )
}

/* ================================= SAGE ==================================== */
/* Ref: "IT Manager CV" — tinted photo panel, cream content                   */
function SageTemplate({ data, theme }: TP) {
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.15em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[36%_1fr] text-[11.5px] text-slate-600">
      <aside
        className="flex flex-col gap-6 p-6 text-slate-700"
        style={{ background: theme.soft }}
      >
        <Photo
          data={data}
          className="aspect-[4/5] w-full rounded-lg text-4xl text-white"
          fallbackStyle={{ background: theme.accent }}
        />
        {data.summary && (
          <div>
            <RailHead color={theme.accent}>Profile</RailHead>
            <p className="leading-relaxed">{data.summary}</p>
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
        {data.achievements.filter(Boolean).length > 0 && (
          <div>
            <RailHead color={theme.accent}>Awards</RailHead>
            <ul className="flex flex-col gap-1.5">
              {data.achievements.filter(Boolean).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
        {hasContact(data) && (
          <div className="mt-auto border-t pt-4" style={{ borderColor: `${theme.accent}44` }}>
            <div className="flex flex-col gap-1.5 text-[10.5px]">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-6 bg-[#fdfcf8] p-8">
        <header>
          <h1 className="font-serif text-[30px] font-semibold leading-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[13px] uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
            {data.role}
          </p>
        </header>
        <ExperienceBlock data={data} theme={theme} S={Main} />
        <EducationBlock data={data} theme={theme} S={Main} />
        <ProjectsBlock data={data} theme={theme} S={Main} />
        <CertificationsBlock data={data} theme={theme} S={Main} />
        <LanguagesBlock data={data} theme={theme} S={Main} />
        <ReferencesBlock data={data} theme={theme} S={Main} />
      </main>
    </div>
  )
}

/* ================================= NAVY ==================================== */
/* Ref: "Blue Simple Professional CV" — deep navy sidebar, split name         */
function NavyTemplate({ data, theme }: TP) {
  const first = data.fullName.split(' ')[0] ?? ''
  const rest = data.fullName.split(' ').slice(1).join(' ')
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b-2 pb-1 text-[13px] font-bold uppercase tracking-[0.12em] text-slate-800"
        style={{ borderColor: '#243447' }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-6 p-6 text-white" style={{ background: '#243447' }}>
        <Photo
          data={data}
          className="size-28 self-center rounded-full border-4 border-white/30 text-3xl"
          fallbackStyle={{ background: theme.accent }}
        />
        {hasContact(data) && (
          <div>
            <RailHead light>Contact</RailHead>
            <div className="flex flex-col gap-2 text-[11px] text-white/85">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.education.length > 0 && (
          <div>
            <RailHead light>Education</RailHead>
            <WhiteEdu data={data} theme={theme} />
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead light>Skills</RailHead>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.skills.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-white/60" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead light>Languages</RailHead>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.languages.map((l) => (
                <li key={l.id}>
                  {l.name}
                  {l.level && ` (${l.level})`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 p-8">
        <header>
          <h1 className="text-[30px] uppercase leading-tight tracking-wide text-slate-900">
            <span className="font-extrabold" style={{ color: '#243447' }}>
              {first}
            </span>{' '}
            <span className="font-light">{rest}</span>
          </h1>
          <p className="text-[12px] uppercase tracking-[0.3em] text-slate-500">
            {data.role}
          </p>
        </header>
        {data.summary && (
          <Main title="Profile" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Main>
        )}
        {data.experience.length > 0 && (
          <Main title="Work Experience" theme={theme}>
            <div className="flex flex-col gap-4">
              {data.experience.map((e) => (
                <div key={e.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-bold text-slate-900">{e.company}</p>
                    <span className="shrink-0 text-[10.5px] font-semibold text-slate-500">
                      {[e.start, e.end].filter(Boolean).join(' – ')}
                    </span>
                  </div>
                  <p className="italic text-slate-500">{e.role}</p>
                  <BulletList bullets={e.bullets} theme={theme} />
                </div>
              ))}
            </div>
          </Main>
        )}
        <ProjectsBlock data={data} theme={theme} S={Main} />
        <AchievementsBlock data={data} theme={theme} S={Main} />
        <ReferencesBlock data={data} theme={theme} S={Main} />
      </main>
    </div>
  )
}

/* ============================== GRAD SCHOOL ================================ */
/* Ref: "Business School Graduate" — serif name, competency grid              */
function GradSchoolTemplate({ data, theme }: TP) {
  const Rule: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 border-b border-slate-800 pb-1 text-[12.5px] font-bold uppercase tracking-[0.1em] text-slate-900">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="flex flex-col gap-5 p-10 text-[11.5px] text-slate-600">
      <header>
        <h1 className="font-serif text-[30px] font-bold tracking-tight text-slate-900">
          {data.fullName}
        </h1>
        {hasContact(data) && (
          <p className="mt-0.5 text-[11px] text-slate-500">
            {contactBits(data)
              .map((b) => b.text)
              .join('  ·  ')}
          </p>
        )}
      </header>

      {data.summary && (
        <Rule title={data.role || 'Profile'} theme={theme}>
          <p className="leading-relaxed">{data.summary}</p>
        </Rule>
      )}
      {data.skills.length > 0 && (
        <Rule title="Key Competencies" theme={theme}>
          <div className="grid grid-cols-3 gap-x-6 gap-y-1">
            {data.skills.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </Rule>
      )}
      {data.experience.length > 0 && (
        <Rule title="Professional Experience" theme={theme}>
          <div className="flex flex-col gap-4">
            {data.experience.map((e) => (
              <div key={e.id}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-bold text-slate-900">{e.company}</p>
                  <span className="shrink-0 text-[10.5px] font-semibold">
                    {[e.start, e.end].filter(Boolean).join(' – ')}
                  </span>
                </div>
                <p className="font-semibold italic text-slate-600">{e.role}</p>
                <BulletList bullets={e.bullets} theme={theme} />
              </div>
            ))}
          </div>
        </Rule>
      )}
      <div className="grid grid-cols-2 gap-6">
        <Rule title="Education & Certifications" theme={theme}>
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
            {data.certifications.map((c) => (
              <div key={c.id}>
                <p className="font-bold text-slate-900">{c.name}</p>
                <p>{[c.issuer, c.year].filter(Boolean).join(' · ')}</p>
              </div>
            ))}
          </div>
        </Rule>
        <Rule title="Extracurricular Activities" theme={theme}>
          <div className="flex flex-col gap-1.5">
            {data.achievements.filter(Boolean).map((a, i) => (
              <p key={i}>{a}</p>
            ))}
            {data.interests.filter(Boolean).length > 0 && (
              <p className="text-slate-500">
                {data.interests.filter(Boolean).join(' · ')}
              </p>
            )}
            {data.languages.length > 0 && (
              <p className="text-slate-500">
                Languages:{' '}
                {data.languages
                  .map((l) => (l.level ? `${l.name} (${l.level})` : l.name))
                  .join(', ')}
              </p>
            )}
          </div>
        </Rule>
      </div>
      <ProjectsBlock data={data} theme={theme} S={Rule} />
      <ReferencesBlock data={data} theme={theme} S={Rule} />
    </div>
  )
}

/* =============================== CHARCOAL ================================== */
/* Ref: "Minimalist CV Resume" — dark charcoal sidebar, references            */
function CharcoalTemplate({ data, theme }: TP) {
  const Main: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[13px] font-bold tracking-wide text-slate-900">
        {title}
        <span className="mt-1 block h-px w-full bg-slate-300" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="grid min-h-full grid-cols-[35%_1fr] text-[11.5px] text-slate-600">
      <aside className="flex flex-col gap-6 p-6 text-white" style={{ background: '#2e3438' }}>
        <Photo
          data={data}
          className="size-24 self-center rounded-full text-2xl"
          fallbackStyle={{ background: theme.accent }}
        />
        {hasContact(data) && (
          <div>
            <RailHead light>Contact</RailHead>
            <div className="flex flex-col gap-2 text-[11px] text-white/85">
              {contactBits(data).map((b, i) => (
                <SideBit key={i} icon={b.icon} text={b.text} />
              ))}
            </div>
          </div>
        )}
        {data.skills.length > 0 && (
          <div>
            <RailHead light>Expertise</RailHead>
            <ul className="flex flex-col gap-1.5 text-white/85">
              {data.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
        {data.languages.length > 0 && (
          <div>
            <RailHead light>Language</RailHead>
            <ul className="flex flex-col gap-1 text-white/85">
              {data.languages.map((l) => (
                <li key={l.id}>{l.name}</li>
              ))}
            </ul>
          </div>
        )}
        {data.achievements.filter(Boolean).length > 0 && (
          <div>
            <RailHead light>Awards</RailHead>
            <ul className="flex flex-col gap-2 text-[10.5px] text-white/80">
              {data.achievements.filter(Boolean).map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="flex flex-col gap-5 p-8">
        <header className="mb-1">
          <h1 className="text-[30px] font-light leading-tight text-slate-900">
            <span className="font-bold">{data.fullName.split(' ')[0]}</span>{' '}
            {data.fullName.split(' ').slice(1).join(' ')}
          </h1>
          <p className="text-[12.5px] tracking-wide text-slate-500">{data.role}</p>
        </header>
        {data.summary && <p className="leading-relaxed">{data.summary}</p>}
        {data.experience.length > 0 && (
          <Main title="Experience" theme={theme}>
            <div className="flex flex-col gap-4">
              {data.experience.map((e) => (
                <div key={e.id} className="grid grid-cols-[90px_1fr] gap-x-4">
                  <span className="text-[10.5px] text-slate-400">
                    {[e.start, e.end].filter(Boolean).join(' – ')}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{e.role}</p>
                    <p className="text-slate-500">{e.company}</p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                </div>
              ))}
            </div>
          </Main>
        )}
        {data.education.length > 0 && (
          <Main title="Education" theme={theme}>
            <div className="flex flex-col gap-3">
              {data.education.map((ed) => (
                <div key={ed.id} className="grid grid-cols-[90px_1fr] gap-x-4">
                  <span className="text-[10.5px] text-slate-400">
                    {[ed.start, ed.end].filter(Boolean).join(' – ')}
                  </span>
                  <div>
                    <p className="font-bold text-slate-900">{ed.degree}</p>
                    <p className="text-slate-500">{ed.school}</p>
                  </div>
                </div>
              ))}
            </div>
          </Main>
        )}
        <ProjectsBlock data={data} theme={theme} S={Main} />
        <ReferencesBlock data={data} theme={theme} S={Main} />
      </main>
    </div>
  )
}

/* =============================== BOUTIQUE ================================== */
/* Ref: "Gray and White Simple Professional Marketing" — spaced caps, rails   */
function BoutiqueTemplate({ data, theme }: TP) {
  const Left: SectionComp = ({ title, children }) => (
    <section className="border-l-2 pl-4" style={{ borderColor: theme.accent }}>
      <h2 className="mb-2 text-[11.5px] font-bold uppercase tracking-[0.25em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[11.5px] text-slate-600">
      <header className="mb-8">
        <h1 className="text-[30px] font-light uppercase leading-tight tracking-[0.2em] text-slate-900">
          {data.fullName}
        </h1>
        <p className="mt-1 text-[11px] uppercase tracking-[0.4em] text-slate-400">
          {data.role}
        </p>
      </header>

      <div className="grid grid-cols-[1fr_34%] gap-8">
        <div className="flex flex-col gap-6">
          {data.summary && (
            <Left title="Profile" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Left>
          )}
          {data.experience.length > 0 && (
            <Left title="Work Experience" theme={theme}>
              <div className="flex flex-col gap-4">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <p className="text-[10.5px] font-semibold text-slate-400">
                      {[e.start, e.end].filter(Boolean).join(' – ')}
                    </p>
                    <p className="font-bold text-slate-900">
                      {e.role}
                      {e.company && (
                        <span className="font-normal text-slate-500"> | {e.company}</span>
                      )}
                    </p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                ))}
              </div>
            </Left>
          )}
          <ProjectsBlock data={data} theme={theme} S={Left} />
          <ReferencesBlock data={data} theme={theme} S={Left} />
        </div>

        <div className="flex flex-col gap-6">
          {hasContact(data) && (
            <Left title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Left>
          )}
          {data.education.length > 0 && (
            <Left title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                    <p className="font-bold text-slate-900">{ed.school}</p>
                    <p>{ed.degree}</p>
                  </div>
                ))}
              </div>
            </Left>
          )}
          {data.skills.length > 0 && (
            <Left title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </Left>
          )}
          {data.languages.length > 0 && (
            <Left title="Languages" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.languages.map((l) => (
                  <li key={l.id}>
                    {l.name}
                    {l.level && <span className="text-slate-400"> ({l.level})</span>}
                  </li>
                ))}
              </ul>
            </Left>
          )}
        </div>
      </div>
    </div>
  )
}

/* ================================ REFINED ================================== */
/* Ref: "Gray and White Simple Clean Resume" — small-caps serif, top rule     */
function RefinedTemplate({ data, theme }: TP) {
  const Cap: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 font-serif text-[13px] font-semibold uppercase tracking-[0.15em] text-slate-800">
        {title}
        <span className="mt-1 block h-px w-10 bg-slate-800" />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[11.5px] text-slate-600">
      <div className="mb-6 h-1.5 w-full bg-slate-900" />
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-[28px] uppercase tracking-[0.1em] text-slate-900">
            {data.fullName.split(' ')[0]}{' '}
            <span className="font-bold">
              {data.fullName.split(' ').slice(1).join(' ')}
            </span>
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

      {data.summary && (
        <div className="mb-6 border-y border-slate-300 py-4 text-center">
          <h2 className="mb-1.5 font-serif text-[13px] font-semibold uppercase tracking-[0.3em] text-slate-800">
            Summary
          </h2>
          <p className="mx-auto max-w-[90%] leading-relaxed">{data.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-[38%_1fr] gap-8">
        <div className="flex flex-col gap-6">
          <EducationBlock data={data} theme={theme} S={Cap} />
          {data.skills.length > 0 && (
            <Cap title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-500" />
                    {s}
                  </li>
                ))}
              </ul>
            </Cap>
          )}
          <CertificationsBlock data={data} theme={theme} S={Cap} />
          <LanguagesBlock data={data} theme={theme} S={Cap} />
        </div>
        <div className="flex flex-col gap-6">
          <ExperienceBlock data={data} theme={theme} S={Cap} />
          <ProjectsBlock data={data} theme={theme} S={Cap} />
          <AchievementsBlock data={data} theme={theme} S={Cap} />
          <ReferencesBlock data={data} theme={theme} S={Cap} />
        </div>
      </div>
    </div>
  )
}

/* ================================ DUOTONE ================================== */
/* Ref: "White Simple Student CV" — two-tone bands, arrow bullets             */
function DuotoneTemplate({ data, theme }: TP) {
  const Arrow: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12.5px] font-bold uppercase tracking-wide text-slate-800">
        <span
          className="inline-block size-0 border-y-[5px] border-l-[7px] border-y-transparent"
          style={{ borderLeftColor: theme.accent }}
        />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <div className="h-16" style={{ background: theme.soft }} />
      <div className="grid min-h-full grid-cols-[36%_1fr]">
        <aside
          className="-mt-16 flex flex-col gap-6 p-6 pt-8 text-white"
          style={{ background: theme.accent }}
        >
          <Photo
            data={data}
            className="size-24 self-center rounded-full border-4 border-white/40 text-2xl"
            fallbackStyle={{ background: '#00000033' }}
          />
          {data.summary && (
            <div>
              <RailHead light>Profile</RailHead>
              <p className="leading-relaxed text-white/90">{data.summary}</p>
            </div>
          )}
          {hasContact(data) && (
            <div>
              <RailHead light>Contact Me</RailHead>
              <div className="flex flex-col gap-2 text-[11px] text-white/90">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </div>
          )}
          {data.skills.length > 0 && (
            <div>
              <RailHead light>Skills</RailHead>
              <ul className="flex flex-col gap-1 text-white/90">
                {data.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        <main className="flex flex-col gap-5 p-8">
          <header className="-mt-2 mb-1">
            <h1 className="text-[28px] font-bold leading-tight text-slate-900">
              {data.fullName}
            </h1>
            <p className="italic text-slate-500">{data.role}</p>
          </header>
          {data.education.length > 0 && (
            <Arrow title="Education" theme={theme}>
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
            </Arrow>
          )}
          {data.languages.length > 0 && (
            <Arrow title="Language" theme={theme}>
              <p>
                {data.languages
                  .map((l) => (l.level ? `${l.name} — ${l.level}` : l.name))
                  .join('. ')}
              </p>
            </Arrow>
          )}
          {data.experience.length > 0 && (
            <Arrow title="Work Experience" theme={theme}>
              <div className="flex flex-col gap-3.5">
                {data.experience.map((e) => (
                  <div key={e.id}>
                    <p className="font-bold uppercase text-slate-900">{e.company}</p>
                    <p className="text-slate-500">
                      {e.role}
                      {(e.start || e.end) &&
                        ` · ${[e.start, e.end].filter(Boolean).join(' – ')}`}
                    </p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                ))}
              </div>
            </Arrow>
          )}
          <ProjectsBlock data={data} theme={theme} S={Arrow} />
          <AchievementsBlock data={data} theme={theme} S={Arrow} />
          <ReferencesBlock data={data} theme={theme} S={Arrow} />
        </main>
      </div>
    </div>
  )
}

/* =============================== EDITORIAL ================================= */
/* Ref: "Professional Modern CV" (Laya) — wide-tracked name, thin rules       */
function EditorialTemplate({ data, theme }: TP) {
  const Thin: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-slate-800">
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="p-10 text-[11.5px] text-slate-600">
      <header className="mb-5">
        <h1 className="text-[26px] font-medium uppercase tracking-[0.3em] text-slate-900">
          {data.fullName}
        </h1>
        <p className="mt-1 text-[11px] uppercase tracking-[0.35em]" style={{ color: theme.accent }}>
          {data.role}
        </p>
      </header>
      <div className="mb-5 h-0.5 w-full bg-slate-900" />

      {data.summary && (
        <div className="mb-6">
          <Thin title="Career Summary" theme={theme}>
            <p className="leading-relaxed">{data.summary}</p>
          </Thin>
        </div>
      )}

      <div className="grid grid-cols-[36%_1fr] gap-8">
        <div className="flex flex-col gap-6">
          {hasContact(data) && (
            <Thin title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Thin>
          )}
          <EducationBlock data={data} theme={theme} S={Thin} />
          {data.skills.length > 0 && (
            <Thin title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-slate-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </Thin>
          )}
          <LanguagesBlock data={data} theme={theme} S={Thin} />
        </div>
        <div className="flex flex-col gap-6">
          {data.experience.length > 0 && (
            <Thin title="Work Experience" theme={theme}>
              <div className="flex flex-col gap-4">
                {data.experience.map((e) => (
                  <div key={e.id} className="border-b border-slate-200 pb-3 last:border-0">
                    <p className="font-bold text-slate-900">{e.role}</p>
                    <p className="text-[10.5px] uppercase tracking-wide text-slate-400">
                      {e.company}
                      {(e.start || e.end) &&
                        ` · ${[e.start, e.end].filter(Boolean).join(' – ')}`}
                    </p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                ))}
              </div>
            </Thin>
          )}
          <ProjectsBlock data={data} theme={theme} S={Thin} />
          <CertificationsBlock data={data} theme={theme} S={Thin} />
          <ReferencesBlock data={data} theme={theme} S={Thin} />
        </div>
      </div>
    </div>
  )
}

/* ================================= FACET =================================== */
/* Ref: "Modern Minimalist Professional CV" — big photo, angular accents      */
function FacetTemplate({ data, theme }: TP) {
  const Ico: SectionComp = ({ title, children }) => (
    <section>
      <h2 className="mb-2 flex items-center gap-2 text-[12.5px] font-bold text-slate-900">
        <span className="size-2 rotate-45" style={{ background: theme.accent }} />
        {title}
      </h2>
      {children}
    </section>
  )
  return (
    <div className="relative p-9 text-[11.5px] text-slate-600">
      {/* angular corner accents */}
      <div
        aria-hidden
        className="absolute right-0 top-0 h-24 w-56"
        style={{
          background: theme.soft,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute right-0 top-0 h-10 w-32"
        style={{
          background: theme.accent,
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        }}
      />
      <header className="relative mb-7 flex items-center gap-7">
        <Photo
          data={data}
          className="size-36 shrink-0 rounded-full border-8 text-4xl text-white"
          fallbackStyle={{ background: theme.accent, borderColor: theme.soft }}
        />
        <div>
          <h1 className="text-[30px] font-semibold leading-tight text-slate-900">
            {data.fullName}
          </h1>
          <p className="text-[13px] text-slate-500">{data.role}</p>
        </div>
      </header>

      <div className="relative grid grid-cols-[38%_1fr] gap-8">
        <div className="flex flex-col gap-6">
          {data.summary && (
            <Ico title="About Me" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Ico>
          )}
          {hasContact(data) && (
            <Ico title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Ico>
          )}
          {data.skills.length > 0 && (
            <Ico title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </Ico>
          )}
          <LanguagesBlock data={data} theme={theme} S={Ico} />
        </div>

        <div className="flex flex-col gap-6">
          {data.education.length > 0 && (
            <Ico title="Education" theme={theme}>
              <div
                className="ml-1 flex flex-col gap-3 border-l-2 pl-4"
                style={{ borderColor: theme.soft }}
              >
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
            </Ico>
          )}
          {data.experience.length > 0 && (
            <Ico title="Experience" theme={theme}>
              <div
                className="ml-1 flex flex-col gap-3 border-l-2 pl-4"
                style={{ borderColor: theme.soft }}
              >
                {data.experience.map((e) => (
                  <div key={e.id} className="relative">
                    <span
                      className="absolute -left-[23px] top-1 size-2.5 rounded-full"
                      style={{ background: theme.accent }}
                    />
                    <p className="text-[10.5px] text-slate-400">
                      ({[e.start, e.end].filter(Boolean).join(' – ')})
                    </p>
                    <p className="font-bold uppercase text-slate-900">{e.role}</p>
                    <p className="text-slate-500">{e.company}</p>
                    <BulletList bullets={e.bullets} theme={theme} />
                  </div>
                ))}
              </div>
            </Ico>
          )}
          <ProjectsBlock data={data} theme={theme} S={Ico} />
          <ReferencesBlock data={data} theme={theme} S={Ico} />
        </div>
      </div>
    </div>
  )
}

/* ================================ SKYLINE ================================== */
/* Ref: "Blue Simple Professional CV" (light) — soft corner band header       */
function SkylineTemplate({ data, theme }: TP) {
  const Sky: SectionComp = ({ title, children }) => (
    <section>
      <h2
        className="mb-2 text-[12px] font-bold uppercase tracking-[0.15em]"
        style={{ color: theme.accent }}
      >
        {title}
        <span className="mt-1 block h-px w-full" style={{ background: `${theme.accent}44` }} />
      </h2>
      {children}
    </section>
  )
  return (
    <div className="text-[11.5px] text-slate-600">
      <header
        className="relative overflow-hidden px-9 py-7"
        style={{ background: theme.soft }}
      >
        <div
          aria-hidden
          className="absolute -right-6 top-0 h-full w-40"
          style={{
            background: theme.accent,
            clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)',
            opacity: 0.25,
          }}
        />
        <h1 className="text-[28px] font-bold text-slate-900">{data.fullName}</h1>
        <p className="text-[13px] font-medium" style={{ color: theme.accent }}>
          {data.role}
        </p>
      </header>

      <div className="grid grid-cols-[34%_1fr] gap-7 p-9 pt-7">
        <div className="flex flex-col gap-6">
          {hasContact(data) && (
            <Sky title="Contact" theme={theme}>
              <div className="flex flex-col gap-1.5">
                {contactBits(data).map((b, i) => (
                  <SideBit key={i} icon={b.icon} text={b.text} />
                ))}
              </div>
            </Sky>
          )}
          {data.education.length > 0 && (
            <Sky title="Education" theme={theme}>
              <div className="flex flex-col gap-2.5">
                {data.education.map((ed) => (
                  <div key={ed.id}>
                    <p className="text-[10.5px] text-slate-400">
                      {[ed.start, ed.end].filter(Boolean).join(' – ')}
                    </p>
                    <p className="font-bold text-slate-900">{ed.school}</p>
                    <p>{ed.degree}</p>
                  </div>
                ))}
              </div>
            </Sky>
          )}
          {data.skills.length > 0 && (
            <Sky title="Skills" theme={theme}>
              <ul className="flex flex-col gap-1">
                {data.skills.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="size-1 rounded-full" style={{ background: theme.accent }} />
                    {s}
                  </li>
                ))}
              </ul>
            </Sky>
          )}
          {data.languages.length > 0 && (
            <Sky title="Languages" theme={theme}>
              <p>
                {data.languages
                  .map((l) => (l.level ? `${l.name}: ${l.level}` : l.name))
                  .join(' · ')}
              </p>
            </Sky>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {data.summary && (
            <Sky title="Profile Summary" theme={theme}>
              <p className="leading-relaxed">{data.summary}</p>
            </Sky>
          )}
          <ExperienceBlock data={data} theme={theme} S={Sky} />
          <ProjectsBlock data={data} theme={theme} S={Sky} />
          <AchievementsBlock data={data} theme={theme} S={Sky} />
          <ReferencesBlock data={data} theme={theme} S={Sky} />
        </div>
      </div>
    </div>
  )
}

export const TEMPLATES_A: Partial<Record<TemplateId, (p: TP) => React.ReactNode>> = {
  azure: AzureTemplate,
  meridian: MeridianTemplate,
  collegiate: CollegiateTemplate,
  ledger: LedgerTemplate,
  typewriter: TypewriterTemplate,
  pastel: PastelTemplate,
  onyx: OnyxTemplate,
  sage: SageTemplate,
  navy: NavyTemplate,
  gradschool: GradSchoolTemplate,
  charcoal: CharcoalTemplate,
  boutique: BoutiqueTemplate,
  refined: RefinedTemplate,
  duotone: DuotoneTemplate,
  editorial: EditorialTemplate,
  facet: FacetTemplate,
  skyline: SkylineTemplate,
}
