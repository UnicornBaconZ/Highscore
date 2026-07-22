'use client'

import { useMemo, useState } from 'react'
import { decks } from '@/data/decks'
import { Flashcards } from '@/components/Learn/Flashcards'
import { Quiz } from '@/components/Learn/Quiz'
import { VerbTable } from '@/components/Learn/VerbTable'
import { tabButtonClass } from '@/lib/tabButton'

type Mode = 'flashcards' | 'quiz'

export default function LearnPage() {
  const [activeDeckId, setActiveDeckId] = useState(decks[0].id)
  const [mode, setMode] = useState<Mode>('flashcards')

  const deck = useMemo(
    () => decks.find((d) => d.id === activeDeckId) ?? decks[0],
    [activeDeckId]
  )

  return (
    <section className="mx-auto max-w-3xl space-y-8 text-black">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          <span className="font-vt text-5xl">Вивчаю</span> — Learning Ukrainian
        </h1>
        <p className="max-w-xl text-sm text-black sm:text-base">
          A little corner to pick up Ukrainian one card at a time. Flip cards or
          switch to Quiz mode to test yourself.
        </p>
      </header>

      {/* Mode toggle */}
      <div className="flex gap-2">
        {(['flashcards', 'quiz'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`capitalize ${tabButtonClass(mode === m)}`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Deck selector */}
      <div className="flex flex-wrap gap-2">
        {decks.map((d) => {
          const isActive = d.id === activeDeckId
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveDeckId(d.id)}
              className={tabButtonClass(isActive)}
            >
              {d.label}
            </button>
          )
        })}
      </div>

      {/* Active mode — key forces a clean remount when the deck changes */}
      {mode === 'flashcards' ? (
        <Flashcards key={deck.id} deck={deck} />
      ) : (
        <Quiz key={deck.id} deck={deck} />
      )}

      {/* Verb conjugations */}
      <VerbTable />
    </section>
  )
}
