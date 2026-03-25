'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * Curtain overlay that wipes down → then retracts up on each route change.
 * The panel is dark green (#1C2B1A) — architectural, premium feel.
 */
export function PageTransitionOverlay() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Skip reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    setShow(true)
    const t = setTimeout(() => setShow(false), 700)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={pathname + '-curtain'}
          aria-hidden="true"
          className="fixed inset-0 z-[998] pointer-events-none"
          style={{ backgroundColor: '#1C2B1A', transformOrigin: 'top' }}
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        />
      )}
    </AnimatePresence>
  )
}
