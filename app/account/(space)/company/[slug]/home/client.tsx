"use client";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import { Badge } from "flowbite-react";
import { Konect } from "@/app/_core/models/Konect";
import { formatDistanceToNow } from "date-fns";
import {
    TbBuildingCommunity,
    TbCheck,
    TbDownload,
    TbMap2,
    TbMapPin2,
    TbTrash,
    TbUsers,
    TbX,
} from "react-icons/tb";
import { generateVCard, ucfirst } from "@/app/_core/utils/functions";
import { useEffect, useState } from "react";
import { getUserCompanies } from "@/app/_store/slices/authSlice";
import { HiOfficeBuilding } from "react-icons/hi";
import Company from "@/app/_core/models/Company";
import { useDispatch } from "react-redux";

interface HomeSpaceClient {
    slug: string;
}

export default function HomeSpaceClient({ slug }: HomeSpaceClient) {
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
            <section className='lg:pt-12 md:pt-4  pt-4'>
                <div className='lg:py-0 md:py-3 py-0 mb-4'>
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className='text-2xl font-medium'
                    >
                        {ucfirst(slug)}
                    </h2>

                    {/* <div className="w-14 h-1 mt-2 bg-gray-400"></div> */}

                    {/* <p className="text-gray-300/85 text-sm mt-4 font-light">
                    {TLabels("take_control")}
                </p> */}
                </div>
                <div className='lg:col-span-6 col-span-8 md:space-y-6 space-y-4'>
                    <>
                        {/* Card Section */}
                        <div className='max-w-[85rem] mx-auto'>
                            {/* Grid */}
                            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                                {/* Card */}
                                <div className='flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                                    <div className='inline-flex justify-center items-center'>
                                        <span className='size-2 inline-block bg-gray-500 rounded-full me-2' />
                                        <span className='text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400'>
                                            {__("member")}s
                                        </span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200'>
                                            {currentCompany?.members?.length}
                                        </h3>
                                    </div>
                                    <dl className='flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800'>
                                        <dt className='pe-3'>
                                            <span className='text-green-600'>
                                                <svg
                                                    className='inline-block size-4 self-center'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={16}
                                                    height={16}
                                                    fill='currentColor'
                                                    viewBox='0 0 16 16'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'
                                                    />
                                                </svg>
                                                <span className='inline-block text-sm'>
                                                    1.7%
                                                </span>
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                change
                                            </span>
                                        </dt>
                                        <dd className='text-start ps-3'>
                                            <span className='text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                                5
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                last week
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                {/* End Card */}
                                {/* Card */}
                                <div className='flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                                    <div className='inline-flex justify-center items-center'>
                                        <span className='size-2 inline-block bg-green-500 rounded-full me-2' />
                                        <span className='text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400'>
                                            Successful conversions
                                        </span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200'>
                                            25
                                        </h3>
                                    </div>
                                    <dl className='flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800'>
                                        <dt className='pe-3'>
                                            <span className='text-green-600'>
                                                <svg
                                                    className='inline-block size-4 self-center'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={16}
                                                    height={16}
                                                    fill='currentColor'
                                                    viewBox='0 0 16 16'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z'
                                                    />
                                                </svg>
                                                <span className='inline-block text-sm'>
                                                    5.6%
                                                </span>
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                change
                                            </span>
                                        </dt>
                                        <dd className='text-start ps-3'>
                                            <span className='text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                                7
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                last week
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                {/* End Card */}
                                {/* Card */}
                                <div className='flex flex-col gap-y-3 lg:gap-y-5 p-4 md:p-5 bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                                    <div className='inline-flex justify-center items-center'>
                                        <span className='size-2 inline-block bg-red-500 rounded-full me-2' />
                                        <span className='text-xs font-semibold uppercase text-gray-600 dark:text-neutral-400'>
                                            Failed conversions
                                        </span>
                                    </div>
                                    <div className='text-center'>
                                        <h3 className='text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 dark:text-neutral-200'>
                                            4
                                        </h3>
                                    </div>
                                    <dl className='flex justify-center items-center divide-x divide-gray-200 dark:divide-neutral-800'>
                                        <dt className='pe-3'>
                                            <span className='text-red-600'>
                                                <svg
                                                    className='inline-block size-4 self-center'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={16}
                                                    height={16}
                                                    fill='currentColor'
                                                    viewBox='0 0 16 16'
                                                >
                                                    <path
                                                        fillRule='evenodd'
                                                        d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'
                                                    />
                                                </svg>
                                                <span className='inline-block text-sm'>
                                                    5.6%
                                                </span>
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                change
                                            </span>
                                        </dt>
                                        <dd className='text-start ps-3'>
                                            <span className='text-sm font-semibold text-gray-800 dark:text-neutral-200'>
                                                7
                                            </span>
                                            <span className='block text-sm text-gray-500 dark:text-neutral-500'>
                                                last week
                                            </span>
                                        </dd>
                                    </dl>
                                </div>
                                {/* End Card */}
                            </div>
                            {/* End Grid */}
                        </div>
                        {/* End Card Section */}
                    </>
                </div>
            </section>
        )
    );
}
