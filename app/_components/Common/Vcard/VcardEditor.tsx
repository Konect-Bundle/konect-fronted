import UserVcard from "@/app/_core/models/vcard/UserVcard";
import React, { ReactElement, ReactNode, useState } from "react";
import { Button, FileInput, Label, Tabs } from "flowbite-react";

import { Formik, Form } from "formik";
import {
    UserVcardInterface,
    VideoLinkVcardInterface,
} from "@/app/_core/interfaces/vcardInterfaces";
import VcardGeneralForm from "./VcardGeneralForm";
import VcardSocialForm from "./VcardSocialForm";
import {
    TbBrandInstagram,
    TbEdit,
    TbLinkPlus,
    TbToggleLeft,
    TbUser,
    TbUserQuestion,
    TbVideo,
} from "react-icons/tb";
// import VcardJobForm from './VcardJobForm';

import VcardLinksForm from "./VcardLinksForm";
import VcardVideosForm from "./VcardVideosForm";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import VcardConfigsForm from "./VcardConfigsForm";
import { customTabsTheme } from "@/app/_styles/flowbite/tabs";
import { UrlVcardInterface } from "../../../_core/interfaces/vcardInterfaces";
import VcardConfigInterface from "@/app/_core/interfaces/vconfigInterfaces";
import Image from "next/image";
import { User } from "@/app/_core/models/User";
import VcardConfig from "@/app/_core/models/vcard/VcardConfig";
import { AUTH_TOKEN_NAME, ROOT_FILES_URL } from "@/app/_core/config/constants";
import { UserService } from "@/app/_core/api/services/UserService";
import { getCookie } from "cookies-next";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { customFileInputTheme } from "@/app/_styles/flowbite/form";
import LoadingLayout from "../../Layouts/LoadingLayout";
import { useTranslations } from "next-intl";

interface VcardEditorProps extends React.PropsWithChildren {
    user: User;
}

const VcardEditor: React.FC<VcardEditorProps> = ({
    user,
}: VcardEditorProps) => {
    const vcard: UserVcard = new UserVcard(user.vinfo);
    const vconfig: VcardConfigInterface = new VcardConfig(
        user.vconfig,
    ) as VcardConfigInterface;
    const urls: unknown = vcard.urls;
    const videos: unknown = vcard.videoLinks;
    const [selectedImage, setSelectedImage] = useState<
        string | ArrayBuffer | null
    >(null);
    const [file, setFile] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const TAction = useTranslations("Actions");
    const Ttext = useTranslations("Text");
    const initialValues: UserVcardInterface = {
        names: {
            givenName: vcard.names.givenName,
            familyName: vcard.names.familyName,
            middleName: vcard.names.middleName,
            prefix: vcard.names.prefix,
            suffix: vcard.names.suffix,
        },
        email: {
            type: vcard.email.type,
            text: vcard.email.text,
        },
        socialProfils: {
            facebook: vcard.socialProfils.facebook.uri,
            instagram: vcard.socialProfils.instagram.uri,
            twitter: vcard.socialProfils.twitter.uri,
            youtube: vcard.socialProfils.youtube.uri,
            tiktok: vcard.socialProfils.tiktok.uri,
            linkedin: vcard.socialProfils.linkedin.uri,
        },
        urls: urls as UrlVcardInterface[],
        videoLinks: videos as VideoLinkVcardInterface[],
        note: {
            text: vcard.note.text,
        },
        phone: {
            type: vcard.phone.type,
            text: vcard.phone.text,
        },
        config: vconfig,
    };
    const handleSubmitForm = (values: UserVcardInterface) => {
        setIsLoading(true);
        // console.log(values);
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));

        if (file) {
            formData.append("img", file);
        }

        var token = getCookie(AUTH_TOKEN_NAME);

        if (token) {
            UserService.updateVcard(formData, token).then((rs) => {
                setIsLoading(false);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: TAction("vcard_updated"),
                    showConfirmButton: false,
                    timer: 2500,
                });
            });
        }
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }, [file]);

    return (
        <LoadingLayout isLoading={isLoading}>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {(formProps) => (
                    <Form className="flex flex-col items-end">
                        <div className="bg-white rounded-lg mb-6 w-full">
                            <Tabs
                                aria-label="Tabs with icons"
                                theme={customTabsTheme}
                                style={"underline"}
                            >
                                <Tabs.Item
                                    active
                                    title={Ttext("general_infos")}
                                    icon={TbUserQuestion}
                                >
                                    <div className="flex md:flex-row md:justify-start justify-center flex-col items-center space-x-8 px-8 pb-8 pt-5">
                                        <div className="w-40 h-40 rounded-xl overflow-hidden">
                                            <Image
                                                alt="Kuser Image"
                                                src={
                                                    selectedImage
                                                        ? (selectedImage as string)
                                                        : ROOT_FILES_URL +
                                                        "/" +
                                                        user.profile_photo_url
                                                }
                                                width={500}
                                                height={500}
                                                className="w-full h-full"
                                                priority={true}
                                            />
                                        </div>

                                        <div className="md:mt-0 mt-4">
                                            <div>
                                                <div>
                                                    <Label
                                                        htmlFor="file-upload-helper-text"
                                                        value="Upload file"
                                                    />
                                                </div>
                                                <FileInput
                                                    accept=".jpg,.jpeg,.png"
                                                    theme={customFileInputTheme}
                                                    color={"gray"}
                                                    id="file-upload-helper-text"
                                                    helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>,
                                                    ) => {
                                                        setFile(
                                                            e.target.files![0],
                                                        );
                                                        if (file) {
                                                            formProps.setFieldValue(
                                                                "img",
                                                                file,
                                                            );
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-8 pb-8 md:pt-5 pt-2">
                                        <h2 className="pb-6 font-semibold text-xl ">
                                            {Ttext("general_infos")}
                                        </h2>
                                        <VcardGeneralForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("social_networks")}
                                    icon={TbBrandInstagram}
                                >
                                    <div className="px-8 pb-8 pt-5">
                                        <h2 className="pb-6 font-semibold text-xl ">
                                            {Ttext("social_networks")}
                                        </h2>
                                        <VcardSocialForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("external_links")}
                                    icon={TbLinkPlus}
                                >
                                    <div className="px-8 pb-8 pt-5">
                                        <h2 className="pb-6 font-semibold text-xl ">
                                            {Ttext("external_links")}
                                        </h2>
                                        <VcardLinksForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("video") + "s"}
                                    icon={TbVideo}
                                >
                                    <div className="px-8 pb-8 pt-5">
                                        <h2 className="pb-6 font-semibold text-xl ">
                                            {Ttext("video") + "s"}
                                        </h2>
                                        <VcardVideosForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("other_settings")}
                                    icon={TbToggleLeft}
                                >
                                    <div className="px-8 pb-8 pt-5">
                                        <h2 className="font-semibold text-xl ">
                                            {Ttext("other_settings")}
                                        </h2>

                                        <p className="pb-6 text-gray-300/85 text-sm mt-2 font-light">
                                            {Ttext("should_see")}
                                        </p>
                                        <VcardConfigsForm />
                                    </div>
                                </Tabs.Item>
                                {/* <Tabs.Item disabled title="Disabled">
    Disabled content
</Tabs.Item> */}
                            </Tabs>
                        </div>
                        <Button
                            type="submit"
                            theme={customButtonTheme}
                            color="dark"
                            className=""
                        >
                            <TbEdit className={"text-lg"} />
                            <span className="ml-1">{"Save"}</span>
                        </Button>
                    </Form>
                )}
            </Formik>
        </LoadingLayout>
    );
};

export default VcardEditor;
