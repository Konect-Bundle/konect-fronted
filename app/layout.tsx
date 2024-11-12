import StoreProvider from "@/app/_components/Store/StoreProvider";
import { ROOT_ASSETS_URL } from "@/app/_core/config/constants";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Outfit } from "next/font/google";
import ReduxInitLayout from "./_components/Layouts/ReduxInit";
import "./globals.scss";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Outfit({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title:
        "Konect - " +
        "Modern networking solution | Solution de networking moderne",
    description:
        "Konect : The innovative solution for sharing contacts easily with NFC and QR cards. Simplified networking for professionals and individuals.",
    authors: { name: "uziel mvuama", url: "https://www.mrlezi.com" },
    applicationName: "Konect",
    keywords: [
        "ikonect",
        "ikonect.me",
        "konect",
        "networking",
        "réseautage",
        "carte",
        "nfc",
        "nfc card",
        "business card",
        "cartes nfc",
        "cartes de visite",
        "social",
        "social network",
        "social media",
    ],
    twitter: {
        card: "summary_large_image",
        creator: "@_uziel_mvuama",
        images: ROOT_ASSETS_URL + "/images/logo-yellow-bg.png",
        site: "https://www.Konect.me",
        title: "Konect - " + "A link for your value",
        description: "Networking tools and  platform",
    },
    openGraph: {
        url: "https://www.Konect.me",
        title: "Konect - " + "A link for your value",
        siteName: "https://www.Konect.me/sitemap.xml",
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
                                <Analytics />
                                <SpeedInsights />
                            </main>
                        </ReduxInitLayout>
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
