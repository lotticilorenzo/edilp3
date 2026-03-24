'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap-utils'
import { useGSAP } from '@gsap/react'

const stats = [
  { value: 40, suffix: '+', label: 'ANNI DI ESPERIENZA' },
  { value: 100, suffix: '+', label: 'ABITAZIONI CONSEGNATE' },
  { value: 5, suffix: '/5', label: 'RECENSIONI GOOGLE' },
  { value: 0, suffix: '', label: 'INTERMEDIARI' },
]

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    const counters = gsap.utils.toArray<HTMLElement>('.stat-number')
    
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        counters.forEach((counter, i) => {
          const targetValue = stats[i].value
          gsap.to(counter, {
            innerHTML: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            stagger: 0.1
          })
        })
      }
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className="section-alt py-16 md:py-24 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 divide-x-0 lg:divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center px-4">
              <div className="flex items-baseline text-green mb-2">
                <span className="stat-number font-mono font-medium text-4xl md:text-5xl lg:text-6xl">
                  0
                </span>
                <span className="font-mono font-medium text-3xl md:text-4xl lg:text-5xl">
                  {stat.suffix}
                </span>
              </div>
              <div className="font-inter font-medium text-text-secondary uppercase tracking-[0.08em] text-xs md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
