import React, { ReactElement, ReactNode } from "react";

interface ButtonProps extends React.PropsWithChildren {
    onClick: () => void;
    outlined: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, outlined }) => {
    return <button>{children}</button>;
};

export default Button;
