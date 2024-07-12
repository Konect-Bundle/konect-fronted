import React, { ReactElement, ReactNode } from "react";

interface TextSkeletonProps extends React.PropsWithChildren {
    className?: string;
    height?: number;
    bgClass?: string;
    animated?: boolean;
}

const TextSkeleton: React.FC<TextSkeletonProps> = ({
    className = "w-full",
    height = 2.5,
    animated = true,
    bgClass = " bg-gray-200 dark:bg-gray-700",
}: TextSkeletonProps) => {
    return (
        <div
            role="status"
            className={(animated ? "animate-pulse " : " ") + className}
        >
            <div
                className={"h-" + height + " rounded-full w-full " + bgClass}
            ></div>
        </div>
    );
};

export default TextSkeleton;
