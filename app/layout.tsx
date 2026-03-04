import type {Metadata} from "next";

import "./globals.css";

import {Open_Sans, Alata} from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    variable: "--font-open-sans",
    display: "swap",
});
 const alata = Alata({
     subsets: ["latin"],
     weight: "400",
     variable: "--font-alata",
 });

export const metadata: Metadata = {
  title: "Jubilant Foodworks Bangladesh",
  description: "This Website is under Developement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${alata.variable} ${openSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
