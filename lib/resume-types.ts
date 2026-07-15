export type ExperienceItem = {
  id: string
  role: string
  company: string
  start: string
  end: string
  bullets: string[]
}

export type EducationItem = {
  id: string
  degree: string
  school: string
  start: string
  end: string
  detail: string
}

export type ProjectItem = {
  id: string
  name: string
  link: string
  tech: string
  description: string
}

export type CertificationItem = {
  id: string
  name: string
  issuer: string
  year: string
}

export type LanguageItem = {
  id: string
  name: string
  level: string
}

export type ReferenceItem = {
  id: string
  name: string
  title: string
  phone: string
  email: string
}

export type CustomSectionItem = {
  id: string
  heading: string
  subheading: string
  date: string
  description: string
}

export type CustomSection = {
  id: string
  title: string
  items: CustomSectionItem[]
}

export type ResumeData = {
  fullName: string
  role: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  website: string
  photo: string
  summary: string
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  projects: ProjectItem[]
  certifications: CertificationItem[]
  languages: LanguageItem[]
  achievements: string[]
  interests: string[]
  references: ReferenceItem[]
  customSections: CustomSection[]
}

/* ------------------------------ templates ------------------------------ */

export type TemplateId =
  | 'ats-pro'
  | 'modern'
  | 'corporate'
  | 'minimal'
  | 'elegant'
  | 'executive'
  | 'creative'
  | 'designer'
  | 'developer'
  | 'student'
  | 'fresher'
  | 'business'
  | 'marketing'
  | 'dark-theme'
  | 'two-column'
  | 'single-column'
  | 'compact'
  | 'luxury'
  | 'classic'
  | 'international'

export type Template = {
  id: TemplateId
  name: string
  description: string
  category: string
  tag?: string
}

export const TEMPLATES: Template[] = [
  { id: 'ats-pro', name: 'ATS Pro', category: 'ATS Professional', description: 'Pure single-column, parser-safe, zero graphics', tag: 'ATS' },
  { id: 'modern', name: 'Modern Edge', category: 'Modern', description: 'Crisp geometric header with accent underline' },
  { id: 'corporate', name: 'Corporate Suite', category: 'Corporate', description: 'Structured two-tone header, boardroom-ready' },
  { id: 'minimal', name: 'Pure Minimal', category: 'Minimal', description: 'Generous whitespace, quiet typography', tag: 'ATS' },
  { id: 'elegant', name: 'Elegant Serif', category: 'Elegant', description: 'Centered serif name, thin hairline rules' },
  { id: 'executive', name: 'Executive Summit', category: 'Executive', description: 'Refined serif for senior leadership roles' },
  { id: 'creative', name: 'Creative Burst', category: 'Creative', description: 'Bold color block header, playful accents' },
  { id: 'designer', name: 'Designer Grid', category: 'Designer', description: 'Portfolio-style grid with photo showcase' },
  { id: 'developer', name: 'Dev Terminal', category: 'Developer', description: 'Monospace, terminal-inspired dev layout', tag: 'Dev' },
  { id: 'student', name: 'Student Rise', category: 'Student', description: 'Education-first layout for students' },
  { id: 'fresher', name: 'Fresh Start', category: 'Fresher', description: 'Approachable layout for first jobs' },
  { id: 'business', name: 'Business Slate', category: 'Business', description: 'Slate sidebar, confident business tone' },
  { id: 'marketing', name: 'Marketing Pulse', category: 'Marketing', description: 'Punchy stats-forward marketing layout' },
  { id: 'dark-theme', name: 'Midnight Pro', category: 'Dark Theme', description: 'Deep dark paper with glowing accent', tag: 'New' },
  { id: 'two-column', name: 'Dual Column', category: 'Two Column', description: 'Balanced two-column with accent rail' },
  { id: 'single-column', name: 'Streamline', category: 'Single Column', description: 'Clean single flowing column', tag: 'ATS' },
  { id: 'compact', name: 'Compact Fit', category: 'Compact', description: 'Dense layout, fits more on one page', tag: 'ATS' },
  { id: 'luxury', name: 'Luxury Gold', category: 'Luxury', description: 'Deep tones with a gold hairline accent' },
  { id: 'classic', name: 'Classic Heritage', category: 'Classic', description: 'Timeless serif, ATS-friendly', tag: 'ATS' },
  { id: 'international', name: 'Global Standard', category: 'International', description: 'Neutral Europass-style, photo-friendly' },
]

