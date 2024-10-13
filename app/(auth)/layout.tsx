import Image from "next/image";
import { ROOT_ASSETS_URL } from "../_core/config/constants";

export default function AuthLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-[100vh] bg-gray-50 w-screen grid md:grid-cols-2 grid-cols-1'>
            <div className='flex justify-center items-center p-8'>
                {/* <div className="flex justify-center items-center">
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
                </div> */}

                <div className='bg-white rounded-lg w-max h-max md:py-4 px-8 py-8 border border-gray-300/20'>
                    {children}
                </div>
            </div>
            <div className='h-full w-full md:block hidden bg-auth-bg bg-cover bg-center'></div>
        </div>
    );
}
