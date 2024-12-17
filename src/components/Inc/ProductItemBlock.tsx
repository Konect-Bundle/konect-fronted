"use client";
import React, { useRef, useState } from "react";

import { Badge, Breadcrumb, Button, FileInput } from "flowbite-react";
import {
    TbCheck,
    TbFileImport,
    TbFileUpload,
    TbHomeFilled,
    TbMinus,
    TbPlus,
    TbRotateClockwise2,
    TbShoppingCart,
    TbTruckDelivery,
} from "react-icons/tb";

import Image from "next/image";

import ReactCardFlip from "react-card-flip";

import { CustomConfigInterface } from "@/app/(guest)/product-item/[code]/page";
import { ROOT_FILES_PROD } from "@/core/config/constants";
import { productsRoute } from "@/core/config/routes";
import { KoGadgetItem } from "@/core/models/KoGadgetItem";
import { ucfirst } from "@/core/utils/functions";
import { customBreadCrumbTheme } from "@/styles/flowbite/breadcrumb";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customFileInputTheme } from "@/styles/flowbite/form";
import { Form, FormikProps } from "formik";
import { useTranslations } from "next-intl";
import ErrorsViewer from "../Common/Errors/ErrorsViewer";
import InputField from "../Common/Form/InputField";
import InputWithLabel from "../Common/Form/InputWithLabel";
import ContainerLayout from "../Layouts/Container";

