import type { PageServerLoad } from './$types';
import { getAuthenticatedSpotifyApi } from '$lib/server/spotify/spotify';
import { currentlyPlayingTrack } from '@ekwoka/spotify-api';

export const load: PageServerLoad = async () => {
  const api = await getAuthenticatedSpotifyApi();

  try {
    const response = await api(currentlyPlayingTrack());

    const song = response;
    const item = song.item as SpotifyApi.TrackObjectFull;
    const isPlaying = song.is_playing;
    const title = song.item?.name;
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
  } catch (e) {
    return { isPlaying: false };
  }
};
