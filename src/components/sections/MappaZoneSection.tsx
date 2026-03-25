'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { viewportOnce } from '@/lib/animations'

const Map = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full skeleton" style={{ borderRadius: '2px' }} />
  ),
})

export function MappaZoneSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 section-alt border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Dove operiamo
            </p>
            <h2 className="font-playfair font-bold text-green" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Dove <span className="italic">Costruiamo</span>
            </h2>
            <p className="mt-3 text-text-secondary text-sm leading-relaxed max-w-md">
              Parma, Collecchio e i migliori quartieri della provincia. Selezioniamo con cura ogni zona per garantire qualità di vita e valore nel tempo.
            </p>
          </motion.div>

          <Link
            href="/dove-costruiamo"
            className="group flex items-center gap-2.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors whitespace-nowrap self-start md:self-auto"
          >
            Esplora le zone
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full h-[320px] sm:h-[400px] md:h-[540px] overflow-hidden border border-border shadow-sm"
          style={{ borderRadius: '4px' }}
          data-lenis-prevent
        >
          <Map />
        </motion.div>

      </div>
    </section>
  )
}
