'use client'

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChatCircle, X, ArrowRight, WhatsappLogo, PaperPlaneTilt } from '@phosphor-icons/react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ── Conversation data ── */
type ActionType = { label: string; href?: string; action?: 'openPreventivo' | 'close' }

interface BotReply {
  text: string
  actions?: ActionType[]
  delay?: number
}

const INITIAL_REPLIES: ActionType[] = [
  { label: 'Voglio un preventivo', action: 'openPreventivo' },
  { label: 'Immobili disponibili', href: '/immobili' },
  { label: 'Come funziona l\'acquisto?', action: undefined },
  { label: 'Visita in cantiere', action: undefined },
]

const BOT_RESPONSES: Record<string, BotReply> = {
  'Voglio un preventivo': {
    text: 'Ottima scelta. Compila il nostro preventivo guidato in 2 minuti: ti chiediamo tipologia, zona e budget per darti una risposta personalizzata entro 24 ore.',
    actions: [{ label: 'Compila il Preventivo →', href: '/preventivo' }],
  },
  'Immobili disponibili': {
    text: 'Abbiamo attualmente appartamenti, bifamiliari e attici disponibili o in costruzione a Parma Mia, Eurosia, Vicofertile e Corcagnano.',
    actions: [
      { label: 'Vedi tutti gli immobili →', href: '/immobili' },
      { label: 'Altra domanda', action: 'close' },
    ],
  },
  "Come funziona l'acquisto?": {
    text: 'Semplice: niente agenzie, niente intermediari. Tratti direttamente con noi che abbiamo costruito la casa. Dall\'accordo iniziale al rogito, seguiamo tutto noi — senza costi nascosti.',
    actions: [
      { label: 'Scopri di più →', href: '/chi-siamo' },
      { label: 'Contattaci →', href: '/contatti' },
    ],
  },
  'Visita in cantiere': {
    text: 'Organizziamo visite guidate su appuntamento ai cantieri attivi. Scrivi su WhatsApp per fissare un orario — rispondiamo in giornata.',
    actions: [{ label: 'Scrivi su WhatsApp', href: 'https://wa.me/393396499106' }],
  },
}

/* ── Types ── */
interface Message {
  id: string
  from: 'bot' | 'user'
  text: string
  actions?: ActionType[]
}

