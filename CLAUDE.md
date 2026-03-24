# CLAUDE.md — Edil P.3 Srl
# Fonte di verità del progetto. Leggi INTERO prima di scrivere codice.

---

## 1. IDENTITÀ BRAND

**Nome:** Edil P.3 Srl
**Settore:** Costruzione e vendita immobili residenziali
**Sede:** Via del Giardinetto 6/L, 43044 Collecchio (PR), Italia
**Telefono:** 0521 831434
**Mobile:** 339 6499106
**Email:** info@caseaparmaedilp3.it ← aggiornare se cambiano
**P.IVA:** 02136610348
**Sito attuale:** www.caseaparmaedilp3.it (SSL scaduto, da sostituire)
**Nuovo dominio:** [DA DECIDERE] — edilp3.it o edilp3parma.it
**Orari:** [DA RACCOGLIERE]
**Fondazione:** ~1985 (dichiarano "40 anni" di esperienza)
**Dipendenti:** 5–9
**Fatturato 2023:** fascia 6M–30M €

**Positioning:**
Impresa edile di Collecchio con 40 anni di presenza nel parmense.
Costruzione residenziale di qualità — vendita DIRETTA senza agenzie.
Specializzati in bioedilizia, Classe A, antisismica.
Zone operative: Parma Mia, Eurosia, Vicofertile, Via Schubert, Corcagnano, Collecchio.
Google Reviews: 5/5 (6 recensioni).

**Tone of Voice:**
- Diretto, concreto, mai generico o pomposo
- Caldo ma professionale — parla da costruttore esperto di fiducia
- Italiano corretto. Zero anglicismi. Zero frasi fatte.
- Mai: "La tua casa dei sogni", "Qualità ineguagliabile", "Leader del settore"

**CTA preferite:**
- "Richiedi informazioni"
- "Scopri le abitazioni disponibili"
- "Contattaci direttamente"
- "Valuta il tuo investimento"

**CTA VIETATE:** "Scopri di più" · "Clicca qui" · "Elevate" · "Premium" · "Next-gen"

---

## 2. STACK TECNICO — VINCOLI ASSOLUTI

```
Next.js 14+         App Router, Server Components default
TypeScript          strict: true — ZERO uso di `any`
Tailwind CSS v3     CONTROLLA package.json prima di usare sintassi nuova
Framer Motion       SOLO per UI interactions (NON mescolare con GSAP)
GSAP + ScrollTrigger SOLO per scroll-driven e parallax
                    Sempre gsap.context() + cleanup ctx.revert()
@phosphor-icons/react Unica libreria icone — controlla versione installata
react-hook-form     Per TUTTI i form
zod                 Per TUTTE le validazioni
clsx / cn()         Per classi condizionali
next/image          OBBLIGATORIO — mai <img> raw
next/font           Per tutti i font Google
Leaflet.js          Per mappa interattiva zone (carica dinamicamente, SSR: false)
```

**REGOLA CRITICA GSAP vs FRAMER:**
- Framer Motion → interazioni UI, hover, stagger, AnimatePresence exit
- GSAP → scroll-driven (ScrollTrigger), count-up, parallax, timeline
- MAI i due nello stesso albero di componenti

---

## 3. PALETTE COLORI

```css
/* ── PRIMARI ── */
--color-bg:           #FFFFFF;   /* Sfondo principale — sito light-first */
--color-bg-alt:       #F5F4F0;   /* Sfondo sezioni alternate — crema */
--color-surface:      #FAFAF8;   /* Card, pannelli */
--color-border:       #E8E5DE;   /* Bordi sottili */
--color-border-hover: #C8C4BA;   /* Bordi in hover */

/* ── ACCENTI ── */
--color-accent:       #C0392B;   /* Rosso Tradizione — CTA, elementi chiave */
--color-accent-dark:  #962D22;   /* Rosso scuro — hover */
--color-accent-glow:  rgba(192, 57, 43, 0.10);

--color-green:        #1C2B1A;   /* Verde Foresta — header, footer, testi titoli */
--color-green-mid:    #4A7C3F;   /* Verde Salvia — accento secondario, badge */
--color-green-light:  #E8F5E4;   /* Verde pallido — bg badge, highlight */

/* ── TESTO ── */
--color-text-primary: #1A1A1A;   /* Quasi nero */
--color-text-secondary: #6B7280; /* Grigio medio */
--color-text-muted:   #9CA3AF;   /* Grigio chiaro — caption */

/* ── SPECIALI ── */
--color-terracotta:   #8B7355;   /* Caldo — dettagli, badge premium */
--color-gold:         #B8962E;   /* Oro — riconoscimenti, classe energetica */
```

