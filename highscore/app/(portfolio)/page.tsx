import WeatherCard from '@/components/Home/WeatherCard'
import BiosCard from '@/components/Home/BiosCard'
import WrongCalc from '@/components/Home/WrongCalc'
import SystemMonitor from '@/components/Home/SystemMonitor'
import SkillsCard from '@/components/Home/SkillsCard'
import Win98Window from '@/components/Utils/windows-98-wrapper'
import TaskbarClock from '@/components/Home/TaskbarClock'
import Image from 'next/image'

export default function HomePage() {
  return (
    <section className="mx-auto max-w-5xl space-y-8">
      <div
        className="
          max-w-xl rounded-sm border-4 border-[#2b2b2b] bg-[#f5e6c8]
          p-6 shadow-[6px_6px_0px_0px_#2b2b2b]
        "
      >
        <h1 className="mb-2 text-4xl font-bold">Hi, I&apos;m Zarin</h1>
        <p className="text-sm">
          Full-stack developer who loves retro aesthetics, clean code, and
          building fun experiments on the web.
        </p>
      </div>

      <div
        className="
          border-2 border-black bg-[#008080] pt-6
          shadow-[inset_1px_1px_0_#dfdfdf,inset_-1px_-1px_0_#404040]
        "
      >
        <div className="grid grid-cols-3 grid-rows-2 place-items-center gap-8">
          <div className="row-span-2">
            <Win98Window title="skills.exe">
              <SkillsCard />
            </Win98Window>
          </div>

          <Win98Window title="weather.exe">
            <WeatherCard />
          </Win98Window>

          <Win98Window title="bios.exe">
            <BiosCard />
          </Win98Window>

          <Win98Window title="calc.exe">
            <WrongCalc />
          </Win98Window>

          <Win98Window title="monitor.exe">
            <SystemMonitor />
          </Win98Window>
        </div>

        <div
          className="
            mt-6 flex items-center justify-between
            border-t-2 border-[#dfdfdf] bg-[#c0c0c0] px-2 py-[3px]
            shadow-[inset_0_1px_0_#ffffff]
          "
        >
          <div className="flex items-center gap-2">
            <button
              className="
                flex items-center gap-2 border border-black bg-[#c0c0c0]
                px-2 py-[2px] font-mono text-xs font-bold text-black
                shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080]
                active:shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#ffffff]
              "
            >
              <Image
                src="/assets/windows-logo.png"
                alt="Windows logo"
                width={14}
                height={14}
                className="h-[14px] w-[14px] object-contain"
              />
              <span>Start</span>
            </button>

            <div className="h-6 w-[2px] bg-[#808080] shadow-[1px_0_0_#ffffff]" />

            <div
              className="
                hidden items-center border border-[#7b7b7b] bg-[#c0c0c0]
                px-3 py-[3px] font-mono text-[10px] text-black
                shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#ffffff]
                sm:flex
              "
            >
              Portfolio Desktop
            </div>
          </div>

          <TaskbarClock />
        </div>
      </div>
    </section>
  )
}
