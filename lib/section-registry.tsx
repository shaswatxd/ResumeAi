'use client'

import type {
  AccentTheme,
  BuiltinSectionId,
  DesignSettings,
  ResumeData,
  SectionId,
} from '@/lib/resume-types'
import { isSectionVisible } from '@/lib/resume-types'
import {
  AchievementsBlock,
  CertificationsBlock,
  CustomSectionBlock,
  EducationBlock,
  ExperienceBlock,
  InterestsBlock,
  LanguagesBlock,
  ProjectsBlock,
  ReferencesBlock,
  SkillChips,
  type SectionComp,
} from '@/components/resume/blocks'
import { EditableText } from '@/components/resume/editable'
import { useResumeEdit } from '@/components/resume/resume-context'

export const BUILTIN_LABELS: Record<BuiltinSectionId, string> = {
  summary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  languages: 'Languages',
  achievements: 'Achievements',
  interests: 'Interests',
  references: 'References',
}

function SummaryBlock({
  data,
  theme,
  S,
}: {
  data: ResumeData
  theme: AccentTheme
  S: SectionComp
}) {
  const { update, isEditable } = useResumeEdit()
  if (!data.summary && !isEditable) return null
  return (
    <S title="Summary" theme={theme}>
      <EditableText
        as="p"
        className="text-slate-600"
        value={data.summary}
        placeholder="A two-to-three sentence summary of your experience…"
        multiline
        onChange={(v) => update((d) => ({ ...d, summary: v }))}
      />
    </S>
  )
}

function SkillsSection({
  data,
  theme,
  S,
}: {
  data: ResumeData
  theme: AccentTheme
  S: SectionComp
}) {
  const { isEditable } = useResumeEdit()
  if (data.skills.length === 0 && !isEditable) return null
  return (
    <S title="Skills" theme={theme}>
      <SkillChips data={data} theme={theme} />
    </S>
  )
}

/*
 * Renders every visible section from design.sectionOrder using a given
 * section "chrome" component (Section / ClassicSection / MinimalSection…).
 * This is what makes drag-reorder, show/hide and custom sections work
 * uniformly across every template — templates iterate this instead of
 * hardcoding a fixed <ExperienceBlock/><EducationBlock/>… sequence.
 */
export function SectionList({
  data,
  theme,
  design,
  S,
  skip,
  only,
}: {
  data: ResumeData
  theme: AccentTheme
  design: DesignSettings
  S: SectionComp
  /** section ids already rendered elsewhere in the template (e.g. a sidebar) */
  skip?: SectionId[]
  /** render only these ids (for split-column layouts), still in sectionOrder */
  only?: SectionId[]
}) {
  return (
    <>
      {design.sectionOrder
        .filter((id) => isSectionVisible(design, id) && !skip?.includes(id) && (!only || only.includes(id)))
        .map((id) => {
          if (id.startsWith('custom:')) {
            const section = data.customSections.find((s) => `custom:${s.id}` === id)
            if (!section) return null
            return <CustomSectionBlock key={id} section={section} theme={theme} S={S} />
          }
          switch (id as BuiltinSectionId) {
            case 'summary':
              return <SummaryBlock key={id} data={data} theme={theme} S={S} />
            case 'experience':
              return <ExperienceBlock key={id} data={data} theme={theme} S={S} />
            case 'education':
              return <EducationBlock key={id} data={data} theme={theme} S={S} />
            case 'skills':
              return <SkillsSection key={id} data={data} theme={theme} S={S} />
            case 'projects':
              return <ProjectsBlock key={id} data={data} theme={theme} S={S} />
            case 'certifications':
              return <CertificationsBlock key={id} data={data} theme={theme} S={S} />
            case 'languages':
              return <LanguagesBlock key={id} data={data} theme={theme} S={S} />
            case 'achievements':
              return <AchievementsBlock key={id} data={data} theme={theme} S={S} />
            case 'interests':
              return <InterestsBlock key={id} data={data} theme={theme} S={S} />
            case 'references':
              return <ReferencesBlock key={id} data={data} theme={theme} S={S} />
            default:
              return null
          }
        })}
    </>
  )
}

/* All section ids currently addressable, builtin + custom, in a stable
 * label list — used by the design panel's reorder/visibility list. */
export function allSectionEntries(data: ResumeData): { id: SectionId; label: string }[] {
  return [
    ...(Object.keys(BUILTIN_LABELS) as BuiltinSectionId[]).map((id) => ({
      id,
      label: BUILTIN_LABELS[id],
    })),
    ...data.customSections.map((s) => ({
      id: `custom:${s.id}` as SectionId,
      label: s.title || 'Custom Section',
    })),
  ]
}
