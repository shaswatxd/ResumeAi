'use client'

import { useRef, useState } from 'react'
import { Sparkles, X, Send, Wand2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/field'
import { cn } from '@/lib/utils'
import type { ResumeData } from '@/lib/resume-types'

type Message = { role: 'user' | 'ai'; text: string }

const SUGGESTIONS = [
  'Make my summary more impactful',
  'Suggest strong action verbs',
  'Turn my duties into achievements',
  'Tailor my resume for a PM role',
]

export function AiPanel({
  open,
  onClose,
  resume,
}: {
  open: boolean
  onClose: () => void
  resume?: ResumeData
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'ai',
      text: "Hi! I'm your resume assistant. Ask me to sharpen your summary, rewrite bullet points, or tailor your resume to a role.",
    },
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const scrollDown = () =>
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
    })

  const send = async (text: string) => {
    const value = text.trim()
    if (!value || thinking) return
    const history = messages
    setMessages((m) => [...m, { role: 'user', text: value }])
    setInput('')
    setThinking(true)
    scrollDown()

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'chat',
          prompt: value,
          history: history.slice(-6),
          context: resume
            ? {
                name: resume.fullName,
                role: resume.role,
                skills: resume.skills,
                summary: resume.summary,
                experience: resume.experience.map((e) => ({
                  role: e.role,
                  company: e.company,
                  bullets: e.bullets,
                })),
              }
            : undefined,
        }),
      })
      const data = await res.json()
      const reply =
        data.text ??
        data.error ??
        'Sorry, something went wrong. Please try again.'
      setMessages((m) => [...m, { role: 'ai', text: reply }])
    } catch {
      setMessages((m) => [
        ...m,
        { role: 'ai', text: 'Network error — please try again.' },
      ])
    } finally {
      setThinking(false)
      scrollDown()
    }
  }

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-background/70 backdrop-blur-sm transition-opacity',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
        aria-hidden
      />
      <aside
        className={cn(
          'fixed inset-y-0 right-0 z-50 flex w-[400px] max-w-[92vw] flex-col border-l border-border bg-popover shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="AI assistant"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div>
              <h2 className="text-sm font-semibold">AI Assistant</h2>
              <p className="text-[11px] text-muted-foreground">Writing help & tips</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </Button>
        </header>

        <div ref={listRef} className="scroll-thin flex-1 space-y-4 overflow-y-auto p-5">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                'flex',
                m.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={cn(
                  'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                  m.role === 'user'
                    ? 'rounded-br-sm bg-primary text-primary-foreground'
                    : 'rounded-bl-sm bg-secondary/60 text-foreground',
                )}
              >
                {m.text}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-secondary/60 px-4 py-3">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="mb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <Wand2 className="size-3" />
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-end gap-2">
            <Textarea
              className="max-h-32 min-h-[44px] resize-none"
              placeholder="Ask the AI anything about your resume..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !e.shiftKey &&
                  !e.nativeEvent.isComposing &&
                  e.keyCode !== 229
                ) {
                  e.preventDefault()
                  send(input)
                }
              }}
            />
            <Button
              size="icon-lg"
              className="size-11 shrink-0"
              onClick={() => send(input)}
              disabled={!input.trim() || thinking}
              aria-label="Send"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

function Dot({ delay = '0ms' }: { delay?: string }) {
  return (
    <span
      className="size-2 animate-bounce rounded-full bg-muted-foreground"
      style={{ animationDelay: delay }}
    />
  )
}
