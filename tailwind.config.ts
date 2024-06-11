import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme:{
    extend: {
        colors: {
            main: {
                jaune: "#fdf41d",
                orange: "#f96340",
                gray: '#e1e1e1',
                noir:"#252525"
            },
            noir: {

                light: '#f2f2f2',
                medium: '#8c8c8c',
                normal: '#737373',
                semibold: '#262626',
                bold: '#0d0d0d',

            },
            lighting: {
                main: '#f8f9fa'
            }
        }
    },
},
  plugins: [require("flowbite/plugin")],
};
export default config;
