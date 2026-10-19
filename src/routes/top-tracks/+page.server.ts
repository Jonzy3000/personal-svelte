import type { Config } from '@sveltejs/adapter-vercel';
import type { PageServerLoad } from './$types';
import { getTopTracks } from '#lib/server/lastfm/lastfm.js';
import { dev } from '$app/env';

const TWELVE_HOURS_IN_SECONDS = 60 * 60 * 12;

export const config: Config = {
  isr: { expiration: TWELVE_HOURS_IN_SECONDS }
};

export const load: PageServerLoad = async () => {
  const topTracks = await getTopTracks();
  return { topTracks };
};

export const csr = dev;
