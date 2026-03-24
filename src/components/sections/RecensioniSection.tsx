'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, Quotes } from '@phosphor-icons/react'
import { recensioni } from '@/data/recensioni'
import { cn } from '@/lib/utils'

export function RecensioniSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recensioni.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isHovered])

  return (
    <section className="bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-green mb-6">
            Cosa <span className="italic">Dicono di Noi</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-gold flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} weight="fill" size={24} />
              ))}
            </span>
            <span className="font-mono font-medium text-lg ml-2">5.0</span>
          </div>
          <p className="text-text-secondary font-medium uppercase tracking-widest text-sm">
            Recensioni Verificate su Google
          </p>
        </div>

        <div 
          className="relative h-[300px] md:h-[250px] w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
            >
              <Quotes size={48} weight="fill" className="text-border mb-6" />
              <p className="font-inter text-xl md:text-2xl text-text-primary leading-relaxed mb-8 italic max-w-3xl">
                &quot;{recensioni[currentIndex].testo}&quot;
              </p>
              <div className="flex flex-col items-center gap-1">
                <span className="font-inter font-semibold text-green">
                  {recensioni[currentIndex].nome}
                </span>
                <span className="text-sm text-text-muted">
                  {recensioni[currentIndex].data}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {recensioni.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                currentIndex === idx ? "bg-accent w-8" : "bg-border hover:bg-border-hover"
              )}
              aria-label={`Vai alla recensione ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
