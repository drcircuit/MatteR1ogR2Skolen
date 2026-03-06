import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from '@/features/auth/ProtectedRoute'

import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import DashboardPage from '@/pages/DashboardPage'
import CoursePage from '@/pages/CoursePage'
import ModulePage from '@/pages/ModulePage'
import LessonPage from '@/pages/LessonPage'
import ExercisePage from '@/pages/ExercisePage'
import ExamPage from '@/pages/ExamPage'
import MockExamPage from '@/pages/MockExamPage'
import ProgressPage from '@/pages/ProgressPage'
import AITutorPage from '@/pages/AITutorPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Offentlige sider */}
        <Route path="/" element={<AppLayout showSidebar={false}><HomePage /></AppLayout>} />
        <Route path="/logg-inn" element={<LoginPage />} />
        <Route path="/registrer" element={<RegisterPage />} />

        {/* Beskyttede sider */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout><DashboardPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kurs/:courseId"
          element={
            <ProtectedRoute>
              <AppLayout><CoursePage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kurs/:courseId/modul/:moduleId"
          element={
            <ProtectedRoute>
              <AppLayout><ModulePage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kurs/:courseId/modul/:moduleId/leksjon/:lessonId"
          element={
            <ProtectedRoute>
              <AppLayout><LessonPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kurs/:courseId/modul/:moduleId/oppgaver"
          element={
            <ProtectedRoute>
              <AppLayout><ExercisePage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/kurs/:courseId/modul/:moduleId/quiz"
          element={
            <ProtectedRoute>
              <AppLayout><ExamPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/prove-eksamen"
          element={
            <ProtectedRoute>
              <AppLayout><MockExamPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/fremgang"
          element={
            <ProtectedRoute>
              <AppLayout><ProgressPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-laerer"
          element={
            <ProtectedRoute>
              <AppLayout><AITutorPage /></AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/innstillinger"
          element={
            <ProtectedRoute>
              <AppLayout><SettingsPage /></AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
