"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValueEvent,
} from "framer-motion";

const FRAME_COUNT = 186;

/* ─────────────────────── helpers ─────────────────────── */

function currentFrameSrc(index: number) {
    const num = (index + 1).toString().padStart(3, '0');
    return `/sequence/ezgif-frame-${num}.jpg`;
}

/* ─────────────────── Loading Screen ─────────────────── */

function LoadingScreen({ progress }: { progress: number }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
            {/* Spinner */}
            <div className="relative mb-10">
                <div className="h-16 w-16 rounded-full border-2 border-[#1a1a1a]" />
                <div
                    className="absolute inset-0 h-16 w-16 rounded-full border-2 border-transparent border-t-[#C9863A] animate-spin"
                    style={{ animationDuration: "1.2s" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#C9863A] animate-pulse" />
                </div>
            </div>

            {/* Brand */}
            <p className="mb-8 text-xs tracking-[0.4em] uppercase font-light">
                <span className="text-[#D4A373]/50">COCO</span>
                <span className="text-white/20 ml-1">Coffee</span>
            </p>

            {/* Progress bar */}
            <div className="w-56 h-[2px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        background:
                            "linear-gradient(90deg, #8B5E34 0%, #C9863A 50%, #D4A373 100%)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                />
            </div>

            {/* Percentage */}
            <p className="mt-4 text-sm tabular-nums text-white/40 font-light tracking-widest">
                {Math.round(progress)}%
            </p>
        </div>
    );
}

/* ──────────────── Scroll Indicator ────────────────── */

function ScrollIndicator({ opacity }: { opacity: number }) {
    return (
        <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20 pointer-events-none"
            style={{ opacity }}
        >
            <p className="text-[10px] tracking-[0.35em] uppercase text-white/40 font-light">
                Scroll to explore
            </p>
            <motion.div
                className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>
    );
}

/* ──────────── Storytelling Text Beats ─────────────── */

interface BeatProps {
    scrollProgress: ReturnType<typeof useSpring>;
    start: number;
    end: number;
    title: string;
    subtitle: string;
    align?: "center" | "left" | "right";
    cta?: boolean;
}

function TextBeat({
    scrollProgress,
    start,
    end,
    title,
    subtitle,
    align = "center",
    cta = false,
}: BeatProps) {
    const fadeRange = 0.1;
    const opacity = useTransform(
        scrollProgress,
        [start, start + fadeRange, end - fadeRange, end],
        [0, 1, 1, 0]
    );

    const y = useTransform(
        scrollProgress,
        [start, start + fadeRange, end - fadeRange, end],
        [20, 0, 0, -20]
    );

    const alignmentClass =
        align === "left"
            ? "items-start text-left pl-6 sm:pl-12 md:pl-20 lg:pl-32"
            : align === "right"
                ? "items-end text-right pr-6 sm:pr-12 md:pr-20 lg:pr-32"
                : "items-center text-center";

    return (
        <motion.div
            className={`absolute inset-0 flex flex-col justify-center ${alignmentClass} z-10 pointer-events-none px-6`}
            style={{ opacity, y }}
        >
            <h2
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter text-[#E8C9A0] leading-[0.9]"
                style={{
                    fontFeatureSettings: "'ss01' 1, 'ss03' 1",
                    textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0px 8px rgba(0,0,0,0.9)",
                }}
            >
                {title}
            </h2>
            <p
                className="mt-3 sm:mt-4 md:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-[#D4A373]/80 font-light max-w-lg tracking-wide"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9)" }}
            >
                {subtitle}
            </p>
            {cta && (
                <motion.a
                    href="#"
                    className="pointer-events-auto mt-6 sm:mt-8 md:mt-10 inline-block px-10 sm:px-12 py-3.5 sm:py-4 bg-[#6F4E37] text-white/90 text-xs sm:text-sm tracking-[0.3em] uppercase font-light rounded-full hover:bg-[#8B5E34] transition-all duration-500"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    Order Now
                </motion.a>
            )}
        </motion.div>
    );
}

/* ═══════════════ MAIN COMPONENT ═══════════════════ */

export default function MochaScrollSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const renderRef = useRef<number>(0);

    /* ---- scroll tracking ---- */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.0001,
    });

    /* ---- scroll indicator opacity ---- */
    const scrollIndicatorOpacity = useTransform(
        smoothProgress,
        [0, 0.08],
        [1, 0]
    );

    const [indicatorOpacity, setIndicatorOpacity] = useState(1);
    useMotionValueEvent(scrollIndicatorOpacity, "change", (v) =>
        setIndicatorOpacity(v)
    );

    /* ---- preload images ---- */
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        const onLoad = () => {
            loadedCount++;
            setLoadProgress((loadedCount / FRAME_COUNT) * 100);
            if (loadedCount === FRAME_COUNT) {
                imagesRef.current = images;
                setLoading(false);
            }
        };

        for (let i = 0; i < FRAME_COUNT; i++) {
            const img = new Image();
            img.src = currentFrameSrc(i);
            img.onload = onLoad;
            img.onerror = onLoad; // still count errors to avoid hang
            images[i] = img;
        }
    }, []);

    /* ---- canvas rendering ---- */
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const img = imagesRef.current[frameIndex];
        if (!img || !img.complete || !img.naturalWidth) return;

        // Set canvas size to viewport
        const dpr = window.devicePixelRatio || 1;
        const w = window.innerWidth;
        const h = window.innerHeight;

        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
        }

        // Clear & fill background for seamless edge blending
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#050505";
        ctx.fillRect(0, 0, w, h);

        // "Contain" fit logic
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const screenRatio = w / h;

        let drawW: number, drawH: number, drawX: number, drawY: number;
        if (imgRatio > screenRatio) {
            drawW = w;
            drawH = w / imgRatio;
            drawX = 0;
            drawY = (h - drawH) / 2;
        } else {
            drawH = h;
            drawW = h * imgRatio;
            drawX = (w - drawW) / 2;
            drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // Cover watermark in bottom-right corner with gradient
        const wmW = drawW * 0.12;
        const wmH = drawH * 0.08;
        const wmX = drawX + drawW - wmW;
        const wmY = drawY + drawH - wmH;
        const grad = ctx.createRadialGradient(
            wmX + wmW * 0.5, wmY + wmH * 0.5, 0,
            wmX + wmW * 0.5, wmY + wmH * 0.5, Math.max(wmW, wmH)
        );
        grad.addColorStop(0, "#050505");
        grad.addColorStop(0.7, "#050505");
        grad.addColorStop(1, "rgba(5,5,5,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(wmX - wmW * 0.3, wmY - wmH * 0.3, wmW * 1.6, wmH * 1.6);
    }, []);

    /* ---- subscribe to scroll changes ---- */
    useMotionValueEvent(smoothProgress, "change", (v) => {
        if (loading) return;
        const index = Math.min(
            FRAME_COUNT - 1,
            Math.max(0, Math.floor(v * (FRAME_COUNT - 1)))
        );

        if (renderRef.current !== index) {
            renderRef.current = index;
            requestAnimationFrame(() => drawFrame(index));
        }
    });

    /* ---- draw first frame when loaded ---- */
    useEffect(() => {
        if (!loading) {
            drawFrame(0);
        }
    }, [loading, drawFrame]);

    /* ---- handle resize ---- */
    useEffect(() => {
        if (loading) return;

        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    // Reset scale before redraw
                    const dpr = window.devicePixelRatio || 1;
                    canvas.width = window.innerWidth * dpr;
                    canvas.height = window.innerHeight * dpr;
                    canvas.style.width = `${window.innerWidth}px`;
                    canvas.style.height = `${window.innerHeight}px`;
                    ctx.scale(dpr, dpr);
                }
            }
            drawFrame(renderRef.current);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loading, drawFrame]);

    /* ──────────── RENDER ──────────── */
    return (
        <>
            {loading && <LoadingScreen progress={loadProgress} />}

            <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {/* Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ background: "#050505" }}
                    />

                    {/* Scroll indicator */}
                    {!loading && <ScrollIndicator opacity={indicatorOpacity} />}

                    {/* ─── BEAT A: 0–20% ─── */}
                    <TextBeat
                        scrollProgress={smoothProgress}
                        start={0.0}
                        end={0.2}
                        title="SIP THE DARK SIDE."
                        subtitle="Where espresso meets ice in a slow, seductive pour."
                        align="center"
                    />

                    {/* ─── BEAT B: 25–45% ─── */}
                    <TextBeat
                        scrollProgress={smoothProgress}
                        start={0.25}
                        end={0.45}
                        title="ICE MEETS CHAOS."
                        subtitle="Cubes crash. Cream swirls. Gravity takes a break."
                        align="left"
                    />

                    {/* ─── BEAT C: 50–70% ─── */}
                    <TextBeat
                        scrollProgress={smoothProgress}
                        start={0.5}
                        end={0.7}
                        title="BEAUTIFULLY UNHINGED."
                        subtitle="Every droplet frozen in its most dramatic moment."
                        align="right"
                    />

                    {/* ─── BEAT D: 75–95% ─── */}
                    <TextBeat
                        scrollProgress={smoothProgress}
                        start={0.75}
                        end={0.95}
                        title="YOUR MOVE."
                        subtitle="Cold-brewed obsession, delivered to your door."
                        align="center"
                        cta
                    />
                </div>
            </div>
        </>
    );
}
