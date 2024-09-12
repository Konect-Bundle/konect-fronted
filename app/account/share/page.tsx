"use client";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import QRCode from "react-qr-code";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import { TextInput, Clipboard } from "flowbite-react";

import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { useEffect } from "react";
import { customClipboardTheme } from "@/app/_styles/flowbite/clipboard";

export interface ShareProfilProps {}

export default function ShareProfilPage(props: ShareProfilProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");

    if (!user)
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <MutatingDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#e4dc1a"
                    secondaryColor="#e4dc1a"
                    radius="12.5"
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        );

    return (
        user && (
            <div className="lg:pt-12 md:pt-4 flex justify-center pt-4">
                <div className="md:w-[700px] w-full bg-white md:p-9 p-6 rounded-xl">
                    <div className="lg:py-0 md:py-3 py-0 mb-5">
                        <h2
                            style={{ whiteSpace: "pre-wrap" }}
                            className="text-2xl font-semibold"
                        >
                            {__("share_profil")}
                        </h2>

                        <div className="w-14 h-1 mt-2 bg-gray-400"></div>
                    </div>

                    <section className="flex md:flex-row flex-col md:space-x-6 space-x-0 space-y-6 md:space-y-0 items-center md:items-start">
                        <span className="md:w-56 w-40 h-min p-3 rounded-lg bg-gray-50/45 border">
                            <QRCode
                                size={256}
                                style={{
                                    height: "auto",
                                    maxWidth: "100%",
                                    width: "100%",
                                }}
                                value={`${window.location.origin}/kuser/${user.uuid}`}
                                viewBox={`0 0 256 256`}
                            />
                        </span>
                        <span className="w-full flex flex-col space-y-3">
                            <InputWithLabel
                                labelFor="profil"
                                labelTitle={`${__("profile_link")}`}
                            >
                                <div className="relative">
                                    <label htmlFor="profil" className="sr-only">
                                        {`${__("profile_link")}`}
                                    </label>
                                    <TextInput
                                        theme={customTextInputTheme}
                                        id="profil"
                                        type="text"
                                        className="bg-gray-50 text-xs font-normal"
                                        defaultValue={`${window.location.origin}/kuser/${user.uuid}`}
                                        disabled
                                        readOnly
                                    />
                                    <Clipboard.WithIconText
                                        theme={
                                            customClipboardTheme?.withIconText
                                        }
                                        valueToCopy={`${window.location.origin}/kuser/${user.uuid}`}
                                    />
                                </div>
                            </InputWithLabel>
                            <InputWithLabel
                                labelFor="referal"
                                labelTitle={`${__("referal_code")}`}
                            >
                                <div className="relative">
                                    <label
                                        htmlFor="referal"
                                        className="sr-only"
                                    >
                                        {`${__("referal_code")}`}
                                    </label>
                                    <TextInput
                                        theme={customTextInputTheme}
                                        id="referal"
                                        type="text"
                                        className="bg-gray-50 text-xs font-semibold"
                                        defaultValue={`${user.referal_code}`}
                                        disabled
                                        readOnly
                                    />
                                    <Clipboard.WithIconText
                                        theme={
                                            customClipboardTheme?.withIconText
                                        }
                                        valueToCopy={`${user.referal_code}`}
                                    />
                                </div>
                            </InputWithLabel>
                            <InputWithLabel
                                labelFor="referal_link"
                                labelTitle={`${__("referal_link")}`}
                            >
                                <div className="relative">
                                    <label
                                        htmlFor="referal_link"
                                        className="sr-only"
                                    >
                                        {`${__("referal_link")}`}
                                    </label>
                                    <TextInput
                                        theme={customTextInputTheme}
                                        id="referal"
                                        type="text"
                                        className="bg-gray-50 text-xs font-normal"
                                        defaultValue={`${window.location.origin}/register/${user.referal_code}`}
                                        disabled
                                        readOnly
                                    />
                                    <Clipboard.WithIconText
                                        theme={
                                            customClipboardTheme?.withIconText
                                        }
                                        valueToCopy={`${window.location.origin}/register/${user.referal_code}`}
                                    />
                                </div>
                            </InputWithLabel>
                        </span>
                    </section>
                </div>
            </div>
        )
    );
}

{
    /* {user.orders?.map((order, i) => ( */
}
