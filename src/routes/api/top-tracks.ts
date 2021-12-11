import { getAuthenticatedSpotifyApi } from './../../lib/server/spotify/spotify';
export const get = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyTopTracks({ time_range: 'medium_term' });

  if (response.statusCode === 204 || response.statusCode > 400) {
    return { body: { isPlaying: false } };
  }

  return {
    body: response.body,
  };
};
