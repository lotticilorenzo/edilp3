'use client'

import { motion } from 'framer-motion'
import { WhatsappLogo } from '@phosphor-icons/react'

export function WhatsAppFAB() {
  return (
    <motion.a
      href="https://wa.me/393396499106"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      // On mobile: hide since WhatsApp is in MobileCTABar. On desktop: show normally.
      className="hidden md:flex fixed bottom-8 right-8 z-50 items-center gap-3 bg-[#25D366] hover:bg-[#1EB854] text-white px-5 py-4 rounded-full shadow-lg transition-colors group"
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsappLogo weight="fill" size={28} />
      <span className="font-medium pr-2 whitespace-nowrap overflow-hidden">
        Scrivici
      </span>
    </motion.a>
  )
}
