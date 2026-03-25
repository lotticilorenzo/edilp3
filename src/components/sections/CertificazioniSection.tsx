'use client'

import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { Leaf, ShieldCheck, Lightning, SealCheck, Buildings, Wrench } from '@phosphor-icons/react'

const certificazioni = [
  {
    Icon: Lightning,
    colore: '#2E7D32',
    sfondo: '#E8F5E4',
    titolo: 'Classe Energetica A4',
    descrizione: 'Il massimo riconoscimento energetico. Consumo ≤ 15 kWh/m²·anno — bollette ridotte dell\'80% rispetto al costruito standard.',
    badge: 'Certificato APE',
  },
  {
    Icon: ShieldCheck,
    colore: '#1565C0',
    sfondo: '#E3F2FD',
    titolo: 'Antisismica Zona 2',
    descrizione: 'Struttura in cemento armato progettata secondo NTC 2018. Collaudati da tecnici indipendenti per resistere a eventi sismici.',
    badge: 'NTC 2018',
  },
  {
    Icon: Leaf,
    colore: '#4A7C3F',
    sfondo: '#E8F5E4',
    titolo: 'Bioedilizia',
    descrizione: 'Materiali naturali certificati, zero VOC, cappotto in fibra di legno. L\'abitare sostenibile non è una scelta ma il nostro standard.',
    badge: 'Materiali certificati',
  },
  {
    Icon: SealCheck,
    colore: '#B8962E',
    sfondo: '#FFF8E1',
    titolo: 'Isolamento Acustico',
    descrizione: 'Prestazioni Rw ≥ 55 dB per le pareti, Ln ≤ 58 dB per i solai. Silenzio come componente del benessere abitativo.',
    badge: 'UNI EN ISO 140',
  },
  {
    Icon: Buildings,
    colore: '#C0392B',
    sfondo: '#FDEDEC',
    titolo: 'Vendita Diretta',
    descrizione: 'Costruiamo e vendiamo noi stessi ogni immobile. Nessuna agenzia, nessuna provvigione. Il risparmio va all\'acquirente.',
    badge: 'Zero intermediari',
  },
  {
    Icon: Wrench,
    colore: '#8B7355',
    sfondo: '#FAF3EC',
    titolo: 'Assistenza Post-Vendita',
    descrizione: 'Garanzia costruttore 10 anni sulla struttura, 2 anni sugli impianti. Reperiamo prontamente per qualsiasi necessità tecnica.',
    badge: 'Garanzia 10 anni',
  },
]

export function CertificazioniSection() {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-white border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent inline-block" />
            Qualità certificata
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2
              className="font-playfair font-bold text-green"
              style={{ fontSize: 'clamp(26px, 3.5vw, 42px)' }}
            >
              Ogni casa è <span className="italic">garantita</span>
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Non certifichiamo la qualità a lavori finiti. La costruiamo fase per fase, con materiali tracciati e controlli indipendenti.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificazioni.map(({ Icon, colore, sfondo, titolo, descrizione, badge }, i) => (
            <motion.div
              key={titolo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="group p-6 border border-border hover:border-border-hover bg-surface hover:bg-white transition-all duration-300"
              style={{ borderRadius: '4px' }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center mb-5 flex-shrink-0"
                style={{ background: sfondo, borderRadius: '6px' }}
              >
                <Icon size={20} weight="fill" style={{ color: colore }} />
              </div>

              {/* Badge */}
              <p className="font-inter font-semibold uppercase tracking-[0.1em] text-[9px] mb-2" style={{ color: colore }}>
                {badge}
              </p>

              {/* Title */}
              <h3 className="font-inter font-semibold text-base text-text-primary mb-2.5 group-hover:text-green transition-colors">
                {titolo}
              </h3>

              {/* Description */}
              <p className="text-text-secondary text-sm leading-[1.7]">
                {descrizione}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 pt-8 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-text-muted text-sm">
            Tutta la documentazione tecnica è disponibile in fase di compromesso.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {['APE', 'NTC 2018', 'UNI EN 15804', 'D.Lgs. 28/2011'].map((cert) => (
              <span
                key={cert}
                className="font-mono text-[10px] text-text-muted border border-border px-2 py-1"
                style={{ borderRadius: '2px' }}
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
