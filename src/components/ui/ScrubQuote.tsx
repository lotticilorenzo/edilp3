'use client'

import { useEffect, useRef } from 'react'

interface Line {
  text: string
  italic?: boolean
  accent?: boolean
}

interface Props {
  lines: Line[]
  fontSize?: string
}

/**
 * GSAP-only scroll-scrub quote reveal.
 * Each character fades from 0.08 → 1 tied to scroll progress.
 * Isolated from Framer Motion to respect the "no mixing" rule.
 */
export function ScrubQuote({ lines, fontSize = 'clamp(24px, 4.5vw, 60px)' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Show text immediately, no animation
      if (containerRef.current) {
        containerRef.current.querySelectorAll<HTMLSpanElement>('.scrub-char').forEach((s) => {
          s.style.opacity = '1'
        })
      }
      return
    }

    let ctx: { revert: () => void } | undefined

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        const chars = containerRef.current?.querySelectorAll<HTMLSpanElement>('.scrub-char')
        if (!chars || chars.length === 0) return

        gsap.fromTo(
          chars,
          { opacity: 0.08 },
          {
            opacity: 1,
            stagger: 0.012,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 40%',
              scrub: 1,
            },
          }
        )
      }, containerRef)
    }

    init()

    return () => ctx?.revert()
  }, [])

  return (
    <div ref={containerRef} className="font-playfair font-bold text-white leading-[1.06] max-w-5xl">
      {lines.map((line, li) => (
        <div key={li} style={{ display: 'block' }}>
          {Array.from(line.text).map((char, ci) => (
            <span
              key={ci}
              className={`scrub-char inline-block${char === ' ' ? ' w-[0.28em]' : ''}${line.italic ? ' italic' : ''}${line.accent ? ' text-accent' : ''}`}
              style={{ opacity: 0.08, fontSize }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
