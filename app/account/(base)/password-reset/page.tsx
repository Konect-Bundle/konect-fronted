"use client";
import { getCookie } from "cookies-next";
import { UserService } from "@/app/_core/api/services/UserService";
import { User } from "@/app/_core/models/User";
import { useEffect, useState } from "react";
import { dashboardRoute, loginRoute } from "@/app/_core/config/routes";
import { ucfirst } from "@/app/_core/utils/functions";

import ContainerLayout from "@/app/_components/Layouts/Container";
// import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import VcardEditor from "../../../_components/Common/Vcard/VcardEditor";

import Header from "@/app/_components/Common/Headers/Header";
import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import LoadingLayout from "@/app/_components/Layouts/LoadingLayout";
import { Formik, Form } from "formik";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { Button } from "flowbite-react";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import InputField from "@/app/_components/Common/Form/InputField";
import { AUTH_TOKEN_NAME } from "@/app/_core/config/constants";
import Swal from "sweetalert2";
export interface IPasswordResetPageProps {}

export default function PasswordResetPage(props: IPasswordResetPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __ = useTranslations("Text");

    const [isLoading, setIsLoading] = useState(false);
    const handleSubmitForm = (values: {
        oldPassword: string;
        newPassword: string;
        passwordRe: string;
    }) => {
        setIsLoading(true);

        var token = getCookie(AUTH_TOKEN_NAME);

        if (token) {
            UserService.updatePassword(
                values.newPassword,
                values.oldPassword,
                token,
            ).then((rs) => {
                setIsLoading(false);

                if (rs.state) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: __("password_update_successfully"),
                        showConfirmButton: false,
                        timer: 2500,
                    }).then(() => {
                        window.location.href = dashboardRoute.path;
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: rs.msg,
                    });
                }
            });
        }
    };

    if (!user)
        return (
            <div className='w-screen h-screen flex justify-center items-center'>
                <MutatingDots
                    visible={true}
                    height='80'
                    width='80'
                    color='#e4dc1a'
                    secondaryColor='#e4dc1a'
                    radius='12.5'
                    ariaLabel='mutating-dots-loading'
                    wrapperStyle={{}}
                    wrapperClass=''
                />
            </div>
        );

    return (
        user && (
            <section className='grid grid-cols-8 gap-4 lg:pt-12 md:pt-4 pt-4'>
                <div className='lg:col-span-2 col-span-8 px-0 lg:py-0 md:py-3 py-0'>
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className='text-2xl font-semibold'
                    >
                        {__("password_update")}
                    </h2>

                    <div className='w-14 h-1 mt-2 bg-gray-400'></div>

                    <p className='text-gray-300/85 text-sm mt-4 font-light'>
                        {__("password_update_text")}
                    </p>
                </div>
                <div className='lg:col-span-6 col-span-8'>
                    <LoadingLayout isLoading={isLoading}>
                        <Formik
                            initialValues={{
                                oldPassword: "",
                                newPassword: "",
                                passwordRe: "",
                            }}
                            onSubmit={handleSubmitForm}
                        >
                            {(formProps) => (
                                <Form className='flex flex-col items-end'>
                                    <div className='bg-white rounded-lg mb-6 w-full p-8'>
                                        <h2 className='pb-6 font-semibold text-xl '>
                                            {__("password_update")}
                                        </h2>
                                        <div className='mt-3'>
                                            <InputWithLabel
                                                labelFor={"oldPassword"}
                                                labelTitle={__("old_password")}
                                            >
                                                <InputField
                                                    labelFor='oldPassword'
                                                    name='oldPassword'
                                                />
                                            </InputWithLabel>
                                        </div>
                                        <div className='mt-3'>
                                            <InputWithLabel
                                                labelFor={"newPassword"}
                                                labelTitle={__("new_password")}
                                            >
                                                <InputField
                                                    labelFor='newPassword'
                                                    name='newPassword'
                                                />
                                            </InputWithLabel>
                                        </div>
                                        <div className='mt-3'>
                                            <InputWithLabel
                                                labelFor={"passwordRe"}
                                                labelTitle={__(
                                                    "password_confirm",
                                                )}
                                            >
                                                <InputField
                                                    labelFor='passwordRe'
                                                    name='passwordRe'
                                                />
                                            </InputWithLabel>
                                        </div>
                                    </div>
                                    <Button
                                        type='submit'
                                        theme={customButtonTheme}
                                        color='dark'
                                        className=''
                                    >
                                        <span className='ml-1'>{"Save"}</span>
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </LoadingLayout>
                </div>
            </section>
        )
    );
}
