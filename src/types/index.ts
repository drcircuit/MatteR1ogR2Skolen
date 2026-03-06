// ─── Bruker og autentisering ───────────────────────────────────────────────

export interface User {
  id: string
  username: string
  passwordHash: string
  createdAt: string
  displayName?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

// ─── Kurs og pensum ────────────────────────────────────────────────────────

export type CourseId = 'r1' | 'r2'

export interface Course {
  id: CourseId
  title: string
  description: string
  modules: Module[]
}

export interface Module {
  id: string
  courseId: CourseId
  title: string
  description: string
  order: number
  lessons: Lesson[]
  exercises: Exercise[]
  quiz: Quiz
}

export interface Lesson {
  id: string
  moduleId: string
  title: string
  content: string // Markdown med LaTeX
  learningGoals: string[]
  order: number
  estimatedMinutes: number
}

// ─── Oppgaver og øvinger ───────────────────────────────────────────────────

export type ExerciseType = 'multiple-choice' | 'free-response'

export interface BaseExercise {
  id: string
  moduleId: string
  lessonId?: string
  type: ExerciseType
  question: string
  hint?: string
  explanation: string
  difficulty: 'lett' | 'middels' | 'vanskelig'
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'
  options: string[]
  correctIndex: number
}

export interface FreeResponseExercise extends BaseExercise {
  type: 'free-response'
  sampleAnswer: string
  keywords?: string[]
}

export type Exercise = MultipleChoiceExercise | FreeResponseExercise

// ─── Quiz og eksamen ───────────────────────────────────────────────────────

export interface Quiz {
  id: string
  moduleId: string
  title: string
  questions: Exercise[]
  passingScore: number // Prosent
}

export interface ExamQuestion {
  exercise: Exercise
  moduleTitle: string
  courseId: CourseId
}

export interface ExamConfig {
  title: string
  durationMinutes: number
  questionCount: number
  courseId?: CourseId // Hvis udefinert, hentes fra begge kurs
}

// ─── Fremgang ──────────────────────────────────────────────────────────────

export interface LessonProgress {
  id?: number
  userId: string
  lessonId: string
  moduleId: string
  courseId: CourseId
  completedAt: string
}

export interface ExerciseResult {
  id?: number
  userId: string
  exerciseId: string
  moduleId: string
  courseId: CourseId
  correct: boolean
  answeredAt: string
  attemptCount: number
}

export interface QuizResult {
  id?: number
  userId: string
  quizId: string
  moduleId: string
  courseId: CourseId
  score: number // Prosent
  correctCount: number
  totalCount: number
  completedAt: string
}

export interface ExamResult {
  id?: number
  userId: string
  examTitle: string
  courseId?: CourseId
  score: number // Prosent
  correctCount: number
  totalCount: number
  durationSeconds: number
  completedAt: string
  questionResults: QuestionResult[]
}

export interface QuestionResult {
  exerciseId: string
  correct: boolean
  userAnswer: string | number
}

// ─── Innstillinger ─────────────────────────────────────────────────────────

export interface AppSettings {
  openaiApiKey: string
  aiModel: string
  theme: 'lys' | 'mørk'
  fontSize: 'liten' | 'normal' | 'stor'
  showHints: boolean
}

// ─── AI-lærer ──────────────────────────────────────────────────────────────

export interface TutorMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
}

export interface TutorContext {
  courseId?: CourseId
  moduleTitle?: string
  lessonTitle?: string
  lessonContent?: string
}

// ─── Navigasjon ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string
  path: string
  icon?: string
}

// ─── UI Helpers ────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'
export type ButtonSize = 'sm' | 'md' | 'lg'
export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'
