"use client";
import UserAvatar from "@/app/_components/Common/UserAvatar";
import AddUserToCompanyModal from "@/app/_components/Inc/Modals/AddUserToCompany";
import EditCompanyUserModal from "@/app/_components/Inc/Modals/EditCompanyMember";
import { actionValidityHasExpired, ucfirst } from "@/app/_core/utils/functions";
import { useAppSelector } from "@/app/_store/hooks";
import { useTranslations } from "next-intl";
import {
    TbCheck,
    TbClock,
    TbSend,
    TbX
} from "react-icons/tb";
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
                                    {/* Header */}
                                    <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700'>
                                        <div>
                                            <h2 className='text-xl font-semibold text-gray-800 dark:text-neutral-200'>
                                                {__("member")}s{" "}
                                            </h2>
                                            <p className='text-sm text-gray-600 dark:text-neutral-400'>
                                                Add users, edit and more.
                                            </p>
                                        </div>
                                        <div>
                                            <div className='inline-flex gap-x-2'>
                                                {/* <a
                                                    className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                                                    href='#'
                                                >
                                                    View all
                                                </a> */}
                                                <AddUserToCompanyModal
                                                    company={currentCompany}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Header */}
                                    {/* Table */}
                                    <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700'>
                                        <thead className='bg-gray-50 dark:bg-neutral-800'>
                                            <tr>
                                                <th
                                                    scope='col'
                                                    className='ps-6 py-3 text-start'
                                                ></th>
                                                <th
                                                    scope='col'
                                                    className='ps-6 lg:ps-3 xl:ps-0 pe-6 py-3 text-start'
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                                                            Name
                                                        </span>
                                                    </div>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-6 py-3 text-start'
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                                                            Position
                                                        </span>
                                                    </div>
                                                </th>
                                                <th
                                                    scope='col'
                                                    className='px-6 py-3 text-start'
                                                >
                                                    <div className='flex items-center gap-x-2'>
                                                        <span className='text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200'>
                                                            Status
                                                        </span>
                                                    </div>
                                                </th>

                                                <th
                                                    scope='col'
                                                    className='px-6 py-3 text-end'
                                                />
                                            </tr>
                                        </thead>
                                        <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                                            {currentCompany?.members?.map(
                                                (member, i) => (
                                                    <tr key={i}>
                                                        <td className='size-px whitespace-nowrap'></td>
                                                        <td className='size-px whitespace-nowrap'>
                                                            <div className='ps-6 lg:ps-3 xl:ps-0 pe-6 py-3'>
                                                                <div className='flex items-center gap-x-3'>
                                                                    <UserAvatar
                                                                        imgSrc={
                                                                            member
                                                                                .user
                                                                                ?.profile_photo_url
                                                                        }
                                                                    />
                                                                    <div className='grow'>
                                                                        <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                                                            {`${ucfirst(member.user?.firstname!)} ${ucfirst(member.user?.name!)}`}
                                                                        </span>
                                                                        <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                                            {member.companyEmail ??
                                                                                ""}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className='h-px w-72 whitespace-nowrap'>
                                                            <div className='px-6 py-3'>
                                                                <span className='block text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                                                    {member.role ??
                                                                        "Employee"}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className='size-px whitespace-nowrap'>
                                                            <div className='px-6 py-3 flex justify-center'>
                                                                {member.requestStatus?.toLocaleLowerCase() ===
                                                                    "accepted" && (
                                                                    <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-200/55 text-green-800 dark:bg-green-800/30 dark:text-green-500 '>
                                                                        <TbCheck />

                                                                        {__(
                                                                            `request_${member.requestStatus?.toLowerCase()}`,
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {member.requestStatus?.toLocaleLowerCase() ===
                                                                    "pending" && (
                                                                    <span className='flex flex-col space-y-2 justify-center items-center'>
                                                                        <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-50 text-gray-500 dark:bg-white/10 dark:text-white w-min mb-3'>
                                                                            <TbClock />

                                                                            {__(
                                                                                `request_${member.requestStatus?.toLowerCase()}`,
                                                                            )}
                                                                        </span>
                                                                        {actionValidityHasExpired(
                                                                            member?.createdAt,
                                                                        ) && (
                                                                            <span className='text-xs space-x-1 flex text-gray-500 hover:text-gray-700 cursor-pointer hover:underline'>
                                                                                <TbSend />
                                                                                <span>
                                                                                    Renvoyer
                                                                                    le
                                                                                    lien
                                                                                </span>
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                )}
                                                                {member.requestStatus?.toLocaleLowerCase() ===
                                                                    "declined" && (
                                                                    <span className='inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500'>
                                                                        <TbX />

                                                                        {__(
                                                                            `request_${member.requestStatus?.toLowerCase()}`,
                                                                        )}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className='size-px whitespace-nowrap'>
                                                            <div className='px-6 py-1.5'>
                                                                <EditCompanyUserModal
                                                                    companyMember={
                                                                        member
                                                                    }
                                                                    keyId={i}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ),
                                            )}
                                        </tbody>
                                    </table>
                                    {/* End Table */}
                                    {/* Footer */}
                                    <div className='px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-t border-gray-200 dark:border-neutral-700'>
                                        <div>
                                            <p className='text-sm text-gray-600 dark:text-neutral-400'>
                                                <span className='font-semibold text-gray-800 dark:text-neutral-200'>
                                                    {
                                                        currentCompany?.members
                                                            ?.length
                                                    }
                                                </span>{" "}
                                                results
                                            </p>
                                        </div>
                                        {/* <div>
                                            <div className='inline-flex gap-x-2'>
                                                <button
                                                    type='button'
                                                    className='py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                                                >
                                                    <svg
                                                        className='shrink-0 size-4'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width={24}
                                                        height={24}
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth={2}
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    >
                                                        <path d='m15 18-6-6 6-6' />
                                                    </svg>
                                                    Prev
                                                </button>
                                                <button
                                                    type='button'
                                                    className='py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800'
                                                >
                                                    Next
                                                    <svg
                                                        className='shrink-0 size-4'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width={24}
                                                        height={24}
                                                        viewBox='0 0 24 24'
                                                        fill='none'
                                                        stroke='currentColor'
                                                        strokeWidth={2}
                                                        strokeLinecap='round'
                                                        strokeLinejoin='round'
                                                    >
                                                        <path d='m9 18 6-6-6-6' />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* End Footer */}
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
