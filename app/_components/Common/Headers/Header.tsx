"use client";
import { ROOT_ASSETS_URL, ROOT_FILES_URL } from "@/app/_core/config/constants";
import {
    dashboardRoute,
    homeRoute,
    howItRoute,
    konectsListRoute,
    loginRoute,
    ordersHistoryRoute,
    productsRoute,
    settingsProfilRoute,
    shareProfilRoute,
} from "@/app/_core/config/routes";
import { User } from "@/app/_core/models/User";
import { ucwords } from "@/app/_core/utils/functions";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { logout } from "@/app/_store/slices/authSlice";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { customBadgeTheme } from "@/app/_styles/flowbite/badge";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { customNavbarTheme } from "@/app/_styles/flowbite/navbar";
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { useTranslations } from "next-intl";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    TbChevronDown,
    TbDiamondFilled,
    TbHistory,
    TbLayoutDashboardFilled,
    TbPower,
    TbSettings,
    TbShare3,
    TbUsers,
} from "react-icons/tb";

export interface IAppProps {}

export default function Header(props: IAppProps) {
    const router = useRouter();

    const pathname = usePathname();
    const tAction = useTranslations("Actions");
    const tLinks = useTranslations("Links");
    const __ = useTranslations("Text");
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.currentUser);
    const isLoading = useAppSelector((state) => state.auth.isLoading);

    return (
        isLoading === false && (
            <Navbar fluid rounded theme={customNavbarTheme}>
                <div className='flex md:flex-nowrap space-x-3 flex-nowrap justify-between mx-auto md:py-2 py-1 w-full md:items-center items-start'>
                    <NavbarBrand href={homeRoute.path}>
                        <div className='md:h-[100%] h-[72px] bg-gray-900 rounded-xl py-3 px-6 flex items-center justify-center'>
                            <Image
                                width={500}
                                height={500}
                                src={
                                    ROOT_ASSETS_URL + "/images/logo-yellow.png"
                                }
                                className='md:w-8 w-12'
                                alt='Flowbite React Logo'
                                priority={true}
                            />
                        </div>
                    </NavbarBrand>

                    <div className='bg-gray-900 w-[inherit] py-3 rounded-xl flex md:items-center items-end justify-end md:order-2 md:flex-row flex-col space-x-4 rtl:space-x-reverse md:pe-6 pe-2'>
                        <div className='ml-4 flex items-center md:order-2 md:space-x-4 space-x-3'>
                            {user && (
                                <Badge
                                    icon={TbDiamondFilled}
                                    theme={customBadgeTheme}
                                    className='w-max'
                                    size={"md"}
                                    color='bordered'
                                >
                                    <span>{`${user.points} `}</span>{" "}
                                    {/* <span className="font-light text-gray-200 text-xs">
                                        {"kp"}
                                    </span> */}
                                </Badge>
                            )}
                            <Link href={productsRoute.path}>
                                <Button
                                    theme={customButtonTheme}
                                    color='primary'
                                    size='md'
                                >
                                    {tAction("get_card")}
                                </Button>
                            </Link>

                            {!user ? (
                                <>
                                    <Link href={loginRoute.path}>
                                        <Button
                                            theme={customButtonTheme}
                                            color='primary-light'
                                            size='md'
                                        >
                                            {tAction("login")}
                                        </Button>
                                    </Link>
                                    <NavbarToggle />
                                </>
                            ) : (
                                _buildAuthenticatedMenuItems(
                                    user,
                                    tLinks,
                                    __,
                                    dispatch,
                                    router,
                                )
                            )}
                        </div>

                        {!user && _buildGuestMenuItems(pathname, tLinks)}
                    </div>
                </div>
            </Navbar>
        )
    );
}

