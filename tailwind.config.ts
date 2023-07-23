import type { Config } from 'tailwindcss';

const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      screens: {
        sm: { raw: '1000px' },
      },
    },
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/typography'),
    function ({ addComponents, config }) {
      addComponents({
        '.container': {
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-right': config('theme.padding.4'),
          'padding-left': config('theme.padding.4'),
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: config('theme.maxWidth.2xl'),
          },
          '@screen md': {
            maxWidth: config('theme.maxWidth.2xl'),
          },
          '@screen lg': {
            maxWidth: config('theme.maxWidth.2xl'),
          },
          '@screen xl': {
            maxWidth: config('theme.maxWidth.2xl'),
          },
        },
      });
    },
  ],
} satisfies Config;

module.exports = config;
