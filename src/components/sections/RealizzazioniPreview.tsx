'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { realizzazioni } from '@/data/realizzazioni'
import { formatZona } from '@/lib/utils'
import { viewportOnce } from '@/lib/animations'

export function RealizzazioniPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  // GSAP horizontal scroll — desktop only
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ctx: { revert: () => void } | undefined

    const initGsap = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia()

        mm.add('(min-width: 1024px)', () => {
          const section = sectionRef.current
          const track = trackRef.current
          if (!section || !track) return

          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 96)

          gsap.to(track, {
            x: () => getScrollAmount(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${Math.abs(getScrollAmount())}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
        })
      })
    }

    initGsap()
    return () => ctx?.revert()
  }, [])

  // Desktop drag for mobile track
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = mobileScrollRef.current
    if (!el) return
    const startX = e.pageX - el.offsetLeft
    const scrollLeft = el.scrollLeft
    el.style.cursor = 'grabbing'
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX)
    }
    const onUp = () => {
      el.style.cursor = 'grab'
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  const cards = realizzazioni.map((r, i) => (
    <div
      key={r.id}
      className="flex-shrink-0 group relative overflow-hidden bg-green"
      style={{ width: 'clamp(280px, 78vw, 480px)', aspectRatio: '4/3', borderRadius: '4px' }}
      data-cursor="Scopri"
    >
      <Link href={`/realizzazioni/${r.slug}`} className="absolute inset-0 z-30" aria-label={`Vedi ${r.nome}`} />

      <Image
        src={r.copertina || `https://picsum.photos/seed/edilp3-r${i}/800/600`}
        alt={`${r.nome} — Edil P.3`}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        sizes="(max-width: 768px) 90vw, 42vw"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 z-10 bg-green/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      <div className="absolute top-4 left-4 z-20 bg-accent text-white text-[10px] font-inter font-semibold uppercase tracking-widest px-2.5 py-1 pointer-events-none" style={{ borderRadius: '2px' }}>
        {r.tipologia}
      </div>
      <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-mono px-2.5 py-1 pointer-events-none" style={{ borderRadius: '2px' }}>
        {r.annoCompletamento}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 z-20 pointer-events-none">
        <span className="block text-white/55 text-[10px] font-inter uppercase tracking-widest mb-2">
          {formatZona(r.zona)}{r.nrUnita ? ` · ${r.nrUnita} unità` : ''}
        </span>
        <div className="flex items-end justify-between gap-3">
          <h3 className="font-playfair font-bold text-white text-xl leading-tight">{r.nome}</h3>
          <div className="flex-shrink-0 bg-accent p-1.5 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>
        <p className="text-white/0 group-hover:text-white/50 text-xs leading-5 mt-1.5 line-clamp-2 transition-colors duration-500 font-light">
          {r.descrizione}
        </p>
      </div>

      {/* Index ghost number */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="font-mono text-white/20 text-3xl font-bold">
          {String(i + 1).padStart(2, '0')}
        </span>
      </div>
    </div>
  ))

  const endCard = (
    <div
      key="end"
      className="flex-shrink-0 relative border border-dashed border-border flex flex-col items-center justify-center gap-4 hover:border-accent transition-colors group cursor-pointer"
      style={{ width: 'clamp(160px, 38vw, 192px)', aspectRatio: '4/3', borderRadius: '4px' }}
    >
      <Link href="/realizzazioni" className="absolute inset-0 z-10" aria-label="Tutti i progetti" />
      <div className="w-10 h-10 border border-border group-hover:border-accent flex items-center justify-center transition-colors">
        <ArrowUpRight size={18} className="text-text-muted group-hover:text-accent transition-colors" />
      </div>
      <div className="text-center px-4">
        <p className="font-inter font-medium text-sm text-text-primary mb-1">Tutti i progetti</p>
        <p className="font-mono text-xs text-text-muted">{realizzazioni.length} realizzazioni</p>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 md:py-28 bg-white overflow-hidden">

      {/* Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter font-medium uppercase tracking-[0.14em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Portafoglio progetti
            </p>
            <h2
              className="font-playfair font-bold text-green leading-tight"
              style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
            >
              Le nostre <span className="italic">Realizzazioni</span>
            </h2>
            <p className="mt-3 text-text-secondary text-sm max-w-sm leading-relaxed">
              Oltre 100 abitazioni consegnate. Ogni progetto, un impegno preciso verso chi ci abita.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              href="/realizzazioni"
              className="group inline-flex items-center gap-2.5 text-sm font-medium text-accent hover:text-accent-dark transition-colors border-b border-accent/30 hover:border-accent pb-0.5 whitespace-nowrap"
            >
              Vedi tutti i progetti
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Desktop: GSAP horizontal scroll ── */}
      <div
        ref={trackRef}
        className="hidden lg:flex gap-5 px-12 will-change-transform"
        data-cursor="Esplora"
      >
        {cards}
        {endCard}
      </div>

      {/* ── Mobile / tablet: native drag scroll ── */}
      <div
        ref={mobileScrollRef}
        className="lg:hidden flex gap-4 overflow-x-auto scrollbar-none pb-4 px-5 sm:px-6 scroll-x-mobile"
        style={{ scrollbarWidth: 'none', cursor: 'grab' }}
        onMouseDown={onMouseDown}
      >
        {cards}
        {endCard}
      </div>

      {/* Hint */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 mt-4 flex items-center gap-2">
        <span className="font-inter text-text-muted text-[10px] uppercase tracking-[0.12em] hidden lg:inline">
          Scorri per esplorare →
        </span>
        <span className="font-inter text-text-muted text-[10px] uppercase tracking-[0.12em] lg:hidden">
          ← Scorri per esplorare
        </span>
      </div>

    </section>
  )
}
