'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'
import { ScrubQuote } from '@/components/ui/ScrubQuote'

const pillars = [
  {
    num: '01',
    title: 'Costruiamo direttamente',
    body: 'Nessuna agenzia tra noi e il cliente. Dal progetto alle chiavi in mano, ogni fase è gestita internamente.',
  },
  {
    num: '02',
    title: 'Materiali certificati',
    body: 'Bioedilizia, Classe energetica A, strutture antisismiche. Non sono optional: sono il nostro standard.',
  },
  {
    num: '03',
    title: 'Radici nel territorio',
    body: 'Costruiamo a Parma dal 1985. Conosciamo ogni quartiere, ogni zonazione, ogni valore del territorio.',
  },
]

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const lineWidth = useTransform(scrollYProgress, [0.1, 0.5], ['0%', '100%'])

  return (
    <section ref={sectionRef} className="relative bg-green overflow-hidden">

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '100px 100px',
        }}
      />

      {/* ── Ghost number decoration ── */}
      <div
        className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.035] hidden lg:block"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(180px, 22vw, 340px)',
          fontWeight: 700,
          color: 'white',
          lineHeight: 0.9,
          transform: 'translate(5%, -5%)',
        }}
      >
        40
      </div>

      {/* ── Top content: manifesto quote ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-28 pb-12 md:pb-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="h-px w-10 bg-accent inline-block" />
          <span className="font-inter font-medium text-white/45 uppercase tracking-[0.16em] text-[11px]">
            Il nostro approccio
          </span>
        </motion.div>

        {/* Large quote — GSAP scroll-scrub char reveal */}
        <ScrubQuote
          fontSize="clamp(24px, 4.5vw, 60px)"
          lines={[
            { text: 'Costruire bene non è' },
            { text: 'una scelta — è un dovere', italic: true, accent: true },
            { text: 'verso chi ci abita.' },
          ]}
        />

        {/* Animated rule */}
        <motion.div
          style={{ width: lineWidth }}
          className="h-px bg-accent/60 mt-10 mb-0"
        />
      </div>

      {/* ── Numbers band ── */}
      <div className="relative z-10 border-t border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { n: '40+', label: 'Anni di attività', since: 'Dal 1985' },
              { n: '100+', label: 'Abitazioni consegnate', since: 'Parma e Provincia' },
              { n: '6', label: 'Zone operative', since: 'Parma · Collecchio' },
              { n: '0', label: 'Intermediari', since: 'Vendita diretta' },
            ].map((item, i) => (
              <motion.div
                key={item.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.09, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`py-8 md:py-10 px-3 md:px-6 flex flex-col gap-1.5 ${i > 0 ? 'border-l border-white/8' : ''} ${i >= 2 ? 'border-t border-white/8 md:border-t-0' : ''}`}
              >
                <span
                  className="font-mono font-semibold text-white count-up"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}
                >
                  {item.n}
                </span>
                <span className="font-inter text-white/60 text-sm">{item.label}</span>
                <span className="font-inter text-white/28 text-[10px] uppercase tracking-[0.12em]">{item.since}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Three pillars ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {pillars.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-start gap-4">
                <span className="font-mono text-accent/60 text-xs tracking-widest mt-1 flex-shrink-0">{p.num}</span>
                <div className="h-px flex-1 bg-white/10 mt-2.5" />
              </div>
              <h3 className="font-playfair font-bold text-white text-xl md:text-2xl leading-snug">
                {p.title}
              </h3>
              <p className="text-white/50 text-sm leading-7 font-light">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  )
}
