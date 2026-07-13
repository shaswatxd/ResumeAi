import type { MetadataRoute } from 'next'

const BASE = 'https://resumeaihai.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/builder`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/templates`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/cover-letter`, changeFrequency: 'weekly', priority: 0.7 },
  ]
}
