import { Field } from "formik";
import React from "react";

import { Country } from "country-state-city";

import { UserVcardInterface } from "@/core/interfaces/vcardInterfaces";
import { useTranslations } from "next-intl";
import { TbMail } from "react-icons/tb";
import SelectCountryField from "../Form/Country/SelectCountryField";
import SelectStateFromCountryField from "../Form/Country/SelectStateFromCountryField";
import InputField from "../Form/InputField";
import InputPrefixedIcon from "../Form/InputPrefixedIcon";
import InputWithLabel from "../Form/InputWithLabel";
import VcardPhonesForm from "./VcardPhonesForm";

interface VcardGeneralFormProps extends React.PropsWithChildren {
    formikValues: UserVcardInterface;
}

const VcardGeneralForm: React.FC<VcardGeneralFormProps> = ({
    formikValues,
}: VcardGeneralFormProps) => {
    // const CustomTextAreaComponent = (props: any) => (
    //     <Textarea id="comment" placeholder="Leave a comment..." required rows={4} {...props} />
    // );
    const __ = useTranslations("Text");

    const allCountries = Country.getAllCountries();

    // useEffect(() => {
    // console.log(allCountries);
    // }, []);

    return (
        <div className='grid grid-2 gap-4'>
            <div className='grid grid-cols-6 col-span-2 gap-4'>
                <div className='sm:col-span-1 col-span-3'>
                    <InputWithLabel
                        labelFor={"prefix"}
                        labelTitle={__("prefix")}
                    >
                        <InputField
                            labelFor='prefix'
                            name='names.prefix'
                            id='prefix'
                        />
                    </InputWithLabel>
                </div>
                <div className='sm:col-span-1 col-span-3'>
                    <InputWithLabel
                        labelFor={"suffix"}
                        labelTitle={__("suffix")}
                    >
                        <InputField
                            labelFor='suffix'
                            name='names.suffix'
                            id='suffix'
                        />
                    </InputWithLabel>
                </div>
            </div>
            <div className='sm:col-span-1 col-span-2'>
                <InputWithLabel
                    isRequired={true}
                    labelFor={"givenName"}
                    labelTitle={__("given_name")}
                >
                    <InputField
                        labelFor='givenName'
                        name='names.givenName'
                        id='givenName'
                        required
                    />
                </InputWithLabel>
            </div>
            <div className='sm:col-span-1 col-span-2'>
                <InputWithLabel
                    isRequired={true}
                    labelFor={__("family_name")}
                    labelTitle={__("family_name")}
                >
                    <InputField
                        labelFor='familyName'
                        name='names.familyName'
                        id='familyName'
                        required
                    />
                </InputWithLabel>
            </div>
            <div className='sm:col-span-1 col-span-2'>
                <InputWithLabel
                    labelFor={"middleName"}
                    labelTitle={__("middle_name")}
                >
                    <InputField
                        labelFor='middleName'
                        name='names.middleName'
                        id='middleName'
                    />
                </InputWithLabel>
            </div>
            <div className='sm:col-span-2 col-span-2'>
                <InputWithLabel
                    labelFor={"phone"}
                    labelTitle={__("phone_number")}
                    isRequired={false}
                    labelClassName='text-md'
                >
                    {" "}
                    <VcardPhonesForm />
                </InputWithLabel>
            </div>
            <div className='sm:col-span-1 col-span-2'>
                <InputWithLabel
                    labelFor={"email"}
                    labelTitle={__("email_address")}
                    isRequired={true}
                >
                    <InputPrefixedIcon
                        type='email'
                        icon={<TbMail />}
                        labelFor='email'
                        name='email.text'
                        required
                    />
                </InputWithLabel>
            </div>

            <div className='pt-5 col-span-2'>
                <h2 className='pb-6 font-semibold text-xl '>
                    {__("location")}
                </h2>
                <div className='grid grid-cols-2 gap-2'>
                    <div className=''>
                        <InputWithLabel
                            labelFor={"country"}
                            labelTitle={__("country")}
                            isRequired={true}
                        >
                            <SelectCountryField
                                options={allCountries}
                                defaultSelected={formikValues.location.country!}
                                labelFor='country'
                                name='location.country'
                                required
                            />
                        </InputWithLabel>
                    </div>

                    <div className=''>
                        <InputWithLabel
                            labelFor={"state"}
                            labelTitle={__("state")}
                            isRequired={true}
                        >
                            <SelectStateFromCountryField
                                selectedCountryCode={
                                    formikValues.location.country!
                                }
                                labelFor='state'
                                name='location.state'
                                required
                            />
                        </InputWithLabel>
                    </div>
                </div>
            </div>
            <div className='pt-5 col-span-2'>
                <h2 className='pb-6 font-semibold text-xl '>
                    {__("description_note")}
                </h2>
                <div className='w-full'>
                    <Field
                        name='note.text'
                        as={"textarea"}
                        placeholder='First Name'
                        rows='4'
                        className='block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300/40 focus:ring-gray-200 focus:border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    />
                </div>
            </div>
        </div>
    );
};

export default VcardGeneralForm;
