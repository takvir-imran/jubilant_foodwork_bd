'use client'

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { Trophy, MapPin, Users, Award, Star } from "lucide-react";
import {HeadingTag} from "@/app/global_component/HeadingTag";

// ── Brand tokens ───────────────────────────────────────────────────────
const B = {
    sky:       "#00B0E6",
    skyLight:  "#E6F7FD",
    skyMid:    "#4DC8F0",
    green:     "#7CB342",
    greenLight:"#F1F8E9",
    navy:      "#0056A3",
    navyLight: "#E8F0FA",
    navyDeep:  "#004B96",
    gold:      "#FFB300",
    goldLight: "#FFF8E1",
    red:       "#E41134",
    gray50:    "#F8FAFC",
    gray100:   "#F1F5F9",
    gray200:   "#E2E8F0",
    gray400:   "#94A3B8",
    gray600:   "#475569",
    gray900:   "#0F172A",
};

type Award_ = {
    id: number;
    year: string;
    tag: string;
    title: string;
    org: string;
    story: string;
    image: string;
    badge: string;
    accentFrom: string;
    accentTo: string;
    accentLight: string;
};

type Stat = {
    icon: typeof Trophy;
    value: number;
    suffix: string;
    label: string;
    color: string;
    bgLight: string;
};

// ── Data ───────────────────────────────────────────────────────────────
const ALL_AWARDS: Award_[] = [
    {
        id: 1, year: "2024", tag: "Excellence",
        title: "Excellence in Business",
        org: "Bangladesh Business Awards",
        story: "Our frontline teams redefined what hospitality means in the fast-food space. Through 250,000+ interactions tracked and refined, our NPS score reached an all-time high.",
        image: "/assets/Award2.jpeg",
        badge: "⭐",
        accentFrom: B.gold, accentTo: "#E65100", accentLight: B.goldLight,
    },
    {
        id: 2, year: "2026", tag: "Featured",
        title: "Chairperson's Award",
        org: "Bangladesh Retail Excellence Awards",
        story: "In a year defined by fierce competition, Jubilant FoodWorks rose above the rest — not through marketing, but through the relentless pursuit of a single promise: that every customer leaves happier than they arrived.",
        image: "/assets/CPAAward.jpeg",
        badge: "🏆",
        accentFrom: B.sky, accentTo: B.navy, accentLight: B.skyLight,
    },

];

const YEARS = ["All", "2026" ,"2024", "2023", "2022"] as const;
type YearFilter = typeof YEARS[number];

// ── Hooks ──────────────────────────────────────────────────────────────
function useHasMounted(): boolean {
    const [m, setM] = useState(false);
    useEffect(() => { setM(true); }, []);
    return m;
}

function useAutoplay(cb: () => void, delay: number, paused: boolean): void {
    const saved = useRef(cb);
    useEffect(() => { saved.current = cb; }, [cb]);
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => saved.current(), delay);
        return () => clearInterval(id);
    }, [delay, paused]);
}

function Counter({ value, suffix, run }: { value: number; suffix: string; run: boolean }) {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!run) return;
        let start: number | null = null;
        const duration = 2000;
        const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(eased * value));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [run, value]);
    return <>{n}{suffix}</>;
}

