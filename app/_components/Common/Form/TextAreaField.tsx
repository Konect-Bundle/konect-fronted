import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label, Textarea, TextInput } from "flowbite-react";
import { Field, FieldConfig } from "formik";
import React from "react";

interface TextAreaFieldProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    rows?: number;
    name?: string;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
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
                        <Textarea
                            id={labelFor}
                            theme={customTextInputTheme}
                            {...field}
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

export default TextAreaField;
