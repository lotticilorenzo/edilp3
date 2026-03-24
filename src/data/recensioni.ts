import { Recensione } from '../types'

export const recensioni: Recensione[] = [
  {
    id: 'rec-1',
    nome: 'Marco e Giulia Bernardi',
    stelle: 5,
    testo: 'Abbiamo comprato casa in Parma Mia con Edil P.3. L\'assistenza in cantiere è stata eccellente, ci hanno guidato nella scelta di ogni finitura. La casa è calda d\'inverno e freschissima d\'estate: le bollette sono irrisorie. Veri professionisti!',
    data: 'Settembre 2023',
    fonte: 'google'
  },
  {
    id: 'rec-2',
    nome: 'Alessio Trombi',
    stelle: 5,
    testo: 'Qualità costruttiva fuori dal comune. Dopo aver girato diversi cantieri a Parma, l\'attenzione al dettaglio e lo spessore delle pareti (non si sente una mosca dai vicini) ci ha convinto subito. Assolutamente consigliati.',
    data: 'Dicembre 2022',
    fonte: 'google'
  },
  {
    id: 'rec-3',
    nome: 'Famiglia Rossi',
    stelle: 5,
    testo: 'Competenza, serietà e rispetto delle tempistiche. La nostra nuova villa a Collecchio è stata consegnata nei tempi stabiliti nonostante il periodo difficile. Il titolare è sempre stato disponibile per chiarimenti in ogni fase.',
    data: 'Marzo 2021',
    fonte: 'google'
  }
]
