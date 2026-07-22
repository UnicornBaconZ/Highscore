import { verbs } from '@/data/verbs'

const pronouns: { key: 'ya' | 'ty' | 'vin' | 'my' | 'vy' | 'vony'; uk: string; en: string }[] = [
  { key: 'ya', uk: 'я', en: 'I' },
  { key: 'ty', uk: 'ти', en: 'you' },
  { key: 'vin', uk: 'він / вона', en: 'he / she' },
  { key: 'my', uk: 'ми', en: 'we' },
  { key: 'vy', uk: 'ви', en: 'you (pl.)' },
  { key: 'vony', uk: 'вони', en: 'they' },
]

export function VerbTable() {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">
        Common Verbs — <span className="font-vt">Дієслова</span>
      </h2>
      <p className="max-w-xl text-sm text-black/80">
        Present-tense conjugations for everyday verbs. The infinitive is the
        dictionary form; the columns are the six persons.
      </p>

      <div className="overflow-x-auto rounded-md border-2 border-black bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5e6c8] text-[#2b2b2b]">
            <tr>
              <th className="px-3 py-2">Infinitive</th>
              {pronouns.map((p) => (
                <th key={p.key} className="px-3 py-2 whitespace-nowrap">
                  <span className="font-vt text-base">{p.uk}</span>
                  <span className="block text-[10px] font-normal text-black/60">
                    {p.en}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {verbs.map((v, i) => (
              <tr
                key={v.infinitive}
                className={`border-t border-black/15 ${
                  i % 2 === 1 ? 'bg-[#faf4e4]' : ''
                }`}
              >
                <td className="px-3 py-2 whitespace-nowrap">
                  <span className="font-vt text-lg">{v.infinitive}</span>
                  <span className="block text-[11px] italic text-black/60">
                    {v.translit}
                  </span>
                  <span className="block text-xs text-black/70">{v.en}</span>
                </td>
                {pronouns.map((p) => (
                  <td key={p.key} className="px-3 py-2 whitespace-nowrap">
                    <span className="font-vt text-lg">{v[p.key]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
