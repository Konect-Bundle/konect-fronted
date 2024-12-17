import { ROOT_FILES_URL } from "@/core/config/constants";
import { customAvatarTheme } from "@/styles/flowbite/avatar";
import { Avatar } from "flowbite-react";
import React from "react";

interface UserAvatarProps {
    imgSrc?: string; // chemin de l'image de profil de l'utilisateur
    size?: "sm" | "md" | "lg"; // taille de l'avatar
    className?: string; // classes supplémentaires pour le style
}

const UserAvatar: React.FC<UserAvatarProps> = ({
    imgSrc,
    size = "md",
    className,
}) => {
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
};

export default UserAvatar;
