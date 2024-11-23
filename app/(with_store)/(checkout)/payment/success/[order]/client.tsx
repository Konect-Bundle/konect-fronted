"use client";
import Header from "@/app/_components/Common/Headers/Header";
import ConfettiLayout from "@/app/_components/Layouts/ConfettiLayout";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { generateVCard } from "@/app/_core/utils/functions";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
    TbCircleCheckFilled,
    TbSquareCheck,
    TbUserSquareRounded,
} from "react-icons/tb";

export interface CancelClientProps {}

export default function CancelClient({}: CancelClientProps) {
    const __ = useTranslations("Text");

    return (
        <ConfettiLayout className='h-screen'>
            <Header />
            <ContainerLayout className='flex space-y-2 flex-col items-center pt-8 mb-2'>
                <TbCircleCheckFilled className='text-green-600 text-7xl' />
                <h2 className='md:text-4xl text-3xl font-bold'>
                    {__("payment_done_title")}
                </h2>
                <p className='text-gray-300 text-center'>
                    {__("payment_done_description")}
                </p>
            </ContainerLayout>
        </ConfettiLayout>
    );
}
