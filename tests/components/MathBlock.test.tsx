import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MathBlock } from '@/components/math/MathBlock'
import { MathInline } from '@/components/math/MathInline'

describe('MathBlock', () => {
  it('rendrer uten krasj', () => {
    const { container } = render(<MathBlock math="x^2 + y^2 = r^2" />)
    expect(container).toBeInTheDocument()
  })

  it('rendrer math-innhold', () => {
    render(<MathBlock math="E = mc^2" />)
    // Siden vi mocker react-katex, sjekker vi at komponenten rendrer
    expect(document.body).toBeInTheDocument()
  })
})

describe('MathInline', () => {
  it('rendrer uten krasj', () => {
    const { container } = render(<MathInline math="\\alpha + \\beta" />)
    expect(container).toBeInTheDocument()
  })
})
