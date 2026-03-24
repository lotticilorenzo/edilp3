'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Immobile } from '@/types'
import { formatMq, formatPrice, formatZona, cn } from '@/lib/utils'

interface Props {
  immobile: Immobile
  className?: string
}

export function ImmobileCard({ immobile, className }: Props) {
  const isVenduto = immobile.stato === 'venduto'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      className={cn(
        "group flex flex-col bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:border-green-mid hover:shadow-md transition-all duration-300",
        className
      )}
    >
      <Link href={`/immobili/${immobile.slug}`} className="block relative aspect-[4/3] card-image-wrapper">
        <Image
          src={immobile.images[0] || '/placeholder.jpg'}
          alt={`Immagine di ${immobile.titolo}`}
          fill
          className={cn("object-cover", isVenduto && "grayscale")}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Badge Assoluto (Nuovo, etc) */}
        {immobile.badge && !isVenduto && (
          <div className="absolute top-4 left-4 bg-accent text-white font-inter font-semibold uppercase text-xs tracking-wider px-3 py-1.5 rounded-full z-10">
            {immobile.badge}
          </div>
        )}
        
        {/* Chip Stato */}
        <div className={cn(
          "absolute top-4 right-4 font-inter font-medium text-xs px-3 py-1.5 rounded-full z-10",
          immobile.stato === 'disponibile' ? 'bg-green text-white' : '',
          immobile.stato === 'in-costruzione' ? 'bg-gold text-white' : '',
          isVenduto ? 'bg-text-secondary text-white' : ''
        )}>
          {immobile.stato === 'disponibile' ? 'Disponibile' : immobile.stato === 'in-costruzione' ? 'In Costruzione' : 'Venduto'}
        </div>
      </Link>

      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-inter font-medium text-text-secondary uppercase tracking-[0.08em]">
            {formatZona(immobile.zona)}
          </span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-xs font-inter font-medium text-text-secondary uppercase tracking-[0.08em]">
            {immobile.tipologia}
          </span>
        </div>

        <Link href={`/immobili/${immobile.slug}`} className="group-hover:text-accent transition-colors">
          <h3 className="font-playfair font-bold text-xl text-text-primary mb-4 line-clamp-2">
            {immobile.titolo}
          </h3>
        </Link>
        
        <div className="mt-auto pt-4 border-t border-border flex items-end justify-between">
          <div className="font-mono text-text-primary">
            {formatMq(immobile.metratura)}
          </div>
          <div className={cn("font-mono font-medium", !immobile.prezzo && "italic text-text-secondary")}>
            {formatPrice(immobile.prezzo)}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
