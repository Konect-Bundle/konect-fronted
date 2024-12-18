import type { Config } from "tailwindcss";
import tailwindcssForm from "@tailwindcss/forms";
import flowbite from "flowbite-react/tailwind";
import preline from "preline/plugin";

const config: Config = {
    content: [
        "./node_modules/flowbite-react/lib/**/*.js",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        flowbite.content(),
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                yellow: {
                    50: "#fefcbb",
                    100: "#fefba5",
                    200: "#fefa8e",
                    300: "#fef877",
                    400: "#fef761",
                    500: "#fdf64a",
                    600: "#fdf534",
                    700: "#fdf41d",
                    800: "#e4dc1a",
                    900: "#cac317",
                    950: "#989211",
                },
                orange: {
                    50: "#fdd0c6",
                    100: "#fdc1b3",
                    200: "#fcb1a0",
                    300: "#fba18c",
                    400: "#fb9279",
                    500: "#fa8266",
                    600: "#fa7353",
                    700: "#f96340",
                    800: "#e0593a",
                    900: "#c74f33",
                    950: "#7d3220",
                },
                gray: {
                    50: "#f6f6f6",
                    100: "#f2f2f2",
                    200: "#ebebeb",
                    300: "#a8a8a8",
                    400: "#929292",
                    500: "#666666",
                    600: "#3b3b3b",
                    700: "#252525",
                    800: "#212121",
                    900: "#1e1e1e",
                    950: "#161616",
                },
                black: {
                    light: "#131313",
                    medium: "#0f0f0f",
                    normal: "#0b0b0b",
                    semibold: "#070707",
                    bold: "#040404",
                },
            },
        },
    },
    plugins: [tailwindcssForm, flowbite.plugin(), preline],
};
export default config;
