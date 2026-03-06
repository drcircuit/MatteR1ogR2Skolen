import { useParams, Navigate } from 'react-router-dom'
import type { CourseId } from '@/types'
import { contentRepository } from '@/data/contentRepository'
import { ModuleList } from '@/features/curriculum/ModuleList'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useProgress } from '@/hooks/useProgress'

export default function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { completedLessons, getModuleLessonProgress } = useProgress()

  const course = contentRepository.getCourse(courseId)
  if (!course) return <Navigate to="/dashboard" replace />

  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id))
  const progress = allLessonIds.length > 0
    ? Math.round((allLessonIds.filter((id) => completedLessons.has(id)).length / allLessonIds.length) * 100)
    : 0

  const isR1 = course.id === 'r1'

  return (
    <div>
      {/* Overskrift */}
      <div className={`rounded-2xl p-6 mb-6 ${isR1 ? 'bg-gradient-to-r from-blue-600 to-blue-700' : 'bg-gradient-to-r from-green-600 to-green-700'} text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-1">{course.title}</h1>
            <p className="text-sm opacity-80">{course.description}</p>
          </div>
          <div className="text-right shrink-0 ml-4">
            <p className="text-3xl font-bold">{progress}%</p>
            <p className="text-xs opacity-80">fullført</p>
          </div>
        </div>
        <div className="mt-4">
          <ProgressBar
            value={progress}
            size="md"
            color={isR1 ? 'blue' : 'green'}
            className="[&_.bg-blue-600]:bg-white/50 [&_.bg-green-500]:bg-white/50"
          />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
          <div className="bg-white/20 rounded-lg py-2">
            <p className="font-bold text-lg">{course.modules.length}</p>
            <p className="text-xs opacity-80">Moduler</p>
          </div>
          <div className="bg-white/20 rounded-lg py-2">
            <p className="font-bold text-lg">{allLessonIds.length}</p>
            <p className="text-xs opacity-80">Leksjoner</p>
          </div>
          <div className="bg-white/20 rounded-lg py-2">
            <p className="font-bold text-lg">
              {course.modules.reduce((s, m) => s + m.exercises.length, 0)}
            </p>
            <p className="text-xs opacity-80">Oppgaver</p>
          </div>
        </div>
      </div>

      {/* Moduler */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Moduler</h2>
      <ModuleList
        modules={course.modules}
        courseId={course.id as CourseId}
        getModuleProgress={(lessonIds) => getModuleLessonProgress(lessonIds)}
      />
    </div>
  )
}
