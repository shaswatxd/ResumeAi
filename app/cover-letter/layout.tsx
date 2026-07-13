import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Cover Letter Generator',
  description:
    'Generate a tailored, editable cover letter from your resume in seconds. Pick a tone, paste the job description, export as PDF.',
}

export default function CoverLetterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
