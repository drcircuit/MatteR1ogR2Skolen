import { useState, useEffect, useCallback } from 'react'
import type { Exercise, CourseId, QuestionResult } from '@/types'
import { MultipleChoice } from '@/features/exercises/MultipleChoice'
import { FreeResponse } from '@/features/exercises/FreeResponse'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'

interface ExamRunnerProps {
  title: string
  questions: Exercise[]
  durationMinutes?: number
  courseId?: CourseId
  onComplete: (results: QuestionResult[], durationSeconds: number) => void
}

export function ExamRunner({ title, questions, durationMinutes, courseId: _courseId, onComplete }: ExamRunnerProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Map<number, { answer: string | number; correct: boolean }>>(new Map())
  const [timeLeft, setTimeLeft] = useState(durationMinutes ? durationMinutes * 60 : null)
  const [startTime] = useState(Date.now())
  const [submitted, setSubmitted] = useState(false)

  const handleFinish = useCallback(() => {
    if (submitted) return
    setSubmitted(true)
    const duration = Math.round((Date.now() - startTime) / 1000)
    const results: QuestionResult[] = questions.map((q, i) => {
      const ans = answers.get(i)
      return {
        exerciseId: q.id,
        correct: ans?.correct ?? false,
        userAnswer: ans?.answer ?? '',
      }
    })
    onComplete(results, duration)
  }, [submitted, startTime, questions, answers, onComplete])

  // Nedtelling
  useEffect(() => {
    if (timeLeft === null) return
    if (timeLeft <= 0) {
      handleFinish()
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => (t ?? 1) - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, handleFinish])

  const handleAnswer = (correct: boolean, answer: string | number) => {
    setAnswers((prev) => new Map(prev).set(current, { answer, correct }))
  }

  const handleMCAnswer = (assessment: { correct: boolean; submittedAnswer?: string }) => {
    setAnswers((prev) => new Map(prev).set(current, {
      answer: assessment.submittedAnswer ?? (assessment.correct ? 'riktig' : 'feil'),
      correct: assessment.correct,
    }))
  }

  const progress = ((current + 1) / questions.length) * 100
  const answered = answers.has(current)

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  if (questions.length === 0) {
    return <p className="text-gray-600">Ingen spørsmål tilgjengelig.</p>
  }

  const question = questions[current]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">{title}</h2>
          {timeLeft !== null && (
            <div className={`font-mono font-bold text-lg ${timeLeft < 60 ? 'text-red-600' : 'text-gray-700'}`}>
              ⏱ {formatTime(timeLeft)}
            </div>
          )}
        </div>
        <ProgressBar
          value={progress}
          label={`Spørsmål ${current + 1} av ${questions.length}`}
          showPercent
          size="sm"
        />
      </div>

      {/* Spørsmål */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5">
        <div className="mb-1 text-xs text-gray-400 uppercase tracking-wide">
          Spørsmål {current + 1}
        </div>
        {question.type === 'multiple-choice' ? (
          <MultipleChoice
            exercise={question}
            onAnswer={handleMCAnswer}
            showHint={false}
            disabled={submitted}
          />
        ) : (
          <FreeResponse
            exercise={question}
            onAnswer={(assessment) => handleAnswer(assessment.correct, assessment.submittedAnswer ?? '')}
            disabled={submitted}
          />
        )}
      </div>

      {/* Navigasjon */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          ← Forrige
        </Button>
        <div className="flex gap-3">
          {current < questions.length - 1 ? (
            <Button onClick={() => setCurrent((c) => c + 1)}>
              Neste →
            </Button>
          ) : (
            <Button variant="success" onClick={handleFinish}>
              Lever eksamen ✓
            </Button>
          )}
        </div>
      </div>

      {/* Spørsmålsoversikt */}
      <div className="mt-5 bg-white rounded-xl border border-gray-200 p-4">
        <p className="text-xs text-gray-500 mb-2">Spørsmålsoversikt</p>
        <div className="flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                i === current
                  ? 'bg-blue-600 text-white'
                  : answers.has(i)
                  ? 'bg-green-100 text-green-700 border border-green-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {answers.size} av {questions.length} besvart
        </p>
      </div>

      {/* Hint om ubesvarte */}
      {!answered && (
        <p className="text-sm text-amber-600 mt-3 text-center">
          💡 Du har ikke svart på dette spørsmålet ennå
        </p>
      )}
    </div>
  )
}
