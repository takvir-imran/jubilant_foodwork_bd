"use client";

// ─────────────────────────────────────────────────────────────────────────────
// PizzaShowcase.tsx  –  Next.js App Router version
//
// Changes from the original:
//  • "use client" directive added — required for motion/react + useState
//  • ImageWithFallback replaced with next/image
//  • All <ImageWithFallback> usages now use <Image fill> with a positioned
//    parent, or explicit width/height for non-fill cases
//  • WaveDivider, PizzaCard, and main PizzaShowcase kept in one file
//  • Only the hero section (Section 1) is kept as requested
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "motion/react";
import {
    ShoppingCart,
    ArrowRight,
    Clock,
    Star,
    Sparkles,
} from "lucide-react";

// ── Hero pizza data ───────────────────────────────────────────────────────────
const heroPizza = {
    id: "hero-pepperoni",
    name: "Pepperoni Perfection",
    tagline: "Loaded with premium pepperoni & stretchy mozzarella",
    image: "/assets/dominos/Beefy-Meetza.png",
    price: 650,
    rating: 4.9,
    reviews: 2340,
    badge: "BESTSELLER",
    badgeColor: "#FFB300",
};

// ── Wave divider SVG ──────────────────────────────────────────────────────────
function WaveDivider({ color, flip }: { color: string; flip?: boolean }) {
    return (
        <div className={`w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}>
            <svg
                viewBox="0 0 1200 80"
                preserveAspectRatio="none"
                className="w-full h-[40px] md:h-[60px]"
            >
                <path
                    d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z"
                    fill={color}
                />
            </svg>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export function HeroPizza() {
    return (
        <div className="w-full overflow-hidden">

            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION
                Warm yellow gradient background with:
                  - Left: headline copy + CTA buttons + quick stats
                  - Right: circular pizza image with rotating ring, badge
                    overlay, and price tag
                Decorative blobs add depth via blur + opacity.
            ════════════════════════════════════════════════════════════════ */}
            <section className="relative bg-gradient-to-b from-[#FFF8E7] via-[#FFF3D4] to-[#FFEEBB] overflow-hidden">

                {/* Decorative blurred background blobs — purely aesthetic */}
                <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-[#FFB300]/10 blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-60px] left-[-60px] w-[250px] h-[250px] rounded-full bg-[#00B0E6]/8 blur-3xl pointer-events-none" />

                <div className="relative container mx-auto px-4 sm:px-6 lg:px-12 py-12 md:py-16 lg:py-20">
                    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

                        {/* ── Left: headline + CTAs ─────────────────────── */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex-1 text-center lg:text-left max-w-lg lg:max-w-none"
                        >
                            {/* "Treat Yourself" pill badge */}
                            <motion.span
                                initial={{ opacity: 0, y: -10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFB300]/15 text-[#B37A00] text-xs tracking-widest uppercase mb-4"
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                Treat Yourself
                            </motion.span>

                            {/* Primary headline */}
                            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1A1A1A] leading-[1.1] mb-4">
                                Craving{" "}
                                <span className="text-[#0056A3]">Something</span>
                                <br />
                                <span className="text-[#FFB300]">Hot</span> Today?
                            </h2>

                            <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto lg:mx-0 mb-6 lg:mb-8">
                                Handcrafted with premium ingredients, baked fresh in our stone
                                ovens &amp; delivered piping hot to your door.
                            </p>

                            {/* CTA buttons: Order Now + View Menu */}
                            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3.5 bg-[#FFB300] text-white rounded-full shadow-lg shadow-[#FFB300]/30 hover:shadow-xl hover:shadow-[#FFB300]/40 transition-shadow flex items-center gap-2"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Order Now
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-3.5 border-2 border-[#0056A3]/20 text-[#0056A3] rounded-full hover:bg-[#0056A3]/5 transition-colors flex items-center gap-2"
                                >
                                    View Menu
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                            </div>

                            {/* Quick stats: delivery time + rating */}
                            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock className="w-4 h-4 text-[#7CB342]" />
                                    <span>30 min delivery</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span>4.9 rating</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Right: circular pizza image ───────────────── */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
                            className="relative flex-1 flex items-center justify-center"
                        >
                            {/* Static outer ring */}
                            <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] lg:w-[500px] lg:h-[500px] rounded-full border-2 border-[#FFB300]/15" />

                            {/* Slowly rotating dashed ring with dot accents */}
                            <motion.div
                                className="absolute w-[360px] h-[360px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px] lg:w-[540px] lg:h-[540px] rounded-full border border-[#FFB300]/8"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#FFB300]/40 rounded-full" />
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#00B0E6]/30 rounded-full" />
                            </motion.div>

                            {/* Circular pizza image — next/image with fill inside a sized container */}
                            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px] lg:w-[460px] lg:h-[460px] rounded-full overflow-hidden shadow-2xl shadow-orange-900/20 z-10">
                                <Image
                                    src={heroPizza.image}
                                    alt={heroPizza.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, (max-width: 1024px) 400px, 460px"
                                    priority
                                />
                                {/* Inner shadow overlay for depth */}
                                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.15)]" />
                            </div>

                            {/* BESTSELLER badge — animates in with spring */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 z-20 bg-[#FFB300] text-white px-4 py-2 rounded-2xl shadow-lg"
                            >
                                <span className="text-xs tracking-wider">BESTSELLER</span>
                            </motion.div>

                            {/* Price tag card — slides in from the right */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="absolute bottom-6 sm:bottom-8 right-0 sm:right-4 z-20 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3"
                            >
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                                        Starting at
                                    </p>
                                    <p className="text-[#0056A3] text-xl">৳{heroPizza.price}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#FFB300] flex items-center justify-center">
                                    <ShoppingCart className="w-4 h-4 text-white" />
                                </div>
                            </motion.div>

                            {/* Ground shadow beneath the pizza circle */}
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-black/10 rounded-full blur-xl z-0" />
                        </motion.div>
                    </div>
                </div>

                {/* Wave transition into the next white section */}
                <WaveDivider color="#FFFFFF" />
            </section>
        </div>
    );
}