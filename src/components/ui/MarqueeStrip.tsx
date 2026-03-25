'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  dark?: boolean
  className?: string
}

const items = [
  'Bioedilizia Certificata',
  'Classe Energetica A4',
  'Antisismica Zona 2',
  'Vendita Diretta',
  '40 Anni di Esperienza',
  '100+ Abitazioni',
  'Zero Intermediari',
  'Parma e Provincia',
  'Isolamento Acustico',
  'Personalizzazione Totale',
]

export function MarqueeStrip({ dark = false, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const repeated = [...items, ...items] // duplicate for seamless loop

  // Respect prefers-reduced-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced && trackRef.current) {
      trackRef.current.style.animation = 'none'
    }
  }, [])

  return (
    <div
      className={cn(
        'overflow-hidden border-y py-3.5 relative',
        dark
          ? 'bg-green border-white/10'
          : 'bg-bg-alt border-border',
        className
      )}
      aria-hidden="true"
    >
      <div ref={trackRef} className="marquee-track select-none">
        {repeated.map((item, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex items-center gap-5 mx-5 text-[11px] font-inter font-medium uppercase tracking-[0.14em] whitespace-nowrap',
              dark ? 'text-white/40' : 'text-text-muted'
            )}
          >
            {item}
            <span className={cn('w-1 h-1 rounded-full flex-shrink-0', dark ? 'bg-accent' : 'bg-accent/60')} />
          </span>
        ))}
      </div>
    </div>
  )
}
