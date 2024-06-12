import type { CustomFlowbiteTheme } from "flowbite-react";

export const customNavbarTheme: CustomFlowbiteTheme["navbar"] = {
      root: {
        base: "bg-transparent px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
        rounded: {
          on: "rounded",
          off: "",
        },
        bordered: {
          on: "border",
          off: "",
        },
        inner: {
          base: "mx-auto flex flex-wrap items-center justify-between",
          fluid: {
            on: "",
            off: "container",
          },
        },
      },
      brand: {
        base: "flex items-center",
      },
      collapse: {
        base: "w-full md:block md:w-auto font-medium text-white md:px-0 px-4",
        list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-4 md:text-sm md:font-medium",
        hidden: {
          on: "hidden",
          off: "",
        },
      },
      link: {
        base: "block py-3 pl-3 pr-4 md:p-0 text-md",
        active: {
          on: "bg-yellow-700 text-black-bold font-normal dark:text-yellow-700 md:bg-transparent md:rounded-md rounded-md md:text-white",
          off: "border-b border-gray-600 text-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-gray-50 md:dark:hover:bg-transparent md:dark:hover:text-white",
        },
        disabled: {
          on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
          off: "",
        },
      },
      toggle: {
        base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-200 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
        icon: "h-6 w-6 shrink-0",
      },
    
  };