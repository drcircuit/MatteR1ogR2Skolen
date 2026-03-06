import { Link } from 'react-router-dom'
import type { Module, CourseId } from '@/types'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'

interface ModuleListProps {
  modules: Module[]
  courseId: CourseId
  getModuleProgress: (lessonIds: string[]) => number
}

export function ModuleList({ modules, courseId, getModuleProgress }: ModuleListProps) {
  return (
    <div className="space-y-3">
      {modules.map((module, idx) => {
        const lessonIds = module.lessons.map((l) => l.id)
        const progress = getModuleProgress(lessonIds)
        const isComplete = progress === 100

        return (
          <Link key={module.id} to={`/kurs/${courseId}/modul/${module.id}`}>
            <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-all hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shrink-0 ${
                  isComplete
                    ? 'bg-green-500'
                    : courseId === 'r1' ? 'bg-blue-600' : 'bg-green-600'
                }`}>
                  {isComplete ? '✓' : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{module.title}</h3>
                    {progress > 0 && (
                      <Badge variant={isComplete ? 'success' : 'primary'} className="shrink-0">
                        {isComplete ? 'Fullført' : `${progress}%`}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-1">{module.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                    <span>📖 {module.lessons.length} leksjoner</span>
                    <span>✏️ {module.exercises.length} oppgaver</span>
                    <span>🎯 Quiz</span>
                  </div>
                  {progress > 0 && (
                    <ProgressBar
                      value={progress}
                      size="sm"
                      color={courseId === 'r1' ? 'blue' : 'green'}
                    />
                  )}
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
