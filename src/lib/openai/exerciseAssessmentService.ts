import type { FreeResponseExercise } from '@/types'
import { getOpenAIClient } from './client'

interface FreeResponseAssessment {
  score: number
  feedback: string
  method: 'openai' | 'lokal'
}

const MIN_LONG_ANSWER_LENGTH = 25
const LONG_ANSWER_SCORE = 70
const SHORT_ANSWER_SCORE = 55

function clampScore(score: unknown): number {
  if (!Number.isFinite(score)) return 0
  return Math.min(100, Math.max(0, Math.round(score as number)))
}

function fallbackAssessment(exercise: FreeResponseExercise, userAnswer: string): FreeResponseAssessment {
  const answer = userAnswer.toLowerCase()
  const keywords = exercise.keywords ?? []
  if (keywords.length === 0) {
    return {
      score: answer.length > MIN_LONG_ANSWER_LENGTH ? LONG_ANSWER_SCORE : SHORT_ANSWER_SCORE,
      feedback: 'Svaret er registrert. Sammenlign med eksempelsvaret for å forbedre presisjon og begrepsbruk.',
      method: 'lokal',
    }
  }

  const hits = keywords.filter((k) => answer.includes(k.toLowerCase())).length
  const score = Math.round((hits / keywords.length) * 100)
  return {
    score,
    feedback: score >= 60
      ? 'God måloppnåelse basert på nøkkelbegreper i svaret ditt.'
      : 'Delvis måloppnåelse. Prøv å bruke flere sentrale begreper fra teorien.',
    method: 'lokal',
  }
}

export async function assessFreeResponseAnswer(
  exercise: FreeResponseExercise,
  userAnswer: string,
  apiKey: string,
  model: string,
): Promise<FreeResponseAssessment> {
  if (!apiKey.trim()) {
    return fallbackAssessment(exercise, userAnswer)
  }

  try {
    const client = getOpenAIClient(apiKey)
    const response = await client.chat.completions.create({
      model,
      temperature: 0.2,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: 'Du vurderer mattebesvarelser i R1/R2. Returner kun JSON med feltene score (0-100 heltall) og feedback (kort norsk tekst).',
        },
        {
          role: 'user',
          content: `Oppgave: ${exercise.question}\nEksempelsvar: ${exercise.sampleAnswer}\nForklaring: ${exercise.explanation}\nElevsvar: ${userAnswer}`,
        },
      ],
      max_tokens: 250,
    })

    const raw = response.choices[0]?.message?.content ?? '{}'
    const parsed = JSON.parse(raw) as { score?: number; feedback?: string }
    const score = clampScore(parsed.score)
    const feedback = typeof parsed.feedback === 'string' && parsed.feedback.trim().length > 0
      ? parsed.feedback
      : 'Svar vurdert. Sammenlign med eksempelsvaret for mer læring.'

    return { score, feedback, method: 'openai' }
  } catch {
    return fallbackAssessment(exercise, userAnswer)
  }
}
