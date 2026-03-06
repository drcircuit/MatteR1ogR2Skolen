import { Link } from 'react-router-dom'
import type { Course } from '@/types'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Badge } from '@/components/ui/Badge'

interface CourseCardProps {
  course: Course
  progress: number // 0-100
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const isR1 = course.id === 'r1'
  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0)

  return (
    <Link to={`/kurs/${course.id}`}>
      <div className={`rounded-2xl p-6 border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
        isR1
          ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200'
          : 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
            isR1 ? 'bg-blue-600' : 'bg-green-600'
          }`}>
            {isR1 ? 'R1' : 'R2'}
          </div>
          {progress > 0 && (
            <Badge variant={progress === 100 ? 'success' : 'primary'}>
              {progress === 100 ? '✓ Fullført' : `${progress}% fullført`}
            </Badge>
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{course.description}</p>

        <div className="grid grid-cols-2 gap-3 mb-4 text-center">
          <div className={`rounded-lg p-2 ${isR1 ? 'bg-blue-100' : 'bg-green-100'}`}>
            <p className="text-lg font-bold text-gray-900">{course.modules.length}</p>
            <p className="text-xs text-gray-600">Moduler</p>
          </div>
          <div className={`rounded-lg p-2 ${isR1 ? 'bg-blue-100' : 'bg-green-100'}`}>
            <p className="text-lg font-bold text-gray-900">{totalLessons}</p>
            <p className="text-xs text-gray-600">Leksjoner</p>
          </div>
        </div>

        <ProgressBar
          value={progress}
          color={isR1 ? 'blue' : 'green'}
          showPercent={false}
          size="sm"
        />
        <p className="text-xs text-gray-500 mt-1.5">
          {progress === 0 ? 'Ikke startet' : `${progress}% gjennomført`}
        </p>
      </div>
    </Link>
  )
}
