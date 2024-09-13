// "use client";
import React, { ReactElement, ReactNode } from "react";
import { Field, FieldArray } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import Image from "next/image";
import { TbLink, TbPlus, TbTrash, TbTrashXFilled, TbX } from "react-icons/tb";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { UrlVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import { Input } from "postcss";
import InputField from "../Form/InputField";
import { useTranslations } from "next-intl";
import ExternalPlatformDetector from "@/app/_core/utils/classes/ExternalsPlatformDetector";
import {
    FaFacebook,
    FaGithub,
    FaGoogle,
    FaInstagram,
    FaLinkedin,
    FaSoundcloud,
    FaSpotify,
    FaSquareInstagram,
    FaTiktok,
    FaTwitter,
    FaXTwitter,
    FaYoutube,
} from "react-icons/fa6";

interface VcardLinksFormProps extends React.PropsWithChildren {}

const VcardLinksForm: React.FC<
    VcardLinksFormProps
> = ({}: VcardLinksFormProps) => {
    const __ = useTranslations("Text");
    const __A = useTranslations("Actions");

    return (
        <FieldArray
            name="urls"
            render={(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { urls } = values;

                return (
                    <div className="flex flex-col space-y-4">
                        {urls.map((url: UrlVcardInterface, index: number) => {
                            let icon: ReactNode = <TbLink />;
                            let platform =
                                ExternalPlatformDetector.detectPlatform(
                                    url.uri,
                                );

                            if (platform?.name == "Facebook") {
                                icon = <FaFacebook />;
                            } else if (platform?.name == "Twitter") {
                                icon = <FaTwitter />;
                            } else if (platform?.name == "Instagram") {
                                icon = <FaSquareInstagram />;
                            } else if (platform?.name == "Google") {
                                icon = <FaGoogle />;
                            } else if (platform?.name == "Tiktok") {
                                icon = <FaTiktok />;
                            } else if (platform?.name == "X") {
                                icon = <FaXTwitter />;
                            } else if (platform?.name == "Youtube") {
                                icon = <FaYoutube />;
                            } else if (platform?.name == "LinkedIn") {
                                icon = <FaLinkedin />;
                            } else if (platform?.name == "Github") {
                                icon = <FaGithub />;
                            } else if (platform?.name == "Spotify") {
                                icon = <FaSpotify />;
                            } else if (platform?.name == "Soundcloud") {
                                icon = <FaSoundcloud />;
                            }

                            return (
                                <div
                                    className="grid grid-cols-8 gap-3"
                                    key={index}
                                >
                                    <div className="flex flex-col justify-center md:col-span-3 col-span-8">
                                        <InputWithLabel
                                            labelFor="title"
                                            labelTitle={__("title")}
                                            className="w-full"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-full">
                                                    <InputField
                                                        name={`urls[${index}].type`}
                                                        labelFor="title"
                                                    />
                                                </div>
                                            </div>
                                        </InputWithLabel>
                                    </div>
                                    <div className="flex flex-col justify-center md:col-span-4 col-span-8">
                                        <InputWithLabel
                                            labelFor="url"
                                            key={index}
                                            labelTitle={__("website_link")}
                                            className="w-full col-span-2"
                                        >
                                            <div className="flex items-center">
                                                <div className="w-full">
                                                    <InputPrefixedIcon
                                                        icon={icon}
                                                        name={`urls[${index}].uri`}
                                                        labelFor="url"
                                                    />
                                                </div>
                                            </div>
                                        </InputWithLabel>
                                    </div>
                                    <div className="md:col-span-1 col-span-8 flex sm:items-start items-end flex-col justify-end mb-4">
                                        <span
                                            className="cursor-pointer flex items-center justify-start text-red-500 hover:text-red-700"
                                            onClick={() => remove(index)}
                                        >
                                            <TbX
                                                size={18}
                                                className="ml-1 cursor-pointer"
                                            />
                                            <span className="text-xs">
                                                {__A("delete")}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <Button
                            theme={customButtonTheme}
                            color="light"
                            onClick={() => push({ type: "", uri: "" })}
                            className="w-max"
                            size={"sm"}
                        >
                            <TbPlus className={"text-lg"} />
                            <span className="ml-1 text-xs">{__("add")}</span>
                        </Button>
                    </div>
                );
            }}
        />
    );
};

export default VcardLinksForm;
