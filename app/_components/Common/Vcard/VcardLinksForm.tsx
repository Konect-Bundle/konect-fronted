// "use client";
import React, { ReactElement, ReactNode } from "react";
import { Field, FieldArray } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import Image from "next/image";
import { TbLink, TbPlus, TbTrash, TbTrashXFilled, TbX } from "react-icons/tb";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { UrlVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import { Input } from "postcss";
import InputField from "../Form/InputField";

interface VcardLinksFormProps extends React.PropsWithChildren { }

const VcardLinksForm: React.FC<
    VcardLinksFormProps
> = ({ }: VcardLinksFormProps) => {
    return (
        <FieldArray
            name="urls"
            render={(fieldArrayProps) => {
                // console.log(fieldArrayProps);
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { urls } = values;

                return (
                    <div className="flex flex-col space-y-4">
                        {urls.map((url: UrlVcardInterface, index: number) => (
                            <div className="grid grid-cols-8 gap-3" key={index}>
                                <div className="flex flex-col justify-center md:col-span-3 col-span-8">
                                    <InputWithLabel
                                        labelFor="title"
                                        labelTitle={"Titre"}
                                        className="w-full"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-full">
                                                <InputField
                                                    name={`urls[${index}].type`}
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
                                        labelTitle={"Lien externe"}
                                        className="w-full col-span-2"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-full">
                                                <InputPrefixedIcon
                                                    icon={<TbLink />}
                                                    name={`urls[${index}].uri`}
                                                    labelFor="url"
                                                />
                                            </div>
                                        </div>
                                    </InputWithLabel>
                                </div>
                                <div className="md:col-span-1 col-span-8 flex sm:items-start items-end flex-col justify-end mb-4">
                                    <span className="cursor-pointer flex items-center justify-start text-red-500 hover:text-red-700" onClick={() => remove(index)}
                                    >
                                        <TbX
                                            size={18}
                                            className="ml-1 cursor-pointer" />
                                        <span className="text-xs">Supprimer</span>
                                    </span>
                                </div>
                            </div>

                        ))}
                        <Button
                            theme={customButtonTheme}
                            color="light"
                            onClick={() => push({ type: "", uri: "" })}
                            className="w-max"
                            size={"sm"}
                        >
                            <TbPlus className={"text-lg"} />
                            <span className="ml-1 text-xs">
                                {"Ajouter un champ"}
                            </span>
                        </Button>
                    </div>
                );
            }}
        />
    );
};

export default VcardLinksForm;
