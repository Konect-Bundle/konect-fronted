"use client";
import ApiErrorsManagement from "@/core/api/errors/apiErrorsManagement";
import { UserService } from "@/core/api/services/UserService";
import { AUTH_TOKEN_NAME, ROOT_FILES_URL } from "@/core/config/constants";
import Company from "@/core/models/Company";
import { User } from "@/core/models/User";
import { ucfirst } from "@/core/utils/functions";
import { customAvatarTheme } from "@/styles/flowbite/avatar";
import { customButtonTheme } from "@/styles/flowbite/button";
import { customTextInputTheme } from "@/styles/flowbite/form";
import { customSpinnerTheme } from "@/styles/flowbite/spinner";
import { Avatar, Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { TbSearch, TbUsersGroup, TbUsersPlus } from "react-icons/tb";
import UserAvatar from "../../Common/UserAvatar";
import { useAppSelector } from "@/store/hooks";
import { current } from "@reduxjs/toolkit";
import { CompanyService } from "@/core/api/services/CompanyService";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";
import { companyRoute } from "@/core/config/routes";
import { useTranslations } from "next-intl";
import ErrorsViewer from "../../Common/Errors/ErrorsViewer";

export interface AddUserToCompanyModalProps {
    company: Company | undefined;
}

export interface SelectedUserInterface {
    firstname: string;
    imgSrc: string;
    uuid: string;
}

const config = {
    groupingType: "default",
    preventSelection: true,
    isOpenOnFocus: true,
    groupingTitleTemplate: `<div className="block text-xs text-gray-500 m-3 mb-1"></div>`,
};

export default function AddUserToCompanyModal({
    company,
}: AddUserToCompanyModalProps) {
    const [users, setUsers] = useState<Array<any> | undefined>(undefined);
    const [selecteds, setSelected] = useState<Array<SelectedUserInterface>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<string | Array<string>>("");
    const currentCompany = useAppSelector((state) => state.app.currentCompany);

    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(query);
    const __ = useTranslations("Text");

    useEffect(() => {
        if (query.length == 0) {
            setUsers(undefined);
        } else {
            const handler = setTimeout(() => {
                setDebouncedQuery(query);
            }, 300); // Attendre 300ms avant de mettre à jour le terme de recherche

            return () => {
                clearTimeout(handler); // Effacer le timeout lors de la nouvelle saisie
            };
        }
    }, [query]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const searchUsers = async (search: string) => {
        try {
            if (search.length > 0) {
                let req = UserService.searchUser(search);
                req.then((req: any) => setUsers(req.data));
            } else {
                setUsers(undefined);
            }
        } catch (error: any) {
            if (error.response) {
                var res: ApiErrorsManagement = new ApiErrorsManagement(error);
                setErrors(res.proccess());
            }
        } finally {
            closeLoading();
        }
    };

    useEffect(() => {
        if (debouncedQuery) {
            // Faire appel à l'API ici
            searchUsers(debouncedQuery);
        }
    }, [debouncedQuery, searchUsers]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        setQuery(e.target.value);
    };

    const closeLoading = () => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            clearTimeout(timer);
        }, 400);
    };
    const addUser = (user: SelectedUserInterface) => {
        if (!selecteds.includes(user)) {
            setSelected([...selecteds, user]);
        }
        // console.log(selecteds.length);
    };

    const removeUser = (user: SelectedUserInterface) => {
        if (selecteds.includes(user)) {
            setSelected(selecteds.filter((id) => id !== user));
        }

        console.log(selecteds);
    };
    const addUsersToCompany = () => {
        var uids: Array<string> = selecteds?.map((user) => user.uuid);
        var token = getCookie(AUTH_TOKEN_NAME);

        CompanyService.invitePeople(
            uids,
            currentCompany?.uuid!,
            token!.toString(),
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
                        title: __("invitation_success"),
                    }).then(
                        () =>
                            (window.location.href = `${companyRoute.path}/${currentCompany?.name}/members`),
                    );
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
                // setIsLoading(false);
            });
        // console.log(tab);
    };
    return (
        <div className=''>
            <Button
                type='button'
                theme={customButtonTheme}
                color='dark'
                aria-haspopup='dialog'
                aria-expanded='false'
                aria-controls='hs-vertically-centered-modal'
                data-hs-overlay='#hs-vertically-centered-modal'
            >
                Ajouter
            </Button>
            {_buildContent()}
        </div>
    );

    function _buildContent() {
        return (
            <div
                id='hs-vertically-centered-modal'
                className='hs-overlay hidden size-full fixed top-0 start-0 z-[80] overflow-x-hidden overflow-y-auto pointer-events-none'
                role='dialog'
                tabIndex={-1}
                aria-labelledby='hs-vertically-centered-modal-label'
            >
                <div className='hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center'>
                    <div className='w-full flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70'>
                        <div className='flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700'>
                            <h3
                                id='hs-vertically-centered-modal-label'
                                className='font-bold text-gray-800 dark:text-white'
                            >
                                {`Add Member to ${company?.name}`}
                            </h3>
                            <button
                                type='button'
                                className='size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600'
                                aria-label='Close'
                                data-hs-overlay='#hs-vertically-centered-modal'
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
                        <div className='p-4 overflow-y-auto'>
                            <p className='text-gray-400 mb-4 dark:text-neutral-400'>
                                {__("add_member_description")}
                            </p>

                            <div className='flex flex-col items-center space-y-4'>
                                <div className='w-full'>
                                    <TextInput
                                        theme={customTextInputTheme}
                                        onChange={handleInputChange}
                                        type='email'
                                        icon={TbSearch}
                                        required
                                    />
                                </div>

                                <div className=' flex items-center space-x-3 w-full p-2  rounded-lg'>
                                    <span className='flex items-center space-x-1 pr-3 border-r-2'>
                                        <TbUsersGroup className='text-xl' />
                                        <span className='border border-gray-300/65 rounded-full w-5 h-5 text-xs font-semibold  text-gray-600 flex justify-center items-center'>
                                            {selecteds.length}
                                        </span>
                                    </span>
                                    <div className='flex space-x-2 overflow-x-scroll overflow-hidden'>
                                        {selecteds.length > 0 &&
                                            selecteds.map((user, i) => (
                                                <div
                                                    key={i}
                                                    className='inline-flex flex-nowrap items-center bg-white border border-gray-200 rounded-full p-1.5 dark:bg-neutral-900 dark:border-neutral-700 space-x-2'
                                                >
                                                    <UserAvatar
                                                        size='sm'
                                                        imgSrc={user.imgSrc}
                                                    />

                                                    <div className='whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white'>
                                                        {ucfirst(
                                                            user.firstname,
                                                        )}{" "}
                                                    </div>
                                                    <div
                                                        className='ms-2.5 inline-flex justify-center items-center size-5 rounded-full text-gray-800 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:bg-neutral-700/50 dark:hover:bg-neutral-700 dark:text-neutral-400 cursor-pointer'
                                                        onClick={() =>
                                                            removeUser(user)
                                                        }
                                                    >
                                                        <svg
                                                            className='shrink-0 size-3'
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
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {users !== undefined && (
                                    <div className='space-y-1.5 w-full'>
                                        {isLoading ? (
                                            <Spinner
                                                aria-label='Default status example'
                                                size={"sm"}
                                                theme={customSpinnerTheme}
                                                color={"yellow"}
                                            />
                                        ) : users.length == 0 ? (
                                            <span className='px-2 italic text-gray-400'>
                                                {__("no_result")}...
                                            </span>
                                        ) : (
                                            users
                                                .filter(
                                                    (user) =>
                                                        !currentCompany?.members?.some(
                                                            (companyMember) =>
                                                                companyMember
                                                                    .user
                                                                    ?.uuid ===
                                                                user.uuid,
                                                        ),
                                                )
                                                .filter(
                                                    (user) =>
                                                        !selecteds.some(
                                                            (selected) =>
                                                                selected.uuid ===
                                                                user.uuid,
                                                        ),
                                                )
                                                .map((user, i) => (
                                                    <li
                                                        key={i}
                                                        className='hover:bg-gray-100 cursor-pointer flex space-x-2 justify-start py-1 rounded-lg items-center'
                                                        onClick={() =>
                                                            addUser({
                                                                firstname:
                                                                    user.firstname,
                                                                uuid: user.uuid,
                                                                imgSrc: user.profile_photo_path,
                                                            })
                                                        }
                                                    >
                                                        <UserAvatar
                                                            imgSrc={
                                                                user.profile_photo_path
                                                            }
                                                        />
                                                        <span className='py-1'>
                                                            {ucfirst(
                                                                user.firstname,
                                                            ) +
                                                                " " +
                                                                ucfirst(
                                                                    user.name,
                                                                )}
                                                        </span>
                                                    </li>
                                                ))
                                        )}
                                    </div>
                                )}
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
                                type='button'
                                theme={customButtonTheme}
                                color='dark'
                                onClick={addUsersToCompany}
                            >
                                Ajouter
                            </Button>
                            <ErrorsViewer errors={errors} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
