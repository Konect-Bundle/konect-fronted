"use client";
import { getCookie } from "cookies-next";
import { UserService } from "@/app/_core/api/services/UserService";
import { User } from "@/app/_core/models/User";
import { useEffect, useState } from "react";
import { dashboardRoute, loginRoute } from "@/app/_core/config/routes";
import { ucfirst } from "@/app/_core/utils/functions";
import { cookies } from "next/headers";

export interface IDashboardPageProps {}

export default function DashboardPage(props: IDashboardPageProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getCookie("konectAuthToken");
            console.log(token);

            if (token) {
                try {
                    const userData = await UserService.getLoggedUser(token);
                    setUser(UserService.buildObjectParser(userData));
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            } else {
                window.location.href = loginRoute.path;
            }
        };

        fetchUser();
    }, []);

    if (!user) return <p>Loading...</p>;
    return <>Bonjour {ucfirst(user.firstname!)}</>;
}
