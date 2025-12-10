export default function WeatherCard() {
  const fakeWeather = {
    temp: '127°C',
    conditions: '🌤  Overclocked Skies',
    note: 'This is fine.',
  }

  return (
    <div
      className="
      border-4 border-[#2b2b2b] bg-[#4C7AFF]
      p-4 rounded-sm
      shadow-[6px_6px_0px_0px_#2b2b2b]
      w-56 font-mono text-sm text-white
      space-y-2
      "
    >
      <div className="font-bold border-b-2 border-white pb-1">
        WEATHER STATION
      </div>

      <div className="space-y-1">
        <div>
          <strong>Temp:</strong> {fakeWeather.temp}
        </div>
        <div>
          <strong>Conditions:</strong> {fakeWeather.conditions}
        </div>
        <div className="italic opacity-80">{fakeWeather.note}</div>
      </div>
    </div>
  )
}
