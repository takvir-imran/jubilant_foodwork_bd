"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

/* ─── Domino's official SVG logo ─────────────────────────────────────── */
const DominosLogo = () => (
    <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" className="w-28 h-auto">
        {/* Domino tile */}
        <rect x="2" y="4" width="44" height="52" rx="5" ry="5" fill="#006491" />
        <line x1="2" y1="30" x2="46" y2="30" stroke="white" strokeWidth="2" />
        {/* Top dots - 3 */}
        <circle cx="12" cy="14" r="3.5" fill="white" />
        <circle cx="24" cy="14" r="3.5" fill="white" />
        <circle cx="36" cy="14" r="3.5" fill="white" />
        {/* Bottom dot - 1 */}
        <circle cx="24" cy="43" r="3.5" fill="#E31837" />
        {/* DOMINO'S text */}
        <text
            x="56"
            y="26"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#006491"
            letterSpacing="0.5"
        >
            DOMINO&#039;S
        </text>
        <text
            x="56"
            y="44"
            fontFamily="'Arial Black', sans-serif"
            fontWeight="900"
            fontSize="13"
            fill="#E31837"
            letterSpacing="2"
        >
            PIZZA
        </text>
    </svg>
);

/* ─── Types ───────────────────────────────────────────────────────────── */
type Size = "REG" | "MED" | "LAR";
type Crust = "Hand Tossed" | "Cheese Burst" | "Chicken Burst";

const SIZE_OPTIONS: { key: Size; label: string; inch: string; multiplier: number }[] = [
    { key: "REG", label: "Regular", inch: '6"', multiplier: 1 },
    { key: "MED", label: "Medium",  inch: '9"', multiplier: 1.3 },
    { key: "LAR", label: "Large",   inch: '12"', multiplier: 1.6 },
];

const CRUST_OPTIONS: { key: Crust; desc: string }[] = [
    { key: "Hand Tossed",   desc: "Classic & crispy" },
    { key: "Cheese Burst",  desc: "Oozy cheese edge" },
    { key: "Chicken Burst", desc: "Loaded chicken rim" },
];

const PIZZA_IMAGE =
    "/assets/Rectangle 31.png";

