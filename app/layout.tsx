import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Inter,
  Poppins,
  Roboto,
  Lato,
  Montserrat,
  Nunito,
  Open_Sans,
  Playfair_Display,
  Merriweather,
  Raleway,
} from 'next/font/google'
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

/* Resume-document font library — see lib/fonts.ts for the FontId -> cssVar map */
const resumeInter = Inter({ subsets: ['latin'], variable: '--font-resume-inter', weight: ['400', '500', '600', '700'] })
const resumePoppins = Poppins({ subsets: ['latin'], variable: '--font-resume-poppins', weight: ['400', '500', '600', '700'] })
const resumeRoboto = Roboto({ subsets: ['latin'], variable: '--font-resume-roboto', weight: ['400', '500', '700'] })
const resumeLato = Lato({ subsets: ['latin'], variable: '--font-resume-lato', weight: ['400', '700'] })
const resumeMontserrat = Montserrat({ subsets: ['latin'], variable: '--font-resume-montserrat', weight: ['400', '500', '600', '700'] })
const resumeNunito = Nunito({ subsets: ['latin'], variable: '--font-resume-nunito', weight: ['400', '600', '700'] })
const resumeOpenSans = Open_Sans({ subsets: ['latin'], variable: '--font-resume-open-sans', weight: ['400', '600', '700'] })
const resumePlayfair = Playfair_Display({ subsets: ['latin'], variable: '--font-resume-playfair', weight: ['400', '600', '700'] })
const resumeMerriweather = Merriweather({ subsets: ['latin'], variable: '--font-resume-merriweather', weight: ['400', '700'] })
const resumeRaleway = Raleway({ subsets: ['latin'], variable: '--font-resume-raleway', weight: ['400', '500', '600', '700'] })

const resumeFontVars = [
  resumeInter,
  resumePoppins,
  resumeRoboto,
  resumeLato,
  resumeMontserrat,
  resumeNunito,
  resumeOpenSans,
  resumePlayfair,
  resumeMerriweather,
  resumeRaleway,
]
  .map((f) => f.variable)
  .join(' ')

export const metadata: Metadata = {
  metadataBase: new URL('https://resumeaihai.vercel.app'),
  title: {
    default: 'ResumeAI — Free AI Resume Builder with ATS Score',
    template: '%s · ResumeAI',
  },
  description:
    'Build a standout resume in minutes: 26 premium templates, real AI writing help, ATS score with job-description matching, AI cover letters, and one-click PDF export. Free, no sign-up.',
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
      '26 premium templates, real AI writing, ATS scoring, cover letters and one-click PDF. Free, no sign-up.',
    url: 'https://resumeaihai.vercel.app',
    siteName: 'ResumeAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeAI — Free AI Resume Builder',
    description:
      '26 templates · Real AI writing · ATS score · Cover letters · Free PDF export',
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
      className={`dark bg-background ${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${resumeFontVars}`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
