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
export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);

    if (!user) return <p>Loading...</p>;

    return (
        user && (
            <>
                <Header />

                <ContainerLayout>
                    <div>Bonjour {ucfirst(user!.firstname!)}</div>

                    <section className="grid grid-cols-8 gap-4">
                        <div className="lg:col-span-2 col-span-8 px-8 py-16">
                            <h2 className="text-lg">
                                Formulaire
                                <br /> de contact
                            </h2>
                            <div className="w-14 h-1 mt-2 bg-gray-300"></div>

                            <p className="text-gray-300/85 text-sm mt-4 font-light">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Quidem eaque nobis officia et?
                                Aperiam quam distinctio necessitatibus?
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
