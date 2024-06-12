import React, {ReactElement, ReactNode} from 'react';

interface ContainerLayoutProps extends React.PropsWithChildren {
    className?: string
}

const defaultContainerLayoutProps: ContainerLayoutProps = {
    className : ""
}
const ContainerLayout: React.FC<ContainerLayoutProps> = ({className="", children}: ContainerLayoutProps) => {
    return (
        <div className={"md:px-24 px-4 "+ className}>
            {children}
        </div>
    );
}

export default ContainerLayout;



