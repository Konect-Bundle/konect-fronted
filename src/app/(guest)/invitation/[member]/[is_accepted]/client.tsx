"use client";
import Header from "@/components/Common/Headers/Header";
import ConfettiLayout from "@/components/Layouts/ConfettiLayout";
import ContainerLayout from "@/components/Layouts/Container";
import ApiErrorsManagement from "@/core/api/errors/apiErrorsManagement";
import { CompanyService } from "@/core/api/services/CompanyService";
import { MemberRequestStatus } from "@/core/utils/enums";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbCircle, TbCircleCheckFilled, TbCircleX } from "react-icons/tb";

export interface InvitationClientProps {
    isAccepted: boolean;
    uid: string;
}

export default function InvitationClient({
    uid,
    isAccepted,
}: InvitationClientProps) {
    const __ = useTranslations("Text");
    const [isUpdated, setUpdated] = useState<boolean>(false);
    useEffect(() => {
        CompanyService.invitationFeed(isAccepted, uid)
            .then(() => {
                setUpdated(true);
            })
            .catch((error) => {
                if (error.response) {
                    var res: ApiErrorsManagement = new ApiErrorsManagement(
                        error,
                    );
                }
            })
            .finally(() => {
                // closeLoading();
            });
        console.log(uid, !!isAccepted);
    });

    return (
        isUpdated &&
        (isAccepted ? (
            <ConfettiLayout className='h-screen'>
                <Header />
                <ContainerLayout className='flex space-y-2 flex-col items-center pt-8 mb-2'>
                    <TbCircleCheckFilled className='text-green-600 text-5xl' />
                    <h2 className='md:text-4xl text-3xl font-bold'>
                        {__("invitation_accepted_title")}
                    </h2>
                    <p className='text-gray-300 text-center'>
                        {__("invitation_accepted_desc")}
                    </p>
                </ContainerLayout>
            </ConfettiLayout>
        ) : (
            <div className='h-screen'>
                <Header />
                <ContainerLayout className='flex space-y-2 flex-col items-center pt-8 mb-2'>
                    <TbCircleX className='text-red-600 text-5xl' />
                    <h2 className='md:text-4xl text-3xl font-bold'>
                        {__("invitation_declined_title")}
                    </h2>
                    <p className='text-gray-300 text-center'>
                        {__("invitation_declined_desc")}
                    </p>
                </ContainerLayout>
            </div>
        ))
    );
}
