import { sveltekit } from '@sveltejs/kit/vite';
import { type UserConfig } from 'vite';
import svelteSVG from '@poppanator/sveltekit-svg';

const config: UserConfig = {
  optimizeDeps: {
    include: ['classnames'],
  },
  plugins: [sveltekit(), svelteSVG()],
  ssr: {
    noExternal: ['svelte-hero-icons', 'flowbite-svelte', '@ekwoka/spotify-api'],
  },
};

export default config;
