import Image from "next/image";
import { ROOT_ASSETS_URL } from "../_core/config/constants";

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="h-screen bg-white w-screen grid md:grid-cols-2 grid-cols-1">
            <div className="h-full w-full">
                <div className="flex justify-center items-center">
                    <div className="absolute top-6">
                        <Image
                            width={500}
                            height={500}
                            src={ROOT_ASSETS_URL + "/images/logo.png"}
                            className="md:w-8 w-12"
                            alt="Flowbite React Logo"
                            priority={true}
                        />
                    </div>
                </div>

                {children}
            </div>
            <div className="h-full bg-black-light md:block hidden"></div>
        </section>
    );
}
