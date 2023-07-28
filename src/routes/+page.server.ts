import type { PageServerLoad } from './$types';
import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import {
  currentlyPlayingTrack,
  recentlyPlayedTracks,
} from '@ekwoka/spotify-api';

export const load: PageServerLoad = async () => {
  const api = await getAuthenticatedSpotifyApi();

  try {
    const [currentlyListening, lastPlayedTracks] = await Promise.all([
      api(currentlyPlayingTrack()),
      api(recentlyPlayedTracks({ limit: 1 })),
    ]);

    const item = currentlyListening?.item;
    const isPlaying = currentlyListening?.is_playing;
    const lastPlayedTrack = lastPlayedTracks?.items[0]?.track;

    return {
      isPlaying,
      currentSong: {
        ...item,
        artist: item?.artists?.map((_artist) => _artist.name).join(', '),
      },
      lastPlayed: {
        ...lastPlayedTrack,
        artist: lastPlayedTrack?.artists
          ?.map((_artist) => _artist.name)
          .join(', '),
      },
    };
  } catch (e) {
    console.error(e);
    return { isPlaying: false, lastPlayed: undefined };
  }
};
