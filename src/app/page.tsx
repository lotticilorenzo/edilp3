import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { RealizzazioniPreview } from '@/components/sections/RealizzazioniPreview'
import { ImmobiliPreview } from '@/components/sections/ImmobiliPreview'
import { VenditaDirectSection } from '@/components/sections/VenditaDirectSection'
import { MappaZoneSection } from '@/components/sections/MappaZoneSection'
import { RecensioniSection } from '@/components/sections/RecensioniSection'
import { CtaSection } from '@/components/sections/CtaSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <RealizzazioniPreview />
      <ImmobiliPreview />
      <VenditaDirectSection />
      <MappaZoneSection />
      <RecensioniSection />
      <CtaSection />
    </>
  )
}
