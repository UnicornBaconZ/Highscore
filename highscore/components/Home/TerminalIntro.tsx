'use client'
import { useEffect, useState } from 'react'

const textLines = [
  '$ booting portfolio...',
  '$ loading components...',
  '$ fetching anime watchlist...',
  '$ welcome, zarin.',
  '$ full-stack developer & retro enjoyer.',
  '$ ',
]

export default function TerminalIntro() {
  const [displayed, setDisplayed] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      console.log(i)
      console.log(textLines[i])
      setDisplayed((prev) => [...prev, textLines[i]])
      i++
      if (i === textLines.length) clearInterval(interval)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  console.log(displayed)
  return (
    <div
      className="
      bg-[#2b2b2b] text-[#f5e6c8]
      p-4 border-4 border-[#2b2b2b]
      shadow-[6px_6px_0_#2b2b2b]
      font-mono text-sm rounded-sm
      whitespace-pre-wrap
      max-w-xl
    "
    >
      {displayed.map((line, idx) => (
        <div key={idx}>
          {line}
          {idx === displayed.length && <span className="animate-pulse">▊</span>}
        </div>
      ))}
    </div>
  )
}
