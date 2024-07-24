"use client";
import React, { useState } from "react";

import Header from "@/app/_components/Common/Headers/Header";
import { useEffect } from "react";
import { GadgetService } from "@/app/_core/api/services/GadgetService";
import { Breadcrumb, Button, Label, TextInput } from "flowbite-react";
import {
    TbHomeFilled,
    TbMinus,
    TbPlus,
    TbRotateClockwise2,
    TbShoppingCart,
} from "react-icons/tb";
import {
    loginRoute,
    productItemRoute,
    productsRoute,
} from "@/app/_core/config/routes";
import Image from "next/image";
import { KoGadgetItem } from "@/app/_core/models/KoGadgetItem";
import { ucfirst } from "@/app/_core/utils/functions";
import {
    AUTH_TOKEN_NAME,
    INTENT_COOKIE_NAME,
    ROOT_FILES_URL,
} from "@/app/_core/config/constants";
import ReactCardFlip from "react-card-flip";
import { setFips } from "crypto";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { customBreadCrumbTheme } from "@/app/_styles/flowbite/breadcrumb";
import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { PaymentService } from "@/app/_core/api/services/PaymentService";
import { batch } from "react-redux";
import { useTranslations } from "next-intl";
import { getCookie, setCookie } from "cookies-next";
import { IntentInterface } from "../../../_core/interfaces/appInterfaces";

export interface KwidgetItemProps {}

