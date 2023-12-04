import { sveltekit } from '@sveltejs/kit/vite';
import { type UserConfig } from 'vite';
import svelteSVG from '@poppanator/sveltekit-svg';
import { enhancedImages } from '@sveltejs/enhanced-img';

const config: UserConfig = {
  optimizeDeps: {
    include: ['classnames'],
  },
  plugins: [enhancedImages(), sveltekit(), svelteSVG()],
  ssr: {
    noExternal: ['svelte-hero-icons', 'flowbite-svelte', '@ekwoka/spotify-api'],
  },
};

export default config;
