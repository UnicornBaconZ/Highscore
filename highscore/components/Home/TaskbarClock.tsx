'use client'

import { useEffect, useState } from 'react'

export default function TaskbarClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000 * 30)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="
        min-w-[72px] border border-[#7b7b7b] bg-[#c0c0c0]
        px-3 py-[3px] text-center font-mono text-[10px] text-black
        shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#ffffff]
      "
    >
      {time}
    </div>
  )
}
