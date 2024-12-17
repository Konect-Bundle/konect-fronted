"use client";
import BusinessLogo from "@/components/Common/Headers/BusinessLogo";
import ContainerLayout from "@/components/Layouts/Container";
import PrelineScript from "@/components/PrelineScript";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getUserCompanies } from "@/store/slices/authSlice";
import Script from "next/script";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState } from "react";
import { setCurrentCompany as setCurrent } from "@/store/slices/appSlice";
import Company from "@/core/models/Company";
declare global {
    interface Window {
        HSStaticMethods: IStaticMethods;
    }
}

export interface SpaceLayoutProps {
    slug: string;
    children: React.ReactNode;
}

export default function SpaceLayout({ children, slug }: SpaceLayoutProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const storeCurrentCompany = useAppSelector(
        (state) => state.app.currentCompany,
    );

    const [currentCompany, setCurrentCompany] = useState<Company | undefined>(
        undefined,
    );

    useEffect(() => {
        if (user?.companies !== undefined) {
            setCurrentCompany(
                user?.companies.find((company) => company.name === slug),
            );
        }
        if (currentCompany != undefined) {
            if (!storeCurrentCompany) {
                dispatch(setCurrent(currentCompany));
            }
        }
    }, [currentCompany, dispatch, slug, storeCurrentCompany, user?.companies]);

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
