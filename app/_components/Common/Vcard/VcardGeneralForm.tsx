import UserVcard from "@/app/_core/models/vcard/UserVcard";
import React, { ReactElement, ReactNode } from "react";
import { Field } from "formik";
import { Label, Textarea, TextInput } from "flowbite-react";
import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import InputWithLabel from "../Form/InputWithLabel";
import InputField from "../Form/InputField";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import { TbMail, TbPhone } from "react-icons/tb";
import { useTranslations } from "next-intl";

interface VcardGeneralFormProps extends React.PropsWithChildren {}

const VcardGeneralForm: React.FC<
    VcardGeneralFormProps
> = ({}: VcardGeneralFormProps) => {
    // const CustomTextAreaComponent = (props: any) => (
    //     <Textarea id="comment" placeholder="Leave a comment..." required rows={4} {...props} />
    // );
    const __ = useTranslations("Text");
    return (
        <div className="grid grid-2 gap-4">
            <div className="grid grid-cols-6 col-span-2 gap-4">
                <div className="sm:col-span-1 col-span-3">
                    <InputWithLabel
                        labelFor={"prefix"}
                        labelTitle={__("prefix")}
                    >
                        <InputField
                            labelFor="prefix"
                            name="names.prefix"
                            id="prefix"
                        />
                    </InputWithLabel>
                </div>
                <div className="sm:col-span-1 col-span-3">
                    <InputWithLabel
                        labelFor={"suffix"}
                        labelTitle={__("suffix")}
                    >
                        <InputField
                            labelFor="suffix"
                            name="names.suffix"
                            id="suffix"
                        />
                    </InputWithLabel>
                </div>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    isRequired={true}
                    labelFor={"givenName"}
                    labelTitle={__("given_name")}
                >
                    <InputField
                        labelFor="givenName"
                        name="names.givenName"
                        id="givenName"
                        required
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    isRequired={true}
                    labelFor={__("family_name")}
                    labelTitle={"Nom"}
                >
                    <InputField
                        labelFor="familyName"
                        name="names.familyName"
                        id="familyName"
                        required
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    labelFor={"middleName"}
                    labelTitle={__("middle_name")}
                >
                    <InputField
                        labelFor="middleName"
                        name="names.middleName"
                        id="middleName"
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    labelFor={"phone"}
                    labelTitle={__("phone_number")}
                    isRequired={true}
                >
                    <InputPrefixedIcon
                        icon={<TbPhone />}
                        labelFor="phone"
                        name="phone.text"
                        required
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    labelFor={"email"}
                    labelTitle={__("email_address")}
                    isRequired={true}
                >
                    <InputPrefixedIcon
                        icon={<TbMail />}
                        labelFor="email"
                        name="email.text"
                        required
                    />
                </InputWithLabel>
            </div>
            <div className="pt-5 col-span-2">
                <h2 className="pb-6 font-semibold text-xl ">
                    {__("description_note")}
                </h2>
                <div className="w-full">
                    <Field
                        name="note.text"
                        as={"textarea"}
                        placeholder="First Name"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300/40 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default VcardGeneralForm;
