import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { Phone, EnvelopeSimple, MapPin, Clock } from '@phosphor-icons/react/dist/ssr'
import { buildMetadata, localBusinessJsonLd } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { ContactForm } from '@/components/forms/ContactForm'

export const revalidate = false // static — changes only on deploy

export const metadata: Metadata = buildMetadata({
  title: 'Contatti — Edil P.3 Srl Collecchio (Parma)',
  description:
    'Contatta Edil P.3 Srl: Via del Giardinetto 6/L, Collecchio (PR). Tel. 0521 831434. Richiedi informazioni sulle abitazioni disponibili a Parma. Risposta entro 24 ore.',
  canonical: '/contatti',
})

const Map = dynamic(() => import('@/components/sections/MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full skeleton" />,
})

const infoContatti = [
  {
    Icon: MapPin,
    label: 'Sede operativa',
    values: [
      { text: 'Via del Giardinetto 6/L', href: 'https://maps.google.com/?q=Via+del+Giardinetto+6/L+Collecchio+Parma', external: true },
      { text: '43044 Collecchio (PR), Italia', href: 'https://maps.google.com/?q=Via+del+Giardinetto+6/L+Collecchio+Parma', external: true },
    ],
  },
  {
    Icon: Phone,
    label: 'Telefono',
    values: [
      { text: '0521 831434 — Ufficio', href: 'tel:+390521831434', external: false },
      { text: '339 6499106 — Mobile', href: 'tel:+393396499106', external: false },
    ],
  },
  {
    Icon: EnvelopeSimple,
    label: 'Email',
    values: [
      { text: 'info@caseaparmaedilp3.it', href: 'mailto:info@caseaparmaedilp3.it', external: false },
    ],
  },
  {
    Icon: Clock,
    label: 'Orari',
    values: [
      { text: 'Lun–Ven 8:30–12:30 / 14:00–18:00', href: undefined, external: false },
      { text: 'Sabato su appuntamento', href: undefined, external: false },
    ],
  },
]

export default function ContattiPage() {
  const jsonLd = localBusinessJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Parliamo"
        title="Contattaci"
        subtitle="Siamo qui per rispondere a ogni domanda: dalla visita in cantiere alla consulenza sull'acquisto. Scegli come preferisci."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

            {/* Left: info + map */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              <div>
                <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-accent inline-block" />
                  Dove siamo
                </p>

                <ul className="flex flex-col gap-7">
                  {infoContatti.map(({ Icon, label, values }) => (
                    <li key={label} className="flex items-start gap-4">
                      <div className="bg-accent/10 p-2.5 flex-shrink-0 mt-0.5" style={{ borderRadius: '2px' }}>
                        <Icon size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="text-[11px] font-inter font-semibold uppercase tracking-widest text-text-muted mb-1.5">
                          {label}
                        </p>
                        {values.map((v, i) =>
                          v.href ? (
                            <a
                              key={i}
                              href={v.href}
                              target={v.external ? '_blank' : undefined}
                              rel={v.external ? 'noopener noreferrer' : undefined}
                              className="block text-sm text-text-secondary hover:text-text-primary transition-colors leading-6"
                            >
                              {v.text}
                            </a>
                          ) : (
                            <p key={i} className="text-sm text-text-secondary leading-6">{v.text}</p>
                          )
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* P.IVA */}
              <div className="pt-6 border-t border-border">
                <p className="text-xs text-text-muted leading-6">
                  Edil P.3 Srl — P.IVA 02136610348<br />
                  Iscrizione CCIAA Parma
                </p>
              </div>

              {/* Map */}
              <div className="w-full h-56 overflow-hidden border border-border" style={{ borderRadius: '4px' }}>
                <Map />
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="bg-surface border border-border p-8 md:p-10" style={{ borderRadius: '4px' }}>
                <h2 className="font-playfair font-bold text-2xl text-green mb-1">
                  Inviaci un messaggio
                </h2>
                <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                  Compila il modulo e ti risponderemo entro 24 ore lavorative.
                </p>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WhatsApp section */}
      <section className="py-16 bg-green">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
          <p className="font-playfair font-bold text-2xl md:text-3xl text-white mb-3">
            Preferisci WhatsApp?
          </p>
          <p className="text-white/65 text-sm mb-8">
            Scrivici direttamente — rispondiamo durante l&rsquo;orario d&rsquo;ufficio.
          </p>
          <a
            href="https://wa.me/393396499106"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1EB854] text-white px-7 py-3.5 text-sm font-medium transition-colors"
            style={{ borderRadius: '2px' }}
          >
            Apri WhatsApp
          </a>
        </div>
      </section>
    </>
  )
}
