'use client';

import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Announcement } from '@/data/AnnouncementData';
import AnnouncementIcon from '@/app/global_component/Announcement_component/AnnouncementIcon';
import gsap from 'gsap';

export default function AnnouncementCard({ a }: { a: Announcement }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = cardRef.current!.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        gsap.to(glowRef.current, {
            '--gx': `${x}px`,
            '--gy': `${y}px`,
            duration: 0.3,
            ease: 'power2.out',
        } as gsap.TweenVars);
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouse}
            className="group relative flex-shrink-0 w-80 cursor-pointer select-none"
        >
            <div
                className="relative rounded-3xl overflow-hidden transition-all duration-500 ease-out group-hover:-translate-y-2"
                style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(0,86,163,0.10)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 24px rgba(0,86,163,0.08), 0 1px 4px rgba(0,0,0,0.04)',
                }}
            >
                {/* Mouse-follow radial glow */}
                <div
                    ref={glowRef}
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(180px circle at var(--gx,50%) var(--gy,50%), ${a.accentHex}22, transparent 70%)`,
                    } as React.CSSProperties}
                />

                {/* Top accent line */}
                <div
                    className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${a.accent} opacity-60 group-hover:opacity-100 transition-opacity`}
                />

                <div className="p-7">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-6">
                        <AnnouncementIcon type={a.icon} accentHex={a.accentHex} />
                        <span
                            className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                            style={{
                                background: `${a.accentHex}22`,
                                color: a.accentHex,
                                border: `1px solid ${a.accentHex}44`,
                            }}
                        >
                            {a.tags}
                        </span>
                    </div>

                    {/* Category */}
                    <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-2">
                        {a.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight tracking-tight">
                        {a.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-sm font-semibold mb-4" style={{ color: a.accentHex }}>
                        {a.subtitle}
                    </p>

                    {/* Divider */}
                    <div
                        className="w-full h-px mb-4 opacity-10 group-hover:opacity-20 transition-opacity"
                        style={{ background: 'linear-gradient(90deg, transparent, #0056A3, transparent)' }}
                    />

                    {/* Description */}
                    <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 min-h-[56px]">
                        {a.description}
                    </p>

                    {/* CTA */}
                    <div className="mt-6 flex items-center justify-between">
                        <span className="text-xs text-gray-400 tracking-wider uppercase font-medium">
                            Read more
                        </span>
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                            style={{
                                background: `${a.accentHex}22`,
                                border: `1px solid ${a.accentHex}44`,
                            }}
                        >
                            <ArrowUpRight className="w-4 h-4" style={{ color: a.accentHex }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}