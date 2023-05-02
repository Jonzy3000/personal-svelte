import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyTopTracks({ time_range: 'medium_term' });
  return { topTracks: response.body?.items };
};

export const csr = false;
