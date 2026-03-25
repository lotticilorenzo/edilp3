'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  House, Buildings, Swap, ArrowsOut,
  CheckCircle, CircleNotch, ArrowLeft, ArrowRight,
} from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { zone } from '@/data/zone'

/* ── Step definitions ── */
const STEPS = [
  'Tipologia',
  'Zona',
  'Budget',
  'Tempistica',
  'Contatti',
]

type Tipologia = 'appartamento' | 'villa' | 'bifamiliare' | 'attico'
type Budget = '<250' | '250-400' | '400-600' | '>600' | 'da-definire'
type Tempistica = '3m' | '6m' | '1a' | 'esplorando'

interface WizardData {
  tipologia: Tipologia | null
  zone: string[]
  budget: Budget | null
  tempistica: Tempistica | null
  nome: string
  telefono: string
  email: string
}

const tipologie = [
  { id: 'appartamento', label: 'Appartamento', Icon: Buildings },
  { id: 'villa', label: 'Villa Indipendente', Icon: House },
  { id: 'bifamiliare', label: 'Bifamiliare', Icon: Swap },
  { id: 'attico', label: 'Attico / Penthouse', Icon: ArrowsOut },
]

const budgets: { id: Budget; label: string; sub?: string }[] = [
  { id: '<250', label: 'Fino a € 250.000' },
  { id: '250-400', label: '€ 250.000 – 400.000' },
  { id: '400-600', label: '€ 400.000 – 600.000' },
  { id: '>600', label: 'Oltre € 600.000' },
  { id: 'da-definire', label: 'Da definire', sub: 'Da valutare con la banca' },
]

const tempistiche: { id: Tempistica; label: string; sub: string }[] = [
  { id: '3m', label: 'Entro 3 mesi', sub: 'Cerco attivamente' },
  { id: '6m', label: 'Entro 6 mesi', sub: 'Ho già un accordo col notaio' },
  { id: '1a', label: 'Entro 1 anno', sub: 'Sto valutando con calma' },
  { id: 'esplorando', label: 'Sto solo esplorando', sub: 'Nessuna fretta' },
]

