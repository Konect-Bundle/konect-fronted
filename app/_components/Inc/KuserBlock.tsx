"use client";
import KuserHeader from "@/app/_components/Common/Headers/KuserHeader";
import {
    convertYouTubeLinkToEmbed,
    esser,
    ucfirst,
} from "@/app/_core/utils/functions";
import Image from "next/image";
import Link from "next/link";
import {
    TbDownload,
    TbExternalLink,
    TbLocationPin,
    TbMail,
    TbMapPin,
    TbPhone,
    TbShare2,
    TbShare3,
} from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ImageSkeleton from "@/app/_components/Common/Skeleton/ImageSkeleton";
import TextSkeleton from "@/app/_components/Common/Skeleton/TextSkeleton";
import VideoSkeleton from "@/app/_components/Common/Skeleton/VideoSkeleton";
import ExternalLinkSkeleton from "@/app/_components/Common/Skeleton/ExternalLinkSkeleton";
import { Avatar, Button, Card } from "flowbite-react";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { HiSave } from "react-icons/hi";
import KuserFeedback from "@/app/_components/Inc/KuserFeedback";
import { KonectService } from "@/app/_core/api/services/KonectService";
import { motion } from "framer-motion";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { User } from "@/app/_core/models/User";
import { UserService } from "@/app/_core/api/services/UserService";
import UserVcard from "@/app/_core/models/vcard/UserVcard";
import VcardConfig from "@/app/_core/models/vcard/VcardConfig";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import LinkPreviewBlock from "../Common/LinkPreview";
import { useTranslations } from "next-intl";
import DesactivatedCard from "../Common/DesactivatedCard";
import CardBlock from "../Common/CardBlock";

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
    const user: User = UserService.buildObjectParser(kuser);
    const vinfo: UserVcard = user && new UserVcard(user.vinfo);
    const vconfig: VcardConfig = user && new VcardConfig(user.vconfig);
    const __ = useTranslations("Text");
    const [konectsCount, setKonectCount] = useState<number>(
        user.konects_count!,
    );

    const [offsetY, setOffsetY] = useState(0);
    const [scrollPercent, setScrollPercent] = useState(0);

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
        e.preventDefault();
        if (kuser) {
            KonectService.makeConnect(user.uuid!, 1)
                .then((rs) => {
                    if (rs.state) {
                        setKonectCount(user.konects_count! + 1);
                        const int = setInterval(() => {
                            setIsCompleted(true);
                            clearInterval(int);
                        }, 2000);
                    }
                    window.location.href = aRef.current?.href!;
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // aRef.current?.click();
        // setIsSaved(true)
    };

    return vconfig.isCardActivated ? (
        <div
            className="h-screen"
            style={{
                backgroundColor: vconfig.configTheme.primaryColor,
            }}
        >
            {isCompleted && _buildKuserFeedback()}

            <div>
                {scrollPercent > 5 && _buildStickyHeader()}
                {_buildImageCard()}
                {_builBottomContent()}
            </div>
        </div>
    ) : (
        <DesactivatedCard />
    );

    function _buildStickyHeader() {
        return (
            <header
                className="transition-opacity uration-1000 sticky top-0 w-full flex flex-col -space-y-2 justify-center bg-white shadow-md py-3 px-6 z-50"
                style={{
                    minHeight: `${scrollPercent > 25 ? 110 : 0}px`,
                    opacity: scrollPercent > 25 ? 1 : 0,
                    borderBottom: `5px solid ${vconfig.configTheme.primaryColor}`,
                }}
            >
                <h3
                    className={`flex text-2xl font-semibold text leading-tight ${vinfo.names.familyName.length > 7 || vinfo.names.givenName.length > 7 ? "flex-col" : "space-x-3"}`}
                >
                    <span className="truncate">
                        {ucfirst(vinfo.names.givenName)}
                    </span>
                    <span className="truncate">
                        {ucfirst(vinfo.names.familyName)}
                    </span>
                </h3>
                <span className="flex justify-between items-center">
                    <span className="flex flex-col space-y-2">
                        <p className="line-clamp-2">
                            {ucfirst(vinfo.note.text)}
                        </p>
                        <span className="text-sm text-gray-400">
                            {vinfo.location.state?.toLocaleUpperCase() +
                                ", " +
                                vinfo.location.iso_code?.toLocaleUpperCase()}
                        </span>
                    </span>
                    <Button
                        color="dark"
                        theme={customButtonTheme}
                        size={"mds"}
                        onClick={handleSaveContact}
                    >
                        <TbDownload className="mr-3 h-4 w-4" />
                        Save
                    </Button>
                </span>
            </header>
        );
    }

    function _builBottomContent() {
        return (
            <div className="p-8 bg-white flex flex-col space-y-3">
                {SocialMediaBloc({
                    title: __("social_networks"),
                    socialProfils: vinfo.socialProfils,
                })}
                <CardBlock title={__("contact_informations")}>
                    <div className=" w-full md:pb-0 pb-3">
                        <ul className="flex flex-col space-y-3 py-2 px-3">
                            {vinfo.email.text && (
                                <li className="flex space-x-3 items-center overflow-hidden py-3">
                                    <span className="bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border">
                                        <TbMail className="text-xl text-gray-800 hover:text-gray-800 cursor-pointer" />
                                    </span>

                                    <div className="inline-flex flex-col justify-center w-[inherit]">
                                        <span className="font-bold text-sm text-gray-400 uppercase">
                                            {__("email")}
                                        </span>
                                        {isLoading ? (
                                            <span>
                                                <TextSkeleton
                                                    className="w-56 mt-1"
                                                    bgClass="bg-gray-300/20"
                                                />
                                            </span>
                                        ) : (
                                            <Link
                                                href={
                                                    "mailto:" + vinfo.email.text
                                                }
                                                className="text-lg hover:underline text-gray-700 break-words"
                                            >
                                                {vinfo.email.text}
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            )}
                            <li>
                                <span className="flex space-x-5 items-start overflow-hidden">
                                    <span className="bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border">
                                        <TbPhone className="text-xl text-gray-800 hover:text-gray-800 cursor-pointer" />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="font-semibold text-sm text-gray-500 uppercase">
                                            <span>{__("phone_number")}</span>
                                        </span>
                                        <ul className="flex flex-col space-y-0 px-0">
                                            {vinfo.phones.map((phone, i) => {
                                                return (
                                                    phone.text && (
                                                        <li
                                                            key={i}
                                                            className="flex space-x-3 py-2 justify-start items-center overflow-hidden"
                                                        >
                                                            <div className="flex flex-col justify-center">
                                                                <span className="font-normal text-md text-gray-400">
                                                                    {ucfirst(
                                                                        phone.type,
                                                                    )}
                                                                </span>
                                                                {isLoading ? (
                                                                    <span>
                                                                        <TextSkeleton
                                                                            className="w-40 mt-1"
                                                                            bgClass="bg-gray-300/20"
                                                                        />
                                                                    </span>
                                                                ) : (
                                                                    <Link
                                                                        href={
                                                                            "tel:" +
                                                                            phone.text
                                                                        }
                                                                        className="text-lg hover:underline text-md text-gray-700"
                                                                    >
                                                                        {
                                                                            phone.text
                                                                        }
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
                                <li className="flex space-x-3 items-center overflow-hidden py-3">
                                    <span className="bg-gray-200/75 min-w-14 h-14 rounded-xl flex justify-center items-center border">
                                        <TbMapPin className="text-xl text-gray-800 hover:text-gray-800 cursor-pointer" />
                                    </span>

                                    <div className="inline-flex flex-col justify-center w-[inherit]">
                                        <span className="font-bold text-sm text-gray-400">
                                            {"Location"}
                                        </span>
                                        {isLoading ? (
                                            <span>
                                                <TextSkeleton
                                                    className="w-52 mt-1"
                                                    bgClass="bg-gray-300/20"
                                                />
                                            </span>
                                        ) : (
                                            <Link
                                                href={
                                                    "https://www.google.com/maps/search/?api=1&query=" +
                                                    vinfo.location.state
                                                }
                                                target="_blank"
                                                className="text-lg hover:underline text-gray-700 break-words"
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
                <div className="flex flex-col space-y-8 rounded-lg">
                    {vinfo.note.text && (
                        <CardBlock title={__("About me")}>
                            <div>
                                <h3 className="text-gray-700 font-bold text-lg mb-4 mt-4">
                                    {"About me"}
                                </h3>
                                <p className="mt-4 text-gray-500">
                                    {vinfo.note.text}
                                </p>
                            </div>
                        </CardBlock>
                    )}
                    {vinfo.urls.length > 0 && (
                        <CardBlock title={__("external_links")}>
                            <div>
                                <div className="grid gap-3 md:grid-cols-2 grid-cols-1">
                                    {vinfo.urls.map((url, i) => (
                                        <LinkPreviewBlock key={i} url={url} />
                                    ))}
                                </div>
                            </div>
                        </CardBlock>
                    )}

                    {vinfo.urls.length > 0 && (
                        <CardBlock title={__("videos_links")}>
                            <div className="pb-28">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                                    {vinfo.videoLinks.map((video, i) => (
                                        <div
                                            className="flex flex-col items-center space-y-3"
                                            key={i}
                                        >
                                            <iframe
                                                src={convertYouTubeLinkToEmbed(
                                                    video.uri,
                                                )}
                                                title="W3Schools Free Online Web Tutorials"
                                                className="w-full h-52"
                                                loading="lazy"
                                            ></iframe>
                                            <span className="text-gray-400 text-sm">
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
            <div className="bg-cover bg-center">
                <div className="relative h-full overflow-hidden flex  justify-center items-center py-16">
                    {/* Image de fond */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
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
                    <div className="absolute inset-0 bg-black-bold opacity-60"></div>
                    <div
                        className="absolute inset-0 bg-black-bold opacity-50"
                        style={{
                            backgroundColor: vconfig.configTheme.primaryColor,
                        }}
                    ></div>

                    {/* Contenu */}
                    <div className="relative z-10 flex items-center justify-center text-white">
                        <Card
                            theme={{
                                root: {
                                    children:
                                        "flex flex-col  space-y-6 justify-center p-6",
                                },
                            }}
                            className="max-w-sm flex py-2"
                        >
                            <span className="flex h-full items-center space-x-4 truncate">
                                <span
                                    className="min-w-28 h-28 bg-cover rounded-lg bg-center"
                                    style={{
                                        backgroundImage: `url('${
                                            ROOT_FILES_URL +
                                            "/" +
                                            user.profile_photo_url!
                                        }')`,
                                    }}
                                ></span>
                                <span className="p-2 text-black-bold flex-col space-y-0">
                                    <h3
                                        className={`flex text-3xl font-bold text leading-tight ${vinfo.names.familyName.length > 7 || vinfo.names.givenName.length > 7 ? "flex-col" : "space-x-3"}`}
                                    >
                                        <span className="truncate">
                                            {ucfirst(vinfo.names.givenName)}
                                        </span>
                                        <span className="truncate">
                                            {ucfirst(vinfo.names.familyName)}
                                        </span>
                                    </h3>
                                    {vconfig.showKonects && (
                                        <div>
                                            <span className="my-1 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex items-center bg-gray-50 border w-max">
                                                <span className="px-1 text-white">
                                                    <MdOutlineConnectWithoutContact className="w-4 h-4 text-gray-700" />
                                                </span>
                                                {isLoading ? (
                                                    <TextSkeleton
                                                        className="w-16"
                                                        bgClass="bg-gray-300/25"
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-700 space-x-1 flex">
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
                                                                    0, 0.71,
                                                                    0.2, 1.01,
                                                                ],
                                                                scale: {
                                                                    type: "spring",
                                                                    damping: 7,
                                                                    stiffness: 100,
                                                                    restDelta: 0.001,
                                                                },
                                                            }}
                                                        >
                                                            <span id="konect-stat">
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
                                    <span className="flex flex-col space-y-2">
                                        <p className="line-clamp-2">
                                            {ucfirst(vinfo.note.text)}
                                        </p>
                                        <span className="text-sm text-gray-400">
                                            {vinfo.location.state?.toLocaleUpperCase() +
                                                ", " +
                                                vinfo.location.iso_code?.toLocaleUpperCase()}
                                        </span>
                                    </span>
                                </span>
                            </span>

                            <Button.Group className="w-full grid grid-cols-2">
                                <Button
                                    color="dark"
                                    theme={customButtonTheme}
                                    size={"mdm"}
                                    onClick={handleSaveContact}
                                >
                                    <TbDownload className="mr-3 h-4 w-4" />
                                    Save
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
                                    className="hidden opacity-0 invisible"
                                />
                                <Button
                                    color="gray"
                                    theme={customButtonTheme}
                                    size={"mdm"}
                                    onClick={handleShareContact}
                                >
                                    <TbShare2 className="mr-3 h-4 w-4" />
                                    Exchange
                                </Button>
                            </Button.Group>
                        </Card>
                    </div>
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
                <div className="flex flex-wrap gap-3">
                    {Object.keys(socialProfils).map((so: any, i) => {
                        return (
                            <span className="" key={i}>
                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "instagram" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-16 rounded"
                                                src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                                                alt="instagram"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "facebook" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-16 rounded"
                                                src="https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
                                                alt="facebook"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "linkedin" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-9 rounded"
                                                src="https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg"
                                                alt="linkedin"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "youtube" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-8 rounded"
                                                src="https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                                                alt="youtube"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "tiktok" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-16 rounded"
                                                src="https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg"
                                                alt="tiktok"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}

                                {socialProfils[so].uri &&
                                    socialProfils[so].type == "twitter" && (
                                        <Link
                                            href={socialProfils[so].uri}
                                            target="_blank"
                                            className="border h-20 w-20 rounded-md flex items-center justify-center"
                                        >
                                            <Image
                                                className="w-8 rounded"
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
                                                alt="twitter"
                                                loading="lazy"
                                                width={500}
                                                height={500}
                                            />
                                        </Link>
                                    )}
                            </span>
                        );
                    })}
                </div>
            </CardBlock>
        );
    } else {
        return <span className="hidden"></span>;
    }
}
