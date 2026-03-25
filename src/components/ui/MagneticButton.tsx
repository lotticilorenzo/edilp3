'use client'

import { useRef, useCallback, useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  strength?: number
}

/**
 * Wraps children in a magnetic zone — on desktop hover the element
 * shifts up to `strength * distance` px toward the cursor.
 * On leave it springs back with cubic-bezier easing.
 */
export function MagneticButton({ children, className, strength = 0.32 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    setIsDesktop(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDesktop) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transition = 'transform 0.12s ease'
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }, [isDesktop, strength])

  const onMouseLeave = useCallback(() => {
    if (!isDesktop) return
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)'
    el.style.transform = 'translate(0, 0)'
  }, [isDesktop])

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ display: 'inline-flex' }}
    >
      {children}
    </div>
  )
}
