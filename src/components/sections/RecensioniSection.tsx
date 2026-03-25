'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react'
import { recensioni } from '@/data/recensioni'
import { viewportOnce } from '@/lib/animations'

/* Google "G" icon inline SVG */
function GoogleIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

const AVATAR_COLORS = [
  '#1C2B1A', '#C0392B', '#4A7C3F', '#8B7355', '#B8962E', '#6B7280',
]

export function RecensioniSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  const scroll = useCallback((dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' })
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (isHovered) {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current)
      return
    }
    autoScrollRef.current = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        el.scrollBy({ left: 340, behavior: 'smooth' })
      }
    }, 5000)
    return () => { if (autoScrollRef.current) clearInterval(autoScrollRef.current) }
  }, [isHovered])

  return (
    <section className="py-16 sm:py-20 md:py-28 section-alt border-t border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              Chi ha scelto Edil P.3
            </p>
            <h2 className="font-playfair font-bold text-green" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
              Cosa <span className="italic">dicono di noi</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            className="flex flex-col items-start md:items-end gap-2"
          >
            {/* Google aggregate */}
            <div className="flex items-center gap-3 bg-white border border-border px-4 py-2.5" style={{ borderRadius: '4px' }}>
              <GoogleIcon size={20} />
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={15} className="text-[#FBBC05]" />)}
              </div>
              <span className="font-mono font-semibold text-sm text-text-primary">5.0</span>
              <span className="text-text-muted text-xs">· {recensioni.length} recensioni</span>
            </div>

            {/* Arrow controls */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Recensione precedente"
                className="border border-border hover:border-accent text-text-secondary hover:text-accent p-2.5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                style={{ borderRadius: '2px' }}
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Recensione successiva"
                className="border border-border hover:border-accent text-text-secondary hover:text-accent p-2.5 transition-all disabled:opacity-30 disabled:pointer-events-none"
                style={{ borderRadius: '2px' }}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scrollable cards */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-none pb-2 -mx-5 px-5 sm:-mx-6 sm:px-6 md:-mx-12 md:px-12 scroll-smooth scroll-x-mobile"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {recensioni.map((rec, i) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
              className="flex-shrink-0 bg-white border border-border p-5 md:p-6 flex flex-col gap-4 md:gap-5 hover:shadow-md hover:border-border-hover transition-all duration-300"
              style={{ width: 'clamp(280px, 78vw, 320px)', borderRadius: '4px' }}
            >
              {/* Top row: Google + stars */}
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(rec.stelle)].map((_, s) => (
                    <Star key={s} weight="fill" size={14} className="text-[#FBBC05]" />
                  ))}
                </div>
                <GoogleIcon size={16} />
              </div>

              {/* Quote */}
              <div className="relative flex-1">
                <Quotes size={20} weight="fill" className="text-border mb-2" />
                <p className="text-text-secondary text-sm leading-7 line-clamp-5">
                  {rec.testo}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white font-inter font-semibold text-sm"
                  style={{ backgroundColor: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                >
                  {rec.nome[0]}
                </div>
                <div>
                  <p className="font-inter font-semibold text-text-primary text-sm">{rec.nome}</p>
                  <p className="text-text-muted text-xs">{rec.data}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* "Vedi su Google" card */}
          <div
            className="flex-shrink-0 bg-white border border-dashed border-border p-6 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-border-hover transition-colors"
            style={{ width: '220px', borderRadius: '4px' }}
          >
            <GoogleIcon size={32} />
            <div className="text-center">
              <p className="font-inter font-medium text-sm text-text-primary mb-1">Vedi su Google</p>
              <div className="flex justify-center gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} weight="fill" size={13} className="text-[#FBBC05]" />)}
              </div>
              <p className="text-text-muted text-xs">Tutte le {recensioni.length} recensioni</p>
            </div>
          </div>
        </div>

        {/* Featured quote highlight */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-10 md:mt-12 bg-green p-6 sm:p-8 md:p-12 flex flex-col md:flex-row gap-5 md:gap-6 items-start md:items-center"
          style={{ borderRadius: '4px' }}
        >
          <Quotes size={36} weight="fill" className="text-accent flex-shrink-0" />
          <div className="flex-1">
            <p className="font-playfair italic text-white text-lg md:text-xl leading-relaxed mb-3">
              &ldquo;Siamo alla seconda casa acquistata con Edil P.3. La prima esperienza era stata così positiva che non abbiamo avuto dubbi nel tornare da loro.&rdquo;
            </p>
            <p className="font-inter font-medium text-white/60 text-sm">
              Luigi e Carla Fontana · Novembre 2022 · Google ★★★★★
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
