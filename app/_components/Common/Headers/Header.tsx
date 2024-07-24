"use client";
import * as React from "react";
import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
    Dropdown,
    Avatar,
} from "flowbite-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { customNavbarTheme } from "@/app/_styles/flowbite/navbar";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import {
    AUTH_TOKEN_NAME,
    ROOT_ASSETS_URL,
    ROOT_FILES_URL,
} from "@/app/_core/config/constants";
import {
    dashboardRoute,
    homeRoute,
    howItRoute,
    loginRoute,
    productsRoute,
} from "@/app/_core/config/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCookie, deleteCookie } from "cookies-next";
import { TbArrowDown, TbChevronDown, TbDashboard, TbDotsVertical, TbLayoutDashboardFilled, TbPower } from "react-icons/tb";
import { useAppSelector, useAppDispatch } from "@/app/_store/hooks";
import { logout } from "@/app/_store/slices/authSlice";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { ucfirst, ucwords } from "@/app/_core/utils/functions";

export interface IAppProps { }

export default function Header(props: IAppProps) {
    const pathname = usePathname();
    const tAction = useTranslations("Actions");
    const tLinks = useTranslations("Links");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);

    return (
        <Navbar fluid rounded theme={customNavbarTheme}>
            <div className="flex md:flex-nowrap space-x-3 flex-nowrap justify-between mx-auto md:py-2 py-1 w-full md:items-center items-start">
                <NavbarBrand href={homeRoute.path}>
                    <div className="md:h-[100%] h-[72px] bg-gray-900 rounded-xl py-3 px-6 flex items-center justify-center">
                        <Image
                            width={500}
                            height={500}
                            src={ROOT_ASSETS_URL + "/images/logo-yellow.png"}
                            className="md:w-8 w-12"
                            alt="Flowbite React Logo"
                            priority={true}
                        />
                    </div>
                </NavbarBrand>
                <div className="bg-gray-900 w-[inherit] py-3 rounded-xl flex md:items-center items-end justify-end md:order-2 md:flex-row flex-col space-x-4 rtl:space-x-reverse md:pe-6 pe-2">
                    <div className="ml-4 flex md:order-2 md:space-x-4 space-x-3">
                        {!user ? (
                            <>
                                <Link href={productsRoute.path}>
                                    <Button
                                        theme={customButtonTheme}
                                        color="primary"
                                        size="md"
                                    >
                                        {tAction("get_card")}
                                    </Button>
                                </Link>

                                <Link href={loginRoute.path}>
                                    <Button
                                        theme={customButtonTheme}
                                        color="primary-light"
                                        size="md"
                                    >
                                        {tAction("login")}
                                    </Button>
                                </Link>
                                <NavbarToggle />
                            </>
                        ) : (
                            <div className="flex space-x-4">
                                <Dropdown
                                    arrowIcon={false}
                                    inline
                                    label={
                                        <span className="flex items-center space-x-1 rounded-full p-1 border-2 border-gray-600">
                                            <Avatar
                                                theme={customAvatarTheme}
                                                rounded
                                                img={
                                                    ROOT_FILES_URL +
                                                    "/" +
                                                    user.profile_photo_url
                                                }
                                                className="w-full"
                                                size="md"
                                            />
                                            <TbChevronDown
                                                size={28}
                                                className="text-gray-500"
                                            />
                                        </span>
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm">
                                            {ucwords(`${user.firstname} ${user.name}`)}
                                        </span>
                                        <span className="block truncate text-sm font-medium">
                                            {user.email}
                                        </span>
                                    </Dropdown.Header>
                                    <Dropdown.Item><Link href={dashboardRoute.path} />
                                        <span className="flex items-center space-x-1">
                                            <TbLayoutDashboardFilled/>
                                            <span>Dashboard</span>
                                        </span>
                                    </Dropdown.Item>
                                    {/* <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Item>Earnings</Dropdown.Item> */}
                                    <Dropdown.Divider />
                                    <Dropdown.Item
                                        onClick={() => {
                                            // dispatch(logout)
                                            deleteCookie(AUTH_TOKEN_NAME);
                                            window.location.href =
                                                homeRoute.path;
                                        }}
                                    >
                                        <span className="flex items-center space-x-1">
                                            <TbPower />
                                            <span>Sign out</span>
                                        </span>
                                    </Dropdown.Item>
                                </Dropdown>
                                <Navbar.Toggle />
                            </div>
                        )}
                    </div>

                    <NavbarCollapse className="">
                        <NavbarLink
                            className="uppercase"
                            href={howItRoute.path}
                            active={pathname == "/howit" ? true : false}
                        >
                            {tLinks("how_it_works")}
                        </NavbarLink>
                        <NavbarLink
                            className="uppercase"
                            href="/contact"
                            active={pathname == "/contact" ? true : false}
                        >
                            {tLinks("contact_us")}
                        </NavbarLink>
                    </NavbarCollapse>
                </div>
            </div>
        </Navbar>
    );
}
