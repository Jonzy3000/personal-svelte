import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import type { PageServerLoad } from '../$types';
import { getTopItems } from '@ekwoka/spotify-api';

export const load: PageServerLoad = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api(
    getTopItems('tracks', { time_range: 'medium_term' })
  );
  return { topTracks: response?.items };
};

/**
 * Static content that gets recalculated every 12 hours (ish)
 */
export const csr = false;
