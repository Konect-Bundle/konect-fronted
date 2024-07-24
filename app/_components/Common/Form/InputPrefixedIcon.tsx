import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label, TextInput } from "flowbite-react";
import { Field } from "formik";
import React from "react";

interface InputPrefixedIconProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    disabled?: boolean;
    labelFor: string;
    icon: React.ReactNode;
    className?: string;
    name?: string;
}

const InputPrefixedIcon: React.FC<InputPrefixedIconProps> = ({
    disabled = false,
    labelFor = "",
    icon,
    className = "",
    name,
    ...props
}) => {
    return (
        <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border rounded-e-0 border-gray-300/40 border-e-0 pl-4 rounded-s-md w-12">
                {icon}
            </span>
            <Field id={labelFor} disabled={disabled} name={name}>
                {(fieldProps: any) => {
                    const {
                        field, // { name, value, onChange, onBlur }
                        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                        meta,
                    } = fieldProps;

                    return (
                        <div className="w-full">
                            <TextInput
                                theme={customTextInputTheme}
                                color={"icon"}
                                type="text"
                                {...field}
                            />

                            {meta.touched && meta.error && (
                                <div className="error">{meta.error}</div>
                            )}
                        </div>
                    );
                }}
            </Field>
        </div>
    );
};

export default InputPrefixedIcon;
