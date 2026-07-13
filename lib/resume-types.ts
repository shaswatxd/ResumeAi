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
}

export type TemplateId =
  | 'glass'
  | 'classic'
  | 'minimal'
  | 'sidebar'
  | 'banded'
  | 'executive'
  | 'modern'
  | 'compact'
  | 'elegant'
  | 'timeline'
  | 'bold'
  | 'mono'
  | 'azure'
  | 'meridian'
  | 'collegiate'
  | 'ledger'
  | 'typewriter'
  | 'pastel'
  | 'onyx'
  | 'sage'
  | 'navy'
  | 'gradschool'
  | 'charcoal'
  | 'boutique'
  | 'refined'
  | 'duotone'
  | 'editorial'
  | 'facet'
  | 'skyline'
  | 'triad'
  | 'estate'
  | 'outline'
  | 'ruled'
  | 'blush'
  | 'noirside'
  | 'grayside'
  | 'display'
  | 'evergreen'
  | 'cleanmark'
  | 'ribbon'
  | 'slateband'
  | 'poster'
  | 'headline'
  | 'seafoam'
  | 'citrus'
  | 'crimson'
  | 'ivory'
  | 'fern'
  | 'ash'
  | 'pearl'
  | 'obsidian'
  | 'dove'
  | 'stone'
  | 'cloud'
  | 'hazel'
  | 'fog'
  | 'ink'
  | 'pine'
  | 'mist'
  | 'taupe'
  | 'linen'

export type Template = {
  id: TemplateId
  name: string
  description: string
  tag?: string
}

export type ThemeId =
  | 'violet'
  | 'emerald'
  | 'blue'
  | 'amber'
  | 'slate'
  | 'rose'
  | 'teal'
  | 'indigo'
  | 'crimson'
  | 'forest'

export type AccentTheme = {
  id: ThemeId
  name: string
  /* hex used inside the (light) resume paper */
  accent: string
  soft: string
}

export type FontScale = 'sm' | 'md' | 'lg'
export type Spacing = 'compact' | 'normal' | 'relaxed'

export type DocSettings = {
  fontScale: FontScale
  spacing: Spacing
}

export const DEFAULT_SETTINGS: DocSettings = {
  fontScale: 'md',
  spacing: 'normal',
}

