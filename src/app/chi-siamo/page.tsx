import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import { buildMetadata } from '@/lib/seo'
import { PageHero } from '@/components/ui/PageHero'
import { CtaSection } from '@/components/sections/CtaSection'

export const metadata: Metadata = buildMetadata({
  title: 'Chi Siamo — Impresa Edile Collecchio dal 1985',
  description:
    'Edil P.3 Srl: impresa edile fondata nel 1985 a Collecchio (Parma). 40 anni di costruzioni residenziali a Parma e provincia. Bioedilizia, Classe A, struttura antisismica. Vendita diretta.',
  canonical: '/chi-siamo',
})

const valori = [
  {
    numero: '01',
    titolo: 'Qualità costruttiva',
    testo:
      'Ogni progetto viene realizzato con materiali di prima scelta, isolamenti certificati e tecniche costruttive che garantiscono comfort e risparmio per decenni.',
  },
  {
    numero: '02',
    titolo: 'Trasparenza totale',
    testo:
      'Vendiamo direttamente noi. Nessuna agenzia, nessuna intermediazione. Parli con chi ha posato i mattoni: sai esattamente cosa stai comprando.',
  },
  {
    numero: '03',
    titolo: 'Impegno nel tempo',
    testo:
      'Non consegniamo le chiavi e scomariamo. Siamo presenti anche dopo il rogito per qualsiasi necessità. 40 anni di reputazione non si costruiscono altrimenti.',
  },
]

const timeline = [
  { anno: '1985', evento: 'Fondazione a Collecchio (PR). Primi interventi residenziali nel parmense.' },
  { anno: '1995', evento: 'Espansione nelle zone di Parma città: Eurosia, Via Schubert, Corcagnano.' },
  { anno: '2005', evento: 'Avvio della specializzazione in bioedilizia. Materiali naturali e certificati.' },
  { anno: '2012', evento: 'Adozione degli standard Classe A su tutti i nuovi progetti.' },
  { anno: '2018', evento: 'Certificazione antisismica Zona 2 per l\'intera produzione.' },
  { anno: '2023', evento: 'Completamento "Residenza I Tigli". Superata quota 100 abitazioni consegnate.' },
]