// ── Component ──────────────────────────────────────────────────────────
export default function AwardsSlider() {
    const [yearFilter, setYearFilter] = useState<YearFilter>("All");
    const [active, setActive]         = useState(0);
    const [dir, setDir]               = useState<1 | -1>(1);
    const [animKey, setAnimKey]       = useState(0);
    const [paused, setPaused]         = useState(false);
    const [locked, setLocked]         = useState(false);
    const [statsRun, setStatsRun]     = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    const mounted = useHasMounted();

    // Filtered award list
    const awards = yearFilter === "All"
        ? ALL_AWARDS
        : ALL_AWARDS.filter(a => a.year === yearFilter);

    const total = awards.length;
    // Clamp active index when filter changes
    const safeActive = Math.min(active, total - 1);
    const award = awards[safeActive];

    // Stats intersection observer
    useEffect(() => {
        if (!statsRef.current) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setStatsRun(true); },
            { threshold: 0.3 }
        );
        obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const go = useCallback((nextIdx: number, direction: 1 | -1) => {
        if (locked) return;
        setLocked(true);
        setDir(direction);
        setActive(nextIdx);
        setAnimKey(k => k + 1);
        setTimeout(() => setLocked(false), 650);
    }, [locked]);

    const next = useCallback(() => go((safeActive + 1) % total, 1),                        [go, safeActive, total]);
    const prev = useCallback(() => go((safeActive - 1 + total) % total, -1),               [go, safeActive, total]);
    const goTo = useCallback((i: number) => go(i, i >= safeActive ? 1 : -1),               [go, safeActive]);

    // When year filter changes, reset to slide 0 with animation
    const handleYearFilter = (y: YearFilter) => {
        setYearFilter(y);
        setActive(0);
        setAnimKey(k => k + 1);
        setDir(1);
    };

    useAutoplay(next, 6000, paused);

    const slideClass = mounted
        ? dir === 1 ? "asl-enter-right" : "asl-enter-left"
        : "asl-visible";

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

                .asl-root    { font-family: 'DM Sans', sans-serif; }
                .asl-display { font-family: 'Playfair Display', Georgia, serif; }

                @keyframes asl-right {
                    from { opacity:0; transform:translateX(64px) scale(0.98); }
                    to   { opacity:1; transform:translateX(0)    scale(1);    }
                }
                @keyframes asl-left {
                    from { opacity:0; transform:translateX(-64px) scale(0.98); }
                    to   { opacity:1; transform:translateX(0)     scale(1);    }
                }
                .asl-enter-right { animation: asl-right 0.6s cubic-bezier(0.22,1,0.36,1) both; }
                .asl-enter-left  { animation: asl-left  0.6s cubic-bezier(0.22,1,0.36,1) both; }
                .asl-visible     { opacity:1; }

                @keyframes asl-zoom { from { transform:scale(1.07); } to { transform:scale(1); } }
                .asl-img-zoom { animation: asl-zoom 0.7s ease forwards; }

                @keyframes asl-prog { from { transform:scaleX(0); } to { transform:scaleX(1); } }
                .asl-progress { animation: asl-prog 6s linear forwards; }

                @keyframes asl-badge {
                    from { opacity:0; transform:translateY(-10px) rotate(-5deg); }
                    to   { opacity:1; transform:none; }
                }
                .asl-badge { animation: asl-badge 0.5s ease 0.25s both; }

                @keyframes asl-float {
                    0%,100% { transform:translateY(0) rotate(0deg); }
                    50%     { transform:translateY(-16px) rotate(3deg); }
                }
                .asl-float { animation: asl-float 7s ease-in-out infinite; }

                /* Year filter pill */
                .asl-year-pill {
                    cursor: pointer;
                    transition: all 0.22s ease;
                    border: none;
                    outline: none;
                }
                .asl-year-pill:hover:not(.asl-year-active) {
                    background: #E2E8F0 !important;
                    color: #0F172A !important;
                }

                /* Stat card */
                .asl-stat { transition: transform 0.3s ease, box-shadow 0.3s ease; }
                .asl-stat:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.10) !important;
                }

                /* Arrow nav */
                .asl-arrow { transition: all 0.22s ease; }
                .asl-arrow:hover { transform: scale(1.1); }

                /* Thumb */
                .asl-thumb { transition: all 0.28s ease; }
                .asl-thumb:hover { opacity: 0.75 !important; }

                /* Dotted bg */
                .asl-dots-bg {
                    background-image: radial-gradient(circle, #CBD5E1 1px, transparent 1px);
                    background-size: 24px 24px;
                }

                /* Empty state fade in */
                @keyframes asl-fadein { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
                .asl-empty { animation: asl-fadein 0.4s ease both; }
            `}</style>

            <section
                className="asl-root relative overflow-hidden bg-white mb-20"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* Dot pattern */}
                <div className="asl-dots-bg pointer-events-none absolute inset-0 opacity-[0.35]" />

                {/* Colour washes */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full blur-3xl"
                         style={{ background:`${B.sky}12` }} />
                    <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full blur-3xl"
                         style={{ background:`${B.green}0E` }} />
                    <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                         style={{ background:`${B.gold}0A` }} />
                </div>

                {/* Floating trophy */}
                <div className="asl-float pointer-events-none absolute right-16 top-16 select-none text-7xl opacity-[0.04]">🏆</div>

                {/* ═══════════════════════════════════
                    HEADER
                ═══════════════════════════════════ */}
                <div className="relative z-10 px-6 pb-0 pt-20 text-center">
                    {/* Eyebrow */}
                    <HeadingTag tag="Recognition & Excellence" />


                    {/* Heading */}
                    <h2 className="asl-display mx-auto max-w-3xl text-[clamp(32px,5vw,58px)] font-black leading-[1.05] tracking-tight"
                        style={{ color: B.gray900 }}>
                        Celebrating Our{" "}
                        <span className="relative inline-block" style={{ color: B.navy }}>
                            Awards
                            <span className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
                                  style={{ background:`linear-gradient(90deg,${B.sky},${B.green})` }} />
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl text-base font-light leading-relaxed" style={{ color: B.gray400 }}>
                        A legacy built on trust, quality, and the relentless pursuit of excellence — one award at a time.
                    </p>

                    {/* ── Year filter pills (FUNCTIONAL) ── */}
                    <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
                        {YEARS.map((y) => {
                            const isActive = yearFilter === y;
                            const count = y === "All"
                                ? ALL_AWARDS.length
                                : ALL_AWARDS.filter(a => a.year === y).length;

                            return (
                                <button
                                    key={y}
                                    className="asl-year-pill inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
                                    onClick={() => handleYearFilter(y)}
                                    aria-pressed={isActive}
                                    style={isActive ? {
                                        background: `linear-gradient(90deg, ${B.sky}, ${B.navy})`,
                                        color: "#fff",
                                        boxShadow: `0 4px 14px ${B.sky}40`,
                                    } : {
                                        background: B.gray100,
                                        color: B.gray600,
                                        border: `1px solid ${B.gray200}`,
                                    }}
                                >
                                    {y}
                                    {/* Count badge */}
                                    <span
                                        className="rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none"
                                        style={{
                                            background: isActive ? "rgba(255,255,255,0.25)" : B.gray200,
                                            color: isActive ? "#fff" : B.gray400,
                                        }}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Active filter label */}
                    {yearFilter !== "All" && (
                        <p className="mt-2 text-xs" style={{ color: B.gray400 }}>
                            Showing {awards.length} award{awards.length !== 1 ? "s" : ""} from{" "}
                            <span style={{ color: B.navy }} className="font-semibold">{yearFilter}</span>
                            {" · "}
                            <button
                                className="underline transition-colors hover:no-underline"
                                style={{ color: B.sky, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                                onClick={() => handleYearFilter("All")}
                            >
                                Show all
                            </button>
                        </p>
                    )}
                </div>

                {/* ═══════════════════════════════════
                    SLIDER
                ═══════════════════════════════════ */}
                <div className="relative z-10 mx-auto mt-10 w-full max-w-[1040px] px-4 sm:px-6">

                    {/* Empty state — no awards for selected year */}
                    {total === 0 ? (
                        <div className="asl-empty flex flex-col items-center justify-center rounded-3xl border py-24 text-center"
                             style={{ borderColor: B.gray200, background: B.gray50 }}>
                            <span className="mb-4 text-5xl">🏅</span>
                            <p className="text-lg font-semibold" style={{ color: B.gray900 }}>
                                No awards found for {yearFilter}
                            </p>
                            <p className="mt-1 text-sm" style={{ color: B.gray400 }}>
                                Try selecting a different year
                            </p>
                            <button
                                className="mt-5 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
                                style={{ background: `linear-gradient(90deg,${B.sky},${B.navy})` }}
                                onClick={() => handleYearFilter("All")}
                            >
                                View all awards
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Card */}
                            <div
                                key={animKey}
                                className={`${slideClass} overflow-hidden rounded-3xl bg-white`}
                                style={{
                                    boxShadow: `0 24px 64px rgba(0,86,163,0.12), 0 0 0 1px ${B.gray200}`,
                                    minHeight: 480,
                                }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: 480 }}>

                                    {/* LEFT — Image */}
                                    <div className="relative min-h-[280px] overflow-hidden md:min-h-[480px]">
                                        <Image
                                            key={`img-${animKey}`}
                                            src={award.image}
                                            alt={award.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 520px"
                                            className="asl-img-zoom object-cover"
                                            priority={safeActive === 0}
                                        />
                                        <div className="absolute inset-0"
                                             style={{ background:`linear-gradient(180deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,0.55) 100%)` }} />
                                        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl"
                                             style={{ background:`${award.accentFrom}35` }} />
                                        <div className="absolute left-0 top-0 h-full w-1.5"
                                             style={{ background:`linear-gradient(180deg,${award.accentFrom},${award.accentTo})` }} />

                                        {/* Badges */}
                                        <div className="asl-badge absolute left-5 top-5 flex flex-wrap gap-2">
                                            <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white"
                                                  style={{ background:`linear-gradient(90deg,${award.accentFrom},${award.accentTo})` }}>
                                                {award.tag}
                                            </span>
                                            <span className="rounded-full px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm"
                                                  style={{ background:"rgba(0,0,0,0.35)", border:"1px solid rgba(255,255,255,0.25)" }}>
                                                ⭐ {award.year}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl backdrop-blur-md"
                                             style={{ background:"rgba(255,255,255,0.15)", border:"1.5px solid rgba(255,255,255,0.3)" }}>
                                            {award.badge}
                                        </div>

                                        <div className="absolute bottom-6 left-5 font-mono text-[11px] font-bold tracking-[3px] text-white/60">
                                            {String(safeActive + 1).padStart(2, "0")}
                                            <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
                                        </div>
                                    </div>

                                    {/* RIGHT — Content */}
                                    <div className="flex flex-col justify-between p-8 md:p-10"
                                         style={{ background: award.accentLight, borderLeft:`1px solid ${B.gray200}` }}>
                                        <div>
                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="h-px w-8 rounded"
                                                     style={{ background:`linear-gradient(90deg,${award.accentFrom},${award.accentTo})` }} />
                                                <p className="text-[10px] font-bold uppercase tracking-[2.5px]"
                                                   style={{ color: award.accentFrom }}>
                                                    {award.org}
                                                </p>
                                            </div>

                                            <h3 className="asl-display mb-4 text-[clamp(22px,3vw,34px)] font-black leading-[1.15] tracking-tight"
                                                style={{ color: B.gray900 }}>
                                                {award.title}
                                            </h3>

                                            <div className="mb-5 flex items-center gap-3">
                                                <div className="h-[3px] w-10 rounded-full"
                                                     style={{ background:`linear-gradient(90deg,${award.accentFrom},${award.accentTo})` }} />
                                                <div className="h-2 w-2 rounded-full" style={{ background: award.accentTo }} />
                                            </div>

                                            <p className="text-[15px] font-light leading-[1.85]" style={{ color: B.gray600 }}>
                                                {award.story}
                                            </p>
                                        </div>

                                        {/* Nav */}
                                        <div className="mt-8 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                {awards.map((_, i) => (
                                                    <button key={i} onClick={() => goTo(i)}
                                                            aria-label={`Go to award ${i + 1}`}
                                                            className="rounded-full border-none p-0 transition-all duration-300"
                                                            style={{
                                                                height: 8,
                                                                width: i === safeActive ? 28 : 8,
                                                                cursor: "pointer",
                                                                background: i === safeActive
                                                                    ? `linear-gradient(90deg,${award.accentFrom},${award.accentTo})`
                                                                    : B.gray200,
                                                            }} />
                                                ))}
                                            </div>

                                            <div className="flex gap-2">
                                                {([["←", prev], ["→", next]] as [string, () => void][]).map(([lbl, fn]) => (
                                                    <button key={lbl}
                                                            className="asl-arrow flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-base font-medium"
                                                            onClick={fn}
                                                            aria-label={lbl === "←" ? "Previous" : "Next"}
                                                            style={{
                                                                border:`1.5px solid ${B.gray200}`,
                                                                background:"#fff",
                                                                color: B.gray600,
                                                                boxShadow:"0 2px 8px rgba(0,0,0,0.06)",
                                                            }}>
                                                        {lbl}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress bar */}
                            <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-gray-100">
                                <div key={`p-${animKey}`}
                                     className={`h-full origin-left rounded-full ${!paused ? "asl-progress" : ""}`}
                                     style={{ background:`linear-gradient(90deg,${award.accentFrom},${award.accentTo})` }} />
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-4 flex justify-center gap-2">
                                {awards.map((a, i) => (
                                    <button key={a.id}
                                            className="asl-thumb relative overflow-hidden rounded-xl p-0"
                                            onClick={() => goTo(i)}
                                            aria-label={`Jump to ${a.title}`}
                                            style={{
                                                width: 60, height: 40, flexShrink: 0, cursor: "pointer",
                                                border: i === safeActive
                                                    ? `2.5px solid ${a.accentFrom}`
                                                    : `2px solid ${B.gray200}`,
                                                opacity: i === safeActive ? 1 : 0.45,
                                                transform: i === safeActive ? "scale(1.1)" : "scale(1)",
                                                boxShadow: i === safeActive ? `0 0 16px ${a.accentFrom}40` : "none",
                                            }}>
                                        <Image src={a.image} alt={a.title} fill sizes="60px" className="object-cover" />
                                        {i === safeActive && (
                                            <div className="absolute inset-0 rounded-xl"
                                                 style={{ background:`linear-gradient(135deg,${a.accentFrom}25,transparent)` }} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