**In Tailwind config (estendi):**
```javascript
colors: {
  bg: '#FFFFFF',
  'bg-alt': '#F5F4F0',
  surface: '#FAFAF8',
  border: '#E8E5DE',
  accent: '#C0392B',
  'accent-dark': '#962D22',
  green: '#1C2B1A',
  'green-mid': '#4A7C3F',
  'green-light': '#E8F5E4',
  'text-primary': '#1A1A1A',
  'text-secondary': '#6B7280',
  'text-muted': '#9CA3AF',
  terracotta: '#8B7355',
  gold: '#B8962E',
}
```

---

## 4. TIPOGRAFIA

```typescript
// Titoli — eleganza italiana, storicità
import { Playfair_Display } from 'next/font/google'
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// UI / Corpo / Navigazione
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

// Dati / Numeri / Prezzi / Metrature
import { JetBrains_Mono } from 'next/font/google'
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
})
```

**Scale tipografica:**
```
Display Hero:  clamp(52px, 8vw, 88px)  — Playfair Display 700 italic
H1:            clamp(36px, 5vw, 60px)  — Playfair Display 700
H2:            clamp(26px, 3.5vw, 42px)— Playfair Display 700
H3:            clamp(18px, 2vw, 24px)  — Inter 600
Body:          16-18px                 — Inter 400 — line-height: 1.70
Caption/Label: 11-13px                 — Inter 500 — tracking: 0.08em — UPPERCASE
Prezzi/Dati:   qualsiasi dimensione    — JetBrains Mono 500
```

**Regole tipografia:**
- MAI font Sans-Serif standard (Inter, Roboto, etc.) per i titoli
- Labels categorie: sempre uppercase + letter-spacing largo
- Numeri (prezzi, metrature, anno, classi energetiche): sempre JetBrains Mono
- max-width per body text: `68ch`

---

## 5. ARCHITETTURA CARTELLE

```
src/
  app/
    (marketing)/
      layout.tsx
      page.tsx                    ← Homepage
      chi-siamo/page.tsx
      realizzazioni/page.tsx
      immobili/
        page.tsx
        [slug]/page.tsx           ← singolo immobile
      dove-costruiamo/page.tsx
      blog/
        page.tsx
        [slug]/page.tsx
      contatti/page.tsx
    layout.tsx                    ← root: font, metadata, providers
    globals.css
    sitemap.ts
    robots.ts
  components/
    layout/
      Header.tsx
      Footer.tsx
      NavMobile.tsx
    sections/
      HeroSection.tsx
      StatsSection.tsx
      RealizzazioniPreview.tsx
      ImmobiliPreview.tsx
      VenditaDirectSection.tsx
      MappaZoneSection.tsx
      RecensioniSection.tsx
      CtaSection.tsx
    ui/
      ImmobileCard.tsx
      RealizzazioneCard.tsx
      FilterTabs.tsx
      PageTransition.tsx
      ScrollProgress.tsx
      WhatsAppFAB.tsx             ← FAB WhatsApp fisso in basso a destra
    forms/
      ContactForm.tsx
      ImmobileInquiryForm.tsx
  lib/
    utils.ts                      ← cn(), formatPrice(), formatMq(), formatDate()
    animations.ts                 ← varianti Framer Motion riusabili
    gsap-utils.ts                 ← helper GSAP, init ScrollTrigger
    validations.ts                ← tutti gli schema Zod
    seo.ts                        ← helper metadata, JSON-LD generators
  types/
    index.ts                      ← Immobile, Zona, Realizzazione, Recensione, etc.
  data/
    immobili.ts
    realizzazioni.ts
    recensioni.ts
    zone.ts                       ← dati zone con coordinate lat/lng
```

---

## 6. TIPI TYPESCRIPT

