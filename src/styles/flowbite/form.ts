import type { CustomFlowbiteTheme } from "flowbite-react";

export const customTextInputTheme: CustomFlowbiteTheme["textInput"] = {
    base: "flex",
    addon: "inline-flex items-center rounded-l-md border border-r-0 border-gray-300/45 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    field: {
        base: "relative w-full",
        icon: {
            base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
            svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
        },
        rightIcon: {
            base: "pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3",
            svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
        },
        input: {
            base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg",
            sizes: {
                sm: "p-2 sm:text-xs",
                md: "p-3.5 text-sm",
                lg: "p-4 sm:text-base",
            },
            colors: {
                icon: "border-gray-300/40 !rounded-none !rounded-e-lg text-gray-900 focus:border-gray-200 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                gray: "border-gray-300/40 text-gray-900 focus:border-gray-200 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                failure:
                    "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                warning:
                    "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                success:
                    "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
            },
            withRightIcon: {
                on: "pr-10",
                off: "",
            },
            withIcon: {
                on: "pl-10",
                off: "",
            },
            withAddon: {
                on: "rounded-r-lg",
                off: "rounded-lg",
            },
            withShadow: {
                on: "shadow-sm dark:shadow-sm-light",
                off: "",
            },
        },
    },
};

export const customTextAreaTheme: CustomFlowbiteTheme["textarea"] = {
    base: "block w-full rounded-lg border text-sm disabled:cursor-not-allowed disabled:opacity-50",
    colors: {
        gray: "border-gray-300/40 bg-gray-50 text-gray-900 focus:border-gray-200 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
        failure:
            "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
        warning:
            "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
        success:
            "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
    },
    withShadow: {
        on: "shadow-sm dark:shadow-sm-light",
        off: "",
    },
};

export const customToggleSwitchTheme: CustomFlowbiteTheme["toggleSwitch"] = {
    root: {
        base: "group flex rounded-lg focus:outline-none",
        active: {
            on: "cursor-pointer",
            off: "cursor-not-allowed opacity-50",
        },
        label: "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300",
    },
    toggle: {
        base: "relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25",
        checked: {
            on: "after:translate-x-full after:border-white rtl:after:-translate-x-full",
            off: "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
            color: {
                blue: "border-cyan-700 bg-cyan-700",
                dark: "bg-dark-700 border-dark-900",
                failure: "border-red-900 bg-red-700",
                gray: "border-gray-600 bg-gray-500",
                green: "border-green-700 bg-green-600",
                light: "bg-light-700 border-light-900",
                red: "border-red-900 bg-red-700",
                purple: "border-purple-900 bg-purple-700",
                success: "border-green-500 bg-green-500",
                yellow: "border-yellow-800 bg-yellow-800",
                warning: "border-yellow-600 bg-yellow-600",
                cyan: "border-cyan-500 bg-cyan-500",
                lime: "border-lime-400 bg-lime-400",
                indigo: "border-indigo-400 bg-indigo-400",
                teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4",
                info: "border-cyan-600 bg-cyan-600",
                pink: "border-pink-600 bg-pink-600",
            },
        },
        sizes: {
            sm: "h-5 w-9 min-w-9 after:left-px after:top-px after:h-4 after:w-4 rtl:after:right-px",
            md: "h-6 w-11 min-w-11 after:left-px after:top-px after:h-5 after:w-5 rtl:after:right-px",
            lg: "h-7 w-14 min-w-14 after:left-1 after:top-0.5 after:h-6 after:w-6 rtl:after:right-1",
        },
    },
};

export const customFileInputTheme: CustomFlowbiteTheme["fileInput"] = {
    root: {
        base: "flex",
    },
    field: {
        base: "relative w-full",
        input: {
            base: "block w-full overflow-hidden rounded-lg border disabled:cursor-not-allowed disabled:opacity-50",
            sizes: {
                sm: "sm:text-xs",
                md: "text-sm",
                lg: "sm:text-base",
            },
            colors: {
                gray: "border-gray-200 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                failure:
                    "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                warning:
                    "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                success:
                    "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
            },
        },
    },
};

