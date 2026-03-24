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
      initial={{ opacity: 0, x: 50, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 2 }}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1EB854] text-white px-4 py-3 md:px-5 md:py-4 rounded-full shadow-lg transition-colors group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <WhatsappLogo weight="fill" size={28} />
      <span className="hidden md:block font-medium pr-2 whitespace-nowrap overflow-hidden">
        Scrivici
      </span>
    </motion.a>
  )
}
