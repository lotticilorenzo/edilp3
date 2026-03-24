'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Realizzazione } from '@/types'
import { formatZona, cn } from '@/lib/utils'

interface Props {
  realizzazione: Realizzazione
  aspect?: '3/2' | '16/9'
  className?: string
}

export function RealizzazioneCard({ realizzazione, aspect = '3/2', className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        "card group relative overflow-hidden rounded-2xl block bg-green",
        aspect === '16/9' ? 'aspect-video' : 'aspect-[3/2]',
        className
      )}
    >
      <Link href={`/realizzazioni/${realizzazione.slug}`} className="absolute inset-0 z-20" aria-label={`Vedi dettagli ${realizzazione.nome}`}></Link>
      
      <div className="absolute inset-0 card-image-wrapper">
        <Image
          src={realizzazione.copertina || '/placeholder.jpg'}
          alt={`Realizzazione ${realizzazione.nome}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Badge tipologia */}
      <div className="absolute top-4 left-4 z-10 bg-accent text-white font-inter font-semibold uppercase text-xs tracking-wider px-3 py-1.5 rounded-full pointer-events-none">
        {realizzazione.tipologia}
      </div>

      {/* Overlay info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 pointer-events-none transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex items-center gap-2 mb-2 text-white/80">
          <span className="text-xs font-inter font-medium uppercase tracking-[0.08em]">
            {formatZona(realizzazione.zona)}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/50" />
          <span className="text-xs font-inter font-medium font-mono">
            {realizzazione.annoCompletamento}
          </span>
        </div>
        <h3 className="font-playfair font-bold text-2xl text-white">
          {realizzazione.nome}
        </h3>
      </div>
    </motion.div>
  )
}
