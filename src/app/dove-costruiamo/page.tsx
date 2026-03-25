import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { DoveCostruiamoClient } from './DoveCostruiamoClient'

export const metadata: Metadata = buildMetadata({
  title: 'Dove Costruiamo — Parma Mia, Eurosia, Vicofertile, Collecchio',
  description:
    'Edil P.3 costruisce a Parma e provincia: Parma Mia, Eurosia, Vicofertile, Via Schubert, Corcagnano, Collecchio. Scopri le zone e le caratteristiche di ogni quartiere.',
  canonical: '/dove-costruiamo',
})

export default function DoveCostruiamoPage() {
  return <DoveCostruiamoClient />
}
