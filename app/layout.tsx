import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.scss";

const inter = Onest({
  weight: ["300", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="bg-gray-50 min-h-screen w-screen">
        {children}
      </main>
      </body>
    </html>
  );
}
