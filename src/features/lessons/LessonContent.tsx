import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'

interface LessonContentProps {
  content: string
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-gray max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-700 prose-table:text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: ({ children }) => (
            <div className="overflow-x-auto my-4">
              <table className="min-w-full border-collapse border border-gray-300 text-sm">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-3 py-2 bg-gray-50 font-semibold text-left">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-3 py-2">{children}</td>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes('language-')
            if (isBlock) {
              return (
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm font-mono">
                  <code>{children}</code>
                </pre>
              )
            }
            return (
              <code className="bg-gray-100 text-gray-800 rounded px-1.5 py-0.5 text-sm font-mono">
                {children}
              </code>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
