'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from 'framer-motion'
import { List, X, Phone } from '@phosphor-icons/react'
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
  const pathname = usePathname()
  const isHome = pathname === '/'

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
  })

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navBackground = scrolled
    ? 'rgba(255,255,255,0.92)'
    : isHome
      ? 'rgba(255,255,255,0)'
      : 'rgba(255,255,255,0.92)'

  const navBorder = scrolled
    ? 'rgba(232,229,222,0.8)'
    : isHome
      ? 'rgba(255,255,255,0)'
      : 'rgba(232,229,222,0.8)'

  const navShadow = (scrolled || !isHome)
    ? '0 4px 32px rgba(0,0,0,0.07), 0 1px 0 rgba(232,229,222,0.5)'
    : 'none'

  const linkColor = (scrolled || !isHome) ? 'text-text-secondary' : 'text-white/85'
  const logoColor = (scrolled || !isHome) ? 'text-green' : 'text-white'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100]">
        <motion.nav
          animate={{
            backgroundColor: navBackground,
            borderBottomColor: navBorder,
            boxShadow: navShadow,
          }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="border-b border-transparent"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">

            {/* Logo */}
            <Link
              href="/"
              className={cn(
                'font-playfair text-xl font-bold tracking-tight flex-shrink-0 transition-colors duration-300',
                logoColor,
                scrolled || !isHome ? 'hover:text-accent' : 'hover:text-white/80'
              )}
            >
              Edil <span className="text-accent">P.3</span>
              <span className="font-inter font-light text-sm ml-1 opacity-70 tracking-widest">Srl</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/')
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-sm font-medium transition-colors duration-300 relative group',
                      isActive
                        ? (scrolled || !isHome) ? 'text-accent' : 'text-white'
                        : linkColor,
                      (scrolled || !isHome) ? 'hover:text-text-primary' : 'hover:text-white'
                    )}
                  >
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      )}
                    />
                  </Link>
                )
              })}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+390521831434"
                className={cn(
                  'hidden lg:flex items-center gap-2 text-sm font-medium transition-colors duration-300',
                  (scrolled || !isHome) ? 'text-text-secondary hover:text-text-primary' : 'text-white/80 hover:text-white'
                )}
              >
                <Phone size={16} />
                <span className="font-mono">0521 831434</span>
              </a>

              <Link
                href="/preventivo"
                className={cn(
                  'hidden lg:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2.5 border transition-colors duration-200',
                  (scrolled || !isHome)
                    ? 'border-border text-text-secondary hover:border-accent hover:text-accent'
                    : 'border-white/25 text-white/80 hover:text-white hover:border-white/50'
                )}
                style={{ borderRadius: '2px' }}
              >
                Preventivo gratuito
              </Link>

              <Link
                href="/contatti"
                className="hidden md:inline-flex items-center bg-accent hover:bg-accent-dark text-white text-sm font-medium px-5 py-2.5 transition-colors duration-200"
                style={{ borderRadius: '2px' }}
              >
                Contattaci
              </Link>

              <button
                className={cn(
                  'md:hidden p-2 -mr-1 transition-colors duration-300',
                  (scrolled || !isHome) ? 'text-text-primary' : 'text-white'
                )}
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Apri menu di navigazione"
              >
                <List weight="regular" size={26} />
              </button>
            </div>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[110] bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[min(320px,88vw)] bg-white flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <span className="font-playfair font-bold text-lg text-green">
                  Edil <span className="text-accent">P.3</span>
                </span>
                <button
                  className="text-text-primary p-2 -mr-1"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Chiudi menu"
                >
                  <X weight="regular" size={26} />
                </button>
              </div>

              <nav className="flex flex-col flex-1 px-5 sm:px-6 pt-6 pb-6 gap-1 overflow-y-auto" style={{ paddingBottom: 'max(24px, env(safe-area-inset-bottom))' }}>
                {[{ href: '/', label: 'Home' }, ...links].map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'flex items-center py-[18px] text-base font-medium border-b border-border transition-colors',
                        isActive ? 'text-accent' : 'text-text-primary hover:text-accent'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}

                <div className="mt-auto pt-8 flex flex-col gap-3">
                  <a
                    href="tel:+390521831434"
                    className="flex items-center gap-3 py-3 text-sm font-medium text-text-secondary"
                  >
                    <Phone size={18} className="text-accent" />
                    <span className="font-mono">0521 831434</span>
                  </a>
                  <Link
                    href="/preventivo"
                    className="w-full bg-green hover:bg-[#152013] text-white text-sm font-medium py-3.5 text-center transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Preventivo gratuito
                  </Link>
                  <Link
                    href="/contatti"
                    className="w-full bg-accent hover:bg-accent-dark text-white text-sm font-medium py-3.5 text-center transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    Contattaci
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
