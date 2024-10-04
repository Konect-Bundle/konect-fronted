"use client";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import QRCode from "react-qr-code";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import { TextInput, Clipboard, Badge } from "flowbite-react";

import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { useEffect } from "react";
import { customClipboardTheme } from "@/app/_styles/flowbite/clipboard";
import { Konect } from "@/app/_core/models/Konect";
import { formatDistanceToNow } from "date-fns";
import { TbCheck, TbDownload, TbMap2, TbMapPin2, TbX } from "react-icons/tb";
import { generateVCard } from "@/app/_core/utils/functions";

export interface KonectsListPage {}

export default function KonectsListPage(props: KonectsListPage) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");

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
            <section className="lg:pt-12 md:pt-4  pt-4">
                <div className="lg:py-0 md:py-3 py-0 mb-5">
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className="text-2xl font-semibold"
                    >
                        {__("my_connections")}
                    </h2>

                    <div className="w-14 h-1 mt-2 bg-gray-400"></div>

                    {/* <p className="text-gray-300/85 text-sm mt-4 font-light">
                    {TLabels("take_control")}
                </p> */}
                </div>
                <div className="lg:col-span-6 col-span-8 md:space-y-6 space-y-4">
                    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                        {user.konects?.map((konect: Konect, i) => {
                            let city = konect.ko_ip_locations.city;
                            let country = konect.ko_ip_locations.country;
                            let state = konect.ko_ip_locations.state;
                            let time = formatDistanceToNow(konect.created_at, {
                                addSuffix: true,
                                includeSeconds: true,
                            });
                            // console.log(konect);
                            return (
                                <div
                                    className="flex space-y-1 flex-col bg-white p-4 rounded-md border"
                                    key={i}
                                >
                                    <div className="flex justify-between">
                                        <h3 className="flex space-x-2 items-center">
                                            <span>
                                                <TbMapPin2 />
                                            </span>
                                            <span>{`${city} ${state}, ${country}`}</span>
                                        </h3>
                                        <span>
                                            {konect.ko_user_info == null ||
                                            !konect.ko_user_info.phone ? (
                                                <Badge
                                                    color="gray"
                                                    className="text-xs text-gray-500 font-medium w-max"
                                                    icon={TbX}
                                                >
                                                    {__("no_feed")}
                                                </Badge>
                                            ) : (
                                                <span className="flex space-x-2 items-center">
                                                    <Badge
                                                        icon={TbCheck}
                                                        className="text-xs"
                                                        color="success"
                                                    >
                                                        {__("feedback")}
                                                    </Badge>
                                                    <span
                                                        className="bg-gray-100 cursor-pointer p-1 rounded-full "
                                                        onClick={() => {
                                                            generateVCard(
                                                                konect
                                                                    .ko_user_info
                                                                    .firstname,
                                                                konect
                                                                    .ko_user_info
                                                                    .name,
                                                                konect
                                                                    .ko_user_info
                                                                    .phone,
                                                                konect
                                                                    .ko_user_info
                                                                    .email,
                                                            );
                                                        }}
                                                    >
                                                        <TbDownload className="text-gray-500 hover:text-gray-800" />
                                                    </span>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                    <span className="text-gray-300 text-sm font-normal w-max">
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
