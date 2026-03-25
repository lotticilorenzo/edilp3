'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from '@phosphor-icons/react'
import { MagneticButton } from '@/components/ui/MagneticButton'

/* Rotating circular text badge */
function RotatingBadge() {
  const text = 'BIOEDILIZIA · CLASSE A · ANTISISMICA · QUALITÀ · '
  return (
    <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
      <svg
        viewBox="0 0 144 144"
        className="w-full h-full"
        style={{ animation: 'spin-slow 18s linear infinite' }}
      >
        <defs>
          <path
            id="circle-path"
            d="M 72,72 m -54,0 a 54,54 0 1,1 108,0 a 54,54 0 1,1 -108,0"
          />
        </defs>
        <text className="fill-white/60" style={{ fontSize: '10px', letterSpacing: '0.12em', fontFamily: 'var(--font-inter)' }}>
          <textPath href="#circle-path" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-10 h-10 md:w-12 md:h-12 border border-white/25 rotate-45">
          <div className="absolute inset-0 flex items-center justify-center -rotate-45">
            <span className="font-playfair font-bold text-white text-lg md:text-xl leading-none">P</span>
            <span className="font-playfair font-bold text-accent text-lg md:text-xl leading-none">.3</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Single line-reveal span */
function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <span className="line-reveal">
      <motion.span
        className={`inline-block ${className}`}
        initial={{ y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

const stats = [
  { value: '40+', label: 'Anni', sub: 'di esperienza' },
  { value: '100+', label: 'Abitazioni', sub: 'consegnate' },
  { value: '5/5', label: 'Google', sub: 'recensioni' },
  { value: '0', label: 'Intermediari', sub: 'vendita diretta' },
]

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const [isTouch, setIsTouch] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    setIsTouch(window.matchMedia('(pointer: coarse)').matches)
  }, [])

  // Parallax disabled on touch devices for better performance
  const y = useTransform(scrollY, [0, 700], [0, isTouch ? 0 : 160])
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY = useTransform(scrollY, [0, 500], [0, isTouch ? 0 : 60])

  // Use video on desktop only (touch = skip for perf)
  const useVideo = !isTouch && !videoFailed

  return (
    <section ref={ref} className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-[#0d1409]">

      {/* ── Background: video (desktop) or image (mobile/fallback) ── */}
      <motion.div style={{ y }} className="absolute inset-[-12%] z-0">
        {/* Fallback image — always rendered, hidden when video loaded */}
        <Image
          src="https://picsum.photos/seed/edilp3hero/1920/1080"
          alt="Cantiere Edil P.3 — costruzione residenziale a Parma"
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
          style={{ opacity: useVideo && videoLoaded ? 0 : 0.55, transition: 'opacity 1s ease' }}
        />
        {/* Video background — desktop only */}
        {!isTouch && (
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://picsum.photos/seed/edilp3hero/1920/1080"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: videoLoaded && !videoFailed ? 0.55 : 0,
              transition: 'opacity 1.5s ease',
            }}
            aria-hidden="true"
          >
            {/* In production: replace with actual CDN video URL */}
            {/* <source src="/video/hero-cantiere.mp4" type="video/mp4" /> */}
          </video>
        )}
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1409]/90 via-[#0d1409]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1409]/60 via-transparent to-transparent" />
      </div>

      {/* ── Architectural grid overlay — hidden on mobile for perf ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.04] hidden sm:block"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Red top accent line ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ transformOrigin: 'left' }}
        className="absolute top-0 left-0 right-0 z-30 h-[2px] bg-accent"
      />

      {/* ── Geographic coordinates — desktop only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute top-24 md:top-28 right-6 md:right-12 z-20 hidden md:flex flex-col items-end gap-1"
      >
        <span className="font-mono text-white/30 text-[10px] tracking-[0.15em]">44°48′N</span>
        <span className="font-mono text-white/30 text-[10px] tracking-[0.15em]">10°19′E</span>
        <span className="font-mono text-white/20 text-[9px] tracking-widest uppercase mt-1">Collecchio · Parma</span>
      </motion.div>

      {/* ── Left edge label — desktop only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      >
        <div className="h-16 w-px bg-white/15" />
        <span
          className="font-mono text-white/25 text-[9px] tracking-[0.25em] uppercase"
          style={{ writingMode: 'vertical-rl' }}
        >
          EST. 1985
        </span>
        <div className="h-16 w-px bg-white/15" />
      </motion.div>

      {/* ── Ghost "1985" — only on xl+ ── */}
      <div
        className="absolute bottom-0 right-0 z-10 pointer-events-none select-none hidden xl:block"
        style={{
          fontFamily: 'var(--font-playfair)',
          fontSize: 'clamp(160px, 18vw, 280px)',
          fontWeight: 700,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          lineHeight: 1,
          transform: 'translateY(12%)',
        }}
      >
        1985
      </div>

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity, y: contentY }}
        className="relative z-20 flex-1 flex flex-col justify-end w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 pb-20 sm:pb-24 md:pb-32 pt-32 md:pt-44"
      >
        <div className="flex items-end justify-between gap-8 lg:gap-12">

          {/* Left: text block */}
          <div className="flex-1 min-w-0">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 mb-6 md:mb-8"
            >
              <span className="h-px w-8 md:w-12 bg-accent inline-block flex-shrink-0" />
              <span className="font-inter font-medium text-white/55 uppercase tracking-[0.14em] text-[10px] md:text-[11px]">
                Costruttori residenziali · Parma e Provincia
              </span>
            </motion.div>

            {/* Heading */}
            <h1
              className="font-playfair font-bold text-white leading-[1.05] mb-6 md:mb-8"
              style={{ fontSize: 'clamp(36px, 6.5vw, 84px)' }}
            >
              <LineReveal delay={0.35}>
                <span className="italic">Costruiamo case</span>
              </LineReveal>
              <br />
              <LineReveal delay={0.5}>
                <span className="text-white">per farle </span>
                <span className="italic text-accent">durare.</span>
              </LineReveal>
            </h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/65 text-sm sm:text-base md:text-[17px] max-w-lg leading-[1.75] font-light mb-8 md:mb-10"
            >
              Residenze in bioedilizia, Classe A e struttura antisismica.
              Vendita diretta — senza agenzie, senza intermediari.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col xs:flex-row gap-3"
            >
              <MagneticButton>
                <Link
                  href="/immobili"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white px-6 py-4 sm:px-7 sm:py-3.5 text-sm font-medium transition-colors duration-200 group min-h-[48px]"
                  style={{ borderRadius: '2px' }}
                >
                  Scopri le abitazioni
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center bg-transparent border border-white/22 hover:border-white/50 hover:bg-white/6 text-white/80 hover:text-white px-6 py-4 sm:px-7 sm:py-3.5 text-sm font-medium transition-all duration-200 min-h-[48px]"
                  style={{ borderRadius: '2px' }}
                >
                  Contattaci
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right: rotating badge — desktop only */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block pb-2 flex-shrink-0"
            data-cursor="Dal 1985"
          >
            <RotatingBadge />
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 md:mt-16 lg:mt-20"
        >
          <div className="h-px w-full bg-white/10 mb-5 md:mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.05 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col gap-0.5"
              >
                <span className="font-mono font-medium text-white" style={{ fontSize: 'clamp(20px, 2.5vw, 30px)' }}>
                  {s.value}
                </span>
                <span className="font-inter text-white/80 text-xs font-medium">{s.label}</span>
                <span className="font-inter text-white/38 text-[9px] uppercase tracking-wider">{s.sub}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator — desktop only ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="absolute bottom-10 right-8 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent"
        />
        <span className="font-inter text-white/30 uppercase tracking-[0.2em] text-[9px]" style={{ writingMode: 'vertical-rl' }}>
          Scorri
        </span>
      </motion.div>

    </section>
  )
}