```typescript
// Tipo immobile
interface Immobile {
  id: string
  slug: string
  titolo: string
  zona: ZonaParma
  indirizzo?: string
  tipologia: 'appartamento' | 'villa' | 'bifamiliare' | 'attico' | 'complesso'
  stato: 'disponibile' | 'in-costruzione' | 'venduto'
  metratura: number
  camere: number
  bagni: number
  piano?: number
  classeEnergetica: 'A4' | 'A3' | 'A2' | 'A1' | 'B' | 'C'
  antisismica: boolean
  bioedilizia: boolean
  prezzo?: number              // undefined = "Prezzo su richiesta"
  images: string[]
  planimetria?: string
  caratteristiche: string[]
  descrizione: string
  dataConsegna?: string        // es: "Primavera 2026"
  badge?: 'Nuovo' | 'In costruzione' | 'Ultima disponibile' | 'Venduto'
}

type ZonaParma =
  | 'parma-mia'
  | 'eurosia'
  | 'vicofertile'
  | 'via-schubert'
  | 'corcagnano'
  | 'collecchio'
  | 'centro'

interface Zona {
  id: ZonaParma
  nome: string
  descrizione: string
  lat: number
  lng: number
  caratteristiche: string[]
  servizi: string[]
}

interface Realizzazione {
  id: string
  slug: string
  nome: string
  zona: ZonaParma
  tipologia: 'appartamento' | 'villa' | 'complesso' | 'bifamiliare'
  annoCompletamento: number
  nrUnita?: number
  images: string[]
  copertina: string
  descrizione: string
  caratteristiche: string[]
}

interface FormContattoData {
  nome: string
  cognome: string
  email: string
  telefono: string
  interesse: 'acquisto' | 'informazioni' | 'visita' | 'altro'
  immobileInteresse?: string
  messaggio: string
  privacyConsent: boolean
}

interface Recensione {
  id: string
  nome: string
  stelle: 1 | 2 | 3 | 4 | 5
  testo: string
  data: string
  fonte: 'google'
}
```

---

## 7. SEO — PRIORITÀ ALTA

**Keyword principale:** costruttore case Parma
**Keyword secondarie:**
- vendita diretta case Parma
- nuove costruzioni Parma
- impresa edile Collecchio
- appartamenti nuovi Parma Mia / Eurosia / Vicofertile
- bioedilizia case Parma
- classe A case Parma

**Formato title tag:** `[Contenuto] | Edil P.3 — Costruttori a Parma`

**Schema.org JSON-LD obbligatori:**
- Homepage + Contatti → `LocalBusiness` + `Organization`
- Realizzazioni → `ItemList`
- Immobili → `ItemList` + `BuyAction`
- Singolo immobile → `Apartment` o `House` + `Offer`
- Zone → `Place` + `areaServed`
- Blog → `BlogPosting`

---

## 8. STRUTTURA HOMEPAGE (ordine sezioni)

```
1. HeroSection           → full-dvh, foto cantiere, testo basso-sx, CTA
2. StatsSection          → 4 counter GSAP: 40+ anni · 100+ abitazioni · 5/5 recensioni · 0 intermediari
3. RealizzazioniPreview  → bento grid 3 progetti, hover overlay, link galleria
4. ImmobiliPreview       → 3 card immobili disponibili, badge stato, link tutti
5. VenditaDirectSection  → sfondo verde scuro, 3 colonne USP, manifesto
6. MappaZoneSection      → mappa Parma con pin zone operative
7. RecensioniSection     → carousel Google reviews 5/5, auto-scroll
8. CtaSection            → banda rossa, titolo forte, tel cliccabile, form rapido
[Footer]
```

---

## 9. COMPONENTI UI — SPECIFICHE

### ImmobileCard
```
Aspect ratio immagine: 4/3
Background card: --color-surface
Hover: translateY(-4px) + shadow accent lieve + bordo accent visible
Info: zona (label uppercase) | tipologia | metratura | prezzo | stato
Badge: assoluto top-left — Inter 600 uppercase, bg accent o green-mid
Prezzo: JetBrains Mono — "€ 280.000" o "Prezzo su richiesta" in italic
```

### HeroSection
```
min-height: 100dvh (MAI h-screen)
Immagine: next/image fill + objectFit cover + priority + blur placeholder
Overlay: linear-gradient da rgba(0,0,0,0.5) basso a rgba(0,0,0,0.2) alto
Contenuto: posizionato basso-sx (pb-16 pl-8 md:pb-24 md:pl-16)
Titolo: Playfair Display 700 italic, bianco, clamp grande
CTA: bottone rosso pieno + bottone outline bianco
Badge social proof: "⭐ 5/5 su Google" — pill bianca opaca in basso
Animazione: Framer Motion stagger fade-up (children con delay 0.1s)
```

