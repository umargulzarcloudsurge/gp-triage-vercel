import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        PhotoBlue: {
          default: '#9BD4E3',
          50: '#E9F6F9',
          100: '#DFF1F7',
          200: '#D5EDF4',
          300: '#CAE9F1',
          400: '#C0E4EE',
          500: '#B7E0EB',
          600: '#ADDCE9',
          700: '#A4D7E6',
          
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
