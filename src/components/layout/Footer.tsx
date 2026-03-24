'use client'

import Link from 'next/link'
import { Phone, EnvelopeSimple, MapPin } from '@phosphor-icons/react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-green pt-16 pb-8 text-white/80">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-12">
        
        {/* Brand */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="font-playfair text-3xl font-bold text-white">
            Edil P.3 Srl
          </Link>
          <p className="text-sm leading-relaxed max-w-sm">
            Impresa edile di Collecchio con 40 anni di esperienza nel parmense. Costruiamo e vendiamo direttamente residenze di qualità, focalizzandoci su antisismica e bioedilizia.
          </p>
        </div>

        {/* Links */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-inter font-semibold text-white uppercase tracking-wider text-sm mb-2">Navigazione</h4>
          <Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link>
          <Link href="/realizzazioni" className="hover:text-white transition-colors">Realizzazioni</Link>
          <Link href="/immobili" className="hover:text-white transition-colors">Immobili Disponibili</Link>
          <Link href="/dove-costruiamo" className="hover:text-white transition-colors">Zone</Link>
          <Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link>
        </div>

        {/* Contacts */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-inter font-semibold text-white uppercase tracking-wider text-sm mb-2">Contatti</h4>
          <a href="https://maps.google.com/?q=Via+del+Giardinetto+6/L,+43044+Collecchio+(PR)" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 hover:text-white transition-colors">
            <MapPin size={20} className="shrink-0 mt-0.5 text-accent" />
            <span className="text-sm">Via del Giardinetto 6/L<br/>43044 Collecchio (PR), Italia</span>
          </a>
          <a href="tel:+390521831434" className="flex items-center gap-3 hover:text-white transition-colors">
            <Phone size={20} className="shrink-0 text-accent" />
            <span className="text-sm">0521 831434 (Ufficio)</span>
          </a>
          <a href="tel:+393396499106" className="flex items-center gap-3 hover:text-white transition-colors">
            <Phone size={20} className="shrink-0 text-accent" />
            <span className="text-sm">339 6499106 (Mobile)</span>
          </a>
          <a href="mailto:info@caseaparmaedilp3.it" className="flex items-center gap-3 hover:text-white transition-colors">
            <EnvelopeSimple size={20} className="shrink-0 text-accent" />
            <span className="text-sm">info@caseaparmaedilp3.it</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
        <div>&copy; {currentYear} Edil P.3 Srl - P.IVA 02136610348</div>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  )
}
