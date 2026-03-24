'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { containerVariants, itemVariants } from '@/lib/animations'

export function HeroSection() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, 200])

  return (
    <section className="relative min-h-[100dvh] flex items-end overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div style={{ y }} className="absolute -inset-[100px] z-0 pointer-events-none">
        <Image
          src="/images/placeholder-hero.jpg"
          alt="Cantiere Edil P.3"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Hero Overlay */}
      <div className="absolute inset-0 z-10 hero-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-16 pb-16 md:pb-24 pt-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1 
            variants={itemVariants} 
            className="font-playfair font-bold italic text-white leading-tight"
            style={{ fontSize: 'clamp(52px, 8vw, 88px)' }}
          >
            Costruttori di fiducia dal 1985.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
          >
            Realizziamo residenze di pregio a Parma e provincia. 
            Vendita diretta in bioedilizia, classe A ed elevati standard antisismici.
          </motion.p>
          
          <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/immobili" 
              className="bg-accent text-white px-8 py-4 rounded-full font-medium text-center hover:bg-accent-dark transition-colors"
            >
              Scopri le abitazioni disponibili
            </Link>
            <Link 
              href="/contatti" 
              className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-medium text-center hover:bg-white/20 transition-colors"
            >
              Contattaci direttamente
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-12 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="text-gold text-lg">★★★★★</span>
            <span className="text-white text-sm font-medium tracking-wide">5/5 su Google</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
