'use client'

import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { realizzazioni } from '@/data/realizzazioni'
import { RealizzazioneCard } from '@/components/ui/RealizzazioneCard'

export function RealizzazioniPreview() {
  // Taking the first 3 for the preview grid
  const previewItems = realizzazioni.slice(0, 3)

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-green mb-6">
              Ultime <span className="italic">Realizzazioni</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Scopri i nostri progetti completati a Parma e provincia. Costruiamo spazi da vivere dove qualità materica, risparmio energetico e design si uniscono.
            </p>
          </div>
          <Link 
            href="/realizzazioni"
            className="group flex items-center gap-3 text-accent font-medium hover:text-accent-dark transition-colors whitespace-nowrap"
          >
            Vedi tutti i progetti
            <div className="bg-accent/10 p-2 rounded-full group-hover:bg-accent/20 transition-colors">
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {previewItems.length > 0 && (
            <div className="md:col-span-8 h-full">
              <RealizzazioneCard 
                realizzazione={previewItems[0]} 
                aspect="16/9"
                className="h-full min-h-[400px]"
              />
            </div>
          )}
          
          <div className="md:col-span-4 flex flex-col gap-6">
            {previewItems.slice(1, 3).map(item => (
              <RealizzazioneCard 
                key={item.id} 
                realizzazione={item} 
                aspect="3/2"
                className="flex-1"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