export const TEMPLATE_CATEGORIES: string[] = Array.from(
  new Set(TEMPLATES.map((t) => t.category)),
)

/* -------------------------------- colors -------------------------------- */

export type ThemeId =
  | 'blue'
  | 'purple'
  | 'green'
  | 'red'
  | 'orange'
  | 'black'
  | 'gray'
  | 'navy'
  | 'emerald'
  | 'royal'

export type AccentTheme = {
  id: ThemeId
  name: string
  /* hex used inside the (light) resume paper */
  accent: string
  soft: string
}

export const THEMES: AccentTheme[] = [
  { id: 'blue', name: 'Blue', accent: '#2563eb', soft: '#e6efff' },
  { id: 'purple', name: 'Purple', accent: '#7c3aed', soft: '#efe8fe' },
  { id: 'green', name: 'Green', accent: '#16a34a', soft: '#e4f7ea' },
  { id: 'red', name: 'Red', accent: '#dc2626', soft: '#fce8e8' },
  { id: 'orange', name: 'Orange', accent: '#ea580c', soft: '#feead9' },
  { id: 'black', name: 'Black', accent: '#18181b', soft: '#efeff0' },
  { id: 'gray', name: 'Gray', accent: '#475569', soft: '#eef1f5' },
  { id: 'navy', name: 'Navy', accent: '#1e3a8a', soft: '#e5eafc' },
  { id: 'emerald', name: 'Emerald', accent: '#0f9d76', soft: '#e2f6ef' },
  { id: 'royal', name: 'Royal', accent: '#4338ca', soft: '#e8e7fb' },
]

/* ------------------------------- sections ------------------------------- */

export type BuiltinSectionId =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'achievements'
  | 'interests'
  | 'references'

export type SectionId = BuiltinSectionId | `custom:${string}`

export type SectionVisibility = Partial<Record<SectionId, boolean>>

export const DEFAULT_SECTION_ORDER: SectionId[] = [
  'summary',
  'experience',
  'education',
  'projects',
  'skills',
  'certifications',
  'languages',
  'achievements',
  'interests',
  'references',
]

/* ------------------------------- design -------------------------------- */

export type FontId =
  | 'inter'
  | 'poppins'
  | 'roboto'
  | 'lato'
  | 'montserrat'
  | 'nunito'
  | 'openSans'
  | 'playfair'
  | 'merriweather'
  | 'raleway'

export type SizeScale = 'sm' | 'md' | 'lg'
export type Density = 'compact' | 'normal' | 'relaxed'

export type DesignSettings = {
  fontFamily: FontId
  fontSize: SizeScale
  headingScale: SizeScale
  accentColor: string
  backgroundColor: string
  sectionSpacing: Density
  lineHeight: Density
  pageMargin: 'narrow' | 'normal' | 'wide'
  borderRadius: 'none' | 'soft' | 'rounded'
  photoShape: 'circle' | 'rounded' | 'square'
  iconStyle: 'outline' | 'filled' | 'none'
  dividerStyle: 'line' | 'dashed' | 'dotted' | 'none'
  sectionVisibility: SectionVisibility
  sectionOrder: SectionId[]
  pageSize: 'a4' | 'letter'
  colorMode: 'light' | 'dark'
}

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  fontFamily: 'inter',
  fontSize: 'md',
  headingScale: 'md',
  accentColor: THEMES[0].accent,
  backgroundColor: '#ffffff',
  sectionSpacing: 'normal',
  lineHeight: 'normal',
  pageMargin: 'normal',
  borderRadius: 'soft',
  photoShape: 'circle',
  iconStyle: 'outline',
  dividerStyle: 'line',
  sectionVisibility: {},
  sectionOrder: DEFAULT_SECTION_ORDER,
  pageSize: 'a4',
  colorMode: 'light',
}

