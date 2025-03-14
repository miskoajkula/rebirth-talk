import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'pine-green': {
          '50': '#effefa',
          '100': '#c7fff1',
          '200': '#8fffe4',
          '300': '#4ff9d5',
          '400': '#1ce5c2',
          '500': '#03c9a9',
          '600': '#00a28c',
          '700': '#047869',
          '800': '#09665b',
          '900': '#0d544b',
          '950': '#00332f',
        },
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-green-600',
    'bg-blue-500',
    'bg-teal-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-emerald-500',
    'bg-blue-400',
    'bg-rose-500',
    'bg-purple-700',
    'bg-gray-500',
    'bg-green-400',
    'bg-purple-400',
    'bg-orange-500',
    'bg-sky-400',
    'bg-pink-400',
    'bg-green-300',
    'bg-gray-700',
    'bg-beige-400',
  ]
};
export default config;
