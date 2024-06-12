import React, {ReactElement, ReactNode} from 'react';

interface ContainerLayoutProps extends React.PropsWithChildren {
    className?: string
}

const defaultContainerLayoutProps: ContainerLayoutProps = {
    className : ""
}
const ContainerLayout: React.FC<ContainerLayoutProps> = (props) => {
    return (
        <div className={"md:px-24 px-4 "+ props.className}>
            {props.children}
        </div>
    );
}

ContainerLayout.defaultProps = defaultContainerLayoutProps;
export default ContainerLayout;



