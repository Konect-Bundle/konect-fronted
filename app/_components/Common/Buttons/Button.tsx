import React from 'react';

interface ButtonProps {
    onClick: () => void;
    outlined: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, outlined, children }) => {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
