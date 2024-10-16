"use client";
import UserAvatar from "@/app/_components/Common/UserAvatar";
import AddUserToCompanyModal from "@/app/_components/Inc/Modals/AddUserToCompany";
import EditCompanyUserModal from "@/app/_components/Inc/Modals/EditCompanyMember";
import { actionValidityHasExpired, ucfirst } from "@/app/_core/utils/functions";
import { useAppSelector } from "@/app/_store/hooks";
import { useTranslations } from "next-intl";
import { TbCheck, TbClock, TbSend, TbX } from "react-icons/tb";
import { MutatingDots } from "react-loader-spinner";

export default function MembersListCompanyPage({}) {
    // const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
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

    return (
        user && (
            <>
                {/* Table Section */}
                <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
                    {/* Card */}
                    <div className='flex flex-col'>
                        <div className='-m-1.5 overflow-x-auto'>
                            <div className='p-1.5 min-w-full inline-block align-middle'>
                                <div className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700'>
                                    <section className='grid grid-cols-8 gap-4 px-6 py-4'>
                                        <div className='lg:col-span-2 col-span-8 px-0 lg:py-0 md:py-3 py-0'>
                                            <h2
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                }}
                                                className='text-xl font-semibold'
                                            >
                                                {__("contact_form")}
                                            </h2>

                                            <div className='w-14 h-1 mt-2 bg-gray-400'></div>

                                            {/* <p className='text-gray-300/85 text-sm mt-4 font-light'>
                            {TLabels("take_control")}
                        </p> */}
                                        </div>
                                        <div className='lg:col-span-6 col-span-8'>
                                            {/* <VcardCompanyEditor user={user} /> */}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* End Card */}
                </div>
                {/* End Table Section */}
            </>
        )
    );
}
