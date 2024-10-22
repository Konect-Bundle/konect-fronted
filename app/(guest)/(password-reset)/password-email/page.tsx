"use client";
import ErrorsViewer from "@/app/_components/Common/Errors/ErrorsViewer";
import InputField from "@/app/_components/Common/Form/InputField";
import Header from "@/app/_components/Common/Headers/Header";
import LoadingLayout from "@/app/_components/Layouts/LoadingLayout";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import { UserService } from "@/app/_core/api/services/UserService";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { Alert, Button } from "flowbite-react";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TbCheck } from "react-icons/tb";
import Swal from "sweetalert2";
import * as Yup from "yup";

export interface IPasswordEmailFormPageProps {}

export default function PasswordEmailFormPage(
    props: IPasswordEmailFormPageProps,
) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const [errors, setErrors] = useState<string | Array<string>>("");

    const T = useTranslations("Auth");
    const __ = useTranslations("Text");

    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email(T("validate_email"))
            .required(T("validate_required")),
    });

    function doSendEmail(values: { email: string }) {
        setIsLoading(true);
        // if (!values.email || !values.password) return;

        UserService.sendResetEmailLink(values.email)
            .then(async (res) => {
                setErrors("");
                const Toast = Swal.mixin({
                    toast: false,
                    position: "center",
                    showConfirmButton: true,
                });
                if (res.state) {
                    Toast.fire({
                        icon: "success",
                        title: __("password_email_success"),
                    }).then(() => {
                        setIsSent(true);
                    });
                }
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
                closeLoading();
            });
    }
    const closeLoading = () => {
        setIsLoading(false);
    };

    return (
        <LoadingLayout isLoading={isLoading}>
            <Header />

            <div className='flex justify-center'>
                <div className='md:w-[40rem] w-80 flex flex-col justify-center items-center'>
                    <h2
                        style={{ whiteSpace: "pre-wrap" }}
                        className='text-2xl font-semibold  md:pt-4 p-2'
                    >
                        {__("password_reset_title")}
                    </h2>

                    <p className='text-gray-300/85 text-sm mt-1 mb-4 font-light text-center'>
                        {__("password_reset_description")}
                    </p>

                    {!isSent ? (
                        <Formik
                            onSubmit={doSendEmail}
                            validationSchema={SigninSchema}
                            initialValues={{
                                email: "",
                            }}
                        >
                            <Form className='flex justify-center flex-col gap-4 w-9/12 space-y-2'>
                                <InputField
                                    labelFor='email'
                                    name='email'
                                    required
                                />

                                <Button
                                    color='dark'
                                    theme={customButtonTheme}
                                    type='submit'
                                >
                                    {__("password_reset_submit_button")}
                                </Button>

                                <ErrorsViewer errors={errors} />
                            </Form>
                        </Formik>
                    ) : (
                        <Alert color='success' icon={TbCheck}>
                            <span className='font-medium'>
                                {__("password_email_success")}
                            </span>
                        </Alert>
                    )}
                </div>
            </div>
        </LoadingLayout>
    );
}
