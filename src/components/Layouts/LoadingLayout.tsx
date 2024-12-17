import React from "react";
import { MutatingDots, RotatingLines, TailSpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import { LoarderStyle } from "@/core/utils/enums";

interface LoadingLayoutProps {
    isLoading?: boolean;
    isMinified?: boolean;
    loaderStyle?: LoarderStyle;
    children: React.ReactNode;
}

const LoadingLayout = ({
    isLoading = false,
    isMinified = false,
    loaderStyle = LoarderStyle.MUTATINGSDOT,
    children,
}: LoadingLayoutProps) => {
    return (
        <div className='w-full h-full'>
            <div className='w-full h-full'>{children}</div>

            <motion.div
                className='box'
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
                <div className='transition-all w-screen h-screen fixed flex justify-center items-center bg-black-light/25 left-0 top-0 z-20'>
                    <div className='flex justify-center items-center'>
                        {loaderStyle == LoarderStyle.MUTATINGSDOT && (
                            <MutatingDots
                                visible={true}
                                height='70'
                                width='70'
                                color='#e4dc1a'
                                secondaryColor='#e4dc1a'
                                radius='12.5'
                                ariaLabel='mutating-dots-loading'
                                wrapperStyle={{}}
                                wrapperClass=''
                            />
                        )}
                        {loaderStyle == LoarderStyle.TAILSPIN && (
                            <TailSpin
                                visible={true}
                                height='50'
                                width='50'
                                color='#e4dc1a'
                                ariaLabel='tail-spin-loading'
                                radius='1'
                                wrapperStyle={{}}
                                wrapperClass=''
                            />
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingLayout;
