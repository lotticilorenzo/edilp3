import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Star } from '@phosphor-icons/react/dist/ssr'
import { realizzazioni } from '@/data/realizzazioni'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { formatZona } from '@/lib/utils'
import { CtaSection } from '@/components/sections/CtaSection'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'

// Static content — revalidate monthly
export const revalidate = 2592000

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return realizzazioni.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const r = realizzazioni.find((x) => x.slug === params.slug)
  if (!r) return {}
  return buildMetadata({
    title: `${r.nome} — Realizzazione Edil P.3 ${r.annoCompletamento}`,
    description: `${r.nome}: ${r.tipologia} completato nel ${r.annoCompletamento} a ${r.zona.replace(/-/g, ' ')}${r.nrUnita ? `, ${r.nrUnita} unità` : ''}. ${r.descrizione.slice(0, 120)}...`,
    canonical: `/realizzazioni/${r.slug}`,
    openGraph: {
      type: 'website',
      title: r.nome,
      description: r.descrizione,
      images: r.copertina ? [{ url: r.copertina, width: 1400, height: 900, alt: r.nome }] : undefined,
    },
  })
}

export default function RealizzazionePage({ params }: Props) {
  const r = realizzazioni.find((x) => x.slug === params.slug)
  if (!r) notFound()

  const others = realizzazioni.filter((x) => x.id !== r.id).slice(0, 2)

  const breadcrumb = breadcrumbJsonLd([
    { name: 'Home', href: '/' },
    { name: 'Realizzazioni', href: '/realizzazioni' },
    { name: r.nome },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {/* Hero image */}
      <div className="relative min-h-[60vh] md:min-h-[70vh] bg-green flex items-end overflow-hidden">
        <Image
          src={r.copertina}
          alt={`${r.nome} — Realizzazione Edil P.3`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Back link */}
        <div className="absolute top-24 left-0 right-0 max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <Link
            href="/realizzazioni"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            Tutte le realizzazioni
          </Link>
        </div>

        {/* Title block */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-12 pb-12 md:pb-20 w-full">
          <div className="flex items-center gap-2 mb-4 text-white/60">
            <span className="text-xs font-inter font-medium uppercase tracking-widest">
              {formatZona(r.zona)}
            </span>
            <span>·</span>
            <span className="text-xs font-mono">{r.annoCompletamento}</span>
            {r.nrUnita && (
              <>
                <span>·</span>
                <span className="text-xs font-mono">{r.nrUnita} unità</span>
              </>
            )}
          </div>
          <h1
            className="font-playfair font-bold italic text-white"
            style={{ fontSize: 'clamp(28px, 5vw, 60px)' }}
          >
            {r.nome}
          </h1>
          <div className="mt-4 inline-block bg-accent text-white text-xs font-inter font-semibold uppercase tracking-widest px-3 py-1.5" style={{ borderRadius: '2px' }}>
            {r.tipologia}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-14 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

            {/* Main content */}
            <div className="lg:col-span-2 flex flex-col gap-12">

              <div>
                <h2 className="font-playfair font-bold text-2xl md:text-3xl text-green mb-6">
                  Il Progetto
                </h2>
                <p className="text-text-secondary text-base leading-8 max-w-[68ch]">
                  {r.descrizione}
                </p>
              </div>

              {/* Before / After */}
              {r.beforeAfter && (
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-green mb-5">
                    Prima e <span className="italic">dopo</span>
                  </h2>
                  <BeforeAfterSlider
                    before={r.beforeAfter.before}
                    after={r.beforeAfter.after}
                    labelBefore={r.beforeAfter.labelBefore}
                    labelAfter={r.beforeAfter.labelAfter}
                    className="aspect-[16/9] w-full"
                    alt={r.nome}
                  />
                </div>
              )}

              {/* Timeline */}
              {r.timeline && r.timeline.length > 0 && (
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-green mb-8">
                    Cronologia <span className="italic">del cantiere</span>
                  </h2>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-3.5 top-0 bottom-0 w-px bg-border" />

                    <div className="flex flex-col gap-0">
                      {r.timeline.map((entry, i) => (
                        <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
                          {/* Dot */}
                          <div className="flex-shrink-0 relative z-10">
                            <div
                              className={`w-7 h-7 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                                entry.milestone
                                  ? 'bg-accent border-accent'
                                  : 'bg-white border-border'
                              }`}
                            >
                              {entry.milestone ? (
                                <Star size={12} weight="fill" className="text-white" />
                              ) : (
                                <div className="w-2 h-2 rounded-full bg-border-hover" />
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pb-2">
                            <p className="font-mono text-[10px] text-text-muted uppercase tracking-wider mb-1">
                              {entry.mese}
                            </p>
                            <h3 className="font-inter font-semibold text-base text-text-primary mb-2">
                              {entry.titolo}
                            </h3>
                            {entry.descrizione && (
                              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                {entry.descrizione}
                              </p>
                            )}
                            {entry.immagine && (
                              <div
                                className="relative aspect-[16/9] overflow-hidden"
                                style={{ borderRadius: '4px', maxWidth: '480px' }}
                              >
                                <Image
                                  src={entry.immagine}
                                  alt={`${r.nome} — ${entry.titolo}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 480px"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Gallery */}
              {r.images.length > 1 && (
                <div>
                  <h2 className="font-playfair font-bold text-2xl text-green mb-5">Galleria</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {r.images.slice(1).map((img, i) => (
                      <div key={i} className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: '4px' }}>
                        <Image
                          src={img}
                          alt={`${r.nome} — foto ${i + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 flex flex-col gap-6">

                {/* Characteristics */}
                <div className="border border-border p-6 md:p-7" style={{ borderRadius: '4px' }}>
                  <h3 className="font-inter font-semibold text-sm uppercase tracking-widest text-text-muted mb-5">
                    Caratteristiche
                  </h3>
                  <ul className="flex flex-col gap-3">
                    {r.caratteristiche.map((c) => (
                      <li key={c} className="flex items-start gap-3 text-sm text-text-secondary">
                        <CheckCircle size={16} weight="fill" className="text-green-mid flex-shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Project info */}
                <div className="bg-green text-white p-6 md:p-7" style={{ borderRadius: '4px' }}>
                  <h3 className="font-inter font-semibold text-xs uppercase tracking-widest text-white/50 mb-5">
                    Dati Progetto
                  </h3>
                  <dl className="flex flex-col gap-4">
                    {[
                      { label: 'Zona', value: formatZona(r.zona) },
                      { label: 'Tipologia', value: r.tipologia },
                      { label: 'Anno di completamento', value: String(r.annoCompletamento) },
                      ...(r.nrUnita ? [{ label: 'Unità abitative', value: String(r.nrUnita) }] : []),
                    ].map((d) => (
                      <div key={d.label} className="flex justify-between items-baseline border-b border-white/10 pb-3 last:border-0">
                        <dt className="text-white/50 text-xs uppercase tracking-wider">{d.label}</dt>
                        <dd className="font-mono text-white text-sm">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <Link
                  href="/contatti"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium py-3.5 transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  Richiedi informazioni
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section className="py-16 md:py-20 section-alt border-t border-border">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-12">
            <h2 className="font-playfair font-bold text-2xl text-green mb-8">
              Altri <span className="italic">Progetti</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {others.map((o) => (
                <Link key={o.id} href={`/realizzazioni/${o.slug}`} className="block group">
                  <div className="aspect-[16/9] relative overflow-hidden" style={{ borderRadius: '4px' }}>
                    <Image
                      src={o.copertina}
                      alt={o.nome}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <p className="text-xs font-inter font-medium text-white/60 uppercase tracking-wider mb-1">
                        {formatZona(o.zona)} · {o.annoCompletamento}
                      </p>
                      <h3 className="font-playfair font-bold text-xl text-white">{o.nome}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  )
}