export function isSectionVisible(design: DesignSettings, id: SectionId) {
  return design.sectionVisibility[id] !== false
}

/* -------------------------------- data ---------------------------------- */

export const SAMPLE_DATA: ResumeData = {
  fullName: 'Aarav Mehta',
  role: 'Senior Full-Stack Developer',
  email: 'aarav.mehta@gmail.com',
  phone: '+91 98765 43210',
  location: 'Bengaluru, India',
  linkedin: 'linkedin.com/in/aaravmehta',
  github: 'github.com/aaravmehta',
  website: 'aarav.dev',
  photo: '',
  summary:
    'Full-stack developer with 6+ years of experience building scalable web products for fintech and SaaS companies. Led a 5-engineer team that shipped a payments platform processing 2M+ transactions daily. Passionate about clean architecture, developer experience, and measurable business impact.',
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Software Engineer',
      company: 'Razorpay',
      start: 'Mar 2022',
      end: 'Present',
      bullets: [
        'Architected a real-time payment reconciliation service handling 2M+ transactions daily, cutting settlement disputes by 38%',
        'Led migration of 14 legacy services to Kubernetes, reducing infra costs by 27% and deploy time from 40 to 6 minutes',
        'Mentored 4 junior engineers and introduced RFC-driven design reviews adopted org-wide',
      ],
    },
    {
      id: 'exp-2',
      role: 'Software Engineer',
      company: 'Swiggy',
      start: 'Jun 2019',
      end: 'Feb 2022',
      bullets: [
        'Built the restaurant onboarding portal in React and Node.js, onboarding 12,000+ partners in the first year',
        'Optimized order-tracking APIs, dropping p95 latency from 900ms to 210ms',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.Tech, Computer Science',
      school: 'National Institute of Technology, Trichy',
      start: '2015',
      end: '2019',
      detail: 'GPA 8.7/10 · Head of the coding club',
    },
  ],
  skills: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'PostgreSQL',
    'AWS',
    'Docker',
    'Kubernetes',
    'GraphQL',
    'System Design',
  ],
  projects: [
    {
      id: 'prj-1',
      name: 'OpenLedger',
      link: 'github.com/aaravmehta/openledger',
      tech: 'Go, PostgreSQL, Kafka',
      description:
        'Open-source double-entry ledger library used by 3 fintech startups; 1.2k GitHub stars.',
    },
    {
      id: 'prj-2',
      name: 'DevMetrics',
      link: 'devmetrics.aarav.dev',
      tech: 'Next.js, tRPC, ClickHouse',
      description:
        'Engineering analytics dashboard tracking DORA metrics for 40+ teams.',
    },
  ],
  certifications: [
    { id: 'cert-1', name: 'AWS Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2023' },
    { id: 'cert-2', name: 'CKA: Certified Kubernetes Administrator', issuer: 'CNCF', year: '2022' },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Fluent' },
    { id: 'lang-2', name: 'Hindi', level: 'Native' },
  ],
  achievements: [
    'Winner, Razorpay Hackathon 2023 (120 teams)',
    'Speaker at ReactIndia 2024 — "Streaming UIs at scale"',
  ],
  interests: ['Open source', 'Chess', 'Trail running'],
  references: [
    {
      id: 'ref-1',
      name: 'Priya Nair',
      title: 'Engineering Manager, Razorpay',
      phone: '+91 91234 56789',
      email: 'priya.nair@razorpay.com',
    },
    {
      id: 'ref-2',
      name: 'Karan Shah',
      title: 'Director of Engineering, Swiggy',
      phone: '+91 99887 76655',
      email: 'karan.shah@swiggy.in',
    },
  ],
  customSections: [],
}

export const EMPTY_DATA: ResumeData = {
  fullName: '',
  role: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  photo: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  achievements: [],
  interests: [],
  references: [],
  customSections: [],
}

export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
