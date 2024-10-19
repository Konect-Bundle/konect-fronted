"use client";
import { homeRoute } from "@/app/_core/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { HiHome } from "react-icons/hi";

const BackToHome: React.FC = () => {
    // Utilisation de useTranslation pour prendre en charge l'internationalisation
    const __ = useTranslations("backToHome");

    return (
        <Link href={homeRoute.path} className='flex space-x-1'>
            <HiHome className='w-5 h-5 mr-2' />
            <span>{__("label")}</span>
        </Link>
    );
};

export default BackToHome;
