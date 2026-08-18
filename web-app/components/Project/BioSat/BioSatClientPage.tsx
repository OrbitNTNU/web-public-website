"use client";

/**
 * BioSat — single-file project page for orbitntnu.com
 * ---------------------------------------------------------------------------
 * No Sanity. No scroll-snap. Free-scrolling editorial layout.
 * Images are NASA public-domain placeholders (swap any that 404 in IMG below).
 *
 * Bold direction, built entirely from your existing tokens
 * (charcoal / biosat-green / biosat-dark-green, Poppins expanded-light):
 *   - Hero wordmark: "BioSat" with the Earth photo clipped inside the letters.
 *   - Giant hollow outline numerals as a recurring structural signature.
 *   - Operations inverts to a deep-green panel so the point-cloud plant glows.
 *   - A kinetic marquee band; monumental scale contrast on the launch counter.
 *
 * Relies on globals.css for the color tokens, Poppins, and the
 * .biosat-fade / .biosat-swap / .biosat-carousel helpers. It NO LONGER uses
 * .biosat-snap or .biosat-section — snap is gone.
 *
 * next.config — allow the NASA host for next/image:
 *   images: { remotePatterns: [{ protocol: "https", hostname: "images-assets.nasa.gov" }] }
 */

import Image from "next/image";
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";

/* ═══ IMAGES · NASA public domain ═══ */
const IMG = {
    blueMarble:
        "https://images-assets.nasa.gov/image/as17-148-22727/as17-148-22727~large.jpg",
    earthrise:
        "https://images-assets.nasa.gov/image/as08-14-2383/as08-14-2383~large.jpg",
    aldrinMoon:
        "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~large.jpg",
    aldrinVisor:
        "https://images-assets.nasa.gov/image/as11-40-5903/as11-40-5903~large.jpg",
} as const;

/* ═══ DATA ═══ */
const SECTIONS = [
    { index: "01", label: "Mission" },
    { index: "02", label: "Operations" },
    { index: "03", label: "Team" },
    { index: "04", label: "Specifications" },
    { index: "05", label: "Timeline" },
    { index: "06", label: "Status" },
] as const;

const hero = {
    title: "BioSat",
    tagline: "Life, in low Earth orbit.",
    subtitle:
        "A student-built nanosatellite carrying the first plant seed beyond the atmosphere — watching life begin where it never has.",
    image: IMG.blueMarble,
    meta: [
        { label: "Form", value: "2U CubeSat" },
        { label: "Orbit", value: "550 km SSO" },
        { label: "Launch", value: "Q4 2027" },
    ],
};

const marqueeWords = [
    "Biology beyond the atmosphere",
    "First seed in orbit",
    "550 km · sun-synchronous",
    "Built by students",
];

const phases = [
    {
        title: "Commissioning",
        body: "Establish contact with BioSat. Deploy the solar panels and bring the platform to a stable, power-positive state.",
    },
    {
        title: "Bio phase",
        body: "Trigger seed germination inside the BioBox. Growth lights, heaters and sensors come online, logging temperature, pressure, humidity, gas composition and growth.",
    },
    {
        title: "SDR phase",
        body: "Once the specimen completes its life cycle, the second payload takes over — monitoring noise across the UHF band.",
    },
    {
        title: "De-commissioning",
        body: "Controlled de-orbit and re-entry, closing the mission.",
    },
];

const teamIntro = {
    title: "Carried across generations",
    body: "BioSat has passed through the hands of many project managers — each inheriting a growing mission and handing it on. The team spans mechanical, electrical and software, all pointed at a single launch window.",
};
const pmCards = [
    { name: "Ada Nordvik", image: IMG.blueMarble, start: "2021-08-01", end: "2022-07-31" },
    { name: "Jonas Feld", image: IMG.earthrise, start: "2022-08-01", end: "2023-07-31" },
    { name: "Mira Solheim", image: IMG.aldrinVisor, start: "2023-08-01", end: "2024-07-31" },
    { name: "Kai Berg", image: IMG.aldrinMoon, start: "2024-08-01", end: null as string | null },
];

