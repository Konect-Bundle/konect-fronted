import * as React from "react";
import { GiNightSleep } from "react-icons/gi";
import { ReactNode } from "react";

export interface IFooterProps {
    icon?: ReactNode;
}

export default function NoResultFound({
    icon = <GiNightSleep />,
}: IFooterProps) {
    return (
        <div className='flex flex-col w-full space-y-3 items-center'>
            <span className='text-gray-300/15 text-8xl'>{icon}</span>
            <p className='font-normal text-gray-400'>No result found</p>
        </div>
    );
}
