'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Tag, Pizza } from 'lucide-react';

// ── Domino's brand tokens ──────────────────────────────────────────────
const D = {
    red:       '#E31837',   // Domino's primary red
    redDark:   '#B5112A',   // deeper red
    redLight:  '#FFF0F2',   // blush tint
    blue:      '#006491',   // Domino's navy blue
    blueDark:  '#004D70',
    blueLight: '#E6F3F8',
    white:     '#FFFFFF',
    gray50:    '#F9FAFB',
    gray100:   '#F3F4F6',
    gray200:   '#E5E7EB',
    gray400:   '#9CA3AF',
    gray600:   '#4B5563',
    gray900:   '#111827',
};

const COUPON_CODE = 'WELCOME50';
const DISCOUNT    = '50% OFF';

type ShowCouponEvent = CustomEvent<{ email?: string }>;

export function WelcomeCouponModal() {
    const [isVisible, setIsVisible] = useState(false);
    const [isCopied,  setIsCopied]  = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const handleShow = (e: ShowCouponEvent) => {
            setUserEmail(e.detail?.email ?? '');
            setIsVisible(true);
        };
        window.addEventListener('showCouponModal', handleShow as EventListener);
        return () => window.removeEventListener('showCouponModal', handleShow as EventListener);
    }, []);

    // Auto-show after 5 s on first visit
    useEffect(() => {
        if (localStorage.getItem('coupon_shown')) return;
        const id = setTimeout(() => {
            setIsVisible(true);
            localStorage.setItem('coupon_shown', '1');
        }, 5000);
        return () => clearTimeout(id);
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsVisible(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isVisible]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(COUPON_CODE);
        } catch {
            const el = document.createElement('textarea');
            el.value = COUPON_CODE;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        }
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2500);
    }, []);

    const handleClose = useCallback(() => setIsVisible(false), []);

    return (
        <>
            <style>{`
                .dom-root    { font-family: var(--font-dm-sans, 'DM Sans', sans-serif); }
                .dom-display { font-family: var(--font-montserrat, 'Montserrat', sans-serif); }

                /* Diagonal stripe pattern — classic Domino's box vibe */
                .dom-stripes {
                    background-image: repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 8px,
                        rgba(255,255,255,0.06) 8px,
                        rgba(255,255,255,0.06) 16px
                    );
                }

                /* Dashed coupon border */
                .dom-coupon-border {
                    border: 2.5px dashed ${D.red}60;
                    background: ${D.redLight};
                }

                /* Shimmer on copy button */
                @keyframes dom-shimmer {
                    from { transform: translateX(-100%); }
                    to   { transform: translateX(200%); }
                }
                .dom-btn-shimmer::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                    animation: dom-shimmer 2s ease infinite;
                    border-radius: inherit;
                }

                /* Dotted divider */
                .dom-divider {
                    background-image: repeating-linear-gradient(
                        90deg,
                        ${D.gray200} 0px,
                        ${D.gray200} 6px,
                        transparent 6px,
                        transparent 12px
                    );
                    height: 1px;
                }

                /* Notch cutouts on coupon sides */
                .dom-notch-left,
                .dom-notch-right {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #F3F4F6;
                    z-index: 10;
                }
                .dom-notch-left  { left: -9px;  }
                .dom-notch-right { right: -9px; }

                /* Pizza spin on mount */
                @keyframes dom-spin-in {
                    from { transform: rotate(-30deg) scale(0.5); opacity: 0; }
                    to   { transform: rotate(0deg)   scale(1);   opacity: 1; }
                }
                .dom-pizza-in { animation: dom-spin-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.3s both; }

                /* Pulse on discount badge */
                @keyframes dom-badge-pulse {
                    0%,100% { box-shadow: 0 0 0 0 ${D.red}40; }
                    50%     { box-shadow: 0 0 0 10px transparent; }
                }
                .dom-badge-pulse { animation: dom-badge-pulse 2.5s ease infinite; }
            `}</style>

            <AnimatePresence>
                {isVisible && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
                            onClick={handleClose}
                            aria-hidden="true"
                        />

                        {/* Modal wrapper */}
                        <div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="dom-title"
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        >
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0, scale: 0.88, y: 24 }}
                                animate={{ opacity: 1, scale: 1,    y: 0  }}
                                exit={{   opacity: 0, scale: 0.90,  y: 16 }}
                                transition={{ type: 'spring', duration: 0.5, bounce: 0.25 }}
                                className="dom-root relative w-full max-w-[640px] overflow-hidden rounded-2xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.4)]"
                                onClick={e => e.stopPropagation()}
                            >
                                {/* ════════════════════════════════
                                    HORIZONTAL LAYOUT
                                    Left = red brand panel
                                    Right = coupon content
                                ════════════════════════════════ */}
                                <div className="flex flex-col sm:flex-row min-h-[320px]">

                                    {/* ── LEFT — Red brand panel ── */}
                                    <div
                                        className="dom-stripes relative flex flex-col items-center justify-center px-8 py-10 sm:w-[240px] sm:shrink-0"
                                        style={{ background: `linear-gradient(160deg, ${D.red} 0%, ${D.redDark} 100%)` }}
                                    >
                                        {/* Corner accent dots */}
                                        <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-white/20" />
                                        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-white/20" />
                                        <div className="absolute bottom-3 left-3 h-2 w-2 rounded-full bg-white/20" />
                                        <div className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-white/20" />

                                        {/* Blue ribbon accent — top-left */}
                                        <div
                                            className="absolute left-0 top-0 h-16 w-16"
                                            style={{
                                                background: `linear-gradient(135deg, ${D.blue} 50%, transparent 50%)`,
                                            }}
                                        />

                                        {/* Pizza icon */}
                                        <div className="dom-pizza-in mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                                            <Pizza className="h-12 w-12 text-white" strokeWidth={1.5} />
                                        </div>

                                        {/* Brand wordmark */}
                                        <p className="dom-display mb-1 text-[10px] font-semibold uppercase tracking-[3px] text-white/70">
                                            Domino&apos;s Pizza
                                        </p>
                                        <p className="dom-display text-center text-lg font-black leading-tight text-white">
                                            Welcome
                                            <br />
                                            Offer
                                        </p>

                                        {/* Vertical notch cutout — right side (desktop) */}
                                        <div className="dom-notch-right hidden sm:block" />
                                    </div>

                                    {/* ── RIGHT — Content ── */}
                                    <div className="relative flex flex-1 flex-col justify-between p-6 sm:p-8">

                                        {/* Close button */}
                                        <button
                                            onClick={handleClose}
                                            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-700 hover:scale-110"
                                            aria-label="Close"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                        {/* Heading */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y:  0 }}
                                            transition={{ delay: 0.25 }}
                                            className="mb-5 pr-8"
                                        >
                                            <p className="dom-display mb-1 text-[10px] font-bold uppercase tracking-[2.5px]"
                                               style={{ color: D.red }}>
                                                🎉 You&apos;re subscribed!
                                            </p>
                                            <h2
                                                id="dom-title"
                                                className="dom-display text-2xl font-black leading-tight"
                                                style={{ color: D.gray900 }}
                                            >
                                                Here&apos;s your exclusive
                                                <br />
                                                <span style={{ color: D.red }}>discount code.</span>
                                            </h2>
                                            {userEmail && (
                                                <p className="mt-1.5 text-xs font-medium" style={{ color: D.blue }}>
                                                    Sent to {userEmail}
                                                </p>
                                            )}
                                        </motion.div>

                                        {/* Discount + coupon block */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y:  0 }}
                                            transition={{ delay: 0.35 }}
                                        >
                                            {/* Discount pill */}
                                            <div className="dom-badge-pulse mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                                                 style={{ background: D.red }}>
                                                <span className="dom-display text-lg font-black text-white leading-none">
                                                    {DISCOUNT}
                                                </span>
                                                <span className="text-xs font-medium text-white/80">
                                                    your first order
                                                </span>
                                            </div>

                                            {/* Coupon code strip */}
                                            <div className="relative">
                                                {/* Left notch cutout */}
                                                <div className="dom-notch-left" />
                                                <div className="dom-notch-right" />

                                                <div className="dom-coupon-border flex items-center justify-between rounded-xl px-5 py-4">
                                                    <div>
                                                        <div className="mb-0.5 flex items-center gap-1.5">
                                                            <Tag className="h-3 w-3" style={{ color: D.red }} />
                                                            <span className="text-[10px] font-bold uppercase tracking-[2px]"
                                                                  style={{ color: D.red }}>
                                                                Coupon Code
                                                            </span>
                                                        </div>
                                                        <span
                                                            className="dom-display text-2xl font-black tracking-[5px]"
                                                            style={{ color: D.blue }}
                                                        >
                                                            {COUPON_CODE}
                                                        </span>
                                                    </div>

                                                    {/* Copy button */}
                                                    <button
                                                        onClick={handleCopy}
                                                        className="dom-btn-shimmer relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl text-white transition-all duration-200 hover:scale-110 active:scale-95"
                                                        style={{
                                                            background: isCopied
                                                                ? `linear-gradient(135deg, #16a34a, #15803d)`
                                                                : `linear-gradient(135deg, ${D.blue}, ${D.blueDark})`,
                                                            boxShadow: `0 4px 14px ${isCopied ? '#16a34a' : D.blue}50`,
                                                        }}
                                                        aria-label="Copy coupon code"
                                                    >
                                                        <AnimatePresence mode="wait">
                                                            {isCopied ? (
                                                                <motion.span key="check"
                                                                             initial={{ scale: 0, rotate: -90 }}
                                                                             animate={{ scale: 1, rotate: 0 }}
                                                                             exit={{ scale: 0 }}>
                                                                    <Check className="h-5 w-5" />
                                                                </motion.span>
                                                            ) : (
                                                                <motion.span key="copy"
                                                                             initial={{ scale: 0 }}
                                                                             animate={{ scale: 1 }}
                                                                             exit={{ scale: 0 }}>
                                                                    <Copy className="h-5 w-5" />
                                                                </motion.span>
                                                            )}
                                                        </AnimatePresence>
                                                    </button>
                                                </div>
                                            </div>

                                            <AnimatePresence>
                                                {isCopied && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -4 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0 }}
                                                        className="mt-2 text-xs font-semibold text-green-600"
                                                    >
                                                        ✓ Copied! Paste it at checkout.
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>

                                        {/* Terms */}
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="mt-5 text-[11px] leading-relaxed"
                                            style={{ color: D.gray400 }}
                                        >
                                            *First-time customers only. Minimum order ৳500.
                                            Cannot be combined with other offers.
                                        </motion.p>
                                    </div>
                                </div>

                                {/* ── Bottom red strip ── */}
                                <div
                                    className="dom-stripes flex items-center justify-center gap-3 py-2.5"
                                    style={{ background: D.blue }}
                                >

                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}