import fetch from 'node-fetch';
import querystring from 'querystring';
import SpotifyWebApi from 'spotify-web-api-node';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN as string;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const spotifyApi = new SpotifyWebApi();

let cached = global['spotify'];

if (!cached) {
  cached = global['spotify'] = {
    access_token: null,
    token_type: null,
    expires_in: null,
    scope: null,
    time_created: null,
  };
}

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
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json().then((json) => {
    const token = { time_created: Date.now(), ...json };
    cached = token;
    return token;
  });
};

export async function getAuthenticatedSpotifyApi(): Promise<SpotifyWebApi> {
  const { access_token } = await getAccessToken();
  spotifyApi.setAccessToken(access_token);
  return spotifyApi;
}

function hasTokenExpired() {
  return cached.time_created + cached.expires_in * 1000 < Date.now() - 10000;
}
