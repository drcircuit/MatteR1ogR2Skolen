import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lesson, Module, CourseId } from '@/types'
import { LessonContent } from './LessonContent'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useProgress } from '@/hooks/useProgress'

interface LessonViewerProps {
  lesson: Lesson
  module: Module
  courseId: CourseId
  nextLesson?: Lesson | null
  prevLesson?: Lesson | null
}

export function LessonViewer({ lesson, module, courseId, nextLesson, prevLesson }: LessonViewerProps) {
  const [showGoals, setShowGoals] = useState(false)
  const [completed, setCompleted] = useState(false)
  const navigate = useNavigate()
  const { completeLesson, isLessonCompleted } = useProgress()
  const alreadyDone = isLessonCompleted(lesson.id)

  const handleComplete = () => {
    completeLesson(lesson.id, module.id, courseId)
    setCompleted(true)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Brødsmulesti */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <button onClick={() => navigate(`/kurs/${courseId}`)} className="hover:text-gray-700">
          {courseId.toUpperCase()}
        </button>
        <span>/</span>
        <button onClick={() => navigate(`/kurs/${courseId}/modul/${module.id}`)} className="hover:text-gray-700">
          {module.title}
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">{lesson.title}</span>
      </nav>

      {/* Overskrift */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          {(alreadyDone || completed) && <Badge variant="success">Fullført</Badge>}
        </div>
        <p className="text-sm text-gray-500">⏱ ca. {lesson.estimatedMinutes} min</p>
      </div>

      {/* Læringsmål */}
      <div className="mb-6 bg-blue-50 rounded-xl p-4">
        <button
          onClick={() => setShowGoals(!showGoals)}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-sm font-semibold text-blue-800">📋 Læringsmål</span>
          <span className="text-blue-600">{showGoals ? '▲' : '▼'}</span>
        </button>
        {showGoals && (
          <ul className="mt-3 space-y-1">
            {lesson.learningGoals.map((goal, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-900">
                <span className="mt-0.5">•</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Innhold */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <LessonContent content={lesson.content} />
      </div>

      {/* Fullfør-knapp */}
      {!alreadyDone && !completed && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Ferdig med leksjonen? Marker den som fullført for å spore fremgangen din.
          </p>
          <Button onClick={handleComplete} variant="success">
            ✓ Marker som fullført
          </Button>
        </div>
      )}

      {(alreadyDone || completed) && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-6">
          <p className="text-green-800 font-medium">🎉 Bra jobbet! Leksjonen er fullført.</p>
          <p className="text-sm text-green-700 mt-1">Prøv oppgavene for å teste forståelsen din.</p>
          <Button
            className="mt-3"
            variant="success"
            size="sm"
            onClick={() => navigate(`/kurs/${courseId}/modul/${module.id}/oppgaver`)}
          >
            Gå til oppgaver →
          </Button>
        </div>
      )}

      {/* Navigasjon */}
      <div className="flex justify-between">
        <Button
          variant="secondary"
          onClick={() => {
            if (prevLesson) {
              navigate(`/kurs/${courseId}/modul/${module.id}/leksjon/${prevLesson.id}`)
            } else {
              navigate(`/kurs/${courseId}/modul/${module.id}`)
            }
          }}
        >
          ← {prevLesson ? prevLesson.title : 'Tilbake til modul'}
        </Button>
        {nextLesson && (
          <Button
            onClick={() => navigate(`/kurs/${courseId}/modul/${module.id}/leksjon/${nextLesson.id}`)}
          >
            {nextLesson.title} →
          </Button>
        )}
      </div>
    </div>
  )
}
