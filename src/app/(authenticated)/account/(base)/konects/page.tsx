"use client";
import { useAppSelector } from "@/store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import QRCode from "react-qr-code";
import InputWithLabel from "@/components/Common/Form/InputWithLabel";
import { TextInput, Clipboard, Badge } from "flowbite-react";

import { customTextInputTheme } from "@/styles/flowbite/form";
import { useEffect, useState } from "react";
import { customClipboardTheme } from "@/styles/flowbite/clipboard";
import { Konect } from "@/core/models/Konect";
import { formatDistanceToNow } from "date-fns";
import {
    TbAddressBook,
    TbCheck,
    TbDownload,
    TbMap2,
    TbMapPin2,
    TbX,
} from "react-icons/tb";
import { generateVCard, ucfirst } from "@/core/utils/functions";
import { ContactFeed } from "@/core/models/ContactFeed";
import { KoUserInfoInterface } from "@/core/interfaces/appInterfaces";

export interface KonectsListPage {}

export default function KonectsListPage(props: KonectsListPage) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");
    const __A = useTranslations("Actions");

    const [contacts, setContacts] = useState<
        | {
              created_at: Date;
              info: KoUserInfoInterface;
          }[]
        | Array<null>
    >([]);
    useEffect(() => {
        const konects = user?.konects
            ?.filter(
                (konect: Konect) =>
                    konect.ko_user_info != null && konect.ko_user_info,
            )
            .map((konect: Konect) => ({
                created_at: konect.created_at,
                info: konect.ko_user_info,
            })); // Extrait "id" et "name"

        const feeds = user?.contact_feeds
            ?.filter(
                (feed: ContactFeed) => feed.feed_info != null && feed.feed_info,
            )
            .map((feed: ContactFeed) => ({
                created_at: feed.created_at,
                info: feed.feed_info,
            }));

        const merged = [...konects!, ...feeds!];

        setContacts(merged);
    }, [user?.konects, user?.contact_feeds]);
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
                        {__("my_connections")}
                    </h2>

                    <div className='w-14 h-1 mt-2 bg-gray-400'></div>

                    {/* <p className="text-gray-300/85 text-sm mt-4 font-light">
                    {TLabels("take_control")}
                </p> */}
                </div>
                <div className='lg:col-span-6 col-span-8 md:space-y-6 space-y-4'>
                    <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
                        {contacts.map((contact, i) => {
                            let time = formatDistanceToNow(
                                contact!.created_at,
                                {
                                    addSuffix: true,
                                    includeSeconds: true,
                                },
                            );
                            // console.log(konect);
                            return (
                                <div
                                    className='flex space-y-1 flex-col bg-white p-4 rounded-md border'
                                    key={i}
                                >
                                    <div className='flex justify-between'>
                                        <h3 className='flex space-x-2 items-center'>
                                            <span>
                                                <TbAddressBook />
                                            </span>
                                            <span>{`${ucfirst(contact?.info.firstname!)} ${ucfirst(contact?.info.name!)}`}</span>
                                        </h3>
                                        <span>
                                            <span className='flex space-x-2 items-center'>
                                                <Badge
                                                    icon={TbCheck}
                                                    className='text-xs'
                                                    color='success'
                                                >
                                                    {/* {__("feedback")} */}
                                                </Badge>
                                                <span
                                                    className='bg-gray-100 cursor-pointer p-2 rounded-full '
                                                    onClick={() => {
                                                        generateVCard(
                                                            contact?.info
                                                                .firstname!,
                                                            contact?.info.name!,
                                                            contact?.info
                                                                .phone!,
                                                            contact?.info
                                                                .email!,
                                                        );
                                                    }}
                                                >
                                                    <span className='space-x-1 text-xs flex items-center'>
                                                        <TbDownload className='text-gray-500 text-md hover:text-gray-800 font-bold' />
                                                        <span>
                                                            {__A("save")}
                                                        </span>
                                                    </span>{" "}
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                    <span className='text-gray-300 text-sm font-normal w-max'>
                                        {time}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        )
    );
}

{
    /* {user.orders?.map((order, i) => ( */
}
