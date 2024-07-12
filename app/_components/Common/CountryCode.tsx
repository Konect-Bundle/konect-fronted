"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { ROOT_ASSETS_URL } from "@/app/_core/config/constants";
import { homeRoute } from "@/app/_core/config/routes";
import Image from "next/image";
import Link from "next/link";
import { TbX } from "react-icons/tb";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { ucfirst } from "@/app/_core/utils/functions";
import {
    Button,
    Checkbox,
    type CustomFlowbiteTheme,
    Dropdown,
    Label,
    TextInput,
} from "flowbite-react";
import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { CA, US, CD } from "country-flag-icons/react/1x1";
import { customDropdownTheme } from "@/app/_styles/flowbite/dropdown";

interface KuserBlockProps {
    callback: (country: string) => void;
}

interface CountryCodeProps {
    name: string;
    countryCode: string;
    icon: ReactNode;
}
export const customDropdown: CustomFlowbiteTheme["dropdown"] = {
    arrowIcon: "ml-1 h-3 w-3 text-gray-400 font-semibold",
    inlineWrapper: "flex items-center text-gray-600",
    content: "py-0 focus:outline-none",
};

export default function CountryCode({ callback }: KuserBlockProps) {
    const availablesCountries: Array<CountryCodeProps> = [
        {
            name: "us",
            countryCode: "+1",
            icon: <US className="w-5 rounded-lg" />,
        },
        {
            name: "ca",
            countryCode: "+1",
            icon: <CA className="w-5 rounded-lg" />,
        },
        {
            name: "us",
            countryCode: "+243",
            icon: <CD className="w-5 rounded-lg" />,
        },
    ];

    const [current, setCurrent] = useState<number>(1);

    const nodeMaker = (current: number): ReactNode => {
        return (
            <span className="flex justify-around items-center space-x-1 text-gray-500 text-xs font-semibold md:text-sm w-14">
                {availablesCountries[current].icon}
                <span className="">
                    {availablesCountries[current].countryCode}
                </span>
            </span>
        );
    };

    return (
        <span>
            <Dropdown label={nodeMaker(current)} inline theme={customDropdown}>
                {availablesCountries.map(
                    ({ name, countryCode, icon }, index) => (
                        <Dropdown.Item
                            key={index}
                            onClick={() => {
                                setCurrent(index);
                            }}
                        >
                            {nodeMaker(index)}
                        </Dropdown.Item>
                    ),
                )}
            </Dropdown>
            <TextInput
                type="text"
                disabled
                className="hidden invisible opacity-0"
                id="countryCode"
                value={availablesCountries[current].countryCode}
            />
        </span>
    );
}
