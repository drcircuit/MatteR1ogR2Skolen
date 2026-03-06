import { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import type { CourseId, QuestionResult } from '@/types'
import { r1Course } from '@/data/r1'
import { r2Course } from '@/data/r2'
import { ExamRunner } from '@/features/exams/ExamRunner'
import { ExamResultView } from '@/features/exams/ExamResult'
import { useProgress } from '@/hooks/useProgress'
import { useAuthStore } from '@/store/authStore'

export default function ExamPage() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const [examResult, setExamResult] = useState<{
    questionResults: QuestionResult[]
    durationSeconds: number
  } | null>(null)

  const { recordQuizResult } = useProgress()
  const user = useAuthStore((s) => s.user)

  const course = courseId === 'r1' ? r1Course : courseId === 'r2' ? r2Course : null
  if (!course) return <Navigate to="/dashboard" replace />

  const module = course.modules.find((m) => m.id === moduleId)
  if (!module) return <Navigate to={`/kurs/${courseId}`} replace />

  const quiz = module.quiz

  const handleComplete = (results: QuestionResult[], duration: number) => {
    const correct = results.filter((r) => r.correct).length
    const total = results.length
    const score = total > 0 ? Math.round((correct / total) * 100) : 0

    if (user) {
      recordQuizResult(
        quiz.id,
        module.id,
        courseId as CourseId,
        score,
        correct,
        total,
      )
    }
    setExamResult({ questionResults: results, durationSeconds: duration })
  }

  if (examResult) {
    const correct = examResult.questionResults.filter((r) => r.correct).length
    const result = {
      userId: user?.id ?? '',
      examTitle: quiz.title,
      courseId: courseId as CourseId,
      score: quiz.questions.length > 0 ? Math.round((correct / quiz.questions.length) * 100) : 0,
      correctCount: correct,
      totalCount: quiz.questions.length,
      durationSeconds: examResult.durationSeconds,
      completedAt: new Date().toISOString(),
      questionResults: examResult.questionResults,
    }
    return (
      <div>
        <ExamResultView result={result} onRetry={() => setExamResult(null)} />
        <p className="text-center mt-4">
          <Link to={`/kurs/${courseId}/modul/${moduleId}`} className="text-sm text-blue-600 hover:underline">
            ← Tilbake til modulen
          </Link>
        </p>
      </div>
    )
  }

  return (
    <div>
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to={`/kurs/${courseId}/modul/${moduleId}`} className="hover:text-gray-700">{module.title}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Quiz</span>
      </nav>
      <div className="mb-6 bg-white rounded-xl border border-gray-200 p-5">
        <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {quiz.questions.length} spørsmål · Bestått ved {quiz.passingScore}%
        </p>
      </div>
      <ExamRunner
        title={quiz.title}
        questions={quiz.questions}
        courseId={courseId as CourseId}
        onComplete={handleComplete}
      />
    </div>
  )
}
