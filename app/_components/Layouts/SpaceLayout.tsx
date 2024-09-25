"use client";
import BusinessLogo from "@/app/_components/Common/Headers/BusinessLogo";
import ContainerLayout from "@/app/_components/Layouts/Container";
import PrelineScript from "@/app/_components/PrelineScript";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { getUserCompanies } from "@/app/_store/slices/authSlice";
import Script from "next/script";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState } from "react";
import { setCurrentCompany as setCurrent } from "@/app/_store/slices/appSlice";
import Company from "@/app/_core/models/Company";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export interface SpaceLayoutProps {
    slug: string;
    children: React.ReactNode;
}

export default function SpaceLayout({
    children,
    slug
}: SpaceLayoutProps) {

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const storeCurrentCompany = useAppSelector((state) => state.app.currentCompany);

    const [currentCompany, setCurrentCompany] = useState<Company | undefined>(undefined);

    useEffect(() => {

        if (user?.companies !== undefined) {
            console.log(slug);
            setCurrentCompany(
                user?.companies.find(company => company.name === slug)
            );
        }
        if (currentCompany != undefined) {
            console.log("OKKK")
            if (!storeCurrentCompany) {
                dispatch(setCurrent(currentCompany));
            }
        }
    }, [currentCompany]);

    useEffect(() => {
        if (user?.companies === undefined) {
            dispatch(getUserCompanies());
        } else {
        }
    }, [user, dispatch]);

    return (
        <>
           {children}

            <PrelineScript />
        </>
    );
}
