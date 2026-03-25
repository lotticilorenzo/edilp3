'use client'

import { useEffect, useRef } from 'react'

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    document.body.classList.add('cursor-active')

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let rafId = 0
    let isVisible = false

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) {
        isVisible = true
        dot.style.opacity = '1'
        ring.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      isVisible = false
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // Contextual label: find data-cursor attribute on closest ancestor
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null
      if (cursorEl) {
        const cursorLabel = cursorEl.dataset.cursor || ''
        label.textContent = cursorLabel
        ring.classList.add('cursor-label-active')
        ring.classList.remove('cursor-hover')
        dot.classList.remove('cursor-hover')
        return
      }

      ring.classList.remove('cursor-label-active')
      label.textContent = ''

      if (target.closest('a, button, [role="button"], input, select, textarea, label')) {
        dot.classList.add('cursor-hover')
        ring.classList.add('cursor-hover')
      } else {
        dot.classList.remove('cursor-hover')
        ring.classList.remove('cursor-hover')
      }
    }

    const handleMouseDown = () => {
      dot.classList.add('cursor-click')
      ring.classList.add('cursor-click')
    }
    const handleMouseUp = () => {
      dot.classList.remove('cursor-click')
      ring.classList.remove('cursor-click')
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    const tick = () => {
      dot.style.transform = `translate3d(${mouseX - 5}px, ${mouseY - 5}px, 0)`

      // Ring follows with smooth lag — slower when label active
      const hasLabel = ring.classList.contains('cursor-label-active')
      const lerpFactor = hasLabel ? 0.07 : 0.09
      ringX = lerp(ringX, mouseX, lerpFactor)
      ringY = lerp(ringY, mouseY, lerpFactor)
      const offset = ring.classList.contains('cursor-label-active') ? 42 : 18
      ring.style.transform = `translate3d(${ringX - offset}px, ${ringY - offset}px, 0)`

      rafId = requestAnimationFrame(tick)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    rafId = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('cursor-active')
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <span ref={labelRef} className="cursor-ring-label" />
      </div>
    </>
  )
}
