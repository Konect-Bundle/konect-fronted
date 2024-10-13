"use client";
import Company from "@/app/_core/models/Company";
import { useState } from "react";
import { useAppSelector } from "@/app/_store/hooks";
import { useTranslations } from "next-intl";
import CompanyMember from "@/app/_core/models/CompanyMember";
import { Button } from "flowbite-react";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { ucfirst } from "@/app/_core/utils/functions";
import { Form, Formik } from "formik";
import { UserCompanySchema } from "@/app/_core/schemas/AppFormsSchema";
import InputWithLabel from "../../Common/Form/InputWithLabel";
import InputField from "../../Common/Form/InputField";
import ApiErrorsManagement from "@/app/_core/api/errors/apiErrorsManagement";
import { CompanyService } from "@/app/_core/api/services/CompanyService";
import { getCookie } from "cookies-next";
import { AUTH_TOKEN_NAME } from "@/app/_core/config/constants";
import Swal from "sweetalert2";
import { companyRoute } from "@/app/_core/config/routes";
import ErrorsViewer from "../../Common/Errors/ErrorsViewer";

export interface EditCompanyUserModalProps {
    companyMember: CompanyMember | undefined;
    keyId: number;
}

export interface CompanyMemberInterface {
    company_email: string;
    role: string;
    phone_ext: string;
}

export default function EditCompanyUserModal({
    companyMember,
    keyId,
}: EditCompanyUserModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | Array<string>>("");
    const currentCompany = useAppSelector((state) => state.app.currentCompany);
    const initialValues: CompanyMemberInterface = {
        company_email: companyMember?.companyEmail ?? "",
        role: companyMember?.role ?? "",
        phone_ext: companyMember?.phoneExt ?? "",
    };
    const __ = useTranslations("Text");

    const doUpdate = (values: CompanyMemberInterface) => {
        setIsLoading(true);
        var token = getCookie(AUTH_TOKEN_NAME);

        CompanyService.updateUserInfo(
            values.company_email,
            values.phone_ext,
            values.role,
            companyMember!.uuid,
            token!.toString(),
        )
            .then(async (res) => {
                // console.log(res);
                setErrors("");
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
                        title: __("informations_successfully_updated"),
                    }).then(
                        () =>
                            (window.location.href = `${companyRoute.path}/${currentCompany?.name}/members`),
                    );
                } else {
                }
            })
            .catch((error: any) => {
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
    };

    const closeLoading = () => {
        setIsLoading(false);
    };

    return (
        <Formik
            onSubmit={doUpdate}
            validationSchema={UserCompanySchema}
            initialValues={initialValues}
        >
            <div className=''>
                <Button
                    theme={customButtonTheme}
                    color='light'
                    size={"xs"}
                    aria-haspopup='dialog'
                    aria-expanded='false'
                    aria-controls={`hs-medium-modal${keyId}`}
                    data-hs-overlay={`#hs-medium-modal${keyId}`}
                >
                    Editer
                </Button>

                {_buildModalContent()}
            </div>
        </Formik>
    );

    function _buildModalContent() {
        return (
            <div
                id={`hs-medium-modal${keyId}`}
                className='hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none'
                role='dialog'
                tabIndex={-1}
                aria-labelledby={`hs-medium-modal${keyId}-label`}
            >
                <div className='hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-2xl md:w-full m-3 md:mx-auto'>
                    <Form className='flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70'>
                        <div className='flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700'>
                            <h3
                                id={`hs-medium-modal${keyId}-label`}
                                className='font-bold text-gray-800 dark:text-white'
                            >
                                {`Edit ${ucfirst(companyMember?.user?.firstname!)}`}
                            </h3>
                            <button
                                type='button'
                                className='size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600'
                                aria-label='Close'
                                data-hs-overlay={`#hs-medium-modal${keyId}`}
                            >
                                <span className='sr-only'>Close</span>
                                <svg
                                    className='shrink-0 size-4'
                                    xmlns='http://www.w3.org/2000/svg'
                                    width={24}
                                    height={24}
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth={2}
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                >
                                    <path d='M18 6 6 18' />
                                    <path d='m6 6 12 12' />
                                </svg>
                            </button>
                        </div>
                        <div className='p-4 grid grid-cols-4 gap-2'>
                            <div className='col-span-4'>
                                <p className='text-gray-400 mb-4 dark:text-neutral-400'>
                                    {__("edit_member_description")}
                                </p>
                            </div>
                            <div className='px-3 col-span-2'>
                                <InputWithLabel
                                    labelFor={"company_email"}
                                    labelTitle={__("company_email")}
                                >
                                    <InputField
                                        manualType='email'
                                        labelFor='company_email'
                                        name='company_email'
                                        id='company_email'
                                    />
                                </InputWithLabel>
                            </div>
                            <div className='px-3 col-span-2'>
                                <InputWithLabel
                                    labelFor={"role"}
                                    labelTitle={__("role")}
                                >
                                    <InputField
                                        labelFor='role'
                                        name='role'
                                        id='role'
                                    />
                                </InputWithLabel>
                            </div>
                            <div className='px-3 col-span-1'>
                                <span className='w-full'>
                                    <InputWithLabel
                                        labelFor={"phone_ext"}
                                        labelTitle={__("phone_ext")}
                                        className='max-w-40 w-full'
                                    >
                                        <InputField
                                            labelFor='phone_ext'
                                            name='phone_ext'
                                            id='phone_ext'
                                        />
                                    </InputWithLabel>
                                </span>
                            </div>
                        </div>
                        <div className='flex justify-end items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700'>
                            <Button
                                type='button'
                                theme={customButtonTheme}
                                color='light'
                                data-hs-overlay='#hs-vertically-centered-modal'
                            >
                                Close
                            </Button>

                            <Button
                                type='submit'
                                theme={customButtonTheme}
                                color='dark'
                            >
                                Modifier
                            </Button>
                        </div>
                        <ErrorsViewer errors={errors} />
                    </Form>
                </div>
            </div>
        );
    }
}
