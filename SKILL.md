# SKILL.md — Design System Edil P.3 Srl
# Leggi PRIMA di scrivere CSS, Tailwind o animazioni.
# Queste regole SOVRASCRIVONO qualsiasi tuo default.

---

## 1. CONFIGURAZIONE ATTIVA

```
DESIGN_VARIANCE:  5   (layout sobrio ma non banale — bento asimmetrico dove serve)
MOTION_INTENSITY: 6   (scroll-driven elegante — non cinematografico, non piatto)
VISUAL_DENSITY:   5   (bilanciato — spazio per le foto, contenuto respirabile)
SITE_MODE:        LIGHT (sfondo bianco/crema — MAI dark mode per questo progetto)
```

---

## 2. IDENTITÀ VISIVA

**Mood:** Costruttore di fiducia con decenni di storia. Non una startup. Non un'agenzia immobiliare.
Il sito deve trasmettere: solidità, esperienza, qualità materiale, radicamento nel territorio parmense.
Ogni sezione deve far sentire all'utente che sta parlando con chi costruisce case da una vita.

**Riferimenti estetici:**
- Siti di studi di architettura italiani di qualità (non concessionarie)
- Riviste di architettura italiana: Domus, Casabella — pulizia e foto grandi
- NOT: agenzie immobiliari generiche con font Comic Sans e sfondo grigio
- NOT: startup tech con dark mode e neon

