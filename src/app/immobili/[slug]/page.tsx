import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, Bed, Bathtub, ArrowsOut, Lightning, ShieldCheck, Leaf,
  CheckCircle, Elevator, Car
} from '@phosphor-icons/react/dist/ssr'
import { immobili } from '@/data/immobili'
import { buildMetadata, immobileJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { formatZona, formatPrice, formatMq, classeColor } from '@/lib/utils'
import { ContactForm } from '@/components/forms/ContactForm'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { CantierProgress } from '@/components/ui/CantierProgress'
import { PiantaViewer } from '@/components/ui/PiantaViewer'

// Revalidate every 30 minutes — price/state can change
export const revalidate = 1800

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return immobili.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const i = immobili.find((x) => x.slug === params.slug)
  if (!i) return {}
  const prezzoStr = i.prezzo ? ` — € ${i.prezzo.toLocaleString('it-IT')}` : ''
  return buildMetadata({
    title: `${i.titolo} — ${i.tipologia} a ${i.zona.replace(/-/g, ' ')} Parma`,
    description: `${i.titolo}${prezzoStr}. ${i.metratura} m², ${i.camere} camere, ${i.bagni} bagni. Classe energetica ${i.classeEnergetica}. ${i.descrizione.slice(0, 120)}...`,
    canonical: `/immobili/${i.slug}`,
    openGraph: {
      type: 'website',
      title: i.titolo,
      description: i.descrizione,
      images: i.images[0] ? [{ url: i.images[0], width: 1200, height: 800, alt: i.titolo }] : undefined,
    },
  })
}

const statoLabel = {
  disponibile: { label: 'Disponibile', color: 'bg-green-mid' },
  'in-costruzione': { label: 'In Costruzione', color: 'bg-gold' },
  venduto: { label: 'Venduto', color: 'bg-text-secondary' },
}

