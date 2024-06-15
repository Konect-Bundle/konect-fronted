import * as React from 'react';
import Header from '@/app/_components/Common/Headers/Header';
import ContainerLayout from "@/app/_components/Layouts/Container";
import {Breadcrumb, Button} from "flowbite-react";
import {productsRoute} from "@/app/_core/config/routes";
import Image from "next/image";
import Link from "next/link";
import {customButtonTheme} from "@/app/_styles/flowbite/button";

export interface KwidgetListProps {
}

export default function KwidgetListPage (props: KwidgetListProps) {
    return (
        <main className="min-h-screen">
            <Header />
            
        </main>
    );
}
