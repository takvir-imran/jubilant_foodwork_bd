'use client'

import { useEffect, useRef, useState } from 'react';
import { Award, Trophy, Star, Medal, MapPin, Users, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {HeadingTag} from "@/app/global_component/HeadingTag";

gsap.registerPlugin(ScrollTrigger);

const awards = [
    {
        year: '2024',
        title: 'Best Retail Chain',
        organization: 'Bangladesh Retail Excellence Awards',
        description: 'Recognized as the leading retail food chain in Bangladesh for exceptional service and quality.',
        icon: 'trophy',
        color: '#FFB300',
        gradient: 'from-[#FFB300] to-[#FF8F00]',
    },
    {
        year: '2024',
        title: 'Customer Service Excellence',
        organization: 'Bangladesh Business Awards',
        description: 'Honored for outstanding customer satisfaction and service innovation.',
        icon: 'star',
        color: '#00B0E6',
        gradient: 'from-[#00B0E6] to-[#0056A3]',
    },
    {
        year: '2023',
        title: 'Best Food & Beverage Company',
        organization: 'National Food Industry Awards',
        description: 'Leading the industry with world-class brands and quality standards.',
        icon: 'medal',
        color: '#7CB342',
        gradient: 'from-[#7CB342] to-[#558B2F]',
    },
    {
        year: '2023',
        title: 'Fastest Growing Food Chain',
        organization: 'Business Excellence Bangladesh',
        description: 'Achieved remarkable growth with 40+ locations across the country.',
        icon: 'award',
        color: '#0056A3',
        gradient: 'from-[#0056A3] to-[#003D75]',
    },
    {
        year: '2023',
        title: 'Fastest Growing Food Chain',
        organization: 'Business Excellence Bangladesh',
        description: 'Achieved remarkable growth with 40+ locations across the country.',
        icon: 'award',
        color: '#0056A3',
        gradient: 'from-[#0056A3] to-[#003D75]',
    },
];

const stats = [
    { icon: Trophy, value: 6, suffix: '+', label: 'Years of Excellence', color: '#FFB300' },
    { icon: MapPin, value: 40, suffix: '+', label: 'Locations', color: '#7CB342' },
    { icon: Users, value: 1, suffix: 'M+', label: 'Happy Customers', color: '#00B0E6' },
    { icon: Award, value: 20, suffix: '+', label: 'Industry Awards', color: '#FFB300' },
];

function AwardIcon({ type, className = 'w-8 h-8' }: { type: string; className?: string }) {
    const icons: Record<string, typeof Star> = {
        trophy: Trophy,
        star: Star,
        medal: Medal,
        award: Award,
    };
    const Icon = icons[type] || Award;
    return <Icon className={`${className} text-white`} />;
}

function AnimatedCounter({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (!trigger) return;
        const obj = { val: 0 };
        gsap.to(obj, {
            val: value,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCount(Math.round(obj.val)),
        });
    }, [trigger, value]);

    return <span ref={ref}>{count}{suffix}</span>;
}

