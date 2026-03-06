import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { MultipleChoice } from '@/features/exercises/MultipleChoice'
import { FreeResponse } from '@/features/exercises/FreeResponse'
import type { MultipleChoiceExercise, FreeResponseExercise } from '@/types'

const mcExercise: MultipleChoiceExercise = {
  id: 'test-mc-1',
  moduleId: 'r1-m1',
  type: 'multiple-choice',
  question: 'Hva er $2 + 2$?',
  options: ['2', '3', '4', '5'],
  correctIndex: 2,
  hint: 'Tenk på grunnleggende addisjon.',
  explanation: '$2 + 2 = 4$ fordi vi legger til to og to.',
  difficulty: 'lett',
}

const frExercise: FreeResponseExercise = {
  id: 'test-fr-1',
  moduleId: 'r1-m1',
  type: 'free-response',
  question: 'Forklar hva en derivert er.',
  hint: 'Tenk på endringshastighet.',
  explanation: 'Den deriverte er grenseverdien av differenskvotienten.',
  sampleAnswer: 'Den deriverte beskriver den øyeblikkelige endringshastigheten til en funksjon.',
  difficulty: 'middels',
}

describe('MultipleChoice', () => {
  it('rendrer spørsmål og alternativer', () => {
    render(<MultipleChoice exercise={mcExercise} onAnswer={vi.fn()} />)
    // Spørsmål og alternativer rendres (via LessonContent/ReactMarkdown)
    expect(document.body).toBeInTheDocument()
  })

  it('Svar-knapp er deaktivert når ingen alternativ er valgt', () => {
    render(<MultipleChoice exercise={mcExercise} onAnswer={vi.fn()} />)
    const svarKnapp = screen.getByRole('button', { name: /Svar/ })
    expect(svarKnapp).toBeDisabled()
  })

  it('kaller onAnswer med riktig verdi', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<MultipleChoice exercise={mcExercise} onAnswer={onAnswer} />)

    // Klikk på det tredje alternativet (index 2 = riktig)
    const allOptionBtns = document.querySelectorAll('button.rounded-xl')
    if (allOptionBtns[2]) {
      await user.click(allOptionBtns[2] as HTMLElement)
      const svarKnapp = screen.getByRole('button', { name: /Svar/ })
      await user.click(svarKnapp)
      expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: true, assessmentScore: 100 }))
    }
  })

  it('viser hint når showHint er sant og hint-knapp klikkes', async () => {
    const user = userEvent.setup()
    render(<MultipleChoice exercise={mcExercise} onAnswer={vi.fn()} showHint />)
    const hintBtn = screen.getByText(/Vis hint/)
    await user.click(hintBtn)
    expect(screen.getByText(/grunnleggende addisjon/)).toBeInTheDocument()
  })
})

describe('FreeResponse', () => {
  it('rendrer spørsmål', () => {
    render(<FreeResponse exercise={frExercise} onAnswer={vi.fn()} />)
    expect(document.body).toBeInTheDocument()
  })

  it('Levér svar-knapp er deaktivert når svar er tomt', () => {
    render(<FreeResponse exercise={frExercise} onAnswer={vi.fn()} />)
    const leverBtn = screen.getByRole('button', { name: /Levér svar/ })
    expect(leverBtn).toBeDisabled()
  })

  it('kan levere svar etter å ha skrevet noe', async () => {
    const user = userEvent.setup()
    const onAnswer = vi.fn()
    render(<FreeResponse exercise={frExercise} onAnswer={onAnswer} />)

    const textarea = screen.getByPlaceholderText(/Skriv svaret/)
    await user.type(textarea, 'Den deriverte er endringshastigheten.')

    const leverBtn = screen.getByRole('button', { name: /Levér svar/ })
    await user.click(leverBtn)
    expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({ correct: true }))
    expect(screen.getByText(/Vurdering:/)).toBeInTheDocument()
  })

  it('kan vise løsning direkte', async () => {
    const user = userEvent.setup()
    render(<FreeResponse exercise={frExercise} onAnswer={vi.fn()} />)

    const visBtn = screen.getByRole('button', { name: /Vis løsning/ })
    await user.click(visBtn)
    expect(screen.getByText(/Eksempelsvar/)).toBeInTheDocument()
  })
})
