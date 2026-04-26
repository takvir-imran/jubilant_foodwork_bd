"use client";

import Header from "@/app/global_component/Header";
import { Footer } from "@/app/global_component/Footer_Components/Footer";
import { HeadingTag } from "@/app/global_component/HeadingTag";
import { motion as Motion } from "motion/react";
import Image from "next/image";
import { Trophy, Award, Star, Medal } from "lucide-react";

type AwardItem = {
    id: number;
    year: string;
    title: string;
    org: string;
    category: string;
    image: string;
    icon: typeof Trophy;
    accent: string;
    accentLight: string;
    desc: string;
};

const awards: AwardItem[] = [
    {
        id: 1, year: "2026",
        title: "Chairperson's Award",
        org: "Bangladesh Retail Excellence Awards",
        category: "Featured",
        image: "/assets/CPAAward.jpeg",
        icon: Trophy,
        accent: "from-[#FFB300] to-[#FF8F00]",
        accentLight: "bg-amber-50",
        desc: "Highest industry recognition for retail excellence and customer service across the food service sector.",
    },
    {
        id: 2, year: "2024",
        title: "Excellence in Business",
        org: "Bangladesh Business Awards",
        category: "Excellence",
        image: "/assets/Award2.jpeg",
        icon: Award,
        accent: "from-[#0056A3] to-[#00B0E6]",
        accentLight: "bg-blue-50",
        desc: "Recognized for operational scale, service excellence, and contribution to the QSR industry in Bangladesh.",
    },
];

const recognitions = [
    { icon: Star,   label: "Top Employer Brand",         year: "2024", color: "from-[#7CB342] to-[#558B2F]" },
    { icon: Medal,  label: "Customer Choice — QSR",      year: "2023", color: "from-[#0056A3] to-[#00B0E6]" },
    { icon: Trophy, label: "Fastest Growing Franchisee", year: "2023", color: "from-[#FFB300] to-[#FF8F00]" },
    { icon: Award,  label: "Food Safety Excellence",     year: "2022", color: "from-[#E41134] to-[#B5112A]" },
];

export default function AwardsPage() {
    return (
        <>
            <Header />
            <main>
                {/* ── Hero ── */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#FFB300] via-[#FF8F00] to-[#E65100] py-24 md:py-32">
                    <div className="absolute inset-0 opacity-25 pointer-events-none"
                         style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#0056A3]/30 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-white/15 blur-3xl" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <Motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="inline-flex w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 items-center justify-center mb-6"
                        >
                            <Trophy className="w-10 h-10 text-white" />
                        </Motion.div>
                        <Motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
                        >
                            Awards & Recognition
                        </Motion.h1>
                        <Motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            A legacy built on trust, quality, and the relentless pursuit of
                            excellence — one award at a time.
                        </Motion.p>
                    </div>
                </section>

                {/* ── Featured Awards (large cards) ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
                    >
                        <HeadingTag tag="Featured Honors" />
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Our Most{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                Treasured Wins
                            </span>
                        </h2>
                    </Motion.div>

                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
                        {awards.map((a, i) => (
                            <Motion.article
                                key={a.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="group relative rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_30px_60px_rgba(0,86,163,0.15)] border border-gray-100 transition-all"
                            >
                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <Image
                                        src={a.image}
                                        alt={a.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                                    <div className={`absolute top-0 left-0 h-1 w-full bg-linear-to-r ${a.accent}`} />

                                    {/* Year badge */}
                                    <div className="absolute top-5 right-5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black tracking-wider text-gray-900">
                                        {a.year}
                                    </div>

                                    {/* Category pill */}
                                    <div className={`absolute top-5 left-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r ${a.accent} text-white text-[10px] font-black uppercase tracking-widest shadow-md`}>
                                        <a.icon className="w-3 h-3" /> {a.category}
                                    </div>

                                    {/* Title overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                                        <h3 className="text-2xl md:text-3xl font-black leading-tight tracking-tight mb-1">
                                            {a.title}
                                        </h3>
                                        <p className="text-sm font-medium text-white/85">{a.org}</p>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="p-6 md:p-8">
                                    <p className="text-gray-600 leading-relaxed font-light">{a.desc}</p>
                                </div>
                            </Motion.article>
                        ))}
                    </div>
                </section>

                {/* ── Other Recognitions ── */}
                <section className="bg-linear-to-b from-white via-blue-50/40 to-white py-16 md:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <Motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-2xl mx-auto mb-12"
                        >
                            <HeadingTag tag="Other Recognitions" />
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                                Industry &{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                    Customer Awards
                                </span>
                            </h2>
                        </Motion.div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 max-w-6xl mx-auto">
                            {recognitions.map((r, i) => (
                                <Motion.div
                                    key={r.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_18px_40px_rgba(0,86,163,0.10)] transition-all overflow-hidden text-center"
                                >
                                    <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-linear-to-br ${r.color} opacity-10 blur-2xl group-hover:opacity-25 transition-opacity`} />
                                    <div className={`relative inline-flex w-14 h-14 rounded-2xl items-center justify-center bg-linear-to-br ${r.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                                        <r.icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">{r.label}</h3>
                                    <p className="text-xs font-bold tracking-widest uppercase text-[#0056A3]">{r.year}</p>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Closing strip ── */}
                <section className="bg-linear-to-br from-[#0056A3] to-[#00B0E6] py-14 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <Motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl mx-auto"
                        >
                            <Trophy className="w-12 h-12 text-white/80 mx-auto mb-5" />
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                                Awards reflect the trust of our customers.
                            </h2>
                            <p className="text-lg text-white/85 font-light">
                                Every recognition is a tribute to the team that earns it — every day,
                                in every kitchen, on every delivery.
                            </p>
                        </Motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