export function PreventivoWizard() {
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<WizardData>({
    tipologia: null,
    zone: [],
    budget: null,
    tempistica: null,
    nome: '',
    telefono: '',
    email: '',
  })

  const goNext = () => { setDirection(1); setStep((s) => Math.min(s + 1, STEPS.length - 1)) }
  const goPrev = () => { setDirection(-1); setStep((s) => Math.max(s - 1, 0)) }

  const canNext = () => {
    if (step === 0) return !!data.tipologia
    if (step === 1) return data.zone.length > 0
    if (step === 2) return !!data.budget
    if (step === 3) return !!data.tempistica
    return false
  }

  const toggleZona = (id: string) => {
    setData((d) => ({
      ...d,
      zone: d.zone.includes(id) ? d.zone.filter((z) => z !== id) : [...d.zone, id],
    }))
  }

  const handleSubmit = async () => {
    if (!data.nome.trim() || !data.telefono.trim()) return
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setSubmitted(true)
  }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
        <div className="bg-green-light p-5 rounded-full">
          <CheckCircle size={48} weight="fill" className="text-green-mid" />
        </div>
        <div>
          <h3 className="font-playfair font-bold text-2xl text-green mb-2">Richiesta inviata</h3>
          <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
            Grazie {data.nome.split(' ')[0]}! Ti contatteremo entro 24 ore al numero{' '}
            <span className="font-mono font-medium">{data.telefono}</span> con un preventivo personalizzato.
          </p>
        </div>
        <a
          href="https://wa.me/393396499106"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-medium px-5 py-2.5 mt-2 transition-opacity hover:opacity-90"
          style={{ borderRadius: '2px' }}
        >
          Vuoi essere contattato prima? WhatsApp
        </a>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-medium transition-all duration-300',
                  i < step ? 'bg-green-mid text-white' :
                  i === step ? 'bg-accent text-white' :
                  'bg-border text-text-muted'
                )}
              >
                {i < step ? <CheckCircle size={14} weight="fill" /> : i + 1}
              </div>
              <span className={cn(
                'text-[10px] font-inter uppercase tracking-wider hidden sm:block transition-colors',
                i === step ? 'text-accent font-semibold' :
                i < step ? 'text-green-mid' : 'text-text-muted'
              )}>
                {s}
              </span>
            </div>
          ))}
        </div>
        <div className="h-0.5 bg-border relative overflow-hidden" style={{ borderRadius: '1px' }}>
          <motion.div
            className="absolute inset-y-0 left-0 bg-accent"
            animate={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="relative overflow-hidden min-h-[280px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >

            {/* Step 0: Tipologia */}
            {step === 0 && (
              <div>
                <h3 className="font-playfair font-bold text-xl text-green mb-1">Che tipo di abitazione cerchi?</h3>
                <p className="text-text-secondary text-sm mb-6">Seleziona la tipologia più adatta alle tue esigenze.</p>
                <div className="grid grid-cols-2 gap-3">
                  {tipologie.map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setData((d) => ({ ...d, tipologia: id as Tipologia }))}
                      className={cn(
                        'border p-4 flex flex-col items-start gap-3 text-left transition-all duration-200',
                        data.tipologia === id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-border-hover'
                      )}
                      style={{ borderRadius: '4px' }}
                    >
                      <Icon size={24} className={data.tipologia === id ? 'text-accent' : 'text-text-muted'} />
                      <span className={cn('text-sm font-medium', data.tipologia === id ? 'text-accent' : 'text-text-primary')}>
                        {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 1: Zona */}
            {step === 1 && (
              <div>
                <h3 className="font-playfair font-bold text-xl text-green mb-1">Quale zona preferisci?</h3>
                <p className="text-text-secondary text-sm mb-6">Puoi selezionare più zone.</p>
                <div className="grid grid-cols-2 gap-2">
                  {zone.map((z) => (
                    <button
                      key={z.id}
                      onClick={() => toggleZona(z.id)}
                      className={cn(
                        'border px-4 py-3 flex items-center gap-3 text-left text-sm transition-all duration-200',
                        data.zone.includes(z.id)
                          ? 'border-accent bg-accent/5 text-accent'
                          : 'border-border text-text-secondary hover:border-border-hover hover:text-text-primary'
                      )}
                      style={{ borderRadius: '4px' }}
                    >
                      <div className={cn(
                        'w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors',
                        data.zone.includes(z.id) ? 'border-accent bg-accent' : 'border-border'
                      )} style={{ borderRadius: '2px' }}>
                        {data.zone.includes(z.id) && <CheckCircle size={12} weight="fill" className="text-white" />}
                      </div>
                      <span className="font-medium">{z.nome}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {step === 2 && (
              <div>
                <h3 className="font-playfair font-bold text-xl text-green mb-1">Qual è il budget indicativo?</h3>
                <p className="text-text-secondary text-sm mb-6">Non vincolante — ci aiuta a indirizzarti meglio.</p>
                <div className="flex flex-col gap-2">
                  {budgets.map(({ id, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setData((d) => ({ ...d, budget: id }))}
                      className={cn(
                        'border px-5 py-3.5 flex items-center justify-between text-left transition-all duration-200',
                        data.budget === id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-border-hover'
                      )}
                      style={{ borderRadius: '4px' }}
                    >
                      <div>
                        <span className={cn('text-sm font-medium', data.budget === id ? 'text-accent' : 'text-text-primary')}>
                          {label}
                        </span>
                        {sub && <p className="text-xs text-text-muted mt-0.5">{sub}</p>}
                      </div>
                      {data.budget === id && <CheckCircle size={18} weight="fill" className="text-accent flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Tempistica */}
            {step === 3 && (
              <div>
                <h3 className="font-playfair font-bold text-xl text-green mb-1">Quando pensi di acquistare?</h3>
                <p className="text-text-secondary text-sm mb-6">La tempistica ci aiuta a darti la risposta giusta.</p>
                <div className="flex flex-col gap-2">
                  {tempistiche.map(({ id, label, sub }) => (
                    <button
                      key={id}
                      onClick={() => setData((d) => ({ ...d, tempistica: id }))}
                      className={cn(
                        'border px-5 py-3.5 flex items-center justify-between text-left transition-all duration-200',
                        data.tempistica === id
                          ? 'border-accent bg-accent/5'
                          : 'border-border hover:border-border-hover'
                      )}
                      style={{ borderRadius: '4px' }}
                    >
                      <div>
                        <span className={cn('text-sm font-medium', data.tempistica === id ? 'text-accent' : 'text-text-primary')}>
                          {label}
                        </span>
                        <p className="text-xs text-text-muted mt-0.5">{sub}</p>
                      </div>
                      {data.tempistica === id && <CheckCircle size={18} weight="fill" className="text-accent flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Contatti */}
            {step === 4 && (
              <div>
                <h3 className="font-playfair font-bold text-xl text-green mb-1">Dove ti contattiamo?</h3>
                <p className="text-text-secondary text-sm mb-6">Riepilogo: <span className="font-medium text-text-primary">{data.tipologia}</span> · <span className="font-medium text-text-primary">{data.zone.join(', ') || '—'}</span> · <span className="font-medium text-text-primary">{data.budget}</span></p>
                <div className="flex flex-col gap-6">
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="Nome"
                      value={data.nome}
                      onChange={(e) => setData((d) => ({ ...d, nome: e.target.value }))}
                      autoComplete="name"
                    />
                    <label>Nome e Cognome *</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="tel"
                      placeholder="Telefono"
                      value={data.telefono}
                      onChange={(e) => setData((d) => ({ ...d, telefono: e.target.value }))}
                      autoComplete="tel"
                    />
                    <label>Telefono *</label>
                  </div>
                  <div className="input-field">
                    <input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
                      autoComplete="email"
                    />
                    <label>Email (facoltativa)</label>
                  </div>
                  <p className="text-xs text-text-muted">
                    Inviando accetti la nostra{' '}
                    <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
        <button
          onClick={goPrev}
          disabled={step === 0}
          className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors disabled:opacity-30 disabled:pointer-events-none"
        >
          <ArrowLeft size={16} />
          Indietro
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={goNext}
            disabled={!canNext()}
            className="flex items-center gap-2 bg-accent hover:bg-accent-dark text-white text-sm font-medium px-6 py-2.5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            style={{ borderRadius: '2px' }}
          >
            Avanti
            <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading || !data.nome.trim() || !data.telefono.trim()}
            className="flex items-center gap-2 bg-green hover:bg-[#152013] text-white text-sm font-medium px-7 py-2.5 transition-colors disabled:opacity-40 disabled:pointer-events-none"
            style={{ borderRadius: '2px' }}
          >
            {loading ? (
              <><CircleNotch size={16} className="animate-spin" /> Invio...</>
            ) : (
              <>Richiedi Preventivo <ArrowRight size={16} /></>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
