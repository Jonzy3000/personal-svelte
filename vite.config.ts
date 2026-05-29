import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import svg from '@poppanator/sveltekit-svg';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
  plugins: [enhancedImages(), sveltekit(), tailwindcss(), svg()],
  ssr: {
    noExternal: ['@ekwoka/spotify-api']
  }
});
