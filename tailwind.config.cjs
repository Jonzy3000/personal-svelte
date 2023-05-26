const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: { body: ['Serif roman', 'sans-serif'] },
  },
  plugins: [require('@tailwindcss/typography')],
};

module.exports = config;
