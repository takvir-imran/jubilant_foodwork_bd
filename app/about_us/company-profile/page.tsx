"use client";

import Header from "@/app/global_component/Header";
import { Footer } from "@/app/global_component/Footer_Components/Footer";
import { HeadingTag } from "@/app/global_component/HeadingTag";
import StatsCard from "@/app/global_component/About_Components/StatsCard";
import CTABanner from "@/app/global_component/About_Components/CTABanner";
import { motion as Motion } from "motion/react";
import {
    Target,
    Eye,
    Heart,
    ShieldCheck,
    Zap,
    Users,
    Award,
    Building2,
} from "lucide-react";

const values = [
    { icon: ShieldCheck, title: "Integrity", desc: "We do the right thing — always.", color: "from-[#0056A3] to-[#00B0E6]" },
    { icon: Zap,         title: "Innovation", desc: "We challenge convention to delight customers.", color: "from-[#7CB342] to-[#558B2F]" },
    { icon: Users,       title: "People First", desc: "We invest in our people, partners, and communities.", color: "from-[#FFB300] to-[#FF8F00]" },
    { icon: Heart,       title: "Customer Obsession", desc: "Every decision starts with the customer.", color: "from-[#E41134] to-[#B5112A]" },
    { icon: Award,       title: "Excellence", desc: "Uncompromising standards in every plate served.", color: "from-[#0056A3] to-[#003d7a]" },
    { icon: Building2,   title: "Sustainability", desc: "Building a responsible food service for tomorrow.", color: "from-[#00B0E6] to-[#0090c5]" },
];

export default function CompanyProfilePage() {
    return (
        <>
            <Header />
            <main>
                {/* ── Hero ── */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#0056A3] via-[#004B96] to-[#00B0E6] py-24 md:py-36">
                    <div className="absolute inset-0 opacity-30 pointer-events-none"
                         style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#FFB300]/20 blur-3xl" />
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#7CB342]/20 blur-3xl" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <Motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-[0.3em] uppercase mb-6"
                        >
                            About Us
                        </Motion.p>
                        <Motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
                        >
                            Company Profile
                        </Motion.h1>
                        <Motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed font-light"
                        >
                            Jubilant FoodWorks Bangladesh brings world-class dining
                            experiences to Bangladesh — operating as part of one of the
                            largest food service companies in South Asia.
                        </Motion.p>
                    </div>
                </section>

                {/* ── Stats ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
                    <StatsCard />
                </section>

                {/* ── Who We Are ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                    <div className="grid lg:grid-cols-5 gap-12 items-start">
                        <Motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-2"
                        >
                            <HeadingTag tag="Who We Are" />
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                                Powered by{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                    Global Expertise
                                </span>
                            </h2>
                        </Motion.div>

                        <Motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="lg:col-span-3 space-y-6 text-lg text-gray-600 leading-relaxed font-light"
                        >
                            <p>
                                Jubilant FoodWorks Bangladesh Limited is the master franchisee
                                for Domino&apos;s Pizza in Bangladesh — part of Jubilant
                                FoodWorks Limited (JFL), a global powerhouse in the QSR sector
                                with operations across India, Sri Lanka, Bangladesh, Nepal, and
                                Türkiye.
                            </p>
                            <p>
                                Since launching in 2019, we&apos;ve scaled to 40+ outlets
                                nationwide, served over 1 million customers, and built one of
                                the fastest-growing food delivery networks in the country.
                            </p>
                        </Motion.div>
                    </div>
                </section>

                {/* ── Mission + Vision ── */}
                <section className="bg-linear-to-b from-white via-blue-50/40 to-white py-14 md:py-20">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                            {[
                                {
                                    icon: Target, label: "Mission",
                                    title: "Delight every customer, every time.",
                                    body: "We exist to bring joy through food — fast, fresh, and friendly. Every order is a promise to deliver more than a meal.",
                                    color: "from-[#0056A3] to-[#00B0E6]",
                                },
                                {
                                    icon: Eye, label: "Vision",
                                    title: "Bangladesh's most loved food service company.",
                                    body: "To set the benchmark for quality, innovation, and service — making world-class food accessible everywhere we operate.",
                                    color: "from-[#7CB342] to-[#558B2F]",
                                },
                            ].map((item, i) => (
                                <Motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    whileHover={{ y: -6 }}
                                    className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.10)] transition-shadow border border-gray-100 overflow-hidden"
                                >
                                    <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full bg-linear-to-br ${item.color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
                                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} text-white shadow-lg mb-6`}>
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-[#0056A3] mb-3">{item.label}</p>
                                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-light">{item.body}</p>
                                </Motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── Core Values ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
                    <Motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-2xl mx-auto mb-14"
                    >
                        <HeadingTag tag="Core Values" />
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                            What We{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                Stand For
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 font-light">
                            Six principles guide every decision we make — from the kitchen to the boardroom.
                        </p>
                    </Motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                        {values.map((v, i) => (
                            <Motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-transparent hover:shadow-[0_18px_40px_rgba(0,86,163,0.12)] transition-all overflow-hidden"
                            >
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${v.color}`} />
                                <div className={`inline-flex w-12 h-12 rounded-xl items-center justify-center bg-linear-to-br ${v.color} text-white shadow-md mb-4 group-hover:scale-110 transition-transform`}>
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{v.title}</h3>
                                <p className="text-gray-500 font-light leading-relaxed text-sm">{v.desc}</p>
                            </Motion.div>
                        ))}
                    </div>
                </section>

                {/* ── CTA ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                    <CTABanner />
                </section>
            </main>
            <Footer />
        </>
    );
}
