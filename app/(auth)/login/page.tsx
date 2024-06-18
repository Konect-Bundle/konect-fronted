"use client";
import {useEffect, useState} from "react";
import {Button, Checkbox, Label, TextInput} from "flowbite-react";
import {TbEyeOff, TbEye} from "react-icons/tb";
import $ from "jquery";
import {UserService} from "@/app/_core/api/services/UserService";
import {homeRoute} from "@/app/_core/config/routes";
import { cookies } from 'next/headers'

export interface ILoginFormPageProps {
}

export default function LoginFormPage(props: ILoginFormPageProps) {
    const [email, setEmail] = useState("")
    const [rememberMe, setRemberMe] = useState("off")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        var iconDiv = $("#password").parent().find('div')
        var data = iconDiv.data('testid')
        if (data == "right-icon") {
            iconDiv.addClass("cursor-pointer z-50 pointer-events-auto")
            iconDiv.on('click', () => {
                setShowPassword(!showPassword)
            })
        }
    }, [showPassword]);

    function doAuth(e: any) {
        e.preventDefault()
        if (!email || !password) return

        UserService.login(email, password).then(res => {
            console.log(res)
            // if (res.data.token) {
            //     cookies().set('client_token', res.data.token)
            //     // localStorage.setItem("client_token", res.data.token)
            //     window.location.href = homeRoute.path
            // } else {
            //     console.log(res.message)
            // }
        })

        // setEmail("")
        // setPassword("")
    }

    return (
        <form className="flex max-w-md flex-col gap-4" onSubmit={doAuth}>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Your email"/>
                </div>
                <TextInput id="email1" type="email" placeholder={("Email")} required value={email}
                           onChange={(e) => {
                               setEmail(e.target.value)
                           }}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Your password"/>
                </div>
                <TextInput id="password" type={showPassword ? "text" : "password"}
                           rightIcon={showPassword ? TbEyeOff : TbEye}
                           value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} required placeholder={("Password")}/>
            </div>
            <div className="flex items-center gap-2">
                <Checkbox id="remember" defaultChecked={rememberMe == "on"} onClick={(e) => {
                    setRemberMe(rememberMe == "on" ? "off" : "on")
                }}/>
                <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button color="dark" type="submit">Submit</Button>
        </form>
    );
}
