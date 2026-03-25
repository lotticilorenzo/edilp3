'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { immobili } from '@/data/immobili'
import { ImmobileCard } from '@/components/ui/ImmobileCard'
import { viewportOnce } from '@/lib/animations'

export function ImmobiliPreview() {
  const available = immobili.filter((i) => i.stato !== 'venduto').slice(0, 3)
  const totalAvailable = immobili.filter((i) => i.stato === 'disponibile').length

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-bg-alt border-y border-border relative overflow-hidden">

      {/* Ghost label */}
      <div
        className="absolute top-0 right-0 font-playfair font-bold text-border/60 select-none pointer-events-none hidden xl:block"
        style={{ fontSize: 'clamp(100px, 14vw, 200px)', lineHeight: 0.9, transform: 'translate(5%, -10%)' }}
        aria-hidden
      >
        Case
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter font-medium uppercase tracking-[0.14em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Vendita diretta · Nessuna agenzia
            </p>
            <h2
              className="font-playfair font-bold text-green leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              Immobili <span className="italic">Disponibili</span>
            </h2>
            <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-sm">
              Acquisti direttamente dal costruttore.
              <span className="font-mono text-text-primary ml-1">{totalAvailable} disponibili</span> ora.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/immobili"
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors border-b border-accent/30 hover:border-accent pb-0.5 whitespace-nowrap"
            >
              Tutte le disponibilità
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {available.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <ImmobileCard immobile={item} className="h-full" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/immobili"
            className="inline-flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-8 py-3.5 transition-colors duration-200 group"
            style={{ borderRadius: '2px' }}
          >
            Esplora tutte le abitazioni
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/preventivo"
            className="inline-flex items-center gap-2.5 border border-border hover:border-accent text-text-secondary hover:text-accent text-sm font-medium px-6 py-3.5 transition-all duration-200"
            style={{ borderRadius: '2px' }}
          >
            Richiedi un preventivo gratuito
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
