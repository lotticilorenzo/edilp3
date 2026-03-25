'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Bed, Bathtub, ArrowsOut, ArrowRight } from '@phosphor-icons/react'
import { Immobile } from '@/types'
import { formatMq, formatPrice, formatZona, classeColor, cn } from '@/lib/utils'

interface Props {
  immobile: Immobile
  className?: string
}

const statoBadge = {
  disponibile: { label: 'Disponibile', className: 'bg-green-mid text-white' },
  'in-costruzione': { label: 'In Costruzione', className: 'bg-gold text-white' },
  venduto: { label: 'Venduto', className: 'bg-text-secondary text-white' },
}

export function ImmobileCard({ immobile, className }: Props) {
  const isVenduto = immobile.stato === 'venduto'
  const stato = statoBadge[immobile.stato]
  const cardRef = useRef<HTMLElement>(null)

  // 3D tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 25 })
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 25 })

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
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900, borderRadius: '4px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group flex flex-col bg-white border border-border overflow-hidden',
        'hover:border-border-hover hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-shadow duration-500',
        isVenduto && 'opacity-75',
        className
      )}
    >
      {/* Image — clip-path curtain reveal */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        data-cursor="Scopri"
      >
        <Link href={`/immobili/${immobile.slug}`} aria-label={`Vedi ${immobile.titolo}`} className="absolute inset-0 z-20" />

        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          whileInView={{ clipPath: 'inset(0 0 0% 0)' }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <Image
            src={immobile.images[0] || 'https://picsum.photos/seed/edilp3-placeholder/800/600'}
            alt={`${immobile.titolo} — Edil P.3`}
            fill
            className={cn('object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]', isVenduto && 'grayscale')}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-green/75 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col items-center justify-center gap-4 p-6">
            <div className="flex items-center gap-5 text-white">
              <span className="flex items-center gap-1.5 text-sm">
                <ArrowsOut size={15} />
                <span className="font-mono">{formatMq(immobile.metratura)}</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Bed size={15} />
                <span className="font-mono">{immobile.camere} cam</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Bathtub size={15} />
                <span className="font-mono">{immobile.bagni} bag</span>
              </span>
            </div>
            <span className="font-mono font-medium text-white text-lg">
              {formatPrice(immobile.prezzo)}
            </span>
            <div className="flex items-center gap-1.5 text-white/80 text-xs font-inter font-medium uppercase tracking-widest border-b border-white/30 pb-0.5">
              Scopri l&apos;immobile
              <ArrowRight size={12} />
            </div>
          </div>
        </div>

        {/* Stato badge */}
        <div
          className={cn('absolute top-3 right-3 z-20 text-xs font-inter font-semibold uppercase tracking-wider px-2.5 py-1', stato.className)}
          style={{ borderRadius: '2px' }}
        >
          {stato.label}
        </div>

        {immobile.badge && immobile.badge !== 'Venduto' && (
          <div className="absolute top-3 left-3 z-20 bg-accent text-white text-xs font-inter font-semibold uppercase tracking-wider px-2.5 py-1" style={{ borderRadius: '2px' }}>
            {immobile.badge}
          </div>
        )}

        <div
          className="absolute bottom-3 left-3 z-20 text-white text-xs font-mono font-medium px-2 py-0.5"
          style={{ backgroundColor: classeColor(immobile.classeEnergetica), borderRadius: '2px' }}
        >
          {immobile.classeEnergetica}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-inter font-semibold text-text-muted uppercase tracking-widest">
            {formatZona(immobile.zona)}
          </span>
          <span className="text-border text-xs">·</span>
          <span className="text-[10px] font-inter font-semibold text-text-muted uppercase tracking-widest">
            {immobile.tipologia}
          </span>
        </div>

        <Link href={`/immobili/${immobile.slug}`}>
          <h3 className="font-playfair font-bold text-lg text-text-primary leading-snug mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {immobile.titolo}
          </h3>
        </Link>

        <div className="flex items-center gap-4 mb-4 text-text-secondary">
          <span className="flex items-center gap-1.5 text-xs">
            <ArrowsOut size={13} />
            <span className="font-mono">{formatMq(immobile.metratura)}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Bed size={13} />
            <span className="font-mono">{immobile.camere}</span>
          </span>
          <span className="flex items-center gap-1.5 text-xs">
            <Bathtub size={13} />
            <span className="font-mono">{immobile.bagni}</span>
          </span>
        </div>

        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
          <span className={cn(
            'font-mono font-medium',
            !immobile.prezzo ? 'text-text-secondary italic text-sm' : 'text-text-primary text-base'
          )}>
            {formatPrice(immobile.prezzo)}
          </span>
          {immobile.dataConsegna && (
            <span className="text-[10px] font-inter text-text-muted">
              Consegna: <span className="text-text-secondary font-medium">{immobile.dataConsegna}</span>
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}
