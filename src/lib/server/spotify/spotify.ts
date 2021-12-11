import fetch from 'node-fetch';
import querystring from 'querystring';
import SpotifyWebApi from 'spotify-web-api-node';

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET as string;
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN as string;

console.log(client_id);

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const MY_TOP_TRACKS = `https://api.spotify.com/v1/me/top/tracks`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const spotifyApi = new SpotifyWebApi();

const getAccessToken = async () => {
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

  return response.json();
};

export async function getAuthenticatedSpotifyApi(): Promise<SpotifyWebApi> {
  const { access_token } = await getAccessToken();
  spotifyApi.setAccessToken(access_token);
  return spotifyApi;
}
