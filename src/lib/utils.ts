import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZonaParma } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | undefined): string {
  if (!price) return 'Prezzo su richiesta'
  return `€ ${price.toLocaleString('it-IT')}`
}

export function formatMq(mq: number): string {
  return `${mq} m²`
}

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

export function classeColor(classe: string): string {
  const map: Record<string, string> = {
    'A4': '#00A550', 'A3': '#2DB34A', 'A2': '#5EC626',
    'A1': '#96D600', 'B': '#D4E600', 'C': '#F5C000',
  }
  return map[classe] ?? '#6B7280'
}
