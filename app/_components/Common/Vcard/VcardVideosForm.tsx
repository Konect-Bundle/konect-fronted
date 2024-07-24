import React, { ReactElement, ReactNode } from "react";
import { Field, FieldArray } from "formik";
import { Button, Label, TextInput } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import Image from "next/image";
import { UrlVcard } from "@/app/_core/models/vcard/VcardParts";
import {
    TbExternalLink,
    TbPlus,
    TbTrash,
    TbVideo,
    TbVideoPlus,
    TbX,
} from "react-icons/tb";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { VideoLinkVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";

interface VcardVideosFormProps extends React.PropsWithChildren {}

const VcardVideosForm: React.FC<
    VcardVideosFormProps
> = ({}: VcardVideosFormProps) => {
    return (
        <FieldArray name="videoLinks">
            {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { videoLinks } = values;

                return (
                    <div className="flex flex-col space-y-4">
                        {videoLinks.map(
                            (
                                videoLink: VideoLinkVcardInterface,
                                index: number,
                            ) => (
                                <InputWithLabel
                                    labelFor="facebook"
                                    key={index}
                                    labelTitle={videoLink.type}
                                >
                                    <div className="flex items-center">
                                        <div className="w-full">
                                            <InputPrefixedIcon
                                                name={`videoLinks[${index}].uri`}
                                                labelFor="facebook"
                                                icon={<TbVideo />}
                                            />
                                        </div>
                                        <TbX
                                            size={20}
                                            className="mx-4 cursor-pointer"
                                            onClick={() => remove(index)}
                                        />{" "}
                                    </div>
                                </InputWithLabel>
                            ),
                        )}

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
        </FieldArray>
    );
};

export default VcardVideosForm;
