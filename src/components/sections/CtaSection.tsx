'use client'

import { motion } from 'framer-motion'
import { Phone, EnvelopeSimple } from '@phosphor-icons/react'

export function CtaSection() {
  return (
    <section className="bg-accent py-20 md:py-32 relative overflow-hidden">
      {/* Sottile texture background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 20% 150%, rgba(255,255,255,0.8) 0vw, transparent 50vw)'
      }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="text-white max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
            >
              Parliamo del tuo <span className="italic">Progetto</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-xl leading-relaxed mb-10"
            >
              Vuoi visitare un cantiere o ricevere maggiori informazioni sulle nostre soluzioni in Classe A? Contattaci direttamente.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a href="tel:+390521831434" className="flex items-center gap-4 group">
                <div className="bg-white text-accent p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Phone weight="fill" size={24} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70 mb-1">Ufficio</div>
                  <div className="font-mono text-xl font-medium">0521 831434</div>
                </div>
              </a>
              
              <a href="mailto:info@caseaparmaedilp3.it" className="flex items-center gap-4 group">
                <div className="bg-accent-dark text-white p-4 rounded-full group-hover:bg-white group-hover:text-accent transition-colors">
                  <EnvelopeSimple weight="fill" size={24} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/70 mb-1">Email</div>
                  <div className="font-medium">Scrivici un&apos;email</div>
                </div>
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
          >
            {/* Form rapido (placeholder mock, will properly build forms inside src/components/forms layout) */}
            <h3 className="font-playfair font-bold text-3xl text-green mb-2">Richiesta Rapida</h3>
            <p className="text-text-secondary mb-8">Compila i campi, ti risponderemo entro 24 ore.</p>
            
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input type="text" id="nome_cta" className="peer w-full border-b border-border py-2 focus:border-accent outline-none bg-transparent transition-colors placeholder-transparent" placeholder="Nome" />
                <label htmlFor="nome_cta" className="absolute left-0 top-2 text-text-secondary cursor-text peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base">Nome e Cognome *</label>
              </div>
              
              <div className="relative">
                <input type="tel" id="tel_cta" className="peer w-full border-b border-border py-2 focus:border-accent outline-none bg-transparent transition-colors placeholder-transparent" placeholder="Telefono" />
                <label htmlFor="tel_cta" className="absolute left-0 top-2 text-text-secondary cursor-text peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base">Telefono *</label>
              </div>
              
              <button className="bg-green text-white w-full py-4 rounded-full font-medium hover:bg-[#152013] transition-colors mt-4">
                Invia Richiesta
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
