'use client'
import { useEffect, useRef, useState } from 'react';
import { Calendar, Pizza, Rocket, Globe, Store, Flag, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const timelineData = [
    {
        year: '1960',
        title: 'The Beginning',
        description:
            'Brothers Tom and James Monaghan purchased a small pizza store called DomiNick\'s in Ypsilanti, Michigan. This marked the birth of what would become the world\'s largest pizza delivery company.',
        icon: Store,
        color: '#0056A3',
        accent: '#00B0E6',
        highlight: false,
    },
    {
        year: '1965',
        title: "Domino's is Born",
        description:
            'Tom Monaghan renamed the business "Domino\'s Pizza, Inc." The company began its journey to revolutionize pizza delivery with innovative systems and commitment to quality.',
        icon: Sparkles,
        color: '#00B0E6',
        accent: '#0056A3',
        highlight: false,
    },
    {
        year: '1983',
        title: 'Going Global',
        description:
            'Domino\'s opened its first international store in Winnipeg, Canada, marking the beginning of global expansion that would eventually reach over 90 countries worldwide.',
        icon: Globe,
        color: '#0056A3',
        accent: '#7CB342',
        highlight: false,
    },
    {
        year: '1996',
        title: 'Global Milestone',
        description:
            'Domino\'s opened its 1,000th international location, solidifying its position as a global leader in pizza delivery and demonstrating unprecedented international growth.',
        icon: Flag,
        color: '#7CB342',
        accent: '#FFB300',
        highlight: false,
    },
    {
        year: '2010',
        title: 'Jubilant FoodWorks',
        description:
            'Jubilant FoodWorks became the exclusive franchisee for Domino\'s in Bangladesh, bringing world-class pizza expertise to the South Asian market with a commitment to quality and service.',
        icon: Rocket,
        color: '#FFB300',
        accent: '#0056A3',
        highlight: false,
    },
    {
        year: '2019',
        title: "Domino's Bangladesh Launch 🇧🇩",
        description:
            "Domino's Pizza officially launched in Bangladesh, bringing the world's favorite pizza delivery service to millions of Bangladeshi customers. The first store opened with great enthusiasm and quickly became a local favorite.",
        icon: Pizza,
        color: '#0056A3',
        accent: '#00B0E6',
        highlight: true,
    },
    {
        year: '2026',
        title: 'Leading the Market',
        description:
            "Today, Domino's operates 250+ stores across Bangladesh, serving millions of customers with the same commitment to quality, innovation, and 30-minute delivery that made us a global leader.",
        icon: Calendar,
        color: '#7CB342',
        accent: '#0056A3',
        highlight: false,
    },
];

export function DominosTimeline() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ── Header entrance ──
            if (headerRef.current) {
                const els = headerRef.current.children;
                gsap.fromTo(
                    els,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.12,
                        duration: 0.7,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // ── Timeline line draw ──
            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 60%',
                            end: 'bottom 40%',
                            scrub: 1,
                        },
                    }
                );
            }

            // ── Cards + dots ──
            cardsRef.current.forEach((card, i) => {
                if (!card) return;
                const isLeft = !isMobile && i % 2 === 0;

                // Card entrance
                gsap.fromTo(
                    card,
                    {
                        x: isMobile ? 0 : isLeft ? -80 : 80,
                        y: isMobile ? 50 : 0,
                        opacity: 0,
                    },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 0.9,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 88%',
                            toggleActions: 'play none none reverse',
                            onEnter: () => setActiveIndex(i),
                        },
                    }
                );

                // Dot pop-in
                const dot = dotsRef.current[i];
                if (dot) {
                    gsap.fromTo(
                        dot,
                        { scale: 0, rotation: -90 },
                        {
                            scale: 1,
                            rotation: 0,
                            duration: 0.5,
                            ease: 'back.out(2)',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 88%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    return (
        <section className="py-14 md:py-20 bg-gradient-to-b from-slate-50/50 to-white">
            <div ref={sectionRef} className="container mx-auto px-5 sm:px-6 md:px-12">
                {/* ── Header ── */}
                <div ref={headerRef} className="text-center mb-14 md:mb-20">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-[#00B0E6]/20 rounded-full mb-5">
                        <Calendar className="w-4 h-4 text-[#0056A3]" />
                        <span className="text-sm text-[#0056A3] tracking-wider uppercase">Our Journey</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 leading-tight">
                        From Michigan to{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0056A3] to-[#00B0E6]">
            Bangladesh
          </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        Discover the remarkable journey of Domino&#39;s Pizza from a small store in Michigan to becoming
                        Bangladesh&#39;s favorite pizza destination
                    </p>
                </div>

                {/* ── Timeline ── */}
                <div className="max-w-5xl mx-auto relative">
                    {/* Center line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2">
                        <div className="w-full h-full bg-gray-200/80 rounded-full" />
                        <div
                            ref={lineRef}
                            className="absolute inset-0 bg-gradient-to-b from-[#0056A3] via-[#00B0E6] via-[#7CB342] to-[#FFB300] rounded-full origin-top"
                        />
                    </div>

                    {/* Items */}
                    <div className="space-y-8 md:space-y-16 relative">
                        {timelineData.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            const Icon = item.icon;
                            const isHighlight = item.highlight;

                            return (
                                <div
                                    key={item.year}
                                    className={`relative flex items-start md:items-center ${
                                        !isMobile && !isLeft ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* ── Dot / Node ── */}
                                    <div
                                        ref={(el) => { dotsRef.current[index] = el; }}
                                        className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-20 ${
                                            isHighlight ? 'w-14 h-14 md:w-16 md:h-16' : 'w-12 h-12'
                                        }`}
                                    >
                                        <div
                                            className={`w-full h-full rounded-full flex items-center justify-center shadow-lg transition-shadow duration-300 ${
                                                isHighlight ? 'shadow-xl' : ''
                                            }`}
                                            style={{
                                                background: `linear-gradient(135deg, ${item.color}, ${item.accent})`,
                                                boxShadow:
                                                    activeIndex >= index ? `0 0 20px ${item.color}40` : undefined,
                                            }}
                                        >
                                            {isHighlight ? (
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center">
                                                    <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: item.color }} />
                                                </div>
                                            ) : (
                                                <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                            )}
                                        </div>
                                    </div>

                                    {/* ── Card ── */}
                                    <div
                                        ref={(el) => { cardsRef.current[index] = el; }}
                                        className={`ml-16 md:ml-0 ${
                                            isLeft
                                                ? 'md:w-[calc(50%-2.5rem)] md:pr-6'
                                                : 'md:w-[calc(50%-2.5rem)] md:pl-6'
                                        } ${!isMobile && !isLeft ? 'md:mr-auto' : !isMobile ? 'md:ml-auto' : ''}`}
                                        style={{ width: isMobile ? 'calc(100% - 4.5rem)' : undefined }}
                                    >
                                        <div
                                            className={`group relative rounded-2xl transition-all duration-400 overflow-hidden ${
                                                isHighlight
                                                    ? 'bg-gradient-to-br from-[#0056A3]/[0.04] to-[#00B0E6]/[0.06] border-2 shadow-xl'
                                                    : 'bg-white border shadow-md hover:shadow-xl'
                                            }`}
                                            style={{
                                                borderColor: isHighlight ? item.color : undefined,
                                            }}
                                        >
                                            {/* Top color accent */}
                                            <div
                                                className="h-1"
                                                style={{
                                                    background: `linear-gradient(90deg, ${item.color}, ${item.accent})`,
                                                }}
                                            />

                                            <div className="p-5 sm:p-6 md:p-8">
                                                {/* Year row */}
                                                <div className="flex items-center gap-3 mb-3">
                        <span
                            className={`${
                                isHighlight ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'
                            } tabular-nums`}
                            style={{
                                color: item.color,
                                ...(isHighlight
                                    ? {
                                        background: `linear-gradient(90deg, ${item.color}, ${item.accent})`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }
                                    : {}),
                            }}
                        >
                          {item.year}
                        </span>
                                                    <div
                                                        className="h-px flex-1 rounded-full"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${item.color}40, transparent)`,
                                                        }}
                                                    />
                                                </div>

                                                <h3
                                                    className={`${
                                                        isHighlight ? 'text-xl sm:text-2xl md:text-3xl' : 'text-lg sm:text-xl md:text-2xl'
                                                    } text-gray-900 mb-2 md:mb-3 leading-snug group-hover:text-[${item.color}] transition-colors`}
                                                >
                                                    {item.title}
                                                </h3>

                                                <p
                                                    className={`text-gray-600 leading-relaxed ${
                                                        isHighlight ? 'text-base md:text-lg' : 'text-sm md:text-base'
                                                    }`}
                                                >
                                                    {item.description}
                                                </p>

                                                {isHighlight && (
                                                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                          </span>
                                                        <span className="text-sm text-gray-700">Milestone Achievement</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom cap */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 -bottom-3 w-3 h-3 bg-gradient-to-br from-[#7CB342] to-[#FFB300] rounded-full shadow-md z-10" />
                </div>
            </div>
        </section>
    );
}
