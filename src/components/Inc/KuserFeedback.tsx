"use client";
import { ROOT_ASSETS_URL } from "@/core/config/constants";
import { homeRoute } from "@/core/config/routes";
import { ucfirst } from "@/core/utils/functions";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customTextInputTheme } from "@/styles/flowbite/form";
import { Button } from "flowbite-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { TbX } from "react-icons/tb";

import { KoUserInfoInterface } from "@/core/interfaces/appInterfaces";
import { User } from "@/core/models/User";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import CustomPhoneInput from "../Common/Form/CustomPhoneInput";
import InputField from "../Common/Form/InputField";
import InputWithLabel from "../Common/Form/InputWithLabel";
import { KonectService } from "@/core/api/services/KonectService";
import Swal from "sweetalert2";
import { useState } from "react";

interface KuserBlockProps {
    kuser: User;
    callback: () => void;
}

customTextInputTheme!["addon"] =
    "inline-flex items-center rounded-l-md border border-r-0 border-gray-300/45 bg-gray-200 px-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400";

export default function KuserFeedback({ kuser, callback }: KuserBlockProps) {
    const initialValues: KoUserInfoInterface = {
        name: "",
        firstname: "",
        email: "",
        phone: "",
    };

    const __ = useTranslations("Text");
    const [isLoading, setLoading] = useState<boolean>(false);

    const handleShareInfo = (values: KoUserInfoInterface) => {
        setLoading(true);
        KonectService.makeFeed(
            kuser.uuid!,
            values.name,
            values.firstname,
            values.email,
            values.phone,
        ).then((rs) => {
            setLoading(false);
            Swal.fire({
                title: "Sent!",
                text: "You successfully sent your informations",
                icon: "success",
                timer: 1500,
            }).then(() => {
                callback();
            });
        });
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleShareInfo}>
            {(formikForm) => (
                <motion.div
                    animate={{ x: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                    }}
                    className='fixed top-0 left-0 z-[100] h-screen w-screen flex justify-center items-center overflow-y-auto'
                >
                    <div className='bg-gray-700 opacity-30 h-screen w-screen'></div>
                    <div className='md:py-6 md:px-0 absolute w-screen h-screen md:w-3/4 flex justify-center items-center'>
                        <div className='w-screen h-screen md:w-2/4 bg-white md:rounded-md min-w-fit overflow-hidden overflow-y-scroll px-8 py-4 md:p-14'>
                            <span className='flex justify-between py-4  md:mb-24 mb-0'>
                                <Link
                                    href={homeRoute.path}
                                    className='flex items-center space-x-1 rtl:space-x-reverse'
                                >
                                    <Image
                                        src={
                                            ROOT_ASSETS_URL + "/images/logo.png"
                                        }
                                        width={500}
                                        height={500}
                                        className='w-8'
                                        alt='Flowbite Logo'
                                    />
                                    <span className='ml-1 font-semibold text-3xl'>
                                        nect
                                    </span>
                                </Link>
                                <span
                                    className='cursor-pointer'
                                    id='closeSendContact'
                                    onClick={() => {
                                        callback();
                                    }}
                                >
                                    <TbX className="'w-9 h-9 text-gray-800'" />
                                </span>
                            </span>
                            <div className='flex flex-col justify-center'>
                                <h2 className=' text-xl font-bold mb-4 text-gray-800'>
                                    {__("tell_me_more")}
                                </h2>
                                <div className='text-gray-400 font-thin text-sm flex space-x-4 p-4 items-center bg-gray-200 rounded-md'>
                                    <MdOutlineConnectWithoutContact className='w-6 h-6 text-gray-600' />
                                    <p>
                                        {__("help")}{" "}
                                        <span className='font-bold text-gray-600'>
                                            {ucfirst(kuser.firstname!) + "!"}
                                        </span>{" "}
                                        {__("to_know_more")}
                                    </p>
                                </div>
                                <Form
                                    className='max-w-md mx-auto  md:mx-0 mt-6 w-full'
                                    method='POST'
                                >
                                    <div className='grid md:grid-cols-2 md:gap-6'>
                                        <div className='mb-2'>
                                            <InputWithLabel
                                                labelFor='firstname'
                                                labelTitle={__("given_name")}
                                                className='w-full col-span-2'
                                                labelClassName=' text-sm'
                                            >
                                                <InputField
                                                    labelFor='firstname'
                                                    id='firstname'
                                                    name='firstname'
                                                    required
                                                />
                                            </InputWithLabel>
                                        </div>
                                        <div className='mb-2'>
                                            <InputWithLabel
                                                labelFor='name'
                                                labelTitle={__("family_name")}
                                                className='w-full col-span-2'
                                                labelClassName=' text-sm'
                                            >
                                                <InputField
                                                    labelFor='name'
                                                    id='name'
                                                    name='name'
                                                    required
                                                />
                                            </InputWithLabel>
                                        </div>

                                        <div className='mb-2'>
                                            <InputWithLabel
                                                labelFor='email'
                                                labelTitle={__("email")}
                                                className='w-full col-span-2'
                                                labelClassName=' text-sm'
                                            >
                                                <InputField
                                                    labelFor='email'
                                                    type='email'
                                                    id='email'
                                                    name='email'
                                                    required
                                                />
                                            </InputWithLabel>
                                        </div>

                                        <div className='mb-2'>
                                            <InputWithLabel
                                                labelFor='phone'
                                                labelTitle={__("phone_number")}
                                                className='w-full col-span-2'
                                                labelClassName=' text-sm'
                                            >
                                                <div className='flex items-center'>
                                                    <CustomPhoneInput
                                                        value={
                                                            formikForm.values
                                                                .name
                                                        }
                                                        onChange={(val) => {
                                                            formikForm.setFieldValue(
                                                                "phone",
                                                                val,
                                                            );
                                                        }}
                                                    />
                                                </div>
                                            </InputWithLabel>
                                        </div>
                                        <Button
                                            theme={customButtonTheme}
                                            color='dark'
                                            type='submit'
                                            className='mt-4'
                                        >
                                            {"Send"}
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </Formik>
    );
}
