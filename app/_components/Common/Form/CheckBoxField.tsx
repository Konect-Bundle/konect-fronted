import { customCheckBoxTheme } from "@/app/_styles/flowbite/form";
import { Checkbox } from "flowbite-react";
import { Field } from "formik";
import React from "react";

interface CheckBoxFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    name?: string;
}

const CheckBoxField: React.FC<CheckBoxFieldProps> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    ...props
}) => {
    return (
        <Field id={labelFor} disabled={disabled} name={name}>
            {(fieldProps: any) => {
                const {
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,
                } = fieldProps;

                return (
                    <div>
                        <Checkbox
                            id={labelFor}
                            theme={customCheckBoxTheme}
                            {...field}
                            checked={field.value}
                        />

                        {meta.touched && meta.error && (
                            <div className='error mt-2 text-xs text-red-500'>
                                {meta.error}
                            </div>
                        )}
                    </div>
                );
            }}
        </Field>
    );
};

export default CheckBoxField;
