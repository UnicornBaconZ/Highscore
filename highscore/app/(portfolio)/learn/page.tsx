'use client'

import { useMemo, useState } from 'react'
import { decks, alphabet } from '@/data/decks'
import { Flashcards } from '@/components/Learn/Flashcards'
import { Quiz } from '@/components/Learn/Quiz'
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

      {/* Alphabet primer */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">
          The Alphabet — <span className="font-vt">Абетка</span>
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {alphabet.map((a) => (
            <div
              key={a.letter}
              className="rounded-md border-2 border-black bg-white px-3 py-2"
            >
              <div className="font-vt text-2xl font-semibold text-black">
                {a.letter}
              </div>
              <div className="text-xs text-black">{a.sound}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
