import StoreProvider from "@/app/_components/Store/StoreProvider";
import { ROOT_ASSETS_URL } from "@/app/_core/config/constants";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Outfit } from "next/font/google";
import ReduxInitLayout from "./_components/Layouts/ReduxInit";
import "./globals.scss";

const inter = Outfit({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Konect - " + "A link for your value",
    description: "Networking tools and platform",
    authors: { name: "uziel mvuama", url: "https://www.mrlezi.com" },
    applicationName: "Konect",
    keywords: [
        "konect",
        "networking",
        "réseautage",
        "carte",
        "nfc",
        "nfc card",
        "cartes nfc",
        "social",
        "social network",
        "social media",
    ],
    twitter: {
        card: "summary_large_image",
        creator: "@_uziel_mvuama",
        images: ROOT_ASSETS_URL + "/images/logo-yellow-bg.png",
        site: "https://www.ikonect.me",
        title: "Konect - " + "A link for your value",
        description: "Networking tools and  platform",
    },
    openGraph: {
        url: "https://www.ikonect.me",
        title: "Konect - " + "A link for your value",
        siteName: "https://www.ikonect.me/sitemap.xml",
        description: "Networking tools and platform",
        images: [ROOT_ASSETS_URL + "/images/logo-yellow-bg.png"],
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // await AppSPAService.login();

    const locale = await getLocale();

    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();
    // console.log(`\nHOST NAME => ${process.env.NEXT_PUBLIC_BACKEND_URL}\n`);

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <StoreProvider>
                        <ReduxInitLayout>
                            <main className='bg-gray-50 min-h-[100vh] w-full'>
                                {children}
                            </main>
                        </ReduxInitLayout>
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
