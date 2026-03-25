'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Circle } from '@phosphor-icons/react'
import { FaseCantiere } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  fasi: FaseCantiere[]
  dataConsegna?: string
}

function ProgressBar({ percentuale, completata, animate }: { percentuale: number; completata: boolean; animate: boolean }) {
  return (
    <div className="relative h-1 bg-border rounded-full overflow-hidden flex-1">
      <motion.div
        className={cn(
          'absolute inset-y-0 left-0 rounded-full',
          completata ? 'bg-green-mid' : percentuale > 0 ? 'bg-accent' : 'bg-border-hover'
        )}
        initial={{ width: 0 }}
        animate={{ width: animate ? `${percentuale}%` : 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  )
}

export function CantierProgress({ fasi, dataConsegna }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const overallPercent = Math.round(
    fasi.reduce((sum, f) => sum + f.percentuale, 0) / fasi.length
  )

  const completate = fasi.filter((f) => f.completata).length

  return (
    <div ref={ref}>
      {/* Overall progress */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-inter font-semibold text-sm uppercase tracking-widest text-text-muted">
          Avanzamento cantiere
        </h3>
        <span className="font-mono text-xs text-text-secondary">
          {completate}/{fasi.length} fasi — {overallPercent}%
        </span>
      </div>

      {/* Global bar */}
      <div className="relative h-2 bg-border rounded-full overflow-hidden mb-1">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-mid to-accent"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${overallPercent}%` : 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {dataConsegna && (
        <p className="text-[10px] text-text-muted font-inter mb-6">
          Consegna prevista: <span className="font-medium text-text-secondary">{dataConsegna}</span>
        </p>
      )}

      {/* Phase list */}
      <div className="flex flex-col gap-3 mt-5">
        {fasi.map((fase) => (
          <div key={fase.label} className="flex items-start gap-3">
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">
              {fase.completata ? (
                <CheckCircle
                  size={16}
                  weight="fill"
                  className="text-green-mid"
                />
              ) : fase.percentuale > 0 ? (
                <div className="w-4 h-4 rounded-full border-2 border-accent flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                </div>
              ) : (
                <Circle size={16} className="text-border-hover" />
              )}
            </div>

            {/* Label + bar + note */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className={cn(
                    'text-[11px] font-inter font-medium flex-1',
                    fase.completata ? 'text-text-secondary' : fase.percentuale > 0 ? 'text-text-primary' : 'text-text-muted'
                  )}
                >
                  {fase.label}
                </span>
                <span className="font-mono text-[10px] text-text-muted flex-shrink-0">
                  {fase.percentuale}%
                </span>
              </div>
              <ProgressBar
                percentuale={fase.percentuale}
                completata={fase.completata}
                animate={animate}
              />
              {fase.note && (
                <p className="text-[10px] text-text-muted mt-1 italic">{fase.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
