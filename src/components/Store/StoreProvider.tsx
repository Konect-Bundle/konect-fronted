"use client";
import { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../store/store";
import { User } from "@/core/models/User";
import { UserService } from "@/core/api/services/UserService";
import { client_token } from "@/core/utils/functions";
import { useAppStore } from "@/store/hooks";

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
