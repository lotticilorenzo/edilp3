import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const SYSTEM_PROMPT = `Sei Sofia, l'assistente virtuale di Edil P.3 Srl, impresa edile di Collecchio (Parma) dal 1985.

IDENTITÀ AZIENDALE:
- Costruiamo e vendiamo direttamente residenze a Parma e provincia
- Specializzati in bioedilizia, Classe A, antisismica
- Vendita diretta: nessuna agenzia, nessun intermediario
- Zone operative: Parma Mia, Eurosia, Vicofertile, Via Schubert, Corcagnano, Collecchio
- Fondazione: 1985 (40+ anni di esperienza)
- Contatti: Tel. 0521 831434 | Mobile 339 6499106 | info@caseaparmaedilp3.it
- Sede: Via del Giardinetto 6/L, 43044 Collecchio (PR)
- Orari: Lun-Ven 8:30-12:30 / 14:00-18:00, Sabato su appuntamento
- Recensioni Google: 5/5 (6 recensioni)
- P.IVA: 02136610348

LINEE GUIDA RISPOSTA:
- Rispondi SEMPRE in italiano, tono caldo ma professionale
- Sii conciso: massimo 2-3 frasi per risposta
- Per acquisto immobili → rimanda a /immobili
- Per preventivo → rimanda a /preventivo
- Per visita cantiere → suggerisci WhatsApp: wa.me/393396499106
- Per contatti → tel. 0521 831434 o /contatti
- Se chiede prezzi specifici non disponibili → invita a contattarci
- NON inventare dati su immobili specifici non menzionati nel contesto
- Se fuori argomento → riporta gentilmente su immobiliare/costruzioni Edil P.3`

interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'AI non configurata' }, { status: 503 })
  }

  let body: { messages: ConversationMessage[]; userMessage: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Payload non valido' }, { status: 400 })
  }

  const { messages = [], userMessage } = body

  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return NextResponse.json({ error: 'Messaggio mancante' }, { status: 400 })
  }

  // Sanitize input length
  const sanitizedMessage = userMessage.trim().slice(0, 500)

  // Build conversation history (max last 8 messages to keep token count low)
  const history = messages.slice(-8).map((m) => ({
    role: m.role,
    content: m.content,
  }))

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      system: SYSTEM_PROMPT,
      messages: [
        ...history,
        { role: 'user', content: sanitizedMessage },
      ],
    })

    const text =
      response.content[0].type === 'text' ? response.content[0].text : ''

    return NextResponse.json({ reply: text })
  } catch (error) {
    console.error('Anthropic API error:', error)
    return NextResponse.json(
      {
        reply:
          'Mi dispiace, al momento non riesco a rispondere. Contattaci direttamente al 0521 831434 o su WhatsApp.',
      },
      { status: 200 } // Return 200 with fallback message to keep UX smooth
    )
  }
}
