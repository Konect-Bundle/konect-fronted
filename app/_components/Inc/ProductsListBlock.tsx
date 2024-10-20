"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/_components/Common/Headers/Header";
import ContainerLayout from "@/app/_components/Layouts/Container";
import {
    Breadcrumb,
    Badge,
    Button,
    Dropdown,
    DropdownItem,
} from "flowbite-react";
import { productsRoute, productItemRoute } from "@/app/_core/config/routes";
import Image from "next/image";
import Link from "next/link";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import {
    TbFilter,
    TbFilterDown,
    TbFilterFilled,
    TbHome,
    TbHome2,
    TbHomeFilled,
    TbShoppingBag,
} from "react-icons/tb";
import { GadgetService } from "@/app/_core/api/services/GadgetService";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { ucfirst } from "@/app/_core/utils/functions";
import { customBreadCrumbTheme } from "@/app/_styles/flowbite/breadcrumb";
import { customBadgeTheme } from "@/app/_styles/flowbite/badge";
import { KoGadgetItem } from "@/app/_core/models/KoGadgetItem";
import Footer from "@/app/_components/Common/Footers/Footer";
import { customDropdownTheme } from "@/app/_styles/flowbite/dropdown";
import ImageSkeleton from "@/app/_components/Common/Skeleton/ImageSkeleton";
import TextSkeleton from "@/app/_components/Common/Skeleton/TextSkeleton";
import NoResultFound from "@/app/_components/Common/NoResultFound";
import useSWR from "swr";

export interface ProductsListBlockProps {
    data: any;
    isLoading: boolean;
}

export default function ProductsListBlock({
    data,
    isLoading,
}: ProductsListBlockProps) {
    const [filter, setFilter] = useState<string>("all");
    const gadgetFilters: Array<string> = ["all", "card", "ring", "watch"];
    const [gadgets, setGadgets] = useState<KoGadgetItem[]>([]);
    useEffect(() => {
        let ga: KoGadgetItem[] = [];
        data.map((gadget: any) => {
            var g = new KoGadgetItem(
                JSON.parse(gadget.kg_details).name,
                gadget.kg_code,
                JSON.parse(gadget.kg_details).description,
                JSON.parse(gadget.kg_details).price,
                JSON.parse(gadget.kg_details).weightDimensions,
                JSON.parse(gadget.kg_details).color,
                JSON.parse(gadget.kg_details).material,
                JSON.parse(gadget.kg_details).type,
                JSON.parse(gadget.kg_details).imageURL,
            );
            ga.push(g);
        });
        setGadgets(ga);
    }, [data]);
    return (
        <div className=''>
            <div className='flex space-x-3 items-center pb-6'>
                <div className='w-max space-x-1'>
                    <Badge
                        size='sm'
                        icon={TbFilterFilled}
                        href='#'
                        className='px-3 py-2'
                        color='dark'
                        theme={customBadgeTheme}
                    >
                        <span>Filter</span>
                    </Badge>
                </div>
                <Dropdown
                    label={ucfirst(filter)}
                    theme={customDropdownTheme}
                    inline
                >
                    {gadgetFilters.map((gadgetFilter, index) => (
                        <Dropdown.Item
                            onClick={() => {
                                setFilter(gadgetFilter);
                            }}
                            key={index}
                        >
                            {ucfirst(gadgetFilter)}
                        </Dropdown.Item>
                    ))}
                </Dropdown>
            </div>
            <div className=''>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {!isLoading ? (
                        gadgets != null && gadgets.length == 0 ? (
                            <div className='sm:col-span-2 lg:col-span-3'>
                                <NoResultFound />
                            </div>
                        ) : (
                            gadgets?.map((gadget, index) => {
                                console.log(
                                    (
                                        ROOT_FILES_URL + gadget.imageURL[0]
                                    ).toString(),
                                );

                                return (
                                    <span
                                        key={index}
                                        className='mx-auto sm:mr-0 group cursor-pointer lg:mx-auto transition-all duration-500 rounded-xl p-3'
                                    >
                                        <div className='bg-white border rounded-3xl overflow-hidden border-noir-medium/25'>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={
                                                    ROOT_FILES_URL +
                                                    gadget.imageURL[0]
                                                }
                                                alt='face cream image'
                                                className=''
                                            />
                                        </div>
                                        <div className='mt-5'>
                                            <div className='flex items-center justify-between'>
                                                <h6 className='font-semibold text-md leading-8 text-black transition-all duration-500 group-hover:text-gray-800'>
                                                    {ucfirst(
                                                        gadget.color.name,
                                                    ) +
                                                        " " +
                                                        gadget.name}
                                                </h6>
                                                <div className='flex space-x-2 items-center'>
                                                    <h6 className='font-semibold text-md leading-8 text-gray-700'>
                                                        ${gadget.price}
                                                    </h6>
                                                    <div className='flex justify-end'>
                                                        <Link
                                                            href={
                                                                productItemRoute.path +
                                                                "/" +
                                                                gadget.code
                                                            }
                                                        >
                                                            <Button
                                                                size={"xs"}
                                                                color='dark'
                                                                className='px-5 py-3'
                                                                theme={
                                                                    customButtonTheme
                                                                }
                                                            >
                                                                <span className='flex items-center space-x-1'>
                                                                    <TbShoppingBag className='text-lg' />
                                                                    <span>
                                                                        {"Get"}
                                                                    </span>
                                                                </span>
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                );
                            })
                        )
                    ) : (
                        <>
                            <div className='flex flex-col'>
                                <ImageSkeleton className='w-full h-52 rounded-xl mb-4' />
                                <span className='flex space-x-2 items-center justify-between px-4'>
                                    <TextSkeleton
                                        className='w-1/3'
                                        height={4}
                                    />
                                    <TextSkeleton
                                        className='w-24'
                                        height={12}
                                    />
                                </span>
                            </div>
                            <div className='flex flex-col'>
                                <ImageSkeleton className='w-full h-52 rounded-xl mb-4' />
                                <span className='flex space-x-2 items-center justify-between px-4'>
                                    <TextSkeleton
                                        className='w-1/3'
                                        height={4}
                                    />
                                    <TextSkeleton
                                        className='w-24'
                                        height={12}
                                    />
                                </span>
                            </div>
                        </>
                    )}
                </div>

                {/*<p className="mt-2 font-normal text-sm leading-6 text-gray-500">{ json_decode($gadget->kg_details)->price }</p>*/}
            </div>
        </div>
    );
}
