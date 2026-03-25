import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFAB } from '@/components/ui/WhatsAppFAB'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { CursorFollower } from '@/components/ui/CursorFollower'
import { ChatbotWidget } from '@/components/ui/ChatbotWidget'
import { CookieBanner } from '@/components/ui/CookieBanner'
import { Preloader } from '@/components/ui/Preloader'
import { MobileCTABar } from '@/components/ui/MobileCTABar'
import { PageTransitionOverlay } from '@/components/ui/PageTransitionOverlay'
import { LenisProvider } from '@/components/providers/LenisProvider'
import { defaultMetadata } from '@/lib/seo'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
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

export const metadata: Metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body
        className={cn(
          inter.variable,
          playfair.variable,
          jetbrainsMono.variable,
          'font-inter antialiased bg-bg text-text-primary min-h-[100dvh] flex flex-col'
        )}
      >
        <LenisProvider>
          <Preloader />
          <CursorFollower />
          <ScrollProgress />
          <Header />
          <main className="flex-1 pb-mobile-bar">
            {children}
          </main>
          <Footer />
          <WhatsAppFAB />
          <ChatbotWidget />
          <MobileCTABar />
          <PageTransitionOverlay />
          <CookieBanner />
        </LenisProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
