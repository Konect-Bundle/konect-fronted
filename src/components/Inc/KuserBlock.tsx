"use client";
import TextSkeleton from "@/components/Common/Skeleton/TextSkeleton";
import KuserFeedback from "@/components/Inc/KuserFeedback";
import { KonectService } from "@/core/api/services/KonectService";
import { UserService } from "@/core/api/services/UserService";
import { ROOT_ASSETS_URL, ROOT_FILES_URL } from "@/core/config/constants";
import { User } from "@/core/models/User";
import UserVcard from "@/core/models/vcard/UserVcard";
import VcardConfig from "@/core/models/vcard/VcardConfig";
import {
    KPreviewThemeMode,
    KPreviewZoom,
    LoarderStyle,
} from "@/core/utils/enums";
import {
    convertYouTubeLinkToEmbed,
    esser,
    generateColorVariants,
    stringToEnum,
    ucfirst,
} from "@/core/utils/functions";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customTabsTheme } from "@/styles/flowbite/tabs";
import { Button, Card, Tabs } from "flowbite-react";
import { motion } from "framer-motion";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaAndroid, FaApple } from "react-icons/fa6";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import {
    TbCircleX,
    TbDownload,
    TbMail,
    TbMapPin,
    TbPhone,
    TbShare2,
} from "react-icons/tb";
import CardBlock from "../Common/CardBlock";
import DesactivatedCard from "../Common/DesactivatedCard";
import KuserHeader from "../Common/Headers/KuserHeader";
import LinkPreviewBlock from "../Common/LinkPreview";
import LoadingLayout from "../Layouts/LoadingLayout";

interface KuserBlockProps {
    kuser: any;
    isLoading: boolean;
}

