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
import ProductsListBlock from "@/app/_components/Inc/ProductsListBlock";

export interface KwidgetListProps {}

export default async function KwidgetListPage(props: KwidgetListProps) {
    const gadgetFilters: Array<string> = ["all", "card", "ring", "watch"];
    var isLoading = true;
    let res = null;
    try {
        let rq = await GadgetService.getAll();
        res = await rq.json();

        isLoading = false;
    } catch (e) {
        console.log(e);
    } finally {
    }
    return (
        <div className='min-h-screen'>
            <Header />
            <main>
                <section className='py-6 h-max'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                        {/* <span className="group h-72 relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl hover:shadow-lg transition bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3000&q=80')]">
                            <div className="flex-auto p-4 md:p-6">
                                <h3 className="text-xl text-white/90 group-hover:text-white">
                                    <span className="font-bold">Preline</span>{" "}
                                    Press publishes books about economic and
                                    technological advancement.
                                </h3>
                            </div>
                            <div className="pt-0 p-4 md:p-6">
                                <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/70">
                                    Visit the site
                                    <svg
                                        className="flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                            </div>
                        </span> */}

                        <Breadcrumb
                            aria-label='Default breadcrumb example'
                            theme={customBreadCrumbTheme?.root}
                            className='py-6'
                        >
                            <Breadcrumb.Item
                                theme={customBreadCrumbTheme?.item}
                                href='#'
                                icon={TbHomeFilled}
                            >
                                Home
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                theme={customBreadCrumbTheme?.item}
                            >
                                {productsRoute.name}
                            </Breadcrumb.Item>
                        </Breadcrumb>

                        <ProductsListBlock
                            isLoading={isLoading}
                            data={res.data}
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
