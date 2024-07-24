import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label } from "flowbite-react";
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
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-50 border rounded-e-0 border-gray-200 border-e-0 rounded-s-md w-12">
                {icon}
            </span>
            <Field
                id={labelFor}
                disabled={disabled}
                name={name}
                className={`${customTextInputTheme?.field?.input?.base} + " rounded-none rounded-e-lg border p-3.5 text-sm "+ ${className}`}
                {...props}
            />
        </div>
    );
};

export default InputPrefixedIcon;
