"use client";
import ErrorsViewer from "@/app/_components/Common/Errors/ErrorsViewer";
import InputField from "@/app/_components/Common/Form/InputField";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import LoadingLayout from "@/app/_components/Layouts/LoadingLayout";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import { UserService } from "@/app/_core/api/services/UserService";
import {
    AUTH_TOKEN_NAME,
    INTENT_COOKIE_NAME,
} from "@/app/_core/config/constants";
import { loginRoute, settingsProfilRoute } from "@/app/_core/config/routes";
import { IntentInterface } from "@/app/_core/interfaces/appInterfaces";
import { intent_processor } from "@/app/_core/utils/functions";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { getCookie, setCookie } from "cookies-next";
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import $ from "jquery";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Swal from "sweetalert2";
import * as Yup from "yup";

export interface IRegisterFormPageProps {
    referal_code: string | null;
}

export default function RegisterFormPage({
    referal_code,
}: IRegisterFormPageProps) {
    const [intentData, setIntentData] = useState<IntentInterface | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRe, setShowPasswordRe] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | Array<string>>("");

    const T = useTranslations("Auth");
    const __ = useTranslations("Text");

    const SignupSchema = Yup.object().shape({
        name: Yup.string().required(T("validate_required")),
        firstname: Yup.string().required(T("validate_required")),
        email: Yup.string()
            .email(T("validate_email"))
            .required(T("validate_required")),
        password: Yup.string()
            .min(8, T("Password.validate_min"))
            .required(T("validate_required")),
        passwordRe: Yup.string()
            .min(8, T("Password.validate_min"))
            .oneOf([Yup.ref("password")], __("confirm_password_doesnt_match"))
            .required(T("validate_required")),
    });

    useEffect(() => {
        if (localStorage.getItem(INTENT_COOKIE_NAME) && !intentData) {
            // window.location.href = dashboardRoute.path;
            setIntentData(
                JSON.parse(localStorage.getItem(INTENT_COOKIE_NAME)!),
            );
        }
    }, [intentData]);

    useEffect(() => {
        var iconDiv = $("#password").parent().find("div");
        var data = iconDiv.data("testid");
        if (data == "right-icon") {
            iconDiv.addClass("cursor-pointer z-50 pointer-events-auto");
            iconDiv.on("click", () => {
                setShowPassword(!showPassword);
            });
        }

        var iconDiv = $("#passwordRe").parent().find("div");
        var data = iconDiv.data("testid");
        if (data == "right-icon") {
            iconDiv.addClass("cursor-pointer z-50 pointer-events-auto");
            iconDiv.on("click", () => {
                setShowPasswordRe(!showPasswordRe);
            });
        }
    }, [showPassword, showPasswordRe]);

    function doAuth(values: {
        name: string;
        firstname: string;
        email: string;
        password: string;
        passwordRe: string;
    }) {
        setIsLoading(true);
        // if (!values.email || !values.password) return;

        const Toast = Swal.mixin({
            toast: true,
            position: "bottom-right",
            showConfirmButton: false,
            timer: 3500,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            },
        });

        UserService.register(
            values.name,
            values.firstname,
            values.email,
            values.password,
            referal_code,
        )
            .then(async (res) => {
                setErrors("");

                if (res.state) {
                    // SET COOKIE
                    setCookie(AUTH_TOKEN_NAME, res.data.authToken, {
                        // httpOnly: true,
                        // path: "/"
                    });
                    Toast.fire({
                        icon: "success",
                        title: T("register_success"),
                    }).then(() => {
                        if (intentData) {
                            intent_processor(
                                intentData,
                                getCookie(AUTH_TOKEN_NAME)!,
                            ).then((urlIntent) => {
                                localStorage.removeItem(INTENT_COOKIE_NAME);
                                window.location.href = urlIntent;
                            });
                        } else {
                            window.location.href = settingsProfilRoute.path;
                        }
                    });
                } else {
                    Toast.fire({
                        icon: "error",
                        title: res.msg,
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
            <div className='w-full h-full flex  flex-col justify-center items-center'>
                <h1 className='text-2xl text-black-semibold text-center font-bold md:py-6 p-4'>
                    {T("register")}
                </h1>

                <Formik
                    onSubmit={doAuth}
                    validationSchema={SignupSchema}
                    initialValues={{
                        name: "",
                        firstname: "",
                        email: "",
                        password: "",
                        passwordRe: "",
                    }}
                >
                    <Form className='flex lg:w-96 sm:w-80 w-72 flex-col gap-4'>
                        <InputWithLabel
                            labelFor='name'
                            labelTitle={T("your_name")}
                        >
                            <InputField labelFor='name' name='name' required />
                        </InputWithLabel>

                        <InputWithLabel
                            labelFor='firstname'
                            labelTitle={__("your_firstname")}
                        >
                            <InputField
                                labelFor='firstname'
                                name='firstname'
                                required
                            />
                        </InputWithLabel>

                        <InputWithLabel
                            labelFor='email'
                            labelTitle={T("your_email")}
                        >
                            <InputField
                                labelFor='email'
                                name='email'
                                required
                            />
                        </InputWithLabel>

                        <InputWithLabel
                            labelFor='password'
                            labelTitle={T("your_password")}
                        >
                            <InputField
                                rightIcon={showPassword ? TbEyeOff : TbEye}
                                manualType={showPassword ? "text" : "password"}
                                labelFor='password'
                                name='password'
                                required
                            />
                        </InputWithLabel>
                        <InputWithLabel
                            labelFor='passwordRe'
                            labelTitle={T("confirm_password")}
                        >
                            <InputField
                                rightIcon={showPasswordRe ? TbEyeOff : TbEye}
                                manualType={
                                    showPasswordRe ? "text" : "password"
                                }
                                labelFor='passwordRe'
                                name='passwordRe'
                                required
                            />
                        </InputWithLabel>

                        <Button
                            color='dark'
                            theme={customButtonTheme}
                            type='submit'
                        >
                            {T("register")}
                        </Button>

                        <ErrorsViewer errors={errors} />

                        <p className='text-sm py-2 text-end font-light text-gray-500 dark:text-gray-400'>
                            {T("dont_yet")}?{" "}
                            <a
                                href={loginRoute.path}
                                className='font-medium text-gray-900 hover:underline dark:text-primary-500'
                            >
                                {T("login")}
                            </a>
                        </p>
                    </Form>
                </Formik>
            </div>
        </LoadingLayout>
    );
}
