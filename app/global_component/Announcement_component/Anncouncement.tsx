'use client';

import { announcements } from '@/data/AnnouncementData';
import { useRef, useState, useEffect } from 'react';
import gsap from "gsap";
import AnnouncementCard from './AnnouncementCard';

export function Announcements() {
    const trackRef  = useRef<HTMLDivElement>(null);
    const tweenRef  = useRef<gsap.core.Tween | null>(null);
    const wrapRef   = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);

    const doubled = [...announcements, ...announcements];

    /* Marquee tween */
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const raf = requestAnimationFrame(() => {
            const half = track.scrollWidth / 2;
            tweenRef.current = gsap.to(track, {
                x: -half,
                duration: half / 55,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % half),
                },
                onStart: () => setReady(true),
            });
        });

        const wrap = wrapRef.current;
        const pause  = () => tweenRef.current?.pause();
        const resume = () => tweenRef.current?.resume();
        wrap?.addEventListener('mouseenter', pause);
        wrap?.addEventListener('mouseleave', resume);

        return () => {
            cancelAnimationFrame(raf);
            tweenRef.current?.kill();
            wrap?.removeEventListener('mouseenter', pause);
            wrap?.removeEventListener('mouseleave', resume);
        };
    }, []);

    /* Header entrance animation */
    useEffect(() => {
        if (!headerRef.current) return;
        gsap.from(headerRef.current.children, {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power3.out',
            delay: 0.2,
        });
    }, []);

    return (
        <section
            className="relative py-15 overflow-hidden"
            style={{
                background:
                    'radial-gradient(ellipse 70% 50% at 50% 0%, #EBF4FF, transparent), radial-gradient(ellipse 40% 30% at 90% 80%, #E6F7FD55, transparent), #ffffff',
            }}
        >
            {/* Ambient orbs */}
            <div
                className="absolute top-0 left-1/3 w-[600px] h-[400px] rounded-full pointer-events-none"
                style={{ background: '#0056A3', filter: 'blur(140px)', opacity: 0.07 }}
            />
            <div
                className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
                style={{ background: '#00B0E6', filter: 'blur(120px)', opacity: 0.06 }}
            />
            <div
                className="absolute top-1/2 left-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: '#E41134', filter: 'blur(100px)', opacity: 0.04 }}
            />

            {/* Dot-grid texture */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #0056A318 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    opacity: 0.6,
                }}
            />

            {/* ── Header ── */}
            <div ref={headerRef} className="container mx-auto px-6 lg:px-12 mb-16 relative z-10">


                {/* Title + CTA */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
                    <div>
                        <h2
                            className="text-5xl md:text-6xl font-black tracking-tight leading-none mb-3"
                            style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
                        >
                            <span style={{ color: '#111827' }}>Latest</span>
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #0056A3, #00B0E6)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Announcements
                            </span>
                        </h2>
                        <p className="text-gray-500 text-base font-light tracking-wide">
                            Stay updated with milestones, events &amp; achievements
                        </p>
                    </div>
                </div>
            </div>

            {/* ── Marquee ── */}
            <div ref={wrapRef} className="relative">
                {/* Edge fades */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, #ffffff, transparent)' }}
                />
                <div
                    className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
                    style={{ background: 'linear-gradient(270deg, #ffffff, transparent)' }}
                />

                <div className="overflow-hidden py-4 px-2">
                    <div
                        ref={trackRef}
                        className="flex gap-5 w-max will-change-transform"
                        style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.4s' }}
                    >
                        {doubled.map((a, i) => (
                            <AnnouncementCard key={i} a={a} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}