interface productItemInterface {
    formProps: FormikProps<CustomConfigInterface>;
    gadgetItem: KoGadgetItem;
    errors: string | Array<string>;
}
export default function ProductItemBlock({
    formProps,
    gadgetItem,
    errors,
}: productItemInterface) {
    const [isFlipped, setIsFlipped] = useState(false);
    const T = useTranslations("Kgadgets");
    const __A = useTranslations("Actions");
    const __ = useTranslations("Text");
    const [selectedImage, setSelectedImage] = useState<
        string | ArrayBuffer | null
    >(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const flipCard = (e: any) => {
        e.preventDefault();
        setIsFlipped(!isFlipped);
    };

    const handleAddCustomLogo = () => {
        fileInputRef.current?.click();
    };
    return (
        <ContainerLayout>
            <section className='relative '>
                <div className='w-full mx-auto md:px-4 px-0 sm:px-6 lg:px-0'>
                    <Form className='grid grid-cols-1 lg:grid-cols-2 gap-16'>
                        <div className='img'>
                            <Breadcrumb
                                aria-label='Default breadcrumb example'
                                theme={customBreadCrumbTheme?.root}
                                className='py-6'
                            >
                                <Breadcrumb.Item
                                    theme={customBreadCrumbTheme?.item}
                                    href='/'
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

                            <div className='flex flex-col items-center'>
                                <div onDoubleClick={flipCard}>
                                    <ReactCardFlip
                                        isFlipped={isFlipped}
                                        flipDirection='vertical'
                                    >
                                        <div className='img-box md:h-[240px] md:w-[390px] h-[210px] w-[345px] max-lg:mx-auto relative'>
                                            <div
                                                className={`flex flex-col justify-center ps-8 sm:space-y-1 space-y-1 absolute w-full h-full left-0 ${gadgetItem.color.name == "white" ? " text-gray-800" : gadgetItem.color.name == "black text yellow" ? " text-yellow-600" : " text-gray-100"}`}
                                            >
                                                <div className='flex space-x-3 sm:text-2xl text-lg font-bold'>
                                                    <span
                                                        id='givenNameText'
                                                        className={`capitalize ${formProps.values.firstname ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-20 w-10"} `}
                                                    >
                                                        {
                                                            formProps.values
                                                                .firstname
                                                        }
                                                    </span>
                                                    <span
                                                        id='familyNameText'
                                                        className={`capitalize ${formProps.values.name ? " " : "h-3 bg-gray-200 animate-pulse  rounded-sm sm:w-28 w-14"}`}
                                                    >
                                                        {formProps.values.name}
                                                    </span>
                                                </div>
                                                <span
                                                    className={`capitalize sm:text-lg text-xs font-normal italic ${formProps.values.title ? " " : "h-3 bg-gray-200 animate-pulse rounded-sm sm:w-28 w-14"} ${gadgetItem.color.name == "white" ? " text-gray-600" : " text-gray-300"}`}
                                                    id='companyNameText'
                                                >
                                                    {formProps.values.title}
                                                </span>
                                            </div>
                                            <Image
                                                src={
                                                    ROOT_FILES_PROD +
                                                    gadgetItem?.imageURL[1]
                                                }
                                                alt='Carte NFC QR pour échanges de contacts | Digital NFC business card by Konect for modern networking'
                                                className='max-lg:mx-auto lg:ml-auto h-full border rounded-2xl'
                                                width={500}
                                                height={500}
                                            />
                                        </div>

                                        <div className='img-box md:h-[240px] md:w-[390px] h-[210px] w-[345px] max-lg:mx-auto'>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={
                                                    ROOT_FILES_PROD +
                                                    gadgetItem?.imageURL[0]
                                                }
                                                alt='Yellow Tropical Printed Shirt image'
                                                className='max-lg:mx-auto lg:ml-auto h-full border rounded-2xl'
                                            />
                                        </div>
                                    </ReactCardFlip>
                                </div>

                                <TbRotateClockwise2
                                    className='my-3 text-gray-700 text-3xl'
                                    onClick={flipCard}
                                />
                                <p className='text-gray-300'>
                                    {__A("click_to_flip")}
                                </p>
                            </div>

                            <h3
                                className='md:py-6 py-3 font-bold md:text-2xl text-xl'
                                id='customizeSection'
                            >
                                {__("card_customization")}
                            </h3>
                            <div className='grid grid-1 lg:grid-cols-2 xl:grid-cols-3 gap-3'>
                                <div>
                                    <InputWithLabel
                                        isRequired={true}
                                        labelFor={"firstname"}
                                        labelTitle={__("your_firstname")}
                                    >
                                        <InputField
                                            type='text'
                                            labelFor='firstname'
                                            name='firstname'
                                            id='firstname'
                                            required
                                        />
                                    </InputWithLabel>
                                </div>
                                <div>
                                    <InputWithLabel
                                        isRequired={true}
                                        labelFor={"name"}
                                        labelTitle={__("your_name")}
                                    >
                                        <InputField
                                            type='text'
                                            labelFor='name'
                                            name='name'
                                            id='name'
                                            required
                                        />
                                    </InputWithLabel>
                                </div>
                                <div>
                                    <InputWithLabel
                                        isRequired={true}
                                        labelFor={"title"}
                                        labelTitle={__("title_or_company")}
                                    >
                                        <InputField
                                            type='text'
                                            labelFor='title'
                                            name='title'
                                            id='title'
                                            required
                                        />
                                    </InputWithLabel>
                                </div>
                            </div>

                            {gadgetItem.code == "CRD-002" && (
                                <div className='mb-8'>
                                    <h5
                                        className='md:pt-6 py-3 font-semibold md:text-lg text-md'
                                        id='customizeSection'
                                    >
                                        {__("customized_logo")}
                                    </h5>

                                    <p className='text-gray-300 pb-3'>
                                        {__("visible_on_white")}
                                    </p>

                                    <div className='rounded-lg bg-white p-4'>
                                        <FileInput
                                            className='hidden text-gray-300'
                                            accept='.jpg,.jpeg,.png'
                                            theme={customFileInputTheme}
                                            hidden
                                            ref={fileInputRef}
                                            color={"gray"}
                                            id='file-upload-helper-text'
                                            helperText='PNG or JPG'
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) => {
                                                // setFile(
                                                //     e.target.files![0],
                                                // );
                                                formProps.setFieldValue(
                                                    "file",
                                                    e.target.files![0],
                                                );
                                                formProps.setFieldValue(
                                                    "withCustomLogo",
                                                    true,
                                                );
                                                // if (file) {
                                                //     formProps.setFieldValue(
                                                //         "img",
                                                //         file,
                                                //     );
                                                // }
                                            }}
                                        />

                                        <div
                                            className='mt-3 bg-white border-2 border-dashed flex flex-col items-center py-4 cursor-pointer text-gray-500'
                                            onClick={handleAddCustomLogo}
                                        >
                                            <TbFileUpload className='text-xl' />
                                            <p className='pt-2'>
                                                {__A("choose_file")}
                                            </p>
                                        </div>

                                        {formProps.values.file && (
                                            <div className='mt-6'>
                                                {/* File Uploading Progress Form */}
                                                <div className='flex flex-col'>
                                                    {/* <div className='flex justify-end py-2'>
                                                        <Badge
                                                            size='sm'
                                                            className='w-max px-4'
                                                            color='gray'
                                                            href='#'
                                                        >
                                                            +$35
                                                        </Badge>
                                                    </div> */}
                                                    {/* Uploading File Content */}
                                                    <div className='mb-2 flex justify-between items-center'>
                                                        <div className='flex items-center gap-x-3'>
                                                            <span className='size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500'>
                                                                <TbFileImport />
                                                            </span>
                                                            <div>
                                                                <p className='text-sm font-medium text-gray-800 dark:text-white'>
                                                                    {
                                                                        formProps
                                                                            .values
                                                                            .file
                                                                            .name
                                                                    }
                                                                </p>
                                                                <p className='text-xs text-gray-500 dark:text-neutral-500'>
                                                                    {(
                                                                        formProps
                                                                            .values
                                                                            .file
                                                                            .size /
                                                                        (1024 *
                                                                            1000)
                                                                    ).toFixed(
                                                                        2,
                                                                    )}
                                                                    MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='inline-flex items-center gap-x-2'>
                                                            <span
                                                                onClick={(
                                                                    e,
                                                                ) => {
                                                                    e.preventDefault();
                                                                    formProps.setFieldValue(
                                                                        "file",
                                                                        null,
                                                                    );
                                                                    formProps.setFieldValue(
                                                                        "withCustomLogo",
                                                                        false,
                                                                    );
                                                                }}
                                                                className='relative text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-neutral-200 dark:focus:text-neutral-200'
                                                            >
                                                                <svg
                                                                    className='shrink-0 size-4'
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width={24}
                                                                    height={24}
                                                                    viewBox='0 0 24 24'
                                                                    fill='none'
                                                                    stroke='currentColor'
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    strokeLinecap='round'
                                                                    strokeLinejoin='round'
                                                                >
                                                                    <path d='M3 6h18' />
                                                                    <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                                                                    <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                                                                    <line
                                                                        x1={10}
                                                                        x2={10}
                                                                        y1={11}
                                                                        y2={17}
                                                                    />
                                                                    <line
                                                                        x1={14}
                                                                        x2={14}
                                                                        y1={11}
                                                                        y2={17}
                                                                    />
                                                                </svg>
                                                                <span className='sr-only'>
                                                                    Delete
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {/* End Uploading File Content */}
                                                    {/* Progress Bar */}

                                                    {/* <div className="flex items-center gap-x-3 whitespace-nowrap">
                 <div
                     className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                     role="progressbar"
                     aria-valuenow={1}
                     aria-valuemin={0}
                     aria-valuemax={100}
                 >
                     <div
                         className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-500"
                         style={{ width: "1%" }}
                     />
                 </div>
                 <div className="w-6 text-end">
                     <span className="text-sm text-gray-800 dark:text-white">0%</span>
                 </div>
             </div> */}

                                                    {/* End Progress Bar */}
                                                </div>
                                                {/* End File Uploading Progress Form */}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='data w-full lg:pr-8 pr-8 xl:justify-start justify-center flex items-center xl:my-2 lg:my-5 my-0 bg-white rounded-lg ps-6 pe-6 lg:pt-6 pt-6 border border-gray-300/25 h-min'>
                            <div className='data w-full max-w-xl'>
                                <h2 className='font-manrope font-bold md:text-3xl text-2xl leading-10 text-gray-900 mb-2 capitalize'>
                                    {"Konect " + gadgetItem?.name}
                                </h2>
                                <div className='flex flex-col sm:flex-row sm:items-center mb-6'>
                                    <h6 className='font-manrope font-semibold text-2xl leading-9 text-gray-900 pr-5 sm:border-r border-gray-200 mr-5'>
                                        $
                                        {formProps.values.withCustomLogo
                                            ? gadgetItem?.price + 0
                                            : gadgetItem?.price}
                                    </h6>
                                    <div className='flex items-center gap-2'>
                                        <div className='flex items-center gap-1'>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 20 20'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clipPath='url(#clip0_12029_1640)'>
                                                    <path
                                                        d='M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z'
                                                        fill='#FBBF24'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_12029_1640'>
                                                        <rect
                                                            width='20'
                                                            height='20'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 20 20'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clipPath='url(#clip0_12029_1640)'>
                                                    <path
                                                        d='M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z'
                                                        fill='#FBBF24'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_12029_1640'>
                                                        <rect
                                                            width='20'
                                                            height='20'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 20 20'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clipPath='url(#clip0_12029_1640)'>
                                                    <path
                                                        d='M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z'
                                                        fill='#FBBF24'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_12029_1640'>
                                                        <rect
                                                            width='20'
                                                            height='20'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 20 20'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clipPath='url(#clip0_12029_1640)'>
                                                    <path
                                                        d='M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z'
                                                        fill='#FBBF24'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_12029_1640'>
                                                        <rect
                                                            width='20'
                                                            height='20'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <svg
                                                width='20'
                                                height='20'
                                                viewBox='0 0 20 20'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                            >
                                                <g clipPath='url(#clip0_8480_66029)'>
                                                    <path
                                                        d='M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z'
                                                        fill='#F3F4F6'
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id='clip0_8480_66029'>
                                                        <rect
                                                            width='20'
                                                            height='20'
                                                            fill='white'
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <span className='pl-2 font-normal leading-7 text-gray-500 text-sm '>
                                            124 review
                                        </span>
                                    </div>
                                </div>
                                <p className='text-gray-500 text-base font-normal mb-5'>
                                    {T!(gadgetItem?.description)}
                                </p>
                                <ul className='grid gap-y-4'>
                                    <li className='flex items-center gap-3'>
                                        <TbCheck className='bg-yellow-800 rounded-full p-1 text-xl' />
                                        <span className='font-normal text-base text-gray-900 '>
                                            {ucfirst(gadgetItem?.material!)}
                                        </span>
                                    </li>
                                    <li className='flex items-center space-x-2 text-gray-400'>
                                        <TbTruckDelivery className='sm:text-2xl text-3xl w-max' />
                                        <span>{__("delivery_time")}</span>
                                    </li>
                                </ul>

                                <div className='flex flex-wrap justify-center sm:justify-start space-x-3 space-y-4 py-8'>
                                    <div className='flex items-center space-3'>
                                        <div className='flex space-x-2 items-center justify-center w-full'>
                                            <span>{__("quantity")} :</span>
                                            <span
                                                className='group py-2 px-2 border border-gray-300/45 rounded-l-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 cursor-pointer flex justify-center items-center'
                                                onClick={() => {
                                                    if (
                                                        formProps.values
                                                            .quantity > 1
                                                    ) {
                                                        formProps.setFieldValue(
                                                            "quantity",
                                                            formProps.values
                                                                .quantity - 1,
                                                        );
                                                    }
                                                }}
                                            >
                                                <TbMinus />
                                            </span>
                                            <span className='flex justify-center items-center font-semibold text-gray-900 text-lg py-[13px] px-8 sm:max-w-[118px] outline-0 border rounded-lg border-gray-300/50 bg-transparent placeholder:text-gray-900 text-center'>
                                                {formProps.values.quantity}
                                            </span>

                                            <span
                                                className='group py-2 px-2 border border-gray-300/45 rounded-r-lg bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300 cursor-pointer flex justify-center items-center'
                                                onClick={() => {
                                                    var newQty =
                                                        formProps.values
                                                            .quantity + 1;

                                                    formProps.setFieldValue(
                                                        "quantity",
                                                        newQty,
                                                    );
                                                }}
                                            >
                                                <TbPlus />
                                            </span>
                                        </div>
                                    </div>

                                    <ErrorsViewer errors={errors} />

                                    <Button
                                        type='submit'
                                        // onClick={() => formProps.submitForm()}
                                        theme={customButtonTheme}
                                        size='md'
                                        color='dark'
                                        className='grow flex justify-center space-x-2'
                                    >
                                        <TbShoppingCart className='text-lg' />
                                        <span className='ml-1 font-bold'>
                                            {"Buy"}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </section>
        </ContainerLayout>
    );
}
