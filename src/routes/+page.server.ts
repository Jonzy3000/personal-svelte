import type { PageServerLoad } from './$types';
import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';

export const config = {
  isr: {
    // Expiration time (in seconds) before the cached asset will be re-generated by invoking the Serverless Function.
    // Setting the value to `false` means it will never expire.
    expiration: 20,
  },
};

export const load: PageServerLoad = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyCurrentPlayingTrack();

  if (response.statusCode === 204 || response.statusCode > 400) {
    return { isPlaying: false };
  }

  const song = response.body;
  const item = song.item as SpotifyApi.TrackObjectFull;
  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = item.artists.map((_artist) => _artist.name).join(', ');
  const album = item.album.name;
  const albumImageUrl = item.album.images[0].url;
  const songUrl = item.external_urls.spotify;

  return {
    album,
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  };
};
