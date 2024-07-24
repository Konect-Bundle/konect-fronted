import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label } from "flowbite-react";
import { Field } from "formik";
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
        <Field
            id={labelFor}
            disabled={disabled}
            name={name}
            className={`${customTextInputTheme?.field?.input?.base} + " p-3.5 text-sm "+ ${className}`}
            {...props}
        />
    );
};

export default InputField;
