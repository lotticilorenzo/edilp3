'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { immobili } from '@/data/immobili'
import { ImmobileCard } from '@/components/ui/ImmobileCard'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { PageHero } from '@/components/ui/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { containerVariants, itemVariants } from '@/lib/animations'
import type { ZonaParma } from '@/types'

const zoneTabs = [
  { id: 'tutti', label: 'Tutte le zone' },
  { id: 'parma-mia', label: 'Parma Mia' },
  { id: 'eurosia', label: 'Eurosia' },
  { id: 'vicofertile', label: 'Vicofertile' },
  { id: 'via-schubert', label: 'Via Schubert' },
  { id: 'corcagnano', label: 'Corcagnano' },
  { id: 'collecchio', label: 'Collecchio' },
]

const statoTabs = [
  { id: 'tutti', label: 'Tutti' },
  { id: 'disponibile', label: 'Disponibile' },
  { id: 'in-costruzione', label: 'In Costruzione' },
  { id: 'venduto', label: 'Venduto' },
]

const tipologiaTabs = [
  { id: 'tutti', label: 'Tutte' },
  { id: 'appartamento', label: 'Appartamento' },
  { id: 'villa', label: 'Villa' },
  { id: 'bifamiliare', label: 'Bifamiliare' },
  { id: 'attico', label: 'Attico' },
]

export function ImmobiliClient() {
  const [zona, setZona] = useState('tutti')
  const [stato, setStato] = useState('tutti')
  const [tipologia, setTipologia] = useState('tutti')

  const filtered = immobili.filter((i) => {
    const zonaOk = zona === 'tutti' || i.zona === (zona as ZonaParma)
    const statoOk = stato === 'tutti' || i.stato === stato
    const tipoOk = tipologia === 'tutti' || i.tipologia === tipologia
    return zonaOk && statoOk && tipoOk
  })

  return (
    <>
      <PageHero
        eyebrow="Vendita Diretta"
        title="Immobili"
        titleItalic="Disponibili"
        subtitle="Acquista direttamente dal costruttore. Nessuna agenzia, nessuna intermediazione. Appartamenti, ville e bifamiliari a Parma e provincia."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Filters */}
          <div className="flex flex-col gap-6 mb-12 pb-8 border-b border-border">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Zona</span>
              <FilterTabs tabs={zoneTabs} activeTab={zona} onChange={setZona} />
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Stato</span>
                <FilterTabs tabs={statoTabs} activeTab={stato} onChange={setStato} />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Tipologia</span>
                <FilterTabs tabs={tipologiaTabs} activeTab={tipologia} onChange={setTipologia} />
              </div>
            </div>
          </div>

          {/* Count */}
          <p className="text-sm text-text-muted font-mono mb-8">
            {filtered.length} {filtered.length === 1 ? 'immobile' : 'immobili'} trovati
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={zona + stato + tipologia}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((item) => (
                  <motion.div key={item.id} variants={itemVariants}>
                    <ImmobileCard immobile={item} className="h-full" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
              >
                <p className="font-playfair italic text-2xl text-text-secondary mb-3">
                  Nessun immobile trovato
                </p>
                <p className="text-text-muted text-sm">
                  Prova a modificare i filtri o{' '}
                  <a href="/contatti" className="text-accent hover:underline">contattaci</a>{' '}
                  per vedere le disponibilità future.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <CtaSection />
    </>
  )
}
