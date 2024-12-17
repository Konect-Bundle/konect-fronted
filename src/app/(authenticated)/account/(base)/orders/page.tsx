"use client";

// import { UserVcardInterface } from "@/core/interfaces/vcardInterfaces";
import VcardEditor from "@/components/Common/Vcard/VcardEditor";
import { format, formatDistance, formatDistanceToNow } from "date-fns";

import { useAppSelector } from "@/store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
    ROOT_ASSETS_URL,
    ROOT_FILES_PROD,
    ROOT_FILES_URL,
} from "@/core/config/constants";
import { Button } from "flowbite-react";
import Link from "next/link";
import { customButtonTheme } from "@/styles/flowbite/button";
import { TbReload, TbReorder } from "react-icons/tb";
import { productItemRoute } from "@/core/config/routes";
export interface OrderHistoryProps {}

export default function OrderHistoryPage(props: OrderHistoryProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");
    // console.log(user?.orders);
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
                <div className='lg:py-0 md:py-3 py-0 mb-5'>
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className='text-2xl font-semibold'
                    >
                        {__("your_orders")}
                    </h2>

                    <div className='w-14 h-1 mt-2 bg-gray-400'></div>

                    {/* <p className="text-gray-300/85 text-sm mt-4 font-light">
                    {TLabels("take_control")}
                </p> */}
                </div>
                <div className='lg:col-span-6 col-span-8 md:space-y-6 space-y-4'>
                    {user.orders?.map((order, i) => {
                        const gadget = user.gadgets![i];

                        return (
                            (order.paymentMethod == "other"
                                ? true
                                : order.payload.session_id) &&
                            order.isClosed === true && (
                                <div
                                    className='grid grid-cols-12 md:gap-4 gap-3 border bg-white px-0 py-12 rounded-lg'
                                    key={i}
                                >
                                    <div className='col-span-12'>
                                        <h2 className='py-1 font-normal italic text-center'>
                                            {order.isClosed
                                                ? `Ordered ${formatDistanceToNow(order.createdAt)} before`
                                                : "En cours"}
                                        </h2>
                                    </div>
                                    <div className='lg:col-span-4 col-span-12'>
                                        <div className='flex justify-center'>
                                            <div className='md:w-[350px] w-80 bg-white flex justify-center relative'>
                                                <div
                                                    className={`flex flex-col justify-center ps-8 sm:space-y-1 space-y-1 absolute w-full h-full left-0 ${gadget.color.name == "white" ? " text-gray-800" : gadget.color.name == "black text yellow" ? " text-yellow-600" : " text-gray-100"}`}
                                                >
                                                    <div className='flex space-x-2 sm:text-2xl text-xl font-bold'>
                                                        <span
                                                            id='givenNameText'
                                                            className={`capitalize ${gadget.cardCustomDetails?.firstname ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-20 w-10"} `}
                                                        >
                                                            {
                                                                gadget
                                                                    .cardCustomDetails
                                                                    ?.firstname
                                                            }
                                                        </span>
                                                        <span
                                                            id='familyNameText'
                                                            className={`capitalize ${gadget.cardCustomDetails?.name ? " " : "h-3 bg-gray-200 animate-pulse  rounded-sm sm:w-28 w-14"}`}
                                                        >
                                                            {
                                                                gadget
                                                                    .cardCustomDetails
                                                                    ?.name
                                                            }
                                                        </span>
                                                    </div>
                                                    <span
                                                        className={`capitalize sm:text-lg text-lg font-normal italic ${gadget.cardCustomDetails?.title ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-28 w-14"} ${gadget.color.name == "white" ? " text-gray-600" : " text-gray-300"}`}
                                                        id='companyNameText'
                                                    >
                                                        {
                                                            gadget
                                                                .cardCustomDetails
                                                                ?.title
                                                        }
                                                    </span>
                                                </div>
                                                <div className='border rounded-lg overflow-hidden border-noir-medium/25 '>
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={
                                                            ROOT_FILES_PROD +
                                                            user.gadgets![i]
                                                                .imageURL[1]
                                                        }
                                                        alt='face cream image'
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <Image src={ROOT_ASSETS_URL+user.} width={500} height={500} alt=""/> */}
                                    </div>
                                    <div className='lg:col-span-8 col-span-12'>
                                        <div className='flex flex-col justify-center items-center'>
                                            <span className='truncate md:text-lg font-medium text-lg'>
                                                {user.gadgets![i].name}
                                            </span>
                                            <span className='truncate md:text-md font-normal text-md text-gray-500 py-3'>
                                                {
                                                    "Aucun retour admissible pour l'instant"
                                                }{" "}
                                            </span>
                                            <div className='flex flex-wrap justify-start'>
                                                <Link
                                                    href={
                                                        productItemRoute.path +
                                                        `/${user.gadgets![i].code}`
                                                    }
                                                    className='mr-3'
                                                >
                                                    <Button
                                                        theme={
                                                            customButtonTheme
                                                        }
                                                        color='dark'
                                                        size='md'
                                                        className='flex md:py-2.5 items-center'
                                                    >
                                                        <TbReload />
                                                        <span className='ml-1'>
                                                            {__("reorder")}
                                                        </span>
                                                    </Button>
                                                </Link>
                                                <Link href={"/"}>
                                                    <Button
                                                        theme={
                                                            customButtonTheme
                                                        }
                                                        color='light'
                                                        size='md'
                                                        className='flex md:py-2.5 items-center'
                                                    >
                                                        {__("get_card")}
                                                    </Button>
                                                </Link>
                                                {/* <Link href={"/"}>
                                            <Button
                                                theme={customButtonTheme}
                                                color="light"
                                                size="xs"
                                            >
                                                {__("get_card")}
                                            </Button>
                                        </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        );
                    })}
                </div>
            </section>
        )
    );
}

{
    /* {user.orders?.map((order, i) => ( */
}
