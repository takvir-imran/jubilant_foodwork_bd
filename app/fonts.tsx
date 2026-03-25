import { Open_Sans, Alata } from "next/font/google";

export const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
    fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const alata = Alata({
    subsets: ["latin"],
    weight: "400",
    fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});