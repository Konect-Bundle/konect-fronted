"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../_store/store";
import { User } from "@/app/_core/models/User";
import { setUser as setUserSlice } from "@/app/_store/slices/userSlice";
import { UserService } from "@/app/_core/api/services/UserService";
import { client_token } from "@/app/_core/utils/functions";
import { useAppStore } from "@/app/_store/hooks";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>();
    useEffect(() => {}, []);
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
