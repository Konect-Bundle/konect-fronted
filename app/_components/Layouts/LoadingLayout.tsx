import React from "react";
import { MutatingDots } from "react-loader-spinner";
import { motion } from "framer-motion";

interface LoadingLayoutProps {
    isLoading?: boolean;
    isMinified?: boolean;
    children: React.ReactNode;
}

const LoadingLayout: React.FC<LoadingLayoutProps> = ({
    isLoading = false,
    isMinified = false,
    children,
}) => {
    return (
        <div className="w-full h-full">
            <div className="w-full h-full">{children}</div>

            <motion.div
                className="box"
                initial={{
                    opacity: isLoading ? 0 : 1,
                    visibility: isLoading ? "hidden" : "visible",
                }}
                animate={{
                    opacity: isLoading ? 1 : 0,
                    visibility: isLoading ? "visible" : "hidden",
                }}
                transition={{ duration: 0.4 }}
            >
                <div className="transition-all w-screen h-screen fixed flex justify-center items-center bg-black-light/30 left-0 top-0 z-20">
                    <div className="flex justify-center items-center">
                        <MutatingDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#e4dc1a"
                            secondaryColor="#e4dc1a"
                            radius="12.5"
                            ariaLabel="mutating-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingLayout;