**Linguaggio visivo:**
- Foto grandi e di qualità al centro dell'esperienza
- Tipografia editoriale italiana (Playfair Display) per i titoli
- Verde foresta (#1C2B1A) come segno di radici e solidità
- Rosso (#C0392B) come il colore del brand storico — solo per CTA e accenti
- Ampio spazio bianco — qualità si percepisce anche da ciò che non c'è

---

## 3. PALETTE — RIFERIMENTO RAPIDO

```css
--color-bg:         #FFFFFF;   /* Sfondo principale */
--color-bg-alt:     #F5F4F0;   /* Sfondo alternato — crema */
--color-surface:    #FAFAF8;   /* Card */
--color-border:     #E8E5DE;   /* Bordi */
--color-accent:     #C0392B;   /* Rosso — CTA principali */
--color-green:      #1C2B1A;   /* Verde foresta — header, footer, testi H */
--color-green-mid:  #4A7C3F;   /* Verde salvia — badge, highlight */
--color-text:       #1A1A1A;   /* Testo principale */
--color-text-sec:   #6B7280;   /* Testo secondario */
--color-terracotta: #8B7355;   /* Caldo — dettagli */
```

**Regole assoluto:**
- MAI sfondo scuro — questo è un sito LIGHT FIRST
- UN SOLO accento caldo: rosso `#C0392B`
- Verde scuro per header/footer/sezioni scure — non ovunque
- Le foto SONO il design — non coprirle con overlay pesanti

---

## 4. TIPOGRAFIA

**Font stack:**
```
Titoli/Display: Playfair Display (700 italic per impatto)
UI/Corpo:       Inter (400/500/600)
Dati/Numeri:    JetBrains Mono (prezzi, metrature, anni)
```

**Scale:**
```
Display Hero:  clamp(52px, 8vw, 88px)  — Playfair 700 italic
H1:            clamp(36px, 5vw, 60px)  — Playfair 700
H2:            clamp(26px, 3.5vw, 42px)— Playfair 700
H3:            clamp(18px, 2vw, 24px)  — Inter 600
Body:          16-18px / line-height 1.70 — Inter 400
Label/Caption: 11-13px UPPERCASE tracking 0.08em — Inter 500
Prezzi/MQ:     any size — JetBrains Mono 500
```

**Regole:**
- Sempre Playfair per titoli di sezione — mai Inter per titoli principali
- Labels e categorie: sempre uppercase + tracking largo
- Tutti i numeri significativi: JetBrains Mono
- max-width body text: 68ch

---

## 5. LAYOUT E SPAZIATURA

**Container:**
```css
max-width: 1320px;
margin: 0 auto;
padding: 0 clamp(20px, 5vw, 80px);
```

**Sezioni — padding verticale:**
```
mobile:   72px top/bottom
tablet:   96px
desktop:  128px
xl:       160px
```

**Grid:**
- Realizzazioni portfolio: bento asimmetrico (card grande 2/3 + 2 piccole 1/3)
- Immobili disponibili: grid 3 colonne desktop / 2 tablet / 1 mobile
- Sezioni feature USP: zigzag 2 colonne alternato — non 3 colonne uguali
- Mobile: sempre singola colonna

**Allineamento:**
- Hero: contenuto allineato basso-sinistra (flex + padding-bottom)
- Titoli di sezione: allineati a sinistra, con numero decorativo in monospace
- MAI hero centrato perfettamente — troppo generico

---

## 6. NAVBAR

**Stile:** Floating island — pillola fixed centrata, z-[100]

**Stato iniziale (top):**
```css
background: transparent;
border: 1px solid rgba(28, 43, 26, 0.08);
```

**Stato scrolled (dopo 80px):**
```css
background: rgba(255, 255, 255, 0.90);
backdrop-filter: blur(16px) saturate(160%);
border: 1px solid rgba(232, 229, 222, 0.8);
box-shadow: 0 4px 24px rgba(0,0,0,0.06);
```

**Struttura:** Logo sx | Links centro | "Contattaci" CTA accent dx
**Mobile:** hamburger → fullscreen drawer, stagger Framer Motion
**Transizione:** Framer Motion animate su layout changes

---

## 7. ANIMAZIONI SIGNATURE

### HeroParallax
```typescript
// Parallax leggero sull'immagine hero durante scroll
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [0, 150])
// Applicato all'immagine, non al contenuto
```

### StatsCountUp — GSAP
```typescript
// Count-up animato al viewport
gsap.context(() => {
  ScrollTrigger.create({
    trigger: statsRef.current,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(counters, {
        innerText: targetValue,
        duration: 2,
        ease: 'power2.out',
        snap: { innerText: 1 },
        stagger: 0.1
      })
    },
    once: true
  })
}, statsRef)
// SEMPRE ctx.revert() nel cleanup
```

### FadeUpStagger — Framer Motion
```typescript
// Variante riusabile per sezioni con lista di elementi
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}
// Usare con whileInView + viewport={{ once: true, margin: '-50px' }}
```

### RealizzazioniHover
```typescript
// Su hover card realizzazione: overlay con nome e zona
// Framer Motion AnimatePresence per mount/unmount overlay
// Scale leggero: scale: 1.03 sull'immagine su hover
```

### ScrollProgress
```typescript
// Barra sottile (2px) in accent in cima alla pagina
// Framer Motion useScroll + useSpring + scaleX
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
// transform-origin: left
```

**Mobile fallback:**
- Tutte le animazioni scroll → opacity fade semplice
- Count-up → valori statici se prefers-reduced-motion

---

## 8. COMPONENTI UI — SPECIFICHE

### ImmobileCard
```
Aspect ratio immagine: 4/3
Background: --color-surface
Hover: translateY(-4px) + shadow rgba(0,0,0,0.10) + bordo verde-mid
Info layout: zona (label UP) | tipologia | metratura MQ | prezzo | stato
Prezzo: JetBrains Mono — "€ 280.000" o "Prezzo su richiesta" (italic, muted)
Badge: assoluto top-left — Inter 600 UP, bg accent/green-mid/terracotta
Stato chip: top-right — "Disponibile" verde · "In costruzione" giallo
Animazione: Framer Motion whileHover spring physics
```

### RealizzazioneCard
```
Aspect ratio: 3/2 o 16/9 per card grande bento
Hover: scale immagine 1.05 (overflow hidden) + overlay gradient basso
Overlay info: zona + nome + anno — testo bianco
Badge tipologia: top-left accent
```

### FilterTabs
```
Pill indicator animata con Framer Motion layoutId
Filtri: zona | tipologia
Active: bg accent rosso, testo bianco
Inactive: testo secondary, hover testo primary
Spring: stiffness 300, damping 30
```

### MappaZoneSection
```
Leaflet.js — import dinamico: dynamic(() => import('./MapComponent'), { ssr: false })
Centro mappa: [44.8015, 10.3279] (Parma)
Zoom: 12
Tile: OpenStreetMap (gratuito)
Pin custom: SVG con colore green-mid
Popup: nome zona + breve descrizione + link "Scopri zona"
```

### RecensioniCarousel
```
Auto-scroll ogni 4s (pause on hover)
Card: avatar placeholder + nome + stelle SVG + testo + fonte Google
Transizione: Framer Motion slide orizzontale
Indicatori puntini in basso — accent attivo, muted inattivo
```

### WhatsAppFAB
```
Fixed bottom-right: right-6 bottom-6 / right-8 bottom-8
Rounded-full, bg #25D366, hover #1EB854
Icon: Phosphor WhatsAppLogo — 24px bianco
Label: "Scrivici" su md+ (con transizione width)
Entry: Framer Motion slideInRight dopo 2s
Href: https://wa.me/393396499106
aria-label: "Contattaci su WhatsApp"
```

### Form Inputs (ContactForm, ImmobileInquiryForm)
```
Stile: border-bottom 1px solid --color-border (no box)
Focus: border-bottom 2px accent + label floating (transform translateY)
Label: Inter 500, transizione colore e posizione
Error: Inter 400 12px, color accent, icona WarningCircle Phosphor, role="alert"
Submit loading: spinner nel bottone (non disabilitare form)
Submit success: check verde + messaggio "Ricevuto! Ti risponderemo entro 24 ore."
Reset form dopo 4s dal success
```

---

## 9. EFFETTI VISIVI

### Overlay Immagini Hero
```css
/* Gradient che lascia visibile l'immagine ma rende leggibile il testo */
background: linear-gradient(
  to top,
  rgba(0, 0, 0, 0.65) 0%,
  rgba(0, 0, 0, 0.30) 50%,
  rgba(0, 0, 0, 0.10) 100%
);
```

### Liquid Glass (solo navbar scrolled)
```css
background: rgba(255, 255, 255, 0.88);
backdrop-filter: blur(16px) saturate(160%);
border: 1px solid rgba(232, 229, 222, 0.7);
box-shadow: 0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9);
```

### Hover Immagini Portfolio
```css
/* Scale overflow hidden — evita clip weird */
.card-image-wrapper { overflow: hidden; }
.card-image-wrapper img { transition: transform 0.5s cubic-bezier(0.22,1,0.36,1); }
.card:hover .card-image-wrapper img { transform: scale(1.05); }
```

### Texture Sottile (opzionale per sezioni crema)
```css
/* Grain leggero su sezioni bg-alt */
.section-alt::after {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.025;
  pointer-events: none;
  background-image: url("data:image/svg+xml,..."); /* feTurbulence */
}
```

### Separatore Sezioni
```css
/* Border sottile decorativo tra sezioni */
border-top: 1px solid var(--color-border);
/* Oppure: icona mattoncino / ornamento architettonico in SVG */
```

---

## 10. PATTERN PROIBITI

**Visual:**
- Sfondo nero o dark (#000, #111, #1a1a1a come sfondo base) — LIGHT FIRST
- Gradienti viola/teal/neon
- Box-shadow neon colorate esterne
- Border-radius > 16px su card immobili principali (> 24px su elementi piccoli)

**Tipografia:**
- Playfair Display per testo corpo (solo per titoli)
- Titoli in gradient clip colorati
- H1 centrato su sfondo bianco senza ragione
- Punto esclamativo nei titoli di sezione

**Layout:**
- 3 card feature identiche in riga su desktop
- Grid perfettamente simmetrico per il portfolio
- Hero con testo al centro verticale (generico)

**Contenuto:**
- "La tua casa dei sogni" — vietato
- "Qualità ineguagliabile" / "Leader del settore" — vietato
- CTA "Scopri di più" o "Clicca qui" — vietato
- Prezzi senza formattazione: "280000" → "€ 280.000"
- Metrature senza unità: "120" → "120 m²"

**Tecnico:**
- `h-screen` → sempre `min-h-[100dvh]`
- `<img>` raw → sempre `next/image`
- Leaflet senza `dynamic()` → rompe SSR
- `window.addEventListener('scroll')` → ScrollTrigger o useScroll
- GSAP senza `gsap.context()` → memory leak
- `any` in TypeScript → errore di build

---

## 11. ACCESSIBILITÀ — NON NEGOZIABILE

- Contrasto testo/sfondo: min 4.5:1 body, min 3:1 large text
- Focus visible: outline 2px accent su tutti gli interattivi
- `prefers-reduced-motion`: disabilita animazioni, mantieni transizioni opacity brevi
- `aria-label` su: hamburger, FAB WhatsApp, icone standalone
- Form: label associata, error con `role="alert"`
- Immagini decorative: `alt=""` — content: alt descrittivo in italiano
- Link nuova tab: sempre `rel="noopener noreferrer"`
- Mappa Leaflet: alternativa testuale con lista zone

---

## 12. QUICK REFERENCE — UTILITY FUNCTIONS

```typescript
// lib/utils.ts

// Formatta prezzo in stile italiano
export function formatPrice(price: number | undefined): string {
  if (!price) return 'Prezzo su richiesta'
  return `€ ${price.toLocaleString('it-IT')}`
}

// Formatta metratura
export function formatMq(mq: number): string {
  return `${mq} m²`
}

// Formatta zona per display
export function formatZona(zona: ZonaParma): string {
  const map: Record<ZonaParma, string> = {
    'parma-mia': 'Parma Mia',
    'eurosia': 'Eurosia',
    'vicofertile': 'Vicofertile',
    'via-schubert': 'Via Schubert',
    'corcagnano': 'Corcagnano',
    'collecchio': 'Collecchio',
    'centro': 'Centro Parma',
  }
  return map[zona]
}

// Classe energetica → colore badge
export function classeColor(classe: string): string {
  const map: Record<string, string> = {
    'A4': '#00A550', 'A3': '#2DB34A', 'A2': '#5EC626',
    'A1': '#96D600', 'B': '#D4E600', 'C': '#F5C000',
  }
  return map[classe] ?? '#6B7280'
}
```