export default function KuserBlock({
    kuser,
    isLoading = false,
}: KuserBlockProps) {
    const aRef = useRef<HTMLAnchorElement>(null);
    const [isCompleted, setIsCompleted] = useState<boolean>(false);
    const [showHowTo, setShowHowTo] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const user: User = UserService.buildObjectParser(kuser);
    const vinfo: UserVcard = user && new UserVcard(user.vinfo);
    const vconfig: VcardConfig = user && new VcardConfig(user.vconfig);
    const __ = useTranslations("Text");
    const __a = useTranslations("Actions");
    const [konectsCount, setKonectCount] = useState<number>(
        user.konects_count ?? user.konects!.length,
    );
    const kpZoom =
        stringToEnum(KPreviewZoom, vconfig.configTheme.kpZoom) ??
        KPreviewZoom.NORMAL;
    const kpTheme =
        stringToEnum(KPreviewThemeMode, vconfig.configTheme.themeMode) ??
        KPreviewThemeMode.LIGHT;

    const [offsetY, setOffsetY] = useState(0);
    const [scrollPercent, setScrollPercent] = useState(0);

    const { base, text } = generateColorVariants(
        vconfig.configTheme.primaryColor,
    );

    const handleScroll = () => {
        const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPosition = window.scrollY;
        const percentScrolled = (scrollPosition / totalHeight) * 100;

        setScrollPercent(percentScrolled);
        setOffsetY(scrollPosition);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleShareContact = (e: any) => {
        e.preventDefault();
        if (navigator.share) {
            navigator
                .share({
                    url: window.location.href,
                })
                .then(() => console.log("Successful share"))
                .catch((error) => console.log("Error sharing:", error));
        } else {
            console.log("Can not share");
        }
    };

    const handleSaveContact = (e: any) => {
        setShowHowTo(false);
        setLoading(true);
        e.preventDefault();
        if (kuser) {
            KonectService.makeConnect(user.uuid!, 1)
                .then((rs) => {
                    if (rs.state) {
                        setKonectCount(konectsCount + 1);
                        const int = setInterval(() => {
                            clearInterval(int);
                        }, 2000);
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => setLoading(false));

            window.location.href = aRef.current?.href!;
            setTimeout(() => {
                setIsCompleted(true);
            }, 2000);
        }
        // aRef.current?.click();
        // setIsSaved(true)
    };

    return vconfig.isCardActivated ? (
        <div
            className='h-screen'
            style={{
                backgroundColor: vconfig.configTheme.primaryColor,
            }}
        >
            <LoadingLayout
                isLoading={loading}
                loaderStyle={LoarderStyle.TAILSPIN}
            >
                {isCompleted && _buildKuserFeedback()}

                <div>
                    <KuserHeader />
                    {scrollPercent > 5 && _buildStickyHeader()}
                    {_buildImageCard()}
                    {_builBottomContent()}

                    {showHowTo && __buildTuto()}
                </div>
            </LoadingLayout>
        </div>
    ) : (
        <DesactivatedCard />
    );

    function __buildTuto() {
        return (
            <motion.div
                className='box z-[100] relative top-0 left-0'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.4,
                    delay: 0.1,
                    ease: [0, 0.71, 0.2, 1.0],
                }}
            >
                <div className='fixed bottom-0 left-0 w-screen h-screen bg-black-light/25 z-50 flex items-end'>
                    <div className='h-[70%] rounded-t-2xl shadow-md bg-white w-full px-4 py-4 flex flex-col justify-between'>
                        <div className='overflow-auto py-4'>
                            <div className='flex justify-between'>
                                <h3 className='text-3xl font-bold'>
                                    <span>{__("how_to_save")}</span>
                                    <br />
                                    <span className='text-yellow-900'>
                                        {__("your_new_contact")}
                                    </span>
                                </h3>

                                <TbCircleX
                                    className='text-2xl text-gray-600'
                                    onClick={() => setShowHowTo(false)}
                                />
                            </div>

                            <div className='mt-4'>
                                <Tabs
                                    aria-label='Default tabs'
                                    variant='default'
                                    theme={{
                                        ...customTabsTheme,
                                        tablist: {
                                            variant: {
                                                default: "border-0",
                                            },
                                            tabitem: {
                                                variant: {
                                                    default: {
                                                        active: {
                                                            on: "bg-gray-50 text-black-bold ring-opacity-0 dark:bg-gray-800 dark:text-yellow-500",
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    }}
                                >
                                    <Tabs.Item
                                        className=''
                                        active
                                        title='IPhone'
                                        icon={FaApple}
                                    >
                                        <h4 className='text-xl font-bold mb-2 -mt-2'>
                                            <span> {__("scroll_down")}</span>
                                            <br />
                                        </h4>
                                        <span className='py-3 text-gray-500'>
                                            {__("ios_scroll_desc")}{" "}
                                            <span className='font-bold'>
                                                {__("create_new_contact")}.
                                            </span>
                                        </span>
                                        <div className='mt-2'>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={`${ROOT_ASSETS_URL}/images/tuto/scroll-save-ios.png`}
                                                className='mt-3 border-gray-100 rounded-[1rem]'
                                                alt='scroll-ios-save'
                                                priority={true}
                                            />
                                        </div>
                                    </Tabs.Item>
                                    <Tabs.Item
                                        className=''
                                        active
                                        title='Android'
                                        icon={FaAndroid}
                                    >
                                        <div className='mb-6'>
                                            <h4 className='text-xl font-bold mb-2 -mt-2'>
                                                <span>{__("step")} 1</span>
                                                <br />
                                            </h4>
                                            <span className='py-3 text-gray-500'>
                                                {__("android_01_des")}{" "}
                                                <span className='font-bold'>
                                                    {__("open")}.{" "}
                                                </span>
                                            </span>
                                            <div className='mt-2'>
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={`${ROOT_ASSETS_URL}/images/tuto/download-file-android.png`}
                                                    className='mt-3 border-gray-100 rounded-[1rem]'
                                                    alt='scroll-ios-save'
                                                    priority={true}
                                                />
                                            </div>
                                        </div>

                                        <div className='mb-6'>
                                            <h4 className='text-xl font-bold mb-2 -mt-2'>
                                                <span>{__("step")} 2</span>
                                                <br />
                                            </h4>
                                            <span className='py-3 text-gray-500'>
                                                {__("android_02_des")}{" "}
                                                <span className='font-bold'>
                                                    {__("allow")}.
                                                </span>
                                            </span>
                                            <div className='mt-2'>
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={`${ROOT_ASSETS_URL}/images/tuto/allow-contact-android`}
                                                    className='mt-3 border-gray-100 rounded-[1rem]'
                                                    alt='scroll-ios-save'
                                                    priority={true}
                                                />
                                            </div>
                                        </div>

                                        <div className='mb-6'>
                                            <h4 className='text-xl font-bold mb-2 -mt-2'>
                                                <span>{__("step")} 3</span>
                                                <br />
                                            </h4>
                                            <span className='py-3 text-gray-500'>
                                                {__("android_03_des")}{" "}
                                                <span className='font-bold'>
                                                    {__("import")}.{" "}
                                                </span>
                                            </span>
                                            <div className='mt-2'>
                                                <Image
                                                    width={500}
                                                    height={500}
                                                    src={`${ROOT_ASSETS_URL}/images/tuto/import-contact-android`}
                                                    className='mt-3 border-gray-100 rounded-[1rem]'
                                                    alt='scroll-ios-save'
                                                    priority={true}
                                                />
                                            </div>
                                        </div>
                                    </Tabs.Item>
                                </Tabs>
                            </div>
                        </div>

                        <Button
                            color='dark'
                            theme={customButtonTheme}
                            size={"mdm"}
                            className='w-full py-2'
                            onClick={handleSaveContact}
                        >
                            {__("yes_got_it")}
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }

    function _buildStickyHeader() {
        return (
            <header
                className='transition-opacity duration-1000 sticky top-0 w-full flex -space-y-1 justify-between items-center  bg-white shadow-md py-3 px-6 z-40'
                style={{
                    minHeight: `${scrollPercent > 25 ? 100 : 0}px`,
                    opacity: scrollPercent > 25 ? 1 : 0,
                    borderBottom: `5px solid ${vconfig.configTheme.primaryColor}`,
                }}
            >
                <span className='flex flex-col -space-y-1 justify-center'>
                    <h3
                        className={`flex ${kpZoom == KPreviewZoom.NORMAL ? "text-xl" : "text-2xl"} font-semibold text leading-tight space-x-2 mb-2`}
                    >
                        <span className='truncate'>
                            {ucfirst(vinfo.names.givenName)}
                        </span>
                        <span className='truncate'>
                            {ucfirst(vinfo.names.familyName)}
                        </span>
                    </h3>
                    <span className='flex justify-between items-center'>
                        <span className='flex flex-col space-y-2'>
                            {/* <p className="line-clamp-2">
                            {ucfirst(vinfo.note.text)}
                        </p> */}
                            <span className='text-sm text-gray-400'>
                                {vinfo.location.state?.toLocaleUpperCase() +
                                    ", " +
                                    vinfo.location.iso_code?.toLocaleUpperCase()}
                            </span>
                        </span>
                    </span>
                </span>

                <Button
                    color='dark'
                    theme={customButtonTheme}
                    size={"mds"}
                    onClick={() => setShowHowTo(true)}
                    style={{
                        background: base,
                        color: text,
                    }}
                    className='h-min'
                >
                    <TbDownload className='mr-3 h-4 w-4' />
                    Save
                </Button>
            </header>
        );
    }

    function _builBottomContent() {
        return (
            <div
                className='px-4 bg-white flex flex-col space-y-5'
                style={{
                    borderTop: `5px solid ${vconfig.configTheme.primaryColor}`,
                }}
            >
                <span className='relative py-12'>
                    <Card
                        theme={{
                            root: {
                                children:
                                    "flex flex-col  space-y-6 justify-center p-6",
                            },
                        }}
                        className='w-full flex py-2 absolute -top-24'
                    >
                        <span className='flex h-full items-center space-x-4 truncate'>
                            <span
                                className='min-w-28 h-28 bg-cover rounded-lg bg-center'
                                style={{
                                    backgroundImage: `url('${
                                        ROOT_FILES_URL +
                                        "/" +
                                        user.profile_photo_url!
                                    }')`,
                                }}
                            ></span>
                            <span className='p-2 text-black-bold flex-col space-y-3'>
                                <h3
                                    className={`flex text-2xl font-bold leading-tight ${vinfo.names.familyName.length > 8 || vinfo.names.givenName.length > 8 ? "flex-col" : "space-x-3"}`}
                                >
                                    <span className='truncate'>
                                        {ucfirst(vinfo.names.givenName)}
                                    </span>
                                    <span className='truncate'>
                                        {ucfirst(vinfo.names.familyName)}
                                    </span>
                                </h3>
                                {vconfig.showKonects && (
                                    <div>
                                        <span className='my-1 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex items-center bg-gray-50 border w-max'>
                                            <span className='px-1 text-white'>
                                                <MdOutlineConnectWithoutContact className='w-4 h-4 text-gray-700' />
                                            </span>
                                            {isLoading ? (
                                                <TextSkeleton
                                                    className='w-16'
                                                    bgClass='bg-gray-300/25'
                                                />
                                            ) : (
                                                <span className='text-sm text-gray-700 space-x-1 flex'>
                                                    <motion.div
                                                        initial={{
                                                            opacity: 0,
                                                            scale: 0.5,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            scale: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.2,
                                                            ease: [
                                                                0, 0.71, 0.2,
                                                                1.01,
                                                            ],
                                                            scale: {
                                                                type: "spring",
                                                                damping: 7,
                                                                stiffness: 100,
                                                                restDelta: 0.001,
                                                            },
                                                        }}
                                                    >
                                                        <span id='konect-stat'>
                                                            {konectsCount}
                                                        </span>
                                                    </motion.div>
                                                    <span>
                                                        {esser(
                                                            "konect",
                                                            konectsCount,
                                                        )}
                                                    </span>
                                                </span>
                                            )}
                                        </span>
                                    </div>
                                )}
                                <span className='flex flex-col'>
                                    <span className='text-sm text-gray-400'>
                                        {vinfo.location.state?.toLocaleUpperCase() +
                                            ", " +
                                            vinfo.location.iso_code?.toLocaleUpperCase()}
                                    </span>
                                </span>
                            </span>
                        </span>
                    </Card>
                </span>
                <Button.Group className='w-full grid grid-cols-2'>
                    <Button
                        color='dark'
                        theme={customButtonTheme}
                        size={"mdm"}
                        onClick={() => setShowHowTo(true)}
                    >
                        <TbDownload className='mr-3 h-4 w-4' />
                        {__a("save")}
                    </Button>
                    <Link
                        href={
                            kuser
                                ? ROOT_FILES_URL +
                                  "/vcards/" +
                                  user.uuid! +
                                  ".vcf"
                                : ""
                        }
                        ref={aRef}
                        className='hidden opacity-0 invisible'
                    />
                    <Button
                        color='gray'
                        theme={customButtonTheme}
                        size={"mdm"}
                        onClick={handleShareContact}
                    >
                        <TbShare2 className='mr-3 h-4 w-4' />
                        {__a("exchange")}
                    </Button>
                </Button.Group>

                <p className='line-clamp-4 text-center'>
                    {ucfirst(vinfo.note.text)}
                </p>
                {SocialMediaBloc({
                    title: __("social_networks"),
                    socialProfils: vinfo.socialProfils,
                })}
                <CardBlock title={__("contact_informations")}>
                    <div className=' w-full md:pb-0 pb-3'>
                        <ul className='flex flex-col space-y-3 py-2 px-3'>
                            {vinfo.email.text && (
                                <li className='flex space-x-3 items-center overflow-hidden py-3'>
                                    <span className='bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border'>
                                        <TbMail className='text-xl text-gray-800 hover:text-gray-800 cursor-pointer' />
                                    </span>

                                    <div className='inline-flex flex-col justify-center w-[inherit]'>
                                        <span className='font-bold text-sm text-gray-400 uppercase'>
                                            {__("email")}
                                        </span>
                                        {isLoading ? (
                                            <span>
                                                <TextSkeleton
                                                    className='w-56 mt-1'
                                                    bgClass='bg-gray-300/20'
                                                />
                                            </span>
                                        ) : (
                                            <Link
                                                href={
                                                    "mailto:" + vinfo.email.text
                                                }
                                                className='text-lg hover:underline text-gray-700 break-words'
                                            >
                                                {vinfo.email.text}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            )}
                            <li>
                                <span className='flex space-x-5 items-start overflow-hidden'>
                                    <span className='bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border'>
                                        <TbPhone className='text-xl text-gray-800 hover:text-gray-800 cursor-pointer' />
                                    </span>
                                    <span className='flex flex-col'>
                                        <span className='font-semibold text-sm text-gray-500 uppercase'>
                                            <span>{__("phone_number")}</span>
                                        </span>
                                        <ul className='flex flex-col space-y-0 px-0'>
                                            {vinfo.phones.map((phone, i) => {
                                                return (
                                                    phone.text && (
                                                        <li
                                                            key={i}
                                                            className='flex space-x-3 py-2 justify-start items-center overflow-hidden'
                                                        >
                                                            <div className='flex flex-col justify-center'>
                                                                <span className='font-normal text-md text-gray-400'>
                                                                    {ucfirst(
                                                                        phone.type,
                                                                    )}
                                                                </span>
                                                                {isLoading ? (
                                                                    <span>
                                                                        <TextSkeleton
                                                                            className='w-40 mt-1'
                                                                            bgClass='bg-gray-300/20'
                                                                        />
                                                                    </span>
                                                                ) : (
                                                                    <Link
                                                                        href={
                                                                            "tel:" +
                                                                            (parsePhoneNumberFromString(
                                                                                "+" +
                                                                                    phone.text,
                                                                            )!.formatInternational() ??
                                                                                phone.text)
                                                                        }
                                                                        className='text-lg hover:underline text-md text-gray-700'
                                                                    >
                                                                        {parsePhoneNumberFromString(
                                                                            "+" +
                                                                                phone.text,
                                                                        )!.formatInternational() ??
                                                                            phone.text}
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </li>
                                                    )
                                                );
                                            })}
                                        </ul>
                                    </span>
                                </span>
                            </li>
                            {vconfig.showLocalization && (
                                <li className='flex space-x-3 items-center overflow-hidden py-3'>
                                    <span className='bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border'>
                                        <TbMapPin className='text-xl text-gray-800 hover:text-gray-800 cursor-pointer' />
                                    </span>

                                    <div className='inline-flex flex-col justify-center w-[inherit]'>
                                        <span className='font-bold text-sm text-gray-400'>
                                            {"Location"}
                                        </span>
                                        {isLoading ? (
                                            <span>
                                                <TextSkeleton
                                                    className='w-52 mt-1'
                                                    bgClass='bg-gray-300/20'
                                                />
                                            </span>
                                        ) : (
                                            <Link
                                                href={
                                                    "https://www.google.com/maps/search/?api=1&query=" +
                                                    vinfo.location.state
                                                }
                                                target='_blank'
                                                className='text-lg hover:underline text-gray-700 break-words'
                                            >
                                                {vinfo.location.state +
                                                    ", " +
                                                    vinfo.location.iso_code}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </CardBlock>
                <div className='flex flex-col space-y-8 rounded-lg'>
                    {/* {vinfo.note.text && (
                        <CardBlock title={__("About me")}>
                            <div>
                                <h3 className='text-gray-700 font-bold text-lg mb-4 mt-4'>
                                    {"About me"}
                                </h3>
                                <p className='mt-4 text-gray-500'>
                                    {vinfo.note.text}
                                </p>
                            </div>
                        </CardBlock>
                    )} */}
                    {vinfo.urls.length > 0 && (
                        <CardBlock title={__("external_links")}>
                            <div>
                                <div className='grid gap-3 md:grid-cols-2 grid-cols-1'>
                                    {vinfo.urls.map((url, i) => (
                                        <LinkPreviewBlock key={i} url={url} />
                                    ))}
                                </div>
                            </div>
                        </CardBlock>
                    )}

                    {vinfo.urls.length > 0 && (
                        <CardBlock title={__("videos_links")}>
                            <div className='pb-28'>
                                <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                                    {vinfo.videoLinks.map((video, i) => (
                                        <div
                                            className='flex flex-col items-center space-y-3'
                                            key={i}
                                        >
                                            <iframe
                                                src={convertYouTubeLinkToEmbed(
                                                    video.uri,
                                                )}
                                                title='W3Schools Free Online Web Tutorials'
                                                className='w-full h-52'
                                                loading='lazy'
                                            ></iframe>
                                            <span className='text-gray-400 text-lg'>
                                                {video.type}
                                            </span>
                                        </div>
                                    ))}{" "}
                                </div>
                            </div>
                        </CardBlock>
                    )}
                </div>
            </div>
        );
    }

    function _buildImageCard() {
        return (
            <div className='bg-cover bg-center '>
                <div className='relative py-28 overflow-hidden flex justify-center items-end'>
                    {/* Image de fond */}
                    <div
                        className='absolute inset-0 bg-cover bg-center'
                        style={{
                            transform: `translateY(${offsetY * 0.5}px)`,
                            scale: `1.5`,
                            backgroundImage: `url('${
                                ROOT_FILES_URL + "/" + user.profile_photo_url!
                            }')`, // Remplacez par votre image
                            filter: "blur(8px)",
                        }}
                    ></div>

                    {/* Couche assombrie */}
                    <div className='absolute inset-0 bg-black-bold opacity-60'></div>
                    <div
                        className='absolute inset-0 bg-black-bold opacity-5'
                        style={{
                            backgroundColor: vconfig.configTheme.primaryColor,
                        }}
                    ></div>

                    {/* Contenu */}
                    <div className='relative z-10 flex items-center justify-center text-white mx-4'></div>
                </div>
            </div>
        );
    }

    function _buildKuserFeedback() {
        return (
            <KuserFeedback
                callback={() => {
                    setIsCompleted(false);
                }}
                kuser={user}
            />
        );
    }
}

function SocialMediaBloc({
    title,
    socialProfils,
}: {
    title: string;
    socialProfils: any;
}): React.ReactElement {
    // console.log(title, socialProfils);
    function hasValidUrl(obj: Record<string, any>): boolean {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const item = obj[key];
                if (item.uri.trim() !== "") {
                    return true; // Retourne true si au moins une URL est remplie
                }
            }
        }
        return false; // Retourne false si aucune URL n'est remplie
    }

    if (hasValidUrl(socialProfils)) {
        return (
            <CardBlock title={title}>
                <div className='flex float-start flex-wrap gap-3'>
                    {Object.keys(socialProfils).map((so: any, i) => {
                        if (socialProfils[so].uri) {
                            return (
                                <span className='' key={i}>
                                    {socialProfils[so].type == "instagram" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-16 rounded'
                                                src='https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg'
                                                alt='instagram'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                    {socialProfils[so].type == "facebook" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-16 rounded'
                                                src='https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg'
                                                alt='facebook'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                    {socialProfils[so].type == "linkedin" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-9 rounded'
                                                src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg'
                                                alt='linkedin'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                    {socialProfils[so].type == "youtube" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-8 rounded'
                                                src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
                                                alt='youtube'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                    {socialProfils[so].type == "tiktok" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-16 rounded'
                                                src='https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg'
                                                alt='tiktok'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                    {socialProfils[so].type == "twitter" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target='_blank'
                                            className='border h-20 w-20 rounded-md flex items-center justify-center'
                                        >
                                            <Image
                                                className='w-8 rounded'
                                                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553'
                                                alt='twitter'
                                                loading='lazy'
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}
                                </span>
                            );
                        }
                    })}
                </div>
            </CardBlock>
        );
    } else {
        return <span className='hidden'></span>;
    }
}
