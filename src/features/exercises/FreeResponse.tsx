import { useState } from 'react'
import type { FreeResponseExercise } from '@/types'
import { Button } from '@/components/ui/Button'
import { LessonContent } from '@/features/lessons/LessonContent'
import { assessFreeResponseAnswer } from '@/lib/openai/exerciseAssessmentService'
import { useSettingsStore } from '@/store/settingsStore'

const PASSING_SCORE_THRESHOLD = 60

interface FreeResponseProps {
  exercise: FreeResponseExercise
  onAnswer: (assessment: {
    correct: boolean
    submittedAnswer?: string
    assessmentFeedback?: string
    assessmentScore?: number
  }) => void
  disabled?: boolean
}

export function FreeResponse({ exercise, onAnswer, disabled = false }: FreeResponseProps) {
  const openaiApiKey = useSettingsStore((s) => s.openaiApiKey)
  const aiModel = useSettingsStore((s) => s.aiModel)
  const [userAnswer, setUserAnswer] = useState('')
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [attempted, setAttempted] = useState(false)
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [assessment, setAssessment] = useState<{ score: number; feedback: string; method: 'openai' | 'lokal' } | null>(null)

  const handleAttempt = async () => {
    if (!userAnswer.trim()) return
    setIsEvaluating(true)
    const evaluation = await assessFreeResponseAnswer(exercise, userAnswer, openaiApiKey, aiModel)
    setAssessment(evaluation)
    setAttempted(true)
    onAnswer({
      correct: evaluation.score >= PASSING_SCORE_THRESHOLD,
      submittedAnswer: userAnswer.trim(),
      assessmentFeedback: evaluation.feedback,
      assessmentScore: evaluation.score,
    })
    setIsEvaluating(false)
  }

  const handleReveal = () => {
    setShowSolution(true)
    if (!attempted) {
      setAttempted(true)
      setAssessment({
        score: 0,
        feedback: 'Ingen innlevering registrert. Oppgaven ble hoppet over.',
        method: 'lokal',
      })
      onAnswer({
        correct: false,
        submittedAnswer: '',
        assessmentFeedback: 'Oppgaven ble hoppet over uten innlevering.',
        assessmentScore: 0,
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Spørsmål */}
      <div className="text-gray-900 font-medium">
        <LessonContent content={exercise.question} />
      </div>

      {/* Svarinput */}
      {!showSolution && (
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          disabled={disabled}
          placeholder="Skriv svaret ditt her..."
          className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
          rows={4}
        />
      )}

      {/* Hint */}
      {exercise.hint && !showSolution && (
        <button
          onClick={() => setShowHint(!showHint)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          💡 {showHint ? 'Skjul hint' : 'Vis hint'}
        </button>
      )}
      {showHint && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <LessonContent content={exercise.hint ?? ''} />
        </div>
      )}

      {/* Vis svar */}
      {showSolution && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-semibold text-blue-800 mb-2">📖 Eksempelsvar</p>
          <div className="text-sm text-blue-900">
            <LessonContent content={exercise.sampleAnswer} />
          </div>
          <p className="font-semibold text-blue-800 mb-2 mt-3">💡 Forklaring</p>
          <div className="text-sm text-blue-900">
            <LessonContent content={exercise.explanation} />
          </div>
        </div>
      )}

      {assessment && (
        <div className={`rounded-xl p-4 border ${assessment.score >= 60 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
          <p className={`font-semibold mb-1 ${assessment.score >= 60 ? 'text-green-800' : 'text-amber-800'}`}>
            Vurdering: {assessment.score}%
          </p>
          <p className={`text-sm ${assessment.score >= 60 ? 'text-green-700' : 'text-amber-700'}`}>
            {assessment.feedback}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Metode: {assessment.method === 'openai' ? 'OpenAI-vurdering' : 'Lokal vurdering'}
          </p>
        </div>
      )}

      {/* Knapper */}
      <div className="flex gap-3 flex-wrap">
        {!attempted && !showSolution && (
          <Button onClick={handleAttempt} disabled={!userAnswer.trim() || disabled || isEvaluating}>
            {isEvaluating ? 'Vurderer…' : 'Levér svar'}
          </Button>
        )}
        {!showSolution && (
          <Button variant="ghost" onClick={handleReveal}>
            {attempted ? '📖 Se løsning' : '👀 Vis løsning (hopp over)'}
          </Button>
        )}
        {attempted && (
          <p className="text-sm text-green-600 flex items-center gap-1">
            ✓ Besvart – sammenlign med eksempelsvar
          </p>
        )}
      </div>
    </div>
  )
}
