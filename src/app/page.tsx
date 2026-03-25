import type { Metadata } from 'next'

// Homepage — revalidate hourly
export const revalidate = 3600
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { MarqueeStrip } from '@/components/ui/MarqueeStrip'
import { ManifestoSection } from '@/components/sections/ManifestoSection'
import { RealizzazioniPreview } from '@/components/sections/RealizzazioniPreview'
import { ImmobiliPreview } from '@/components/sections/ImmobiliPreview'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { VenditaDirectSection } from '@/components/sections/VenditaDirectSection'
import { MappaZoneSection } from '@/components/sections/MappaZoneSection'
import { RecensioniSection } from '@/components/sections/RecensioniSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { CertificazioniSection } from '@/components/sections/CertificazioniSection'
import { localBusinessJsonLd, buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Edil P.3 Srl — Costruttori a Parma dal 1985',
  description:
    'Costruttore case a Parma dal 1985. Residenze in Classe A, bioedilizia e antisismica. Vendita diretta senza intermediari — Parma Mia, Eurosia, Vicofertile, Collecchio.',
  canonical: '/',
})

export default function Home() {
  const jsonLd = localBusinessJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero — full viewport cinematic */}
      <HeroSection />

      {/* 2. Stats — oversized architectural numbers */}
      <StatsSection />

      {/* 3. Marquee strip — brand values */}
      <MarqueeStrip />

      {/* 4. Manifesto — dark section, brand statement */}
      <ManifestoSection />

      {/* 5. Realizzazioni preview — bento grid */}
      <RealizzazioniPreview />

      {/* 6. Immobili disponibili — 3 card preview */}
      <ImmobiliPreview />

      {/* 7. Certificazioni — quality badges */}
      <CertificazioniSection />

      {/* 8. Process — come lavoriamo 4 step */}
      <ProcessSection />

      {/* 9. Vendita diretta USP — dark green */}
      <VenditaDirectSection />

      {/* 10. Mappa zone operative */}
      <MappaZoneSection />

      {/* 11. Recensioni Google carousel */}
      <RecensioniSection />

      {/* 12. FAQ */}
      <FAQSection />

      {/* 13. CTA finale */}
      <CtaSection />
    </>
  )
}