const specs = [
    { label: "Form factor", value: "2U CubeSat" },
    { label: "Mass", value: "2.4 kg" },
    { label: "Dimensions", value: "100 × 100 × 227 mm" },
    { label: "Orbit", value: "550 km SSO" },
    { label: "Inclination", value: "97.6°" },
    { label: "Design life", value: "12 months" },
    { label: "Payload", value: "BioBox + SDR" },
    { label: "Power", value: "8.6 W avg" },
    { label: "Battery", value: "40 Wh Li-ion" },
    { label: "Comms band", value: "UHF / S-band" },
    { label: "Downlink", value: "9.6 kbps" },
    { label: "ADCS", value: "3-axis stabilised" },
];

const timelineSub = "From concept to orbit.";
const milestones = [
    { key: "t1", title: "Concept review", image: IMG.blueMarble, caption: "2023" },
    { key: "t2", title: "Payload design", image: IMG.earthrise, caption: "2024" },
    { key: "t3", title: "Integration", image: IMG.aldrinMoon, caption: "2025" },
    { key: "t4", title: "Environmental testing", image: IMG.aldrinVisor, caption: "2026" },
    { key: "t5", title: "Delivery", image: IMG.blueMarble, caption: "2027" },
    { key: "t6", title: "Launch", image: IMG.earthrise, caption: "Q4 2027" },
];

// Targeted launch — within Q4 2027. Swap for the confirmed date/time.
const launchDate = "2027-11-15T00:00:00Z";

/* ═══ SHARED ═══ */
const PAD_X = "px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40";

// Giant hollow outline numeral — the recurring structural signature.
function GhostNumeral({
                          n,
                          className = "",
                          stroke = "rgba(174,174,174,0.13)",
                      }: {
    n: string;
    className?: string;
    stroke?: string;
}) {
    const style: CSSProperties = {
        color: "transparent",
        WebkitTextStroke: `1px ${stroke}`,
        fontSize: "clamp(9rem, 32vw, 30rem)",
    };
    return (
        <span
            aria-hidden
            className={`pointer-events-none select-none absolute font-light leading-none tabular-nums z-0 ${className}`}
            style={style}
        >
            {n}
        </span>
    );
}

/* ═══ RotatingPlant · point-cloud (engine unchanged) ═══ */
const PERSPECTIVE = 5;
type Pt = { x: number; y: number; z: number };
function generateSucculent(): Float32Array {
    const points: Pt[] = [];
    const leavesPerLayer = [6, 8, 10, 12, 14, 16];
    for (let layer = 0; layer < 6; layer++) {
        const radius = 0.25 + layer * 0.18;
        const height = layer * 0.08;
        const leafCount = leavesPerLayer[layer];
        for (let i = 0; i < leafCount; i++) {
            const baseAngle = (i / leafCount) * Math.PI * 2;
            for (let u = 0; u <= 16; u++) {
                const fu = u / 16;
                for (let v = 0; v <= 6; v++) {
                    const fv = v / 6;
                    const leafLength = 0.55 - layer * 0.04;
                    const leafWidth = 0.18 - layer * 0.01;
                    const curve = Math.sin(fu * Math.PI);
                    const localX = (fv - 0.5) * leafWidth * curve;
                    const localY = fu * leafLength;
                    const localZ = Math.sin((fv - 0.5) * Math.PI) * 0.06 * curve;
                    const tilt = -0.8 + layer * 0.15;
                    const yTilt = localY * Math.cos(tilt) - localZ * Math.sin(tilt);
                    const zTilt = localY * Math.sin(tilt) + localZ * Math.cos(tilt);
                    const xRot = localX * Math.cos(baseAngle) - zTilt * Math.sin(baseAngle);
                    const zRot = localX * Math.sin(baseAngle) + zTilt * Math.cos(baseAngle);
                    points.push({
                        x: xRot + Math.cos(baseAngle) * radius,
                        y: yTilt + height - 0.6,
                        z: zRot + Math.sin(baseAngle) * radius,
                    });
                }
            }
        }
    }
    const packed = new Float32Array(points.length * 3);
    for (let i = 0; i < points.length; i++) {
        packed[i * 3] = points[i].x;
        packed[i * 3 + 1] = points[i].y;
        packed[i * 3 + 2] = points[i].z;
    }
    return packed;
}
const packedPoints = generateSucculent();

