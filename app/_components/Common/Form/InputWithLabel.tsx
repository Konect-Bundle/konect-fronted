import { customTextInputTheme } from "@/app/_styles/flowbite/form";
import { Label } from "flowbite-react";
import { Field } from "formik";
import React from "react";

interface InputWithLabelProps extends React.PropsWithChildren {
    disabled?: boolean;
    labelFor: string;
    labelTitle: string;
    className?: string;
    labelClassName?: string;
    isRequired?: boolean;
    name?: string;
    isInline?: boolean;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
    disabled = false,
    labelFor,
    labelTitle,
    className = "",
    labelClassName = "",
    isInline = false,
    name,
    isRequired = false,
    children,
    ...props
}: InputWithLabelProps) => {
    return (
        <div className={(isInline ? "flex space-x-3" : "") + ` ${className}`}>
            <div className={isInline ? "" : "mb-2"}>
                <div className={isInline ? "" : "flex mb-2"}>
                    <Label
                        htmlFor={labelFor}
                        value={labelTitle}
                        className={` ${labelClassName}`}
                    />
                    {isRequired && <span className="text-red-600">*</span>}
                </div>
            </div>
            {children}
        </div>
    );
};

export default InputWithLabel;
