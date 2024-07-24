"use client";
import React, { useState } from "react";
import { ToggleSwitch } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import { customToggleSwitchTheme } from "@/app/_styles/flowbite/form";
import { Field } from "formik";
import { useTranslations } from "next-intl";

interface VcardConfigsFormProps extends React.PropsWithChildren {}

const VcardConfigsForm: React.FC<
    VcardConfigsFormProps
> = ({}: VcardConfigsFormProps) => {
    const toggleClass =
        "relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-600 dark:peer-focus:ring-yellow-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-800";
    // const [switch1, setSwitch1] = useState(true);
    const __ = useTranslations("Text");

    return (
        <div>
            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
                <div className="">
                    <InputWithLabel
                        isInline={true}
                        labelFor="activatedCard"
                        labelTitle={__("enable_card")}
                    >
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <Field
                                name="config.isCardActivated"
                                type="checkbox"
                                className="sr-only peer"
                            />
                            <div className={toggleClass}></div>
                        </label>
                        {/* <ToggleSwitch checked={switch1} label="Toggle me" onChange={setSwitch1} id="activatedCard" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>

                <div className="">
                    <InputWithLabel
                        isInline={true}
                        labelFor="showLocation"
                        labelTitle={__("enable_localization")}
                    >
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <Field
                                name="config.showLocalization"
                                type="checkbox"
                                className="sr-only peer"
                            />
                            <div className={toggleClass}></div>
                        </label>
                        {/* <ToggleSwitch checked={switch1} name="config.showLocalization" label="Toggle me" onChange={setSwitch1} id="showLocation" theme={customToggleSwitchTheme} color="yellow" /> */}
                    </InputWithLabel>
                </div>

                <div className="">
                    <InputWithLabel
                        isInline={true}
                        labelFor="showKonects"
                        labelTitle={__("enable_show_konects")}
                    >
                        <label className="inline-flex items-center mb-5 cursor-pointer">
                            <Field
                                name="config.showKonects"
                                type="checkbox"
                                className="sr-only peer"
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
