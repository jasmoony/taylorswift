import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'cupid': {
          50: "#fef1f7",
          100: "#fee5f2",
          200: '#FFBDDF',
          400: "#ff66af",
          600: "#eb176a",
          700: "#cd0950",
        },
        'sunset': {
          50: "#fef3f2",
          100: "#fee5e2",
          200: '#fecfca',
          500: "#ef6153",
          600: "#db3727",
          700: "#b82b1d",
        },
        'cosmos': {
          50: "#fdf4f3",
          100: "#fce7e4",
          200: '#fad0cb',
          500: "#e36050",
          600: "#cf4433",
          700: "#ae3527",
        },
        'ebonyclay': {
          950: "#222945",
        },
        'debut': '#a5c9a5',
        'fearless': '#efc180',
        'speaknow': '#c7a8cb',
        'redalbum': '#7a2e39',
        'albatross': '#b5e5f8',
        'reputation': '#746f70',
        'lover': '#f7b0cc',
        'folklore': '#cdc9c1',
        'evermore': '#c5ac90',
        'midnights': '#242e47',
        'ttpd': '#EDECE8',
      },
    },
  },
  plugins: [],
};
export default config;
