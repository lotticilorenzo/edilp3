'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, EnvelopeSimple, CircleNotch, CheckCircle, WhatsappLogo } from '@phosphor-icons/react'
import { viewportOnce } from '@/lib/animations'

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <section className="bg-accent py-16 sm:py-20 md:py-28 relative overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 0% 100%, rgba(255,255,255,1) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[40vw] h-full opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,1) 0px, rgba(255,255,255,1) 1px, transparent 1px, transparent 48px)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-white"
          >
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-white/50 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-white/30 inline-block" />
              Inizia ora
            </p>
            <h2 className="font-playfair font-bold leading-tight mb-5" style={{ fontSize: 'clamp(28px, 4.5vw, 58px)' }}>
              Parliamo del<br />
              <span className="italic">tuo progetto.</span>
            </h2>
            <p className="text-white/75 text-sm leading-relaxed mb-8 max-w-md">
              Vuoi visitare un cantiere, ricevere informazioni su una residenza specifica o semplicemente fare due chiacchiere? Siamo qui.
            </p>

            <div className="flex flex-col gap-4">
              <a
                href="tel:+390521831434"
                className="group flex items-center gap-4 min-h-[52px]"
              >
                <div className="bg-white text-accent p-3.5 group-hover:scale-105 transition-transform flex-shrink-0" style={{ borderRadius: '2px' }}>
                  <Phone weight="fill" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Ufficio</p>
                  <p className="font-mono text-white text-base md:text-lg font-medium">0521 831434</p>
                </div>
              </a>

              <a
                href="tel:+393396499106"
                className="group flex items-center gap-4 min-h-[52px]"
              >
                <div className="bg-white/15 border border-white/20 text-white p-3.5 group-hover:bg-white group-hover:text-accent transition-colors flex-shrink-0" style={{ borderRadius: '2px' }}>
                  <Phone weight="fill" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Mobile</p>
                  <p className="font-mono text-white text-base md:text-lg font-medium">339 6499106</p>
                </div>
              </a>

              <a
                href="mailto:info@caseaparmaedilp3.it"
                className="group flex items-center gap-4 min-h-[52px]"
              >
                <div className="bg-white/15 border border-white/20 text-white p-3.5 group-hover:bg-white group-hover:text-accent transition-colors flex-shrink-0" style={{ borderRadius: '2px' }}>
                  <EnvelopeSimple weight="fill" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">Email</p>
                  <p className="text-white font-medium text-sm break-all">info@caseaparmaedilp3.it</p>
                </div>
              </a>

              {/* WhatsApp on mobile */}
              <a
                href="https://wa.me/393396499106"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 min-h-[52px] md:hidden"
              >
                <div className="bg-[#25D366] text-white p-3.5 flex-shrink-0" style={{ borderRadius: '2px' }}>
                  <WhatsappLogo weight="fill" size={20} />
                </div>
                <div>
                  <p className="text-white/50 text-[10px] uppercase tracking-widest mb-0.5">WhatsApp</p>
                  <p className="text-white font-medium text-sm">Scrivici ora</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Right - Quick form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="bg-white p-6 sm:p-8 md:p-10 shadow-2xl"
            style={{ borderRadius: '4px' }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center min-h-[240px] text-center gap-5">
                <div className="bg-green-light p-4 rounded-full">
                  <CheckCircle size={36} weight="fill" className="text-green-mid" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl text-green mb-2">Messaggio inviato</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Ti risponderemo entro 24 ore lavorative.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 className="font-playfair font-bold text-xl md:text-2xl text-green mb-1">Richiesta rapida</h3>
                <p className="text-text-secondary text-sm mb-7">
                  Lascia i tuoi riferimenti, ti ricontattiamo noi.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="input-field">
                    <input
                      type="text"
                      id="nome_cta"
                      placeholder="Nome"
                      required
                      autoComplete="name"
                    />
                    <label htmlFor="nome_cta">Nome e Cognome *</label>
                  </div>

                  <div className="input-field">
                    <input
                      type="tel"
                      id="tel_cta"
                      placeholder="Telefono"
                      required
                      autoComplete="tel"
                    />
                    <label htmlFor="tel_cta">Telefono *</label>
                  </div>

                  <div className="input-field">
                    <select id="interesse_cta" defaultValue="">
                      <option value="" disabled>Seleziona</option>
                      <option value="acquisto">Acquisto immobile</option>
                      <option value="visita">Visita cantiere</option>
                      <option value="informazioni">Informazioni generali</option>
                    </select>
                    <label htmlFor="interesse_cta">Interesse</label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green hover:bg-[#152013] text-white py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors mt-2 disabled:opacity-70 min-h-[52px]"
                    style={{ borderRadius: '2px' }}
                  >
                    {loading ? (
                      <>
                        <CircleNotch size={16} className="animate-spin" />
                        Invio in corso...
                      </>
                    ) : 'Invia Richiesta'}
                  </button>

                  <p className="text-xs text-text-muted text-center">
                    Inviando accetti la nostra{' '}
                    <a href="/privacy" className="underline hover:text-text-secondary">Privacy Policy</a>.
                  </p>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
