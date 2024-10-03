import {
    customCheckBoxTheme,
    customSelectTheme,
} from "@/app/_styles/flowbite/form";
import { State } from "country-state-city";
import { Select } from "flowbite-react";
import { Field } from "formik";
import React from "react";

interface SelectStateFromCountryFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    name?: string;
    selectedCountryCode: string;
}

const SelectStateFromCountryField: React.FC<
    SelectStateFromCountryFieldProps
> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    selectedCountryCode,
    ...props
}) => {
    const states = State.getStatesOfCountry(selectedCountryCode);
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
                            checked={field.value}
                        >
                            {states.map((state, i) => (
                                <option key={i} value={state.name}>
                                    {state.name}
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

export default SelectStateFromCountryField;
