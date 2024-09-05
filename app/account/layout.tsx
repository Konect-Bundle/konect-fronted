"use client";
import ContainerLayout from "@/app/_components/Layouts/Container";

import Header from "@/app/_components/Common/Headers/Header";


export interface IDashboardPageProps {}

export default function ProfilLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <ContainerLayout>{children}</ContainerLayout>
        </>
    );
}
