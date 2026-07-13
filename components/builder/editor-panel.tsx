'use client'

import { useState } from 'react'
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Layers,
  Plus,
  Trash2,
  Upload,
  Sparkles,
  X,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import { uid, type ResumeData } from '@/lib/resume-types'

type TabId =
  | 'personal'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'more'

const TABS: { id: TabId; label: string; icon: typeof User }[] = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'more', label: 'More', icon: Layers },
]

type Props = {
  data: ResumeData
  onChange: (updater: (prev: ResumeData) => ResumeData) => void
}

export function EditorPanel({ data, onChange }: Props) {
  const [tab, setTab] = useState<TabId>('personal')

  const set = <K extends keyof ResumeData>(key: K, value: ResumeData[K]) =>
    onChange((prev) => ({ ...prev, [key]: value }))

  const tabIndex = TABS.findIndex((t) => t.id === tab)

  return (
    <div className="flex h-full flex-col">
      {/* Tabs */}
      <div className="scroll-thin flex gap-1 overflow-x-auto border-b border-border px-4 pt-1">
        {TABS.map((t) => {
          const active = t.id === tab
          const Icon = t.icon
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'relative flex shrink-0 items-center gap-1.5 px-3 py-3 text-sm font-medium transition-colors',
                active
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon className="size-4" />
              <span className="hidden lg:inline">{t.label}</span>
              {active && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary" />
              )}
            </button>
          )
        })}
      </div>

      {/* Scrollable body */}
      <div className="scroll-thin flex-1 overflow-y-auto px-5 py-6">
        {tab === 'personal' && <PersonalTab data={data} set={set} />}
        {tab === 'experience' && <ExperienceTab data={data} onChange={onChange} />}
        {tab === 'education' && <EducationTab data={data} onChange={onChange} />}
        {tab === 'skills' && <SkillsTab data={data} set={set} />}
        {tab === 'projects' && <ProjectsTab data={data} onChange={onChange} />}
        {tab === 'more' && <MoreTab data={data} onChange={onChange} set={set} />}
      </div>

      {/* Footer nav */}
      <div className="flex items-center justify-between gap-3 border-t border-border p-4">
        <Button
          variant="ghost"
          size="lg"
          className="h-11 px-4"
          disabled={tabIndex === 0}
          onClick={() => setTab(TABS[Math.max(0, tabIndex - 1)].id)}
        >
          <ArrowLeft className="size-4" /> Back
        </Button>
        <Button
          size="lg"
          className="h-11 flex-1 px-4"
          disabled={tabIndex === TABS.length - 1}
          onClick={() =>
            setTab(TABS[Math.min(TABS.length - 1, tabIndex + 1)].id)
          }
        >
          Next: {TABS[Math.min(TABS.length - 1, tabIndex + 1)].label}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  )
}

