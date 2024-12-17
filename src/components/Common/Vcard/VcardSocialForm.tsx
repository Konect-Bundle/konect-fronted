import React, { ReactElement, ReactNode } from "react";
import { Field } from "formik";
import { Label, TextInput } from "flowbite-react";
import InputWithLabel from "../Form/InputWithLabel";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import Image from "next/image";

interface VcardSocialFormProps extends React.PropsWithChildren {}

const VcardSocialForm: React.FC<
    VcardSocialFormProps
> = ({}: VcardSocialFormProps) => {
    return (
        <div className='grid md:grid-cols-2 gap-4'>
            <div className='max-w-md'>
                <InputWithLabel labelFor='facebook' labelTitle={"Facebook"}>
                    <InputPrefixedIcon
                        name='socialProfils.facebook'
                        labelFor='facebook'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[1.8] rounded'
                                src={
                                    "https://www.logo.wine/a/logo/Facebook/Facebook-f_Logo-Blue-Logo.wine.svg"
                                }
                                alt='facebook'
                            />
                        }
                    />
                </InputWithLabel>
            </div>
            <div className='max-w-md'>
                <InputWithLabel labelFor='instagram' labelTitle={"Instagram"}>
                    <InputPrefixedIcon
                        name='socialProfils.instagram'
                        labelFor='instagram'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[1.8] rounded'
                                src={
                                    "https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg"
                                }
                                alt='instagram'
                            />
                        }
                    />
                </InputWithLabel>
            </div>
            <div className='max-w-md'>
                <InputWithLabel labelFor='twitter' labelTitle={"Twitter"}>
                    <InputPrefixedIcon
                        name='socialProfils.twitter'
                        labelFor='twitter'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[0.9] rounded'
                                src={
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553"
                                }
                                alt='twitter'
                            />
                        }
                    />
                </InputWithLabel>
            </div>
            <div className='max-w-md'>
                <InputWithLabel labelFor='linkedin' labelTitle={"LinkedIn"}>
                    <InputPrefixedIcon
                        name='socialProfils.linkedin'
                        labelFor='linkedin'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[0.9] rounded'
                                src={
                                    "https://cdn.worldvectorlogo.com/logos/linkedin-icon-2.svg"
                                }
                                alt='linkedin'
                            />
                        }
                    />
                </InputWithLabel>
            </div>
            <div className='max-w-md'>
                <InputWithLabel labelFor='youtube' labelTitle={"Youtube"}>
                    <InputPrefixedIcon
                        name='socialProfils.youtube'
                        labelFor='youtube'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[0.9] rounded'
                                src={
                                    "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg"
                                }
                                alt='youtube'
                            />
                        }
                    />
                </InputWithLabel>
            </div>

            <div className='max-w-md'>
                <InputWithLabel labelFor='tiktok' labelTitle={"Tiktok"}>
                    <InputPrefixedIcon
                        name='socialProfils.tiktok'
                        labelFor='tiktok'
                        icon={
                            <Image
                                width={500}
                                height={500}
                                className='scale-[1.7] rounded'
                                src={
                                    "https://www.logo.wine/a/logo/TikTok/TikTok-Icon-Logo.wine.svg"
                                }
                                alt='tiktok'
                            />
                        }
                    />
                </InputWithLabel>
            </div>
        </div>
    );
};

export default VcardSocialForm;
