import { useParams, Navigate, Link } from 'react-router-dom'
import type { CourseId } from '@/types'
import { r1Course } from '@/data/r1'
import { r2Course } from '@/data/r2'
import { LessonCard } from '@/features/curriculum/LessonCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Button } from '@/components/ui/Button'
import { useProgress } from '@/hooks/useProgress'

export default function ModulePage() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const { isLessonCompleted, getModuleLessonProgress } = useProgress()

  const course = courseId === 'r1' ? r1Course : courseId === 'r2' ? r2Course : null
  if (!course) return <Navigate to="/dashboard" replace />

  const module = course.modules.find((m) => m.id === moduleId)
  if (!module) return <Navigate to={`/kurs/${courseId}`} replace />

  const lessonIds = module.lessons.map((l) => l.id)
  const progress = getModuleLessonProgress(lessonIds)

  return (
    <div>
      {/* Brødsmulesti */}
      <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
        <Link to={`/kurs/${courseId}`} className="hover:text-gray-700">{courseId?.toUpperCase()}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">{module.title}</span>
      </nav>

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">{module.title}</h1>
        <p className="text-gray-500 mb-4">{module.description}</p>
        <div className="grid grid-cols-3 gap-3 text-center text-sm mb-4">
          <div className="bg-gray-50 rounded-lg py-2">
            <p className="font-bold">{module.lessons.length}</p>
            <p className="text-gray-500 text-xs">Leksjoner</p>
          </div>
          <div className="bg-gray-50 rounded-lg py-2">
            <p className="font-bold">{module.exercises.length}</p>
            <p className="text-gray-500 text-xs">Oppgaver</p>
          </div>
          <div className="bg-gray-50 rounded-lg py-2">
            <p className="font-bold">Quiz</p>
            <p className="text-gray-500 text-xs">Avsluttende test</p>
          </div>
        </div>
        <ProgressBar value={progress} showPercent label="Fremgang" size="sm" />
      </div>

      {/* Leksjoner */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Leksjoner</h2>
        <div className="space-y-2">
          {module.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              courseId={courseId as CourseId}
              moduleId={module.id}
              completed={isLessonCompleted(lesson.id)}
            />
          ))}
        </div>
      </section>

      {/* Handlinger */}
      <div className="flex flex-wrap gap-3">
        <Link to={`/kurs/${courseId}/modul/${moduleId}/oppgaver`}>
          <Button variant="secondary">✏️ Oppgaver ({module.exercises.length})</Button>
        </Link>
        <Link to={`/kurs/${courseId}/modul/${moduleId}/quiz`}>
          <Button variant="secondary">🎯 Ta modulquiz</Button>
        </Link>
      </div>
    </div>
  )
}