/* ── Component ── */
export function ChatbotWidget({ onOpenPreventivo }: { onOpenPreventivo?: () => void }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showQuickReplies, setShowQuickReplies] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const [showPulse, setShowPulse] = useState(true)
  const [inputValue, setInputValue] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Greeting on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true)
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        setMessages([{
          id: '0',
          from: 'bot',
          text: 'Ciao! Sono Sofia, assistente di Edil P.3. Come posso aiutarti oggi?',
        }])
        setTimeout(() => setShowQuickReplies(true), 400)
      }, 1200)
    }
  }, [open, hasGreeted])

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Hide pulse after first interaction
  useEffect(() => {
    if (open) setShowPulse(false)
  }, [open])

  const sendToAI = useCallback(async (userText: string, currentMessages: Message[]) => {
    setIsTyping(true)

    const history = currentMessages
      .filter((m) => m.from === 'bot' || m.from === 'user')
      .slice(-8)
      .map((m) => ({ role: m.from === 'user' ? 'user' as const : 'assistant' as const, content: m.text }))

    try {
      const res = await fetch('/api/assistente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: userText, messages: history }),
      })
      const data = await res.json() as { reply?: string; error?: string }
      setIsTyping(false)
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: data.reply ?? 'Riprova più tardi o contattaci al 0521 831434.',
      }
      setMessages((prev) => [...prev, botMsg])
    } catch {
      setIsTyping(false)
      setMessages((prev) => [...prev, {
        id: (Date.now() + 1).toString(),
        from: 'bot',
        text: 'Si è verificato un errore. Contattaci al 0521 831434.',
      }])
    }
  }, [])

  const handleSendMessage = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text || isTyping) return

    setInputValue('')
    setShowQuickReplies(false)

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text }
    setMessages((prev) => {
      const next = [...prev, userMsg]
      sendToAI(text, next)
      return next
    })
  }, [inputValue, isTyping, sendToAI])

  const handleQuickReply = useCallback((reply: ActionType) => {
    if (reply.href) return // handled by Link
    if (reply.action === 'openPreventivo') {
      setOpen(false)
      onOpenPreventivo?.()
      return
    }
    if (reply.action === 'close') {
      setShowQuickReplies(true)
      return
    }

    const label = reply.label
    const scriptedResponse = BOT_RESPONSES[label]

    setShowQuickReplies(false)

    const userMsg: Message = { id: Date.now().toString(), from: 'user', text: label }

    if (scriptedResponse) {
      setMessages((prev) => [...prev, userMsg])
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          from: 'bot',
          text: scriptedResponse.text,
          actions: scriptedResponse.actions,
        }
        setMessages((prev) => [...prev, botMsg])
      }, 900)
    } else {
      setMessages((prev) => {
        const next = [...prev, userMsg]
        sendToAI(label, next)
        return next
      })
    }
  }, [onOpenPreventivo, sendToAI])

  return (
    <>
      {/* Toggle button — above mobile bar on small screens */}
      <div className="fixed bottom-[76px] left-4 md:bottom-8 md:left-8 z-[200]">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          initial={{ opacity: 0, scale: 0.7, x: -20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 2.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-label={open ? 'Chiudi assistente' : 'Apri assistente virtuale Sofia'}
          className="relative bg-green hover:bg-[#152013] text-white w-14 h-14 flex items-center justify-center shadow-xl transition-colors"
          style={{ borderRadius: '50%' }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={22} weight="bold" />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <ChatCircle size={24} weight="fill" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse ring */}
          {showPulse && !open && (
            <span className="absolute inset-0 rounded-full border-2 border-green animate-ping opacity-50" />
          )}

          {/* Notification dot */}
          {!open && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-[8px] font-bold">1</span>
            </span>
          )}
        </motion.button>

        {/* Label tooltip */}
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 3.2, duration: 0.4 }}
            className="absolute left-16 top-1/2 -translate-y-1/2 bg-green text-white text-xs font-medium px-3 py-1.5 whitespace-nowrap shadow-lg pointer-events-none hidden md:block"
            style={{ borderRadius: '2px' }}
          >
            Sofia — Assistente AI
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-green rotate-45" />
          </motion.div>
        )}
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[140px] left-2 right-2 md:bottom-28 md:left-8 md:right-auto md:w-[360px] z-[199] bg-white shadow-2xl flex flex-col overflow-hidden"
            style={{ borderRadius: '8px', maxHeight: 'min(480px, calc(100dvh - 180px))' }}
          >
            {/* Header */}
            <div className="bg-green px-5 py-4 flex items-center gap-3 flex-shrink-0">
              <div className="relative w-9 h-9 bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <ChatCircle size={18} weight="fill" className="text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-mid border-2 border-green rounded-full" />
              </div>
              <div>
                <p className="font-inter font-semibold text-white text-sm">Sofia</p>
                <p className="text-white/55 text-xs">Assistente Edil P.3 · Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">

              {/* Typing indicator (before first message) */}
              {isTyping && messages.length === 0 && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 self-end">
                    <span className="text-white text-[10px] font-bold">EP</span>
                  </div>
                  <div className="bg-surface border border-border px-4 py-3 flex gap-1.5 items-center" style={{ borderRadius: '12px 12px 12px 2px' }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={cn('flex gap-2 items-end chatbot-bubble', msg.from === 'user' ? 'flex-row-reverse' : '')}>
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 self-end">
                      <span className="text-white text-[10px] font-bold">EP</span>
                    </div>
                  )}
                  <div className={cn(
                    'max-w-[85%] px-4 py-3 text-sm leading-relaxed',
                    msg.from === 'bot'
                      ? 'bg-surface border border-border text-text-primary'
                      : 'bg-green text-white',
                  )}
                  style={{ borderRadius: msg.from === 'bot' ? '12px 12px 12px 2px' : '12px 12px 2px 12px' }}
                  >
                    {msg.text}

                    {/* Actions */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2">
                        {msg.actions.map((action, i) => (
                          action.href ? (
                            <Link
                              key={i}
                              href={action.href}
                              target={action.href.startsWith('http') ? '_blank' : undefined}
                              rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className={cn(
                                'text-xs font-medium flex items-center gap-1.5 px-3 py-2 border transition-colors',
                                msg.from === 'bot'
                                  ? 'border-border text-accent hover:bg-accent hover:text-white hover:border-accent'
                                  : 'border-white/30 text-white hover:bg-white/15',
                              )}
                              style={{ borderRadius: '2px' }}
                              onClick={() => setOpen(false)}
                            >
                              {action.href.includes('wa.me') && <WhatsappLogo size={13} />}
                              {action.label}
                              <ArrowRight size={11} className="ml-auto" />
                            </Link>
                          ) : (
                            <button
                              key={i}
                              onClick={() => handleQuickReply(action)}
                              className="text-xs font-medium flex items-center gap-1.5 px-3 py-2 border border-border text-accent hover:bg-accent hover:text-white hover:border-accent transition-colors text-left"
                              style={{ borderRadius: '2px' }}
                            >
                              {action.label}
                            </button>
                          )
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator (between messages) */}
              {isTyping && messages.length > 0 && (
                <div className="flex gap-2 items-end chatbot-bubble">
                  <div className="w-7 h-7 bg-green rounded-full flex items-center justify-center flex-shrink-0 self-end">
                    <span className="text-white text-[10px] font-bold">EP</span>
                  </div>
                  <div className="bg-surface border border-border px-4 py-3 flex gap-1.5 items-center" style={{ borderRadius: '12px 12px 12px 2px' }}>
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && !isTyping && (
              <div className="px-4 pb-4 pt-2 flex-shrink-0 border-t border-border">
                <p className="text-[10px] text-text-muted uppercase tracking-wider mb-2.5">Risposta rapida</p>
                <div className="flex flex-wrap gap-2">
                  {INITIAL_REPLIES.map((reply) => (
                    reply.href ? (
                      <Link
                        key={reply.label}
                        href={reply.href}
                        className="text-xs font-medium px-3 py-1.5 border border-border text-text-primary hover:border-accent hover:text-accent transition-colors"
                        style={{ borderRadius: '2px' }}
                        onClick={() => setOpen(false)}
                      >
                        {reply.label}
                      </Link>
                    ) : (
                      <button
                        key={reply.label}
                        onClick={() => handleQuickReply(reply)}
                        className="text-xs font-medium px-3 py-1.5 border border-border text-text-primary hover:border-accent hover:text-accent transition-colors"
                        style={{ borderRadius: '2px' }}
                      >
                        {reply.label}
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Text input */}
            <form
              onSubmit={handleSendMessage}
              className="px-4 py-3 bg-white border-t border-border flex-shrink-0 flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Scrivi una domanda..."
                maxLength={500}
                disabled={isTyping}
                className="flex-1 text-sm border border-border bg-surface px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-green transition-colors disabled:opacity-50"
                style={{ borderRadius: '2px' }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Invia messaggio"
                className="flex-shrink-0 bg-green hover:bg-[#152013] text-white p-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ borderRadius: '2px' }}
              >
                <PaperPlaneTilt size={16} weight="fill" />
              </button>
            </form>

            {/* Footer */}
            <div className="px-4 py-1.5 bg-surface border-t border-border flex-shrink-0">
              <p className="text-[10px] text-text-muted text-center">
                AI · Per urgenze:{' '}
                <a href="tel:+390521831434" className="text-accent font-medium">0521 831434</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
