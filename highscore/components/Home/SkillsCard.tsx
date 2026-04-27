export default function SkillsCard() {
  const skills = [
    { label: 'Frontend', value: 75 },
    { label: 'Backend', value: 85 },
    { label: 'Game Dev', value: 40 },
    { label: 'DevOps', value: 70 },
    { label: 'Sarcasm', value: 120 },
  ]

  return (
    <div
      className="
      w-56 font-mono text-xs
    "
    >
      <div className="mb-3 border-b-2 border-[#2b2b2b] pb-1 font-bold tracking-wide">
        SKILLS
      </div>

      <div className="space-y-3">
        {skills.map((skill) => (
          <div key={skill.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="uppercase">{skill.label}</span>
              <span>{skill.value}%</span>
            </div>

            <div className="h-4 border-2 border-[#2b2b2b] bg-[#d8ccb3] p-[1px]">
              <div
                className="h-full bg-[#000080]"
                style={{ width: `${skill.value}%` }}
              />
            </div>
          </div>
        ))}

        <div className="border-t-2 border-[#2b2b2b] pt-2 text-[10px] uppercase tracking-wide">
          Press F5 to continue
        </div>
      </div>
    </div>
  )
}