function _buildGuestMenuItems(pathname: string, tLinks: any) {
    return (
        <NavbarCollapse className=''>
            <NavbarLink
                className='uppercase'
                href={howItRoute.path}
                active={pathname == "/howit" ? true : false}
            >
                {tLinks("how_it_works")}
            </NavbarLink>
            <NavbarLink
                className='uppercase'
                href='/contact'
                active={pathname == "/contact" ? true : false}
            >
                {tLinks("contact_us")}
            </NavbarLink>
        </NavbarCollapse>
    );
}

function _buildAuthenticatedMenuItems(
    user: User,
    tLinks: any,
    __: any,
    dispatch: any,
    router: AppRouterInstance,
) {
    return (
        <div className='flex space-x-4 pe-3'>
            <Dropdown
                arrowIcon={false}
                inline
                label={
                    user.profile_photo_url ? (
                        <span className='flex items-center space-x-1 rounded-full p-1 border-2 border-gray-500'>
                            <Avatar
                                theme={customAvatarTheme}
                                rounded
                                img={
                                    ROOT_FILES_URL +
                                    "/" +
                                    user.profile_photo_url
                                }
                                className='w-full'
                                size='md'
                            />
                            <TbChevronDown
                                size={28}
                                className='text-gray-300'
                            />
                        </span>
                    ) : (
                        <Avatar
                            theme={customAvatarTheme}
                            rounded
                            className='w-full'
                            size='md'
                        />
                    )
                }
            >
                <Dropdown.Header>
                    <span className='block text-sm'>
                        {ucwords(`${user.firstname} ${user.name}`)}
                    </span>
                    <span className='block truncate text-sm font-medium'>
                        {user.email}
                    </span>
                </Dropdown.Header>
                <Dropdown.Item>
                    <Link href={dashboardRoute.path} className='w-full block'>
                        <span className='flex items-center space-x-1'>
                            <TbLayoutDashboardFilled />
                            <span>{tLinks("dashboard")}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item>
                    <Link href={vcardRoute.path} className='w-full block'>
                        <span className='flex items-center space-x-1'>
                            <TbId />
                            <span>{__("my_contact_sheet")}</span>
                        </span>
                    </Link>
                </Dropdown.Item> */}
                <Dropdown.Item>
                    <Link href={konectsListRoute.path} className='w-full block'>
                        <span className='flex items-center space-x-1'>
                            <TbUsers />
                            <span>{__("my_connections")}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
                {/* <Dropdown.Item>
            <Link
                href={companiesRoute.path}
                className='w-full block'
            >
                <span className='flex items-center space-x-1'>
                    <TbBuildingCommunity />
                    <span>
                        {__("companies")}
                    </span>
                </span>
            </Link>
        </Dropdown.Item> */}
                {/* <Dropdown.Item>Settings</Dropdown.Item>
    <Dropdown.Item>Earnings</Dropdown.Item> */}
                <Dropdown.Divider />
                <Dropdown.Item>
                    <Link
                        href={ordersHistoryRoute.path}
                        className='w-full block'
                    >
                        <span className='flex items-center space-x-1'>
                            <TbHistory />
                            <span>{__("order_history")}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                    <Link href={shareProfilRoute.path} className='w-full block'>
                        <span className='flex items-center space-x-1'>
                            <TbShare3 />
                            <span>{__("share_profil")}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item>
                    <Link
                        href={settingsProfilRoute.path}
                        className='w-full block'
                    >
                        <span className='flex items-center space-x-1'>
                            <TbSettings />
                            <span>{__("profil_settings")}</span>
                        </span>
                    </Link>
                </Dropdown.Item>

                <Dropdown.Item
                    onClick={() => {
                        dispatch(logout());
                        router.replace(homeRoute.path);
                    }}
                >
                    <span className='flex items-center space-x-1'>
                        <TbPower />
                        <span>{tLinks("logout")}</span>
                    </span>
                </Dropdown.Item>
            </Dropdown>
            {/* <Navbar.Toggle /> */}
        </div>
    );
}
