"use client";
import { getCookie } from "cookies-next";
import { UserService } from "@/app/_core/api/services/UserService";
import { User } from "@/app/_core/models/User";
import { useEffect, useState } from "react";
import { loginRoute } from "@/app/_core/config/routes";
import { ucfirst } from "@/app/_core/utils/functions";

import ContainerLayout from "@/app/_components/Layouts/Container";
// import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";

import Header from "@/app/_components/Common/Headers/Header";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";

export interface IDashboardPageProps {}

export default function ProfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useAppSelector((state) => state.auth.currentUser);
    return (
        <>
            <Header />
            <ContainerLayout>{children}</ContainerLayout>
        </>
    );
}
