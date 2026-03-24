'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import { List, X } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/realizzazioni', label: 'Realizzazioni' },
  { href: '/immobili', label: 'Immobili' },
  { href: '/dove-costruiamo', label: 'Zone' },
]

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 80)
  })

  return (
    <>
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-40px)] max-w-5xl">
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.88)' : 'rgba(255, 255, 255, 0.0)',
            backdropFilter: scrolled ? 'blur(16px) saturate(160%)' : 'blur(0px) saturate(100%)',
            borderColor: scrolled ? 'rgba(232, 229, 222, 0.7)' : 'rgba(232, 229, 222, 0)',
            boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.06)' : 'none'
          }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex items-center justify-between px-6 py-4 rounded-full border border-transparent transition-colors',
            scrolled ? 'border-border' : 'border-border/50 bg-white/50 backdrop-blur-sm'
          )}
        >
          {/* Logo */}
          <Link href="/" className="font-playfair text-xl font-bold text-green flex-shrink-0">
            Edil P.3
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA / Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contatti" 
              className="hidden md:inline-flex bg-accent text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Contattaci
            </Link>
            
            <button 
              className="md:hidden text-text-primary p-2 -mr-2"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Apri menu"
            >
              <List weight="bold" size={24} />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col pt-24 px-6"
          >
            <button 
              className="absolute top-8 right-6 text-text-primary p-2"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Chiudi menu"
            >
              <X weight="bold" size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-playfair font-bold text-green mt-12">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              {links.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contatti" 
                onClick={() => setMobileMenuOpen(false)}
                className="text-accent mt-4"
              >
                Contattaci
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
