'use client'

import { motion } from 'framer-motion'
import { heroContainerVariants, heroItemVariants } from '@/lib/animations'
import { cn } from '@/lib/utils'

interface Props {
  eyebrow?: string
  title: string
  titleItalic?: string
  subtitle?: string
  className?: string
  dark?: boolean
}

export function PageHero({ eyebrow, title, titleItalic, subtitle, className, dark = false }: Props) {
  return (
    <section
      className={cn(
        'pt-28 md:pt-36 pb-16 md:pb-24 border-b border-border',
        dark ? 'bg-green text-white border-white/10' : 'bg-white',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {eyebrow && (
            <motion.p
              variants={heroItemVariants}
              className={cn(
                'font-inter font-medium uppercase tracking-[0.12em] text-xs mb-5 flex items-center gap-3',
                dark ? 'text-white/50' : 'text-text-muted'
              )}
            >
              <span className="rule-accent inline-block w-8 h-px bg-accent" />
              {eyebrow}
            </motion.p>
          )}

          <motion.h1
            variants={heroItemVariants}
            className={cn(
              'font-playfair font-bold leading-tight mb-5',
              dark ? 'text-white' : 'text-green',
            )}
            style={{ fontSize: 'clamp(34px, 5vw, 58px)' }}
          >
            {title}
            {titleItalic && (
              <span className="italic"> {titleItalic}</span>
            )}
          </motion.h1>

          {subtitle && (
            <motion.p
              variants={heroItemVariants}
              className={cn(
                'text-base md:text-lg leading-relaxed max-w-2xl',
                dark ? 'text-white/70' : 'text-text-secondary'
              )}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
