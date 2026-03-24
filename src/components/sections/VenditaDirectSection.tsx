'use client'

import { motion } from 'framer-motion'
import { CheckCircle } from '@phosphor-icons/react'

const features = [
  {
    title: 'Nessuna intermediazione',
    desc: 'Acquistando direttamente dal costruttore elimini totalmente i costi e le provvigioni di agenzia, investendo il 100% del tuo budget nella qualità della tua nuova casa.'
  },
  {
    title: 'Qualità costruttiva superiore',
    desc: 'Utilizziamo solo materiali di prima scelta, massimi isolamenti termici e acustici (Classe A4) per garantirti un comfort abitativo senza paragoni e zero sorprese nel tempo.'
  },
  {
    title: 'Personalizzazione totale',
    desc: 'Ti affianchiamo passo dopo passo nella scelta delle finiture, offrendoti la flessibilità di personalizzare gli spazi interni per cucirli su misura per la tua famiglia.'
  }
]

export function VenditaDirectSection() {
  return (
    <section className="bg-green py-24 md:py-32 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair font-bold text-4xl md:text-5xl mb-6"
          >
            Il Nostro <span className="italic text-accent">Impegno</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg md:text-xl leading-relaxed"
          >
            Siamo costruttori, non venditori. Dal 1985 ci mettiamo la faccia su ogni cantiere per offrirti un prodotto sicuro, solido e certificato.
          </motion.p>
        </div>

        {/* Zig-Zag 2 colonne alternato come richiesto da SKILL.md */}
        <div className="flex flex-col gap-16 md:gap-24">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 space-y-4 md:space-y-6 lg:max-w-xl">
                <div className="flex items-center gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-accent hidden md:block">
                    <CheckCircle weight="fill" size={32} />
                  </div>
                  <h3 className="font-playfair font-bold text-3xl md:text-4xl">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed md:pl-[68px]">
                  {feature.desc}
                </p>
              </div>
              
              <div className="flex-1 w-full relative">
                <div className="aspect-[4/3] md:aspect-[16/9] lg:aspect-[3/2] rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono tracking-widest text-sm uppercase">Cantiere Edil P.3</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
