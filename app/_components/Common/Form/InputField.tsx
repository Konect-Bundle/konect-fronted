import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label, TextInput } from "flowbite-react";
import { Field, FieldConfig } from "formik";
import React, { ReactSVGElement } from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    className?: string;
    manualType?: string;
    name?: string;
    rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const InputField: React.FC<InputFieldProps> = ({
    disabled = false,
    className = "",
    labelFor = "",
    name,
    manualType = "text",
    rightIcon,
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
                        <TextInput
                            id={labelFor}
                            theme={customTextInputTheme}
                            rightIcon={rightIcon && rightIcon}
                            type={manualType}
                            {...field}
                        />

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

export default InputField;
