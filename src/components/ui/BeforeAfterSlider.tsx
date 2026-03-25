'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Props {
  before: string
  after: string
  labelBefore?: string
  labelAfter?: string
  className?: string
  alt?: string
}

export function BeforeAfterSlider({
  before,
  after,
  labelBefore = 'Prima',
  labelAfter = 'Dopo',
  className,
  alt = 'Confronto prima e dopo',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(50) // percent
  const [isDragging, setIsDragging] = useState(false)

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    const x = clientX - rect.left
    return Math.min(100, Math.max(0, (x / rect.width) * 100))
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleTouchStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return

    const onMouseMove = (e: MouseEvent) => setPosition(getPercent(e.clientX))
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault()
      setPosition(getPercent(e.touches[0].clientX))
    }
    const onUp = () => setIsDragging(false)

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onUp)
    }
  }, [isDragging, getPercent])

  // Click/tap on container moves handle
  const handleClick = useCallback((e: React.MouseEvent) => {
    setPosition(getPercent(e.clientX))
  }, [getPercent])

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden select-none cursor-col-resize', className)}
      style={{ borderRadius: '4px' }}
      onClick={handleClick}
      role="slider"
      aria-label={`Confronto: ${labelBefore} / ${labelAfter}`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After (base layer — fully visible) */}
      <div className="absolute inset-0">
        <Image
          src={after}
          alt={`${alt} — dopo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          draggable={false}
        />
      </div>

      {/* Before (clipped from left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <Image
          src={before}
          alt={`${alt} — prima`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{ width: `${10000 / position}%`, maxWidth: 'none' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white z-20 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      />

      {/* Handle */}
      <div
        className={cn(
          'absolute top-1/2 z-30 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center',
          'w-10 h-10 rounded-full bg-white shadow-lg border-2 border-white/90',
          'transition-shadow',
          isDragging ? 'shadow-accent/30 scale-110' : 'shadow-black/20'
        )}
        style={{
          left: `${position}%`,
          cursor: 'col-resize',
          transition: isDragging ? 'none' : 'box-shadow 0.2s, transform 0.1s',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Arrow icons */}
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M7 6L3 10L7 14" stroke="#1C2B1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M13 6L17 10L13 14" stroke="#1C2B1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Labels */}
      <div
        className="absolute top-3 left-3 z-20 pointer-events-none"
        style={{ opacity: position < 15 ? 0 : 1, transition: 'opacity 0.2s' }}
      >
        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-inter font-semibold uppercase tracking-wider px-2.5 py-1" style={{ borderRadius: '2px' }}>
          {labelBefore}
        </span>
      </div>
      <div
        className="absolute top-3 right-3 z-20 pointer-events-none"
        style={{ opacity: position > 85 ? 0 : 1, transition: 'opacity 0.2s' }}
      >
        <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-inter font-semibold uppercase tracking-wider px-2.5 py-1" style={{ borderRadius: '2px' }}>
          {labelAfter}
        </span>
      </div>

      {/* Hint on first render */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className="flex items-center gap-2 bg-black/40 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full"
          style={{
            opacity: isDragging ? 0 : 0.7,
            transition: 'opacity 0.3s',
            animation: 'fadeIn 1s ease 1.5s both',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M4 3L1 7L4 11M10 3L13 7L10 11" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Trascina
        </div>
      </div>
    </div>
  )
}
