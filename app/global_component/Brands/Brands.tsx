'use client'
import {
    MapPin,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import {HeadingTag} from "@/app/global_component/HeadingTag";

export function Brands() {
    const brands = [
        {
            name: "Domino's Pizza",
            tagline: "The World's #1 Pizza Delivery Company",
            description:
                "Experience the authentic taste of premium pizzas with our signature hand-tossed dough, fresh ingredients, and quick delivery. From classic Margherita to innovative specialty pizzas, we bring joy to every bite.",
            image: "/assets/pizzabg.png",
            color: "from-[#0056A3] to-[#00B0E6]",
            bgColor: "from-blue-50 to-cyan-50",
            stats: { locations: "40+ Outlets" },
            link: "/brands/dominos",
        },
    ];

    return (
        <section id="brands" className="py-14 md:py-20 bg-gradient-to-b from-slate-50/80 to-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <HeadingTag tag={"Our Brands"} />

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                        World-Class Brands
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056A3] to-[#00B0E6]">
              We Bring to Bangladesh
            </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Internationally acclaimed food brands with the same
                        quality and taste enjoyed by millions worldwide.
                    </p>
                </div>

                {/* Brands Grid */}
                <div className="space-y-8 max-w-7xl mx-auto">
                    {brands.map((brand, index) => (
                        <div
                            key={index}
                            className={`group relative rounded-3xl overflow-hidden ${
                                index % 2 === 0 ? "" : "lg:flex-row-reverse"
                            }`}
                        >
                            {/* Brand Background Tint */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${brand.bgColor} opacity-50`} />

                            <div className="relative grid lg:grid-cols-2 gap-0">
                                {/* Image Side */}
                                <div
                                    className={`relative h-96 lg:h-[600px] overflow-hidden ${
                                        index % 2 === 0 ? "" : "lg:order-2"
                                    }`}
                                >
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Gradient Overlay */}
                                    <div className={`absolute inset-0 bg-gradient-to-t ${index % 2 === 0 ? 'from-blue-900/40 to-transparent' : 'from-orange-900/40 to-transparent'}`} />

                                    {/* Stats Overlay */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                                            <MapPin className="w-5 h-5 text-[#0056A3]" />
                                            <span className="font-bold text-gray-900 text-lg">
                        {brand.stats.locations}
                      </span>
                                            <span className="text-gray-600">across Bangladesh</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div
                                    className={`relative p-10 md:p-16 flex flex-col justify-center ${
                                        index % 2 === 0 ? "" : "lg:order-1"
                                    }`}
                                >
                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-[#0056A3] mb-6">
                                        <div
                                            className={`w-2 h-2 rounded-full bg-gradient-to-r ${brand.color} animate-pulse`}
                                        />
                                        Featured Brand
                                    </div>

                                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-[#0056A3] transition-colors">
                                        {brand.name}
                                    </h3>

                                    <p className="text-xl font-semibold text-[#00B0E6] mb-6">
                                        {brand.tagline}
                                    </p>

                                    <p className="text-lg text-gray-600 leading-relaxed mb-10">
                                        {brand.description}
                                    </p>

                                    <div className="flex flex-wrap gap-4">
                                        <Link
                                            href={brand.link}
                                            className={`group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${brand.color} text-white rounded-full hover:shadow-2xl transition-all font-bold text-lg hover:scale-105`}
                                        >
                                            Explore Menu
                                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                        </Link>
                                        <a
                                            href="#contact"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            }}
                                            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-full hover:border-[#0056A3] hover:text-[#0056A3] hover:bg-blue-50 transition-all font-semibold text-lg"
                                        >
                                            <MapPin className="w-5 h-5" />
                                            Find Location
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}