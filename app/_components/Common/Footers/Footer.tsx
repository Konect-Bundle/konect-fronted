"use client";
import * as React from "react";
import {
    BsDribbble,
    BsFacebook,
    BsGithub,
    BsInstagram,
    BsTiktok,
    BsTwitter,
    BsYoutube,
} from "react-icons/bs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { customFooterTheme } from "@/app/_styles/flowbite/footer";
import { Footer as FooterFb } from "flowbite-react";
import { ROOT_ASSETS_URL } from "@/app/_core/config/constants";
import { homeRoute } from "@/app/_core/config/routes";
import { useTranslations } from "next-intl";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
    const pathname = usePathname();
    const tLinks = useTranslations("Links");
    return (
        <FooterFb container theme={customFooterTheme}>
            <div className="w-full">
                <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
                    <div>
                        <FooterFb.Brand
                            href={homeRoute.path}
                            src={ROOT_ASSETS_URL + "/images/logo.png"}
                            alt="Konect Logo"
                            name="nect"
                            loading="lazy"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterFb.Title title={tLinks("about")} />
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link href="#">
                                    {tLinks("our_team")}
                                </FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                        <div>
                            <FooterFb.Title title={tLinks("follow_us")} />
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link href="#">Github</FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                        <div>
                            <FooterFb.Title title={tLinks("legal")} />
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link
                                    href={
                                        ROOT_ASSETS_URL +
                                        "/documents/privacy.pdf"
                                    }
                                >
                                    {tLinks("privacy_policy")}
                                </FooterFb.Link>
                                <FooterFb.Link href="#">
                                    {tLinks("terms_and_condition")}
                                </FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                    </div>
                </div>
                <FooterFb.Divider />
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterFb.Copyright
                        href={homeRoute.path}
                        by="Konect™"
                        year={2024}
                    />
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterFb.Icon href="#" icon={BsFacebook} />
                        <FooterFb.Icon
                            href="https://www.instagram.com/konect.networking"
                            icon={BsInstagram}
                        />
                        <FooterFb.Icon href="#" icon={BsTwitter} />
                        <FooterFb.Icon
                            href="https://www.youtube.com/@Konect-t6g"
                            icon={BsYoutube}
                        />
                        <FooterFb.Icon
                            href="https://tiktok.com/@konect.networking"
                            icon={BsTiktok}
                        />
                    </div>
                </div>
            </div>
        </FooterFb>
    );
}
