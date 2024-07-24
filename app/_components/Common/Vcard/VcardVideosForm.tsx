import React from "react";
import { FieldArray } from "formik";
import { Button } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import {
    TbLink,
    TbPlus,
    TbX,
} from "react-icons/tb";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { VideoLinkVcardInterface } from "@/app/_core/interfaces/vcardInterfaces";
import InputField from "../Form/InputField";
import { useTranslations } from "next-intl";

interface VcardVideosFormProps extends React.PropsWithChildren { }

const VcardVideosForm: React.FC<
    VcardVideosFormProps
> = ({ }: VcardVideosFormProps) => {
    const __= useTranslations("Text");
    const __A= useTranslations("Actions");


    return (
        <FieldArray name="videoLinks">
            {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { videoLinks } = values;

                return (
                    <div className="flex flex-col space-y-4">
                        {videoLinks.map((videoLink: VideoLinkVcardInterface, index: number) => (
                            <div className="grid grid-cols-8 gap-3" key={index}>
                                <div className="flex flex-col justify-center md:col-span-3 col-span-8 ">
                                    <InputWithLabel
                                        labelFor="title"
                                        labelTitle={__("title")}
                                        className="w-full"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-full">
                                                <InputField
                                                    name={`videoLinks[${index}].type`}
                                                    labelFor="title"
                                                />
                                            </div>

                                        </div>
                                    </InputWithLabel>
                                </div>
                                <div className="flex flex-col justify-center md:col-span-4 col-span-8 ">
                                    <InputWithLabel
                                        labelFor="videoLinks"
                                        key={index}
                                        labelTitle={__("video_link")}
                                        className="w-full col-span-2"
                                    >
                                        <div className="flex items-center">
                                            <div className="w-full">
                                                <InputPrefixedIcon
                                                    icon={<TbLink />}
                                                    name={`videoLinks[${index}].uri`}
                                                    labelFor="videoLinks"
                                                />
                                            </div>
                                        </div>
                                    </InputWithLabel>
                                </div>
                                <div className="md:col-span-1 col-span-8 flex flex-col sm:items-start items-end justify-end mb-4">
                                    <span className="cursor-pointer flex items-center justify-start text-red-500 hover:text-red-700" onClick={() => remove(index)}>
                                        <TbX
                                            size={18}
                                            className="ml-1 cursor-pointer"
                                        />
                                        <span className="text-xs">{__A("delete")}</span>
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
                            {__("add")}
                            </span>
                        </Button>
                    </div>
                );
            }}
        </FieldArray>
    );
};

export default VcardVideosForm;
