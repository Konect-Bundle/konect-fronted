import React, {ReactElement, ReactNode} from 'react';

interface ButtonProps {
    onClick: () => void;
    outlined: boolean;
    children : ReactNode
}


const Button: React.FC<ButtonProps> = ({onClick, outlined, children }):ReactElement => {
    return (
        <button>
            {children}
        </button>
    );
}

export default Button;
