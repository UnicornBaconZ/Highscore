import SpotifyCard from '@/components/Media/SpotifyCard'
import { favoriteSongs } from '@/data/songs'
import { getNowPlaying } from '@/lib/spotify'

type SpotifyTrack = {
  id?: string | number
  title: string
  artist: string
  album?: string
  image?: string
  spotifyUrl?: string
  playedAt?: string
  isPlaying?: boolean
  genres?: string[]
}

async function getCurrentlyPlayingTrack(): Promise<SpotifyTrack | null> {
  try {
    const response = await getNowPlaying()

    console.log('[MusicPage] Current track status:', response.status)

    if (response.status === 204) {
      console.log('[MusicPage] No song currently playing.')
      return null
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[MusicPage] Current track error:', errorText)
      return null
    }

    const song = await response.json()

    console.log('[MusicPage] Current track raw response:', {
      isPlaying: song.is_playing,
      hasItem: Boolean(song.item),
      itemName: song.item?.name,
    })

    const item = song.item

    if (!item) {
      return null
    }

    return {
      isPlaying: song.is_playing,
      title: item.name,
      artist: item.artists
        .map((artist: { name: string }) => artist.name)
        .join(', '),
      album: item.album.name,
      image: item.album.images?.[0]?.url ?? null,
      spotifyUrl: item.external_urls.spotify,
    }
  } catch (error) {
    console.error('[MusicPage] Failed to fetch currently playing track:', error)
    return null
  }
}

export default async function MusicPage() {
  const currentTrack = await getCurrentlyPlayingTrack()

  return (
    <main className="space-y-6">
      <div className="border-2 border-[#2b2b2b] bg-[#f5e6c8] p-4 rounded-sm shadow-[3px_3px_0px_0px_#2b2b2b]">
        <h1 className="text-lg font-black">Music</h1>
        <p className="mt-1 text-xs">
          Some songs I love and what I am listening to right now.
        </p>
      </div>

      {currentTrack && (
        <section className="space-y-3">
          <h2 className="text-sm font-black">Currently playing</h2>

          <SpotifyCard
            track={{
              ...currentTrack,
              isPlaying: true,
            }}
          />
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-sm font-black">Favorite songs</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteSongs.map((song) => (
            <SpotifyCard
              key={song.id}
              track={{
                ...song,
                isPlaying: false,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
