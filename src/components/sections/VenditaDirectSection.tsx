'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ShieldCheck, Leaf, Handshake, ArrowRight } from '@phosphor-icons/react'
import { viewportOnce } from '@/lib/animations'

const pillars = [
  {
    Icon: Handshake,
    number: '01',
    title: 'Vendita diretta',
    desc: 'Nessuna agenzia. Tratti con chi ha costruito la casa. Il risparmio rimane nella qualità, non nelle commissioni.',
  },
  {
    Icon: Leaf,
    number: '02',
    title: 'Bioedilizia & Classe A',
    desc: 'Isolamenti certificati, materiali naturali, pompe di calore. Bollette ridotte di oltre il 60% rispetto al convenzionale.',
  },
  {
    Icon: ShieldCheck,
    number: '03',
    title: 'Struttura antisismica',
    desc: 'Calcestruzzo armato e acciaio di prima qualità, progettati per resistere al sisma. Costruiamo per le generazioni future.',
  },
]

export function VenditaDirectSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section ref={sectionRef} className="relative bg-green text-white overflow-hidden">

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 lg:min-h-[600px]">

        {/* ── Left: image with parallax ── */}
        <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px] lg:min-h-[600px]">
          <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
            <Image
              src="https://picsum.photos/seed/edilp3-vendita/900/700"
              alt="Cantiere Edil P.3 — costruzione di qualità"
              fill
              className="object-cover opacity-50"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          {/* Dark tint */}
          <div className="absolute inset-0 bg-green/50" />

          {/* Year badge */}
          <div className="absolute bottom-8 left-8 z-10">
            <span className="font-mono text-white/20 font-bold select-none" style={{ fontSize: 'clamp(60px, 8vw, 100px)', lineHeight: 1 }}>
              1985
            </span>
            <p className="font-inter text-white/40 text-xs uppercase tracking-widest -mt-1">
              Anno di fondazione
            </p>
          </div>

          {/* Diagonal accent */}
          <div className="absolute top-0 right-0 w-1 h-full bg-accent opacity-60 hidden lg:block" />
        </div>

        {/* ── Right: text + pillars ── */}
        <div className="px-5 sm:px-8 md:px-12 lg:px-14 py-12 sm:py-14 md:py-20 flex flex-col justify-center">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12"
          >
            <p className="font-inter font-medium uppercase tracking-[0.14em] text-xs text-white/35 mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Il nostro impegno
            </p>
            <h2
              className="font-playfair font-bold leading-tight mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 42px)' }}
            >
              Siamo costruttori,
              <br />
              <span className="italic text-accent">non venditori.</span>
            </h2>
            <p className="text-white/55 text-sm leading-7 max-w-sm">
              Dal 1985 mettiamo la faccia su ogni cantiere. Costruiamo per chi ci abita, non per chi specola. Ogni euro che non paghi di agenzia rimane nella qualità della tua casa.
            </p>
          </motion.div>

          {/* Pillars */}
          <div className="flex flex-col gap-0 divide-y divide-white/8">
            {pillars.map((p, i) => (
              <motion.div
                key={p.number}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="group flex items-start gap-5 py-6 hover:bg-white/3 -mx-4 px-4 transition-colors duration-300 rounded-sm"
              >
                <div className="flex-shrink-0 w-10 h-10 border border-white/12 group-hover:border-accent/50 flex items-center justify-center transition-colors duration-300">
                  <p.Icon size={18} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span className="font-mono text-white/20 text-[10px] tracking-widest">{p.number}</span>
                    <h3 className="font-inter font-semibold text-white text-sm">{p.title}</h3>
                  </div>
                  <p className="text-white/50 text-xs leading-6">{p.desc}</p>
                </div>
                <ArrowRight size={14} className="text-white/20 group-hover:text-accent flex-shrink-0 mt-1 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10"
          >
            <Link
              href="/chi-siamo"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/50 text-white/70 hover:text-white text-sm font-medium px-5 py-2.5 transition-all duration-200"
              style={{ borderRadius: '2px' }}
            >
              Chi siamo
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
