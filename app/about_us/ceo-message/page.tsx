"use client";

import Header from "@/app/global_component/Header";
import { Footer } from "@/app/global_component/Footer_Components/Footer";
import { HeadingTag } from "@/app/global_component/HeadingTag";
import { motion as Motion } from "motion/react";
import Image from "next/image";
import { Quote, Linkedin, Mail } from "lucide-react";

const highlights = [
    { value: "40+", label: "Outlets Nationwide" },
    { value: "1M+", label: "Customers Served" },
    { value: "7+",  label: "Years of Growth" },
];

export default function CEOMessagePage() {
    return (
        <>
            <Header />
            <main>
                {/* ── Hero ── */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#0056A3] via-[#003d7a] to-[#00112A] py-24 md:py-32">
                    <div className="absolute inset-0 opacity-25 pointer-events-none"
                         style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
                    <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00B0E6]/25 blur-3xl" />
                    <div className="absolute -bottom-40 left-0 w-[500px] h-[500px] rounded-full bg-[#FFB300]/15 blur-3xl" />

                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                        <Motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-bold tracking-[0.3em] uppercase mb-6"
                        >
                            Leadership
                        </Motion.p>
                        <Motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6"
                        >
                            CEO&apos;s Message
                        </Motion.h1>
                        <Motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed font-light"
                        >
                            A note from our Chief Executive Officer on our journey, our people,
                            and the road ahead.
                        </Motion.p>
                    </div>
                </section>

                {/* ── CEO Message Body ── */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                    <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start max-w-7xl mx-auto">

                        {/* LEFT — CEO photo card */}
                        <Motion.aside
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="lg:col-span-4 lg:sticky lg:top-24"
                        >
                            <div className="relative">
                                <div className="absolute -inset-3 bg-linear-to-br from-[#0056A3] to-[#00B0E6] rounded-[2rem] blur-2xl opacity-30" />
                                <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-gray-200">
                                    {/* Placeholder portrait — replace src with actual photo */}
                                    <Image
                                        src="/assets/About_image_fg.jpeg"
                                        alt="Chief Executive Officer"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-[#0056A3]/60 via-transparent to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="text-2xl font-black leading-tight">Mr. CEO Name</p>
                                        <p className="text-sm font-medium text-white/80 mt-1">Chief Executive Officer</p>
                                        <p className="text-xs text-white/70 mt-1">Jubilant Foodworks Bangladesh</p>
                                    </div>
                                </div>

                                {/* Social links */}
                                <div className="flex gap-3 mt-6">
                                    <a href="#" aria-label="LinkedIn"
                                       className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#0056A3] hover:bg-[#0056A3] hover:text-white text-gray-700 font-semibold text-sm transition-all">
                                        <Linkedin className="w-4 h-4" /> LinkedIn
                                    </a>
                                    <a href="#" aria-label="Email"
                                       className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-gray-200 hover:border-[#0056A3] hover:bg-[#0056A3] hover:text-white text-gray-700 font-semibold text-sm transition-all">
                                        <Mail className="w-4 h-4" /> Contact
                                    </a>
                                </div>

                                {/* Highlights */}
                                <div className="mt-6 grid grid-cols-3 gap-3">
                                    {highlights.map((h) => (
                                        <div key={h.label} className="text-center bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100">
                                            <div className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                                {h.value}
                                            </div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-1 leading-tight">
                                                {h.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Motion.aside>

                        {/* RIGHT — Letter */}
                        <Motion.article
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.1 }}
                            className="lg:col-span-8"
                        >
                            <HeadingTag tag="Message from the CEO" />

                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-8">
                                Building the future of{" "}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#0056A3] to-[#00B0E6]">
                                    food service in Bangladesh.
                                </span>
                            </h2>

                            <div className="relative">
                                <Quote className="absolute -top-2 -left-2 w-16 h-16 text-[#0056A3]/10" />
                                <div className="relative pl-6 border-l-4 border-[#0056A3]/20 space-y-6 text-lg text-gray-700 leading-[1.85] font-light">
                                    <p>
                                        Dear Friends and Partners,
                                    </p>
                                    <p>
                                        It is my privilege to lead Jubilant FoodWorks Bangladesh
                                        — a team driven by a single belief: that great food, served
                                        consistently and with care, has the power to bring people
                                        together.
                                    </p>
                                    <p>
                                        Since launching Domino&apos;s Pizza in Bangladesh, we have
                                        grown from a single store to a nationwide network of over
                                        40 outlets. Behind every milestone is the trust of our
                                        customers and the dedication of more than a thousand team
                                        members who show up every day to deliver excellence.
                                    </p>
                                    <p>
                                        As we look ahead, our focus is clear: invest in our people,
                                        embrace technology that makes ordering effortless, and
                                        deepen our commitment to quality, safety, and
                                        sustainability. The next chapter of our journey will be
                                        defined by how we serve communities — not just meals.
                                    </p>
                                    <p>
                                        Thank you for being part of our story. The best is yet to
                                        come.
                                    </p>
                                </div>
                            </div>

                            {/* Signature */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <p className="font-serif text-3xl text-[#0056A3] italic font-bold mb-1">
                                    CEO Signature
                                </p>
                                <p className="text-base font-bold text-gray-900">Mr. CEO Name</p>
                                <p className="text-sm text-gray-500">Chief Executive Officer, Jubilant Foodworks Bangladesh</p>
                            </div>
                        </Motion.article>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