export const customCheckBoxTheme: CustomFlowbiteTheme["checkbox"] = {
    root: {
        base: "h-4 w-4 rounded border border-gray-300/40 bg-gray-100 focus:ring-2 dark:border-gray-600 dark:bg-gray-700",
        color: {
            default:
                "text-yellow-800 focus:ring-gray-200 dark:ring-offset-gray-800 dark:focus:ring-cyan-600",
            dark: "text-gray-800 focus:ring-gray-800 dark:ring-offset-gray-800 dark:focus:ring-gray-800",
            failure:
                "text-red-900 focus:ring-red-900 dark:ring-offset-red-900 dark:focus:ring-red-900",
            gray: "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
            info: "text-cyan-800 focus:ring-cyan-800 dark:ring-offset-gray-800 dark:focus:ring-cyan-800",
            light: "text-gray-900 focus:ring-gray-900 dark:ring-offset-gray-900 dark:focus:ring-gray-900",
            purple: "text-purple-600 focus:ring-purple-600 dark:ring-offset-purple-600 dark:focus:ring-purple-600",
            success:
                "text-green-800 focus:ring-green-800 dark:ring-offset-green-800 dark:focus:ring-green-800",
            warning:
                "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
            blue: "text-blue-700 focus:ring-blue-600 dark:ring-offset-blue-700 dark:focus:ring-blue-700",
            cyan: "text-cyan-600 focus:ring-cyan-600 dark:ring-offset-cyan-600 dark:focus:ring-cyan-600",
            green: "text-green-600 focus:ring-green-600 dark:ring-offset-green-600 dark:focus:ring-green-600",
            indigo: "text-indigo-700 focus:ring-indigo-700 dark:ring-offset-indigo-700 dark:focus:ring-indigo-700",
            lime: "text-lime-700 focus:ring-lime-700 dark:ring-offset-lime-700 dark:focus:ring-lime-700",
            pink: "text-pink-600 focus:ring-pink-600 dark:ring-offset-pink-600 dark:focus:ring-pink-600",
            red: "text-red-600 focus:ring-red-600 dark:ring-offset-red-600 dark:focus:ring-red-600",
            teal: "text-teal-600 focus:ring-teal-600 dark:ring-offset-teal-600 dark:focus:ring-teal-600",
            yellow: "text-yellow-400 focus:ring-yellow-400 dark:ring-offset-yellow-400 dark:focus:ring-yellow-400",
        },
    },
};

export const customSelectTheme: CustomFlowbiteTheme["select"] = {
    base: "flex",
    addon: "inline-flex items-center rounded-l-md border border-r-0 border-gray-300/45 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400",
    field: {
        base: "relative w-full",
        icon: {
            base: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
            svg: "h-5 w-5 text-gray-500 dark:text-gray-400",
        },
        select: {
            base: "block w-full border disabled:cursor-not-allowed disabled:opacity-50 rounded-lg",
            sizes: {
                sm: "p-2 sm:text-xs",
                md: "p-3.5 text-sm",
                lg: "p-4 sm:text-base",
            },
            colors: {
                icon: "border-gray-300/40 !rounded-none !rounded-e-lg text-gray-900 focus:border-gray-200 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                gray: "border-gray-300/40  text-gray-900 focus:border-gray-200 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                info: "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
                failure:
                    "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
                warning:
                    "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
                success:
                    "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500",
            },
            withIcon: {
                on: "pl-10",
                off: "",
            },
            withAddon: {
                on: "rounded-r-lg",
                off: "rounded-lg",
            },
            withShadow: {
                on: "shadow-sm dark:shadow-sm-light",
                off: "",
            },
        },
    },
};
