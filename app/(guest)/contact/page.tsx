import * as React from "react";
import Header from "@/app/_components/Common/Headers/Header";
import Footer from "@/app/_components/Common/Footers/Footer";
import ContainerLayout from "@/app/_components/Layouts/Container";
import { Button } from "flowbite-react";
import { customButtonTheme } from "@/app/_styles/flowbite/button";

export interface IContactPageProps {}

export default function ContactPage(props: IContactPageProps) {
    return (
        <main className="min-h-screen">
            <Header />

            <section className="mb-8">
                <div className="">
                    <ContainerLayout className="py-10 bg-white rounded-2xl">
                        {/*Contact Us*/}
                        <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
                            <div className="max-w-2xl lg:max-w-5xl mx-auto">
                                <div className="text-center">
                                    <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                                        {"Contact us"}
                                    </h1>
                                    <p className="mt-1 text-gray-600 dark:text-neutral-400">
                                        {
                                            "We'd love to talk about how we can help you."
                                        }
                                    </p>
                                </div>

                                <div className="mt-12 grid items-center lg:grid-cols-2 gap-6 lg:gap-16">
                                    {/*Card*/}
                                    <div className="flex flex-col rounded-xl p-4 sm:p-6 lg:p-8 ">
                                        <h2 className="mb-8 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                                            {"Fill in the form"}
                                        </h2>

                                        <form>
                                            <div className="grid gap-4">
                                                {/*Grid*/}
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div>
                                                        <label
                                                            htmlFor="hs-firstname-contacts-1"
                                                            className="sr-only"
                                                        >
                                                            {"Your firstname"}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="hs-firstname-contacts-1"
                                                            id="hs-firstname-contacts-1"
                                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                        />
                                                        <div>
                                                            {/*<span className="error"></span>*/}
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label
                                                            htmlFor="hs-lastname-contacts-1"
                                                            className="sr-only"
                                                        >
                                                            {"Your name"}
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="hs-lastname-contacts-1"
                                                            id="hs-lastname-contacts-1"
                                                            className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                        />
                                                        <div>
                                                            {/*<span className="error"></span>*/}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*End Grid*/}

                                                <div>
                                                    <label
                                                        htmlFor="hs-email-contacts-1"
                                                        className="sr-only"
                                                    >
                                                        {"Your email"}
                                                    </label>
                                                    <input
                                                        type="email"
                                                        name="hs-email-contacts-1"
                                                        id="hs-email-contacts-1"
                                                        autoComplete="email"
                                                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                    />
                                                    <div>
                                                        {/*<span className="error"></span>*/}
                                                    </div>
                                                </div>

                                                <div>
                                                    <label
                                                        htmlFor="hs-about-contacts-1"
                                                        className="sr-only"
                                                    >
                                                        {"Message"}
                                                    </label>
                                                    <textarea
                                                        id="hs-about-contacts-1"
                                                        name="hs-about-contacts-1"
                                                        rows={4}
                                                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                    ></textarea>
                                                    <div>
                                                        {/*<span className="error"></span>*/}
                                                    </div>
                                                </div>
                                            </div>
                                            {/*End Grid */}

                                            <div className="mt-4 grid">
                                                <Button
                                                    theme={customButtonTheme}
                                                    color="dark"
                                                >
                                                    {"Send now"}
                                                </Button>
                                            </div>

                                            <div className="mt-3 text-center">
                                                <p className="text-sm text-gray-500 dark:text-neutral-500">
                                                    {
                                                        "We'll get back to you in 1-2 business days."
                                                    }
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                    {/*End Card*/}

                                    <div className="divide-y divide-gray-200">
                                        {/*Icon Block*/}
                                        <div className="flex gap-x-7 py-6">
                                            <svg
                                                className="flex-shrink-0 size-6 mt-1.5 text-gray-800 dark:text-neutral-200"
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
                                                <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
                                                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
                                            </svg>
                                            <div className="grow">
                                                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">
                                                    {"Contact us by email"}
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                                    {
                                                        "If you wish to write us an email instead please use"
                                                    }
                                                </p>
                                                <a
                                                    href="mailto:customers.support@ikonect.me"
                                                    className="mt-2 inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                                                >
                                                    customers.support@ikonect.me
                                                </a>
                                            </div>
                                        </div>
                                        {/*End Icon Block*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*End Contact Us*/}
                    </ContainerLayout>
                </div>
            </section>

            <Footer />
        </main>
    );
}