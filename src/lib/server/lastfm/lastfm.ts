const API_KEY = import.meta.env.VITE_LASTFM_API_KEY as string;
const USER = import.meta.env.VITE_LASTFM_USER as string;
const API_ROOT = 'https://ws.audioscrobbler.com/2.0/';

export type NormalizedTrack = {
  name: string;
  artist: string;
  url: string;
  image: string | undefined;
};

type LastfmImage = { '#text': string; size: string };

type LastfmRecentTrack = {
  name: string;
  url: string;
  artist: { '#text': string };
  image: LastfmImage[];
  '@attr'?: { nowplaying?: string };
};

type LastfmTopTrack = {
  name: string;
  url: string;
  artist: { name: string };
  image: LastfmImage[];
};

type LastfmTrackInfo = {
  track?: { album?: { image?: LastfmImage[] } };
};

/**
 * Last.fm is a single keyed GET endpoint — no OAuth, no token caching.
 * Throws on the API's in-band error shape ({ error, message }).
 */
async function lastfmFetch<T>(
  method: string,
  params: Record<string, string> = {}
): Promise<T> {
  const query = new URLSearchParams({
    method,
    user: USER,
    api_key: API_KEY,
    format: 'json',
    ...params
  });

  const response = await fetch(`${API_ROOT}?${query}`);
  const json = await response.json();

  if (json.error) {
    throw new Error(`Last.fm error ${json.error}: ${json.message}`);
  }

  return json as T;
}

/** Last.fm often returns blank track images; treat empty strings as missing. */
function pickImage(images: LastfmImage[], size: string): string | undefined {
  const url = images?.find((image) => image.size === size)?.['#text'];
  return url ? url : undefined;
}

/**
 * One call covers both slots: the most recent track carries
 * `@attr.nowplaying === 'true'` only while something is playing.
 */
export async function getRecentTracks(): Promise<{
  isPlaying: boolean;
  currentSong: NormalizedTrack | undefined;
  lastPlayed: NormalizedTrack | undefined;
}> {
  const data = await lastfmFetch<{
    recenttracks: { track: LastfmRecentTrack[] };
  }>('user.getrecenttracks', { limit: '2' });

  const tracks = data.recenttracks?.track ?? [];

  const normalize = (track: LastfmRecentTrack): NormalizedTrack => ({
    name: track.name,
    artist: track.artist['#text'],
    url: track.url,
    image: pickImage(track.image, 'large')
  });

  const isPlaying = tracks[0]?.['@attr']?.nowplaying === 'true';

  if (isPlaying) {
    return {
      isPlaying: true,
      currentSong: normalize(tracks[0]),
      lastPlayed: tracks[1] ? normalize(tracks[1]) : undefined
    };
  }

  return {
    isPlaying: false,
    currentSong: undefined,
    lastPlayed: tracks[0] ? normalize(tracks[0]) : undefined
  };
}

/**
 * `user.gettoptracks` returns a placeholder image for every track, so fetch
 * real album art per track via `track.getInfo`. Cheap because the page is
 * statically rendered (~12h regen), so this runs at most a couple times a day.
 */
async function getAlbumArt(
  artist: string,
  name: string
): Promise<string | undefined> {
  try {
    const info = await lastfmFetch<LastfmTrackInfo>('track.getInfo', {
      artist,
      track: name,
      autocorrect: '1'
    });
    return pickImage(info.track?.album?.image ?? [], 'extralarge');
  } catch {
    return undefined;
  }
}

export async function getTopTracks(): Promise<NormalizedTrack[]> {
  const data = await lastfmFetch<{ toptracks: { track: LastfmTopTrack[] } }>(
    'user.gettoptracks',
    { period: '1month', limit: '20' }
  );

  const tracks = data.toptracks?.track ?? [];

  return Promise.all(
    tracks.map(async (track) => ({
      name: track.name,
      artist: track.artist.name,
      url: track.url,
      image: await getAlbumArt(track.artist.name, track.name)
    }))
  );
}
