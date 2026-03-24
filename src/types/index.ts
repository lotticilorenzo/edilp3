export type ZonaParma =
  | 'parma-mia'
  | 'eurosia'
  | 'vicofertile'
  | 'via-schubert'
  | 'corcagnano'
  | 'collecchio'
  | 'centro'

export interface Immobile {
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
  prezzo?: number
  images: string[]
  planimetria?: string
  caratteristiche: string[]
  descrizione: string
  dataConsegna?: string
  badge?: 'Nuovo' | 'In costruzione' | 'Ultima disponibile' | 'Venduto'
}

export interface Zona {
  id: ZonaParma
  nome: string
  descrizione: string
  lat: number
  lng: number
  caratteristiche: string[]
  servizi: string[]
}

export interface Realizzazione {
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

export interface FormContattoData {
  nome: string
  cognome: string
  email: string
  telefono: string
  interesse: 'acquisto' | 'informazioni' | 'visita' | 'altro'
  immobileInteresse?: string
  messaggio: string
  privacyConsent: boolean
}

export interface Recensione {
  id: string
  nome: string
  stelle: 1 | 2 | 3 | 4 | 5
  testo: string
  data: string
  fonte: 'google'
}
