"use client";

import Header from "@/app/global_component/Header";
import { Footer } from "@/app/global_component/Footer_Components/Footer";
import { HeadingTag } from "@/app/global_component/HeadingTag";
import { motion as Motion } from "motion/react";
import { Rocket, Store, MapPin, TrendingUp, Award, Users, Sparkles, Globe } from "lucide-react";

type Milestone = {
    year: string;
    quarter?: string;
    icon: typeof Rocket;
    title: string;
    desc: string;
    accent: string;
};

const milestones: Milestone[] = [
    {
        year: "2019", quarter: "Q3",
        icon: Rocket,
        title: "Bangladesh Launch",
        desc: "Jubilant FoodWorks Bangladesh opens its first Domino's Pizza outlet in Dhaka — bringing the world's #1 pizza brand to the country.",
        accent: "from-[#0056A3] to-[#00B0E6]",
    },
    {
        year: "2020", quarter: "Q2",
        icon: Sparkles,
        title: "Digital Ordering Launched",
        desc: "Native iOS and Android apps go live, enabling 30-minute delivery tracked end-to-end.",
        accent: "from-[#00B0E6] to-[#0090c5]",
    },
    {
        year: "2022", quarter: "Q1",
        icon: Store,
        title: "10 Stores Across Dhaka",
        desc: "Reached double-digit outlets across Dhaka — establishing dominance in the metro.",
        accent: "from-[#7CB342] to-[#558B2F]",
    },
    {
        year: "2023", quarter: "Q3",
        icon: MapPin,
        title: "First Store in Chittagong",
        desc: "Expanded outside Dhaka — opened our first Chittagong outlet to serve the port city.",
        accent: "from-[#FFB300] to-[#FF8F00]",
    },
    {
        year: "2024", quarter: "Q4",
        icon: Award,
        title: "Excellence in Business Award",
        desc: "Recognized at the Bangladesh Business Awards for service excellence and operational scale.",
        accent: "from-[#E41134] to-[#B5112A]",
    },
    {
        year: "2025", quarter: "Q2",
        icon: Globe,
        title: "Nationwide Expansion",
        desc: "New outlets in Cox's Bazar, Khulna, and Sylhet — taking the brand to every corner of Bangladesh.",
        accent: "from-[#0056A3] to-[#00B0E6]",
    },
    {
        year: "2025", quarter: "Q4",
        icon: Users,
        title: "1 Million Customers Served",
        desc: "Crossed the 1M cumulative customer milestone — a defining moment for the team.",
        accent: "from-[#7CB342] to-[#558B2F]",
    },
    {
        year: "2026", quarter: "Q1",
        icon: TrendingUp,
        title: "Chairperson's Award",
        desc: "Honored at the Bangladesh Retail Excellence Awards — the highest industry recognition.",
        accent: "from-[#FFB300] to-[#FF8F00]",
    },
];

export default function MilestonesPage() {
    return (
        <>
            <Header />
            <main>
                {/* ── Hero ── */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#0056A3] via-[#00498F] to-[#00B0E6] py-24 md:py-32">
                    <div className="absolute inset-0 opacity-25 pointer-events-none"
                         style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#7CB342]/25 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#FFB300]/20 blur-3xl" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <Motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-[0.3em] uppercase mb-6"
                        >
                            Our Journey
                        </Motion.p>
                        <Motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
                        >
                            Milestones
                        </Motion.h1>
                        <Motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            Seven years. Eight defining moments. Here&apos;s how we became
                            Bangladesh&apos;s fastest-growing food service company.
                        </Motion.p>
                    </div>
                </section>

                {/* ── Vertical Timeline ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="max-w-5xl mx-auto relative">

                        {/* Centre rail (desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2 bg-linear-to-b from-[#0056A3] via-[#00B0E6] to-[#7CB342] opacity-25 rounded-full" />

                        {/* Side rail (mobile) */}
                        <div className="md:hidden absolute left-5 top-0 bottom-0 w-[3px] bg-linear-to-b from-[#0056A3] via-[#00B0E6] to-[#7CB342] opacity-25 rounded-full" />

                        <div className="space-y-10 md:space-y-16">
                            {milestones.map((m, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <Motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-80px" }}
                                        transition={{ duration: 0.6 }}
                                        className="relative"
                                    >
                                        {/* Centre node (desktop) */}
                                        <div className={`hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center shadow-xl bg-linear-to-br ${m.accent} text-white border-4 border-white z-10`}>
                                            <m.icon className="w-5 h-5" />
                                        </div>

                                        {/* Side node (mobile) */}
                                        <div className={`md:hidden absolute left-5 top-6 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-xl bg-linear-to-br ${m.accent} text-white border-4 border-white z-10`}>
                                            <m.icon className="w-4 h-4" />
                                        </div>

                                        {/* Card */}
                                        <div className={`md:w-[calc(50%-3rem)] pl-14 md:pl-0 ${isLeft ? "md:mr-auto md:pr-0 md:text-right" : "md:ml-auto"}`}>
                                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_20px_50px_rgba(0,86,163,0.12)] border border-gray-100 transition-all">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r ${m.accent} text-white text-xs font-bold tracking-widest mb-4`}>
                                                    {m.year}{m.quarter && <span className="opacity-75">· {m.quarter}</span>}
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight leading-tight">
                                                    {m.title}
                                                </h3>
                                                <p className="text-gray-600 leading-relaxed font-light">
                                                    {m.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </Motion.div>
                                );
                            })}
                        </div>

                        {/* End cap */}
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative mt-12 md:mt-16 flex justify-center md:justify-center md:pl-0 pl-14"
                        >
                            <div className="md:absolute md:left-1/2 md:-translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-linear-to-r from-[#0056A3] to-[#00B0E6] text-white shadow-lg">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-bold tracking-wide">More chapters coming soon</span>
                            </div>
                        </Motion.div>
                    </div>
                </section>

                {/* ── Stats Strip ── */}
                <section className="bg-linear-to-br from-[#0056A3] to-[#00B0E6] py-14 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center text-white">
                            {[
                                { v: "7+",  l: "Years in Market" },
                                { v: "40+", l: "Outlets" },
                                { v: "1M+", l: "Customers" },
                                { v: "8",   l: "Major Milestones" },
                            ].map((s, i) => (
                                <Motion.div
                                    key={s.l}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div className="text-5xl md:text-6xl font-black tracking-tight">{s.v}</div>
                                    <div className="mt-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/75">{s.l}</div>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
