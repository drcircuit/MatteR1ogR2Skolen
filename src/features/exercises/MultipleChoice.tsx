import { useState } from 'react'
import type { MultipleChoiceExercise } from '@/types'
import { Button } from '@/components/ui/Button'
import { LessonContent } from '@/features/lessons/LessonContent'
import clsx from 'clsx'

interface MultipleChoiceProps {
  exercise: MultipleChoiceExercise
  onAnswer: (assessment: {
    correct: boolean
    submittedAnswer?: string
    assessmentFeedback?: string
    assessmentScore?: number
  }) => void
  showHint?: boolean
  disabled?: boolean
}

export function MultipleChoice({ exercise, onAnswer, showHint = true, disabled = false }: MultipleChoiceProps) {
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [showHintText, setShowHintText] = useState(false)

  const isCorrect = selected === exercise.correctIndex

  const handleSubmit = () => {
    if (selected === null) return
    setSubmitted(true)
    onAnswer({
      correct: isCorrect,
      submittedAnswer: exercise.options[selected],
      assessmentFeedback: isCorrect ? 'Riktig svar.' : 'Feil svar.',
      assessmentScore: isCorrect ? 100 : 0,
    })
  }

  const handleReset = () => {
    setSelected(null)
    setSubmitted(false)
    setShowHintText(false)
  }

  return (
    <div className="space-y-4">
      {/* Spørsmål */}
      <div className="text-gray-900 font-medium">
        <LessonContent content={exercise.question} />
      </div>

      {/* Alternativer */}
      <div className="space-y-2">
        {exercise.options.map((option, idx) => {
          let stateClass = 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
          if (submitted) {
            if (idx === exercise.correctIndex) {
              stateClass = 'border-green-500 bg-green-50'
            } else if (idx === selected) {
              stateClass = 'border-red-400 bg-red-50'
            } else {
              stateClass = 'border-gray-200 opacity-60'
            }
          } else if (idx === selected) {
            stateClass = 'border-blue-500 bg-blue-50'
          }

          return (
            <button
              key={idx}
              disabled={submitted || disabled}
              onClick={() => setSelected(idx)}
              className={clsx(
                'w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm',
                stateClass,
              )}
            >
              <span className="inline-flex items-start gap-3">
                <span className={clsx(
                  'shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold',
                  idx === selected && !submitted ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-400 text-gray-600',
                  submitted && idx === exercise.correctIndex && 'border-green-500 bg-green-500 text-white',
                  submitted && idx === selected && idx !== exercise.correctIndex && 'border-red-500 bg-red-500 text-white',
                )}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>
                  <LessonContent content={option} />
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Hint */}
      {showHint && exercise.hint && !submitted && (
        <button
          onClick={() => setShowHintText(!showHintText)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          💡 {showHintText ? 'Skjul hint' : 'Vis hint'}
        </button>
      )}
      {showHintText && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
          <LessonContent content={exercise.hint ?? ''} />
        </div>
      )}

      {/* Forklaring etter svar */}
      {submitted && (
        <div className={`rounded-xl p-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <p className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
            {isCorrect ? '✓ Riktig!' : '✗ Feil svar'}
          </p>
          <div className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
            <LessonContent content={exercise.explanation} />
          </div>
        </div>
      )}

      {/* Knapper */}
      <div className="flex gap-3">
        {!submitted ? (
          <Button onClick={handleSubmit} disabled={selected === null || disabled}>
            Svar
          </Button>
        ) : (
          <Button variant="secondary" onClick={handleReset}>
            Prøv igjen
          </Button>
        )}
      </div>
    </div>
  )
}
