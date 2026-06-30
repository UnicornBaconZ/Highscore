'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  accuracy,
  fetchStats,
  getStreakStatus,
  resetAllStats,
  worstWords,
  STATS_EVENT,
  type StatsBlob,
  type StreakStatus,
} from '@/lib/learnStats'
import { emptyBlob } from '@/lib/learnTypes'
import { tabButtonClass } from '@/lib/tabButton'

export default function ScoreboardPage() {
  const [blob, setBlob] = useState<StatsBlob>(emptyBlob())

  async function refresh() {
    setBlob(await fetchStats())
  }

  // Read on mount + live-update when stats change elsewhere in the app.
  useEffect(() => {
    refresh()
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<StatsBlob>).detail
      if (detail) setBlob(detail)
      else refresh()
    }
    window.addEventListener(STATS_EVENT, handler)
    return () => window.removeEventListener(STATS_EVENT, handler)
  }, [])

  const ranked = worstWords(blob)
  const seen = ranked.filter((w) => w.correct + w.wrong > 0)
  const streak: StreakStatus = getStreakStatus(blob.streak)
  const totalReviews = seen.reduce((n, w) => n + w.correct + w.wrong, 0)

  return (
    <section className="mx-auto max-w-3xl space-y-8 text-black">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          <span className="font-vt text-5xl">Рахунок</span> — Scoreboard
        </h1>
        <p className="max-w-xl text-sm text-black sm:text-base">
          Your worst words float to the top. Drill them in{' '}
          <Link href="/learn" className="underline hover:text-[#D47A37]">
            Learn
          </Link>{' '}
          and watch them sink.
        </p>
      </header>

      {/* Streak + shame banner */}
      <StreakBanner streak={streak} />

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Words seen" value={seen.length} />
        <StatCard label="Total reviews" value={totalReviews} />
        <StatCard label="Best streak" value={`${streak.best} 🔥`} />
      </div>

      {/* Worst words table */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold">
          Hall of Shame — <span className="font-vt">Найгірші слова</span>
        </h2>

        {seen.length === 0 ? (
          <div className="rounded-md border-2 border-black bg-white px-4 py-6 text-center text-sm">
            No data yet. Go mark some flashcards right or wrong in{' '}
            <Link href="/learn" className="underline hover:text-[#D47A37]">
              Learn
            </Link>
            .
          </div>
        ) : (
          <div className="overflow-hidden rounded-md border-2 border-black bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f5e6c8] text-[#2b2b2b]">
                <tr>
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Word</th>
                  <th className="px-3 py-2">English</th>
                  <th className="px-3 py-2 text-center">✓</th>
                  <th className="px-3 py-2 text-center">✗</th>
                  <th className="px-3 py-2 text-right">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                {seen.map((w, i) => {
                  const acc = accuracy(w)
                  const bad = acc < 50
                  return (
                    <tr
                      key={w.uk}
                      className={`border-t border-black/15 ${
                        i === 0 ? 'bg-[#fbe3dd]' : ''
                      }`}
                    >
                      <td className="px-3 py-2 font-semibold">{i + 1}</td>
                      <td className="px-3 py-2">
                        <span className="font-vt text-xl">{w.uk}</span>
                        <span className="block text-xs italic text-black/60">
                          {w.translit}
                        </span>
                      </td>
                      <td className="px-3 py-2">{w.en}</td>
                      <td className="px-3 py-2 text-center text-[#3f9142]">
                        {w.correct}
                      </td>
                      <td className="px-3 py-2 text-center text-[#e9573f]">
                        {w.wrong}
                      </td>
                      <td
                        className={`px-3 py-2 text-right font-semibold ${
                          bad ? 'text-[#e9573f]' : 'text-[#3f9142]'
                        }`}
                      >
                        {acc}%
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {seen.length > 0 && (
        <button
          type="button"
          onClick={async () => {
            if (
              window.confirm(
                'Reset all stats and your streak? This cannot be undone.'
              )
            ) {
              await resetAllStats()
            }
          }}
          className={tabButtonClass(false)}
        >
          Reset all stats
        </button>
      )}
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border-2 border-black bg-white px-3 py-3 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-black/60">{label}</div>
    </div>
  )
}

function StreakBanner({ streak }: { streak: StreakStatus }) {
  const map = {
    none: {
      bg: 'bg-white',
      title: '🔥 Streak: 0',
      msg: 'You have not practiced yet. Start today and build a streak.',
    },
    today: {
      bg: 'bg-[#e3f3e4]',
      title: `🔥 Streak: ${streak.current} day${streak.current === 1 ? '' : 's'}`,
      msg: 'Done for today. Come back tomorrow to keep it alive.',
    },
    pending: {
      bg: 'bg-[#fff4d6]',
      title: `🔥 Streak: ${streak.current} day${streak.current === 1 ? '' : 's'} — at risk!`,
      msg: 'You have not practiced today. Do a few cards now or you lose the streak at midnight.',
    },
    broken: {
      bg: 'bg-[#fbe3dd]',
      title: '💀 Streak broken.',
      msg: `You skipped a day and torched a ${streak.current}-day streak. Back to zero. Shameful. Go redeem yourself.`,
    },
  }[streak.status]

  return (
    <div
      className={`rounded-md border-2 border-black px-4 py-3 ${map.bg}`}
      role="status"
    >
      <div className="text-lg font-bold">{map.title}</div>
      <p className="text-sm text-black/80">{map.msg}</p>
      {(streak.status === 'pending' || streak.status === 'broken') && (
        <Link
          href="/learn"
          className="mt-2 inline-block text-sm font-semibold underline hover:text-[#D47A37]"
        >
          → Go practice now
        </Link>
      )}
    </div>
  )
}
