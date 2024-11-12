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
import {
    dashboardRoute,
    passwordEmailRoute,
    registerRoute,
} from "@/app/_core/config/routes";
import { IntentInterface } from "@/app/_core/interfaces/appInterfaces";
import { intent_processor } from "@/app/_core/utils/functions";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { getCookie, setCookie } from "cookies-next";
import { Button, Label } from "flowbite-react";
import { Form, Formik } from "formik";
import $ from "jquery";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Swal from "sweetalert2";
import * as Yup from "yup";
import CheckBoxField from "../../_components/Common/Form/CheckBoxField";
import { useParams, useSearchParams } from "next/navigation";

export interface ILoginFormPageProps {}

export default function LoginFormPage({}: ILoginFormPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [intentData, setIntentData] = useState<IntentInterface | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | Array<string>>("");

    const T = useTranslations("Auth");
    const params = useSearchParams();
    const redirectTo = params.get("redirectTo");
    const SigninSchema = Yup.object().shape({
        email: Yup.string()
            .email(T("validate_email"))
            .required(T("validate_required")),
        password: Yup.string()
            .min(8, T("Password.validate_min"))
            .required(T("validate_required")),
        rememberMe: Yup.bool(),
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
    }, [showPassword]);

    function doAuth(values: {
        email: string;
        password: string;
        rememberMe: boolean;
    }) {
        setIsLoading(true);
        // if (!values.email || !values.password) return;

        UserService.login(values.email, values.password)
            .then(async (res) => {
                setErrors("");
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
                if (res.state) {
                    // SET COOKIE
                    setCookie(AUTH_TOKEN_NAME, res.data.authToken, {
                        // httpOnly: true,
                        // path: "/"
                    });
                    Toast.fire({
                        icon: "success",
                        title: T("login_success"),
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
                            if (redirectTo != null) {
                                window.location.href = redirectTo;
                            } else {
                                window.location.href = dashboardRoute.path;
                            }
                        }
                    });
                } else {
                    Toast.fire({
                        icon: "error",
                        title: T("login_fail"),
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
                    {T("login")}
                </h1>

                <Formik
                    onSubmit={doAuth}
                    validationSchema={SigninSchema}
                    initialValues={{
                        email: "",
                        password: "",
                        passwordRe: "",
                        rememberMe: true,
                    }}
                >
                    <Form className='flex lg:w-96 sm:w-80 w-72 flex-col gap-4'>
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

                        <div className='flex items-center justify-between gap-2 mb-2'>
                            <div className='flex items-center gap-2 mb-2'>
                                <CheckBoxField
                                    labelFor='remember'
                                    name='rememberMe'
                                />
                                {/* <Field type="checkbox" name="remberMe" /> */}
                                <Label htmlFor='remember'>
                                    {T("remember_me")}
                                </Label>
                            </div>
                            <Link
                                href={passwordEmailRoute.path}
                                className='text-sm font-medium text-gray-500 hover:underline hover:text-gray-800 dark:text-primary-500'
                            >
                                {T("forgot_password")}
                            </Link>
                        </div>
                        <Button
                            color='dark'
                            theme={customButtonTheme}
                            type='submit'
                        >
                            {T("login")}
                        </Button>

                        <ErrorsViewer errors={errors} />

                        <p className='text-sm py-2 text-end font-light text-gray-500 dark:text-gray-400'>
                            {T("dont_yet")}?{" "}
                            <a
                                href={registerRoute.path}
                                className='font-medium text-gray-900 hover:underline dark:text-primary-500'
                            >
                                {T("register")}
                            </a>
                        </p>
                    </Form>
                </Formik>
            </div>
        </LoadingLayout>
    );
}