/* ─── Component ───────────────────────────────────────────────────────── */
export default function PizzaProductCard() {
    const [selectedSize,  setSelectedSize]  = useState<Size>("MED");
    const [selectedCrust, setSelectedCrust] = useState<Crust>("Hand Tossed");
    const [ordering,  setOrdering]  = useState(false);
    const [ordered,   setOrdered]   = useState(false);
    const [favoured,  setFavoured]  = useState(false);

    /* refs for GSAP */
    const cardRef    = useRef<HTMLDivElement>(null);
    const logoRef    = useRef<HTMLDivElement>(null);
    const imgRef     = useRef<HTMLDivElement>(null);
    const badgeRef   = useRef<HTMLDivElement>(null);
    const titleRef   = useRef<HTMLDivElement>(null);
    const priceRef   = useRef<HTMLDivElement>(null);
    const optsRef    = useRef<HTMLDivElement>(null);
    const ctaRef     = useRef<HTMLDivElement>(null);
    const footerRef  = useRef<HTMLDivElement>(null);
    const floatAnim  = useRef<gsap.core.Tween | null>(null);
    const tiltActive = useRef(false);

    const BASE = 799;
    const price = Math.round(BASE * (SIZE_OPTIONS.find(s => s.key === selectedSize)?.multiplier ?? 1));

    /* ── Entry animation ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(cardRef.current,
                { opacity: 0, y: 50, scale: 0.94 },
                { opacity: 1, y: 0,  scale: 1, duration: 0.8 }
            )
                .fromTo(logoRef.current,
                    { opacity: 0, y: -16 },
                    { opacity: 1, y: 0,  duration: 0.5 }, "-=0.4"
                )
                .fromTo(imgRef.current,
                    { opacity: 0, scale: 0.7, rotation: -12 },
                    { opacity: 1, scale: 1,   rotation: 0,  duration: 0.9, ease: "back.out(1.6)" }, "-=0.3"
                )
                .fromTo(badgeRef.current,
                    { opacity: 0, scale: 0, rotation: 15 },
                    { opacity: 1, scale: 1, rotation: 0,  duration: 0.4, ease: "back.out(2)" }, "-=0.2"
                )
                .fromTo([titleRef.current, priceRef.current],
                    { opacity: 0, y: 18 },
                    { opacity: 1, y: 0,  duration: 0.5, stagger: 0.1 }, "-=0.2"
                )
                .fromTo(optsRef.current,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0,  duration: 0.45 }, "-=0.1"
                )
                .fromTo(ctaRef.current,
                    { opacity: 0, y: 14 },
                    { opacity: 1, y: 0,  duration: 0.45 }, "-=0.1"
                )
                .fromTo(footerRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.35 }, "-=0.1"
                );

            /* continuous pizza float */
            floatAnim.current = gsap.to(imgRef.current, {
                y: -12,
                rotation: 3,
                duration: 2.4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                delay: 1,
            });
        });

        return () => ctx.revert();
    }, []);

    /* ── 3-D card tilt ── */
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const r = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 16;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -16;
        gsap.to(cardRef.current, {
            rotateY: x, rotateX: y, scale: 1.025,
            duration: 0.35, ease: "power2.out",
            transformPerspective: 900,
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateY: 0, rotateX: 0, scale: 1,
            duration: 0.55, ease: "power3.out",
        });
    };

    /* ── Price flash on size change ── */
    const handleSizeChange = (key: Size) => {
        setSelectedSize(key);
        gsap.fromTo(priceRef.current,
            { scale: 1.25, color: "#E31837" },
            { scale: 1,    color: "#1a1008", duration: 0.45, ease: "power2.out" }
        );
    };

    /* ── Chip press bounce ── */
    const chipBounce = (el: HTMLButtonElement | null) => {
        if (!el) return;
        gsap.fromTo(el,
            { scale: 0.88 },
            { scale: 1, duration: 0.4, ease: "elastic.out(1.2, 0.5)" }
        );
    };

    /* ── Heart wiggle ── */
    const handleFav = () => {
        setFavoured(p => !p);
        gsap.fromTo(".fav-btn",
            { scale: 0.7, rotation: -20 },
            { scale: 1,   rotation: 0,  duration: 0.5, ease: "elastic.out(1.5, 0.4)" }
        );
    };

    /* ── Order click ── */
    const handleOrder = async () => {
        /* button pulse */
        gsap.fromTo(".order-btn",
            { scale: 0.93 },
            { scale: 1, duration: 0.4, ease: "elastic.out(1.3, 0.5)" }
        );
        setOrdering(true);
        await new Promise(r => setTimeout(r, 1600));
        setOrdering(false);
        setOrdered(true);

        /* card celebrate */
        gsap.fromTo(cardRef.current,
            { boxShadow: "0 0 0px 0px rgba(16,185,129,0)" },
            { boxShadow: "0 0 40px 10px rgba(16,185,129,0.25)", duration: 0.3,
                yoyo: true, repeat: 1, ease: "power2.inOut" }
        );

        setTimeout(() => setOrdered(false), 2800);
    };

    return (
        <>
            {/* Google font import via next/head equivalent inline */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-nunito   { font-family: 'Nunito', sans-serif; }
      `}</style>

            {/* Scene */}
            <div className="font-nunito min-h-screen flex items-center justify-center p-8
                      bg-[#f5f0eb]
                      bg-[radial-gradient(ellipse_70%_60%_at_20%_10%,rgba(228,17,52,0.07)_0%,transparent_60%),
                          radial-gradient(ellipse_50%_50%_at_80%_90%,rgba(0,86,163,0.07)_0%,transparent_60%)]">

                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ willChange: "transform", opacity: 0 }}
                    className="w-[360px] bg-white rounded-[28px] overflow-hidden
                     border border-black/5
                     shadow-[0_4px_6px_rgba(0,0,0,0.04),0_24px_64px_rgba(0,0,0,0.11)]"
                >

                    {/* ── Logo bar ── */}
                    <div ref={logoRef} className="flex items-center justify-between px-5 pt-5 pb-0"
                         style={{ opacity: 0 }}>
                    </div>

                    {/* ── Image zone ── */}
                    <div className="relative h-[260px] flex items-center justify-center overflow-hidden
                          bg-gradient-to-b from-[#fff8f0] via-[#ffeee0] to-[#ffe4d0]">

                        {/* warm glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(228,17,52,0.08)_0%,transparent_65%)]" />

                        {/* spinning dashed ring */}
                        <div className="absolute w-[248px] h-[248px] rounded-full border-2 border-dashed border-[#E31837]/20
                            animate-[spin_18s_linear_infinite]" />

                        {/* soft inner glow */}
                        <div className="absolute w-[200px] h-[200px] rounded-full
                            bg-[radial-gradient(circle,rgba(255,220,180,0.55)_0%,transparent_70%)]
                            animate-pulse" />

                        {/* badge */}
                        <div ref={badgeRef} style={{ opacity: 0 }}
                             className="absolute top-4 right-4 z-10
                            bg-[#E31837] text-white text-[10px] font-700 tracking-widest uppercase
                            px-3 py-1.5 rounded-full
                            shadow-[0_4px_14px_rgba(227,24,55,0.4)]">
                            🔥 Bestseller
                        </div>

                        {/* pizza image */}
                        <div ref={imgRef} style={{ opacity: 0 }}
                             className="relative z-10 w-[215px] h-[215px] rounded-full overflow-hidden
                            shadow-[0_8px_30px_rgba(160,80,20,0.2),0_24px_60px_rgba(0,0,0,0.12)]
                            ring-4 ring-white ring-offset-0
                            outline outline-[6px] outline-[#E31837]/10">
                            <img src={PIZZA_IMAGE} alt="Chicken Dominator"
                                 className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* ── Body ── */}
                    <div className="px-6 pt-5 pb-6">

                        {/* Title + Price */}
                        <div className="flex justify-between items-start mb-1">
                            <div ref={titleRef} style={{ opacity: 0 }}>
                                <h2 className="font-playfair text-[22px] font-extrabold text-[#1a1008] leading-tight tracking-tight">
                                    Chicken<br />Dominator
                                </h2>
                                <p className="font-nunito text-[11px] text-[#b0906a] font-600 tracking-wide mt-0.5">
                                    Spicy · Loaded · Signature
                                </p>
                            </div>

                            <div ref={priceRef} style={{ opacity: 0 }} className="text-right pt-1">
                <span className="block font-nunito text-[10px] font-700 text-[#b0906a] tracking-widest uppercase mb-0.5">
                  From
                </span>
                                <span className="font-playfair text-[26px] font-bold text-[#1a1008] leading-none">
                  ৳{price}
                </span>
                            </div>
                        </div>

                        {/* divider */}
                        <div className="my-4 h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                        {/* Options */}
                        <div ref={optsRef} style={{ opacity: 0 }} className="space-y-3">

                            {/* Size */}
                            <div>
                                <p className="font-nunito text-[10px] font-700 text-[#b0906a] tracking-widest uppercase mb-2">
                                    Size
                                </p>
                                <div className="flex gap-2">
                                    {SIZE_OPTIONS.map(({ key, label, inch }) => (
                                        <button
                                            key={key}
                                            onClick={(e) => { handleSizeChange(key); chipBounce(e.currentTarget); }}
                                            className={[
                                                "flex-1 py-2 rounded-xl text-[12px] font-700 tracking-wide transition-all duration-200",
                                                selectedSize === key
                                                    ? "bg-[#006491] text-white shadow-[0_4px_14px_rgba(0,100,145,0.3)]"
                                                    : "bg-[#faf7f4] text-[#8a7060] border border-[#e8ddd4] hover:border-[#E31837] hover:text-[#E31837]"
                                            ].join(" ")}
                                        >
                                            <span className="block">{label}</span>
                                            <span className="block text-[10px] opacity-70">{inch}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Crust */}
                            <div>
                                <p className="font-nunito text-[10px] font-700 text-[#b0906a] tracking-widest uppercase mb-2">
                                    Crust
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {CRUST_OPTIONS.map(({ key, desc }) => (
                                        <button
                                            key={key}
                                            onClick={(e) => { setSelectedCrust(key); chipBounce(e.currentTarget); }}
                                            className={[
                                                "px-3 py-1.5 rounded-full text-[11px] font-600 transition-all duration-200",
                                                selectedCrust === key
                                                    ? "bg-[#E31837] text-white shadow-[0_3px_12px_rgba(227,24,55,0.3)]"
                                                    : "bg-[#faf7f4] text-[#8a7060] border border-[#e8ddd4] hover:border-[#E31837] hover:text-[#E31837]"
                                            ].join(" ")}
                                        >
                                            {key}
                                        </button>
                                    ))}
                                </div>
                                <p className="font-nunito text-[10px] text-[#b0906a] mt-1.5 pl-0.5">
                                    {CRUST_OPTIONS.find(c => c.key === selectedCrust)?.desc}
                                </p>
                            </div>
                        </div>

                        {/* CTA row */}
                        <div ref={ctaRef} style={{ opacity: 0 }} className="flex gap-2.5 mt-5">
                            <button
                                onClick={handleOrder}
                                disabled={ordering}
                                className={[
                                    "order-btn flex-1 py-3.5 rounded-2xl font-playfair text-[15px] font-bold text-white",
                                    "relative overflow-hidden transition-all duration-200",
                                    "shadow-[0_6px_22px_rgba(227,24,55,0.32)] hover:shadow-[0_10px_30px_rgba(227,24,55,0.44)]",
                                    "hover:-translate-y-0.5 active:translate-y-0",
                                    ordered
                                        ? "bg-gradient-to-br from-emerald-500 to-emerald-600"
                                        : ordering
                                            ? "bg-gradient-to-br from-[#d4c8be] to-[#c4b8ae] shadow-none cursor-not-allowed"
                                            : "bg-gradient-to-br from-[#E31837] to-[#c20e2b]",
                                ].join(" ")}
                            >
                <span className="flex items-center justify-center gap-2">
                  {ordering ? (
                      <>
                          <svg className="animate-spin w-4 h-4 text-[#8a7a70]" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                          </svg>
                          <span className="text-[#8a7a70]">Adding…</span>
                      </>
                  ) : ordered ? (
                      "✓ Added to Cart!"
                  ) : (
                      `Order Now · ৳${price}`
                  )}
                </span>
                            </button>

                            <button
                                onClick={handleFav}
                                className="fav-btn w-[50px] rounded-2xl border border-[#e8ddd4] bg-[#faf7f4]
                           flex items-center justify-center text-xl transition-all duration-200
                           hover:border-[#E31837]/40 hover:bg-[#E31837]/5"
                            >
                <span className={favoured ? "text-[#E31837]" : "text-[#c8b8a8]"}>
                  {favoured ? "♥" : "♡"}
                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}