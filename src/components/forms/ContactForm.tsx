'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, CircleNotch, Warning } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'
import { immobili } from '@/data/immobili'
import { FormContattoData } from '@/types'

interface Props {
  defaultImmobile?: string
  className?: string
}

export function ContactForm({ defaultImmobile, className }: Props) {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormContattoData>({
    defaultValues: { immobileInteresse: defaultImmobile ?? '' },
  })

  const interestValue = watch('interesse')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(_data: FormContattoData) {
    // Integra qui il tuo backend / servizio email
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={cn('flex flex-col items-center justify-center gap-6 py-16 text-center', className)}>
        <div className="bg-green-light p-5 rounded-full">
          <CheckCircle size={44} weight="fill" className="text-green-mid" />
        </div>
        <div>
          <h3 className="font-playfair font-bold text-2xl text-green mb-2">Messaggio ricevuto</h3>
          <p className="text-text-secondary leading-relaxed max-w-sm">
            Ti risponderemo entro 24 ore lavorative. Per urgenze chiama il{' '}
            <a href="tel:+390521831434" className="text-accent font-medium">0521 831434</a>.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn('flex flex-col gap-8', className)}>

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Nome *" error={errors.nome?.message}>
          <input
            {...register('nome', { required: 'Inserisci il tuo nome', minLength: { value: 2, message: 'Almeno 2 caratteri' } })}
            type="text" placeholder="Nome" autoComplete="given-name"
          />
        </Field>
        <Field label="Cognome *" error={errors.cognome?.message}>
          <input
            {...register('cognome', { required: 'Inserisci il tuo cognome', minLength: { value: 2, message: 'Almeno 2 caratteri' } })}
            type="text" placeholder="Cognome" autoComplete="family-name"
          />
        </Field>
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Email *" error={errors.email?.message}>
          <input
            {...register('email', {
              required: 'Email obbligatoria',
              pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Email non valida' },
            })}
            type="email" placeholder="email" autoComplete="email"
          />
        </Field>
        <Field label="Telefono *" error={errors.telefono?.message}>
          <input
            {...register('telefono', {
              required: 'Telefono obbligatorio',
              minLength: { value: 7, message: 'Numero non valido' },
            })}
            type="tel" placeholder="telefono" autoComplete="tel"
          />
        </Field>
      </div>

      {/* Interest */}
      <Field label="Motivo del contatto *" error={errors.interesse?.message}>
        <select {...register('interesse', { required: 'Seleziona un motivo' })} defaultValue="">
          <option value="" disabled>Seleziona...</option>
          <option value="acquisto">Acquisto immobile</option>
          <option value="visita">Visita a un cantiere</option>
          <option value="informazioni">Informazioni generali</option>
          <option value="altro">Altro</option>
        </select>
      </Field>

      {/* Specific property */}
      {interestValue === 'acquisto' && (
        <Field label="Immobile di interesse" error={errors.immobileInteresse?.message}>
          <select {...register('immobileInteresse')} defaultValue={defaultImmobile ?? ''}>
            <option value="">Nessuno in particolare</option>
            {immobili
              .filter((i) => i.stato !== 'venduto')
              .map((i) => (
                <option key={i.id} value={i.slug}>
                  {i.titolo}
                </option>
              ))}
          </select>
        </Field>
      )}

      {/* Message */}
      <Field label="Messaggio *" error={errors.messaggio?.message}>
        <textarea
          {...register('messaggio', {
            required: 'Scrivi un messaggio',
            minLength: { value: 10, message: 'Almeno 10 caratteri' },
          })}
          placeholder="messaggio"
          rows={4}
          style={{ resize: 'vertical' }}
        />
      </Field>

      {/* Privacy */}
      <div className="flex flex-col gap-1.5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('privacyConsent', { required: 'Devi accettare la Privacy Policy' })}
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-accent flex-shrink-0"
          />
          <span className="text-sm text-text-secondary leading-relaxed">
            Accetto la{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
              Privacy Policy
            </a>{' '}
            e autorizzo il trattamento dei dati personali. *
          </span>
        </label>
        {errors.privacyConsent && (
          <p className="flex items-center gap-1.5 text-accent text-xs ml-7" role="alert">
            <Warning size={13} />
            {errors.privacyConsent.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent hover:bg-accent-dark text-white py-4 text-sm font-medium flex items-center justify-center gap-2.5 transition-colors disabled:opacity-70 mt-1"
        style={{ borderRadius: '2px' }}
      >
        {isSubmitting ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Invio in corso...
          </>
        ) : 'Invia Messaggio'}
      </button>
    </form>
  )
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="input-field">
      {children}
      <label>{label}</label>
      {error && (
        <p className="flex items-center gap-1 text-accent text-xs mt-1.5" role="alert">
          <Warning size={12} />
          {error}
        </p>
      )}
    </div>
  )
}
