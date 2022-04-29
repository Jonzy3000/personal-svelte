import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';
import svelteSVG from '@poppanator/sveltekit-svg';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
  kit: {
    adapter: adapter({ edge: true }),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      resolve: {
        alias: {
          $resources: path.resolve('./src/resources'),
          $components: path.resolve('./src/components'),
        },
      },
      plugins: [
        svelteSVG({
          svgoConfig: {}, // See https://github.com/svg/svgo#configuration
        }),
      ],
    },
  },
};

export default config;
