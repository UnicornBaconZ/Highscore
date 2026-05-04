import { getNowPlaying } from '@/lib/spotify'
import { NextResponse } from 'next/server'

type SpotifyImage = {
  url: string
}

type SpotifyArtist = {
  name: string
}

type SpotifyTrackItem = {
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

export async function GET() {
  try {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        image: null,
        spotifyUrl: null,
      })
    }

    const song = await response.json()
    const item = song.item as SpotifyTrackItem | null

    if (!item) {
      return NextResponse.json({
        isPlaying: false,
        title: null,
        artist: null,
        album: null,
        image: null,
        spotifyUrl: null,
      })
    }

    return NextResponse.json({
      isPlaying: song.is_playing,
      title: item.name,
      artist: item.artists.map((artist) => artist.name).join(', '),
      album: item.album.name,
      image: item.album.images?.[0]?.url ?? null,
      spotifyUrl: item.external_urls.spotify,
    })
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch currently playing track' },
      { status: 500 }
    )
  }
}
