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
        'primary_font': '#4B7BE5',
        'primary_bg' : '#F4F4FF',
        'seconday_font': '#28358B',
        'primary_border' :'#BBF'
      },
    },
  },
  plugins: [],
};
export default config;
