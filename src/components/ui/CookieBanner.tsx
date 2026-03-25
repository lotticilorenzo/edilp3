'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from '@phosphor-icons/react'
import Link from 'next/link'

const COOKIE_KEY = 'edilp3_cookie_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_KEY)
    if (!saved) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(COOKIE_KEY, 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-[300] bg-white border-t border-border shadow-2xl cookie-banner"
          style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-4 md:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 md:gap-8">
            <div className="flex items-start gap-3 flex-1">
              <Cookie size={22} className="text-accent flex-shrink-0 mt-0.5" />
              <p className="text-text-secondary text-sm leading-relaxed">
                Utilizziamo cookie tecnici necessari al funzionamento del sito e cookie analitici anonimi per migliorare l&rsquo;esperienza.{' '}
                <Link href="/cookies" className="text-accent hover:underline font-medium">
                  Cookie Policy
                </Link>
                {' '}·{' '}
                <Link href="/privacy" className="text-accent hover:underline font-medium">
                  Privacy Policy
                </Link>
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-shrink-0 self-start sm:self-auto w-full sm:w-auto">
              <button
                onClick={decline}
                className="text-sm text-text-muted hover:text-text-secondary transition-colors px-3 py-2.5 min-h-[44px]"
              >
                Solo necessari
              </button>
              <button
                onClick={accept}
                className="flex-1 sm:flex-none bg-accent hover:bg-accent-dark text-white text-sm font-medium px-5 py-2.5 transition-colors min-h-[44px]"
                style={{ borderRadius: '2px' }}
              >
                Accetta tutti
              </button>
              <button
                onClick={decline}
                aria-label="Chiudi"
                className="text-text-muted hover:text-text-primary p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
