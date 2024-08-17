"use client";
import * as React from "react";
import Header from "@/app/_components/Common/Headers/Header";
import Footer from "@/app/_components/Common/Footers/Footer";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { Button } from "flowbite-react";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { Field, Form, Formik } from "formik";
import InputWithLabel from "@/app/_components/Common/Form/InputWithLabel";
import { useTranslations } from "next-intl";
import InputField from "@/app/_components/Common/Form/InputField";
import TextAreaField from "@/app/_components/Common/Form/TextAreaField";
import { UserService } from "@/app/_core/api/services/UserService";
import Swal from "sweetalert2";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import ErrorsViewer from "@/app/_components/Common/Errors/ErrorsViewer";

export interface IContactPageProps {}
export interface ContactFormProps {
    email: string;
    content: string;
    name: string;
    firstname: string;
}

export default function ContactPage(props: IContactPageProps) {
    const initialValues: ContactFormProps = {
        email: "",
        content: "",
        name: "",
        firstname: "",
    };
    const __ = useTranslations("Text");
    const __A = useTranslations("Actions");
    const [isLoading, setIsLoading] = React.useState(false);
    const [errors, setErrors] = React.useState<string | Array<string>>("");

    const doContact = (values: ContactFormProps) => {
        console.log(values);
        UserService.sendEmail(
            values.name,
            values.firstname,
            values.email,
            values.content,
        )
            .then(async (res) => {
                // setErrors("");
                const Toast = Swal.mixin({
                    toast: false,
                    position: "center",
                    showConfirmButton: false,
                    timer: 3500,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                if (res.state) {
                    Toast.fire({
                        icon: "success",
                        title: __("email_success"),
                    }).then(null);
                } else {
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
                setIsLoading(false);
            });
    };

    return (
        <Formik
            onSubmit={doContact}
            initialValues={initialValues}
            className="min-h-screen"
        >
            <div>
                <Header />

                <section className="mb-8">
                    <div className="">
                        <ContainerLayout className="py-10 bg-white rounded-2xl">
                            {/*Contact Us*/}
                            <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
                                <div className="max-w-2xl lg:max-w-5xl mx-auto">
                                    <div className="text-center">
                                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                            {"Contact us"}
                                        </h1>
                                        <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                            {
                                                "We'd love to talk about how we can help you."
                                            }
                                        </p>
                                    </div>

                                    <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
                                        {/*Card*/}
                                        <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8 ">
                                            <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                                {"Fill in the form"}
                                            </h2>

                                            <Form>
                                                <div className="grid gap-4">
                                                    {/*Grid*/}
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <InputWithLabel
                                                            labelFor="firstname"
                                                            labelTitle={__(
                                                                "your_firstname",
                                                            )}
                                                        >
                                                            <InputField
                                                                labelFor="firstname"
                                                                name="firstname"
                                                                id="firstname"
                                                            />
                                                        </InputWithLabel>

                                                        <InputWithLabel
                                                            labelFor="name"
                                                            labelTitle={__(
                                                                "your_name",
                                                            )}
                                                        >
                                                            <InputField
                                                                labelFor="name"
                                                                name="name"
                                                                id="name"
                                                            />
                                                        </InputWithLabel>
                                                    </div>
                                                    {/*End Grid*/}

                                                    <InputWithLabel
                                                        labelFor="email"
                                                        labelTitle={__("email")}
                                                    >
                                                        <InputField
                                                            manualType="email"
                                                            labelFor="email"
                                                            name="email"
                                                            id="email"
                                                        />
                                                    </InputWithLabel>

                                                    <div className="w-full">
                                                        <InputWithLabel
                                                            labelFor="content"
                                                            labelTitle={__(
                                                                "your_message",
                                                            )}
                                                        >
                                                            <Field
                                                                name="content"
                                                                as={"textarea"}
                                                                rows="4"
                                                                className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300/40 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            />
                                                        </InputWithLabel>
                                                    </div>
                                                </div>
                                                {/*End Grid */}
                                                <div className="mt-4 grid">
                                                    <Button
                                                        type="submit"
                                                        theme={
                                                            customButtonTheme
                                                        }
                                                        color="dark"
                                                    >
                                                        {__A("send")}
                                                    </Button>
                                                </div>

                                                <ErrorsViewer errors={errors} />

                                                <div className="mt-3 text-center">
                                                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                        {
                                                            "We'll get back to you in 1-2 business days."
                                                        }
                                                    </p>
                                                </div>
                                            </Form>
                                        </div>
                                        {/*End Card*/}

                                        <div className="divide-y divide-gray-200">
                                            {/*Icon Block*/}
                                            <div className="flex gap-x-7 py-6">
                                                <svg
                                                    className="flex-shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                                                    <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                                                </svg>
                                                <div className="grow">
                                                    <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                                        {"Contact us by email"}
                                                    </h3>
                                                    <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                                        {
                                                            "If you wish to write us an email instead please use"
                                                        }
                                                    </p>
                                                    <a
                                                        href="mailto:customers.support@konect.network"
                                                        className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                                                    >
                                                        customers.support@konect.network
                                                    </a>
                                                </div>
                                            </div>
                                            {/*End Icon Block*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*End Contact Us*/}
                        </ContainerLayout>
                    </div>
                </section>
                <Footer />
            </div>
        </Formik>
    );
}
