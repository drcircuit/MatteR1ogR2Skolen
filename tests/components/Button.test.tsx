import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('rendrer med riktig tekst', () => {
    render(<Button>Klikk meg</Button>)
    expect(screen.getByText('Klikk meg')).toBeInTheDocument()
  })

  it('kaller onClick ved klikk', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Klikk</Button>)
    await user.click(screen.getByText('Klikk'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('er deaktivert når disabled er satt', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Deaktivert</Button>)
    const btn = screen.getByText('Deaktivert')
    await user.click(btn)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('viser spinner når loading er sant', () => {
    render(<Button loading>Laster</Button>)
    const svg = document.querySelector('.animate-spin')
    expect(svg).toBeInTheDocument()
  })

  it('bruker fullWidth-klasse ved fullWidth prop', () => {
    render(<Button fullWidth>Full bredde</Button>)
    const btn = screen.getByText('Full bredde')
    expect(btn).toHaveClass('w-full')
  })

  it('rendrer primær variant som standard', () => {
    render(<Button>Standard</Button>)
    const btn = screen.getByText('Standard')
    expect(btn).toHaveClass('bg-blue-600')
  })

  it('rendrer danger variant', () => {
    render(<Button variant="danger">Slett</Button>)
    const btn = screen.getByText('Slett')
    expect(btn).toHaveClass('bg-red-600')
  })

  it('rendrer success variant', () => {
    render(<Button variant="success">OK</Button>)
    const btn = screen.getByText('OK')
    expect(btn).toHaveClass('bg-green-600')
  })
})