export default function ImmobilePage({ params }: Props) {
  const item = immobili.find((x) => x.slug === params.slug)
  if (!item) notFound()

  const stato = statoLabel[item.stato]
  const similar = immobili
    .filter((i) => i.id !== item.id && i.stato !== 'venduto')
    .slice(0, 2)

  const jsonLd = immobileJsonLd(item)
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Abitazioni', href: '/immobili' },
    { name: item.titolo },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero Image */}
      <div className="relative bg-green overflow-hidden" style={{ minHeight: '65vh' }}>
        {item.images[0] && (
          <Image
            src={item.images[0]}
            alt={`${item.titolo} — Edil P.3`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

        {/* Back */}
        <div className="absolute top-24 left-0 right-0 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <Link
            href="/immobili"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Tutti gli immobili
          </Link>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-10 md:pb-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={`text-white text-xs font-inter font-semibold uppercase tracking-wider px-2.5 py-1 ${stato.color}`}
              style={{ borderRadius: '2px' }}
            >
              {stato.label}
            </span>
            {item.badge && item.badge !== 'Venduto' && (
              <span className="bg-accent text-white text-xs font-inter font-semibold uppercase tracking-wider px-2.5 py-1" style={{ borderRadius: '2px' }}>
                {item.badge}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-white/60 mb-3">
            <span className="text-xs font-inter font-medium uppercase tracking-widest">
              {formatZona(item.zona)}
            </span>
            <span>·</span>
            <span className="text-xs font-inter uppercase tracking-wider">{item.tipologia}</span>
          </div>
          <h1
            className="font-playfair font-bold italic text-white leading-tight"
            style={{ fontSize: 'clamp(26px, 4.5vw, 54px)' }}
          >
            {item.titolo}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-12">

              {/* Quick specs */}
              <div className="grid grid-cols-3 gap-px bg-border" style={{ borderRadius: '4px' }}>
                {[
                  { Icon: ArrowsOut, label: 'Metratura', value: formatMq(item.metratura) },
                  { Icon: Bed, label: 'Camere', value: String(item.camere) },
                  { Icon: Bathtub, label: 'Bagni', value: String(item.bagni) },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="bg-surface px-4 py-5 flex flex-col items-center text-center gap-1.5">
                    <Icon size={22} className="text-text-muted" />
                    <span className="font-mono font-medium text-xl text-text-primary">{value}</span>
                    <span className="text-xs text-text-muted uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-playfair font-bold text-2xl text-green mb-5">Descrizione</h2>
                <p className="text-text-secondary text-base leading-8 max-w-[68ch]">{item.descrizione}</p>

                {item.indirizzo && (
                  <p className="mt-5 text-sm text-text-muted flex items-center gap-2">
                    <span className="font-semibold text-text-secondary">Indirizzo:</span>
                    {item.indirizzo}
                  </p>
                )}
                {item.dataConsegna && (
                  <p className="mt-2 text-sm text-text-muted">
                    <span className="font-semibold text-text-secondary">Consegna prevista:</span>{' '}
                    {item.dataConsegna}
                  </p>
                )}
              </div>

              {/* Before / After slider */}
              {item.beforeAfter && (
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-green mb-5">
                    Dal cantiere <span className="italic">alle chiavi</span>
                  </h2>
                  <BeforeAfterSlider
                    before={item.beforeAfter.before}
                    after={item.beforeAfter.after}
                    labelBefore={item.beforeAfter.labelBefore}
                    labelAfter={item.beforeAfter.labelAfter}
                    className="aspect-[16/9] w-full"
                    alt={item.titolo}
                  />
                </div>
              )}

              {/* Construction progress */}
              {item.fasiCantiere && item.fasiCantiere.length > 0 && (
                <div className="border border-border p-6 md:p-7" style={{ borderRadius: '4px' }}>
                  <CantierProgress
                    fasi={item.fasiCantiere}
                    dataConsegna={item.dataConsegna}
                  />
                </div>
              )}

              {/* Features */}
              <div>
                <h2 className="font-playfair font-bold text-2xl text-green mb-5">Dotazioni</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.caratteristiche.map((c) => (
                    <div key={c} className="flex items-start gap-3 text-sm text-text-secondary">
                      <CheckCircle size={16} weight="fill" className="text-green-mid flex-shrink-0 mt-0.5" />
                      {c}
                    </div>
                  ))}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3">
                {item.bioedilizia && (
                  <div className="flex items-center gap-2 bg-green-light text-green px-4 py-2.5 text-sm font-medium" style={{ borderRadius: '2px' }}>
                    <Leaf size={16} weight="fill" />
                    Bioedilizia
                  </div>
                )}
                {item.antisismica && (
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2.5 text-sm font-medium" style={{ borderRadius: '2px' }}>
                    <ShieldCheck size={16} weight="fill" />
                    Antisismica
                  </div>
                )}
                <div
                  className="flex items-center gap-2 text-white px-4 py-2.5 text-sm font-medium"
                  style={{ backgroundColor: classeColor(item.classeEnergetica), borderRadius: '2px' }}
                >
                  <Lightning size={16} weight="fill" />
                  Classe {item.classeEnergetica}
                </div>
                {item.piano !== undefined && (
                  <div className="flex items-center gap-2 bg-surface border border-border text-text-secondary px-4 py-2.5 text-sm" style={{ borderRadius: '2px' }}>
                    <Elevator size={16} />
                    {item.piano === 0 ? 'Piano terra' : `Piano ${item.piano}`}
                  </div>
                )}
              </div>

              {/* Gallery */}
              {item.images.length > 1 && (
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-green mb-5">Galleria</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {item.images.slice(1).map((img, i) => (
                      <div key={i} className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: '4px' }}>
                        <Image
                          src={img}
                          alt={`${item.titolo} — foto ${i + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 30vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 flex flex-col gap-5">

                {/* Price card */}
                <div className="border border-border p-6" style={{ borderRadius: '4px' }}>
                  <p className="text-xs font-inter font-medium uppercase tracking-widest text-text-muted mb-2">
                    Prezzo
                  </p>
                  <p className={`font-mono font-medium ${item.prezzo ? 'text-3xl text-text-primary' : 'text-lg italic text-text-secondary'}`}>
                    {formatPrice(item.prezzo)}
                  </p>
                  <p className="text-xs text-text-muted mt-2">
                    Vendita diretta — nessuna provvigione di agenzia
                  </p>
                  {item.prezzo && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-text-muted flex items-center gap-1.5">
                        <Car size={13} />
                        Box auto e cantina disponibili separatamente
                      </p>
                    </div>
                  )}
                </div>

                {/* Floor plan viewer */}
                <PiantaViewer titolo={item.titolo} />

                {/* Contact form */}
                <div className="border border-border p-6" style={{ borderRadius: '4px' }}>
                  <h3 className="font-playfair font-bold text-xl text-green mb-1">
                    Richiedi informazioni
                  </h3>
                  <p className="text-sm text-text-secondary mb-6">
                    Ti risponderemo entro 24 ore.
                  </p>
                  <ContactForm defaultImmobile={item.slug} />
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar */}
      {similar.length > 0 && (
        <section className="py-16 section-alt border-t border-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
            <h2 className="font-playfair font-bold text-2xl text-green mb-8">
              Potrebbe interessarti
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {similar.map((s) => (
                <Link key={s.id} href={`/immobili/${s.slug}`} className="group block border border-border hover:border-border-hover overflow-hidden transition-colors bg-white" style={{ borderRadius: '4px' }}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={s.images[0]}
                      alt={s.titolo}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-2">{formatZona(s.zona)} · {s.tipologia}</p>
                    <h3 className="font-playfair font-bold text-lg text-text-primary group-hover:text-accent transition-colors">{s.titolo}</h3>
                    <p className="font-mono text-sm mt-2 text-text-secondary">{formatPrice(s.prezzo)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
