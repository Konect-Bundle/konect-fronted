// "use client";
import {
    PhoneVcardInterface
} from "@/app/_core/interfaces/vcardInterfaces";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { Button } from "flowbite-react";
import { FieldArray } from "formik";
import { useTranslations } from "next-intl";
import { Inter } from "next/font/google";
import React, { ReactNode } from "react";
import { TbLink, TbPlus, TbX } from "react-icons/tb";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import InputField from "../Form/InputField";
import InputWithLabel from "../Form/InputWithLabel";

const inter = Inter({
    subsets: ["latin"],
});

interface VcardPhonesFormProps extends React.PropsWithChildren {}

const VcardPhonesForm: React.FC<
    VcardPhonesFormProps
> = ({}: VcardPhonesFormProps) => {
    const __ = useTranslations("Text");
    const __A = useTranslations("Actions");

    return (
        <FieldArray
            name="phones"
            render={(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { phones } = values;

                return (
                    <div className="flex flex-col space-y-4">
                        {phones.map(
                            (phone: PhoneVcardInterface, index: number) => {
                                let icon: ReactNode = <TbLink />;

                                return (
                                    <div
                                        className="grid grid-cols-8 gap-6"
                                        key={index}
                                    >
                                        <div className="flex flex-col justify-center md:col-span-2 col-span-8">
                                            <InputWithLabel
                                                labelFor="title"
                                                labelTitle={__("title")}
                                                className="w-full"
                                                labelClassName=" text-xs"
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-full">
                                                        <InputField
                                                            name={`phones[${index}].type`}
                                                            labelFor="title"
                                                        />
                                                    </div>
                                                </div>
                                            </InputWithLabel>
                                        </div>
                                        <div className="flex flex-col justify-center md:col-span-4 col-span-8">
                                            <InputWithLabel
                                                labelFor="url"
                                                key={index}
                                                labelTitle={__("phone_number")}
                                                className="w-full col-span-2"
                                                labelClassName=" text-xs"
                                            >
                                                <div className="flex items-center">
                                                    <div className="w-full">
                                                        <PhoneInput
                                                        
                                                            country={"us"}
                                                            value={phone.text}
                                                            onChange={(val) => {
                                                                form.setFieldValue(
                                                                    `phones[${index}].text`,
                                                                    val,
                                                                );
                                                            }}
                                                            inputClass={"!py-3.5 !border-gray-300/40 !text-gray-900 !focus:border-gray-200 focus:ring-gray-200 !focus:shadow-none "+inter.className}
                                                            inputStyle={{
                                                                width: "100%",
                                                                boxShadow: 'none'
                                                            }}
                                                        />
                                                        {/* <InputPrefixedIcon
                                                            icon={icon}
                                                            name={`phones[${index}].text`}
                                                            labelFor="phone"
                                                        /> */}
                                                    </div>
                                                </div>
                                            </InputWithLabel>
                                        </div>
                                        <div className="md:col-span-2 col-span-8 flex sm:items-start items-end flex-col justify-end mb-4">
                                            <span
                                                className="cursor-pointer flex items-center justify-start text-red-500 hover:text-red-700"
                                                onClick={() => remove(index)}
                                            >
                                                <TbX
                                                    size={18}
                                                    className="ml-1 cursor-pointer"
                                                />
                                                <span className="text-xs">
                                                    {__A("delete")}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                );
                            },
                        )}
                        <Button
                            theme={customButtonTheme}
                            color="light"
                            onClick={() => push({ type: __("main"), text: "" })}
                            className="w-max"
                            size={"sm"}
                        >
                            <TbPlus className={"text-lg"} />
                            <span className="ml-1 text-xs">{__("add")}</span>
                        </Button>
                    </div>
                );
            }}
        />
    );
};

export default VcardPhonesForm;
