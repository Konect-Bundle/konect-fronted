"use client";
import {useEffect, useRef, useState} from "react";
import {ROOT_ASSETS_URL} from "@/app/_core/config/constants";
import {homeRoute} from "@/app/_core/config/routes";
import Image from "next/image";
import Link from "next/link";
import {TbX} from "react-icons/tb";
import {MdOutlineConnectWithoutContact} from "react-icons/md";
import {ucfirst} from "@/app/_core/utils/functions";
import {Button, Checkbox, type CustomFlowbiteTheme, Label, TextInput} from "flowbite-react";
import {customTextInputTheme} from "@/app/_styles/flowbite/form";
import {customButtonTheme} from "@/app/_styles/flowbite/button";
import CountryCode from "@/app/_components/Common/CountryCode";

import $ from "jquery";
import {KonectService} from "@/app/_core/api/services/KonectService";

interface KuserBlockProps {
    kuser: any,
    callback: ()=> void
}

customTextInputTheme!["addon"] = "inline-flex items-center rounded-l-md border border-r-0 border-gray-300/45 bg-gray-200 px-1.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400"

export default function KuserFeedback({kuser, callback}: KuserBlockProps) {
    const [name, setName] = useState("");
    const [firstname, setFirstname] = useState("");

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleShareInfo = (e: any) => {
        e.preventDefault();
        if(!name ||!firstname ||!email ||!phone) {
            var tel : string = $("#countryCode").val() + phone;
            KonectService.makeFeed(kuser.uuid, kuser.name, kuser.firstname, kuser.email, kuser.vinfo.phone.text).then((rs) => {
               console.log(rs)
                callback()
            })
        }
    }
    return (
        <div className="fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-50">
            <div className="bg-gray-700 opacity-30 h-full w-full">

            </div>
            <div className="md:py-6 md:px-0 absolute w-full h-full md:w-3/4 flex justify-center items-center">
                <div
                    className="w-full h-full md:w-2/4 bg-white md:rounded-md min-w-fit overflow-hidden overflow-y-scroll p-8 md:p-14">
            <span className="flex justify-between py-4  md:mb-24 mb-5">
                <Link href={homeRoute.path} className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Image src={ROOT_ASSETS_URL + "/images/logo.png"} width={500} height={500} className="w-7"
                           alt="Flowbite Logo"/>
                    <span className="ml-1 font-bold text-xl">nect</span>
                </Link>
                <span className="cursor-pointer" id="closeSendContact" onClick={()=>{
                    callback()
                }}>
<TbX className="'w-7 h-7 text-gray-800'"/>
                </span>


            </span>
                    <div className="flex flex-col justify-center">
                        <h2 className=" text-2xl font-bold mb-4 text-gray-800">
                            {("Tell me about you")}
                        </h2>
                        <div
                            className="text-gray-400 font-thin text-sm flex space-x-4 p-4 items-center bg-gray-100 rounded-md">
                            <MdOutlineConnectWithoutContact
                                className="w-6 h-6 text-gray-50"/>
                            <p>Aidez <span
                                className="font-bold text-gray-600">{ucfirst(kuser.firstname) + "!"}</span> à en
                                savoir plus sur vous.</p>
                        </div>
                        <form className="max-w-md mx-auto  md:mx-0 mt-6 w-full" method="POST"
                              onSubmit={handleShareInfo}>
                            <div className="grid md:grid-cols-2 md:gap-6">
                                <div className="mb-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="firstname" value="Your firstname"/>
                                    </div>
                                    <TextInput theme={customTextInputTheme} color="gray" defaultValue={firstname}
                                               id="firstname" type="text" placeholder="" required onChange={(val) => {
                                        setFirstname(val.target.value)
                                    }}/>
                                </div>
                                <div className="mb-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="name" value="Your name"/>
                                    </div>
                                    <TextInput theme={customTextInputTheme} type="text" color="gray" defaultValue={name}
                                               id="name" required onChange={(val) => {
                                        setName(val.target.value)
                                    }}/>
                                </div>

                                <div className="mb-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="email" value="Your email"/>
                                    </div>
                                    <TextInput theme={customTextInputTheme} color="gray" defaultValue={email}
                                               id="email" type="email" placeholder="name@ikonect.me" required
                                               onChange={(val) => {
                                                   setEmail(val.target.value)
                                               }}/>
                                </div>

                                <div className="mb-2">
                                    <div className="mb-2 block">
                                        <Label htmlFor="phone" value="Phone"/>
                                    </div>
                                    <TextInput theme={customTextInputTheme} color="gray" defaultValue={phone}
                                               onChange={(val) => {
                                                   setPhone(val.target.value)
                                               }}
                                               id="phone" type="tel" placeholder="xxxxxxxxxx" required
                                               addon={<CountryCode callback={() => {

                                               }}/>}/>
                                </div>
                                <Button theme={customButtonTheme} color="dark" type="submit" className="mt-4">{(
                                    "Send")}</Button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}

