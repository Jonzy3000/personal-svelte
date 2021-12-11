import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import type { Response } from '@sveltejs/kit';

export const get = async () => {
  const api = await getAuthenticatedSpotifyApi();
  const response = await api.getMyCurrentPlayingTrack();

  if (response.statusCode === 204 || response.statusCode > 400) {
    return { body: { isPlaying: false } };
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
    body: {
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    },
  };
};
