"use_client";
import UserVcard from "@/app/_core/models/vcard/UserVcard";
import React, { useState } from "react";
import { Avatar, Button, FileInput, Label, Tabs } from "flowbite-react";

import { Formik, Form } from "formik";
import {
    PhoneVcardInterface,
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
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { ucfirst } from "@/app/_core/utils/functions";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import ErrorsViewer from "../Errors/ErrorsViewer";

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
    const phones: unknown = vcard.phones;

    const [selectedImage, setSelectedImage] = useState<
        string | ArrayBuffer | null
    >(null);
    const [file, setFile] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const TAction = useTranslations("Actions");
    const Ttext = useTranslations("Text");
    const [errors, setErrors] = useState<string | Array<string>>("");
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
        location: {
            state: vcard.location.state ? ucfirst(vcard.location.state) : "",
            country: vcard.location.iso_code
                ? vcard.location.iso_code.toUpperCase()
                : "CA",
        },
        urls: urls as UrlVcardInterface[],
        videoLinks: videos as VideoLinkVcardInterface[],
        note: {
            text: vcard.note.text,
        },
        phones: phones as PhoneVcardInterface[],
        config: vconfig,
    };
    const handleSubmitForm = (values: UserVcardInterface) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));

        if (file) {
            formData.append("img", file);
        }

        var token = getCookie(AUTH_TOKEN_NAME);

        if (token) {
            UserService.updateVcard(formData, token)
                .then((rs) => {
                    setErrors("");
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: TAction("vcard_updated"),
                        showConfirmButton: false,
                        timer: 2500,
                    });
                })
                .catch((error) => {
                    if (error.response) {
                        var res: ApiErrorsManagement = new ApiErrorsManagement(
                            error,
                        );
                        setErrors(res.proccess());
                    }
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        // console.log(initialValues);
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
                                variant={"underline"}
                            >
                                <Tabs.Item
                                    active
                                    title={Ttext("general_infos")}
                                    icon={TbUserQuestion}
                                >
                                    <div className="flex md:flex-row md:justify-start justify-center flex-col items-center md:space-x-8 space-x-0 px-8 pb-8 pt-5">
                                        <div className="w-40 h-40 flex justify-center rounded-xl overflow-hidden">
                                            {user.profile_photo_url ||
                                            selectedImage ? (
                                                <Avatar
                                                    img={
                                                        selectedImage
                                                            ? (selectedImage as string)
                                                            : ROOT_FILES_URL +
                                                              "/" +
                                                              user.profile_photo_url!
                                                    }
                                                    size={"pxl"}
                                                    alt="Kuser Image"
                                                    theme={customAvatarTheme}
                                                />
                                            ) : (
                                                <Avatar
                                                    theme={customAvatarTheme}
                                                    size={"pxl"}
                                                />
                                            )}
                                        </div>

                                        <div className="md:mt-0 mt-4">
                                            <div className="flex flex-col md:items-start items-center">
                                                <div className="cursor-pointer rounded-md flex items-center space-x-1 bg-gray-50 text-gray-500 w-max px-4 py-1 border border-gray-300/40 hover:text-gray-600 transition-colors">
                                                    <TbEdit />
                                                    <Label
                                                        className="text-gray-500 font-normal cursor-pointer hover:text-gray-600 transition-colors"
                                                        htmlFor="file-upload-helper-text"
                                                        value={TAction(
                                                            "choose_image",
                                                        )}
                                                    />
                                                </div>
                                                <FileInput
                                                    className="hidden"
                                                    accept=".jpg,.jpeg,.png"
                                                    theme={customFileInputTheme}
                                                    color={"gray"}
                                                    id="file-upload-helper-text"
                                                    helperText="PNG, JPG or GIF (MAX. 800x400px)."
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
                                        <VcardGeneralForm
                                            formikValues={formProps.values}
                                        />
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
                                    title={Ttext("others_links")}
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

                        <ErrorsViewer errors={errors} />

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
