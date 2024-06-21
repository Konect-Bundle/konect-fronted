import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import {UserService} from "@/app/_core/api/services/UserService";


export interface IDashboardPageProps {
}

export default async function DashboardPage(props: IDashboardPageProps) {
    // const user= await UserService.getLoggedUser()
    return (
        <>
        Bonjour user
        </>
    );
}
