'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { Realizzazione } from '@/types'
import { formatZona, cn } from '@/lib/utils'

interface Props {
  realizzazione: Realizzazione
  large?: boolean
  className?: string
}

export function RealizzazioneCard({ realizzazione, large = false, className }: Props) {
  const cardRef = useRef<HTMLElement>(null)

  // 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 22 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleMouseLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1000, borderRadius: '4px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor="Scopri"
      className={cn(
        'group relative overflow-hidden bg-green block',
        large ? 'aspect-[16/10]' : 'aspect-[4/3]',
        className
      )}
    >
      <Link
        href={`/realizzazioni/${realizzazione.slug}`}
        className="absolute inset-0 z-30"
        aria-label={`Vedi ${realizzazione.nome}`}
      />

      {/* Image — clip-path curtain reveal */}
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      >
        <Image
          src={realizzazione.copertina || 'https://picsum.photos/seed/edilp3-rplaceholder/1400/900'}
          alt={`${realizzazione.nome} — Realizzazione Edil P.3`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
        />
      </motion.div>

      {/* Base gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-0 z-10 bg-green/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Top badges */}
      <div className="absolute top-4 left-4 z-20 bg-accent text-white text-xs font-inter font-semibold uppercase tracking-widest px-2.5 py-1 pointer-events-none" style={{ borderRadius: '2px' }}>
        {realizzazione.tipologia}
      </div>
      <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-mono px-2.5 py-1 pointer-events-none" style={{ borderRadius: '2px' }}>
        {realizzazione.annoCompletamento}
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 pointer-events-none">
        <div className="flex items-center gap-2 mb-2 text-white/60">
          <span className="text-xs font-inter font-medium uppercase tracking-widest">
            {formatZona(realizzazione.zona)}
          </span>
          {realizzazione.nrUnita && (
            <>
              <span className="text-white/30">·</span>
              <span className="text-xs font-mono">{realizzazione.nrUnita} unità</span>
            </>
          )}
        </div>

        <div className="flex items-end justify-between gap-4">
          <h3 className={cn(
            'font-playfair font-bold text-white leading-tight',
            large ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
          )}>
            {realizzazione.nome}
          </h3>

          <div className="flex-shrink-0 flex items-center gap-1.5 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
            <span className="text-white/70 text-xs font-inter uppercase tracking-widest hidden md:block">Scopri</span>
            <div className="bg-accent p-1.5">
              <ArrowUpRight size={14} className="text-white" />
            </div>
          </div>
        </div>

        <p className="text-white/0 text-xs leading-6 mt-2 line-clamp-2 group-hover:text-white/55 transition-colors duration-500 font-light max-w-prose">
          {realizzazione.descrizione}
        </p>
      </div>
    </motion.article>
  )
}
