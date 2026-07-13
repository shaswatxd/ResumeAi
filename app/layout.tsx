import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Fraunces } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://resumeaihai.vercel.app'),
  title: {
    default: 'ResumeAI — Free AI Resume Builder with ATS Score',
    template: '%s · ResumeAI',
  },
  description:
    'Build a standout resume in minutes: 12 professional templates, real AI writing help, ATS score with job-description matching, AI cover letters, and one-click PDF export. Free, no sign-up.',
  keywords: [
    'resume builder',
    'AI resume',
    'free resume builder',
    'ATS resume checker',
    'cover letter generator',
    'CV maker',
    'resume templates',
  ],
  openGraph: {
    title: 'ResumeAI — Free AI Resume Builder with ATS Score',
    description:
      '12 professional templates, real AI writing, ATS scoring, cover letters and one-click PDF. Free, no sign-up.',
    url: 'https://resumeaihai.vercel.app',
    siteName: 'ResumeAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI — Free AI Resume Builder',
    description:
      '12 templates · Real AI writing · ATS score · Cover letters · Free PDF export',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#1a1526',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-background ${geistSans.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
