import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: 'Edil P.3 Srl — Costruttori a Parma',
  description: 'Impresa edile di Collecchio con 40 anni di presenza nel parmense. Costruzione residenziale di qualità in bioedilizia, classe A e antisismica.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={cn(
        inter.variable,
        playfair.variable,
        jetbrainsMono.variable,
        'font-inter antialiased min-h-[100dvh] flex flex-col'
      )}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFAB />
      </body>
    </html>
  )
}
