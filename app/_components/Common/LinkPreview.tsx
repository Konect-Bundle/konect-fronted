import * as React from "react";
import { GiNightSleep } from "react-icons/gi";
import { ReactNode } from "react";
import { TbExternalLink } from "react-icons/tb";
import { UrlVcard } from "@/app/_core/models/vcard/VcardParts";
import ExternalPlatformDetector from "@/app/_core/utils/classes/ExternalsPlatformDetector";
import {
    FaFacebook,
    FaGithub,
    FaGoogle,
    FaLinkedin,
    FaSoundcloud,
    FaSpotify,
    FaSquareInstagram,
    FaTiktok,
    FaTwitter,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

export interface ILinkPreviewProps {
    url: UrlVcard;
}

export default function LinkPreviewBlock({ url }: ILinkPreviewProps) {
    let icon: ReactNode = <TbExternalLink />;
    let platform = ExternalPlatformDetector.detectPlatform(url.uri);
    let iconClass: string = "w-6";

    if (platform?.name == "Facebook") {
        icon = <FaFacebook className={iconClass} />;
    } else if (platform?.name == "Twitter") {
        icon = <FaTwitter className={iconClass} />;
    } else if (platform?.name == "Instagram") {
        icon = <FaSquareInstagram className={iconClass} />;
    } else if (platform?.name == "Google") {
        icon = <FaGoogle className={iconClass} />;
    } else if (platform?.name == "Tiktok") {
        icon = <FaTiktok className={iconClass} />;
    } else if (platform?.name == "X") {
        icon = <FaXTwitter className={iconClass} />;
    } else if (platform?.name == "Youtube") {
        icon = <FaYoutube className={iconClass} />;
    } else if (platform?.name == "LinkedIn") {
        icon = <FaLinkedin className={iconClass} />;
    } else if (platform?.name == "Github") {
        icon = <FaGithub className={iconClass} />;
    } else if (platform?.name == "Spotify") {
        icon = <FaSpotify className={iconClass} />;
    } else if (platform?.name == "Soundcloud") {
        icon = <FaSoundcloud className={iconClass} />;
    }
    return (
        <div className="flex justify-start bg-slate-50 rounded-md border  items-center p-2 overflow-hidden">
            <span className="bg-white p-2 border rounded-md">{icon}</span>
            <div className="flex flex-col px-4">
                <span className="text-sm font-bold">{url.type}</span>
                <span>
                    <a
                        className="text-gray-500 underline truncate"
                        target="__blank"
                        href={url.uri}
                    >
                        {url.uri}
                    </a>
                </span>
            </div>
        </div>
    );
}