export function Awards() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const featuredRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const bannerRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const [activeCard, setActiveCard] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header animation
            if (headerRef.current) {
                const headerElements = headerRef.current.children;
                gsap.fromTo(
                    headerElements,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }

            // Featured award entrance + glow + badge
            if (featuredRef.current) {
                gsap.fromTo(
                    featuredRef.current,
                    { y: 80, opacity: 0, scale: 0.95 },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                const glow = featuredRef.current.querySelector('.featured-glow');
                if (glow) {
                    gsap.to(glow, {
                        scale: 1.1,
                        opacity: 0.4,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                    });
                }

                const badge = featuredRef.current.querySelector('.featured-badge');
                if (badge) {
                    gsap.fromTo(badge, { scale: 0, rotation: -180 }, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.6,
                        delay: 0.8,
                        ease: 'back.out(1.7)',
                        scrollTrigger: {
                            trigger: featuredRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    });
                }
            }

            // Timeline line draw
            if (timelineRef.current) {
                const line = timelineRef.current.querySelector('.timeline-line-fill');
                if (line) {
                    gsap.fromTo(line, { scaleY: 0 }, {
                        scaleY: 1,
                        duration: 1.5,
                        ease: 'power2.inOut',
                        transformOrigin: 'top center',
                        scrollTrigger: {
                            trigger: timelineRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    });
                }
            }

            // Award cards staggered entrance
            if (cardsContainerRef.current) {
                const cards = cardsContainerRef.current.querySelectorAll('.award-card');
                cards.forEach((card, i) => {
                    const direction = i % 2 === 0 ? -1 : 1;
                    gsap.fromTo(
                        card,
                        { x: isMobile ? 0 : direction * 60, y: isMobile ? 40 : 0, opacity: 0 },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            duration: 0.8,
                            delay: i * 0.15,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 90%',
                                toggleActions: 'play none none reverse',
                            },
                        }
                    );
                });

                const dots = cardsContainerRef.current.querySelectorAll('.timeline-dot');
                dots.forEach((dot, i) => {
                    gsap.fromTo(dot, { scale: 0 }, {
                        scale: 1,
                        duration: 0.4,
                        delay: i * 0.15 + 0.3,
                        ease: 'back.out(2)',
                        scrollTrigger: {
                            trigger: dot,
                            start: 'top 90%',
                            toggleActions: 'play none none reverse',
                        },
                    });
                });
            }

            // Stats section
            if (statsRef.current) {
                gsap.fromTo(
                    statsRef.current,
                    { y: 60, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                            onEnter: () => setStatsVisible(true),
                        },
                    }
                );

                const statItems = statsRef.current.querySelectorAll('.stat-item');
                statItems.forEach((item, i) => {
                    gsap.fromTo(item, { y: 40, opacity: 0, scale: 0.9 }, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        delay: i * 0.12,
                        ease: 'back.out(1.4)',
                        scrollTrigger: {
                            trigger: statsRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    });
                });
            }

            // Banner
            if (bannerRef.current) {
                gsap.fromTo(
                    bannerRef.current,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: bannerRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );

                const stars = bannerRef.current.querySelectorAll('.twinkle-star');
                stars.forEach((star, i) => {
                    gsap.to(star, {
                        scale: 1.3,
                        opacity: 0.6,
                        duration: 0.8 + i * 0.2,
                        repeat: -1,
                        yoyo: true,
                        ease: 'sine.inOut',
                        delay: i * 0.3,
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isMobile]);

    const nextCard = () => setActiveCard((prev) => (prev + 1) % (awards.length - 1));
    const prevCard = () => setActiveCard((prev) => (prev - 1 + (awards.length - 1)) % (awards.length - 1));

    return (
        <section ref={sectionRef} id="awards" className="py-14 md:py-20 bg-gradient-to-b from-amber-50/40 via-white to-slate-50/50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Section Header ── */}
                <div ref={headerRef} className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-[#FFB300]/30 rounded-full mb-5 shadow-sm">
                        <Sparkles className="w-4 h-4 text-[#FFB300]" />

                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-5 leading-tight">
                        Celebrating Our{' '}
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFB300] via-[#FF8F00] to-[#FFB300]">
                                Awards
                            </span>
                            <span className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB300] to-[#FF8F00] rounded-full" />
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        A testament to our unwavering commitment to excellence, innovation, and customer satisfaction across Bangladesh.
                    </p>
                </div>

                {/* ── Featured Award ── */}
                <div ref={featuredRef} className="mb-12 md:mb-16 max-w-5xl mx-auto">
                    <div className="relative group">
                        {/* Glow */}
                        <div className="featured-glow absolute -inset-1 bg-gradient-to-r from-[#FFB300]/20 via-[#FF8F00]/15 to-[#FFB300]/20 rounded-[2rem] blur-2xl" />

                        <div className="relative bg-white rounded-3xl shadow-xl border border-[#FFB300]/15 overflow-hidden">
                            {/* Top accent bar */}
                            <div className="h-1.5 bg-gradient-to-r from-[#FFB300] via-[#FF8F00] to-[#FFB300]" />

                            {/* Subtle pattern background */}
                            <div
                                className="absolute inset-0 opacity-[0.03]"
                                style={{
                                    backgroundImage: `radial-gradient(circle at 1px 1px, #FFB300 1px, transparent 0)`,
                                    backgroundSize: '24px 24px',
                                }}
                            />

                            <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                                {/* Icon block */}
                                <div className="relative flex-shrink-0">
                                    <div className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-[#FFB300] to-[#FF8F00] rounded-3xl flex items-center justify-center shadow-lg shadow-[#FFB300]/20 group-hover:shadow-[#FFB300]/40 transition-shadow duration-500">
                                        <Trophy className="w-14 h-14 md:w-16 md:h-16 text-white" />
                                    </div>
                                    {/* Featured badge */}
                                    <div className="featured-badge absolute -top-3 -right-3 w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                                        <Star className="w-5 h-5 text-white fill-white" />
                                    </div>
                                    {/* Decorative ring */}
                                    <div className="absolute -inset-3 border-2 border-dashed border-[#FFB300]/20 rounded-[1.5rem] animate-[spin_20s_linear_infinite]" />
                                </div>

                                <div className="flex-1 text-center md:text-left">
                                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0056A3]/5 border border-[#0056A3]/15 rounded-full mb-4">
                                        <span className="w-2 h-2 bg-[#0056A3] rounded-full" />
                                        <span className="text-sm text-[#0056A3]">{awards[0].year} &middot; Featured</span>
                                    </div>

                                    <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 leading-tight">
                                        {awards[0].title}
                                    </h3>

                                    <p className="text-[#00B0E6] mb-3 flex items-center justify-center md:justify-start gap-2">
                                        <Award className="w-4 h-4" />
                                        {awards[0].organization}
                                    </p>

                                    <p className="text-gray-600 leading-relaxed max-w-lg">
                                        {awards[0].description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Awards Timeline Grid ── */}
                <div ref={cardsContainerRef} className="relative max-w-5xl mx-auto mb-12 md:mb-16">
                    {/* Timeline center line (desktop) */}
                    <div ref={timelineRef} className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
                        <div className="w-full h-full bg-gray-200 rounded-full" />
                        <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-[#FFB300] via-[#00B0E6] to-[#7CB342] rounded-full" />
                    </div>

                    {/* Desktop: alternating timeline */}
                    <div className="hidden md:block space-y-12">
                        {awards.slice(1).map((award, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={`${award.title}-${index}`} className="award-card relative flex items-center">
                                    {/* Timeline dot */}
                                    <div
                                        className="timeline-dot absolute left-1/2 -translate-x-1/2 z-10 w-5 h-5 rounded-full border-4 border-white shadow-md"
                                        style={{ backgroundColor: award.color }}
                                    />

                                    {/* Card positioned left or right */}
                                    <div className={`w-[calc(50%-2rem)] ${isLeft ? 'mr-auto pr-4' : 'ml-auto pl-4'}`}>
                                        <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-400">
                                            <div className="flex items-start gap-4">
                                                <div className={`flex-shrink-0 w-14 h-14 bg-gradient-to-br ${award.gradient} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-400`}>
                                                    <AwardIcon type={award.icon} className="w-7 h-7" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                                        <span
                                                            className="text-xs px-2.5 py-1 rounded-full text-white"
                                                            style={{ backgroundColor: award.color }}
                                                        >
                                                            {award.year}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-lg text-gray-900 mb-1 group-hover:text-[#0056A3] transition-colors leading-snug">
                                                        {award.title}
                                                    </h3>
                                                    <p className="text-sm text-[#00B0E6] mb-2">{award.organization}</p>
                                                    <p className="text-sm text-gray-500 leading-relaxed">{award.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Mobile: swipeable card carousel */}
                    <div className="md:hidden">
                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl">
                                <div
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${activeCard * 100}%)` }}
                                >
                                    {awards.slice(1).map((award, index) => (
                                        <div key={`${award.title}-mobile-${index}`} className="award-card w-full flex-shrink-0 px-1">
                                            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className={`w-14 h-14 bg-gradient-to-br ${award.gradient} rounded-xl flex items-center justify-center shadow-sm`}>
                                                        <AwardIcon type={award.icon} className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <span
                                                            className="text-xs px-2.5 py-1 rounded-full text-white inline-block mb-1"
                                                            style={{ backgroundColor: award.color }}
                                                        >
                                                            {award.year}
                                                        </span>
                                                        <h3 className="text-lg text-gray-900 leading-snug">{award.title}</h3>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-[#00B0E6] mb-2">{award.organization}</p>
                                                <p className="text-sm text-gray-500 leading-relaxed">{award.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Carousel controls */}
                            <div className="flex items-center justify-center gap-4 mt-6">
                                <button
                                    onClick={prevCard}
                                    className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                                    aria-label="Previous award"
                                >
                                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                                </button>

                                <div className="flex gap-2">
                                    {awards.slice(1).map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveCard(i)}
                                            className={`h-2 rounded-full transition-all duration-300 ${i === activeCard ? 'w-6 bg-[#0056A3]' : 'w-2 bg-gray-300'}`}
                                            aria-label={`Go to award ${i + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextCard}
                                    className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all"
                                    aria-label="Next award"
                                >
                                    <ChevronRight className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Stats Section ── */}
                <div ref={statsRef} className="relative rounded-3xl overflow-hidden mb-12 md:mb-16">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0056A3] via-[#004080] to-[#003060]" />

                    {/* Subtle grid pattern */}
                    <div
                        className="absolute inset-0 opacity-[0.04]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                        }}
                    />

                    {/* Floating orbs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B0E6] rounded-full blur-[100px] opacity-20" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFB300] rounded-full blur-[80px] opacity-15" />

                    <div className="relative px-6 py-14 md:py-20">
                        <div className="text-center mb-10 md:mb-14">
                            <h3 className="text-2xl sm:text-3xl md:text-4xl text-white mb-2">
                                Excellence by Numbers
                            </h3>
                            <p className="text-white/60 text-base md:text-lg">
                                Our journey of success and growth in Bangladesh
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                            {stats.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div key={stat.label} className="stat-item text-center">
                                        <div className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/[0.1] transition-all duration-300 group">
                                            <div
                                                className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300"
                                                style={{ backgroundColor: `${stat.color}20` }}
                                            >
                                                <Icon className="w-6 h-6 md:w-7 md:h-7" style={{ color: stat.color }} />
                                            </div>
                                            <div className="text-3xl sm:text-4xl md:text-5xl text-white mb-1 tabular-nums">
                                                <AnimatedCounter value={stat.value} suffix={stat.suffix} trigger={statsVisible} />
                                            </div>
                                            <div className="text-white/70 text-sm md:text-base">{stat.label}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* ── Recognition Banner ── */}
                <div ref={bannerRef} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 border border-[#FFB300]/20 p-8 md:p-12 text-center">
                    {/* Subtle decorative dots */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `radial-gradient(circle, #FFB300 1px, transparent 1px)`,
                            backgroundSize: '20px 20px',
                        }}
                    />

                    <div className="relative">
                        <div className="flex justify-center gap-3 mb-6">
                            <Star className="twinkle-star w-6 h-6 text-[#FFB300] fill-[#FFB300]" />
                            <Star className="twinkle-star w-8 h-8 text-[#FFB300] fill-[#FFB300]" />
                            <Star className="twinkle-star w-6 h-6 text-[#FFB300] fill-[#FFB300]" />
                        </div>

                        <h3 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-4">
                            Setting Industry Standards
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Our awards represent the dedication of our team and the trust of our customers. Together, we continue to raise the bar for excellence in food service.
                        </p>
                        <button className="px-8 py-3.5 bg-gradient-to-r from-[#0056A3] to-[#00B0E6] text-white rounded-full shadow-lg shadow-[#0056A3]/20 hover:shadow-[#0056A3]/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300">
                            View All Achievements
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}