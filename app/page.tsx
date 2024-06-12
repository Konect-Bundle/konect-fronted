import Image from "next/image";
import Header from "./_components/Common/Headers/Header";
import ContainerLayout from "@/app/_components/Layouts/Container";
import {Button} from "flowbite-react";
import {TbArrowForwardUpDouble} from "react-icons/tb";
import {DiHtml5Connectivity} from "react-icons/di";

export default function Home() {
  return (
    <main className="md:h-screen h-[70vh] flex flex-col">
      <Header />

        <ContainerLayout className="mt-6 md:mt-1 h-[inherit] flex items-center">
            <div className=" flex items-center bg-white rounded-2xl h-full w-full overflow-hidden">
                <section className="flex items-center justify-center bg-white">
                    <div className="bg-white dark:bg-gray-900 flex justify-between items-center">
                        <div
                            className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                            <div className="mr-auto place-self-center lg:col-span-6 md:ms-20 ms-4">
                                    <span
                                        className="mb-8 inline-flex items-center space-x-2 rounded-full bg-gray-100 p-1 pe-6">
                                        <span
                                            className="h-12 w-12 rounded-full bg-orange-700 flex justify-center items-center">
                                                              <DiHtml5Connectivity className="w-6 h-6 text-gray-50" />
                                        </span>
                                        <span>
                                            {'Networking taken to the next level'}
                                        </span>
                                    </span>
                                <h2
                                    className="max-w-2xl mb-4 text-5xl font-extrabold tracking-tight leading-none md:text-6xl xl:text-7xl text-gray-900">
                                    {'app.bannerText01'}</h2>
                                <p className="max-w-2xl mb-6 font-light text-gray-500  lg:mb-8 md:text-lg lg:text-xl ">
                                    {'app.bannerText02'}.</p>
                                <a href="/contact" className="">
                                    <Button outline color="gray">
                                        <TbArrowForwardUpDouble className={"w-8"}/>
                                        {('Order now')}
                                    </Button>
                                </a>
                            </div>
                            <div data-aos="fade-up-left" data-aos-duration="1000"
                                 className="hidden lg:mt-0 lg:col-span-6 lg:flex relative -right-54 top-20">
                                <Image width={500} height={500} src="https://ikonect.info/assets/images/app/cards/card-black.png"
                                     className="lg:scale-90 xl:scale-90 w-[500px] absolute left-20 -top-24 rotate-[30deg] z-30 border-1 shadow-sm shadow-gray-500 border-zinc-600 rounded-[1.8rem]"
                                     alt="mockup" loading="lazy"/>
                                <Image width={500} height={500} src='https://ikonect.info/assets/images/app/cards/card-white.png'
                                     className="lg:scale-95 xl:scale-90 w-[500px] absolute left-10 top-16 z-0 border-2 rotate-[-35deg] shadow-md shadow-gray-100 border-gray-100 rounded-[1.8rem]"
                                     alt="mockup" loading="lazy"/>

                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </ContainerLayout>

    </main>
  );
}
