'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, MapPin } from '@phosphor-icons/react'
import { zone } from '@/data/zone'
import { PageHero } from '@/components/ui/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { containerVariants, itemVariants, viewportOnce } from '@/lib/animations'

const Map = dynamic(() => import('@/components/sections/MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full skeleton" style={{ borderRadius: '2px' }} />
  ),
})

export function DoveCostruiamoClient() {
  return (
    <>
      <PageHero
        eyebrow="Zone di intervento"
        title="Dove"
        titleItalic="Costruiamo"
        subtitle="Operiamo a Parma e provincia, selezionando con cura le zone che offrono la migliore qualità di vita: servizi, verde, collegamenti e contesti residenziali di pregio."
      />

      {/* Map section */}
      <section className="py-16 md:py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-[440px] md:h-[560px] overflow-hidden border border-border shadow-sm"
            style={{ borderRadius: '4px' }}
          >
            <Map />
          </motion.div>
          <p className="mt-4 text-xs text-text-muted text-center">
            Clicca sui marcatori per scoprire ogni zona. Dati cartografici: OpenStreetMap.
          </p>
        </div>
      </section>

      {/* Zone cards */}
      <section className="py-16 md:py-24 section-alt">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Le nostre zone
            </p>
            <h2 className="font-playfair font-bold text-green" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
              {zone.length} zone di intervento
            </h2>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {zone.map((z) => (
              <motion.div
                key={z.id}
                variants={itemVariants}
                className="bg-white border border-border hover:border-border-hover hover:shadow-md transition-all duration-300 flex flex-col"
                style={{ borderRadius: '4px' }}
              >
                <div className="p-6 md:p-7 flex flex-col gap-4 flex-1">
                  <div className="flex items-start justify-between">
                    <div className="bg-accent/10 p-2.5" style={{ borderRadius: '2px' }}>
                      <MapPin size={20} className="text-accent" weight="fill" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-playfair font-bold text-xl text-green mb-2">{z.nome}</h3>
                    <p className="text-text-secondary text-sm leading-6">{z.descrizione}</p>
                  </div>

                  <div className="flex flex-col gap-4 flex-1">
                    <div>
                      <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-text-muted mb-2">
                        Caratteristiche
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {z.caratteristiche.map((c) => (
                          <span
                            key={c}
                            className="text-xs bg-surface border border-border text-text-secondary px-2.5 py-1"
                            style={{ borderRadius: '2px' }}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-text-muted mb-2">
                        Servizi vicini
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {z.servizi.map((s) => (
                          <span
                            key={s}
                            className="text-xs bg-green-light text-green px-2.5 py-1"
                            style={{ borderRadius: '2px' }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border p-4 px-6">
                  <Link
                    href={`/immobili?zona=${z.id}`}
                    className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-dark transition-colors group"
                  >
                    Vedi immobili in questa zona
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
