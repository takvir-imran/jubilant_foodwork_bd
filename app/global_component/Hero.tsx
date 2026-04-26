'use client'

import {useEffect, useRef, useState, CSSProperties} from "react";
import Image from "next/image";
import gsap from "gsap";

interface Slide {
    src: string;
    alt: string;
    label: string;
}

interface Stats {
    value: string;
    label: string;
}

interface GSAPTween {
    kill: () => void;
}

const slideList: Slide[] = [
    { src: "/assets/Slide 1.jpeg", alt: "Slide 1", label: "Slide 1" },
    { src: "/assets/Slide2.jpg",   alt: "Slide2",  label: "Slide2"  },
    { src: "/assets/Slide3.jpg",   alt: "Slide3",  label: "Slide3"  },
];

const statsList: Stats[] = [
    { value: "40",  label: "Locations"   },
    { value: "1M+", label: "Customers"   },
    { value: "7+",  label: "Year Ongoing"},
];

const SLIDE_DURATION: number = 6;

export default function Hero() {
    const [current, setCurrent] = useState<number>(0);
    const [prev, setPrev]       = useState<number | null>(null); // ✅ null, not 0

    const slideRefs   = useRef<Array<HTMLDivElement | null>>([]);
    const contentRef  = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const subRef      = useRef<HTMLParagraphElement>(null);
    const badgeRef    = useRef<HTMLDivElement>(null);
    const statsRef    = useRef<HTMLDivElement>(null);
    const scrollRef   = useRef<HTMLDivElement>(null);
    const timerBarRef = useRef<HTMLDivElement>(null);
    const timerTween  = useRef<GSAPTween | null>(null);
    const autoTween   = useRef<GSAPTween | null>(null);

    // Entrance animation
    useEffect(() => {
        const badge    = badgeRef.current;
        const headline = headlineRef.current;
        const sub      = subRef.current;
        const statsEl  = statsRef.current;
        const scroll   = scrollRef.current;
        if (!badge || !headline || !sub || !statsEl || !scroll) return;

        const tl = gsap.timeline({ delay: 0.2 });
        tl.from(badge,             { y: -50, opacity: 0, duration: 0.7, ease: "power3.out" })
            .from(headline.children, { y: 60,  opacity: 0, duration: 0.9, stagger: 0.15, ease: "power4.out" }, "-=0.3")
            .from(sub,               { y: 30,  opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
            .from(statsEl.children,  { y: 20,  opacity: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3")
            .from(scroll,            { opacity: 0, duration: 0.6 }, "-=0.2");
    }, []);

    // Slide transition
    useEffect(() => {
        if (prev === null) return;
        const incoming = slideRefs.current[current];
        const outgoing = slideRefs.current[prev];
        const headline = headlineRef.current;
        const sub      = subRef.current;
        if (!incoming || !outgoing || !headline || !sub) return;

        gsap.killTweensOf([incoming, outgoing]);
        gsap.fromTo(outgoing, { opacity: 1, scale: 1 },    { opacity: 0, scale: 1.08, duration: 1.2, ease: "power2.inOut", zIndex: 1 });
        gsap.fromTo(incoming, { opacity: 0, scale: 1.05, zIndex: 2 }, { opacity: 1, scale: 1, duration: 1.4, ease: "power2.inOut" });

        const tl = gsap.timeline();
        tl.to( [headline.children, sub], { opacity: 0, y: -20, duration: 0.3, stagger: 0.05, ease: "power2.in"  })
            .set([headline.children, sub], { y: 30 })
            .to( [headline.children, sub], { opacity: 1, y: 0,   duration: 0.6, stagger: 0.1,  ease: "power3.out" });
    }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

    // Initial z-index / opacity
    useEffect(() => {
        slideRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.set(el, { zIndex: i === 0 ? 2 : 0, opacity: i === 0 ? 1 : 0 });
        });
    }, []);

    // ✅ Timer bar + autoplay — no stale closure, no inline transform conflict
    useEffect(() => {
        timerTween.current?.kill();
        autoTween.current?.kill();

        const bar = timerBarRef.current;
        if (!bar) return;

        const next = (current + 1) % slideList.length;

        gsap.set(bar, { scaleX: 0 });
        timerTween.current = gsap.to(bar, {
            scaleX: 1,
            duration: SLIDE_DURATION,
            ease: "none",
            transformOrigin: "left center",
        }) as GSAPTween;

        autoTween.current = gsap.delayedCall(SLIDE_DURATION, () => {
            setPrev(current);
            setCurrent(next);
        }) as GSAPTween;

        return () => {
            timerTween.current?.kill();
            autoTween.current?.kill();
        };
    }, [current]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleDot = (i: number): void => {
        if (i === current) return;
        timerTween.current?.kill();
        autoTween.current?.kill();
        setPrev(current);
        setCurrent(i);
    };

    return (
        <section className="relative h-screen overflow-hidden bg-black font-sans">

            {/* Slides */}
            {slideList.map((slide, i) => (
                <div
                    key={i}
                    ref={(el: HTMLDivElement | null): void => { slideRefs.current[i] = el; }}
                    className="absolute inset-0"
                    style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 0 } as CSSProperties}
                >
                    <Image src={slide.src} alt={slide.alt} fill className="object-cover" priority={i === 0} />
                </div>
            ))}

            {/* Gradient overlays */}
            <div className="absolute inset-0 z-10"
                 style={{ background: "linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55), rgba(0,0,0,0.2) 100%)" }} />
            <div className="absolute inset-0 z-10"
                 style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 40%)" }} />

            {/* Content */}
            <div
                ref={contentRef}
                className="absolute inset-0 z-20 flex items-center"
                style={{ padding: "0 clamp(1.5rem, 5vw, 6rem)", paddingTop: "64px" }}
            >
                <div className="max-w-[760px]">

                    {/* Badge */}
                    <div ref={badgeRef}
                         className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/[0.22] rounded-full mb-7">
                        <span className="w-2 h-2 rounded-full bg-[#00B0E6] inline-block"
                              style={{ animation: "heroPulse 2s infinite" }} />
                        <span className="text-[13px] font-semibold text-white tracking-[0.04em]">
                            We Are The Leading Food Service Company in Bangladesh
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 ref={headlineRef}
                        className="text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold text-white leading-[1.08] tracking-tight m-0 mb-6">
                        <span className="block">Building the Future of</span>
                        <span className="block mt-2" style={{
                            backgroundImage: "linear-gradient(90deg, #00B0E6 0%, #7CB342 55%, #FFB300 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}>Food Service</span>
                    </h1>

                    {/* Subtitle */}
                    <p ref={subRef}
                       className="text-[clamp(1rem,2vw,1.25rem)] text-white/[0.88] leading-[1.7] max-w-[620px] mb-10">
                        Jubilant FoodWorks Bangladesh brings world-class dining experiences through
                        internationally renowned brands like Domino&apos;s Pizza.
                    </p>

                    {/* Stats */}
                    <div ref={statsRef} className="flex max-w-[480px]">
                        {statsList.map((item, i) => (
                            <div key={i} className={`flex-1 text-center px-4 ${i > 0 ? "border-l border-white/20" : ""}`}>
                                <div className="text-[clamp(2rem,4vw,3rem)] text-white font-bold leading-none mb-1.5">
                                    {item.value}
                                </div>
                                <div className="text-[12px] text-white/65 font-medium tracking-[0.06em] uppercase">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*Bottom Bar*/}
            <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col">
                <div className="h-[3px] bg-white/15">
                    <div
                        ref={timerBarRef}
                        className="h-full origin-left"
                        style={{ background: "linear-gradient(90deg, #00B0E6, #7CB342)" }}
                    />
                </div>
                <div className="flex items-center justify-between px-[clamp(1.5rem,5vw,6rem)] py-[18px] bg-black/35 backdrop-blur-[10px]">
                    <div className="flex gap-2.5">
                        {slideList.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleDot(i)}
                                aria-label={`Go to Slide ${i + 1}`}
                                className="h-2.5 rounded-full border-0 cursor-pointer p-0 transition-all duration-[400ms] ease-in-out"
                                style={{
                                    width: i === current ? 36 : 10,
                                    background: i === current ? "#00B0E6" : "rgba(255,255,255,0.35)", // ✅ fixed #00BBOE6 typo
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-[13px] text-white/50 font-medium tracking-[0.06em]">
                        {String(current + 1).padStart(2, "0")} / {String(slideList.length).padStart(2, "0")}
                    </span>
                </div>
            </div>

            {/* Scroll indicator */}
            <div ref={scrollRef}
                 className="absolute z-30 flex flex-col items-center gap-2"
                 style={{ bottom: 90, right: "clamp(1.5rem, 5vw, 6rem)" }}>
                <span className="text-[10px] tracking-[0.18em] text-white/45 uppercase">Scroll</span>
                <div className="w-px h-[50px]"
                     style={{
                         background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
                         animation: "heroScrollLine 2s ease-in infinite",
                     }} />
            </div>

            <style>{`
                @keyframes heroPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50%      { opacity: 0.5; transform: scale(0.85); }
                }
                @keyframes heroScrollLine {
                    0%   { transform: scaleY(0); transform-origin: top;    opacity: 1; }
                    50%  { transform: scaleY(1); transform-origin: top;    opacity: 1; }
                    100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
                }
            `}</style>
        </section>
    );
}