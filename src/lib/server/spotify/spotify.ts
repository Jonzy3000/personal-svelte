import { spotifyApiClient, type SpotifyApiClient } from '@ekwoka/spotify-api';

declare global {
  var spotify:
    | {
        access_token: string | null;
        token_type: string | null;
        expires_in: number | null;
        scope: string | null;
        time_created: number | null;
      }
    | undefined;
}

type SpotifyCache = {
  access_token: string | null;
  token_type: string | null;
  expires_in: number | null;
  scope: string | null;
  time_created: number | null;
};

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN as string;

const basic = btoa(`${client_id}:${client_secret}`);
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

if (!globalThis.spotify) {
  globalThis.spotify = {
    access_token: null,
    token_type: null,
    expires_in: null,
    scope: null,
    time_created: null
  };
}

let cached: SpotifyCache = globalThis.spotify;

const getAccessToken = async () => {
  if (cached.access_token && !hasTokenExpired()) {
    console.log('Using cached token');
    return Promise.resolve(cached);
  }

  console.log('Fetching spotify token');
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    }).toString()
  });

  return response.json().then((json) => {
    const token: SpotifyCache = { time_created: Date.now(), ...json };
    cached = token;
    globalThis.spotify = token;
    return token;
  });
};

export async function getAuthenticatedSpotifyApi(): Promise<SpotifyApiClient> {
  const { access_token } = await getAccessToken();
  return spotifyApiClient(access_token ?? '');
}

function hasTokenExpired() {
  return (
    (cached.time_created ?? 0) + (cached.expires_in ?? 0) * 1000 <
    Date.now() + 10000
  );
}
