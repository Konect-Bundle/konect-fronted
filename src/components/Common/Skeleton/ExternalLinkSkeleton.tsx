import React, { ReactElement, ReactNode } from "react";
import { TbExternalLink } from "react-icons/tb";
import TextSkeleton from "@/components/Common/Skeleton/TextSkeleton";

interface ExternalLinkSkeletonProps extends React.PropsWithChildren {
    className?: string;
    bgClass?: string;
    animated?: boolean;
}

const ExternalLinkSkeleton: React.FC<ExternalLinkSkeletonProps> = ({
    className = "w-full",
    bgClass = "bg-gray-200",
    animated = true,
}: ExternalLinkSkeletonProps) => {
    return (
        <span
            role='status'
            className={
                "flex " + (animated ? "animate-pulse " : " ") + className
            }
        >
            <div className='grid gap-3 md:grid-cols-2 grid-cols-1'>
                <div className='flex justify-start bg-slate-50 rounded-md border  items-center p-3 overflow-hidden'>
                    <span className='bg-white p-3 border rounded-md'></span>
                    <div className='flex flex-col px-4'>
                        <span className='text-sm font-bold'>
                            <TextSkeleton
                                className='w-24 mt-1'
                                bgClass='bg-gray-300/20'
                            />
                        </span>
                        <span>
                            <span className='text-gray-500 underline truncate'>
                                <TextSkeleton
                                    className='w-40 mt-1'
                                    bgClass='bg-gray-200'
                                />{" "}
                            </span>
                        </span>
                    </div>
                </div>
                {/*Box 2*/}
                <div className='flex justify-start bg-slate-50 rounded-md border  items-center p-2 overflow-hidden'>
                    <span className='bg-white p-3 border rounded-md'></span>
                    <div className='flex flex-col px-4'>
                        <span className='text-sm font-bold'>
                            <TextSkeleton
                                className='w-24 mt-1'
                                bgClass='bg-gray-300/20'
                            />
                        </span>
                        <span>
                            <span className='text-gray-500 underline truncate'>
                                <TextSkeleton
                                    className='w-40 mt-1'
                                    bgClass='bg-gray-200'
                                />{" "}
                            </span>
                        </span>
                    </div>
                </div>

                {/*Box 3*/}
                <div className='flex justify-start bg-slate-50 rounded-md border  items-center p-2 overflow-hidden'>
                    <span className='bg-white p-3 border rounded-md'></span>
                    <div className='flex flex-col px-4'>
                        <span className='text-sm font-bold'>
                            <TextSkeleton
                                className='w-24 mt-1'
                                bgClass='bg-gray-300/20'
                            />
                        </span>
                        <span>
                            <span className='text-gray-500 underline truncate'>
                                <TextSkeleton
                                    className='w-40 mt-1'
                                    bgClass='bg-gray-200'
                                />{" "}
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </span>
    );
};

export default ExternalLinkSkeleton;
