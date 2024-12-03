"use client";
import NoResultFound from "@/app/_components/Common/NoResultFound";
import ImageSkeleton from "@/app/_components/Common/Skeleton/ImageSkeleton";
import TextSkeleton from "@/app/_components/Common/Skeleton/TextSkeleton";
import { ROOT_FILES_PROD } from "@/app/_core/config/constants";
import { productItemRoute } from "@/app/_core/config/routes";
import { KoGadgetItem } from "@/app/_core/models/KoGadgetItem";
import { ucfirst } from "@/app/_core/utils/functions";
import { customBadgeTheme } from "@/app/_styles/flowbite/badge";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { customDropdownTheme } from "@/app/_styles/flowbite/dropdown";
import { Badge, Button, Dropdown } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbFilterFilled, TbShoppingBag } from "react-icons/tb";

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
                "",
                JSON.parse(gadget.kg_details).name,
                gadget.kg_code,
                JSON.parse(gadget.kg_details).description,
                JSON.parse(gadget.kg_details).price,
                JSON.parse(gadget.kg_details).weightDimensions,
                JSON.parse(gadget.kg_details).color,
                JSON.parse(gadget.kg_details).material,
                JSON.parse(gadget.kg_details).type,
                JSON.parse(gadget.kg_details).imageURL,
                null,
                JSON.parse(gadget.kg_details).oldPrice,
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
                                // console.log(
                                //     (
                                //         ROOT_FILES_URL + gadget.imageURL[0]
                                //     ).toString(),
                                // );

                                return (
                                    <Link
                                        href={
                                            productItemRoute.path +
                                            "/" +
                                            gadget.code
                                        }
                                        key={index}
                                        className='mx-auto sm:mr-0 group cursor-pointer lg:mx-auto transition-all duration-500 rounded-xl border border-gray-200 overflow-hidden'
                                    >
                                        <div className='rounded-b-lg overflow-hidden'>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={
                                                    ROOT_FILES_PROD +
                                                    gadget.imageURL[2]
                                                }
                                                alt='Carte NFC QR pour échanges de contacts | Digital NFC business card by Konect for modern networking'
                                                className=''
                                            />
                                        </div>
                                        <div className='py-4 px-3'>
                                            <div className='flex flex-col items-start justify-between'>
                                                <h6 className='font-normal text-lg leading-8 text-black transition-all duration-500 group-hover:text-gray-800'>
                                                    {ucfirst(
                                                        gadget.name.toLocaleLowerCase(),
                                                    )}
                                                </h6>
                                                <div className='flex space-x-2 items-center'>
                                                    <h6 className='font-normal leading-8 text-gray-700'>
                                                        {gadget.price}$
                                                    </h6>
                                                    {gadget.oldPrice !=
                                                        null && (
                                                        <h6 className='font-normal line-through leading-8 text-gray-300/65'>
                                                            {gadget.oldPrice}$
                                                        </h6>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
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
