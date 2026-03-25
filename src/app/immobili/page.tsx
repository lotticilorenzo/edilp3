import type { Metadata } from 'next'

// Revalidate every 30 minutes — immobili availability can change
export const revalidate = 1800
import { buildMetadata, immobiliItemListJsonLd } from '@/lib/seo'
import { immobili } from '@/data/immobili'
import { ImmobiliClient } from './ImmobiliClient'

export const metadata: Metadata = buildMetadata({
  title: 'Appartamenti e Ville Nuove a Parma — Vendita Diretta',
  description:
    'Case nuove in vendita a Parma: appartamenti, ville, bifamiliari e attici. Classe A, bioedilizia, antisismica. Acquisto diretto dal costruttore Edil P.3 — Parma Mia, Eurosia, Vicofertile, Collecchio.',
  canonical: '/immobili',
})

export default function ImmobiliPage() {
  const jsonLd = immobiliItemListJsonLd(immobili)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImmobiliClient />
    </>
  )
}
