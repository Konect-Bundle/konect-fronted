import { ROOT_ASSETS_URL } from "@/app/_core/config/constants";
import Image from "next/image";
import * as React from "react";


export interface BusinessLogoProps {
}

export default function BusinessLogo({
}: BusinessLogoProps) {
    return (
        <div className="flex flex-col w-full space-y-3 items-center">
           <Image
                                width={500}
                                height={500}
                                src={
                                    ROOT_ASSETS_URL + "/images/logo-white.png"
                                }
                                className="md:w-8 w-12"
                                alt="Flowbite React Logo"
                                priority={true}
                            />
            <span className="font-normal text-gray-400">Company</span>
        </div>
    );
}