export default function ChiSiamoPage() {
  return (
    <>
      <PageHero
        eyebrow="Edil P.3 Srl · dal 1985"
        title="Chi"
        titleItalic="Siamo"
        subtitle="Un'impresa edile a conduzione familiare con 40 anni di presenza nel parmense. Costruiamo abitazioni di qualità e le vendiamo direttamente, senza intermediari."
      />

      {/* Intro / Image section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="max-w-lg">
              <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-accent inline-block" />
                La nostra storia
              </p>
              <h2 className="font-playfair font-bold text-green mb-6" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
                Quarant&rsquo;anni<br />
                <span className="italic">a Parma.</span>
              </h2>
              <div className="flex flex-col gap-5 text-text-secondary text-sm md:text-base leading-7">
                <p>
                  Edil P.3 Srl nasce nel 1985 a Collecchio, provincia di Parma. Da allora abbiamo costruito e consegnato oltre 100 abitazioni in tutta la provincia, sempre con un approccio diretto e artigianale.
                </p>
                <p>
                  Siamo un&rsquo;impresa di dimensioni contenute — 5-9 persone — e questa è la nostra forza. Ogni cantiere viene seguito direttamente dai titolari. Ogni cliente conosce il nome di chi ha costruito la sua casa.
                </p>
                <p>
                  Ci siamo specializzati in bioedilizia, Classe A e strutture antisismiche perché crediamo che una casa debba durare nel tempo, consumare poco e proteggerti davvero.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5">
                {[
                  { v: '40+', l: 'anni di attività' },
                  { v: '100+', l: 'abitazioni consegnate' },
                  { v: '5/5', l: 'recensioni Google' },
                  { v: '0', l: 'intermediari' },
                ].map((s) => (
                  <div key={s.l} className="border-l-2 border-accent pl-4">
                    <p className="font-mono font-medium text-2xl text-green">{s.v}</p>
                    <p className="text-text-muted text-xs uppercase tracking-wider mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: '4px' }}>
                <Image
                  src="https://picsum.photos/seed/edilp3team/900/700"
                  alt="Team Edil P.3 — Cantiere a Parma"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Accent card */}
              <div className="absolute -bottom-6 -left-6 bg-accent text-white p-5 hidden md:block" style={{ borderRadius: '2px' }}>
                <p className="font-mono font-medium text-3xl">1985</p>
                <p className="font-inter text-white/80 text-xs uppercase tracking-widest mt-1">Anno di fondazione</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valori */}
      <section className="py-20 md:py-28 section-alt border-y border-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              I nostri principi
            </p>
            <h2 className="font-playfair font-bold text-green" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
              I valori che <span className="italic">guidano ogni cantiere</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {valori.map((v) => (
              <div key={v.numero} className="bg-bg-alt p-8 md:p-10 flex flex-col gap-5">
                <span className="font-mono text-text-muted text-3xl font-medium select-none">{v.numero}</span>
                <div>
                  <h3 className="font-playfair font-bold text-xl text-green mb-3">{v.titolo}</h3>
                  <p className="text-text-secondary text-sm leading-7">{v.testo}</p>
                </div>
                <div className="mt-auto pt-5 border-t border-border">
                  <span className="h-px w-8 bg-accent block" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializzazioni */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-text-muted mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-accent inline-block" />
                Le nostre specializzazioni
              </p>
              <h2 className="font-playfair font-bold text-green mb-6" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
                Costruiamo meglio,<br />
                <span className="italic">non solo di più.</span>
              </h2>
              <p className="text-text-secondary text-sm leading-7 mb-8">
                Ogni abitazione Edil P.3 rispetta un set di standard che vanno ben oltre il minimo di legge. Non è marketing: è quello che richiediamo a noi stessi.
              </p>

              <ul className="flex flex-col gap-4">
                {[
                  'Bioedilizia: materiali naturali, pareti traspiranti, massima salubrità degli ambienti',
                  'Classe A4: consumo quasi zero, bollette ridotte fino al 70% rispetto al convenzionale',
                  'Antisismica Zona 2: strutture in c.a. progettate per massima sicurezza',
                  'Isolamento acustico Rw ≥ 56 dB: silenzio garantito tra le unità',
                  'Flessibilità: finiture personalizzabili su richiesta prima della chiusura',
                  'Garanzie post-vendita: assistenza diretta dai costruttori dopo il rogito',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary leading-6">
                    <CheckCircle size={18} weight="fill" className="text-green-mid flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="aspect-[4/3] relative overflow-hidden" style={{ borderRadius: '4px' }}>
                <Image
                  src="https://picsum.photos/seed/edilp3spec/900/680"
                  alt="Dettaglio costruttivo — Edil P.3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square relative overflow-hidden" style={{ borderRadius: '4px' }}>
                  <Image
                    src="https://picsum.photos/seed/edilp3spec2/450/450"
                    alt="Cantiere Edil P.3"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="bg-green p-6 flex flex-col justify-center" style={{ borderRadius: '4px' }}>
                  <p className="font-mono font-medium text-3xl text-white">A4</p>
                  <p className="font-inter text-white/60 text-xs uppercase tracking-widest mt-1">
                    Classe Energetica<br />su ogni progetto
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-green text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14">
            <p className="font-inter font-medium uppercase tracking-[0.12em] text-xs text-white/40 mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-accent inline-block" />
              La nostra storia
            </p>
            <h2 className="font-playfair font-bold" style={{ fontSize: 'clamp(26px, 3vw, 38px)' }}>
              40 anni in <span className="italic">sei tappe</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[52px] top-0 bottom-0 w-px bg-white/15 hidden md:block" />
            <div className="flex flex-col gap-8">
              {timeline.map((t) => (
                <div key={t.anno} className="flex gap-6 md:gap-10 items-start">
                  <div className="flex-shrink-0 w-16 md:w-24 text-right">
                    <span className="font-mono font-medium text-accent text-sm">{t.anno}</span>
                  </div>
                  <div className="relative flex-shrink-0 hidden md:block">
                    <div className="w-2 h-2 rounded-full bg-accent mt-1.5 relative z-10" />
                  </div>
                  <p className="text-white/70 text-sm leading-7 pt-0.5 max-w-lg">{t.evento}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 pt-12 border-t border-white/15 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <p className="font-playfair font-bold text-xl text-white/90 italic max-w-md">
              &ldquo;Costruiamo per chi ci abita, non per chi specola.&rdquo;
            </p>
            <Link
              href="/contatti"
              className="flex items-center gap-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-7 py-3.5 transition-colors"
              style={{ borderRadius: '2px' }}
            >
              Contattaci
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