export const TEMPLATES: Template[] = [
  { id: 'glass', name: 'Dark Glass', description: 'Bold, modern glass panels', tag: 'Popular' },
  { id: 'classic', name: 'Classic Pro', description: 'Timeless serif, ATS-friendly', tag: 'ATS' },
  { id: 'minimal', name: 'Minimal', description: 'Clean, generous whitespace', tag: 'ATS' },
  { id: 'sidebar', name: 'Sidebar', description: 'Two-column with accent rail' },
  { id: 'banded', name: 'Banded', description: 'Colored header band' },
  { id: 'executive', name: 'Executive', description: 'Refined serif for senior roles', tag: 'New' },
  { id: 'modern', name: 'Modern Split', description: 'Light two-column, right rail', tag: 'New' },
  { id: 'compact', name: 'Compact', description: 'Dense single column, fits more', tag: 'ATS' },
  { id: 'elegant', name: 'Elegant', description: 'Centered, thin rules, airy', tag: 'New' },
  { id: 'timeline', name: 'Timeline', description: 'Vertical timeline for experience', tag: 'New' },
  { id: 'bold', name: 'Bold Type', description: 'Oversized name, strong hierarchy', tag: 'New' },
  { id: 'mono', name: 'Tech Mono', description: 'Monospace, developer-flavored', tag: 'Dev' },
  { id: 'azure', name: 'Azure Corporate', description: 'Diagonal accent header with photo', tag: 'New' },
  { id: 'meridian', name: 'Meridian', description: 'Centered name, vertical divider', tag: 'New' },
  { id: 'collegiate', name: 'Collegiate', description: 'Student-friendly, photo rail', tag: 'New' },
  { id: 'ledger', name: 'Ledger', description: 'Shaded section headers, single column', tag: 'ATS' },
  { id: 'typewriter', name: 'Typewriter', description: 'Label column, editorial serif', tag: 'New' },
  { id: 'pastel', name: 'Pastel Header', description: 'Soft header band with photo', tag: 'New' },
  { id: 'onyx', name: 'Onyx', description: 'Black name band, sharp two-column', tag: 'New' },
  { id: 'sage', name: 'Sage Panel', description: 'Tinted photo panel, calm layout', tag: 'New' },
  { id: 'navy', name: 'Navy Sidebar', description: 'Deep accent sidebar with photo', tag: 'New' },
  { id: 'gradschool', name: 'Grad School', description: 'Serif headers, competency grid', tag: 'ATS' },
  { id: 'charcoal', name: 'Charcoal', description: 'Dark sidebar with references', tag: 'New' },
  { id: 'boutique', name: 'Boutique', description: 'Letter-spaced caps, side rail', tag: 'New' },
  { id: 'refined', name: 'Refined', description: 'Small-caps serif, top rule', tag: 'New' },
  { id: 'duotone', name: 'Duotone Student', description: 'Two-tone bands, arrow bullets', tag: 'New' },
  { id: 'editorial', name: 'Editorial', description: 'Wide-tracked name, thin rules', tag: 'New' },
  { id: 'facet', name: 'Facet', description: 'Big round photo, angular accents', tag: 'New' },
  { id: 'skyline', name: 'Skyline', description: 'Soft corner band header', tag: 'New' },
  { id: 'triad', name: 'Triad', description: 'Gray header, three-column body', tag: 'New' },
  { id: 'estate', name: 'Estate', description: 'Spaced caps, italic subtitle', tag: 'New' },
  { id: 'outline', name: 'Outline Dev', description: 'Accent border box, developer', tag: 'Dev' },
  { id: 'ruled', name: 'Ruled', description: 'Boxed header rules, two-column', tag: 'ATS' },
  { id: 'blush', name: 'Blush Panel', description: 'Soft side panel, student', tag: 'New' },
  { id: 'noirside', name: 'Noir Side', description: 'Black sidebar, timeline dots', tag: 'New' },
  { id: 'grayside', name: 'Gray Side', description: 'Gray about-rail, awards column', tag: 'New' },
  { id: 'display', name: 'Display Serif', description: 'Display name, boxed sections', tag: 'New' },
  { id: 'evergreen', name: 'Evergreen', description: 'Deep green panel, pill labels', tag: 'New' },
  { id: 'cleanmark', name: 'Clean Mark', description: 'Photo corner, label rows', tag: 'New' },
  { id: 'ribbon', name: 'Ribbon', description: 'Dark center rail, name ribbon', tag: 'New' },
  { id: 'slateband', name: 'Slate Band', description: 'Gray band, photo left', tag: 'New' },
  { id: 'poster', name: 'Poster', description: 'Display type, bold statement', tag: 'New' },
  { id: 'headline', name: 'Headline', description: 'Huge condensed name, mono labels', tag: 'New' },
  { id: 'seafoam', name: 'Seafoam', description: 'Tinted half panel, arrow bullets', tag: 'New' },
  { id: 'citrus', name: 'Citrus', description: 'Playful circles, two-column', tag: 'New' },
  { id: 'crimson', name: 'Crimson Bold', description: 'Red-black bold graphic designer', tag: 'New' },
  { id: 'ivory', name: 'Ivory Elegant', description: 'White-black elegant corporate', tag: 'New' },
  { id: 'fern', name: 'Fern Student', description: 'White-green simple student', tag: 'New' },
  { id: 'ash', name: 'Ash Minimalist', description: 'Clean minimalist with timeline', tag: 'New' },
  { id: 'pearl', name: 'Pearl Clean', description: 'White minimalist marketing manager', tag: 'New' },
  { id: 'obsidian', name: 'Obsidian Dark', description: 'Black modern professional', tag: 'New' },
  { id: 'dove', name: 'Dove Minimal', description: 'Black-white minimalist with side', tag: 'New' },
  { id: 'stone', name: 'Stone Modern', description: 'Professional modern with sidebar', tag: 'New' },
  { id: 'cloud', name: 'Cloud Light', description: 'White minimalist airy layout', tag: 'New' },
  { id: 'hazel', name: 'Hazel Classic', description: 'Classic professional with borders', tag: 'New' },
  { id: 'fog', name: 'Fog Subtle', description: 'Subtle gray professional', tag: 'New' },
  { id: 'ink', name: 'Ink Bold', description: 'Bold black accent sections', tag: 'New' },
  { id: 'pine', name: 'Pine Accent', description: 'Green accent sidebar layout', tag: 'New' },
  { id: 'mist', name: 'Mist Soft', description: 'Soft muted professional', tag: 'New' },
  { id: 'taupe', name: 'Taupe Warm', description: 'Warm taupe sidebar layout', tag: 'New' },
  { id: 'linen', name: 'Linen Simple', description: 'Simple linen textured layout', tag: 'New' },
]

export const THEMES: AccentTheme[] = [
  { id: 'violet', name: 'Violet', accent: '#7c5cff', soft: '#efeaff' },
  { id: 'emerald', name: 'Emerald', accent: '#0f9d76', soft: '#e5f6f0' },
  { id: 'blue', name: 'Ocean', accent: '#2563eb', soft: '#e6efff' },
  { id: 'amber', name: 'Amber', accent: '#c2740b', soft: '#fbf0dd' },
  { id: 'slate', name: 'Slate', accent: '#334155', soft: '#eef1f6' },
  { id: 'rose', name: 'Rose', accent: '#e11d63', soft: '#fde8ef' },
  { id: 'teal', name: 'Teal', accent: '#0d9488', soft: '#e0f4f2' },
  { id: 'indigo', name: 'Indigo', accent: '#4f46e5', soft: '#e9e8fc' },
  { id: 'crimson', name: 'Crimson', accent: '#b91c1c', soft: '#fbe7e7' },
  { id: 'forest', name: 'Forest', accent: '#166534', soft: '#e4f2e9' },
]

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
}

export function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}
