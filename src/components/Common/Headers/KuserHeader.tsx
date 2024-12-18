"use client";
import React, { useEffect, useState } from "react";
import { Button, Alert } from "flowbite-react";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customAlertTheme } from "@/styles/flowbite/alert";
import { productsRoute } from "@/core/config/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";

export interface IAppProps {}

const KuserHeader: React.FC<IAppProps> = (props) => {
    const [showAlert, setShowAlert] = useState<boolean>(true);
    useEffect(() => {
        if (showAlert == false) {
            setTimeout(() => {
                setShowAlert(true);
            }, 6500);
        }
    });
    const dissmissAlert = () => {
        setShowAlert(false);
        console.log(showAlert);
    };

    const tActions = useTranslations("Actions");
    const tKuser = useTranslations("Kuser");

    return (
        <div className='fixed z-40 top-0 left-0 w-screen flex '>
            <Alert
                theme={customAlertTheme}
                color='dark'
                className={
                    !showAlert ? "hidden " : "" + "w-full rounded-none p-0"
                }
                onDismiss={dissmissAlert}
            >
                <div className='flex justify-between items-center p-3 text-gray-100  space-x-3 w-full'>
                    <div className='items-center text-gray-100 flex space-x-2 rounded-md md:text-md text-sm'>
                        <svg
                            className='flex-shrink-0 w-4 h-4'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            viewBox='0 0 20 20'
                        >
                            <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
                        </svg>
                        <span className='sr-only'>Info</span>
                        <div className='ms-3 text-sm font-medium'>
                            {tKuser("you_too")}{" "}
                        </div>
                    </div>
                    <div className='md:space-x-4 space-x-2 flex items-center'>
                        <Link href={productsRoute.path} className='pl-1'>
                            <Button
                                theme={customButtonTheme}
                                color='primary'
                                className='w-max'
                            >
                                {tActions("get_card")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </Alert>
        </div>
    );
};

export default KuserHeader;
