'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap } from '@/lib/gsap-utils'
import { ScrollTrigger } from '@/lib/gsap-utils'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Detect touch device for different settings
    const isTouch = window.matchMedia('(pointer: coarse)').matches

    const lenisInstance = new Lenis({
      // Smooth, linear feel — not too slow, not floaty
      duration: isTouch ? 1.1 : 1.3,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Touch: let native momentum handle it for best feel
      touchMultiplier: isTouch ? 1.8 : 1.5,
      wheelMultiplier: 1.0,
      syncTouch: false,          // native touch inertia on mobile
      syncTouchLerp: 0.075,      // smoothing on touch release
      infinite: false,
      autoRaf: false,            // GSAP drives the RAF loop
    })

    setLenis(lenisInstance)

    // Sync Lenis scroll events → GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update)

    // Drive Lenis from GSAP ticker (single RAF loop, no jank)
    const handleTick = (time: number) => lenisInstance.raf(time * 1000)
    gsap.ticker.add(handleTick)
    gsap.ticker.lagSmoothing(0)  // prevents lag spikes from causing jumps

    return () => {
      lenisInstance.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(handleTick)
      lenisInstance.destroy()
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
