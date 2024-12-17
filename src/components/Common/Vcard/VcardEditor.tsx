"use_client";
import UserVcard from "@/core/models/vcard/UserVcard";
import { Button, Tabs } from "flowbite-react";
import React, { useState } from "react";

import {
    PhoneVcardInterface,
    UserVcardInterface,
    VideoLinkVcardInterface,
} from "@/core/interfaces/vcardInterfaces";
import { Form, Formik } from "formik";
import {
    TbBrandInstagram,
    TbEdit,
    TbLinkPlus,
    TbToggleLeft,
    TbUserQuestion,
    TbVideo,
} from "react-icons/tb";
import VcardGeneralForm from "./VcardGeneralForm";
import VcardSocialForm from "./VcardSocialForm";
// import VcardJobForm from './VcardJobForm';

import ApiErrorsManagement from "@/core/api/errors/apiErrorsManagement";
import { UserService } from "@/core/api/services/UserService";
import { AUTH_TOKEN_NAME } from "@/core/config/constants";
import VcardConfigInterface from "@/core/interfaces/vconfigInterfaces";
import { User } from "@/core/models/User";
import VcardConfig from "@/core/models/vcard/VcardConfig";
import { ucfirst } from "@/core/utils/functions";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customTabsTheme } from "@/styles/flowbite/tabs";
import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import { UrlVcardInterface } from "../../../core/interfaces/vcardInterfaces";
import LoadingLayout from "../../Layouts/LoadingLayout";
import ErrorsViewer from "../Errors/ErrorsViewer";
import ImageCropper from "../Image/ImageCroper";
import VcardConfigsForm from "./VcardConfigsForm";
import VcardLinksForm from "./VcardLinksForm";
import VcardVideosForm from "./VcardVideosForm";

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
        profilImage: null,
    };
    const handleSubmitForm = (values: UserVcardInterface) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("data", JSON.stringify(values));

        if (values.profilImage != null) {
            formData.append("img", values.profilImage);
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

    return (
        <LoadingLayout isLoading={isLoading}>
            <Formik initialValues={initialValues} onSubmit={handleSubmitForm}>
                {(formProps) => (
                    <Form className='flex flex-col items-end'>
                        <div className='bg-white rounded-lg mb-6 w-full'>
                            <Tabs
                                aria-label='Tabs with icons'
                                theme={customTabsTheme}
                                variant={"underline"}
                            >
                                <Tabs.Item
                                    active
                                    title={Ttext("general_infos")}
                                    icon={TbUserQuestion}
                                >
                                    <ImageCropper
                                        initialImage={user.profile_photo_url}
                                    />
                                    <div className='px-8 pb-8 md:pt-5 pt-2'>
                                        <h2 className='pb-6 font-semibold text-xl '>
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
                                    <div className='px-8 pb-8 pt-5'>
                                        <h2 className='pb-6 font-semibold text-xl '>
                                            {Ttext("social_networks")}
                                        </h2>
                                        <VcardSocialForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("others_links")}
                                    icon={TbLinkPlus}
                                >
                                    <div className='px-8 pb-8 pt-5'>
                                        <h2 className='pb-6 font-semibold text-xl '>
                                            {Ttext("external_links")}
                                        </h2>
                                        <VcardLinksForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("video") + "s"}
                                    icon={TbVideo}
                                >
                                    <div className='px-8 pb-8 pt-5'>
                                        <h2 className='pb-6 font-semibold text-xl '>
                                            {Ttext("video") + "s"}
                                        </h2>
                                        <VcardVideosForm />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item
                                    title={Ttext("other_settings")}
                                    icon={TbToggleLeft}
                                >
                                    <div className='px-8 pb-8 pt-5'>
                                        <h2 className='font-semibold text-xl '>
                                            {Ttext("other_settings")}
                                        </h2>

                                        <p className='pb-6 text-gray-300/85 text-sm mt-2 font-light'>
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
                            type='submit'
                            theme={customButtonTheme}
                            color='dark'
                            className=''
                        >
                            <TbEdit className={"text-lg"} />
                            <span className='ml-1'>{"Save"}</span>
                        </Button>
                    </Form>
                )}
            </Formik>
        </LoadingLayout>
    );
};

export default VcardEditor;
