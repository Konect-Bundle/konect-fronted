import React, { ReactElement, ReactNode } from "react";

interface ContainerLayoutProps extends React.PropsWithChildren {
    className?: string;
}

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
    className = "",
    children,
}: ContainerLayoutProps) => {
    return <div className={"md:px-24 px-5 " + className}>{children}</div>;
};

export default ContainerLayout;
