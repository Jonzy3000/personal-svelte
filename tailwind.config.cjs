const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    fontFamily: { body: ['Serif roman', 'sans-serif'] },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};

module.exports = config;
