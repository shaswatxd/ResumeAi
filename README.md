# ResumeAI

Free AI resume builder — live: **[resumeaihai.vercel.app](https://resumeaihai.vercel.app)**

Build a standout resume in minutes: live A4 preview, 12 professional templates, real AI writing help, ATS scoring with job-description matching, AI cover letters, and one-click PDF export. No sign-up — everything saves in your browser.

## Features

- **Live preview** — every edit rendered instantly on a pixel-perfect A4 sheet
- **12 templates** — Dark Glass, Classic Pro, Minimal, Sidebar, Banded, Executive, Modern Split, Compact, Elegant, Timeline, Bold Type, Tech Mono
- **10 accent colors** + font size and line-spacing controls
- **Real AI (Groq → Gemini → Cerebras fallback chain)**
  - Generate professional summary from your profile
  - Rewrite experience bullets into quantified achievements
  - Suggest relevant skills
  - Resume coach chat
  - ATS deep analysis + tailoring advice for a pasted job description
  - Cover letter generator (tone, company, hiring manager aware)
- **ATS score** — 8 local structure checks + keyword-match score against any JD (missing/matched keywords highlighted)
- **Cover letter page** — editable output, copy or print to PDF
- **Templates gallery** — full live previews with sample data, one-click apply
- **Sections** — personal, experience, education, skills, projects, certifications, languages, achievements, interests
- **Import / export JSON** backup, PDF export with proper filename
- **Private by default** — resume data lives in `localStorage`, never on a server

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS 4 · Vercel AI SDK · lucide-react

## Develop

```bash
pnpm install
pnpm dev
```

AI needs at least one provider key (first configured wins, failures fall through to the next):

```bash
# .env.local
GROQ_API_KEY=your_key        # primary — llama-3.3-70b-versatile
GEMINI_API_KEY=your_key      # fallback — gemini-2.0-flash
CEREBRAS_API_KEY=your_key    # fallback — llama-3.3-70b
```

## Deploy

```bash
vercel --prod
```
