import type { Metadata } from 'next'

// Realizzazioni change rarely — revalidate monthly
export const revalidate = 2592000
import { buildMetadata, realizzazioniItemListJsonLd } from '@/lib/seo'
import { realizzazioni } from '@/data/realizzazioni'
import { RealizzazioniClient } from './RealizzazioniClient'

export const metadata: Metadata = buildMetadata({
  title: 'Realizzazioni — Portfolio Costruzioni Parma dal 1985',
  description:
    'Oltre 100 abitazioni realizzate a Parma e provincia dal 1985. Scopri il portfolio di Edil P.3: complessi residenziali, ville e appartamenti a Parma Mia, Eurosia, Vicofertile, Corcagnano, Collecchio.',
  canonical: '/realizzazioni',
})

export default function RealizzazioniPage() {
  const jsonLd = realizzazioniItemListJsonLd(realizzazioni)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RealizzazioniClient />
    </>
  )
}
