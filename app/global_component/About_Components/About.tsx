"use client";

import Image from "next/image";
import Link from "next/link";
import { motion as Motion } from "motion/react";
import {
    Award,
    Users,
    TrendingUp,
    Target,
    Heart,
    Zap,
    Globe,
    ShieldCheck,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import StatsCard from "@/app/global_component/About_Components/StatsCard";
import Timeline from "@/app/global_component/About_Components/Timeline";
import {HeadingTag} from "@/app/global_component/HeadingTag";

export function About() {

    const values = [
        {
            icon: Target,
            title: "Quality Excellence",
            description: "Premium ingredients and uncompromising standards in every dish",
            gradient: "from-blue-500 to-cyan-500",
        },
        {
            icon: Zap,
            title: "Fast Innovation",
            description: "Cutting-edge technology for seamless ordering and delivery",
            gradient: "from-green-500 to-emerald-500",
        },
        {
            icon: ShieldCheck,
            title: "Trust & Safety",
            description: "Certified food safety practices and hygiene protocols",
            gradient: "from-orange-500 to-amber-500",
        },
    ];

    return (
        <section
            id="about"
            className="relative py-14 md:py-20 bg-linear-to-b from-white via-blue-50/30 to-white overflow-hidden border-t border-gray-100"
        >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-linear-to-br from-[#00B0E6]/10 to-transparent rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-linear-to-tr from-[#7CB342]/10 to-transparent rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
                >
                    <HeadingTag tag="About Jubilant Foodworks" />
                    <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">
                        Transforming Food Service
                        <span className="block mt-2 bg-linear-to-r from-[#0056A3] via-[#00B0E6] to-[#7CB342] bg-clip-text text-transparent pb-2">
                            Across Bangladesh
                        </span>
                    </h2>

                    <p className="text-xl text-gray-600 leading-relaxed font-light">
                        As part of Jubilant FoodWorks Limited, we bring world-class dining
                        experiences to Bangladesh through internationally renowned brands
                        like Domino&apos;s Pizza.
                    </p>
                </Motion.div>

                {/* ── Stats Cards ── */}
                <StatsCard />
                {/* ── Main Content Grid ── */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-14 md:mb-20 ">

                    {/* Left — Text Content */}
                    <div className="space-y-10 order-2 lg:order-1">
                        <Motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                                Delivering Excellence,{" "}
                                <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                  30 Min Delivery Expert
                </span>
                            </h3>

                            <div className="flex items-center gap-2 mb-8">
                                <div className="w-12 h-1.5 bg-[#0056A3] rounded-full" />
                                <div className="w-4 h-1.5 bg-[#00B0E6] rounded-full" />
                                <div className="w-2 h-1.5 bg-[#7CB342] rounded-full" />
                            </div>

                            <div className="space-y-6">
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                                    Since our inception in Bangladesh, we&apos;ve been on a mission to
                                    revolutionize the food service industry. As part of Jubilant
                                    FoodWorks Limited&mdash;a global powerhouse in the QSR
                                    sector&mdash;we combine international expertise with local insights.
                                </p>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                                    Our commitment goes beyond serving delicious food. We&apos;re
                                    building a culture of quality, innovation, and customer satisfaction
                                    that sets new benchmarks in the industry.
                                </p>
                            </div>
                        </Motion.div>

                        {/* Core Values */}
                        <div className="space-y-2">
                            {values.map((value, index) => (
                                <Motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    whileHover={{ x: 10 }}
                                    className="group relative flex items-start gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                                >
                                    <div
                                        className={`w-14 h-14 bg-linear-to-br ${value.gradient} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md text-white group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        <value.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1 text-xl">
                                            {value.title}
                                        </h4>
                                        <p className="text-gray-500 font-medium leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>
                                </Motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right — Visual Content */}
                    <div className="relative order-1 lg:order-2 w-full mt-10 lg:mt-0" style={{ height: "500px" }}>

                        {/* Large image — top right */}
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="absolute top-0 right-0 w-[85%] h-[80%] rounded-[2.5rem] overflow-hidden shadow-2xl z-10 border-4 border-white/50"
                        >
                            <Image
                                src="/assets/About_image_fg.jpeg"
                                alt="Restaurant interior"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 85vw, 42vw"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0056A3]/30 to-transparent mix-blend-multiply" />
                        </Motion.div>

                        {/* Small image — bottom left */}
                        <Motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="absolute bottom-0 left-0 w-[65%] h-[55%] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.15)] border-8 border-white z-20"
                        >
                            <Image
                                src="/assets/About_image_bg.jpg"
                                alt="Delicious food"
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 1024px) 65vw, 32vw"
                            />
                        </Motion.div>

                        {/* Floating Badge */}
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute top-[15%] -left-2 md:-left-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 border border-white z-30 flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-linear-to-br from-[#7CB342] to-[#558B2F] rounded-full flex items-center justify-center text-white shadow-inner">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="pr-2">
                                <div className="text-2xl font-black text-gray-900 leading-none">28.2%</div>
                                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Growth Q4 RY25</div>
                            </div>
                        </Motion.div>

                        {/* Background blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-br from-[#00B0E6]/20 via-transparent to-[#7CB342]/20 rounded-full blur-3xl -z-10" />
                    </div>
                </div>

                {/* ── Timeline ── */}
                <Timeline />
                {/* ── CTA Banner ── */}


            </div>
        </section>
    );
}