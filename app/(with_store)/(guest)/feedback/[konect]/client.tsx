"use client";
import Header from "@/app/_components/Common/Headers/Header";
import ConfettiLayout from "@/app/_components/Layouts/ConfettiLayout";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { generateVCard } from "@/app/_core/utils/functions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbSquareCheck, TbUserSquareRounded } from "react-icons/tb";

export interface FeedbackClientProps {
    name: string;
    email: string;
    phone: string;
    firstname: string;
}

export default function FeedbackClient({
    name,
    email,
    phone,
    firstname,
}: FeedbackClientProps) {
    const __ = useTranslations("Text");
    const [isSaved, setSaved] = useState<boolean>(false);

    useEffect(() => {
        generateVCard(firstname, name, phone, email);
        setSaved(true);
    }, [firstname, name, phone, email]);

    return (
        isSaved && (
            <ConfettiLayout className='h-screen'>
                <Header />
                <ContainerLayout className='flex space-y-2 flex-col items-center pt-8 mb-2'>
                    <TbUserSquareRounded className='text-gray-400 text-5xl' />
                    <h2 className='md:text-4xl text-3xl font-bold flex space-x-1 items-center'>
                        <span>{__("contact_saved_title")}</span>
                        <span className='text-green-600'>
                            <TbSquareCheck />
                        </span>
                    </h2>
                    <p className='text-gray-300 text-center'>
                        {__("contact_saved_description")}
                    </p>
                </ContainerLayout>
            </ConfettiLayout>
        )
    );
}
