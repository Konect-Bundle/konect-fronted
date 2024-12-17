"use client";
import ContainerLayout from "@/components/Layouts/Container";

import Header from "@/components/Common/Headers/Header";

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
