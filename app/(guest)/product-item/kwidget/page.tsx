import * as React from 'react';
import Button from "@/app/_components/Common/Buttons/Button";
import Header from '@/app/_components/Common/Headers/Header';

export interface KwidgetItemProps {
}

export default function KwidgetItemPage (props: KwidgetItemProps) {
    return (
        <main className="min-h-screen">
            <Header />
            <Button onClick={()=>{ console.log("OK");}} outlined={true} >
                Howit
            </Button>
        </main>
    );
}
