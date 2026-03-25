'use client'

import { motion } from 'framer-motion'
import { MagnifyingGlass, PencilLine, Buildings, Key } from '@phosphor-icons/react'
import { viewportOnce } from '@/lib/animations'

const steps = [
  {
    num: '01',
    icon: MagnifyingGlass,
    title: 'Consulenza iniziale',
    body: 'Ascoltiamo le tue esigenze. Zona, tipologia, budget, tempistiche. Nessuna fretta, nessuna pressione. Solo risposte concrete.',
    detail: 'Gratuita · Senza impegno',
  },
  {
    num: '02',
    icon: PencilLine,
    title: 'Proposta su misura',
    body: 'Ti presentiamo le abitazioni disponibili o, se non ancora costruite, le planimetrie e i materiali del progetto in corso.',
    detail: 'Planimetrie · Materiali · Classi',
  },
  {
    num: '03',
    icon: Buildings,
    title: 'Costruzione seguita',
    body: 'Ogni fase della costruzione è monitorata internamente. Puoi visitare il cantiere, ricevere aggiornamenti, toccare con mano.',
    detail: 'Visita cantiere · Updates diretti',
  },
  {
    num: '04',
    icon: Key,
    title: 'Consegna chiavi in mano',
    body: 'Consegniamo l\'abitazione finita, collaudata, pronta ad abitare. Con tutta la documentazione, le garanzie e il nostro supporto post-vendita.',
    detail: 'Garanzia · Assistenza post-vendita',
  },
]

export function ProcessSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-bg-alt border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter font-medium uppercase tracking-[0.14em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Come lavoriamo
            </p>
            <h2
              className="font-playfair font-bold text-green leading-tight"
              style={{ fontSize: 'clamp(26px, 3.5vw, 44px)' }}
            >
              Dal primo contatto<br />
              <span className="italic">alle chiavi di casa.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-text-secondary text-sm leading-7 max-w-sm"
          >
            Un processo trasparente, senza sorprese. Lavoriamo direttamente con ogni cliente — nessun intermediario, nessuna delega.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="relative group"
              >
                {/* Connector line (desktop only, between steps) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[22px] left-[calc(100%+0px)] w-full h-px bg-gradient-to-r from-border to-transparent z-10 pointer-events-none" />
                )}

                {/* Card */}
                <div className="bg-white border border-border p-6 md:p-7 h-full flex flex-col gap-5 hover:border-border-hover hover:shadow-sm transition-all duration-300 group-hover:-translate-y-1">

                  {/* Step number + icon row */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-accent text-xs tracking-widest">{step.num}</span>
                    <div className="w-10 h-10 bg-green-light flex items-center justify-center flex-shrink-0">
                      <Icon size={18} weight="duotone" className="text-green" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-playfair font-bold text-green text-xl leading-snug">
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p className="text-text-secondary text-sm leading-7 flex-1">
                    {step.body}
                  </p>

                  {/* Detail tag */}
                  <div className="pt-4 border-t border-border">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                      {step.detail}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ delay: 0.4, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
        >
          <p className="text-text-muted text-sm">
            Pronto a iniziare? Il primo passo è una conversazione.
          </p>
          <a
            href="tel:+390521831434"
            className="inline-flex items-center gap-2 font-mono text-sm font-medium text-green hover:text-accent transition-colors border-b border-green/30 hover:border-accent pb-0.5"
          >
            0521 831434
          </a>
        </motion.div>

      </div>
    </section>
  )
}
