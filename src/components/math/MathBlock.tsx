import { BlockMath } from 'react-katex'
import 'katex/dist/katex.min.css'

interface MathBlockProps {
  math: string
  errorColor?: string
}

export function MathBlock({ math, errorColor = '#cc0000' }: MathBlockProps) {
  return (
    <div className="my-4 overflow-x-auto">
      <BlockMath
        math={math}
        errorColor={errorColor}
        renderError={(error) => (
          <span className="text-red-600 text-sm font-mono">
            Matematikkfeil: {error.name}
          </span>
        )}
      />
    </div>
  )
}
