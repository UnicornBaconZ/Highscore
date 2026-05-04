import { getRecentlyPlayed } from '@/lib/spotify'
import { NextResponse } from 'next/server'

type SpotifyImage = {
  url: string
}

type SpotifyArtist = {
  name: string
}

type SpotifyRecentTrack = {
  track: {
    id: string
    name: string
    artists: SpotifyArtist[]
    album: {
      name: string
      images: SpotifyImage[]
    }
    external_urls: {
      spotify: string
    }
  }
  played_at: string
}

export async function GET() {
  try {
    const response = await getRecentlyPlayed()

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch recently played tracks' },
        { status: response.status }
      )
    }

    const data = await response.json()

    const tracks = data.items.map((item: SpotifyRecentTrack) => ({
      id: `${item.track.id}-${item.played_at}`,
      title: item.track.name,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
      album: item.track.album.name,
      image: item.track.album.images?.[0]?.url ?? null,
      spotifyUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
      isPlaying: false,
    }))

    return NextResponse.json({ tracks })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch recently played tracks' },
      { status: 500 }
    )
  }
}
