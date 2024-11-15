"use client";
import ErrorsViewer from "@/app/_components/Common/Errors/ErrorsViewer";
import InputField from "@/app/_components/Common/Form/InputField";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import Header from "@/app/_components/Common/Headers/Header";
import LoadingLayout from "@/app/_components/Layouts/LoadingLayout";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import { UserService } from "@/app/_core/api/services/UserService";
import { loginRoute } from "@/app/_core/config/routes";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { Button } from "flowbite-react";
import { Form, Formik } from "formik";
import $ from "jquery";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import Swal from "sweetalert2";
import * as Yup from "yup";

export interface IRegisterPasswordFormPagePageProps {}

export default function RegisterPasswordFormPagePage({}: IRegisterPasswordFormPagePageProps) {
    const router = useSearchParams();
    const token = router.get("token");
    const email = router.get("email");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRe, setShowPasswordRe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | Array<string>>("");

    const T = useTranslations("Auth");
    const __ = useTranslations("Text");

    const SignupSchema = Yup.object().shape({
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

    function doReset(values: {
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

        UserService.resetPassword(
            values.email,
            values.password,
            values.passwordRe,
            token, // Token
        )
            .then(async (res) => {
                setErrors("");

                if (res.state) {
                    Toast.fire({
                        icon: "success",
                        title: __("password_reset_success"),
                    }).then(() => {
                        window.location.href = loginRoute.path;
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
            <Header />

            <div className='w-full h-full flex  flex-col justify-center items-center'>
                <h2 className='text-2xl text-black-semibold text-center font-bold md:py-6 p-4'>
                    {__("password_reset_title")}
                </h2>

                <Formik
                    onSubmit={doReset}
                    validationSchema={SignupSchema}
                    initialValues={{
                        email: email ?? "",
                        password: "",
                        passwordRe: "",
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
                    </Form>
                </Formik>
            </div>
        </LoadingLayout>
    );
}
