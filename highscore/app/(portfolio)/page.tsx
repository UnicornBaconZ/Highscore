import WeatherCard from '@/components/Home/WeatherCard'
import BiosCard from '@/components/Home/BiosCard'
import WrongCalc from '@/components/Home/WrongCalc'
import SystemMonitor from '@/components/Home/SystemMonitor'

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div
        className="
        border-4 border-[#2b2b2b] bg-[#f5e6c8]
        p-6 rounded-sm
        shadow-[6px_6px_0px_0px_#2b2b2b]
        max-w-xl
      "
      >
        <h1 className="text-4xl font-bold mb-2">Hi, I'm Zarin</h1>
        <p className="text-sm">
          Full-stack developer who loves retro aesthetics, clean code, and
          building fun experiments on the web.
        </p>
      </div>

      <div className="gap-8 flex flex-col sm:flex-row">
        <WeatherCard />
        <BiosCard />
        <WrongCalc />
        <SystemMonitor />
      </div>
    </section>
  )
}
