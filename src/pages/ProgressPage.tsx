import { ProgressDashboard } from '@/features/progress/ProgressDashboard'
import { ProgressChart } from '@/features/progress/ProgressChart'
import { useProgress } from '@/hooks/useProgress'
import { Card } from '@/components/ui/Card'

export default function ProgressPage() {
  const { quizResults, examResults } = useProgress()

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fremgang</h1>
      <div className="mb-6">
        <Card>
          <ProgressChart quizResults={quizResults} examResults={examResults} />
        </Card>
      </div>
      <ProgressDashboard />
    </div>
  )
}
