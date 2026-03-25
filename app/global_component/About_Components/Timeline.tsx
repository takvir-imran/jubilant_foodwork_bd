"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
    {
        year: "2019",
        index: "01",
        title: "Launched in Bangladesh",
        description: "Started our journey with Domino's Pizza, bringing world-class taste to Dhaka.",
    },
    {
        year: "2022",
        index: "02",
        title: "10 Store Milestone",
        description: "Expanded all across the country, growing our footprint rapidly.",
    },
    {
        year: "2023",
        index: "03",
        title: "First Store at Chittagong",
        description: "Expanded across major cities, bringing the brand to port city.",
    },
    {
        year: "2025",
        index: "04",
        title: "Nationwide Expansion",
        description: "Launched stores in Cox's Bazar, Khulna & Sylhet.",
    },
];

export default function Timeline() {
    const sectionRef  = useRef<HTMLDivElement>(null);
    const headingRef  = useRef<HTMLDivElement>(null);
    const trackRef    = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
    const dotsRef     = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        if (!sectionRef.current) return;
        const ctx = gsap.context(() => {

            gsap.fromTo(headingRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
                    scrollTrigger: { trigger: headingRef.current, start: "top 85%", once: true } }
            );

            gsap.fromTo(trackRef.current,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: "left center", duration: 1.1, ease: "power2.inOut",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
            );

            gsap.fromTo(progressRef.current,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: "left center", duration: 1.6, ease: "power2.out", delay: 0.2,
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
            );

            dotsRef.current.forEach((dot, i) => {
                if (!dot) return;
                gsap.fromTo(dot,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2.5)",
                        delay: 0.5 + i * 0.13,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
                );
            });

            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                gsap.fromTo(card,
                    { opacity: 0, y: 35 },
                    { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.2 + i * 0.12,
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true } }
                );
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="relative mb-12 bg-white rounded-3xl overflow-hidden
                       border border-gray-100
                       shadow-[0_4px_40px_rgba(0,86,163,0.10),0_1px_4px_rgba(0,86,163,0.06)]"
        >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-[#0056A3] via-[#00B0E6] to-[#0056A3]/30" />

            {/* Corner blobs */}
            <div className="pointer-events-none absolute top-0 right-0 h-72 w-72
                            bg-[radial-gradient(ellipse_at_top_right,rgba(0,176,230,0.09),transparent_70%)]" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56
                            bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,86,163,0.07),transparent_70%)]" />

            <div className="px-6 py-10 md:px-14 md:py-14">

                {/* ── Header ── */}
                <div ref={headingRef} className="mb-10 md:mb-14">
                    <p className="text-[#00B0E6] text-[11px] font-extrabold tracking-[0.32em] uppercase mb-3">
                        Since 2019
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#00112A] leading-none tracking-tight">
                            Our Journey
                        </h3>
                        <p className="text-gray-400 text-sm font-normal max-w-[200px] sm:text-right leading-relaxed">
                            Key milestones that shaped our success story
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-5">
                        <div className="w-16 h-1 bg-[#0056A3] rounded-full" />
                        <div className="w-10 h-1 bg-[#00B0E6] rounded-full" />
                        <div className="w-6  h-1 bg-[#7CB342] rounded-full" />
                    </div>
                </div>

                {/* ══ DESKTOP ══════════════════════════════════════════
                    Structure per card (flex column):
                      [dot — 40px tall, flex-shrink-0, self-start]
                      [gap 16px]
                      [year text]
                      [index pill]
                      [divider]
                      [title]
                      [description]

                    Track runs horizontally through the dot centres.
                    Dot centre Y = 20px from top of card (half of 40px dot).
                    Track: position absolute, top=20px, left=20px, right=20px
                    (inset by half-dot so it starts/ends at dot centres).
                ════════════════════════════════════════════════════════ */}
                <div className="hidden md:block relative">

                    {/* Track — top:20px = dot centre, left/right:20px = half of dot wrapper */}
                    <div
                        ref={trackRef}
                        className="absolute h-[2px] bg-gray-200 rounded-full pointer-events-none"
                        style={{ top: "20px", left: "20px", right: "20px" }}
                    />
                    <div
                        ref={progressRef}
                        className="absolute h-[2px] rounded-full pointer-events-none
                                   bg-gradient-to-r from-[#0056A3] via-[#00B0E6] to-[#0056A3]/30"
                        style={{ top: "20px", left: "20px", right: "20px" }}
                    />

                    <div className="grid grid-cols-4 gap-x-8">
                        {milestones.map((m, i) => (
                            <div
                                key={i}
                                ref={(el) => { cardsRef.current[i] = el; }}
                                className="group flex flex-col cursor-default"
                            >
                                {/* Dot — 40×40, self-start so it doesn't stretch */}
                                <span
                                    ref={(el) => { dotsRef.current[i] = el; }}
                                    className="relative self-start flex-shrink-0 flex items-center justify-center mb-4"
                                    style={{ width: "40px", height: "40px" }}
                                >
                                    {/* Halo */}
                                    <span className="absolute inset-0 rounded-full bg-[#0056A3]/8
                                                     group-hover:bg-[#0056A3]/18 transition-colors duration-300" />
                                    {/* Core */}
                                    <span className="relative w-[15px] h-[15px] rounded-full bg-white
                                                     border-[2.5px] border-[#0056A3]
                                                     group-hover:bg-[#0056A3] transition-all duration-300
                                                     shadow-[0_0_0_3px_rgba(0,86,163,0.15)]" />
                                </span>

                                {/* Year — starts right below the dot */}
                                <div className="text-[2.75rem] font-black leading-none mb-3
                                                text-transparent bg-clip-text
                                                bg-gradient-to-br from-[#0056A3] to-[#00B0E6]
                                                group-hover:from-[#004B96] group-hover:to-[#0098C8]
                                                transition-all duration-500">
                                    {m.year}
                                </div>

                                {/* Index pill */}
                                <span className="self-start mb-3 px-2 py-0.5 rounded-full
                                                 bg-[#0056A3]/8 text-[#0056A3]
                                                 text-[10px] font-black tracking-widest">
                                    {m.index}
                                </span>

                                {/* Divider */}
                                <div className="mb-3 h-[1.5px] w-8 rounded-full
                                                bg-gradient-to-r from-[#0056A3] to-[#00B0E6]
                                                group-hover:w-full transition-all duration-500" />

                                {/* Title */}
                                <h4 className="font-bold text-[#00112A] text-[15px] leading-snug mb-2
                                               group-hover:text-[#0056A3] transition-colors duration-300">
                                    {m.title}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-400 text-[13px] leading-relaxed">
                                    {m.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══ MOBILE ══════════════════════════════════════════ */}
                <div className="md:hidden flex flex-col">
                    {milestones.map((m, i) => (
                        <div key={i} className="flex">

                            {/* Col A — rail + dot */}
                            <div className="flex flex-col items-center flex-shrink-0 w-10">
                                {/* Rail above dot */}
                                <div
                                    className={`w-[2px] flex-shrink-0 rounded-full
                                                bg-gradient-to-b from-[#0056A3] to-[#00B0E6]
                                                ${i === 0 ? "opacity-0" : "opacity-100"}`}
                                    style={{ height: "28px" }}
                                />
                                {/* Dot */}
                                <span
                                    ref={(el) => { dotsRef.current[4 + i] = el; }}
                                    className="relative flex-shrink-0 flex items-center justify-center"
                                    style={{ width: "24px", height: "24px" }}
                                >
                                    <span className="absolute w-6 h-6 rounded-full bg-[#0056A3]/10" />
                                    <span className="relative w-[12px] h-[12px] rounded-full bg-white
                                                     border-2 border-[#0056A3]
                                                     shadow-[0_0_0_3px_rgba(0,86,163,0.12)]" />
                                </span>
                                {/* Rail below dot */}
                                <div
                                    className={`flex-1 w-[2px] rounded-full min-h-[20px]
                                                bg-gradient-to-b from-[#00B0E6] to-[#0056A3]/20
                                                ${i === milestones.length - 1 ? "opacity-0" : "opacity-100"}`}
                                />
                            </div>

                            {/* Col B — content
                                pt-[16px] aligns year text top with dot centre:
                                rail-above=28px, dot=24px → dot-centre = 28+12 = 40px from col top
                                pt=28px brings year text top to 28px → visually centred on dot */}
                            <div
                                ref={(el) => { cardsRef.current[4 + i] = el; }}
                                className="flex-1 pl-4 pb-9"
                                style={{ paddingTop: "28px" }}
                            >
                                <div className="text-[2.25rem] font-black leading-none mb-2
                                                text-transparent bg-clip-text
                                                bg-gradient-to-br from-[#0056A3] to-[#00B0E6]">
                                    {m.year}
                                </div>
                                <span className="inline-flex mb-2 px-2 py-0.5 rounded-full
                                                 bg-[#0056A3]/8 text-[#0056A3]
                                                 text-[10px] font-black tracking-widest">
                                    {m.index}
                                </span>
                                <div className="mb-2 h-[1.5px] w-8 rounded-full
                                                bg-gradient-to-r from-[#0056A3] to-[#00B0E6]" />
                                <h4 className="font-bold text-[#00112A] text-[15px] leading-snug mb-1">
                                    {m.title}
                                </h4>
                                <p className="text-gray-400 text-[13px] leading-relaxed">
                                    {m.description}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

            {/* Bottom accent */}
            <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#00B0E6]/30 to-transparent" />
        </div>
    );
}