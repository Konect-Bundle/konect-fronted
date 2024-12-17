"use client";
import UserSearchComponent from "@/components/Common/Search/UserSearchComponent";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { MutatingDots } from "react-loader-spinner";

export default function AddMemberCompanyPage({}) {
    // const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const addedUsers = useState<Array<number>>([]);
    const __ = useTranslations("Text");
    const currentCompany = useAppSelector((state) => state.app.currentCompany);

    if (!user)
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <MutatingDots
                    visible={true}
                    height='80'
                    width='80'
                    color='#e4dc1a'
                    secondaryColor='#e4dc1a'
                    radius='12.5'
                    ariaLabel='mutating-dots-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                />
            </div>
        );

    return user && <UserSearchComponent />;
}
