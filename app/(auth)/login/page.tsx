"use client";
import { useEffect, useState } from "react";
import { Button, Checkbox, Label } from "flowbite-react";
import { TbEyeOff, TbEye } from "react-icons/tb";
import $ from "jquery";
import { UserService } from "@/app/_core/api/services/UserService";
import { dashboardRoute } from "@/app/_core/config/routes";
import Swal from "sweetalert2";
import { getCookie, setCookie } from "cookies-next";
import {
    AUTH_TOKEN_NAME,
    INTENT_COOKIE_NAME,
} from "@/app/_core/config/constants";
import { IntentInterface } from "@/app/_core/interfaces/appInterfaces";
import { intent_processor } from "@/app/_core/utils/functions";
import { Field, Form, Formik } from "formik";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import InputField from "@/app/_components/Common/Form/InputField";
import CheckBoxField from '../../_components/Common/Form/CheckBoxField';
import { customButtonTheme } from "@/app/_styles/flowbite/button";

export interface ILoginFormPageProps { }

export default function LoginFormPage(props: ILoginFormPageProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [intentData, setIntentData] = useState<IntentInterface | null>(null);
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

    function doAuth(values: {email: string, password: string, rememberMe: boolean}) {

        if (!values.email || !values.password) return;

        UserService.login(values.email, values.password).then(async (res) => {
            // SET COOKIE
            setCookie(AUTH_TOKEN_NAME, res.data.authToken, {
                // httpOnly: true,
                // path: "/"
            });

            const Toast = Swal.mixin({
                toast: true,
                position: "bottom-right",
                showConfirmButton: false,
                timer: 3000,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });

            if (res.state) {
                Toast.fire({
                    icon: "success",
                    title: res.msg,
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
                        window.location.href = dashboardRoute.path;
                    }
                });
            } else {
                Toast.fire({
                    icon: "error",
                    title: res.msg,
                });
            }
        });
    }

    return (
        <div>
            <h2 className="text-2xl text-black-semibold text-center font-bold md:py-10 p-4">Login</h2>

<Formik onSubmit={doAuth} initialValues={{ email: "", password: "", rememberMe: false }}>
    <Form className="flex lg:w-96 sm:w-80 w-72 flex-col gap-4">
        <InputWithLabel labelFor="email" labelTitle="Your email">
            <InputField labelFor="email" name="email" required />
        </InputWithLabel>

        <InputWithLabel labelFor="password" labelTitle="Your password">
            <InputField rightIcon={showPassword ? TbEyeOff : TbEye} manualType={showPassword ? "text" : "password"} labelFor="password" name="password" required />
        </InputWithLabel>
        
        <div className="flex items-center gap-2 mb-2">
            <CheckBoxField labelFor="remember" name="rememberMe"  />
            {/* <Field type="checkbox" name="remberMe" /> */}
            <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button color="dark" theme={customButtonTheme} type="submit">
            Connexion
        </Button>
    </Form>
</Formik>
        </div>
    );
}
