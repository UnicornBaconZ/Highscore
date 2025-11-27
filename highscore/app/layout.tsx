import type { Metadata } from "next";
import localFont from "next/font/local";
import "./tailwind.css";
import { Navbar } from "@/components/Navbar";

const pressStart = localFont({
    src: "./fonts/PressStart2P-vaV7.ttf",
    display: "swap",
    variable: "--font-pressstart",
});

export const metadata: Metadata = {
    title: "Zarin Vansteelandt | Portfolio",
    description: "Retro portfolio",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={pressStart.variable}>
        <body className="bg-[#F3EFE0] text-[#1A1A1A] border-[#2D2A32]">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
        </body>
        </html>
    );
}
