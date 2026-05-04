import SpotifyCard from '@/components/Media/SpotifyCard'
import { getNowPlaying, getRecentlyPlayed } from '@/lib/spotify'

type SpotifyTrack = {
  id?: string
  title: string
  artist: string
  album?: string
  image?: string
  spotifyUrl?: string
  playedAt?: string
  isPlaying?: boolean
}

async function getRecentlyPlayedTracks(): Promise<SpotifyTrack[]> {
  try {
    const response = await getRecentlyPlayed()

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[MusicPage] Recently played error:', errorText)
      return []
    }

    const data = await response.json()

    return data.items.map((item: any) => ({
      id: `${item.track.id}-${item.played_at}`,
      title: item.track.name,
      artist: item.track.artists
        .map((artist: { name: string }) => artist.name)
        .join(', '),
      album: item.track.album.name,
      image: item.track.album.images?.[0]?.url ?? null,
      spotifyUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
      isPlaying: false,
    }))
  } catch (error) {
    console.error('[MusicPage] Failed to fetch recently played tracks:', error)
    return []
  }
}

async function getCurrentlyPlayingTrack(): Promise<SpotifyTrack | null> {
  try {
    const response = await getNowPlaying()

    if (response.status === 204) {
      return null
    }

    if (!response.ok) {
      const errorText = await response.text()
      return null
    }

    const song = await response.json()

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
  const [currentTrack, recentTracks] = await Promise.all([
    getCurrentlyPlayingTrack(),
    getRecentlyPlayedTracks(),
  ])

  return (
    <main className="space-y-6">
      <div className="border-2 border-[#2b2b2b] bg-[#f5e6c8] p-4 rounded-sm shadow-[3px_3px_0px_0px_#2b2b2b]">
        <h1 className="text-lg font-black">Music</h1>
        <p className="mt-1 text-xs">
          Some tracks I have been listening to recently.
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
        <h2 className="text-sm font-black">Recently played</h2>

        {recentTracks.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentTracks.map((track) => (
              <SpotifyCard
                key={track.id ?? `${track.title}-${track.artist}`}
                track={track}
              />
            ))}
          </div>
        ) : (
          <div className="border-2 border-[#2b2b2b] bg-[#f5e6c8] p-4 rounded-sm shadow-[3px_3px_0px_0px_#2b2b2b]">
            <p className="text-xs font-semibold">
              No Spotify tracks available right now.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
