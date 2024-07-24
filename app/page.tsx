"use client";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import Header from "./_components/Common/Headers/Header";
import Footer from "./_components/Common/Footers/Footer";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { Button } from "flowbite-react";
import { TbAdjustmentsHorizontal, TbArrowForwardUpDouble, TbPhoneCall, TbTruckDelivery, TbUsersGroup } from "react-icons/tb";
import { DiHtml5Connectivity } from "react-icons/di";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import { useEffect } from "react";
import { customButtonTheme } from "@/app/_styles/flowbite/button";
import { productsRoute } from "@/app/_core/config/routes";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations("Home");
    const tActions = useTranslations("Actions");

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <main className="flex flex-col">
            <div className="flex flex-col md:h-screen h-[80vh]">
                <Header />
                <ContainerLayout className="mt-6 md:mt-1 h-[inherit] flex items-center">
                    <div className=" flex items-center bg-white rounded-2xl h-full w-full overflow-hidden">
                        <section className="flex items-center justify-center bg-white">
                            <div className="bg-white dark:bg-gray-900 flex justify-between items-center">
                                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                                    <div className="mr-auto place-self-center lg:col-span-6 md:ms-20 ms-4">
                                        <span className="mb-8 inline-flex items-center space-x-2 rounded-full bg-gray-100 p-1 pe-6">
                                            <span className="h-12 w-12 rounded-full bg-orange-700 flex justify-center items-center">
                                                <MdOutlineConnectWithoutContact className="w-6 h-6 text-gray-50" />
                                            </span>
                                            <span>{t("label_01")}</span>
                                        </span>
                                        <h2 className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-gray-900">
                                            {t("bannerText01")}
                                        </h2>
                                        <p className="max-w-2xl mb-6 font-light text-gray-500  lg:mb-8 md:text-lg lg:text-xl ">
                                            {t("bannerText02")}.
                                        </p>
                                        <Link
                                            href={productsRoute.path}
                                            className=""
                                        >
                                            <Button
                                                theme={customButtonTheme}
                                                outline
                                                color="gray"
                                                size="md"
                                                className="px-6 text-md uppercase"
                                            >
                                                <TbArrowForwardUpDouble
                                                    className={"w-6 h-6 mr-2"}
                                                />
                                                {tActions("order_now")}
                                            </Button>
                                        </Link>
                                    </div>
                                    <div
                                        data-aos="fade-up-left"
                                        data-aos-duration="1000"
                                        className="hidden lg:mt-0 lg:col-span-6 lg:flex relative -right-54 top-20"
                                    >
                                        <Image
                                            width={500}
                                            height={500}
                                            src="https://ikonect.info/assets/images/app/cards/card-black.png"
                                            className="lg:scale-90 xl:scale-90 w-[500px] absolute left-20 -top-24 rotate-[30deg] z-30 border-1 shadow-sm shadow-gray-500 border-zinc-600 rounded-[1.8rem]"
                                            alt="mockup"
                                            loading="lazy"
                                        />
                                        <Image
                                            width={500}
                                            height={500}
                                            src="https://ikonect.info/assets/images/app/cards/card-white.png"
                                            className="lg:scale-95 xl:scale-90 w-[500px] absolute left-10 top-16 z-0 border-2 rotate-[-35deg] shadow-md shadow-gray-100 border-gray-100 rounded-[1.8rem]"
                                            alt="mockup"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </ContainerLayout>
            </div>
            {/* 
            <ContainerLayout>
                <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12"  data-aos="fade-up" data-aos-duration="800">
                        
                        <div>
                        <TbUsersGroup size={30}/>

                            <div className="bg-gradient-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
                                <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600" />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Networking
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Components are easily customized and extendable
                                </p>
                            </div>
                        </div>
                       
                        <div>
                        <TbAdjustmentsHorizontal size={30}/>

                            <div className="bg-gradient-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
                                <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600" />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    Customizable
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Components are easily customized and extendable
                                </p>
                            </div>
                        </div>
                      
                        <div>
                            <TbPhoneCall size={30}/>
                            <div className="bg-gradient-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
                                <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600" />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    24/7 Support
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Contact us 24 hours a day, 7 days a week
                                </p>
                            </div>
                        </div>
                       
                        <div>
                        <TbTruckDelivery size={30}/>

                            <div className="bg-gradient-to-r from-gray-200 via-gray-50 to-transparent h-0.5 mt-6 dark:from-neutral-700 dark:via-neutral-900">
                                <div className="bg-gray-400 w-9 h-0.5 dark:bg-neutral-600" />
                            </div>
                            <div className="mt-5">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    24/7 Support
                                </h3>
                                <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                    Contact us 24 hours a day, 7 days a week
                                </p>
                            </div>
                        </div>                  </div>
                </div>
            </ContainerLayout> */}

            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div className="max-w-2xl mx-auto">
                    {/* -- Grid --*/}
                    <div className="grid gap-12">
                        <div data-aos="fade-up" data-aos-duration="800">
                            <h2
                                data-aos="fade-up"
                                data-aos-duration="800"
                                className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white"
                            >
                                {"Our vision"}
                            </h2>
                            <p className="mt-3 text-gray-800 dark:text-neutral-400">
                                {t("index_vision_text")}
                            </p>
                        </div>

                        <div className="space-y-6 lg:space-y-10">
                            {/*Icon Block*/}
                            <div
                                data-aos="fade-up-right"
                                data-aos-duration="700"
                                className="flex"
                            >
                                <svg
                                    className="flex-shrink-0 mt-2 size-6 text-gray-800 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                                    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                                    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                                    <path d="M10 6h4" />
                                    <path d="M10 10h4" />
                                    <path d="M10 14h4" />
                                    <path d="M10 18h4" />
                                </svg>
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                        {t("index_vision_title01")}
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                        {t("index_vision_section01")}
                                    </p>
                                </div>
                            </div>
                            {/*End Icon Block*/}

                            {/*Icon Block*/}
                            <div
                                data-aos="fade-left"
                                data-aos-duration="700"
                                className="flex"
                            >
                                <svg
                                    className="w-6 h-6 text-gray-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"
                                    />
                                </svg>

                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                        {t("index_vision_title02")}
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                        {t("index_vision_section02")}
                                    </p>
                                </div>
                            </div>
                            {/*End Icon Block*/}

                            {/*Icon Block*/}
                            <div
                                data-aos="fade-up-left"
                                data-aos-duration="700"
                                className="flex"
                            >
                                <svg
                                    className="flex-shrink-0 mt-2 size-6 text-gray-800 dark:text-white"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M7 10v12" />
                                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                                </svg>
                                <div className="ms-5 sm:ms-8">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-neutral-200">
                                        {t("index_vision_title03")}
                                    </h3>
                                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                        {t("index_vision_section03")}
                                    </p>
                                </div>
                            </div>
                            {/*End Icon Block */}
                        </div>
                    </div>
                    {/*End Grid*/}
                </div>
            </div>
            {/*Features*/}
            <div className="h-screen w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
                <div
                    data-aos="fade-down"
                    data-aos-duration="500"
                    className="=min-h-[35vh] h-full bg-[url('https://images.unsplash.com/photo-1665686374006-b8f04cf62d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-center bg-cover bg-no-repeat relative rounded-xl md:min-h-[75vh]"
                >
                    <div
                        className="absolute
            bottom-0 start-0 end-0 max-w-xs text-center mx-auto p-6 md:start-auto md:text-start md:mx-0"
                    >
                        {/*Card*/}
                        <div className="px-5 py-4 inline-block bg-white rounded-lg md:p-7 dark:bg-neutral-800">
                            <div className="hidden md:block">
                                <h3 className="text-lg font-bold text-gray-800 sm:text-2xl dark:text-neutral-200">
                                    {t("how_does_section")}
                                </h3>
                                <p className="mt-2 text-gray-800 dark:text-neutral-200">
                                    {t("learn_about_text")}
                                </p>
                            </div>

                            <div className="md:mt-16">
                                <a
                                    className="flex items-center gap-2 text-sm font-medium text-gray-800 hover:text-gray-500 dark:text-white dark:hover:text-neutral-400"
                                    href="#"
                                >
                                    <svg
                                        className="flex-shrink-0 size-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                    {t("watch_tutorial_text")}
                                </a>
                            </div>
                        </div>
                        {/*End Card*/}
                    </div>
                </div>
            </div>
            {/*End Features*/}

            <Footer />
        </main>
    );
}
