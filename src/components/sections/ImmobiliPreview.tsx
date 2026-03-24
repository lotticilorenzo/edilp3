'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { immobili } from '@/data/immobili'
import { ImmobileCard } from '@/components/ui/ImmobileCard'
import { containerVariants, itemVariants } from '@/lib/animations'
import { motion } from 'framer-motion'

export function ImmobiliPreview() {
  const availableItems = immobili.slice(0, 3)

  return (
    <section className="section-alt py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-green mb-6">
            In <span className="italic">Vendita Diretta</span>
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            Nessuna spesa di agenzia o intermediazione. Acquista direttamente da noi, costruiamo per vivere, non per speculare.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {availableItems.map(item => (
             <motion.div key={item.id} variants={itemVariants}>
               <ImmobileCard immobile={item} className="h-full" />
             </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Link 
            href="/immobili"
            className="inline-flex items-center gap-3 bg-accent text-white px-8 py-4 rounded-full font-medium hover:bg-accent-dark transition-colors group"
          >
            Esplora tutte le disponibilità
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
