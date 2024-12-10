import React from "react";
import PhoneInput, { PhoneInputProps } from "react-phone-input-2";
import classNames from "classnames";
import { Inter } from "next/font/google";
import "react-phone-input-2/lib/bootstrap.css";

interface CustomPhoneInputProps
    extends Omit<PhoneInputProps, "value" | "onChange"> {
    value: string;
    onChange: (value: string) => void;
    error?: string; // Pour afficher un message d'erreur
    className?: string; // Classes supplémentaires optionnelles
}

const inter = Inter({
    subsets: ["latin"],
});

const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
    value,
    onChange,
    error,
    className,
    ...props
}) => {
    return (
        <div className={classNames("w-full", className)}>
            <PhoneInput
                country={"us"}
                value={value}
                onChange={onChange}
                inputClass={classNames(
                    "!py-3.5 !border-gray-300/40 !text-gray-900 !focus:border-gray-200 focus:ring-gray-200 !focus:shadow-none " +
                        inter.className,
                    props.inputClass,
                )}
                inputStyle={{
                    width: "100%",
                    boxShadow: "none",
                    ...props.inputStyle, // Permet de fusionner les styles
                }}
                {...props} // Permet de passer des props supplémentaires au composant
            />
            {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
        </div>
    );
};

export default CustomPhoneInput;
