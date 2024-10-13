"use client";

// import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import VcardEditor from "../../../_components/Common/Vcard/VcardEditor";
import { format, formatDistance, formatDistanceToNow } from "date-fns";

import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ROOT_ASSETS_URL, ROOT_FILES_URL } from "@/app/_core/config/constants";
import { Button } from "flowbite-react";
import Link from "next/link";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { TbReload, TbReorder } from "react-icons/tb";
import { productItemRoute } from "@/app/_core/config/routes";
export interface OrderHistoryProps {}

export default function OrderHistoryPage(props: OrderHistoryProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");
    console.log(user?.orders);

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
                    {user.orders?.map(
                        (order, i) =>
                            (order.payload.session_id &&
                                order.isClosed === true) ?? (
                                <div
                                    className='grid grid-cols-12 md:gap-8 gap-3 border bg-white p-6 rounded-lg'
                                    key={i}
                                >
                                    <div className='col-span-12'>
                                        <h2 className='py-1 font-normal italic'>
                                            {order.isClosed
                                                ? `Ordered ${formatDistanceToNow(order.createdAt)} before`
                                                : "En cours"}
                                        </h2>
                                    </div>
                                    <div className='lg:col-span-3 col-span-4'>
                                        <div className='bg-white border md:rounded-3xl rounded-lg overflow-hidden border-noir-medium/25'>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={
                                                    ROOT_FILES_URL +
                                                    user.gadgets![i].imageURL[0]
                                                }
                                                alt='face cream image'
                                            />
                                        </div>
                                        {/* <Image src={ROOT_ASSETS_URL+user.} width={500} height={500} alt=""/> */}
                                    </div>
                                    <div className='lg:col-span-9 col-span-8'>
                                        <div className='flex flex-col justify-center'>
                                            <span className='truncate md:text-lg font-medium text-sm'>
                                                {user.gadgets![i].name}
                                            </span>
                                            <span className='truncate md:text-md font-normal text-sm text-gray-500 py-2'>
                                                {
                                                    "Aucun retour admissible pour l'instant"
                                                }{" "}
                                            </span>
                                            <div className='flex flex-wrap sm:space-x-3 space-x-0 sm:space-y-0 space-y-2 justify-start'>
                                                <Link
                                                    href={
                                                        productItemRoute.path +
                                                        `/${user.gadgets![i].code}`
                                                    }
                                                >
                                                    <Button
                                                        theme={
                                                            customButtonTheme
                                                        }
                                                        color='dark'
                                                        size='xs'
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
                                                        size='xs'
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
                            ),
                    )}
                </div>
            </section>
        )
    );
}

{
    /* {user.orders?.map((order, i) => ( */
}
