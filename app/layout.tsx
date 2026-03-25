import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Open_Sans, Alata } from "next/font/google";
import {WelcomeCouponModal} from "@/app/global_component/WelcomeCoupon";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
    title: "Jubilant Foodworks Bangladesh",
    description: "This Website is under Development",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased">
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
                strategy="beforeInteractive"
            />
            {children}
            <WelcomeCouponModal />
            </body>
        </html>
    );
}