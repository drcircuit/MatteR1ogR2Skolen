import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import { LessonViewer } from '@/features/lessons/LessonViewer'
import type { Lesson, Module } from '@/types'

vi.mock('@/hooks/useProgress', () => ({
  useProgress: () => ({
    completeLesson: vi.fn(),
    isLessonCompleted: () => false,
  }),
}))

vi.mock('@/features/ai-tutor/AITutorChat', () => ({
  AITutorChat: ({ context }: { context?: { courseId?: string; moduleTitle?: string; lessonTitle?: string } }) => (
    <div data-testid="ai-tutor-chat">
      {context?.courseId}|{context?.moduleTitle}|{context?.lessonTitle}
    </div>
  ),
}))

const baseLesson: Lesson = {
  id: 'r1-m1-l1',
  moduleId: 'r1-m1',
  title: 'Derivasjon intro',
  content: 'Leksjonsinnhold',
  learningGoals: ['Forstå den deriverte'],
  order: 1,
  estimatedMinutes: 20,
}

const baseModule: Module = {
  id: 'r1-m1',
  courseId: 'r1',
  title: 'Funksjoner',
  description: 'Modul om funksjoner',
  order: 1,
  lessons: [baseLesson],
  exercises: [],
  quiz: {
    id: 'r1-m1-quiz',
    moduleId: 'r1-m1',
    title: 'Quiz',
    questions: [],
    passingScore: 70,
  },
  competenceGoals: [
    { id: 'r1-km1', number: 1, text: 'Mål 1', courseId: 'r1' },
    { id: 'r1-km2', number: 2, text: 'Mål 2', courseId: 'r1' },
  ],
}

describe('LessonViewer', () => {
  it('viser interaktiv AI-veileder med leksjonskontekst', () => {
    render(
      <MemoryRouter>
        <LessonViewer lesson={baseLesson} module={baseModule} courseId="r1" />
      </MemoryRouter>,
    )

    expect(screen.getByText(/Interaktiv leksjonsveileder/)).toBeInTheDocument()
    expect(screen.getByTestId('ai-tutor-chat')).toHaveTextContent('r1|Funksjoner|Derivasjon intro')
  })

  it('viser leksjonens kompetansemål når de finnes', () => {
    const lessonWithRefs: Lesson = {
      ...baseLesson,
      competenceGoalRefs: ['r1-km3', 'r1-km4'],
    }

    render(
      <MemoryRouter>
        <LessonViewer lesson={lessonWithRefs} module={baseModule} courseId="r1" />
      </MemoryRouter>,
    )

    expect(
      screen.getByText((_, element) =>
        element?.textContent === 'Dekker kompetansemål: r1-km3, r1-km4',
      ),
    ).toBeInTheDocument()
  })
})
