"use client";
import JSConfetti from "js-confetti";
import React, {
    ReactHTML,
    ReactHTMLElement,
    ReactNode,
    useEffect,
} from "react";

interface ConfettiLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

const ConfettiLayout: React.FC<ConfettiLayoutProps> = ({
    children,
    ...divProps
}) => {
    const jsConfetti = new JSConfetti();
    useEffect(() => {
        jsConfetti.addConfetti();
    }, []);
    return <div {...divProps}>{children}</div>;
};

export default ConfettiLayout;
