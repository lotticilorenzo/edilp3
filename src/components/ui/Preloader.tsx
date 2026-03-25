'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Preloader() {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState<'count' | 'reveal' | 'exit'>('count')

  useEffect(() => {
    // Skip preloader if already seen in this session
    if (sessionStorage.getItem('edilp3_loaded')) {
      setVisible(false)
      return
    }

    // Count up 0 → 100
    let frame = 0
    const total = 60 // frames at ~16ms = ~1 second
    const interval = setInterval(() => {
      frame++
      setCount(Math.min(100, Math.round((frame / total) * 100)))
      if (frame >= total) {
        clearInterval(interval)
        setPhase('reveal')
        setTimeout(() => {
          setPhase('exit')
          setTimeout(() => {
            setVisible(false)
            sessionStorage.setItem('edilp3_loaded', '1')
          }, 900)
        }, 400)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main dark panel */}
          <motion.div
            className="flex-1 bg-green flex flex-col items-center justify-center relative overflow-hidden"
            animate={phase === 'exit' ? { y: '-100%' } : { y: '0%' }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Logo */}
            <div className="overflow-hidden mb-12">
              <motion.div
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                className="flex items-baseline gap-1"
              >
                <span className="font-playfair font-bold text-white" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
                  Edil
                </span>
                <span className="font-playfair font-bold text-accent" style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}>
                  {' '}P.3
                </span>
                <span className="font-inter font-light text-white/40 text-base ml-1 tracking-widest">Srl</span>
              </motion.div>
            </div>

            {/* Red line reveal */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: `${count}%` }}
              transition={{ ease: 'linear', duration: 0 }}
            />

            {/* Counter */}
            <div className="absolute bottom-8 right-8">
              <span className="font-mono text-white/30 text-sm tabular-nums">
                {String(count).padStart(3, '0')}
              </span>
            </div>

            {/* Left label */}
            <div className="absolute bottom-8 left-8">
              <span className="font-inter text-white/25 text-[10px] uppercase tracking-[0.2em]">
                Caricamento
              </span>
            </div>

            {/* Tagline */}
            <div className="overflow-hidden mt-2">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="font-inter text-white/35 text-xs uppercase tracking-[0.22em] text-center"
              >
                Costruttori dal 1985 · Parma
              </motion.p>
            </div>
          </motion.div>

          {/* White reveal panel */}
          <motion.div
            className="absolute inset-0 bg-white origin-bottom"
            initial={{ scaleY: 0 }}
            animate={phase === 'reveal' || phase === 'exit' ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            style={{ transformOrigin: 'bottom' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
