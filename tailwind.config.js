import withMT from '@material-tailwind/react/utils/withMT';
import plugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin
  ],
})

