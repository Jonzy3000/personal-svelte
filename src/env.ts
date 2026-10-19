import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  LASTFM_API_KEY: { static: true },
  LASTFM_USER: { static: true }
});
