"use client";
import * as React from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Flowbite,
} from "flowbite-react";
import Image from "next/image";
import { usePathname } from 'next/navigation'
import { customNavbarTheme } from "@/app/_styles/flowbite/navbar";
import { customButtonTheme } from "@/app/_styles/flowbite/button";


export interface IAppProps {}

export default function Header(props: IAppProps) {
    const pathname = usePathname()
  return (
      <Navbar fluid rounded theme={customNavbarTheme}>
        <div className="flex md:flex-nowrap space-x-3 flex-nowrap justify-between mx-auto md:py-2 py-1 w-full md:items-center items-start">
          <NavbarBrand href="/">
            <div className="md:h-[100%] h-[72px] bg-gray-900 rounded-xl py-3 px-6 flex items-center justify-center">
              <Image
                width={500}
                height={500}
                src="https://ikonect.info/assets/images/logo-yellow.png"
                className="md:w-8 w-12"
                alt="Flowbite React Logo"
              />
            </div>
          </NavbarBrand>
          <div className="bg-gray-900 w-[inherit] py-3 rounded-xl flex md:items-center items-end justify-end md:order-2 md:flex-row flex-col space-x-4 rtl:space-x-reverse md:pe-6 pe-2">
            <div className="ml-4 flex md:order-2 md:space-x-4 space-x-3">
              <Button theme={customButtonTheme} color="primary" >Get started</Button>
              <Button theme={customButtonTheme} color="primary-light">Get started</Button>
              <NavbarToggle />
            </div>
            <NavbarCollapse className="">
              <NavbarLink href="/" active={pathname=="/" ? true : false}>
                {"Home"}
              </NavbarLink>
              <NavbarLink
                href="/howit"
                active={pathname=="/howit" ? true : false}
              >
                {"How it works"}
              </NavbarLink>
              <NavbarLink
                href="/contact"
                active={pathname=="/contact" ? true : false}
              >
                {"Contact Us"}
              </NavbarLink>
            </NavbarCollapse>
          </div>
        </div>
      </Navbar>
  );
}
