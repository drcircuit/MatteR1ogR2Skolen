import type { TutorMessage, TutorContext } from '@/types'
import { getOpenAIClient } from './client'

const SYSTEM_PROMPT = `Du er en erfaren og tålmodig matematikklærer som spesialiserer seg i Matematikk R1 og R2 for norsk videregående skole (VGS).

Dine oppgaver:
- Forklar matematiske konsepter klart og tydelig på norsk bokmål
- Gi steg-for-steg løsninger når elever ber om det
- Bruk LaTeX for matematiske uttrykk (omsluttet av $ for inline og $$ for blokk)
- Oppmuntre elevene og vær positiv
- Still spørsmål tilbake for å sjekke forståelsen
- Tilpass forklaringene til elevens nivå
- Koble nye begreper til begreper eleven allerede kan
- Gi konkrete eksempler fra hverdagen der det er mulig

Du svarer alltid på norsk bokmål, med mindre eleven eksplisitt ber om noe annet.
Unngå å gi direktesvaret på oppgaver uten at eleven har prøvd selv – still heller ledende spørsmål.`

function buildContextMessage(context: TutorContext): string {
  const parts: string[] = []
  if (context.courseId) {
    parts.push(`Eleven jobber med ${context.courseId.toUpperCase()}.`)
  }
  if (context.moduleTitle) {
    parts.push(`Nåværende modul: "${context.moduleTitle}".`)
  }
  if (context.lessonTitle) {
    parts.push(`Nåværende leksjon: "${context.lessonTitle}".`)
  }
  if (context.lessonContent) {
    const snippet = context.lessonContent.slice(0, 500)
    parts.push(`Leksjonsinnhold (utdrag): ${snippet}`)
  }
  return parts.join(' ')
}

export async function sendTutorMessage(
  apiKey: string,
  messages: TutorMessage[],
  context: TutorContext,
  model = 'gpt-4o-mini',
  onChunk?: (chunk: string) => void,
): Promise<string> {
  const client = getOpenAIClient(apiKey)

  const systemMessages: Array<{ role: 'system'; content: string }> = [
    { role: 'system', content: SYSTEM_PROMPT },
  ]

  const contextMsg = buildContextMessage(context)
  if (contextMsg) {
    systemMessages.push({ role: 'system', content: contextMsg })
  }

  const conversationMessages = messages
    .filter((m) => m.role !== 'system')
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  const allMessages = [...systemMessages, ...conversationMessages]

  if (onChunk) {
    const stream = await client.chat.completions.create({
      model,
      messages: allMessages,
      stream: true,
      max_tokens: 1500,
      temperature: 0.7,
    })

    let fullContent = ''
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? ''
      if (delta) {
        fullContent += delta
        onChunk(delta)
      }
    }
    return fullContent
  } else {
    const response = await client.chat.completions.create({
      model,
      messages: allMessages,
      max_tokens: 1500,
      temperature: 0.7,
    })
    return response.choices[0]?.message?.content ?? ''
  }
}
