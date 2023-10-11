/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  daisyui: {
    themes: [
      {
        zero: {
          primary: '#1A2332',
          secondary: '#6C7B97',
          accent: '#85C20D',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272'
        }
      }
    ]
  },
  // eslint-disable-next-line no-undef
  plugins: [require('daisyui')]
};
