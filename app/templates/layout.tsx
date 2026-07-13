import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Templates',
  description:
    '12 professional, ATS-conscious resume templates with live previews. Pick a layout and accent color — switch anytime without losing content.',
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
