"use client";

// import { UserVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import VcardEditor from "../../../_components/Common/Vcard/VcardEditor";

import { useAppSelector } from "@/app/_store/hooks";
import { MutatingDots } from "react-loader-spinner";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { Avatar, Button, FileInput, Label } from "flowbite-react";
import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { customFileInputTheme } from "@/app/_styles/flowbite/form";
import { TbEdit } from "react-icons/tb";
import InputField from "@/app/_components/Common/Form/InputField";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
export interface SettingsPageProps {}

export interface initialType {
    firstname: string;
    name: string;
    email: string;
    password: string;
    passwordRe: string;
}

export default function SettingsPage(props: SettingsPageProps) {
    const user = useAppSelector((state) => state.auth.currentUser);
    const __a = useTranslations("Actions");
    const __ = useTranslations("Text");
    const [selectedImage, setSelectedImage] = useState<
        string | ArrayBuffer | null
    >(null);
    const [file, setFile] = useState<Blob | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const initialValues: initialType = {
        firstname: user?.firstname ?? "",
        name: user?.name ?? "",
        email: user?.email,
        password: "",
        passwordRe: "",
    };
    const [errors, setErrors] = useState<string | Array<string>>("");

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

    const doUpdateAccount = () => {
        
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
    else {
        return (
            user && (
                <Formik
                    initialValues={initialValues}
                    onSubmit={doUpdateAccount}
                >
                    {(formProps) => (
                        <div className='max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto'>
                            {/* Card */}
                            <div className='bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800'>
                                <div className='mb-8'>
                                    <h2 className='text-xl font-bold text-gray-800 dark:text-neutral-200'>
                                        Profile
                                    </h2>
                                    <p className='text-sm text-gray-600 dark:text-neutral-400'>
                                        Manage your name, password and account
                                        settings.
                                    </p>
                                </div>
                                <form>
                                    {/* Grid */}
                                    <div className='grid sm:grid-cols-12 gap-2 sm:gap-6'>
                                        <div className='sm:col-span-3'>
                                            <label className='inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200'>
                                                Profile photo
                                            </label>
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-9'>
                                            <div className='flex items-center gap-5'>
                                                <div className='w-20 h-20 flex justify-center rounded-full overflow-hidden'>
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
                                                            size={"lg"}
                                                            alt='Kuser Image'
                                                            theme={
                                                                customAvatarTheme
                                                            }
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            theme={
                                                                customAvatarTheme
                                                            }
                                                            size={"lg"}
                                                        />
                                                    )}
                                                </div>

                                                <div className='flex gap-x-2'>
                                                    <div className='flex flex-col md:items-start items-center'>
                                                        <div className='cursor-pointer rounded-md flex items-center space-x-1 bg-gray-50 text-gray-500 w-max px-4 py-1 border border-gray-300/40 hover:text-gray-600 transition-colors'>
                                                            <TbEdit />
                                                            <Label
                                                                className='text-gray-500 font-normal cursor-pointer hover:text-gray-600 transition-colors'
                                                                htmlFor='file-upload-helper-text'
                                                                value={__a(
                                                                    "choose_image",
                                                                )}
                                                            />
                                                        </div>
                                                        <FileInput
                                                            className='hidden'
                                                            accept='.jpg,.jpeg,.png'
                                                            theme={
                                                                customFileInputTheme
                                                            }
                                                            color={"gray"}
                                                            id='file-upload-helper-text'
                                                            helperText='PNG, JPG or GIF (MAX. 800x400px).'
                                                            onChange={(
                                                                e: React.ChangeEvent<HTMLInputElement>,
                                                            ) => {
                                                                setFile(
                                                                    e.target
                                                                        .files![0],
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
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-3'>
                                            <label
                                                htmlFor='af-account-full-name'
                                                className='inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200'
                                            >
                                                Full name
                                            </label>
                                            <div className='hs-tooltip inline-block'>
                                                <svg
                                                    className='hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600'
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    width={16}
                                                    height={16}
                                                    fill='currentColor'
                                                    viewBox='0 0 16 16'
                                                >
                                                    <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                                                    <path d='m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z' />
                                                </svg>
                                                <span
                                                    className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700'
                                                    role='tooltip'
                                                >
                                                    Displayed on public forums,
                                                    such as Preline
                                                </span>
                                            </div>
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-9'>
                                            <div className='sm:flex gap-4'>
                                                <div className='w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10'>
                                                    <InputField
                                                        labelFor='name'
                                                        name='name'
                                                        id='name'
                                                        placeholder={__(
                                                            "your_name",
                                                        )}
                                                    />
                                                </div>

                                                <div className='w-full border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative'>
                                                    <InputField
                                                        labelFor='firstname'
                                                        name='firstname'
                                                        id='firstname'
                                                        placeholder={__(
                                                            "your_firstname",
                                                        )}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-3'>
                                            <label
                                                htmlFor='af-account-email'
                                                className='inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200'
                                            >
                                                Email
                                            </label>
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-9'>
                                            <InputField
                                                labelFor='email'
                                                name='email'
                                                id='email'
                                                placeholder={__("your_email")}
                                            />
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-3'>
                                            <label
                                                htmlFor='af-account-password'
                                                className='inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200'
                                            >
                                                Password
                                            </label>
                                        </div>
                                        {/* End Col */}
                                        <div className='sm:col-span-9'>
                                            <div className='flex flex-col'>
                                                <span className='w-full mb-4'>
                                                    <InputField
                                                        labelFor='password'
                                                        name='password'
                                                        id='password'
                                                        placeholder={__(
                                                            "password",
                                                        )}
                                                    />
                                                </span>
                                                <span className='w-full'>
                                                    <InputField
                                                        labelFor='passwordRe'
                                                        name='passwordRe'
                                                        id='passwordRe'
                                                        placeholder={__(
                                                            "password_confirm",
                                                        )}
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* End Grid */}
                                    <div className='mt-5 flex justify-end gap-x-2'>
                                        <Button
                                            type='submit'
                                            theme={customButtonTheme}
                                            color='dark'
                                            className=''
                                        >
                                            <TbEdit className={"text-lg"} />
                                            <span className='ml-1'>
                                                {"Save"}
                                            </span>
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            {/* End Card */}
                        </div>
                    )}
                </Formik>
            )
        );
    }
}
