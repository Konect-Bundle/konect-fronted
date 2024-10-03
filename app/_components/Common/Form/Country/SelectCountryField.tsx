import {
    customCheckBoxTheme,
    customSelectTheme,
} from "@/app/_styles/flowbite/form";
import { ICountry } from "country-state-city";
import { Select } from "flowbite-react";
import { Field } from "formik";
import React, { useState } from "react";

interface SelectCountryFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    name?: string;
    options: Array<ICountry>;
    defaultSelected: string;
    onChangeCallBack?: (country: string) => void;
}

const SelectCountryField: React.FC<SelectCountryFieldProps> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    options,
    defaultSelected,
    onChangeCallBack,
    ...props
}) => {
    const [selectedCoundtry, setSelectedCountry] =
        useState<string>(defaultSelected);
    // console.log(defaultSelected);
    return (
        // <Field id={labelFor} as="select" disabled={disabled} name={name}>

        <Field id={labelFor} disabled={disabled} name={name}>
            {(fieldProps: any) => {
                const {
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                } = fieldProps;

                return (
                    <div>
                        <Select
                            id={labelFor}
                            theme={customSelectTheme}
                            {...field}
                            // onChange={(e)=>{

                            //     // setSelectedCountry(e.target.value);
                            //     // onChangeCallBack!(e.target.value);
                            //     console.log(selectedCoundtry);
                            // }}
                            // checked={selectedCoundtry}
                        >
                            {options.map((country, i) => (
                                <option key={i} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </Select>
                        {meta.touched && meta.error && (
                            <div className="error mt-2 text-xs text-red-500">
                                {meta.error}
                            </div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};

export default SelectCountryField;
