import UserVcard from "@/app/_core/models/vcard/UserVcard";
import React, { ReactElement, ReactNode } from "react";
import { Field } from "formik";
import { Label, Textarea, TextInput } from "flowbite-react";
import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import InputWithLabel from "../Form/InputWithLabel";
import InputField from "../Form/InputField";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import { TbMail, TbPhone } from "react-icons/tb";

interface VcardGeneralFormProps extends React.PropsWithChildren {}

const VcardGeneralForm: React.FC<
    VcardGeneralFormProps
> = ({}: VcardGeneralFormProps) => {
    // const CustomTextAreaComponent = (props: any) => (
    //     <Textarea id="comment" placeholder="Leave a comment..." required rows={4} {...props} />
    // );

    return (
        <div className="grid grid-2 gap-4">
            <div className="grid grid-cols-6 col-span-2 gap-4">
                <div className="sm:col-span-1 col-span-3">
                    <InputWithLabel labelFor={"prefix"} labelTitle={"Préfixe"}>
                        <InputField
                            labelFor="prefix"
                            name="names.prefix"
                            id="prefix"
                        />
                    </InputWithLabel>
                </div>
                <div className="sm:col-span-1 col-span-3">
                    <InputWithLabel labelFor={"suffix"} labelTitle={"Suffixe"}>
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
                    labelTitle={"Prénom"}
                >
                    <InputField
                        labelFor="givenName"
                        name="names.givenName"
                        id="givenName"
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    isRequired={true}
                    labelFor={"familyName"}
                    labelTitle={"Nom"}
                >
                    <InputField
                        labelFor="familyName"
                        name="names.familyName"
                        id="familyName"
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel
                    labelFor={"middleName"}
                    labelTitle={"Deuxième prénom"}
                >
                    <InputField
                        labelFor="middleName"
                        name="names.middleName"
                        id="middleName"
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel labelFor={"phone"} labelTitle={"Téléphone"}>
                    <InputPrefixedIcon
                        icon={<TbPhone />}
                        labelFor="phone"
                        name="phone.text"
                    />
                </InputWithLabel>
            </div>
            <div className="sm:col-span-1 col-span-2">
                <InputWithLabel labelFor={"email"} labelTitle={"Adresse email"}>
                    <InputPrefixedIcon
                        icon={<TbMail />}
                        labelFor="email"
                        name="email.text"
                    />
                </InputWithLabel>
            </div>
            <div className="pt-5 col-span-2">
                <h2 className="pb-6 font-semibold text-xl ">Note sur vous</h2>
                <div className="w-full">
                    <Field
                        name="note.text"
                        as={"textarea"}
                        placeholder="First Name"
                        rows="4"
                        className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default VcardGeneralForm;
