import type { Metadata } from "next";
import "./globals.css";
import { Open_Sans, Alata, Montserrat, DM_Sans, Playfair_Display } from "next/font/google";
import {WelcomeCouponModal} from "@/app/global_component/WelcomeCoupon";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

const alata = Alata({
    subsets: ["latin"],
    weight: "400",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "600", "700", "800", "900"],
    variable: "--font-montserrat",
});

const dmSans = DM_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "500"],
    variable: "--font-dm-sans",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    weight: ["700", "900"],
    variable: "--font-playfair",
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
            <body className={`antialiased ${montserrat.variable} ${dmSans.variable} ${playfair.variable}`}>
            {children}
            <WelcomeCouponModal />
            </body>
        </html>
    );
}