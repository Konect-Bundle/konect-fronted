"use client";
import * as React from "react";
import {BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter} from "react-icons/bs";
import Image from "next/image";
import {usePathname} from 'next/navigation'
import {customFooterTheme} from "@/app/_styles/flowbite/footer";
import { Footer as FooterFb } from "flowbite-react";
import {ROOT_ASSETS_URL} from "@/app/_core/config/constants";
import {homeRoute} from "@/app/_core/config/routes";

export interface IFooterProps {
}

export default function Footer(props: IFooterProps) {
    const pathname = usePathname()

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
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
                        <div>
                            <FooterFb.Title title="about"/>
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link href="#">Flowbite</FooterFb.Link>
                                <FooterFb.Link href="#">Tailwind CSS</FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                        <div>
                            <FooterFb.Title title="Follow us"/>
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link href="#">Github</FooterFb.Link>
                                <FooterFb.Link href="#">Discord</FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                        <div>
                            <FooterFb.Title title="Legal"/>
                            <FooterFb.LinkGroup col>
                                <FooterFb.Link href="#">Privacy Policy</FooterFb.Link>
                                <FooterFb.Link href="#">Terms &amp; Conditions</FooterFb.Link>
                            </FooterFb.LinkGroup>
                        </div>
                    </div>
                </div>
                <FooterFb.Divider/>
                <div className="w-full sm:flex sm:items-center sm:justify-between">
                    <FooterFb.Copyright href={homeRoute.path} by="Konect™" year={2024}/>
                    <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
                        <FooterFb.Icon href="#" icon={BsFacebook}/>
                        <FooterFb.Icon href="https://www.instagram.com/konect.networking" icon={BsInstagram}/>
                        <FooterFb.Icon href="#" icon={BsTwitter}/>
                        <FooterFb.Icon href="#" icon={BsGithub}/>
                        <FooterFb.Icon href="#" icon={BsDribbble}/>
                    </div>
                </div>
            </div>
        </FooterFb>
    );
}
