"use client";
import KuserHeader from "@/app/_components/Common/Headers/KuserHeader";
import {
    convertYouTubeLinkToEmbed,
    esser,
    ucfirst,
} from "@/app/_core/utils/functions";
import Image from "next/image";
import Link from "next/link";
import { TbExternalLink, TbMail, TbPhone, TbShare3 } from "react-icons/tb";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ImageSkeleton from "@/app/_components/Common/Skeleton/ImageSkeleton";
import TextSkeleton from "@/app/_components/Common/Skeleton/TextSkeleton";
import VideoSkeleton from "@/app/_components/Common/Skeleton/VideoSkeleton";
import ExternalLinkSkeleton from "@/app/_components/Common/Skeleton/ExternalLinkSkeleton";
import { Avatar, Button } from "flowbite-react";
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

    const [konectsCount, setKonectCount] = useState<number>(
        user.konects_count!,
    );

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
        <div className='h-screen py-4'>
            {isCompleted && (
                <KuserFeedback
                    callback={() => {
                        setIsCompleted(false);
                    }}
                    kuser={user}
                />
            )}

            <KuserHeader />

            <div className='grid grid-cols-12 gap-2 h-full w-screen bg-gray-100'>
                <div className='flex flex-col lg:col-span-4 sm:col-span-6 col-span-12 px-4'>
                    <div className='relative py-4 flex flex-col items-center justify-start mt-32 mb-2 h-full bg-white rounded-lg space-y-3 md:space-y-6 px-6 border'>
                        <span className='absolute -top-24'>
                            {isLoading ? (
                                <ImageSkeleton
                                    className='w-52 h-52 rounded-xl'
                                    animated={false}
                                />
                            ) : user.profile_photo_url ? (
                                <span className='rounded-xl max-w-52 min-h-52 overflow-hidden flex justify-center items-center'>
                                    <Avatar
                                        img={
                                            ROOT_FILES_URL +
                                            "/" +
                                            user.profile_photo_url!
                                        }
                                        size={"sxl"}
                                        alt='Kuser Image'
                                        theme={customAvatarTheme}
                                    />
                                </span>
                            ) : (
                                <Avatar
                                    theme={customAvatarTheme}
                                    size={"sxl"}
                                />
                            )}
                        </span>

                        <div className='pt-24 flex flex-col justify-start space-y-4'>
                            <h2 className='font-bold text-2xl'>
                                {isLoading ? (
                                    <span className='flex space-x-2'>
                                        <TextSkeleton
                                            className='md:28 w-16 text-gray-200'
                                            height={4}
                                        />{" "}
                                        <TextSkeleton
                                            className='ms-2 md:32 w-16 text-gray-100'
                                            height={4}
                                        />
                                    </span>
                                ) : (
                                    ucfirst(user.firstname!) +
                                    " " +
                                    ucfirst(user.name!)
                                )}
                            </h2>
                        </div>
                        {vconfig.showKonects && (
                            <div>
                                <span className='my-1 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded flex items-center bg-gray-50 border'>
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
                                                    ease: [0, 0.71, 0.2, 1.01],
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
                                                {esser("konect", konectsCount)}
                                            </span>
                                        </span>
                                    )}
                                </span>
                            </div>
                        )}

                        <div className='flex mt-4 space-x-3 pb-2 relative w-full shadow-none justify-center items-center bottom-0 left-0'>
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
                                theme={customButtonTheme}
                                color='dark'
                                onClick={handleSaveContact}
                            >
                                <HiSave className={"text-lg"} />
                                <span className='ml-1'>{"Save"}</span>
                            </Button>
                            <Button
                                theme={customButtonTheme}
                                onClick={handleShareContact}
                                color='gray'
                            >
                                <TbShare3 className={"text-lg"} />
                                <span className='ml-1'>{"Share"}</span>
                            </Button>
                        </div>

                        <div className='flex flex-wrap items-center mt-1'>
                            {isLoading ? (
                                <span className='flex space-x-2'>
                                    <ImageSkeleton className='w-12 h-12' />
                                    <ImageSkeleton className='w-12 h-12' />
                                    <ImageSkeleton className='w-12 h-12' />
                                </span>
                            ) : (
                                <SocialMediaBloc
                                    socialProfils={vinfo.socialProfils}
                                />
                            )}
                        </div>

                        <div className='bg-gray-50 border rounded-md w-full md:pb-0 pb-3'>
                            <ul className='py-2 divide-y divide-gray-200 px-3'>
                                {vinfo.email.text && (
                                    <li className='flex space-x-3 items-center overflow-hidden py-3'>
                                        <span className='bg-white min-w-10 h-10 rounded flex justify-center items-center border'>
                                            <TbMail className='w-5 text-gray-500 hover:text-gray-800 cursor-pointer' />
                                        </span>

                                        <div className='inline-flex flex-col justify-center w-[inherit]'>
                                            <span className='font-bold text-sm text-gray-400'>
                                                {"Email"}
                                            </span>
                                            {isLoading ? (
                                                <span>
                                                    <TextSkeleton
                                                        className='w-56 mt-1'
                                                        bgClass='bg-gray-300/20'
                                                    />
                                                </span>
                                            ) : (
                                                <a
                                                    href={
                                                        "mailto:" +
                                                        vinfo.email.text
                                                    }
                                                    className='hover:underline text-gray-700 break-words'
                                                >
                                                    {vinfo.email.text}
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                )}
                                {vinfo.phone.text && (
                                    <li className='flex space-x-3 py-3 items-center overflow-hidden'>
                                        <span className='bg-white min-w-10 h-10 rounded flex justify-center items-center border'>
                                            <TbPhone className='w-5 text-gray-500 hover:text-gray-800 cursor-pointer' />
                                        </span>
                                        <div className='flex flex-col justify-center'>
                                            <span className='font-bold text-sm text-gray-400'>
                                                {"Phone"}
                                            </span>
                                            {isLoading ? (
                                                <span>
                                                    <TextSkeleton
                                                        className='w-40 mt-1'
                                                        bgClass='bg-gray-300/20'
                                                    />
                                                </span>
                                            ) : (
                                                <a
                                                    href={
                                                        "tel:" +
                                                        vinfo.phone.text
                                                    }
                                                    className='hover:underline text-gray-700'
                                                >
                                                    {vinfo.phone.text}
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                )}
                                {vconfig.showLocalization && (
                                    <li className='flex space-x-3 items-center overflow-hidden py-3'>
                                        <span className='bg-white min-w-10 h-10 rounded flex justify-center items-center border'>
                                            <MdLocationPin className='w-5 text-gray-500 hover:text-gray-800 cursor-pointer' />
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
                                                <a
                                                    href={
                                                        "https://www.google.com/maps/search/?api=1&query=" +
                                                        vinfo.location.state
                                                    }
                                                    target='_blank'
                                                    className='hover:underline text-gray-700 break-words'
                                                >
                                                    {vinfo.location.state +
                                                        ", " +
                                                        vinfo.location.iso_code}
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='border my-2 bg-white lg:col-span-8 sm:col-span-6 col-span-12 flex flex-col space-y-8  px-8 rounded-lg'>
                    {isLoading ? (
                        <span>
                            <h3 className='text-gray-700 font-bold text-lg mb-4 mt-4'>
                                {"About me"}
                            </h3>
                            <span className='flex flex-col space-y-3 mt-4 mb-4'>
                                <span className='flex space-x-2'>
                                    <TextSkeleton className='ms-2 w-20 text-gray-200' />
                                    <TextSkeleton className='ms-2 w-48 text-gray-300/25' />
                                    <TextSkeleton className='ms-2 w-full text-gray-200' />
                                </span>
                                <span className='flex space-x-2'>
                                    <TextSkeleton className='ms-2 w-20 text-gray-200' />
                                    <TextSkeleton className='ms-2 w-full text-gray-300/25' />

                                    <TextSkeleton className='ms-2 w-36 text-gray-200' />
                                </span>
                            </span>
                        </span>
                    ) : (
                        vinfo.note && (
                            <div>
                                <h3 className='text-gray-700 font-bold text-lg mb-4 mt-4'>
                                    {"About me"}
                                </h3>
                                <p className='mt-4 text-gray-500'>
                                    {vinfo.note.text}
                                </p>
                            </div>
                        )
                    )}

                    {isLoading ? (
                        <span>
                            <h3 className='text-gray-700 font-bold text-lg mb-6'>
                                {"Externals Links"}
                            </h3>
                            <ExternalLinkSkeleton />
                        </span>
                    ) : (
                        vinfo.urls.length > 0 && (
                            <div>
                                <h3 className='text-gray-700 font-bold text-lg mb-6'>
                                    {"Externals Links"}
                                </h3>
                                <div className='grid gap-3 md:grid-cols-2 grid-cols-1'>
                                    {vinfo.urls.map((url, i) => (
                                        <LinkPreviewBlock key={i} url={url} />
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {isLoading ? (
                        <span>
                            <h3 className='text-gray-700 font-bold text-lg mb-4 mt-4'>
                                {"Videos"}
                            </h3>
                            <VideoSkeleton
                                className='w-full h-60 rounded-xl'
                                animated={true}
                            />
                        </span>
                    ) : (
                        vinfo.urls.length > 0 && (
                            <div className='pb-28'>
                                <h3 className='text-gray-700 font-bold text-lg mb-6'>
                                    {"Videos"}
                                </h3>
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
                                            <span className='text-gray-400 text-sm'>
                                                {video.type}
                                            </span>
                                        </div>
                                    ))}{" "}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    ) : (
        "Carte desactivée"
    );
}

function SocialMediaBloc({
    socialProfils,
}: {
    socialProfils: any;
}): React.ReactElement {
    return (
        <>
            {Object.keys(socialProfils).map((so: any, i) => (
                <span className='mr-3 mt-3' key={i}>
                    {socialProfils[so].uri &&
                        socialProfils[so].type == "instagram" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-14 rounded'
                                    src='https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg'
                                    alt='instagram'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}

                    {socialProfils[so].uri &&
                        socialProfils[so].type == "facebook" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-14 rounded'
                                    src='https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg'
                                    alt='facebook'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}

                    {socialProfils[so].uri &&
                        socialProfils[so].type == "linkedin" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-7 rounded'
                                    src='https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg'
                                    alt='linkedin'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}

                    {socialProfils[so].uri &&
                        socialProfils[so].type == "youtube" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-7 rounded'
                                    src='https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg'
                                    alt='youtube'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}

                    {socialProfils[so].uri &&
                        socialProfils[so].type == "tiktok" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-12 rounded'
                                    src='https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg'
                                    alt='tiktok'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}

                    {socialProfils[so].uri &&
                        socialProfils[so].type == "twitter" && (
                            <Link
                                href={socialProfils[so].uri}
                                target='_blank'
                                className='border h-12 w-12 rounded-md flex items-center justify-center'
                            >
                                <Image
                                    className='w-6 rounded'
                                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553'
                                    alt='twitter'
                                    loading='lazy'
                                    width={500}
                                    height={500}
                                />
                            </Link>
                        )}
                </span>
            ))}
        </>
    );
}
