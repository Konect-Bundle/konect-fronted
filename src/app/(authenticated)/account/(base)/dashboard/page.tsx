"use client";
import { useAppSelector } from "@/store/hooks";
import { useTranslations } from "next-intl";
import { MutatingDots } from "react-loader-spinner";
import { esser, ucfirst } from "@/core/utils/functions";
import IMap from "@/components/Common/Map/IMap";
import { useEffect } from "react";
import Analytics from "@/core/models/Analytics";
import { TbArrowBigDownLines, TbArrowBigUpLines } from "react-icons/tb";

export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const googleKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string;
    const __ = useTranslations("Profile");
    const __t = useTranslations("Text");

    useEffect(() => {
        console.log(user);
        // initFlowbite();
        // if (document.getElementById("area-chart") && typeof ApexCharts !== 'undefined') {
        //     const chart = new ApexCharts(document.getElementById("area-chart"), options);
        //     chart.render();
        //   }
    });

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
    else {
        return (
            <>
                <div className='py-6 space-y-2'>
                    <h2 className='font-bold text-2xl'>
                        {__("Dashboard.dashboard_hello", {
                            name: ucfirst(user.firstname!),
                        })}
                    </h2>
                    <p className='text-gray-600'>
                        {__t("enjoy_a_quick_and_comprehensive_overview")}
                    </p>
                </div>

                {/* Card Section */}
                {analyticStats()}
                {/* End Card Section */}

                {/* Stats */}

                <div className='grid gap-3 grid-cols-11'>
                    <div className='rounded-lg border border-noir-medium/35 bg-white mb-4 md:mt-0 mt-2 lg:col-span-7 col-span-11 py-4 px-6'>
                        <div className='border-b border-noir-medium/35 mb-6 p-4'>
                            <h5 className='leading-none text-xl font-semibold text-gray-900 pb-2'>
                                {__t("geographical_overview")} -{" "}
                                <span className='text-yellow-900'>
                                    {esser(
                                        `${user.konects?.length} Konect`,
                                        user.konects!.length,
                                    )}
                                </span>
                            </h5>
                            <p className='text-md font-normal text-gray-500'>
                                {__t(
                                    "visualize_the_geographic_areas_you_have_touched",
                                )}
                            </p>
                        </div>

                        <div className='w-full overflow-hidden rounded-xl'>
                            <div className='w-full scale-[1.35]'>
                                {googleKey && (
                                    <IMap
                                        konects={user.konects!}
                                        googleKey={googleKey}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='lg:col-span-4 col-span-11'></div>
                </div>
            </>
        );
    }

    function analyticStats() {
        return (
            <div className='max-w-[85rem] pb-6 lg:pb-10 mx-auto'>
                {/* Grid */}
                <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6'>
                    {/* Card */}
                    <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                        <div className='p-4 md:p-5 flex items-center gap-x-4'>
                            <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                                <svg
                                    className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                    <circle cx={9} cy={7} r={4} />
                                    <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                                    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                                </svg>
                            </div>
                            <div className='grow'>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                                        {__t("total_connection")}
                                    </p>
                                </div>
                                {(() => {
                                    return (
                                        <div className='mt-1 flex items-center gap-x-2'>
                                            <h3 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200'>
                                                {esser(
                                                    `${user!.konects?.length} Konect`,
                                                    user!.konects!.length,
                                                )}{" "}
                                            </h3>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                        <div className='p-4 md:p-5 flex items-center gap-x-4'>
                            <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                                <svg
                                    className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                    <circle cx={9} cy={7} r={4} />
                                    <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                                    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                                </svg>
                            </div>
                            <div className='grow'>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                                        {__t("total_connection_week")}{" "}
                                    </p>
                                    <div className='hs-tooltip'>
                                        <div className='hs-tooltip-toggle'>
                                            <svg
                                                className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
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
                                                <circle
                                                    cx={12}
                                                    cy={12}
                                                    r={10}
                                                />
                                                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                                                <path d='M12 17h.01' />
                                            </svg>
                                            <span
                                                className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
                                                role='tooltip'
                                            >
                                                The number of daily users
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {(() => {
                                    const weeklyDrop = new Analytics(
                                        user!.konects!,
                                    ).weeklyDrop;
                                    const isPositive =
                                        weeklyDrop.percentageChange >= 0;
                                    const bgColor = isPositive
                                        ? "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100"
                                        : "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100";
                                    const iconColor = isPositive
                                        ? "text-green-900 dark:text-green-100"
                                        : "text-red-900 dark:text-red-100";

                                    const iconElement = isPositive ? (
                                        <TbArrowBigUpLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    ) : (
                                        <TbArrowBigDownLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    );

                                    return (
                                        <div className='mt-1 flex items-center gap-x-2'>
                                            <h3 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200'>
                                                {weeklyDrop.thisWeekClicks}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full ${bgColor}`}
                                            >
                                                {iconElement}
                                                <span className='inline-block text-xs font-medium'>
                                                    {
                                                        weeklyDrop.percentageChange
                                                    }
                                                    %
                                                </span>
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                        <div className='p-4 md:p-5 flex items-center gap-x-4'>
                            <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                                <svg
                                    className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                    <circle cx={9} cy={7} r={4} />
                                    <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                                    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                                </svg>
                            </div>
                            <div className='grow'>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                                        {__t("total_connection_month")}
                                    </p>
                                    <div className='hs-tooltip'>
                                        <div className='hs-tooltip-toggle'>
                                            <svg
                                                className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
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
                                                <circle
                                                    cx={12}
                                                    cy={12}
                                                    r={10}
                                                />
                                                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                                                <path d='M12 17h.01' />
                                            </svg>
                                            <span
                                                className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
                                                role='tooltip'
                                            >
                                                The number of daily users
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {(() => {
                                    const monthlyDrop = new Analytics(
                                        user!.konects!,
                                    ).monthlyDrop;
                                    const isPositive =
                                        monthlyDrop.percentageChange >= 0;
                                    const bgColor = isPositive
                                        ? "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100"
                                        : "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100";
                                    const iconColor = isPositive
                                        ? "text-green-900 dark:text-green-100"
                                        : "text-red-900 dark:text-red-100";

                                    const iconElement = isPositive ? (
                                        <TbArrowBigUpLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    ) : (
                                        <TbArrowBigDownLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    );

                                    return (
                                        <div className='mt-1 flex items-center gap-x-2'>
                                            <h3 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200'>
                                                {monthlyDrop.thisMonthClicks}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full ${bgColor}`}
                                            >
                                                {iconElement}
                                                <span className='inline-block text-xs font-medium'>
                                                    {
                                                        monthlyDrop.percentageChange
                                                    }
                                                    %
                                                </span>
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
                        <div className='p-4 md:p-5 flex items-center gap-x-4'>
                            <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                                <svg
                                    className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                                    <path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
                                    <circle cx={9} cy={7} r={4} />
                                    <path d='M22 21v-2a4 4 0 0 0-3-3.87' />
                                    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
                                </svg>
                            </div>
                            <div className='grow'>
                                <div className='flex items-center gap-x-2'>
                                    <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                                        {__t("total_connection_months")}
                                    </p>
                                    <div className='hs-tooltip'>
                                        <div className='hs-tooltip-toggle'>
                                            <svg
                                                className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
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
                                                <circle
                                                    cx={12}
                                                    cy={12}
                                                    r={10}
                                                />
                                                <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                                                <path d='M12 17h.01' />
                                            </svg>
                                            <span
                                                className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
                                                role='tooltip'
                                            >
                                                The number of daily users
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {(() => {
                                    const threeMonthDrop = new Analytics(
                                        user!.konects!,
                                    ).threeMonthDrop;
                                    const isPositive =
                                        threeMonthDrop.percentageChange >= 0;
                                    const bgColor = isPositive
                                        ? "bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100"
                                        : "bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100";
                                    const iconColor = isPositive
                                        ? "text-green-900 dark:text-green-100"
                                        : "text-red-900 dark:text-red-100";
                                    const iconElement = isPositive ? (
                                        <TbArrowBigUpLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    ) : (
                                        <TbArrowBigDownLines
                                            className={`inline-block size-4 self-center ${iconColor}`}
                                        />
                                    );

                                    return (
                                        <div className='mt-1 flex items-center gap-x-2'>
                                            <h3 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200'>
                                                {threeMonthDrop.thisMonthClicks}
                                            </h3>
                                            <span
                                                className={`inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full ${bgColor}`}
                                            >
                                                {iconElement}
                                                <span className='inline-block text-xs font-medium'>
                                                    {
                                                        threeMonthDrop.percentageChange
                                                    }
                                                    %
                                                </span>
                                            </span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                    {/* End Card */}

                    {/* Card */}
                    {/* <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
            <div className='p-4 md:p-5 flex gap-x-4'>
                <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                    <svg
                        className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                        <path d='M5 22h14' />
                        <path d='M5 2h14' />
                        <path d='M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22' />
                        <path d='M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2' />
                    </svg>
                </div>
                <div className='grow'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                            Sessions
                        </p>
                    </div>
                    <div className='mt-1 flex items-center gap-x-2'>
                        <h3 className='text-xl font-medium text-gray-800 dark:text-neutral-200'>
                            29.4%
                        </h3>
                    </div>
                </div>
            </div>
        </div> */}
                    {/* End Card */}
                    {/* Card */}
                    {/* <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
            <div className='p-4 md:p-5 flex gap-x-4'>
                <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                    <svg
                        className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                        <path d='M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6' />
                        <path d='m12 12 4 10 1.7-4.3L22 16Z' />
                    </svg>
                </div>
                <div className='grow'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                            Avg. Click Rate
                        </p>
                    </div>
                    <div className='mt-1 flex items-center gap-x-2'>
                        <h3 className='text-xl sm:text-2xl font-medium text-gray-800 dark:text-neutral-200'>
                            56.8%
                        </h3>
                        <span className='inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-red-100 text-red-900 dark:bg-red-800 dark:text-red-100'>
                            <svg
                                className='inline-block size-4 self-center'
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
                                <polyline points='22 17 13.5 8.5 8.5 13.5 2 7' />
                                <polyline points='16 17 22 17 22 11' />
                            </svg>
                            <span className='inline-block text-xs font-medium'>
                                1.7%
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div> */}
                    {/* End Card */}
                    {/* Card */}
                    {/* <div className='flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-800'>
            <div className='p-4 md:p-5 flex gap-x-4'>
                <div className='shrink-0 flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800'>
                    <svg
                        className='shrink-0 size-5 text-gray-600 dark:text-neutral-400'
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
                        <path d='M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z' />
                        <path d='M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                        <path d='M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2' />
                        <path d='M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2' />
                    </svg>
                </div>
                <div className='grow'>
                    <div className='flex items-center gap-x-2'>
                        <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-neutral-500'>
                            Pageviews
                        </p>
                        <div className='hs-tooltip'>
                            <div className='hs-tooltip-toggle'>
                                <svg
                                    className='shrink-0 size-4 text-gray-500 dark:text-neutral-500'
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
                                    <circle
                                        cx={12}
                                        cy={12}
                                        r={10}
                                    />
                                    <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                                    <path d='M12 17h.01' />
                                </svg>
                                <span
                                    className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
                                    role='tooltip'
                                >
                                    The average pageviews
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='mt-1 flex items-center gap-x-2'>
                        <h3 className='text-xl font-medium text-gray-800 dark:text-neutral-200'>
                            92,913
                        </h3>
                    </div>
                </div>
            </div>
        </div> */}
                    {/* End Card */}
                </div>
                {/* End Grid */}
            </div>
        );
    }
}
