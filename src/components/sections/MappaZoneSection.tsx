'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

// Import MapComponent dynamically with SSR disabled as per instructions
const Map = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-surface animate-pulse" />
})

export function MappaZoneSection() {
  return (
    <section className="py-24 bg-surface border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-green mb-6">
            Dove <span className="italic">Costruiamo</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Esplora le nostre aree di intervento a Parma e provincia. Selezioniamo con cura le zone migliori per garantirti serenità, servizi e ampi spazi verdi.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden border border-border shadow-sm flex relative"
        >
          <Map />
        </motion.div>
      </div>
    </section>
  )
}