const RotatingPlant = memo(function RotatingPlant({ speed = 0.4 }: { speed?: number }) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const colorRef = useRef("#3fca3f");
    const visibleRef = useRef(false);
    const state = useRef({ rotY: 0, rotX: -0.4, last: 0, cx: 0, cy: 0, scale: 0 });

    const resize = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        canvas.width = Math.max(1, w * dpr);
        canvas.height = Math.max(1, h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        state.current.cx = w / 2;
        state.current.cy = h / 2;
        state.current.scale = Math.min(w, h) * 0.34;
    }, []);

    const draw = useCallback(
        (t: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const s = state.current;
            if (!s.last) s.last = t;
            const dt = Math.min((t - s.last) / 1000, 0.05);
            s.last = t;
            s.rotY += speed * dt;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const cosY = Math.cos(s.rotY);
            const sinY = Math.sin(s.rotY);
            const cosX = Math.cos(s.rotX);
            const sinX = Math.sin(s.rotX);
            ctx.beginPath();
            for (let i = 0; i < packedPoints.length; i += 3) {
                const x = packedPoints[i];
                const y = packedPoints[i + 1];
                const z = packedPoints[i + 2];
                const x1 = x * cosY - z * sinY;
                const z1 = x * sinY + z * cosY;
                const y1 = y * cosX - z1 * sinX;
                const z2 = y * sinX + z1 * cosX;
                const p = PERSPECTIVE / (PERSPECTIVE + z2);
                const sx = s.cx + x1 * s.scale * p;
                const sy = s.cy - y1 * s.scale * p;
                ctx.moveTo(sx + 1, sy);
                ctx.arc(sx, sy, Math.max(0.8, 1.5 * p), 0, Math.PI * 2);
            }
            ctx.fillStyle = colorRef.current;
            ctx.fill();
            rafRef.current = visibleRef.current ? requestAnimationFrame(draw) : null;
        },
        [speed]
    );

    useEffect(() => {
        colorRef.current =
            getComputedStyle(document.documentElement).getPropertyValue("--color-biosat-green").trim() ||
            "#3fca3f";
        resize();
        window.addEventListener("resize", resize);
        const canvas = canvasRef.current;
        let observer: IntersectionObserver | null = null;
        if (canvas && "IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    visibleRef.current = entries[0].isIntersecting;
                    if (entries[0].isIntersecting && rafRef.current == null) {
                        state.current.last = 0;
                        rafRef.current = requestAnimationFrame(draw);
                    }
                },
                { threshold: 0.05 }
            );
            observer.observe(canvas);
        } else {
            visibleRef.current = true;
            rafRef.current = requestAnimationFrame(draw);
        }
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", resize);
            observer?.disconnect();
        };
    }, [draw, resize]);

    return <canvas ref={canvasRef} className="block w-full h-full" aria-hidden />;
});
RotatingPlant.displayName = "RotatingPlant";

