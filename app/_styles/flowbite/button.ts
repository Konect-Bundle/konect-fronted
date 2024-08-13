import type { CustomFlowbiteTheme } from "flowbite-react";

export const customButtonTheme: CustomFlowbiteTheme["button"] = {
    base: "group relative flex items-center justify-center p-0.5 text-center font-semibold uppercase transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none",
    fullSized: "w-full",
    color: {
        primary: "bg-yellow-700 hover:bg-yellow-800 text-black-normal",
        light: "border border-gray-300/45 bg-white text-gray-900 focus:ring-4 focus:ring-gray-100 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-700 dark:enabled:hover:bg-gray-700",
        "primary-light":
            "bg-white text-gray-900 focus:ring-4 focus:bg-yellow-700 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-700 dark:enabled:hover:bg-gray-700",
        dark: "border border-transparent bg-gray-800 hover:bg-gray-900 text-yellow-700 focus:ring-4 focus:ring-gray-300 enabled:hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700",
    },
    disabled: "cursor-not-allowed opacity-50",
    isProcessing: "cursor-wait",
    spinnerSlot: "absolute top-0 flex h-full items-center",
    spinnerLeftPosition: {
        xs: "left-2",
        sm: "left-3",
        md: "left-4",
        lg: "left-5",
        xl: "left-6",
    },
    gradient: {
        cyan: "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800",
        failure:
            "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-gradient-to-br dark:focus:ring-red-800",
        info: "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800 ",
        lime: "bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-gray-900 focus:ring-4 focus:ring-lime-300 enabled:hover:bg-gradient-to-br dark:focus:ring-lime-800",
        pink: "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white focus:ring-4 focus:ring-pink-300 enabled:hover:bg-gradient-to-br dark:focus:ring-pink-800",
        purple: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white focus:ring-4 focus:ring-purple-300 enabled:hover:bg-gradient-to-br dark:focus:ring-purple-800",
        success:
            "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-gradient-to-br dark:focus:ring-green-800",
        teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white focus:ring-4 focus:ring-teal-300 enabled:hover:bg-gradient-to-br dark:focus:ring-teal-800",
    },
    gradientDuoTone: {
        cyanToBlue:
            "bg-gradient-to-r from-cyan-500 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
        greenToBlue:
            "bg-gradient-to-br from-green-400 to-cyan-600 text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
        pinkToOrange:
            "bg-gradient-to-br from-pink-500 to-orange-400 text-white focus:ring-4 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800",
        purpleToBlue:
            "bg-gradient-to-br from-purple-600 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
        purpleToPink:
            "bg-gradient-to-r from-purple-500 to-pink-500 text-white focus:ring-4 focus:ring-purple-200 enabled:hover:bg-gradient-to-l dark:focus:ring-purple-800",
        redToYellow:
            "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 focus:ring-4 focus:ring-red-100 enabled:hover:bg-gradient-to-bl dark:focus:ring-red-400",
        tealToLime:
            "bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 focus:ring-4 focus:ring-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 dark:focus:ring-teal-700",
    },
    inner: {
        base: "flex items-center transition-all duration-200",
        position: {
            none: "",
            start: "rounded-r-none",
            middle: "rounded-none",
            end: "rounded-l-none",
        },
        outline: "border border-transparent",
        isProcessingPadding: {
            xs: "pl-8",
            sm: "pl-10",
            md: "pl-12",
            lg: "pl-16",
            xl: "pl-20",
        },
    },
    label: "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
    outline: {
        color: {
            gray: "border border-gray-300 dark:border-white enabled:hover:text-gray-800 enabled:hover:text-yellow-600 enabled:hover:bg-gray-800 enabled:hover:border-0",
            default: "border-0",
            light: "",
        },
        off: "",
        on: "flex w-full  justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white",
        pill: {
            off: "rounded-md",
            on: "rounded-full",
        },
    },
    pill: {
        off: "rounded-lg",
        on: "rounded-full",
    },
    size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "md:px-4 py-4 px-3 text-sm",
        lg: "px-5 py-2.5 text-base",
        xl: "px-6 py-3 text-base",
    },
};
