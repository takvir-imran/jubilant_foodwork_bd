"use client";

// ─────────────────────────────────────────────────────────────────────────────
// MenuShowcase.tsx  –  Next.js App Router
//
// Tabbed menu section with category pills + product cards.
// Card style inherits from PizzaProductCard:
//   • Warm cream/white background, rounded-[28px]
//   • Playfair Display headings, Nunito body
//   • Domino's brand colours: #006491 (blue), #E31837 (red)
//   • GSAP entry animation per card (no tilt)
//   • Size selector + Add to Cart interaction
// ─────────────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ShoppingCart, Flame, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

// ── Font injection (Playfair + Nunito) ───────────────────────────────────────
const FontStyle = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Nunito:wght@400;500;600;700;800&display=swap');
    .font-playfair { font-family: 'Playfair Display', serif; }
    .font-nunito   { font-family: 'Nunito', sans-serif; }
  `}</style>
);

// ── Data types ────────────────────────────────────────────────────────────────
type Size = "REG" | "MED" | "LAR";

interface MenuItem {
    id: string;
    name: string;
    subtitle: string;
    tags: string[];
    image: string;           // local /assets/ path or remote URL
    basePrice: number;
    rating: number;
    reviews: number;
    badge?: string;
    badgeColor?: string;
    spicy?: boolean;
    hasSizes?: boolean;      // show size selector
}

interface Category {
    key: string;
    label: string;
    emoji: string;
    accent: string;          // Tailwind bg colour for active tab
    items: MenuItem[];
}

// ── Menu data ─────────────────────────────────────────────────────────────────
// Images use Unsplash for demo. Swap src values for your /assets/ paths.
const CATEGORIES: Category[] = [
    {
        key: "pizzas",
        label: "Pizzas",
        emoji: "🍕",
        accent: "#E31837",
        items: [
            {
                id: "chicken-dominator",
                name: "Chicken Dominator",
                subtitle: "Spicy · Loaded · Signature",
                tags: ["Spicy", "Bestseller"],
                image: "/assets/dominos/Beefy-Meetza.png",
                basePrice: 799,
                rating: 4.9,
                reviews: 3200,
                badge: "🔥 Bestseller",
                badgeColor: "#E31837",
                spicy: true,
                hasSizes: true,
            },
            {
                id: "margherita",
                name: "Margherita",
                subtitle: "Classic · Light · Italian",
                tags: ["Vegetarian"],
                image: "/assets/dominos/Pizza-2.png",
                basePrice: 549,
                rating: 4.7,
                reviews: 2100,
                badge: "Classic",
                badgeColor: "#006491",
                hasSizes: true,
            },
            {
                id: "bbq-chicken",
                name: "BBQ Chicken",
                subtitle: "Smoky · Bold · Juicy",
                tags: ["Smoky"],
                image: "/assets/dominos/Pizza-3.png",
                basePrice: 749,
                rating: 4.8,
                reviews: 1800,
                badge: "New",
                badgeColor: "#006491",
                spicy: true,
                hasSizes: true,
            },
            {
                id: "veggie-delight",
                name: "Veggie Delight",
                subtitle: "Fresh · Colourful · Light",
                tags: ["Vegetarian", "Healthy"],
                image: "/assets/dominos/Pizza-4.png",
                basePrice: 599,
                rating: 4.6,
                reviews: 1200,
                hasSizes: true,
            },
        ],
    },
    {
        key: "sides",
        label: "Sides",
        emoji: "🍗",
        accent: "#FFB300",
        items: [
            {
                id: "crispy-wings",
                name: "Crispy Wings",
                subtitle: "8 pcs · Spicy coating",
                tags: ["Spicy", "Sharing"],
                image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
                basePrice: 349,
                rating: 4.8,
                reviews: 1500,
                badge: "🔥 Hot",
                badgeColor: "#E31837",
                spicy: true,
            },
            {
                id: "garlic-bread",
                name: "Garlic Bread",
                subtitle: "6 pcs · Herb butter",
                tags: ["Vegetarian"],
                image: "https://images.unsplash.com/photo-1619531040576-f9416740661d?w=400&q=80",
                basePrice: 199,
                rating: 4.6,
                reviews: 980,
                badge: "Classic",
                badgeColor: "#006491",
            },
            {
                id: "potato-wedges",
                name: "Potato Wedges",
                subtitle: "Seasoned · Golden · Crispy",
                tags: ["Vegetarian"],
                image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80",
                basePrice: 179,
                rating: 4.5,
                reviews: 760,
            },
            {
                id: "choco-lava",
                name: "Choco Lava Cake",
                subtitle: "Warm · Gooey · Indulgent",
                tags: ["Dessert"],
                image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
                basePrice: 149,
                rating: 4.9,
                reviews: 2200,
                badge: "Fan Fav",
                badgeColor: "#7B3F00",
            },
        ],
    },
    {
        key: "drinks",
        label: "Drinks",
        emoji: "🥤",
        accent: "#006491",
        items: [
            {
                id: "pepsi",
                name: "Pepsi",
                subtitle: "330ml · Ice cold",
                tags: [],
                image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80",
                basePrice: 99,
                rating: 4.4,
                reviews: 500,
            },
            {
                id: "7up",
                name: "7UP",
                subtitle: "330ml · Refreshing",
                tags: [],
                image: "https://images.unsplash.com/photo-1416838315838-26d0c2f77e4e?w=400&q=80",
                basePrice: 99,
                rating: 4.3,
                reviews: 420,
            },
            {
                id: "pepsi-1.5l",
                name: "Pepsi 1.5L",
                subtitle: "Family size · Best with combo",
                tags: ["Value"],
                image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80",
                basePrice: 199,
                rating: 4.5,
                reviews: 680,
                badge: "Value",
                badgeColor: "#006491",
            },
            {
                id: "water",
                name: "Mineral Water",
                subtitle: "500ml · Still",
                tags: [],
                image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&q=80",
                basePrice: 49,
                rating: 4.2,
                reviews: 310,
            },
        ],
    },
    {
        key: "combos",
        label: "Combos",
        emoji: "🎁",
        accent: "#7CB342",
        items: [
            {
                id: "family-feast",
                name: "Family Feast",
                subtitle: "2 Large + Garlic Bread + 1.5L",
                tags: ["Save 29%", "Sharing"],
                image: "https://images.unsplash.com/photo-1594179047519-f347310d3322?w=400&q=80",
                basePrice: 1499,
                rating: 4.9,
                reviews: 3100,
                badge: "Save 29%",
                badgeColor: "#7CB342",
            },
            {
                id: "wings-pizza",
                name: "Wings & Pizza",
                subtitle: "1 Medium + 8pc Wings + 2 Drinks",
                tags: ["Best Value"],
                image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80",
                basePrice: 999,
                rating: 4.8,
                reviews: 2400,
                badge: "Best Value",
                badgeColor: "#FFB300",
            },
            {
                id: "date-night",
                name: "Date Night",
                subtitle: "2 Medium + 2 Drinks + Dessert",
                tags: ["Romantic"],
                image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80",
                basePrice: 1199,
                rating: 4.7,
                reviews: 1800,
                badge: "Popular",
                badgeColor: "#E31837",
            },
            {
                id: "solo-deal",
                name: "Solo Deal",
                subtitle: "1 Regular + Side + 1 Drink",
                tags: ["Solo"],
                image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80",
                basePrice: 499,
                rating: 4.6,
                reviews: 1400,
            },
        ],
    },
];

const SIZE_OPTIONS: { key: Size; label: string; inch: string; multiplier: number }[] = [
    { key: "REG", label: "Reg",  inch: '6"',  multiplier: 1 },
    { key: "MED", label: "Med",  inch: '9"',  multiplier: 1.3 },
    { key: "LAR", label: "Lrg",  inch: '12"', multiplier: 1.6 },
];

// ── Single product card ───────────────────────────────────────────────────────
function ProductCard({ item, index, accent }: { item: MenuItem; index: number; accent: string }) {
    const [size, setSize]       = useState<Size>("MED");
    const [added, setAdded]     = useState(false);
    const [adding, setAdding]   = useState(false);
    const [liked, setLiked]     = useState(false);
    const cardRef               = useRef<HTMLDivElement>(null);
    const priceRef              = useRef<HTMLSpanElement>(null);

    // Price = base × size multiplier (only for items with sizes)
    const multiplier = item.hasSizes
        ? (SIZE_OPTIONS.find(s => s.key === size)?.multiplier ?? 1)
        : 1;
    const price = Math.round(item.basePrice * multiplier);

    // ── Staggered entry animation ──
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardRef.current,
                { opacity: 0, y: 40, scale: 0.95 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: "power3.out",
                }
            );
        });
        return () => ctx.revert();
    }, [index]);

    // ── Size change: flash price ──
    const handleSize = (key: Size) => {
        setSize(key);
        gsap.fromTo(priceRef.current,
            { scale: 1.3, color: "#E31837" },
            { scale: 1,   color: "#1a1008", duration: 0.4, ease: "power2.out" }
        );
    };

    // ── Add to cart ──
    const handleAdd = async () => {
        gsap.fromTo(cardRef.current,
            { scale: 0.97 },
            { scale: 1, duration: 0.35, ease: "elastic.out(1.2, 0.5)" }
        );
        setAdding(true);
        await new Promise(r => setTimeout(r, 1200));
        setAdding(false);
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <div
            ref={cardRef}
            style={{ opacity: 0 }}
            className="font-nunito w-full bg-white rounded-[24px] overflow-hidden
                       border border-black/5
                       shadow-[0_2px_8px_rgba(0,0,0,0.06),0_12px_40px_rgba(0,0,0,0.08)]
                       flex flex-col"
        >
            {/* Image zone */}
            <div className="relative h-[180px] flex items-center justify-center overflow-hidden
                            bg-gradient-to-b from-[#fff8f0] via-[#ffeee0] to-[#ffe4d0]">

                {/* Warm radial glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(228,17,52,0.06)_0%,transparent_65%)]" />

                {/* Spinning dashed ring */}
                <div className="absolute w-[180px] h-[180px] rounded-full border-2 border-dashed border-[#E31837]/15
                                animate-[spin_20s_linear_infinite]" />

                {/* Badge */}
                {item.badge && (
                    <div
                        className="absolute top-3 left-3 z-10 text-white text-[9px] font-bold tracking-widest uppercase
                                   px-2.5 py-1 rounded-full shadow-md"
                        style={{ backgroundColor: item.badgeColor ?? "#E31837" }}
                    >
                        {item.badge}
                    </div>
                )}

                {/* Favourite button */}
                <button
                    onClick={() => setLiked(p => !p)}
                    className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur
                               flex items-center justify-center text-sm hover:scale-110 transition-transform"
                >
                    <span className={liked ? "text-[#E31837]" : "text-[#c8b8a8]"}>
                        {liked ? "♥" : "♡"}
                    </span>
                </button>

                {/* Product image — circular
                    Uses explicit width/height instead of fill to avoid
                    the "fill needs a sized relative parent" ambiguity
                    when multiple nested relative containers are present. */}
                <div className="relative z-10 w-[150px] h-[150px] rounded-full overflow-hidden
                                shadow-[0_6px_24px_rgba(160,80,20,0.18)]
                                ring-4 ring-white flex-shrink-0">
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={150}
                        height={150}
                        className="object-cover w-full h-full rounded-full"
                    />
                </div>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 px-4 pt-4 pb-4 gap-3">

                {/* Title + rating */}
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-playfair text-[17px] font-extrabold text-[#1a1008] leading-tight">
                            {item.name}
                        </h3>
                        {item.spicy && <Flame className="w-4 h-4 text-[#E31837] flex-shrink-0 mt-0.5" />}
                    </div>
                    <p className="text-[11px] text-[#b0906a] font-semibold tracking-wide mt-0.5">
                        {item.subtitle}
                    </p>
                    <div className="flex items-center gap-1 mt-1.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[11px] text-gray-500">
                            {item.rating} ({item.reviews.toLocaleString()})
                        </span>
                    </div>
                </div>

                {/* Size selector — only for items that have sizes */}
                {item.hasSizes && (
                    <div className="flex gap-1.5">
                        {SIZE_OPTIONS.map(({ key, label, inch }) => (
                            <button
                                key={key}
                                onClick={() => handleSize(key)}
                                className={[
                                    "flex-1 py-1.5 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-200",
                                    size === key
                                        ? "bg-[#006491] text-white shadow-[0_3px_10px_rgba(0,100,145,0.3)]"
                                        : "bg-[#faf7f4] text-[#8a7060] border border-[#e8ddd4] hover:border-[#E31837] hover:text-[#E31837]",
                                ].join(" ")}
                            >
                                <span className="block">{label}</span>
                                <span className="block text-[9px] opacity-70">{inch}</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-black/8 to-transparent" />

                {/* Price + CTA */}
                <div className="flex items-center justify-between gap-2 mt-auto">
                    <div>
                        <span className="block text-[9px] font-bold text-[#b0906a] tracking-widest uppercase">
                            {item.hasSizes ? "From" : "Price"}
                        </span>
                        <span
                            ref={priceRef}
                            className="font-playfair text-[22px] font-bold text-[#1a1008] leading-none"
                        >
                            ৳{price}
                        </span>
                    </div>

                    <button
                        onClick={handleAdd}
                        disabled={adding}
                        className={[
                            "flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-[12px] font-bold text-white",
                            "transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5",
                            added
                                ? "bg-emerald-500 shadow-emerald-200"
                                : adding
                                    ? "bg-[#d4c8be] cursor-not-allowed shadow-none"
                                    : "bg-gradient-to-br from-[#E31837] to-[#c20e2b] shadow-[#E31837]/30",
                        ].join(" ")}
                    >
                        {adding ? (
                            <svg className="animate-spin w-3.5 h-3.5 text-[#8a7a70]" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
                            </svg>
                        ) : added ? (
                            "Ordered"
                        ) : (
                            <>
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Order
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Category tab pill ─────────────────────────────────────────────────────────
function CategoryTab({
                         cat,
                         active,
                         onClick,
                     }: {
    cat: Category;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold font-nunito",
                "transition-all duration-250 whitespace-nowrap border",
                active
                    ? "text-white shadow-lg border-transparent scale-105"
                    : "bg-white text-[#8a7060] border-[#e8ddd4] hover:border-[#E31837] hover:text-[#E31837]",
            ].join(" ")}
            style={active ? { backgroundColor: cat.accent, boxShadow: `0 4px 16px ${cat.accent}40` } : {}}
        >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            <span
                className={[
                    "text-[11px] px-1.5 py-0.5 rounded-full font-bold",
                    active ? "bg-white/20 text-white" : "bg-[#faf7f4] text-[#b0906a]",
                ].join(" ")}
            >
                {cat.items.length}
            </span>
        </button>
    );
}

// ── Main export ───────────────────────────────────────────────────────────────
export function MenuShowcase() {
    const [activeKey, setActiveKey] = useState("pizzas");
    const gridRef = useRef<HTMLDivElement>(null);

    const activeCategory = CATEGORIES.find(c => c.key === activeKey) ?? CATEGORIES[0];

    // Animate grid out→in on category switch
    const handleCategoryChange = (key: string) => {
        if (key === activeKey) return;
        gsap.to(gridRef.current, {
            opacity: 0, y: 12, duration: 0.18, ease: "power2.in",
            onComplete: () => {
                setActiveKey(key);
                gsap.fromTo(gridRef.current,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
                );
            },
        });
    };

    return (
        <>
            <FontStyle />
            <section
                className="font-nunito py-14 md:py-20"
                style={{
                    background: "linear-gradient(135deg, #fdf8f3 0%, #fff5ed 50%, #fdf0e8 100%)",
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-12">

                    {/* ── Section header ── */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                        <div>
                            <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#1a1008] leading-tight">
                                Order What You <br className="hidden md:block" />
                                <span className="text-[#006491]">Love</span>
                            </h2>
                        </div>
                        {/* "See full menu" link */}
                        <Link
                            href="https://m.dominos.com.bd/jfl-discovery-ui/en/pwa/store-anchor/67830"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006491]
                                       hover:text-[#E31837] transition-colors group"
                        >
                            See Full Menu
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* ── Category tabs — horizontal scroll on mobile ── */}
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide mb-8 snap-x">
                        {CATEGORIES.map(cat => (
                            <div key={cat.key} className="snap-start flex-shrink-0">
                                <CategoryTab
                                    cat={cat}
                                    active={activeKey === cat.key}
                                    onClick={() => handleCategoryChange(cat.key)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* ── Product grid ── */}
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
                    >
                        {activeCategory.items.map((item, i) => (
                            <ProductCard
                                key={item.id}
                                item={item}
                                index={i}
                                accent={activeCategory.accent}
                            />
                        ))}
                    </div>

                    {/* ── Bottom CTA ── */}
                    <div className="mt-10 text-center">
                        <p className="text-sm text-[#b0906a] font-semibold mb-4">
                            Can&apos;t find what you&apos;re looking for?
                        </p>
                        <Link
                            href="https://m.dominos.com.bd/jfl-discovery-ui/en/pwa/store-anchor/67830"
                            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm
                                       bg-[#006491] text-white
                                       shadow-[0_6px_20px_rgba(0,100,145,0.3)]
                                       hover:shadow-[0_10px_28px_rgba(0,100,145,0.4)]
                                       hover:-translate-y-0.5 transition-all duration-200"
                            target="_blank"
                        >
                            <ShoppingCart className="w-4 h-4" />
                            View Complete Menu
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
