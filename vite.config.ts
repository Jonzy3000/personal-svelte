import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import svg from '@poppanator/sveltekit-svg';
import { enhancedImages } from '@sveltejs/enhanced-img';

export default defineConfig({
  plugins: [
    enhancedImages(),
    sveltekit({
      preprocess: vitePreprocess(),
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true
      },
      adapter: adapter({ runtime: 'nodejs24.x' })
    }),
    tailwindcss(),
    svg()
  ]
});
