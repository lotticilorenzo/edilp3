'use client'

import { useState } from 'react'
import { realizzazioni } from '@/data/realizzazioni'
import { RealizzazioneCard } from '@/components/ui/RealizzazioneCard'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { PageHero } from '@/components/ui/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'
import { motion, AnimatePresence } from 'framer-motion'
import type { ZonaParma } from '@/types'
import { containerVariants, itemVariants } from '@/lib/animations'

const zoneTabs = [
  { id: 'tutti', label: 'Tutte le zone' },
  { id: 'collecchio', label: 'Collecchio' },
  { id: 'parma-mia', label: 'Parma Mia' },
  { id: 'eurosia', label: 'Eurosia' },
  { id: 'via-schubert', label: 'Via Schubert' },
  { id: 'corcagnano', label: 'Corcagnano' },
]

const tipologiaTabs = [
  { id: 'tutti', label: 'Tutte' },
  { id: 'complesso', label: 'Complesso' },
  { id: 'villa', label: 'Villa' },
  { id: 'appartamento', label: 'Appartamento' },
]

export function RealizzazioniClient() {
  const [zona, setZona] = useState('tutti')
  const [tipologia, setTipologia] = useState('tutti')

  const filtered = realizzazioni.filter((r) => {
    const zonaOk = zona === 'tutti' || r.zona === (zona as ZonaParma)
    const tipoOk = tipologia === 'tutti' || r.tipologia === tipologia
    return zonaOk && tipoOk
  })

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Le nostre"
        titleItalic="Realizzazioni"
        subtitle="Oltre 100 abitazioni consegnate a Parma e provincia dal 1985. Ogni progetto è una testimonianza concreta di qualità costruttiva, efficienza energetica e design."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 pb-8 border-b border-border">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Zona</span>
              <FilterTabs tabs={zoneTabs} activeTab={zona} onChange={setZona} />
            </div>
            <div className="flex flex-col gap-2 sm:ml-8">
              <span className="text-xs font-medium uppercase tracking-widest text-text-muted">Tipologia</span>
              <FilterTabs tabs={tipologiaTabs} activeTab={tipologia} onChange={setTipologia} />
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-text-muted font-mono mb-8">
            {filtered.length} {filtered.length === 1 ? 'progetto' : 'progetti'} trovati
          </p>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={zona + tipologia}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.map((r) => (
                  <motion.div key={r.id} variants={itemVariants}>
                    <RealizzazioneCard realizzazione={r} className="h-full" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center"
              >
                <p className="font-playfair italic text-2xl text-text-secondary mb-3">Nessun risultato</p>
                <p className="text-text-muted text-sm">Prova a modificare i filtri di ricerca.</p>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      <CtaSection />
    </>
  )
}
