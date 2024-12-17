import { ROOT_ASSETS_URL } from "@/core/config/constants";
import Image from "next/image";
import * as React from "react";

export interface BusinessLogoProps {}

export default function BusinessLogo({}: BusinessLogoProps) {
    return (
        <div className='flex w-full space-x-1.5 items-center'>
            <Image
                width={500}
                height={500}
                src={ROOT_ASSETS_URL + "/images/logo-white.png"}
                className='md:w-8 w-10'
                alt='Flowbite React Logo'
                priority={true}
            />
            <span className='font-semibold text-white text-md -translate-y-1'>
                Business
            </span>
        </div>
    );
}
