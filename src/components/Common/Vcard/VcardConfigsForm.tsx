"use client";
import React, { useState } from "react";
import { Button, Popover, TextInput, ToggleSwitch } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import {
    customTextInputTheme,
    customToggleSwitchTheme,
} from "@/styles/flowbite/form";
import { Field, FormikValues, useFormikContext } from "formik";
import { useTranslations } from "next-intl";
import { HexColorPicker } from "react-colorful";
import { generateColorVariants } from "@/core/utils/functions";

interface VcardConfigsFormProps extends React.PropsWithChildren {}

const VcardConfigsForm: React.FC<
    VcardConfigsFormProps
> = ({}: VcardConfigsFormProps) => {
    const toggleClass =
        "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-600 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-800";
    // const [switch1, setSwitch1] = useState(true);
    const __ = useTranslations("Text");
    const { setFieldValue } = useFormikContext<FormikValues>(); // Access Formik context

    return (
        <div>
            <div className='grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'>
                <div className='h-14'>
                    <InputWithLabel
                        isInline={true}
                        labelFor='showKonects'
                        labelTitle={__("profile_color")}
                        className='h-full items-center'
                    >
                        <Field
                            name='config.configTheme.primaryColor'
                            type='hidden'
                            className='sr-only peer h-12'
                        >
                            {({ field }: { field: any }) => (
                                <Popover
                                    aria-labelledby='default-popover'
                                    content={
                                        <div className='flex-col space-y-2 items-center bg-white p-2 rounded-lg'>
                                            <HexColorPicker
                                                color={field.value}
                                                onChange={(color) =>
                                                    setFieldValue(
                                                        "config.configTheme.primaryColor",
                                                        color,
                                                    )
                                                } // Update Formik value
                                            />
                                            <TextInput
                                                theme={customTextInputTheme}
                                                value={field.value}
                                                onChange={(e) =>
                                                    setFieldValue(
                                                        "config.configTheme.primaryColor",
                                                        e.target.value,
                                                    )
                                                }
                                            />
                                        </div>
                                    }
                                >
                                    <div className='py-1 px-1 border rounded-md border-gray-300/45 h-max'>
                                        <div
                                            style={{
                                                backgroundColor: field.value,
                                                color: generateColorVariants(
                                                    field.value,
                                                ).text,
                                            }}
                                            className='w-full h-10 rounded-sm px-2 flex justify-center items-center'
                                        >
                                            {field.value}
                                        </div>
                                    </div>
                                </Popover>
                            )}
                        </Field>

                        {/* <ToggleSwitch checked={switch1} name="config.showLocalization" label="Toggle me" onChange={setSwitch1} id="showLocation" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>
                <div className=''>
                    <InputWithLabel
                        isInline={true}
                        labelFor='activatedCard'
                        labelTitle={__("enable_card")}
                    >
                        <label className='inline-flex items-center mb-5 cursor-pointer'>
                            <Field
                                name='config.isCardActivated'
                                type='checkbox'
                                className='sr-only peer'
                            />
                            <div className={toggleClass}></div>
                        </label>
                        {/* <ToggleSwitch checked={switch1} label="Toggle me" onChange={setSwitch1} id="activatedCard" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>

                <div className=''>
                    <InputWithLabel
                        isInline={true}
                        labelFor='showLocation'
                        labelTitle={__("enable_localization")}
                    >
                        <label className='inline-flex items-center mb-5 cursor-pointer'>
                            <Field
                                name='config.showLocalization'
                                type='checkbox'
                                className='sr-only peer'
                            />
                            <div className={toggleClass}></div>
                        </label>
                        {/* <ToggleSwitch checked={switch1} name="config.showLocalization" label="Toggle me" onChange={setSwitch1} id="showLocation" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>

                <div className=''>
                    <InputWithLabel
                        isInline={true}
                        labelFor='showKonects'
                        labelTitle={__("enable_show_konects")}
                    >
                        <label className='inline-flex items-center mb-5 cursor-pointer'>
                            <Field
                                name='config.showKonects'
                                type='checkbox'
                                className='sr-only peer'
                            />
                            <div className={toggleClass}></div>
                        </label>
                        {/* <ToggleSwitch checked={switch1} name="config.showLocalization" label="Toggle me" onChange={setSwitch1} id="showLocation" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>
            </div>
        </div>
    );
};

export default VcardConfigsForm;