### StatsSection
```
Sfondo: --color-bg-alt (#F5F4F0)
4 colonne con numero grande JetBrains Mono + label Inter uppercase
GSAP count-up al viewport (IntersectionObserver o ScrollTrigger)
Separatori verticali sottili tra le colonne su desktop
```

### WhatsAppFAB
```
Fixed bottom-right, z-50
Icona WhatsApp Phosphor + "Scrivici" label (visibile da md in su)
Href: https://wa.me/393396499106
Background: #25D366 → #1EB854 hover
Animazione entry: Framer Motion slide-in da destra dopo 2s
```

### FilterTabs (per Realizzazioni e Immobili)
```
Tabs con layoutId Framer Motion per pill indicator animata
Filtri: per zona + per tipologia
Active: bg accent (rosso) testo bianco
Inactive: testo secondary, hover testo primary
```

### Form Inputs
```
Stile: border-bottom only (1px solid --color-border)
Focus: border-bottom accent + label floating
Submit: spinner nel bottone, testo "Invio..."
Success: check verde + "Messaggio inviato! Ti risponderemo entro 24 ore."
Error field: Inter 400, colore #C0392B, icona Warning Phosphor
```

---

## 10. GESTIONE STATI UI

Ogni componente interattivo DEVE implementare:

```
Loading:  skeleton shimmer coerente col layout reale
Error:    messaggio inline — MAI alert browser
Empty:    testo guida + illustrazione semplice
Success:  feedback visivo immediato
```

---

## 11. PERFORMANCE — GUARDRAIL

```
Immagini above-fold → priority su next/image
Font → display: 'swap' sempre
GSAP → cleanup ctx.revert() in ogni useEffect return
Leaflet → import dinamico con SSR: false (solo client)
Animazioni perpetue → React.memo + Client Component foglia
MAI animare top/left/width/height → solo transform e opacity
prefers-reduced-motion → sempre rispettato:

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!prefersReduced) { /* avvia animazione */ }
```

---

## 12. ACCESSIBILITÀ — NON NEGOZIABILE

- Contrasto testo/sfondo: min 4.5:1 body, min 3:1 testi grandi
- Focus visible su tutti gli elementi interattivi (outline 2px accent)
- `aria-label` su: hamburger, CTA icona-only, WhatsApp FAB
- Form: label associata, error con `role="alert"`
- Immagini decorative: `alt=""` — immagini content: alt in italiano descrittivo
- Link apertura nuova tab: `target="_blank" rel="noopener noreferrer"`

---

## 13. CHECKLIST PRE-COMMIT

```
[ ] TypeScript strict — zero errori, zero any
[ ] npm run build passa senza errori
[ ] Mobile testato (320px, 375px, 768px, 1024px)
[ ] Tutti i link interni funzionanti
[ ] Metadata export su ogni pagina
[ ] prefers-reduced-motion gestito
[ ] GSAP cleanup ctx.revert() presente
[ ] Leaflet caricato solo client-side
[ ] Immagini next/image con alt in italiano
[ ] Form: Zod validation + email automatica + stati feedback
[ ] Accessibility: focus visible, aria-label, tab order logico
[ ] Schema.org JSON-LD corretto per tipo pagina
```

---

## 14. PATTERN PROIBITI

**Visual:**
- Sfondi neri o dark — il sito è LIGHT FIRST
- Gradienti viola/teal/neon
- Box-shadow neon luminose esterne
- Border-radius > 16px per card principali

**Tipografia:**
- Font Inter/Roboto/Open Sans per i titoli (solo per UI)
- Titoli in gradient clip colorati
- H1 centrato senza motivazione
- Punto esclamativo nei titoli di sezione

**Layout:**
- 3 card identiche in riga per feature principali
- Hero con testo centrato verticalmente/orizzontalmente
- Lorem ipsum — MAI

**Contenuto:**
- Numeri puliti generici: usa "40+" non "40", "100+" non "100"
- CTA "Scopri di più" → usa alternative specifiche
- "Casa dei sogni", "qualità ineguagliabile", "leader del settore"

**Tecnico:**
- `h-screen` → sempre `min-h-[100dvh]`
- `<img>` raw → sempre `next/image`
- `window.addEventListener('scroll')` → ScrollTrigger o useScroll Framer
- Leaflet importato senza dynamic() → rompe SSR