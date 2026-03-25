'use client'

import { motion } from 'framer-motion'
import { Phone, WhatsappLogo, ClipboardText } from '@phosphor-icons/react'
import Link from 'next/link'

export function MobileCTABar() {
  return (
    <motion.div
      className="mobile-cta-bar md:hidden"
      initial={{ y: 80 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.8, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex border-t border-border bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">

        {/* Chiama */}
        <a
          href="tel:+390521831434"
          className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 text-text-secondary hover:text-accent active:bg-bg-alt transition-colors"
          aria-label="Chiama Edil P.3"
        >
          <Phone size={21} weight="fill" />
          <span className="text-[9px] font-inter font-semibold uppercase tracking-[0.1em]">Chiama</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-border self-stretch my-2" />

        {/* WhatsApp */}
        <a
          href="https://wa.me/393396499106"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 text-[#25D366] hover:text-[#1EB854] active:bg-bg-alt transition-colors"
          aria-label="Contatta su WhatsApp"
        >
          <WhatsappLogo size={21} weight="fill" />
          <span className="text-[9px] font-inter font-semibold uppercase tracking-[0.1em]">WhatsApp</span>
        </a>

        {/* Divider */}
        <div className="w-px bg-border self-stretch my-2" />

        {/* Preventivo */}
        <Link
          href="/preventivo"
          className="flex-1 flex flex-col items-center justify-center gap-1.5 py-3 bg-accent hover:bg-accent-dark text-white transition-colors"
          aria-label="Richiedi preventivo gratuito"
        >
          <ClipboardText size={21} weight="fill" />
          <span className="text-[9px] font-inter font-semibold uppercase tracking-[0.1em]">Preventivo</span>
        </Link>

      </div>
    </motion.div>
  )
}