/* ------------------------------- Personal --------------------------------- */
function PersonalTab({
  data,
  set,
}: {
  data: ResumeData
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
}) {
  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => set('photo', String(reader.result))
    reader.readAsDataURL(file)
  }

  const generateSummary = async () => {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'summary',
        context: {
          name: data.fullName,
          role: data.role,
          skills: data.skills,
          summary: data.summary,
          experience: data.experience.map((e) => ({
            role: e.role,
            company: e.company,
            bullets: e.bullets,
          })),
        },
      }),
    })
    const json = await res.json()
    if (json.text) set('summary', json.text)
    else throw new Error(json.error ?? 'failed')
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Profile photo (optional)</Label>
        <div className="flex items-center gap-4">
          <div className="flex size-16 items-center justify-center overflow-hidden rounded-full border border-border bg-secondary/50 text-muted-foreground">
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.photo || '/placeholder.svg'}
                alt="Profile"
                className="size-full object-cover"
              />
            ) : (
              <User className="size-6" />
            )}
          </div>
          <div className="flex gap-2">
            <label className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-secondary/50 px-3 text-sm font-medium transition-colors hover:bg-secondary">
              <Upload className="size-4" /> Upload
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onPhoto}
              />
            </label>
            {data.photo && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9"
                onClick={() => set('photo', '')}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Rahul Sharma"
            value={data.fullName}
            onChange={(e) => set('fullName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="role">Target role</Label>
          <Input
            id="role"
            placeholder="Full Stack Developer"
            value={data.role}
            onChange={(e) => set('role', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="rahul@email.com"
            value={data.email}
            onChange={(e) => set('email', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={(e) => set('phone', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Mumbai, India"
            value={data.location}
            onChange={(e) => set('location', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/rahul"
            value={data.linkedin}
            onChange={(e) => set('linkedin', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="github">GitHub (optional)</Label>
          <Input
            id="github"
            placeholder="github.com/rahul"
            value={data.github}
            onChange={(e) => set('github', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="website">Website (optional)</Label>
          <Input
            id="website"
            placeholder="rahul.dev"
            value={data.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <Label className="mb-0">Professional summary</Label>
          <AiGenerateButton onGenerate={generateSummary} />
        </div>
        <Textarea
          className="min-h-[120px]"
          placeholder="Write a compelling 3-4 sentence professional summary..."
          value={data.summary}
          onChange={(e) => set('summary', e.target.value)}
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Tip: fill in your role and skills first — AI uses them to write a
          sharper summary.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------ Experience -------------------------------- */
function ExperienceTab({
  data,
  onChange,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      experience: [
        ...p.experience,
        { id: uid('exp'), role: '', company: '', start: '', end: '', bullets: [''] },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['experience'][number]>) =>
    onChange((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, experience: p.experience.filter((e) => e.id !== id) }))

  const improveBullets = async (exp: ResumeData['experience'][number]) => {
    const res = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'bullets',
        context: {
          role: exp.role,
          company: exp.company,
          bullets: exp.bullets.filter((b) => b.trim()),
        },
      }),
    })
    const json = await res.json()
    if (json.bullets?.length) update(exp.id, { bullets: json.bullets })
    else throw new Error(json.error ?? 'failed')
  }

  return (
    <div className="flex flex-col gap-4">
      {data.experience.length === 0 && (
        <EmptyState
          icon={Briefcase}
          text="No work experience yet. Add your first role to get started."
        />
      )}

      {data.experience.map((exp, idx) => (
        <div
          key={exp.id}
          className="rounded-xl border border-border bg-secondary/25 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Role {idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(exp.id)}
              aria-label="Remove role"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Job title</Label>
              <Input
                value={exp.role}
                placeholder="Senior Software Engineer"
                onChange={(e) => update(exp.id, { role: e.target.value })}
              />
            </div>
            <div>
              <Label>Company</Label>
              <Input
                value={exp.company}
                placeholder="Acme Inc."
                onChange={(e) => update(exp.id, { company: e.target.value })}
              />
            </div>
            <div>
              <Label>Start</Label>
              <Input
                value={exp.start}
                placeholder="Jan 2022"
                onChange={(e) => update(exp.id, { start: e.target.value })}
              />
            </div>
            <div>
              <Label>End</Label>
              <Input
                value={exp.end}
                placeholder="Present"
                onChange={(e) => update(exp.id, { end: e.target.value })}
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <Label className="mb-0">Highlights</Label>
              <AiGenerateButton
                label="AI Improve"
                onGenerate={() => improveBullets(exp)}
              />
            </div>
            <BulletEditor
              bullets={exp.bullets}
              onChange={(bullets) => update(exp.id, { bullets })}
            />
          </div>
        </div>
      ))}

      <Button variant="outline" className="h-11" onClick={add}>
        <Plus className="size-4" /> Add role
      </Button>
    </div>
  )
}

function BulletEditor({
  bullets,
  onChange,
}: {
  bullets: string[]
  onChange: (b: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {bullets.map((b, i) => (
        <div key={i} className="flex items-start gap-2">
          <Textarea
            className="min-h-[52px]"
            value={b}
            placeholder="Describe an achievement with impact..."
            onChange={(e) =>
              onChange(bullets.map((x, xi) => (xi === i ? e.target.value : x)))
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="mt-0.5 shrink-0"
            aria-label="Remove highlight"
            onClick={() => onChange(bullets.filter((_, xi) => xi !== i))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="self-start"
        onClick={() => onChange([...bullets, ''])}
      >
        <Plus className="size-3.5" /> Add highlight
      </Button>
    </div>
  )
}

/* ------------------------------- Education -------------------------------- */
function EducationTab({
  data,
  onChange,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      education: [
        ...p.education,
        { id: uid('edu'), degree: '', school: '', start: '', end: '', detail: '' },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['education'][number]>) =>
    onChange((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, education: p.education.filter((e) => e.id !== id) }))

  return (
    <div className="flex flex-col gap-4">
      {data.education.length === 0 && (
        <EmptyState
          icon={GraduationCap}
          text="Add your degrees, certifications, or courses."
        />
      )}
      {data.education.map((ed, idx) => (
        <div key={ed.id} className="rounded-xl border border-border bg-secondary/25 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Entry {idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(ed.id)}
              aria-label="Remove education"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label>Degree / Program</Label>
              <Input
                value={ed.degree}
                placeholder="B.Tech, Computer Science"
                onChange={(e) => update(ed.id, { degree: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>School</Label>
              <Input
                value={ed.school}
                placeholder="University name"
                onChange={(e) => update(ed.id, { school: e.target.value })}
              />
            </div>
            <div>
              <Label>Start</Label>
              <Input
                value={ed.start}
                placeholder="2015"
                onChange={(e) => update(ed.id, { start: e.target.value })}
              />
            </div>
            <div>
              <Label>End</Label>
              <Input
                value={ed.end}
                placeholder="2019"
                onChange={(e) => update(ed.id, { end: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Detail (optional)</Label>
              <Input
                value={ed.detail}
                placeholder="GPA, honors, activities..."
                onChange={(e) => update(ed.id, { detail: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="h-11" onClick={add}>
        <Plus className="size-4" /> Add education
      </Button>
    </div>
  )
}

/* --------------------------------- Skills --------------------------------- */
function SkillsTab({
  data,
  set,
}: {
  data: ResumeData
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
}) {
  const [draft, setDraft] = useState('')
  const [suggesting, setSuggesting] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])

  const addSkill = (value: string) => {
    const v = value.trim()
    if (!v) return
    if (!data.skills.includes(v)) set('skills', [...data.skills, v])
  }

  const suggestSkills = async () => {
    setSuggesting(true)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'skills',
          context: {
            role: data.role,
            skills: data.skills,
            summary: data.summary,
          },
        }),
      })
      const json = await res.json()
      if (json.skills?.length) {
        setSuggestions(
          (json.skills as string[]).filter((s) => !data.skills.includes(s)),
        )
      }
    } finally {
      setSuggesting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Label>Add a skill</Label>
        <div className="flex gap-2">
          <Input
            value={draft}
            placeholder="e.g. TypeScript"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                e.preventDefault()
                addSkill(draft)
                setDraft('')
              }
            }}
          />
          <Button
            className="h-11 px-4"
            onClick={() => {
              addSkill(draft)
              setDraft('')
            }}
          >
            <Plus className="size-4" /> Add
          </Button>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Press Enter to add quickly.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your skills
        </span>
        <button
          onClick={suggestSkills}
          disabled={suggesting}
          className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-60"
        >
          <Sparkles className={cn('size-3.5', suggesting && 'animate-pulse')} />
          {suggesting ? 'Thinking…' : 'AI Suggest'}
        </button>
      </div>

      {data.skills.length === 0 ? (
        <EmptyState icon={Wrench} text="Add the skills that best describe you." />
      ) : (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/50 py-1.5 pl-3 pr-2 text-sm"
            >
              {s}
              <button
                onClick={() =>
                  set(
                    'skills',
                    data.skills.filter((x) => x !== s),
                  )
                }
                className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                aria-label={`Remove ${s}`}
              >
                <X className="size-3.5" />
              </button>
            </span>
          ))}
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI suggestions — tap to add
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => {
                  addSkill(s)
                  setSuggestions((prev) => prev.filter((x) => x !== s))
                }}
                className="inline-flex items-center gap-1 rounded-lg border border-primary/40 bg-primary/10 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary/20"
              >
                <Plus className="size-3.5" />
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* -------------------------------- Projects --------------------------------- */
function ProjectsTab({
  data,
  onChange,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
}) {
  const add = () =>
    onChange((p) => ({
      ...p,
      projects: [
        ...p.projects,
        { id: uid('prj'), name: '', link: '', tech: '', description: '' },
      ],
    }))

  const update = (id: string, patch: Partial<ResumeData['projects'][number]>) =>
    onChange((p) => ({
      ...p,
      projects: p.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }))

  const remove = (id: string) =>
    onChange((p) => ({ ...p, projects: p.projects.filter((x) => x.id !== id) }))

  return (
    <div className="flex flex-col gap-4">
      {data.projects.length === 0 && (
        <EmptyState
          icon={FolderGit2}
          text="Showcase side projects, open source, or portfolio work."
        />
      )}
      {data.projects.map((prj, idx) => (
        <div key={prj.id} className="rounded-xl border border-border bg-secondary/25 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Project {idx + 1}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => remove(prj.id)}
              aria-label="Remove project"
            >
              <Trash2 className="size-4 text-destructive" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label>Name</Label>
              <Input
                value={prj.name}
                placeholder="OpenLedger"
                onChange={(e) => update(prj.id, { name: e.target.value })}
              />
            </div>
            <div>
              <Label>Link (optional)</Label>
              <Input
                value={prj.link}
                placeholder="github.com/you/project"
                onChange={(e) => update(prj.id, { link: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Tech stack (optional)</Label>
              <Input
                value={prj.tech}
                placeholder="Next.js, PostgreSQL, Redis"
                onChange={(e) => update(prj.id, { tech: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <Label>Description</Label>
              <Textarea
                className="min-h-[64px]"
                value={prj.description}
                placeholder="One or two lines: what it does + impact (users, stars, revenue)..."
                onChange={(e) => update(prj.id, { description: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="outline" className="h-11" onClick={add}>
        <Plus className="size-4" /> Add project
      </Button>
    </div>
  )
}

/* ---------------------------------- More ----------------------------------- */
function MoreTab({
  data,
  onChange,
  set,
}: {
  data: ResumeData
  onChange: (u: (p: ResumeData) => ResumeData) => void
  set: <K extends keyof ResumeData>(k: K, v: ResumeData[K]) => void
}) {
  const addCert = () =>
    onChange((p) => ({
      ...p,
      certifications: [
        ...p.certifications,
        { id: uid('cert'), name: '', issuer: '', year: '' },
      ],
    }))
  const updateCert = (
    id: string,
    patch: Partial<ResumeData['certifications'][number]>,
  ) =>
    onChange((p) => ({
      ...p,
      certifications: p.certifications.map((x) =>
        x.id === id ? { ...x, ...patch } : x,
      ),
    }))
  const removeCert = (id: string) =>
    onChange((p) => ({
      ...p,
      certifications: p.certifications.filter((x) => x.id !== id),
    }))

  const addLang = () =>
    onChange((p) => ({
      ...p,
      languages: [...p.languages, { id: uid('lang'), name: '', level: '' }],
    }))
  const updateLang = (
    id: string,
    patch: Partial<ResumeData['languages'][number]>,
  ) =>
    onChange((p) => ({
      ...p,
      languages: p.languages.map((x) => (x.id === id ? { ...x, ...patch } : x)),
    }))
  const removeLang = (id: string) =>
    onChange((p) => ({
      ...p,
      languages: p.languages.filter((x) => x.id !== id),
    }))

  return (
    <div className="flex flex-col gap-8">
      {/* Certifications */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">Certifications</h3>
        <div className="flex flex-col gap-3">
          {data.certifications.map((c) => (
            <div
              key={c.id}
              className="rounded-xl border border-border bg-secondary/25 p-3"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_80px_auto]">
                <Input
                  value={c.name}
                  placeholder="AWS Solutions Architect"
                  onChange={(e) => updateCert(c.id, { name: e.target.value })}
                />
                <Input
                  value={c.issuer}
                  placeholder="Issuer"
                  onChange={(e) => updateCert(c.id, { issuer: e.target.value })}
                />
                <Input
                  value={c.year}
                  placeholder="2024"
                  onChange={(e) => updateCert(c.id, { year: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="justify-self-end"
                  onClick={() => removeCert(c.id)}
                  aria-label="Remove certification"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="h-10" onClick={addCert}>
            <Plus className="size-4" /> Add certification
          </Button>
        </div>
      </section>

      {/* Languages */}
      <section>
        <h3 className="mb-3 text-sm font-semibold">Languages</h3>
        <div className="flex flex-col gap-3">
          {data.languages.map((l) => (
            <div
              key={l.id}
              className="rounded-xl border border-border bg-secondary/25 p-3"
            >
              <div className="grid grid-cols-[1fr_1fr_auto] gap-2">
                <Input
                  value={l.name}
                  placeholder="English"
                  onChange={(e) => updateLang(l.id, { name: e.target.value })}
                />
                <Input
                  value={l.level}
                  placeholder="Fluent / Native / B2"
                  onChange={(e) => updateLang(l.id, { level: e.target.value })}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLang(l.id)}
                  aria-label="Remove language"
                >
                  <Trash2 className="size-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
          <Button variant="outline" className="h-10" onClick={addLang}>
            <Plus className="size-4" /> Add language
          </Button>
        </div>
      </section>

      {/* Achievements */}
      <section>
        <h3 className="mb-1 text-sm font-semibold">Achievements & awards</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Hackathon wins, talks, publications, rankings — one per line.
        </p>
        <StringListEditor
          items={data.achievements}
          placeholder="Winner, Smart India Hackathon 2024"
          onChange={(items) => set('achievements', items)}
        />
      </section>

      {/* Interests */}
      <section>
        <h3 className="mb-1 text-sm font-semibold">Interests</h3>
        <p className="mb-3 text-xs text-muted-foreground">
          Optional — shows personality. Keep it short.
        </p>
        <StringListEditor
          items={data.interests}
          placeholder="Open source"
          onChange={(items) => set('interests', items)}
        />
      </section>
    </div>
  )
}

function StringListEditor({
  items,
  placeholder,
  onChange,
}: {
  items: string[]
  placeholder: string
  onChange: (items: string[]) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(e) =>
              onChange(items.map((x, xi) => (xi === i ? e.target.value : x)))
            }
          />
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            aria-label="Remove item"
            onClick={() => onChange(items.filter((_, xi) => xi !== i))}
          >
            <X className="size-4" />
          </Button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        className="self-start"
        onClick={() => onChange([...items, ''])}
      >
        <Plus className="size-3.5" /> Add item
      </Button>
    </div>
  )
}

/* -------------------------------- shared ---------------------------------- */
function EmptyState({ icon: Icon, text }: { icon: typeof User; text: string }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-secondary/20 px-6 py-10 text-center">
      <Icon className="size-6 text-muted-foreground" />
      <p className="max-w-xs text-sm text-muted-foreground">{text}</p>
    </div>
  )
}

function AiGenerateButton({
  onGenerate,
  label = 'AI Generate',
}: {
  onGenerate: () => Promise<void>
  label?: string
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const run = async () => {
    setLoading(true)
    setError(false)
    try {
      await onGenerate()
    } catch {
      setError(true)
      setTimeout(() => setError(false), 2500)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={run}
      disabled={loading}
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition-colors disabled:opacity-60',
        error
          ? 'border-destructive/40 bg-destructive/10 text-destructive'
          : 'border-primary/40 bg-primary/10 text-primary hover:bg-primary/20',
      )}
    >
      <Sparkles className={cn('size-3.5', loading && 'animate-pulse')} />
      {loading ? 'Writing…' : error ? 'Failed — retry' : label}
    </button>
  )
}
