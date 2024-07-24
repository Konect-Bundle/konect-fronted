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

interface VcardLinksFormProps extends React.PropsWithChildren {}

const VcardLinksForm: React.FC<
    VcardLinksFormProps
> = ({}: VcardLinksFormProps) => {
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
                            <InputWithLabel
                                labelFor="facebook"
                                key={index}
                                labelTitle={url.type}
                                className="w-full"
                            >
                                <div className="flex items-center">
                                    <div className="w-full">
                                        <InputPrefixedIcon
                                            name={`urls[${index}].uri`}
                                            labelFor="facebook"
                                            icon={<TbLink />}
                                        />
                                    </div>
                                    <TbX
                                        size={20}
                                        className="mx-4 cursor-pointer"
                                        onClick={() => remove(index)}
                                    />
                                </div>
                            </InputWithLabel>
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
