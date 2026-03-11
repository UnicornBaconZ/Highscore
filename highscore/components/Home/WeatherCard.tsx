export default function WeatherCard() {
  const fakeWeather = {
    temp: '127°C',
    conditions: '🌤  Overclocked Skies',
    note: 'This is fine.',
  }

  return (
    <div
      className="
      w-56 h-56 font-mono text-sm
      space-y-2
      "
    >
      <div className="font-bold border-b-2  pb-1">WEATHER STATION</div>

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
