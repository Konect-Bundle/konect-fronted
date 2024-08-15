"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import Header from "@/app/_components/Common/Headers/Header";
import { useTranslations } from "next-intl";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { tuple } from "yup";

export interface IHowitPageProps {}

export default function HowitPage(props: IHowitPageProps) {
    const __h = useTranslations("Home");
    const __ = useTranslations("Text");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <main className="min-h-screen">
            <Header />
            <ContainerLayout>
                <h2 className="text-2xl py-4 font-bold">
                    {__h("how_does_section")}
                </h2>
                {isClient && (
                    <div className="py-4 w-full">
                        {/* width={"100%"} height={"90vh"}  */}
                        <div className="player-wrapper">
                            <ReactPlayer
                                className="react-player"
                                url="https://www.youtube.com/watch?v=G6a4zVOLK9M"
                                controls={true}
                                width="100%"
                                height="100%"
                            />
                        </div>
                    </div>
                )}
            </ContainerLayout>
        </main>
    );
}
