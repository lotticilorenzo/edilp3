'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { viewportOnce } from '@/lib/animations'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'

const faqs = [
  {
    q: 'Cosa significa acquistare direttamente dal costruttore?',
    a: 'Significa trattare esclusivamente con chi ha costruito la casa, senza alcuna agenzia immobiliare. Nessuna provvigione, nessun costo nascosto, nessun intermediario: ogni euro del tuo budget va sulla qualità dell\'abitazione. Puoi parlare direttamente con il responsabile del cantiere.',
  },
  {
    q: 'Posso personalizzare le finiture della mia abitazione?',
    a: 'Sì, se l\'acquisto avviene nella fase di costruzione hai ampio margine di scelta: pavimenti, rivestimenti, colori, sanitari, cucina e molto altro. Il nostro team ti affianca in ogni decisione con un showroom di campioni selezionati.',
  },
  {
    q: 'Cosa significa Classe Energetica A4?',
    a: 'La Classe A4 è il massimo livello di efficienza energetica previsto dalla normativa italiana. Un\'abitazione A4 consuma fino all\'80% in meno rispetto a una costruzione convenzionale. Bollette drasticamente ridotte, comfort termico superiore in ogni stagione e maggior valore di rivendita nel tempo.',
  },
  {
    q: 'Cosa include la costruzione antisismica?',
    a: 'Tutte le nostre abitazioni sono progettate secondo le norme antisismiche vigenti (Zona 2). Questo significa strutture in cemento armato con armature calcolate per assorbire le sollecitazioni sismiche, senza compromessi sulla qualità dei materiali.',
  },
  {
    q: 'Quanto dura la costruzione? Rispettate le consegne?',
    a: 'In media dai 18 ai 30 mesi dal primo paletto, a seconda della complessità. Le date di consegna vengono stabilite contrattualmente nel preliminare di vendita e da 40 anni le rispettiamo. In caso di ritardo imputabile a noi, sono previste penali a tutela dell\'acquirente.',
  },
  {
    q: 'Quali garanzie offrite dopo la consegna?',
    a: 'Garanzia decennale sulla struttura (obbligatoria per legge), garanzia biennale sugli impianti e un\'assistenza diretta da parte nostra anche dopo il rogito. Siamo sempre raggiungibili: non spariscono le consegne le chiavi.',
  },
  {
    q: 'Come funziona il pagamento? Posso fare un mutuo?',
    a: 'Normalmente: acconto al preliminare, acconti in corso d\'opera in base allo stato avanzamento lavori (SAL), e saldo al rogito. Collaboriamo con diversi istituti di credito e possiamo supportarti nella pratica di mutuo. Il piano è flessibile e si adatta alla tua situazione.',
  },
  {
    q: 'Posso visitare un cantiere prima di decidere?',
    a: 'Assolutamente sì. Organizziamo visite guidate su appuntamento ai cantieri attivi — anche durante le fasi di costruzione più significative. Puoi vedere con i tuoi occhi la qualità dei materiali, gli spessori delle pareti e gli isolamenti. Contattaci per fissare la data.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((cur) => cur === i ? null : i)

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left — sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28">
              <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent inline-block" />
                Domande frequenti
              </p>
              <h2 className="font-playfair font-bold text-green mb-5" style={{ fontSize: 'clamp(26px, 3.2vw, 40px)' }}>
                Hai ancora<br />
                <span className="italic">qualche dubbio?</span>
              </h2>
              <p className="text-text-secondary text-sm leading-7 mb-8">
                Raccogliamo qui le domande più comuni. Se la tua non è in elenco, siamo a disposizione via telefono, email o WhatsApp.
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contatti"
                  className="flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-6 py-3 transition-colors group w-fit"
                  style={{ borderRadius: '2px' }}
                >
                  Fai una domanda
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  href="/preventivo"
                  className="flex items-center gap-2.5 border border-border hover:border-accent text-text-secondary hover:text-accent text-sm font-medium px-6 py-3 transition-colors group w-fit"
                  style={{ borderRadius: '2px' }}
                >
                  Richiedi preventivo
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right — accordion */}
          <div className="lg:col-span-8">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.05 }}
                className="border-b border-border last:border-0"
              >
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={openIndex === i}
                  className={cn(
                    'faq-trigger w-full flex items-start justify-between gap-4 py-5 text-left transition-colors',
                    openIndex === i ? 'text-text-primary' : 'text-text-primary hover:text-accent'
                  )}
                >
                  <span className="font-inter font-medium text-[15px] md:text-base leading-snug pr-2">
                    {faq.q}
                  </span>
                  <div className={cn(
                    'faq-icon flex-shrink-0 w-7 h-7 border flex items-center justify-center transition-all duration-200 mt-0.5',
                    openIndex === i ? 'border-accent bg-accent text-white' : 'border-border text-text-muted'
                  )} style={{ borderRadius: '2px' }}>
                    {openIndex === i ? <Minus size={14} weight="bold" /> : <Plus size={14} weight="bold" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-text-secondary text-sm leading-7 pr-12">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
