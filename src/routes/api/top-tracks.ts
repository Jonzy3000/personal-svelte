import { getAuthenticatedSpotifyApi } from './../../lib/server/spotify/spotify';
export const get = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyTopTracks({ time_range: 'medium_term' });

  return {
    body: response.body,
    headers: {
      'Cache-Control': `max-age=${60 * 60 * 24}`, // one day
    },
  };
};
