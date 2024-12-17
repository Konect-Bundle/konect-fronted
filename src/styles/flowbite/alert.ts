import type { CustomFlowbiteTheme } from "flowbite-react";

export const customAlertTheme: CustomFlowbiteTheme["alert"] = {
    base: "flex flex-col gap-2 text-sm",
    borderAccent: "border-t-4",
    closeButton: {
        base: "m-1.5 ml-auto inline-flex h-8 w-8 rounded-lg p-1.5 focus:ring-2",
        icon: "h-5 w-5",
        color: {
            dark: "bg-gray-200 text-gray-800 hover:bg-gray-200 focus:ring-gray-400 dark:bg-gray-200 dark:text-gray-600 dark:hover:bg-gray-300",
        },
    },
    color: {
        dark: "border-purple-500 bg-black-medium text-gray-100 dark:bg-black-medium dark:text-gray-100",
    },
    icon: "mr-3 inline h-5 w-5 flex-shrink-0",
    rounded: "rounded-lg",
    wrapper: "flex items-center",
};
