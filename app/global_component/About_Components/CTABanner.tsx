'use client'

import Link from "next/link";
import {ArrowRight} from "lucide-react";
import { motion as Motion } from "motion/react";
export default function CTABanner() {

    return (
        <Motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-[3rem] shadow-2xl"
        >
            <div className="absolute inset-0 bg-linear-to-r from-[#0056A3] via-[#00B0E6] to-[#7CB342]" />

            {/* Animated blobs */}
            <div className="absolute inset-0 opacity-20 overflow-hidden">
                <Motion.div
                    animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-white rounded-full blur-[100px]"
                />
                <Motion.div
                    animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-[#FFB300] rounded-full blur-[100px]"
                />
            </div>

            <div className="relative px-8 py-16 md:py-24 text-center z-10">
                <Motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h3 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Join Our Growing Family
                    </h3>
                    <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                        Be part of our success story. Explore career opportunities or
                        partner with us to bring world-class dining experiences to more
                        people.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
                        <Link href="/careers">
                            <Motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full sm:w-auto px-10 py-5 bg-white text-[#0056A3] rounded-full font-bold text-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2 group"
                            >
                                View Careers
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Motion.button>
                        </Link>
                    </div>
                </Motion.div>
            </div>
        </Motion.div>
    );
}