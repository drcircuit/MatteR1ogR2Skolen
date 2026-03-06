import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathInlineProps {
  math: string
  errorColor?: string
}

export function MathInline({ math, errorColor = '#cc0000' }: MathInlineProps) {
  return (
    <InlineMath
      math={math}
      errorColor={errorColor}
      renderError={(error) => (
        <span className="text-red-600 text-sm font-mono">
          [{error.name}]
        </span>
      )}
    />
  )
}
