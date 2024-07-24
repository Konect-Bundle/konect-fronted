import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label, TextInput } from "flowbite-react";
import { Field, FieldConfig } from "formik";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    ...props
}) => {
    return (
        <Field id={labelFor}
            disabled={disabled}
            name={name}>
            {(fieldProps: any) => {
                const { field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta,

                } = fieldProps;

                return <div>

                    <TextInput theme={customTextInputTheme} type="text" placeholder="Email" {...field} />

                    {meta.touched && meta.error && (

                        <div className="error">{meta.error}</div>
                    )}

                </div>

            }
            }

        </Field>
        
    );
};

export default InputField;
