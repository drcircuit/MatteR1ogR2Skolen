import { useState, useRef, useEffect } from 'react'
import type { TutorMessage, TutorContext } from '@/types'
import { TutorMessageBubble } from './TutorMessage'
import { Button } from '@/components/ui/Button'
import { useSettingsStore } from '@/store/settingsStore'
import { sendTutorMessage } from '@/lib/openai/tutorService'

interface AITutorChatProps {
  context?: TutorContext
}

const SUGGESTED_QUESTIONS = [
  'Kan du forklare derivasjonsregelen for produkter?',
  'Hva er forskjellen på definit og indefinit integral?',
  'Hvordan løser jeg andregradslikninger?',
  'Kan du gi et eksempel på sinussetningen?',
]

export function AITutorChat({ context = {} }: AITutorChatProps) {
  const [messages, setMessages] = useState<TutorMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [streamingId, setStreamingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { openaiApiKey, aiModel } = useSettingsStore()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    setError('')

    if (!openaiApiKey) {
      setError('Du må angi en OpenAI API-nøkkel i innstillingene for å bruke AI-læreren.')
      return
    }

    const userMsg: TutorMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
      timestamp: new Date().toISOString(),
    }

    const assistantId = crypto.randomUUID()
    const assistantMsg: TutorMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
    setLoading(true)
    setStreamingId(assistantId)

    try {
      await sendTutorMessage(
        openaiApiKey,
        [...messages, userMsg],
        context,
        aiModel,
        (chunk) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + chunk } : m,
            ),
          )
        },
      )
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : 'Ukjent feil'
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: `⚠️ Feil: ${errMsg}` }
            : m,
        ),
      )
      setError(errMsg)
    } finally {
      setLoading(false)
      setStreamingId(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError('')
  }

  return (
    <div className="flex flex-col h-full max-h-[75vh] bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">🤖</div>
          <div>
            <p className="font-semibold text-sm text-gray-900">AI-Faglærer</p>
            <p className="text-xs text-gray-500">
              {openaiApiKey ? '● Online' : '○ Ingen API-nøkkel'}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} className="text-xs text-gray-500 hover:text-gray-700">
            Tøm chat
          </button>
        )}
      </div>

      {/* Meldinger */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">🤖</p>
            <h3 className="font-semibold text-gray-900 mb-1">Hei! Jeg er din AI-matematikklærer.</h3>
            <p className="text-sm text-gray-500 mb-6">
              Still meg spørsmål om R1 og R2 matematikk. Jeg forklarer steg for steg!
            </p>
            {!openaiApiKey && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-4">
                ⚠️ Du mangler en OpenAI API-nøkkel. Gå til{' '}
                <a href="/innstillinger" className="underline font-medium">Innstillinger</a>{' '}
                for å legge til nøkkelen din.
              </div>
            )}
            <div className="space-y-2">
              <p className="text-xs text-gray-400 mb-2">Foreslåtte spørsmål:</p>
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  disabled={!openaiApiKey}
                  className="block w-full text-left text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <TutorMessageBubble
                key={msg.id}
                message={msg}
                streaming={msg.id === streamingId}
              />
            ))}
          </>
        )}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700 mb-2">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="bg-white border-t border-gray-200 p-3">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Still et spørsmål... (Enter for å sende, Shift+Enter for ny linje)"
            disabled={loading || !openaiApiKey}
            className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 min-h-[40px] max-h-32"
            rows={1}
          />
          <Button
            type="submit"
            disabled={!input.trim() || loading || !openaiApiKey}
            loading={loading}
            className="shrink-0"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}
