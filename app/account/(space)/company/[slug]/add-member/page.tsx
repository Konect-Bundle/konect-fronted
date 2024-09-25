"use client";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import { Badge } from "flowbite-react";
import { TbBuildingCommunity, TbTrash, TbUsers } from "react-icons/tb";
import { ucfirst } from "@/app/_core/utils/functions";
import { useEffect, useState } from "react";;
import Company from "@/app/_core/models/Company";
import UserSearchComponent from "@/app/_components/Common/Search/UserSearchComponent";


interface AddMemberCompanyPageProps {
    slug: string;
}

export default function AddMemberCompanyPage({
    slug
}: AddMemberCompanyPageProps) {
    // const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const addedUsers = useState<Array<number>>([]);
    const __ = useTranslations("Text");
    const currentCompany = useAppSelector((state) => state.app.currentCompany);


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
            <UserSearchComponent />
        )
    );
}