export default function KwidgetItemPage({
    params,
}: {
    params: { code: string };
}) {
    const [gadgetItem, setGadget] = useState<KoGadgetItem | null>(null);
    const [name, setName] = useState("");
    const [familyName, setFamilyName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [qty, setQty] = useState(1);
    const T = useTranslations("Kgadgets");
    const __A = useTranslations("Actions");

    useEffect(() => {
        GadgetService.getKwidget(params.code).then((rs) => {
            // console.log(rs);
            var gadget = new KoGadgetItem(
                JSON.parse(rs.data.kg_details).name,
                rs.data.kg_code,
                JSON.parse(rs.data.kg_details).description,
                JSON.parse(rs.data.kg_details).price,
                JSON.parse(rs.data.kg_details).weightDimensions,
                JSON.parse(rs.data.kg_details).color,
                JSON.parse(rs.data.kg_details).material,
                JSON.parse(rs.data.kg_details).type,
                JSON.parse(rs.data.kg_details).imageURL,
            );

            setGadget(gadget);
        });
    }, [params.code]);

    const flipCard = (e: any) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    const handleMakePayment = (e: any) => {
        e.preventDefault();
        if (!name || !familyName || !companyName || !qty) return;
        var token = getCookie(AUTH_TOKEN_NAME);

        if (token) {
            PaymentService.makePayment(
                params.code,
                name,
                familyName,
                companyName,
                qty,
                token,
            ).then((rs) => {
                console.log(rs);
                window.location.href = rs.data.url;
            });
        } else {
            var intent: IntentInterface = {
                path: window.location.href,
                from: productItemRoute.name,
                data: {
                    code: params.code,
                    name: name,
                    familyName: familyName,
                    companyName: companyName,
                    qty: qty,
                },
            };
            localStorage.setItem(INTENT_COOKIE_NAME, JSON.stringify(intent));
            window.location.href = loginRoute.path;
        }
    };
    return (
        gadgetItem != null && (
            <main className="min-h-screen">
                <Header />

                <ContainerLayout>
                    <section className="relative ">
                        <div className="w-full mx-auto md:px-4 px-0 sm:px-6 lg:px-0">
                            <form
                                className="grid grid-cols-1 lg:grid-cols-2 gap-16"
                                method="POST"
                                onSubmit={handleMakePayment}
                            >
                                <div className="img">
                                    <Breadcrumb
                                        aria-label="Default breadcrumb example"
                                        theme={customBreadCrumbTheme?.root}
                                        className="py-6"
                                    >
                                        <Breadcrumb.Item
                                            theme={customBreadCrumbTheme?.item}
                                            href="/"
                                            icon={TbHomeFilled}
                                        >
                                            Home
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item
                                            theme={customBreadCrumbTheme?.item}
                                            href={productsRoute.path}
                                        >
                                            {productsRoute.name}
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item
                                            theme={customBreadCrumbTheme?.item}
                                        >
                                            {gadgetItem.code}
                                        </Breadcrumb.Item>
                                    </Breadcrumb>

                                    <div className="flex flex-col items-center">
                                        <div onDoubleClick={flipCard}>
                                            <ReactCardFlip
                                                isFlipped={isFlipped}
                                                flipDirection="vertical"
                                            >
                                                <div className="img-box md:h-[240px] md:w-[390px] h-[210px] w-[345px] max-lg:mx-auto relative">
                                                    <div
                                                        className={`flex flex-col justify-center ps-8 sm:space-y-1 space-y-1 absolute w-full h-full left-0 ${gadgetItem.color.name == "white" ? " text-gray-800" : gadgetItem.color.name == "black text yellow" ? " text-yellow-600" : " text-gray-100"}`}
                                                    >
                                                        <div className="flex space-x-3 sm:text-2xl text-lg font-bold">
                                                            <span
                                                                id="givenNameText"
                                                                className={`capitalize ${name ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-20 w-10"} `}
                                                            >
                                                                {name}
                                                            </span>
                                                            <span
                                                                id="familyNameText"
                                                                className={`capitalize ${familyName ? " " : "h-3 bg-gray-200 animate-pulse  rounded-sm sm:w-28 w-14"}`}
                                                            >
                                                                {familyName}
                                                            </span>
                                                        </div>
                                                        <span
                                                            className={`capitalize sm:text-lg text-xs font-normal italic ${companyName ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-28 w-14"} ${gadgetItem.color.name == "white" ? " text-gray-600" : " text-gray-300"}`}
                                                            id="companyNameText"
                                                        >
                                                            {companyName}
                                                        </span>
                                                    </div>
                                                    <Image
                                                        src={
                                                            ROOT_FILES_URL +
                                                            "/" +
                                                            gadgetItem
                                                                ?.imageURL[1]
                                                        }
                                                        alt="Yellow Tropical Printed Shirt image"
                                                        className="max-lg:mx-auto lg:ml-auto h-full border rounded-2xl"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>

                                                <div className="img-box md:h-[240px] md:w-[390px] h-[210px] w-[345px] max-lg:mx-auto">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={
                                                            ROOT_FILES_URL +
                                                            "/" +
                                                            gadgetItem
                                                                ?.imageURL[0]
                                                        }
                                                        alt="Yellow Tropical Printed Shirt image"
                                                        className="max-lg:mx-auto lg:ml-auto h-full border rounded-2xl"
                                                    />
                                                </div>
                                            </ReactCardFlip>
                                        </div>

                                        <TbRotateClockwise2
                                            className="my-3 text-gray-700 text-3xl"
                                            onClick={flipCard}
                                        />
                                        <p className="text-gray-300">
                                            {__A("click_to_flip")}
                                        </p>
                                    </div>

                                    <h3 className="md:py-6 py-3 font-bold md:text-2xl text-xl">
                                        {"Customization"}
                                    </h3>
                                    <div className="grid grid-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="givenName"
                                                    value={"Your firstname"}
                                                />
                                            </div>
                                            <TextInput
                                                theme={customTextInputTheme}
                                                id="givenName"
                                                type="text"
                                                placeholder={"Your firstname"}
                                                sizing="md"
                                                required
                                                onChange={(e) => {
                                                    setName(e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="familyName"
                                                    value={"Your name"}
                                                />
                                            </div>
                                            <TextInput
                                                id="familyName"
                                                type="text"
                                                theme={customTextInputTheme}
                                                placeholder={"Your name"}
                                                sizing="md"
                                                required
                                                onChange={(e) => {
                                                    setFamilyName(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label
                                                    htmlFor="companyName"
                                                    value={"Your Company name"}
                                                />
                                            </div>
                                            <TextInput
                                                id="companyName"
                                                type="text"
                                                theme={customTextInputTheme}
                                                sizing="md"
                                                placeholder={
                                                    "Your Company name"
                                                }
                                                required
                                                onChange={(e) => {
                                                    setCompanyName(
                                                        e.target.value,
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0 bg-white rounded-lg ps-8 pe-8 lg:pt-0 pt-6 border border-gray-300/25">
                                    <div className="data w-full max-w-xl">
                                        <h2 className="font-manrope font-bold md:text-3xl text-2xl leading-10 text-gray-900 mb-2 capitalize">
                                            {"Konect " + gadgetItem?.name}
                                        </h2>
                                        <div className="flex flex-col sm:flex-row sm:items-center mb-6">
                                            <h6 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5">
                                                ${gadgetItem?.price}
                                            </h6>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1">
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_12029_1640)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#FBBF24"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_12029_1640">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                    <svg
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 20 20"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <g clipPath="url(#clip0_8480_66029)">
                                                            <path
                                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                                fill="#F3F4F6"
                                                            />
                                                        </g>
                                                        <defs>
                                                            <clipPath id="clip0_8480_66029">
                                                                <rect
                                                                    width="20"
                                                                    height="20"
                                                                    fill="white"
                                                                />
                                                            </clipPath>
                                                        </defs>
                                                    </svg>
                                                </div>
                                                <span className="pl-2 font-normal leading-7 text-gray-500 text-sm ">
                                                    1624 review
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-base font-normal mb-5">
                                            {T!(gadgetItem?.description)}
                                        </p>
                                        <ul className="grid gap-y-4 mb-8">
                                            <li className="flex items-center gap-3">
                                                <svg
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 26 26"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <rect
                                                        width="26"
                                                        height="26"
                                                        rx="13"
                                                        fill="#4F46E5"
                                                    />
                                                    <path
                                                        d="M7.66669 12.629L10.4289 15.3913C10.8734 15.8357 11.0956 16.0579 11.3718 16.0579C11.6479 16.0579 11.8701 15.8357 12.3146 15.3913L18.334 9.37183"
                                                        stroke="white"
                                                        strokeWidth="1.6"
                                                        strokeLinecap="round"
                                                    />
                                                </svg>
                                                <span className="font-normal text-base text-gray-900 ">
                                                    {ucfirst(
                                                        gadgetItem?.material!,
                                                    )}
                                                </span>
                                            </li>
                                        </ul>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-8">
                                            <div className="flex space-x-2 sm:items-center sm:justify-center w-full">
                                                <span
                                                    className="group py-2 px-2 border border-gray-300/45 rounded-l-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 cursor-pointer"
                                                    onClick={() => {
                                                        if (qty > 1) {
                                                            setQty(qty - 1);
                                                        }
                                                    }}
                                                >
                                                    <TbMinus />
                                                </span>
                                                <span className="font-semibold text-gray-900 text-lg py-[13px] px-8 sm:max-w-[118px] outline-0 border rounded-lg border-gray-300/50 bg-transparent placeholder:text-gray-900 text-center hover:bg-gray-50">
                                                    {qty}
                                                </span>

                                                <span
                                                    className="group py-2 px-2 border border-gray-300/45 rounded-r-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 cursor-pointer"
                                                    onClick={() => {
                                                        var newQty = qty + 1;
                                                        setQty(newQty);
                                                    }}
                                                >
                                                    <TbPlus />
                                                </span>
                                            </div>
                                            <Button
                                                type="submit"
                                                theme={customButtonTheme}
                                                size="md"
                                                color="dark"
                                                className="flex justify-center space-x-2"
                                            >
                                                <TbShoppingCart className="text-lg" />
                                                <span className="ml-1 font-bold">
                                                    {"Buy"}
                                                </span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </ContainerLayout>
            </main>
        )
    );
}
