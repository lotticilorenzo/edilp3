import { Realizzazione } from '../types'

export const realizzazioni: Realizzazione[] = [
  {
    id: 'real-1',
    slug: 'residenza-i-tigli-collecchio',
    nome: 'Residenza I Tigli',
    zona: 'collecchio',
    tipologia: 'complesso',
    annoCompletamento: 2023,
    nrUnita: 12,
    images: ['/images/placeholder-real-1.jpg'],
    copertina: '/images/placeholder-real-1.jpg',
    caratteristiche: ['Classe A4', 'Isolamento acustico top', 'Verde condominiale privato'],
    descrizione: 'Un elegante complesso residenziale nel cuore di Collecchio. Altissimo risparmio energetico e finiture di lusso.'
  },
  {
    id: 'real-2',
    slug: 'ville-schubert',
    nome: 'Ville di via Schubert',
    zona: 'via-schubert',
    tipologia: 'villa',
    annoCompletamento: 2021,
    nrUnita: 4,
    images: ['/images/placeholder-real-2.jpg'],
    copertina: '/images/placeholder-real-2.jpg',
    caratteristiche: ['Piscina privata', 'Riscaldamento geotermico', 'Design moderno asimmetrico'],
    descrizione: 'Quattro scenografiche ville indipendenti dal design pulito e contemporaneo.'
  },
  {
    id: 'real-3',
    slug: 'palazzo-eurosia',
    nome: 'Palazzo Eurosia',
    zona: 'eurosia',
    tipologia: 'appartamento',
    annoCompletamento: 2019,
    nrUnita: 18,
    images: ['/images/placeholder-real-3.jpg'],
    copertina: '/images/placeholder-real-3.jpg',
    caratteristiche: ['Vetri tripli', 'Terrazzi loggiati a sud', 'Parcheggio interrato triplo'],
    descrizione: 'Signorile palazzina vicino ai principali servizi commerciali. Comfort acustico e termico d\'eccellenza.'
  }
]
