'use client'
import { useEffect, useState } from 'react'

export default function SystemMonitor() {
  const [cpu, setCpu] = useState(10)
  const [ram, setRam] = useState(20)
  const [net, setNet] = useState(5)

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate fake dynamic values
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
        <div className="flex-1 h-3 bg-[#1a1a1a] border border-green-400">
          <div
            className="h-full bg-green-400 transition-all duration-300"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="
      border-4 border-[#2b2b2b] bg-slate-950/80
      p-4 rounded-sm text-green-400
      shadow-[6px_6px_0px_0px_#2b2b2b]
      w-56 h-56 font-mono text-xs space-y-3
    "
    >
      <div className="font-bold border-b border-green-400 pb-1 mb-2">
        SYSTEM MONITOR v0.2
      </div>

      <div className="space-y-2">
        <div>CPU USAGE</div>
        <Bar value={cpu} />

        <div>RAM USAGE</div>
        <Bar value={ram} />

        <div>NET ACTIVITY</div>
        <Bar value={net} />
      </div>

      <div className="text-[10px] opacity-60 border-t border-green-400 pt-2">
        SIGNAL: STABLE • MODE: RETRO
      </div>
    </div>
  )
}
