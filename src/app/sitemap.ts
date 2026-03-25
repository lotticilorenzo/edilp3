import type { MetadataRoute } from 'next'
import { immobili } from '@/data/immobili'
import { realizzazioni } from '@/data/realizzazioni'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://edilp3.it'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/immobili`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/realizzazioni`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/chi-siamo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/dove-costruiamo`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contatti`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/preventivo`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const immobiliRoutes: MetadataRoute.Sitemap = immobili.map((item) => ({
    url: `${siteUrl}/immobili/${item.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.85,
  }))

  const realizzazioniRoutes: MetadataRoute.Sitemap = realizzazioni.map((item) => ({
    url: `${siteUrl}/realizzazioni/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...immobiliRoutes, ...realizzazioniRoutes]
}
