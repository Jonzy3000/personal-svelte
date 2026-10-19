import type { PageServerLoad } from './$types';
import { getTopTracks } from '#lib/server/lastfm/lastfm.js';
import { dev } from '$app/env';

export const load: PageServerLoad = async () => {
  const topTracks = await getTopTracks();
  return { topTracks };
};

/**
 * Static content that gets recalculated every 12 hours (ish)
 */
export const csr = dev || false;
