'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-utils'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { viewportOnce } from '@/lib/animations'

const stats = [
  { value: 40, suffix: '+', label: 'Anni di esperienza', desc: 'Dal 1985 nel parmense', note: '1985–oggi' },
  { value: 100, suffix: '+', label: 'Abitazioni consegnate', desc: 'In tutta la provincia', note: 'Parma e Collecchio' },
  { value: 5, suffix: '/5', label: 'Media Google', desc: '6 recensioni verificate', note: '★★★★★' },
  { value: 0, suffix: '', label: 'Intermediari', desc: 'Vendita diretta al cliente', note: 'No agenzie' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const counters = gsap.utils.toArray<HTMLElement>('.stat-number')

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => {
          counters.forEach((counter, i) => {
            const targetValue = stats[i].value
            gsap.fromTo(
              counter,
              { innerHTML: 0 },
              {
                innerHTML: targetValue,
                duration: 2.4,
                ease: 'power3.out',
                snap: { innerHTML: 1 },
              }
            )
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, { scope: containerRef })

  return (
    <section
      ref={containerRef}
      className="relative bg-white border-b border-border overflow-hidden"
    >
      {/* Ghost background text — desktop only */}
      <div
        className="absolute inset-0 items-center pointer-events-none select-none overflow-hidden hidden md:flex"
        aria-hidden
      >
        <span
          className="font-playfair font-bold text-border/50 whitespace-nowrap"
          style={{ fontSize: 'clamp(120px, 16vw, 220px)', lineHeight: 1 }}
        >
          Edil P.3 Srl
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-0 sm:px-0 md:px-0">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="bg-white flex flex-col px-5 sm:px-6 md:px-10 py-10 sm:py-12 md:py-16 relative group"
            >
              {/* Accent hover line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              {/* Number */}
              <div className="flex items-baseline gap-1 mb-4 text-green">
                <span
                  className="stat-number font-mono font-semibold count-up leading-none"
                  style={{ fontSize: 'clamp(48px, 5.5vw, 72px)' }}
                >
                  0
                </span>
                <span
                  className="font-mono font-medium text-accent"
                  style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="font-inter font-semibold text-text-primary text-sm mb-1">
                {stat.label}
              </p>
              <p className="font-inter text-text-muted text-xs leading-5 mb-4">
                {stat.desc}
              </p>

              {/* Tag pill */}
              <span className="inline-flex self-start items-center font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted border border-border px-2 py-0.5">
                {stat.note}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
