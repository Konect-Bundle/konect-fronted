"use client";
import { homeRoute } from "@/app/_core/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";
import { HiHome } from "react-icons/hi";

interface CardBlockProps extends React.PropsWithChildren {
    title?: string;
}
const CardBlock: React.FC<CardBlockProps> = ({ children, title }) => {
    // Utilisation de useTranslation pour prendre en charge l'internationalisation
    const __ = useTranslations("Text");

    return (
        <div className="flex flex-col space-y-3 mb-4">
            {title && (
                <h4 className="font-semibold text-lg text-black-medium">
                    {title}
                </h4>
            )}
            <div>{children}</div>
        </div>
    );
};

export default CardBlock;
