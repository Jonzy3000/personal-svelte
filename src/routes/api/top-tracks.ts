import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyTopTracks({ time_range: 'medium_term' });

  return {
    body: JSON.stringify(response.body),
    headers: {
      'Cache-Control': `max-age=${60 * 60 * 24}`, // one day
    },
  };
};
