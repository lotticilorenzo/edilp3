import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo'

export const revalidate = false

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — Informativa sul trattamento dei dati',
  description:
    'Informativa sul trattamento dei dati personali di Edil P.3 Srl ai sensi del Regolamento UE 2016/679 (GDPR).',
  canonical: '/privacy',
  robots: { index: false, follow: false },
})

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <div className="bg-green py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <p className="font-inter font-medium uppercase tracking-[0.14em] text-xs text-white/45 mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-accent inline-block" />
            Informativa Privacy
          </p>
          <h1 className="font-playfair font-bold text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
            Privacy Policy
          </h1>
          <p className="text-white/55 text-sm mt-3">
            Aggiornata il 25 marzo 2026 · ai sensi del Regolamento UE 2016/679 (GDPR)
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="prose prose-sm max-w-none text-text-secondary leading-7">

          <Section title="1. Titolare del trattamento">
            <p>
              <strong className="text-text-primary">Edil P.3 Srl</strong><br />
              Via del Giardinetto 6/L, 43044 Collecchio (PR), Italia<br />
              P.IVA: 02136610348<br />
              Email:{' '}
              <a href="mailto:info@caseaparmaedilp3.it" className="text-accent hover:underline">
                info@caseaparmaedilp3.it
              </a>
              <br />
              Tel:{' '}
              <a href="tel:+390521831434" className="text-accent hover:underline">
                0521 831434
              </a>
            </p>
          </Section>

          <Section title="2. Dati raccolti e finalità">
            <p>Raccogliamo i seguenti dati personali per le finalità indicate:</p>
            <table className="w-full border-collapse text-sm mt-4 mb-4">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 pr-4 font-semibold text-text-primary">Dato</th>
                  <th className="text-left py-2 pr-4 font-semibold text-text-primary">Finalità</th>
                  <th className="text-left py-2 font-semibold text-text-primary">Base giuridica</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Nome, cognome, email, telefono', 'Risposta a richieste di contatto e preventivi', 'Art. 6(1)(b) GDPR — esecuzione di misure precontrattuali'],
                  ['Dati di navigazione (IP, browser, pagine visitate)', 'Analisi statistica anonimizzata (Vercel Analytics)', 'Art. 6(1)(f) GDPR — legittimo interesse'],
                  ['Preferenze cookie', 'Memorizzazione del consenso cookie', 'Art. 6(1)(a) GDPR — consenso'],
                ].map(([dato, finalita, base], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 pr-4 align-top">{dato}</td>
                    <td className="py-3 pr-4 align-top">{finalita}</td>
                    <td className="py-3 align-top text-xs">{base}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="3. Cookie">
            <p>
              Utilizziamo esclusivamente cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie analitici di Vercel Analytics per misure statistiche aggregate e anonimizzate.
              Non utilizziamo cookie di profilazione o remarketing di terze parti.
            </p>
            <p className="mt-3">
              Puoi gestire o revocare il tuo consenso ai cookie in qualsiasi momento tramite il banner cookie presente in fondo alla pagina, o svuotando i dati di navigazione del tuo browser.
            </p>
          </Section>

          <Section title="4. Conservazione dei dati">
            <p>
              I dati raccolti tramite il modulo di contatto sono conservati per il tempo strettamente necessario a gestire la richiesta e comunque non oltre <strong>24 mesi</strong> dall&apos;ultima interazione.
              I dati di navigazione aggregati sono conservati per <strong>90 giorni</strong>.
            </p>
          </Section>

          <Section title="5. Condivisione con terze parti">
            <p>I dati personali non vengono venduti né ceduti a terzi. Possono essere condivisi esclusivamente con:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Vercel Inc.</strong> — hosting e analytics (server in EU)</li>
              <li><strong>Anthropic PBC</strong> — elaborazione messaggi inviati all&apos;assistente virtuale (non viene trasmessa alcuna informazione identificativa)</li>
            </ul>
            <p className="mt-3">
              Tutte le aziende terze sono soggette ad accordi di trattamento dati (DPA) conformi al GDPR.
            </p>
          </Section>

          <Section title="6. I tuoi diritti">
            <p>Ai sensi del GDPR (artt. 15-22) hai diritto di:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Accesso</strong> — ricevere copia dei dati che ti riguardano</li>
              <li><strong>Rettifica</strong> — correggere dati inesatti</li>
              <li><strong>Cancellazione</strong> (&ldquo;diritto all&apos;oblio&rdquo;)</li>
              <li><strong>Limitazione</strong> del trattamento</li>
              <li><strong>Portabilità</strong> dei dati</li>
              <li><strong>Opposizione</strong> al trattamento per legittimo interesse</li>
              <li><strong>Revoca del consenso</strong> in qualsiasi momento</li>
            </ul>
            <p className="mt-3">
              Per esercitare i tuoi diritti scrivi a{' '}
              <a href="mailto:info@caseaparmaedilp3.it" className="text-accent hover:underline">
                info@caseaparmaedilp3.it
              </a>
              . Risponderemo entro 30 giorni.
            </p>
            <p className="mt-3">
              Hai inoltre il diritto di proporre reclamo al{' '}
              <a
                href="https://www.garanteprivacy.it"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Garante per la protezione dei dati personali
              </a>
              .
            </p>
          </Section>

          <Section title="7. Sicurezza">
            <p>
              Il sito è servito esclusivamente tramite HTTPS con HSTS abilitato. Adottiamo misure tecniche e organizzative adeguate per proteggere i dati personali da accessi non autorizzati, perdita o divulgazione.
            </p>
          </Section>

          <Section title="8. Modifiche">
            <p>
              Questa informativa può essere aggiornata periodicamente. La versione aggiornata è sempre disponibile su questa pagina. In caso di modifiche rilevanti, ne daremo comunicazione tramite avviso in evidenza sul sito.
            </p>
          </Section>

          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
            >
              ← Torna alla home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-playfair font-bold text-green text-xl md:text-2xl mb-4">{title}</h2>
      <div className="text-text-secondary leading-7 space-y-2">{children}</div>
    </div>
  )
}