/* ═══ 01 · HERO — Earth clipped inside the wordmark ═══ */
const Hero = memo(function Hero() {
    const clip: CSSProperties = {
        backgroundImage: `url(${hero.image})`,
        backgroundSize: "120% auto",
        backgroundPosition: "center 40%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: "1px rgba(245,245,245,0.16)",
        fontSize: "clamp(4.5rem, 20vw, 24rem)",
    };
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-charcoal">
            {/* top bar */}
            <div className={`absolute top-10 md:top-14 lg:top-16 left-0 right-0 z-20 ${PAD_X} flex items-center justify-end`}>
                <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.3em] uppercase text-charcoal-light">
                    <span className="h-1.5 w-1.5 rounded-full bg-biosat-green animate-pulse" />
                    Launching Q4 2027
                </span>
            </div>

            <div className={`${PAD_X} w-full`}>
                <p className="text-charcoal-light tracking-[0.3em] uppercase text-xs md:text-sm mb-4 md:mb-6">
                    {hero.tagline}
                </p>
                <h1 aria-label={hero.title} className="font-light leading-[0.82] tracking-[-0.02em]" style={clip}>
                    {hero.title}
                </h1>
                <div className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                    <p className="text-charcoal-light font-light max-w-md text-base md:text-lg leading-relaxed">
                        {hero.subtitle}
                    </p>
                    <div className="flex gap-10 md:gap-14">
                        {hero.meta.map((m) => (
                            <div key={m.label} className="flex flex-col gap-2">
                                <span className="text-[10px] tracking-[0.28em] uppercase text-charcoal-light/60">
                                    {m.label}
                                </span>
                                <span className="text-cloud-white font-light">{m.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-6 sm:left-10 md:left-16 lg:left-24 xl:left-40 flex items-center gap-3 z-20">
            </div>
        </div>
    );
});
Hero.displayName = "Hero";

/* ═══ MARQUEE BAND ═══ */
const Marquee = memo(function Marquee() {
    const strip = [...marqueeWords, ...marqueeWords];
    return (
        <div className="relative w-full overflow-hidden border-y border-charcoal-light/12 py-6 md:py-8">
            <div className="biosat2-marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
                {strip.map((w, i) => (
                    <span key={i} className="flex items-center">
                        <span className="text-cloud-white/90 font-light tracking-[0.05em] text-2xl md:text-4xl px-6 md:px-10">
                            {w}
                        </span>
                        <span className="text-biosat-green text-xl md:text-3xl">◦</span>
                    </span>
                ))}
            </div>
        </div>
    );
});
Marquee.displayName = "Marquee";

/* ═══ 02 · OPERATIONS — inverted deep-green panel ═══ */
const Operations = memo(function Operations() {
    return (
        <div
            className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}
            style={{ backgroundColor: "var(--color-biosat-dark-green)" }}
        >
            <GhostNumeral n="02" className="-right-8 bottom-0" stroke="rgba(148,202,148,0.16)" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-14 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-10 lg:mb-14">
                        Four phases,<br />one life cycle.
                    </h2>
                    <ol className="flex flex-col">
                        {phases.map((phase, i) => (
                            <li
                                key={phase.title}
                                className="grid grid-cols-[auto_1fr] gap-6 py-5 border-t border-biosat-light-green/20 last:border-b"
                            >
                                <span className="text-biosat-green text-xs tracking-[0.2em] tabular-nums pt-1">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="max-w-xl">
                                    <p className="text-cloud-white mb-1.5">{phase.title}</p>
                                    <p className="text-biosat-light-green/80 leading-relaxed">{phase.body}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="order-1 lg:order-2 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-h-[48vh] lg:max-h-[64vh]">
                        <RotatingPlant speed={0.4} />
                    </div>
                </div>
            </div>
        </div>
    );
});
Operations.displayName = "Operations";

/* ═══ 03 · TEAM — staggered broken grid ═══ */
const dateFmt = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" });
const toDate = (v?: string | null) => {
    if (!v) return null;
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? null : d;
};
const period = (start: string, end?: string | null) => {
    const s = toDate(start);
    const e = toDate(end);
    return `${s ? dateFmt.format(s) : ""} — ${e ? dateFmt.format(e) : "Present"}`;
};
const STAGGER = ["lg:mt-20", "lg:mt-6", "lg:mt-24", "lg:mt-0"];

const Team = memo(function Team() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="03" className="-left-6 top-1/4" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <div className="max-w-2xl mb-14 lg:mb-20">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                        {teamIntro.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed max-w-xl">{teamIntro.body}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-8 items-start">
                    {pmCards.map((pm, i) => {
                        const current = !pm.end;
                        return (
                            <figure key={pm.name} className={`group flex flex-col ${STAGGER[i] ?? ""}`}>
                                <div
                                    className={`relative w-full overflow-hidden ${
                                        current ? "aspect-[3/4] ring-1 ring-biosat-green/60" : "aspect-[3/4] ring-1 ring-charcoal-light/10"
                                    }`}
                                >
                                    <Image
                                        src={pm.image}
                                        alt={pm.name}
                                        fill
                                        sizes="(min-width:768px) 22vw, 45vw"
                                        loading="lazy"
                                        className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                                            current ? "" : "grayscale-[0.4]"
                                        }`}
                                    />
                                    {current && (
                                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-biosat-green" />
                                            <span className="text-[9px] tracking-[0.3em] uppercase text-biosat-green">Current</span>
                                        </span>
                                    )}
                                </div>
                                <figcaption className="mt-3">
                                    <p className="text-cloud-white font-light">{pm.name}</p>
                                    <p className="text-charcoal-light/80 text-xs mt-1 tracking-wide">
                                        {period(pm.start, pm.end)}
                                    </p>
                                </figcaption>
                            </figure>
                        );
                    })}
                </div>
            </div>
        </div>
    );
});
Team.displayName = "Team";

/* ═══ 04 · SPECIFICATIONS — oversized values ═══ */
const Specifications = memo(function Specifications() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="04" className="-right-6 top-10" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-10 lg:mb-14 max-w-2xl">
                    Small platform,<br />serious hardware.
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-14 border-t border-charcoal-light/20">
                    {specs.map((s) => (
                        <div
                            key={s.label}
                            className="group flex flex-col py-5 md:py-6 border-b border-charcoal-light/12"
                        >
                            <span className="text-[10px] tracking-[0.24em] uppercase text-charcoal-light/60 mb-2">
                                {s.label}
                            </span>
                            <span className="font-light text-cloud-white text-lg md:text-xl lg:text-2xl group-hover:text-biosat-green transition-colors duration-300">
                                {s.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
Specifications.displayName = "Specifications";

/* ═══ 05 · TIMELINE — arc deck (interaction preserved) ═══ */
const VISIBLE_OFFSET = 3;
const DRAG_STEP = 140;
const FLICK_VELOCITY = 0.5;
const COMMIT_TRANSITION = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const styleForOffset = (offset: number) => {
    const abs = Math.abs(offset);
    const sign = offset === 0 ? 0 : offset / abs;
    const c = Math.min(abs, VISIBLE_OFFSET + 1);
    return {
        x: sign * c * 224,
        y: c * 34,
        rotate: sign * c * 7,
        scale: Math.max(0.52, 1 - c * 0.13),
        opacity: c > VISIBLE_OFFSET ? 0 : Math.max(0, 1 - c * 0.2),
        zIndex: 40 - Math.floor(c),
    };
};

const Timeline = memo(function Timeline() {
    const items = milestones;
    const [focused, setFocused] = useState(0);
    const focusedRef = useRef(0);
    const arcRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const dragRef = useRef({
        active: false, pointerId: -1, startX: 0, lastX: 0, startT: 0, lastT: 0, focusedAtStart: 0, moved: false,
    });

    const writeCard = useCallback((i: number, off: number, transitionOn: boolean) => {
        const el = cardRefs.current[i];
        if (!el) return;
        const s = styleForOffset(off);
        el.style.transform = `translate3d(calc(-50% + ${s.x}px), ${s.y}px, 0) rotate(${s.rotate}deg) scale(${s.scale})`;
        el.style.opacity = String(s.opacity);
        el.style.zIndex = String(s.zIndex);
        el.style.transition = transitionOn ? COMMIT_TRANSITION : "none";
        el.style.pointerEvents = Math.abs(off) > VISIBLE_OFFSET ? "none" : "auto";
    }, []);

    const applyCommitted = useCallback(
        (transitionOn: boolean) => {
            for (let i = 0; i < items.length; i++) writeCard(i, i - focusedRef.current, transitionOn);
        },
        [writeCard, items.length]
    );

    useLayoutEffect(() => {
        focusedRef.current = focused;
        if (dragRef.current.active) return;
        applyCommitted(true);
    }, [focused, applyCommitted]);

    const onPointerDown = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            const d = dragRef.current;
            d.active = true;
            d.pointerId = e.pointerId;
            d.startX = e.clientX;
            d.lastX = e.clientX;
            const now = performance.now();
            d.startT = now;
            d.lastT = now;
            d.focusedAtStart = focusedRef.current;
            d.moved = false;
            (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
            for (let i = 0; i < items.length; i++) {
                const el = cardRefs.current[i];
                if (el) el.style.transition = "none";
            }
        },
        [items.length]
    );

    const onPointerMove = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            const d = dragRef.current;
            if (!d.active || d.pointerId !== e.pointerId) return;
            const dx = e.clientX - d.startX;
            d.lastX = e.clientX;
            d.lastT = performance.now();
            if (Math.abs(dx) > 4) d.moved = true;
            const rawFrac = d.focusedAtStart - dx / DRAG_STEP;
            const maxIdx = items.length - 1;
            let frac = rawFrac;
            if (frac < 0) frac = rawFrac * 0.35;
            if (frac > maxIdx) frac = maxIdx + (rawFrac - maxIdx) * 0.35;
            for (let i = 0; i < items.length; i++) writeCard(i, i - frac, false);
            const live = clamp(Math.round(frac), 0, maxIdx);
            if (live !== focusedRef.current) {
                focusedRef.current = live;
                setFocused(live);
            }
        },
        [writeCard, items.length]
    );

    const finishDrag = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            const d = dragRef.current;
            if (!d.active || d.pointerId !== e.pointerId) return;
            d.active = false;
            d.pointerId = -1;
            const dx = d.lastX - d.startX;
            const dt = Math.max(1, d.lastT - d.startT);
            const velocity = dx / dt;
            const maxIdx = items.length - 1;
            let target = clamp(Math.round(d.focusedAtStart - dx / DRAG_STEP), 0, maxIdx);
            if (Math.abs(velocity) >= FLICK_VELOCITY && Math.abs(dx) < DRAG_STEP) {
                target = clamp(d.focusedAtStart - Math.sign(velocity), 0, maxIdx);
            }
            focusedRef.current = target;
            if (target !== focused) setFocused(target);
            else applyCommitted(true);
        },
        [focused, applyCommitted, items.length]
    );

    const onPointerCancel = useCallback(
        (e: ReactPointerEvent<HTMLDivElement>) => {
            const d = dragRef.current;
            if (!d.active || d.pointerId !== e.pointerId) return;
            d.active = false;
            d.pointerId = -1;
            applyCommitted(true);
        },
        [applyCommitted]
    );

    const onClickCapture = useCallback((e: ReactMouseEvent) => {
        if (dragRef.current.moved) {
            e.preventDefault();
            e.stopPropagation();
            dragRef.current.moved = false;
        }
    }, []);

    useEffect(() => {
        const el = arcRef.current;
        if (!el) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") setFocused((f) => Math.max(0, f - 1));
            else if (e.key === "ArrowRight") setFocused((f) => Math.min(items.length - 1, f + 1));
        };
        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, [items.length]);

    const setCardRef = useCallback((idx: number) => (node: HTMLButtonElement | null) => {
        cardRefs.current[idx] = node;
    }, []);

    const active = items[focused];
    if (!active) return null;

    return (
        <div className={`relative w-full min-h-screen flex flex-col overflow-hidden ${PAD_X} pt-28 md:pt-32 pb-16 biosat-carousel`}>
            <GhostNumeral n="05" className="-left-6 bottom-6" />

            <div className="relative z-20 text-center min-h-[112px] mt-6">
                <div key={`${focused}-${active.title}`} className="biosat-swap">
                    <h2 className="font-light text-cloud-white text-3xl md:text-5xl lg:text-6xl">{active.title}</h2>
                    {active.caption && (
                        <p className="mt-2 text-[11px] tracking-[0.35em] uppercase text-charcoal-light/70">{active.caption}</p>
                    )}
                    {focused === 0 && <p className="mt-1 text-charcoal-light">{timelineSub}</p>}
                </div>
            </div>

            <div
                ref={arcRef}
                tabIndex={0}
                role="region"
                aria-label="Mission timeline"
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={onPointerCancel}
                onClickCapture={onClickCapture}
                className="relative z-10 flex-1 flex justify-center items-start min-h-0 mt-8 cursor-grab active:cursor-grabbing focus:outline-none"
            >
                <div className="relative w-full h-full flex justify-center">
                    {items.map((item, idx) => {
                        const offset = idx - focused;
                        if (Math.abs(offset) > VISIBLE_OFFSET) return null;
                        const isFocused = offset === 0;
                        return (
                            <button
                                key={item.key}
                                ref={setCardRef(idx)}
                                type="button"
                                draggable={false}
                                onClick={() => {
                                    if (dragRef.current.moved) return;
                                    setFocused(idx);
                                }}
                                aria-label={`Show ${item.title}`}
                                className={`absolute top-0 left-1/2 w-[230px] h-[290px] sm:w-[270px] sm:h-[330px] md:w-[310px] md:h-[390px] lg:w-[350px] lg:h-[450px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-biosat-green will-change-transform ${
                                    isFocused ? "ring-1 ring-biosat-green/40" : "ring-1 ring-charcoal-light/10"
                                }`}
                            >
                                <div className="relative w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        sizes="(min-width:1024px) 350px, (min-width:768px) 310px, 270px"
                                        loading={Math.abs(offset) <= 1 ? "eager" : "lazy"}
                                        draggable={false}
                                        className={`object-cover transition-[filter] duration-500 ${
                                            isFocused ? "" : "brightness-[0.55] grayscale-[0.3]"
                                        }`}
                                    />
                                    {!isFocused && <div className="absolute inset-0 bg-charcoal/20" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-7 mt-2">
                {/* granular ticks */}
                <div className="flex items-center gap-2">
                    {items.map((item, idx) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => setFocused(idx)}
                            aria-label={`Go to ${item.title}`}
                            className={`h-px transition-all duration-300 ${
                                idx === focused ? "bg-biosat-green w-10" : "bg-charcoal-light/30 w-5 hover:bg-charcoal-light/60"
                            }`}
                        />
                    ))}
                </div>

                {/* bold prev / index / next */}
                <div className="flex items-center gap-8 md:gap-12">
                    <button
                        type="button"
                        onClick={() => setFocused((f) => Math.max(0, f - 1))}
                        disabled={focused === 0}
                        aria-label="Previous milestone"
                        className="group flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-charcoal-light/30 text-cloud-white transition-all duration-300 hover:border-biosat-green hover:bg-biosat-green hover:text-charcoal hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cloud-white disabled:hover:scale-100 disabled:hover:border-charcoal-light/30"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 md:h-9 md:w-9 transition-transform duration-300 group-hover:-translate-x-0.5">
                            <path d="M15 5l-7 7 7 7" />
                        </svg>
                    </button>

                    <span key={`idx-${focused}`} className="biosat-swap font-light text-3xl md:text-5xl tabular-nums leading-none w-[4.5ch] text-center">
                        <span className="text-biosat-green">{String(focused + 1).padStart(2, "0")}</span>
                        <span className="text-charcoal-light/40"> / {String(items.length).padStart(2, "0")}</span>
                    </span>

                    <button
                        type="button"
                        onClick={() => setFocused((f) => Math.min(items.length - 1, f + 1))}
                        disabled={focused === items.length - 1}
                        aria-label="Next milestone"
                        className="group flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border border-charcoal-light/30 text-cloud-white transition-all duration-300 hover:border-biosat-green hover:bg-biosat-green hover:text-charcoal hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cloud-white disabled:hover:scale-100 disabled:hover:border-charcoal-light/30"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7 md:h-9 md:w-9 transition-transform duration-300 group-hover:translate-x-0.5">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});
Timeline.displayName = "Timeline";

/* ═══ 06 · STATUS — monumental counter ═══ */
type Parts = { days: number; hours: number; minutes: number; seconds: number };
const diff = (from: Date, to: Date): Parts => {
    const ms = Math.max(0, to.getTime() - from.getTime());
    const s = Math.floor(ms / 1000);
    return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
};

const Status = memo(function Status() {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [parts, setParts] = useState<Parts>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const d = new Date(launchDate);
        setMounted(true);
        setParts(diff(new Date(), d));
        const el = rootRef.current;
        let intervalId: number | null = null;
        const start = () => {
            if (intervalId != null) return;
            intervalId = window.setInterval(() => setParts(diff(new Date(), d)), 1000);
        };
        const stop = () => {
            if (intervalId != null) {
                window.clearInterval(intervalId);
                intervalId = null;
            }
        };
        let observer: IntersectionObserver | null = null;
        if (el && "IntersectionObserver" in window) {
            observer = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        setParts(diff(new Date(), d));
                        start();
                    } else stop();
                },
                { threshold: 0.15 }
            );
            observer.observe(el);
        } else start();
        return () => {
            stop();
            observer?.disconnect();
        };
    }, []);

    const small: { label: string; value: number }[] = [
        { label: "Hrs", value: parts.hours },
        { label: "Min", value: parts.minutes },
        { label: "Sec", value: parts.seconds },
    ];

    return (
        <div ref={rootRef} className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28`}>
            <div className={`relative z-10 w-full max-w-[1600px] mx-auto flex flex-col items-center text-center transition-opacity duration-500 ${mounted ? "opacity-100" : "opacity-0"}`}>
                <span className="text-[11px] md:text-sm tracking-[0.6em] uppercase text-charcoal-light/70 mb-6 md:mb-10">
                    Until launch
                </span>

                {/* colossal DAYS */}
                <div className="flex items-start justify-center">
                    <span className="font-light tabular-nums leading-[0.8] text-cloud-white text-[clamp(6rem,26vw,26rem)]">
                        {parts.days}
                    </span>
                    <span className="mt-3 md:mt-6 ml-3 md:ml-5 text-[11px] md:text-sm tracking-[0.3em] uppercase text-biosat-green [writing-mode:vertical-rl]">
                        Days
                    </span>
                </div>

                {/* secondary HH · MM · SS */}
                <div className="mt-8 md:mt-12 flex items-start justify-center divide-x divide-charcoal-light/15">
                    {small.map((u) => (
                        <div key={u.label} className="flex flex-col items-center px-6 sm:px-10">
                            <span className="font-light tabular-nums leading-none text-cloud-white text-3xl sm:text-5xl">
                                {String(u.value).padStart(2, "0")}
                            </span>
                            <span className="mt-3 text-[10px] tracking-[0.3em] uppercase text-charcoal-light/70">{u.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-14 md:mt-20 flex items-center gap-4">
                    <span className="h-px w-8 bg-biosat-green/60" />
                    <span className="text-charcoal-light text-xs tracking-[0.3em] uppercase">
                        Targeted for launch · Q4 2027
                    </span>
                    <span className="h-px w-8 bg-biosat-green/60" />
                </div>
            </div>
        </div>
    );
});
Status.displayName = "Status";

/* ═══ SECTION INDEX NAV ═══ */
function SectionNav({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
    return (
        <nav
            aria-label="Sections"
            className="hidden lg:flex fixed right-8 xl:right-12 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 mix-blend-difference"
        >
            {SECTIONS.map((s, i) => {
                const on = i === active;
                return (
                    <button key={s.index} type="button" onClick={() => onSelect(i)} aria-current={on ? "true" : undefined} aria-label={s.label} className="group flex items-center gap-3">
                        <span className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${on ? "opacity-100 text-cloud-white" : "opacity-0 group-hover:opacity-100 text-charcoal-light"}`}>
                            {s.label}
                        </span>
                        <span className={`h-px transition-all duration-300 ${on ? "w-8 bg-biosat-green" : "w-4 bg-charcoal-light/40 group-hover:w-6"}`} />
                    </button>
                );
            })}
        </nav>
    );
}

/* ═══ PAGE ═══ */
export default function BioSatClientPage() {
    const rootRef = useRef<HTMLElement | null>(null);
    const [active, setActive] = useState(0);

    useEffect(() => {
        const root = rootRef.current;
        if (!root || !("IntersectionObserver" in window)) return;

        const revealIO = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        e.target.classList.add("biosat-in");
                        revealIO.unobserve(e.target);
                    }
                }
            },
            { threshold: 0.15 }
        );
        root.querySelectorAll<HTMLElement>(".biosat-fade").forEach((el) => revealIO.observe(el));

        const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-index]"));
        const activeIO = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        const i = Number((e.target as HTMLElement).dataset.index);
                        if (!Number.isNaN(i)) setActive(i);
                    }
                }
            },
            { threshold: 0.5 }
        );
        sections.forEach((s) => activeIO.observe(s));

        return () => {
            revealIO.disconnect();
            activeIO.disconnect();
        };
    }, []);

    const goTo = useCallback((i: number) => {
        document.getElementById(`biosat-section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    const screens = [<Hero key="h" />, <Operations key="o" />, <Team key="t" />, <Specifications key="s" />, <Timeline key="ti" />, <Status key="st" />];

    return (
        <main ref={rootRef} className="relative w-full">
            {/* self-contained motion: marquee + reduced-motion guard */}
            <style>{`
              @keyframes biosat2-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
              .biosat2-marquee-track { animation: biosat2-marquee 34s linear infinite; }
              @media (prefers-reduced-motion: reduce) {
                .biosat2-marquee-track { animation: none; }
                .animate-pulse { animation: none; }
              }
            `}</style>

            <SectionNav active={active} onSelect={goTo} />

            {screens.map((screen, i) => (
                <div key={i} id={`biosat-section-${i}`} data-index={i} className={i === 0 ? "" : "biosat-fade"}>
                    {screen}
                    {i === 0 && <Marquee />}
                </div>
            ))}
        </main>
    );
}