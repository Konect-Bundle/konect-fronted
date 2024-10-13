"use client";
import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { getCurrentUser } from "@/app/_store/slices/authSlice";
import React, { useEffect } from "react";
import { ucfirst } from "../../_core/utils/functions";
import { Spinner } from "flowbite-react";
import { customSpinnerTheme } from "@/app/_styles/flowbite/spinner";
import { MutatingDots } from "react-loader-spinner";

interface ReduxInitLayoutProps extends React.PropsWithChildren {
    className?: string;
}

const ReduxInitLayout: React.FC<ReduxInitLayoutProps> = ({
    className = "",
    children,
}: ReduxInitLayoutProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useAppSelector((state) => state.auth.isLoading);
    const user = useAppSelector((state) => state.auth.currentUser);

    // const initUser = async () => {

    //     // var token = getCookie(AUTH_TOKEN_NAME);
    //     // if (token) {
    //     //     try {
    //     //         const userData = await UserService.getLoggedUser(token);
    //     //         console.log(userData);

    //     //         const usr: User = UserService.buildObjectParser(userData);
    //     //         if (usr) {
    //     //             dispatch(setUser(usr));
    //     //         }
    //     //     } catch (error) {
    //     //         console.error("Error fetching user:", error);
    //     //     }
    //     // }
    // }
    useEffect(() => {
        if (user === undefined) {
            dispatch(getCurrentUser());
        }
    }, [user, dispatch]);

    return isLoading ? (
        <div className='w-screen h-screen flex justify-center items-center'>
            <MutatingDots
                visible={true}
                height='80'
                width='80'
                color='#e4dc1a'
                secondaryColor='#e4dc1a'
                radius='12.5'
                ariaLabel='mutating-dots-loading'
                wrapperStyle={{}}
                wrapperClass=''
            />
        </div>
    ) : (
        children
    );
};

export default ReduxInitLayout;
