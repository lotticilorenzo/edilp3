'use client'

import Link from 'next/link'
import { Phone, EnvelopeSimple, MapPin, ArrowUpRight } from '@phosphor-icons/react'

const navLinks = [
  { href: '/chi-siamo', label: 'Chi Siamo' },
  { href: '/realizzazioni', label: 'Realizzazioni' },
  { href: '/immobili', label: 'Immobili Disponibili' },
  { href: '/dove-costruiamo', label: 'Zone di Intervento' },
  { href: '/preventivo', label: 'Preventivo Gratuito' },
  { href: '/contatti', label: 'Contatti' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-green text-white/75">

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-block mb-6">
              <span className="font-playfair font-bold text-3xl text-white">
                Edil <span className="text-accent">P.3</span>
                <span className="font-inter font-light text-base ml-1 opacity-60 tracking-widest">Srl</span>
              </span>
            </Link>
            <p className="text-sm leading-7 max-w-xs mb-8">
              Costruiamo residenze di qualità a Parma e provincia dal 1985. Vendita diretta, senza agenzie.
              Bioedilizia, Classe A, strutture antisismiche.
            </p>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded px-4 py-3 w-fit">
              <span className="text-gold text-sm">★★★★★</span>
              <span className="text-white text-sm font-medium">5/5</span>
              <span className="text-white/50 text-sm">· 6 recensioni Google</span>
            </div>
          </div>

          {/* Nav column */}
          <div className="md:col-span-3 md:ml-auto">
            <h4 className="font-inter font-semibold text-white uppercase tracking-widest text-xs mb-6">
              Navigazione
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts column */}
          <div className="md:col-span-4">
            <h4 className="font-inter font-semibold text-white uppercase tracking-widest text-xs mb-6">
              Contatti
            </h4>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="https://maps.google.com/?q=Via+del+Giardinetto+6/L,+43044+Collecchio+PR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm hover:text-white transition-colors group"
                >
                  <MapPin size={16} className="shrink-0 mt-0.5 text-accent" />
                  <span className="leading-6">
                    Via del Giardinetto 6/L<br />
                    43044 Collecchio (PR)
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+390521831434" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Phone size={16} className="shrink-0 text-accent" />
                  <span>
                    <span className="font-mono">0521 831434</span>
                    <span className="text-white/40 ml-1.5 text-xs">Ufficio</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="tel:+393396499106" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Phone size={16} className="shrink-0 text-accent" />
                  <span>
                    <span className="font-mono">339 6499106</span>
                    <span className="text-white/40 ml-1.5 text-xs">Mobile</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:info@caseaparmaedilp3.it" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <EnvelopeSimple size={16} className="shrink-0 text-accent" />
                  <span>info@caseaparmaedilp3.it</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-xs text-white/40 leading-6">
                P.IVA 02136610348<br />
                Iscrizione CCIAA Parma
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/35">
          <span>© {year} Edil P.3 Srl — Tutti i diritti riservati</span>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white/70 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
