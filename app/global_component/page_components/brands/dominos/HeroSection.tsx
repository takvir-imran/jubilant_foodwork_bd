'use client'
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import StatSection from "@/app/global_component/page_components/brands/dominos/StatSection";


export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(true);
    const [scrollY, setScrollY] = useState(0);  // ← add this

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className="absolute inset-0 bg-black"
            style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
            <Image
                src="/assets/dominos/HeroBanner.png"
                alt="Domino's Pizza"
                className="w-full h-full object-cover scale-110"
                fill
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex items-center">
                <div
                    className={`max-w-3xl transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                        Delivering <br />
                        <span className="text-[#00B0E6]">Happiness</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                        A global leader in pizza delivery, bringing joy to millions across
                        Bangladesh under Jubilant FoodWorks.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0056A3] text-white rounded-full font-bold text-lg hover:bg-[#00B0E6] transition-all hover:shadow-2xl hover:scale-105">
                            Order Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}