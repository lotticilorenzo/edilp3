'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MagnifyingGlassPlus, MagnifyingGlassMinus, ArrowsOut } from '@phosphor-icons/react'

interface Props {
  imageUrl?: string
  titolo?: string
}

// Demo SVG floor plan if no real one is provided
function FloorPlanSVG() {
  return (
    <svg
      viewBox="0 0 600 420"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-label="Planimetria appartamento"
    >
      <defs>
        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#1C2B1A" strokeWidth="0.5" strokeOpacity="0.15"/>
        </pattern>
      </defs>

      {/* Outer walls */}
      <rect x="40" y="30" width="520" height="360" fill="white" stroke="#1C2B1A" strokeWidth="8"/>

      {/* Inner walls */}
      {/* Livingroom/Kitchen separator */}
      <line x1="220" y1="30" x2="220" y2="220" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Living/corridor */}
      <line x1="40" y1="220" x2="400" y2="220" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Corridor right */}
      <line x1="400" y1="220" x2="400" y2="390" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Bedrooms separator */}
      <line x1="400" y1="30" x2="400" y2="220" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Bedroom 1/2 */}
      <line x1="400" y1="160" x2="560" y2="160" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Bathroom wall */}
      <line x1="220" y1="220" x2="220" y2="390" stroke="#1C2B1A" strokeWidth="5"/>
      {/* Bagno 1/2 */}
      <line x1="220" y1="310" x2="400" y2="310" stroke="#1C2B1A" strokeWidth="5"/>

      {/* Hatch walls */}
      <rect x="40" y="30" width="520" height="8" fill="url(#hatch)"/>
      <rect x="40" y="382" width="520" height="8" fill="url(#hatch)"/>
      <rect x="40" y="30" width="8" height="360" fill="url(#hatch)"/>
      <rect x="552" y="30" width="8" height="360" fill="url(#hatch)"/>

      {/* Room fills */}
      <rect x="44" y="34" width="172" height="182" fill="#F5F4F0" opacity="0.6"/>
      <rect x="224" y="34" width="172" height="182" fill="#E8F5E4" opacity="0.4"/>
      <rect x="404" y="34" width="152" height="122" fill="#F5F4F0" opacity="0.6"/>
      <rect x="404" y="164" width="152" height="122" fill="#F5F4F0" opacity="0.5"/>
      <rect x="44" y="224" width="172" height="162" fill="#F0F4F8" opacity="0.5"/>
      <rect x="224" y="224" width="172" height="82" fill="#F0F4F8" opacity="0.4"/>
      <rect x="224" y="314" width="172" height="72" fill="#F0F4F8" opacity="0.3"/>
      <rect x="404" y="224" width="152" height="162" fill="#F5F4F0" opacity="0.5"/>

      {/* Doors */}
      {/* Living door */}
      <path d="M 44 220 L 44 190" stroke="#1C2B1A" strokeWidth="2" fill="none"/>
      <path d="M 44 190 Q 74 190 74 220" stroke="#1C2B1A" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
      {/* Kitchen door */}
      <path d="M 220 130 L 220 100" stroke="#1C2B1A" strokeWidth="2" fill="none"/>
      <path d="M 220 100 Q 250 100 250 130" stroke="#1C2B1A" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
      {/* Main door */}
      <rect x="150" y="26" width="50" height="12" fill="white"/>
      <path d="M 150 32 L 200 32" stroke="#C0392B" strokeWidth="2"/>
      {/* Bedroom doors */}
      <path d="M 400 100 L 430 100" stroke="#1C2B1A" strokeWidth="2" fill="none"/>
      <path d="M 430 100 Q 430 130 400 130" stroke="#1C2B1A" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>

      {/* Room labels */}
      <text x="130" y="122" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">SOGGIORNO</text>
      <text x="310" y="112" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">CUCINA</text>
      <text x="480" y="95" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">CAMERA 1</text>
      <text x="480" y="222" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">CAMERA 2</text>
      <text x="130" y="310" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">TERRAZZO</text>
      <text x="310" y="260" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">BAGNO</text>
      <text x="310" y="350" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">RIPOSTIGLIO</text>
      <text x="480" y="305" textAnchor="middle" fontSize="11" fill="#1C2B1A" fontFamily="var(--font-inter)" fontWeight="500" opacity="0.7">DISIMPEGNO</text>

      {/* Scale bar */}
      <line x1="460" y1="405" x2="540" y2="405" stroke="#1C2B1A" strokeWidth="1.5" opacity="0.4"/>
      <line x1="460" y1="400" x2="460" y2="410" stroke="#1C2B1A" strokeWidth="1.5" opacity="0.4"/>
      <line x1="540" y1="400" x2="540" y2="410" stroke="#1C2B1A" strokeWidth="1.5" opacity="0.4"/>
      <text x="500" y="418" textAnchor="middle" fontSize="9" fill="#1C2B1A" opacity="0.5" fontFamily="var(--font-inter)">5 m</text>

      {/* North indicator */}
      <text x="56" y="425" fontSize="9" fill="#1C2B1A" opacity="0.4" fontFamily="var(--font-inter)">N ↑</text>
    </svg>
  )
}

export function PiantaViewer({ imageUrl, titolo = 'Planimetria' }: Props) {
  const [open, setOpen] = useState(false)
  const [zoom, setZoom] = useState(1)

  const close = useCallback(() => {
    setOpen(false)
    setZoom(1)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-border hover:border-accent text-text-secondary hover:text-accent px-4 py-2.5 text-sm font-medium transition-colors w-full justify-center"
        style={{ borderRadius: '2px' }}
      >
        <ArrowsOut size={16} />
        Visualizza planimetria
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
            onClick={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative bg-white w-full max-w-3xl flex flex-col"
              style={{ borderRadius: '4px', maxHeight: '90dvh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-border flex-shrink-0">
                <div>
                  <h3 className="font-playfair font-bold text-green text-lg">{titolo}</h3>
                  <p className="text-[10px] font-inter uppercase tracking-widest text-text-muted mt-0.5">
                    Planimetria illustrativa
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setZoom(z => Math.min(2, z + 0.25))}
                    className="p-2 hover:bg-bg-alt rounded transition-colors"
                    aria-label="Zoom avanti"
                  >
                    <MagnifyingGlassPlus size={18} className="text-text-secondary" />
                  </button>
                  <button
                    onClick={() => setZoom(z => Math.max(0.5, z - 0.25))}
                    className="p-2 hover:bg-bg-alt rounded transition-colors"
                    aria-label="Zoom indietro"
                  >
                    <MagnifyingGlassMinus size={18} className="text-text-secondary" />
                  </button>
                  <button
                    onClick={close}
                    className="p-2 hover:bg-bg-alt rounded transition-colors ml-1"
                    aria-label="Chiudi planimetria"
                  >
                    <X size={20} className="text-text-secondary" />
                  </button>
                </div>
              </div>

              {/* SVG area */}
              <div className="flex-1 overflow-auto p-4 bg-[#FAFAF8]" style={{ minHeight: 0 }}>
                <div
                  style={{
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    transition: 'transform 0.25s ease',
                  }}
                >
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={`Planimetria ${titolo}`}
                      className="w-full"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full aspect-[600/420] bg-white border border-border/50 p-4">
                      <FloorPlanSVG />
                    </div>
                  )}
                </div>
              </div>

              {/* Footer note */}
              <div className="px-5 py-3 border-t border-border bg-bg-alt flex-shrink-0">
                <p className="text-[10px] text-text-muted font-inter">
                  La planimetria è a scopo illustrativo. Le finiture e le disposizioni interne possono essere personalizzate.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
