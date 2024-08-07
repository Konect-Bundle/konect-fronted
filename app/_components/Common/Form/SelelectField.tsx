import {
    customCheckBoxTheme,
    customSelectTheme,
} from "@/app/_styles/flowbite/form";
import { ICountry } from "country-state-city";
import { Select } from "flowbite-react";
import { Field } from "formik";
import React from "react";

interface SelectFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    name?: string;
    options: Array<ICountry>;
}

const SelectField: React.FC<SelectFieldProps> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    options,
    ...props
}) => {
    return (
        <Field id={labelFor} as="select" disabled={disabled} name={name}>
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
                            checked={field.value}
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

export default SelectField;
