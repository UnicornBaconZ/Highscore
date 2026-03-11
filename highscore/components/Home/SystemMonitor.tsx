'use client'
import { useEffect, useState } from 'react'

export default function SystemMonitor() {
  const [cpu, setCpu] = useState(10)
  const [ram, setRam] = useState(20)
  const [net, setNet] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 100))
      setRam(Math.floor(Math.random() * 100))
      setNet(Math.floor(Math.random() * 100))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function Bar({ value }: { value: number }) {
    return (
      <div className="flex items-center gap-2">
        <div className="w-10 text-xs">{value.toString().padStart(3, '')}%</div>
        <div className="flex-1 h-3  border bg-[#d8ccb3]">
          <div
            className="h-full bg-[#000080] transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="
      w-56 h-56 font-mono text-xs space-y-3
    "
    >
      <div className="font-bold border-b  pb-1 mb-2">SYSTEM MONITOR v0.2</div>

      <div className="space-y-2">
        <div>CPU USAGE</div>
        <Bar value={cpu} />

        <div>RAM USAGE</div>
        <Bar value={ram} />

        <div>NET ACTIVITY</div>
        <Bar value={net} />
      </div>

      <div className="text-[10px] opacity-60 border-t pt-2">
        SIGNAL: STABLE • MODE: RETRO
      </div>
    </div>
  )
}
