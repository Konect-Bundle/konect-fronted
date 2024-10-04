"use client";
import React from "react";
import { Alert } from "flowbite-react";
import { HiExclamationCircle } from "react-icons/hi";
import { useTranslations } from "next-intl";
import BackToHome from "./BackToHome";

const DesactivatedCard: React.FC = () => {
    // Utilisation de useTranslation pour prendre en charge l'internationalisation
    const __ = useTranslations("konectCardStatus");

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center space-y-1">
            <div className="p-8">
                <Alert
                    color="failure"
                    icon={HiExclamationCircle}
                    additionalContent={
                        <div className="mt-2 mb-4 text-md text-gray-700">
                            {__("additionalInfo")}
                        </div>
                    }
                >
                    <span className="font-medium">{__("title")}</span>{" "}
                    {__("message")}
                </Alert>
            </div>
            <BackToHome />
        </div>
    );
};

export default DesactivatedCard;
