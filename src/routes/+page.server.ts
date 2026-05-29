import type { PageServerLoad } from './$types';
import { getRecentTracks } from '$lib/server/lastfm/lastfm';

export const load: PageServerLoad = async () => {
  try {
    return await getRecentTracks();
  } catch (e) {
    console.error(e);
    return { isPlaying: false, currentSong: undefined, lastPlayed: undefined };
  }
};
