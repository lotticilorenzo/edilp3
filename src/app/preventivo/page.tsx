import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { PreventivoWizard } from '@/components/ui/PreventivoWizard'
import { PageHero } from '@/components/ui/PageHero'

export const metadata: Metadata = buildMetadata({
  title: 'Preventivo Gratuito — Case Nuove Parma',
  description:
    'Richiedi un preventivo gratuito per l\'acquisto di una casa nuova a Parma. Edil P.3 risponde direttamente — nessuna agenzia, nessun intermediario. Compila in 2 minuti.',
  canonical: '/preventivo',
})

export default function PreventivoPage() {
  return (
    <>
      <PageHero
        eyebrow="Inizia qui"
        title="Preventivo"
        titleItalic="Gratuito"
        subtitle="Rispondi a 4 domande in 2 minuti. Ti contatteremo con una proposta personalizzata entro 24 ore — direttamente dal costruttore, senza intermediari."
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-6 md:px-12">

          <div className="bg-surface border border-border p-8 md:p-10" style={{ borderRadius: '4px' }}>
            <PreventivoWizard />
          </div>

          {/* Trust signals */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { v: '24h', l: 'Risposta garantita' },
              { v: '100%', l: 'Gratuito e senza impegno' },
              { v: '0', l: 'Intermediari' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col gap-1">
                <span className="font-mono font-medium text-2xl text-green">{s.v}</span>
                <span className="text-xs text-text-muted">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
