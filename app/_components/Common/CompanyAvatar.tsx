import { ROOT_FILES_URL } from "@/app/_core/config/constants";
import { customAvatarTheme } from "@/app/_styles/flowbite/avatar";
import { Avatar } from "flowbite-react";
import React, { ReactNode } from "react";

interface CompanyAvatarProps {
    imgSrc?: string; // chemin de l'image de profil de l'utilisateur
    size?: "sm" | "md" | "lg"; // taille de l'avatar
    className?: string; // classes supplémentaires pour le style
    icon?: ReactNode;
}

const CompanyAvatar: React.FC<CompanyAvatarProps> = ({
    imgSrc,
    size = "md",
    className,
    icon,
}) => {
    if (icon) {
        return (
            <Avatar
                theme={customAvatarTheme}
                rounded
                className={`w-max bg-gray-200/70 ${className} rounded-lg`} // Ajoutez la classe fournie
                size={size}
                img={(props) => (
                    <div
                        {...props}
                        className={`${props.className} flex justify-center items-center`}
                    >
                        {icon!}
                    </div>
                )}
            />
        );
    } else {
        const img = imgSrc ? `${ROOT_FILES_URL}/${imgSrc}` : undefined;

        return (
            <Avatar
                theme={customAvatarTheme}
                rounded
                img={img}
                className={`w-max ${className}`} // Ajoutez la classe fournie
                size={size}
            />
        );
    }
};

export default CompanyAvatar;
