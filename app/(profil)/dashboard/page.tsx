"use client";
import { getCookie } from "cookies-next";
import { UserService } from "@/app/_core/api/services/UserService";
import { User } from "@/app/_core/models/User";
import { useEffect, useState } from "react";
import { loginRoute } from "@/app/_core/config/routes";
import { ucfirst } from "@/app/_core/utils/functions";

import ContainerLayout from "@/app/_components/Layouts/Container";
// import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import VcardEditor from "../../_components/Common/Vcard/VcardEditor";

import Header from "@/app/_components/Common/Headers/Header";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const TLabels = useTranslations("Profile.Labels");
    const __ = useTranslations("Text");

    if (!user)
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <MutatingDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#e4dc1a"
                    secondaryColor="#e4dc1a"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );

    return (
        user && (
            <>
                <Header />

                <ContainerLayout>
                    <section className="grid grid-cols-8 gap-4 lg:pt-12 md:pt-4  pt-4">
                        <div className="lg:col-span-2 col-span-8 px-0 lg:py-0 md:py-3 py-0">
                            <h2
                                style={{ whiteSpace: "pre-wrap" }}
                                className="text-2xl font-semibold"
                            >
                                {__("contact_form")}
                            </h2>

                            <div className="w-14 h-1 mt-2 bg-gray-400"></div>

                            <p className="text-gray-300/85 text-sm mt-4 font-light">
                                {TLabels("take_control")}
                            </p>
                        </div>
                        <div className="lg:col-span-6 col-span-8">
                            <VcardEditor user={user} />
                        </div>
                    </section>
                </ContainerLayout>
            </>
        )
    );
}
