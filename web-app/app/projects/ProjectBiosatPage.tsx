"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
    type MouseEvent as ReactMouseEvent,
    type PointerEvent as ReactPointerEvent,
} from "react";

/* ═══ IMAGES · local, in public/biosat (case-sensitive paths) ═══ */
const IMG = {
    titleBg: "/biosat/BioSat_Small.PNG",
    render: "/biosat/Biosat_render_deployed.png",
    patch: "/biosat/Biosat_render_patch.png",
    biobox: "/biosat/BioBox_Assembly_Overview.png",
    plant: "/biosat/Plant.png",
    small: "/biosat/BioSat_Small.PNG",
    freider: "/biosat/freider.jpg",
    maja: "/biosat/maja.jpg",
    filip: "/biosat/filip.jpg",
    obc: "/biosat/Obc.jpg",
    obc2: "/biosat/Obc2.jpg",
    sdr: "/biosat/SDR.jpeg",
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
    kicker: "Launching Q4 2027",
    subtitle:
        "A 3U CubeSat built by students at Orbit NTNU — first coaxing a plant to grow in orbit, then turning a radio on the sky to survey the amateur band.",
    image: IMG.titleBg,
    meta: [
        { label: "Class", value: "3U CubeSat" },
        { label: "Payload", value: "BioBox + SDR" },
        { label: "Launch", value: "Q4 2027" },
    ],
};

const marqueeWords = [
    "Arabidopsis thaliana in orbit",
    "A camera, 14–16 frames a day",
    "Listening to the amateur band",
    "Built by students · Orbit NTNU",
];

const statement =
    "If a seed can wake in orbit, life is far more portable than we ever assumed.";

const experiment = {
    title: "The experiment",
    lead: "BioSat's headline payload is biological. Seeds of Arabidopsis thaliana are germinated and grown inside a sealed chamber in orbit, photographed 14–16 times a day, until the plant dies or four weeks pass.",
    figures: [
        {
            src: IMG.biobox,
            alt: "The BioBox growth chamber",
            title: "The BioBox",
            caption:
                "A sealed, cylindrical aluminium container split in two: an electronics module — sensors, camera and PCB — and a payload module, where the seed sits in a petri dish.",
        },
        {
            src: IMG.plant,
            alt: "Hydroponic germination system",
            title: "Germinating in orbit",
            caption:
                "A hydroponic system — a bladder water tank, a peristaltic pump and fine tubing — controls exactly how much the seeds are hydrated, so growth can begin in space. Ground tests suggest the seeds shrug off freezing to about −8 °C, and that far-red light can hold germination back until the satellite is ready.",
        },
    ],
};

const payload = {
    title: "The second payload",
    lead: "When the plant phase ends, BioSat isn't finished. A software-defined radio wakes and surveys the amateur radio band — recording noise and interference to help optimise the link between satellites and the ground.",
    small: {
        src: IMG.sdr,
        alt: "Software-defined radio",
        title: "The SDR",
        caption: "The second payload: a software-defined radio with a NanoAvionics UHF antenna and an in-house RF front-end, talking to the on-board computer over USB-C.",
    },
    large: {
        src: IMG.render,
        alt: "BioSat with deployed solar panels",
        title: "Talking home on S-band",
        caption:
            "Real communication runs on a separate SatLab SRS-3 S-band radio, downlinking to Orbit NTNU's own ground station at NTNU Gløshaugen in Trondheim.",
    },
};

const obc = {
    title: "The On-Board computer",
    lead: "At the centre of BioSat sits the on-board computer — the core that talks to every other subsystem. It's a complex system designed end to end by Orbit NTNU, with a microcontroller doing the heavy processing that keeps the mission running.",
    figures: [
        {
            src: IMG.obc,
            alt: "BioSat on-board computer",
            title: "On-board computer",
            caption:
                "The OBC coordinates every subsystem — power, radios, sensors and the payload — and is designed in-house, board and software alike.",
        },
        {
            src: IMG.obc2,
            alt: "OBC printed circuit board",
            title: "In-house avionics",
            caption:
                "At its heart a microcontroller handles the main processing. Building it in-house means the team understands, and can fix, every layer of the stack.",
        },
    ],
};

const phases = [
    {
        title: "Commissioning",
        body: "After launch, deploy the solar panels, establish contact and bring the satellite to a stable, power-positive state.",
    },
    {
        title: "Plant phase",
        body: "Germinate Arabidopsis thaliana inside the BioBox and grow it in orbit, photographed 14–16 times a day. The phase ends when the plant dies, or after four weeks.",
    },
    {
        title: "SDR phase",
        body: "The software-defined radio surveys the amateur radio band, recording noise and interference — while the S-band radio handles communication with the ground.",
    },
    {
        title: "De-commissioning",
        body: "De-orbit and re-entry, closing the mission.",
    },
];

const teamIntro = {
    title: "Carried across generations",
    body: "BioSat has passed through the hands of many project managers — each inheriting a growing mission and handing it on. The team spans mechanical, electrical and software, all pointed at a single launch window.",
};
const pmCards = [
    { name: "Freider Fløan", image: IMG.freider, period: "Fall 2022 — Spring 2024", current: false },
    { name: "Maja Iuel", image: IMG.maja, period: "Spring 2024 — Spring 2026", current: false },
    { name: "Filip Österberg", image: IMG.filip, period: "Spring 2026 — Present", current: true },
];

const specs = [
    { label: "Platform", value: "3U CubeSat" },
    { label: "Main payload", value: "BioBox — plant" },
    { label: "Second payload", value: "SDR" },
    { label: "Specimen", value: "Arabidopsis thaliana" },
    { label: "Imaging", value: "14–16 / day" },
    { label: "Plant phase", value: "≤ 4 weeks" },
    { label: "Ground link", value: "S-band · SatLab SRS-3" },
    { label: "SDR band", value: "Amateur / UHF" },
    { label: "Reaction wheels", value: "4" },
    { label: "Sun sensors", value: "6 CSS + 1 FSS" },
    { label: "Magnetorquers", value: "3 coils" },
    { label: "On-board computer", value: "In-house" },
    { label: "Ground station", value: "NTNU Gløshaugen" },
    { label: "Team", value: "Orbit NTNU" },
];

const milestones = [
    {
        key: "t1",
        title: "Concept & design",
        caption: "2023",
        note: "Two payloads · one 3U platform",
        image: IMG.patch,
        body: "The mission takes shape: a 3U CubeSat that grows a plant in orbit, with a software-defined radio as a second payload.",
    },
    {
        key: "t2",
        title: "BioBox development",
        caption: "2024",
        note: "Sealed chamber · sensors + camera",
        image: IMG.biobox,
        body: "The heart of the payload — a sealed aluminium chamber with its own electronics, camera and a hydroponic system to germinate the seeds.",
    },
    {
        key: "t3",
        title: "FlatSat testing",
        caption: "2025",
        note: "The full satellite, laid out flat",
        image: IMG.small,
        body: "Before anything is bolted into a frame, the satellite is laid out flat so every board and connection can be tested and debugged.",
    },
    {
        key: "t4",
        title: "Environmental testing",
        caption: "2026",
        note: "Seeds freeze-tested to −8 °C",
        image: IMG.render,
        body: "Seeds and hardware are pushed through the conditions of space — including freezing trials the seeds survive down to about −8 °C.",
    },
    {
        key: "t5",
        title: "Integration",
        caption: "2027",
        note: "3U frame + Tuna Can battery",
        image: IMG.biobox,
        body: "Every subsystem — power, radios, ADCS and the BioBox — comes together inside the 3U frame, the Tuna Can battery pack extending its length.",
    },
    {
        key: "t6",
        title: "Launch",
        caption: "Q4 2027",
        note: "Downlink to NTNU Gløshaugen",
        image: IMG.render,
        body: "BioSat reaches orbit, deploys its solar panels and makes first contact with the ground station at NTNU Gløshaugen.",
    },
];

// Targeted launch — within Q4 2027. Swap for the confirmed date/time.
const launchDate = "2027-11-15T00:00:00Z";

/* ═══ SHARED ═══ */
const PAD_X = "px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40";
const EASE = [0.22, 1, 0.36, 1] as const;

// Scroll-reveal wrapper (framer-motion) — used across the page.
function Reveal({
                    children,
                    delay = 0,
                    y = 24,
                    className = "",
                }: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay }}
        >
            {children}
        </motion.div>
    );
}

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
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: "1px rgba(245,245,245,0.16)",
        fontSize: "clamp(4.5rem, 20vw, 24rem)",
    };
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-charcoal">
            <div className={`${PAD_X} w-full`}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
                    className="text-biosat-green tracking-[0.3em] uppercase text-sm md:text-base font-light mb-5 md:mb-7"
                >
                    {hero.kicker}
                </motion.p>
                <motion.h1
                    aria-label={hero.title}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
                    className="font-light leading-[0.82] tracking-[-0.02em]"
                    style={clip}
                >
                    {hero.title}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.3 }}
                    className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                >
                    <p className="text-charcoal-light font-light max-w-md text-base md:text-lg leading-relaxed">
                        {hero.subtitle}
                    </p>
                    <div className="flex gap-10 md:gap-14">
                        {hero.meta.map((m) => (
                            <div key={m.label} className="flex flex-col gap-2">
                                <span className="text-xs tracking-[0.22em] uppercase font-light text-charcoal-light">
                                    {m.label}
                                </span>
                                <span className="text-cloud-white font-light text-base md:text-lg">{m.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
});
Hero.displayName = "Hero";

/* ═══ MARQUEE BAND ═══ */
const Marquee = memo(function Marquee() {
    const strip = [...marqueeWords, ...marqueeWords];
    return (
        <div className="relative w-full overflow-hidden border-y border-charcoal-light/20 py-6 md:py-8">
            <div className="biosat2-marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
                {strip.map((w, i) => (
                    <span key={i} className="flex items-center">
                        <span className="text-cloud-white font-light tracking-[0.05em] text-2xl md:text-4xl px-6 md:px-10">
                            {w}
                        </span>
                        <span className="text-biosat-green text-2xl md:text-4xl">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
});
Marquee.displayName = "Marquee";

/* ═══ CONTENT · statement (text section) ═══ */
const Statement = memo(function Statement() {
    return (
        <section className="relative w-full py-32 md:py-48">
            <div className="max-w-5xl mx-auto px-6 md:px-12">
                <Reveal>
                    <p className="font-light text-cloud-white leading-[1.15] text-3xl md:text-5xl lg:text-6xl">
                        {statement}
                    </p>
                </Reveal>
            </div>
        </section>
    );
});
Statement.displayName = "Statement";

/* ═══ CONTENT · captioned figure (matches DoubleImages styling) ═══ */
function Figure({
                    src,
                    alt,
                    title,
                    caption,
                    aspect = "aspect-[9/6]",
                    delay = 0,
                    className = "",
                }: {
    src: string;
    alt: string;
    title?: string;
    caption?: string;
    aspect?: string;
    delay?: number;
    className?: string;
}) {
    return (
        <Reveal delay={delay} className={`relative ${className}`}>
            <div className="overflow-hidden">
                <div className={`relative w-full ${aspect}`}>
                    <Image
                        src={src}
                        alt={alt}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1024px) 66vw, 640px"
                        className="object-cover scale-115 shadow-lg hover:scale-120 transition-transform duration-500 ease-in-out"
                    />
                </div>
            </div>
            {title && <h3 className="tracking-wider mt-4 mb-2">{title}</h3>}
            {caption && (
                <p className="text-charcoal-light whitespace-pre-wrap">{caption}</p>
            )}
        </Reveal>
    );
}

/* ═══ CONTENT · the experiment (heading + lead + image pair) ═══ */
const Experiment = memo(function Experiment() {
    return (
        <section className="relative w-full py-28 md:py-44">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <Reveal className="max-w-2xl mb-12 md:mb-16">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                        {experiment.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed">{experiment.lead}</p>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:auto-rows-fr">
                    {experiment.figures.map((f, i) => (
                        <Figure
                            key={f.title}
                            src={f.src}
                            alt={f.alt}
                            title={f.title}
                            caption={f.caption}
                            delay={i * 0.12}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});
Experiment.displayName = "Experiment";

/* ═══ CONTENT · the second payload (1/3 · 2/3 image pair) ═══ */
const Payload = memo(function Payload() {
    return (
        <section className="relative w-full py-28 md:py-44">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <Reveal className="max-w-2xl mb-12 md:mb-16">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                        {payload.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed">{payload.lead}</p>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:auto-rows-fr">
                    <Figure
                        src={payload.small.src}
                        alt={payload.small.alt}
                        title={payload.small.title}
                        caption={payload.small.caption}
                        className="md:col-span-1"
                        delay={0}
                    />
                    <Figure
                        src={payload.large.src}
                        alt={payload.large.alt}
                        title={payload.large.title}
                        caption={payload.large.caption}
                        className="md:col-span-2"
                        delay={0.12}
                    />
                </div>
            </div>
        </section>
    );
});
Payload.displayName = "Payload";

/* ═══ CONTENT · the brains (OBC, heading + lead + image pair) ═══ */
const Obc = memo(function Obc() {
    return (
        <section className="relative w-full py-28 md:py-44">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
                <Reveal className="max-w-2xl mb-12 md:mb-16">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                        {obc.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed">{obc.lead}</p>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:auto-rows-fr">
                    {obc.figures.map((f, i) => (
                        <Figure
                            key={f.title}
                            src={f.src}
                            alt={f.alt}
                            title={f.title}
                            caption={f.caption}
                            delay={i * 0.12}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
});
Obc.displayName = "Obc";

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
                                className="grid grid-cols-[auto_1fr] gap-6 py-5 border-t border-biosat-light-green/30 last:border-b"
                            >
                                <span className="text-biosat-green text-base md:text-lg font-light tracking-[0.1em] tabular-nums pt-0.5">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <div className="max-w-xl">
                                    <p className="text-cloud-white font-light text-lg mb-1.5">{phase.title}</p>
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

                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-8 items-start">
                    {pmCards.map((pm, i) => {
                        const current = pm.current;
                        return (
                            <figure key={pm.name} className={`group flex flex-col ${STAGGER[i] ?? ""}`}>
                                <div
                                    className={`relative w-full overflow-hidden ${
                                        current ? "aspect-[3/4] ring-1 ring-biosat-green" : "aspect-[3/4] ring-1 ring-charcoal-light/15"
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
                                        <span className="absolute top-3 left-3 inline-flex items-center bg-biosat-green px-2.5 py-1">
                                            <span className="text-[11px] md:text-xs font-light tracking-[0.2em] uppercase text-charcoal">
                                                Current
                                            </span>
                                        </span>
                                    )}
                                </div>
                                <figcaption className="mt-3">
                                    <p className="text-cloud-white font-light text-base md:text-lg">{pm.name}</p>
                                    <p className="text-charcoal-light text-sm mt-1 tracking-wide">
                                        {pm.period}
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

/* ═══ 04 · SPECIFICATIONS — dense grid ═══ */
const Specifications = memo(function Specifications() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="04" className="-right-6 top-10" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-10 lg:mb-14 max-w-2xl">
                    Small platform,<br />serious hardware.
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-14 border-t border-charcoal-light/25">
                    {specs.map((s) => (
                        <div
                            key={s.label}
                            className="group flex flex-col py-5 md:py-6 border-b border-charcoal-light/15"
                        >
                            <span className="text-xs md:text-sm tracking-[0.16em] uppercase font-light text-charcoal-light mb-2">
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
const VISIBLE_OFFSET = 2;
const DRAG_STEP = 140;
const FLICK_VELOCITY = 0.5;
const COMMIT_TRANSITION = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out";
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const styleForOffset = (offset: number) => {
    const abs = Math.abs(offset);
    const sign = offset === 0 ? 0 : offset / abs;
    const c = Math.min(abs, VISIBLE_OFFSET + 1);
    return {
        x: sign * c * 190,
        y: c * 20,
        rotate: sign * c * 6,
        scale: Math.max(0.55, 1 - c * 0.13),
        opacity: c > VISIBLE_OFFSET ? 0 : Math.max(0, 1 - c * 0.22),
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

            <div className="relative z-20 text-center min-h-[150px] md:min-h-[170px] mt-6">
                <div key={`${focused}-${active.title}`} className="biosat-swap">
                    <h2 className="font-light text-cloud-white text-3xl md:text-5xl lg:text-6xl">{active.title}</h2>
                    {active.body && (
                        <p className="mt-4 max-w-2xl mx-auto text-charcoal-light leading-relaxed">{active.body}</p>
                    )}
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
                className="relative z-10 flex-1 flex justify-center items-start min-h-[300px] sm:min-h-[330px] md:min-h-[380px] mt-8 cursor-grab active:cursor-grabbing focus:outline-none"
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
                                className={`absolute top-0 left-1/2 w-[210px] h-[240px] sm:w-[240px] sm:h-[260px] md:w-[270px] md:h-[290px] lg:w-[300px] lg:h-[320px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-biosat-green will-change-transform ${
                                    isFocused ? "ring-2 ring-biosat-green" : "ring-1 ring-charcoal-light/15"
                                }`}
                            >
                                <div
                                    className="relative w-full h-full flex flex-col justify-between p-6 md:p-7"
                                    style={{ backgroundColor: "var(--color-biosat-dark-green)" }}
                                >
                                    {/* Image commented out until there are enough assets — re-enable when ready:
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
                                    */}
                                    <span className="text-biosat-green font-light tabular-nums leading-none text-3xl md:text-4xl">
                                        {item.caption}
                                    </span>
                                    <div>
                                        <h3 className="text-cloud-white font-light leading-tight text-lg md:text-xl mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-biosat-light-green/80 text-xs md:text-sm leading-snug">
                                            {item.note}
                                        </p>
                                    </div>
                                    {!isFocused && <div className="absolute inset-0 bg-charcoal/30" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="relative z-50 flex flex-col items-center gap-7 mt-8 md:mt-2">
                {/* segmented progress ticks */}
                <div className="flex items-center gap-2">
                    {items.map((item, idx) => (
                        <button
                            key={item.key}
                            type="button"
                            onClick={() => setFocused(idx)}
                            aria-label={`Go to ${item.title}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === focused ? "bg-biosat-green w-12" : "bg-charcoal-light/40 w-6 hover:bg-charcoal-light/70"
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
                        className="group flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-2 border-charcoal-light/40 text-cloud-white transition-all duration-300 hover:border-biosat-green hover:bg-biosat-green hover:text-charcoal hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cloud-white disabled:hover:scale-100 disabled:hover:border-charcoal-light/40"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:-translate-x-0.5">
                            <path d="M15 5l-7 7 7 7" />
                        </svg>
                    </button>

                    <span key={`idx-${focused}`} className="biosat-swap font-light text-3xl md:text-5xl tabular-nums leading-none w-[4.5ch] text-center">
                        <span className="text-biosat-green">{String(focused + 1).padStart(2, "0")}</span>
                        <span className="text-charcoal-light/50"> / {String(items.length).padStart(2, "0")}</span>
                    </span>

                    <button
                        type="button"
                        onClick={() => setFocused((f) => Math.min(items.length - 1, f + 1))}
                        disabled={focused === items.length - 1}
                        aria-label="Next milestone"
                        className="group flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full border-2 border-charcoal-light/40 text-cloud-white transition-all duration-300 hover:border-biosat-green hover:bg-biosat-green hover:text-charcoal hover:scale-105 active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cloud-white disabled:hover:scale-100 disabled:hover:border-charcoal-light/40"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 md:h-10 md:w-10 transition-transform duration-300 group-hover:translate-x-0.5">
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
});
Timeline.displayName = "Timeline";

/* ═══ 06 · STATUS — monumental countdown ═══ */
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
                <span className="text-sm md:text-base font-light tracking-[0.5em] uppercase text-charcoal-light mb-6 md:mb-10">
                    Until launch
                </span>

                {/* colossal DAYS */}
                <div className="flex items-start justify-center">
                    <span className="font-light tabular-nums leading-[0.8] text-cloud-white text-[clamp(6rem,26vw,26rem)]">
                        {parts.days}
                    </span>
                    <span className="mt-3 md:mt-6 ml-3 md:ml-5 text-sm md:text-lg font-light tracking-[0.25em] uppercase text-biosat-green [writing-mode:vertical-rl]">
                        Days
                    </span>
                </div>

                {/* secondary HH · MM · SS */}
                <div className="mt-8 md:mt-12 flex items-start justify-center divide-x divide-charcoal-light/25">
                    {small.map((u) => (
                        <div key={u.label} className="flex flex-col items-center px-6 sm:px-10">
                            <span className="font-light tabular-nums leading-none text-cloud-white text-4xl sm:text-6xl">
                                {String(u.value).padStart(2, "0")}
                            </span>
                            <span className="mt-3 text-xs md:text-sm font-light tracking-[0.25em] uppercase text-charcoal-light">{u.label}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-14 md:mt-20 flex items-center gap-4">
                    <span className="h-0.5 w-10 bg-biosat-green" />
                    <span className="text-cloud-white text-sm md:text-base font-light tracking-[0.25em] uppercase">
                        Targeted for launch · Q4 2027
                    </span>
                    <span className="h-0.5 w-10 bg-biosat-green" />
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
                        <span className={`text-[11px] font-light tracking-[0.25em] uppercase transition-all duration-300 ${on ? "opacity-100 text-cloud-white" : "opacity-0 group-hover:opacity-100 text-charcoal-light"}`}>
                            {s.label}
                        </span>
                        <span className={`h-0.5 transition-all duration-300 ${on ? "w-10 bg-biosat-green" : "w-5 bg-charcoal-light/50 group-hover:w-7"}`} />
                    </button>
                );
            })}
        </nav>
    );
}

/* ═══ PANEL · nav-tracked primary section wrapper (motion reveal) ═══ */
function Panel({ index, children }: { index: number; children: ReactNode }) {
    return (
        <motion.section
            id={`biosat-section-${index}`}
            data-index={index}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: EASE }}
        >
            {children}
        </motion.section>
    );
}

/* ═══ PAGE ═══ */
export default function BioSatClientPage() {
    const rootRef = useRef<HTMLElement | null>(null);
    const [active, setActive] = useState(0);

    // active-section tracking for the side nav
    useEffect(() => {
        const root = rootRef.current;
        if (!root || !("IntersectionObserver" in window)) return;
        const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-index]"));
        const io = new IntersectionObserver(
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
        sections.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, []);

    const goTo = useCallback((i: number) => {
        document.getElementById(`biosat-section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

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

            {/* 01 · Mission */}
            <section id="biosat-section-0" data-index={0}>
                <Hero />
                <Marquee />
            </section>

            <Statement />

            {/* 02 · Operations */}
            <Panel index={1}>
                <Operations />
            </Panel>

            <Experiment />

            {/* 03 · Team */}
            <Panel index={2}>
                <Team />
            </Panel>

            {/* 04 · Specifications */}
            <Panel index={3}>
                <Specifications />
            </Panel>

            <Obc />

            <Payload />

            {/* 05 · Timeline */}
            <Panel index={4}>
                <Timeline />
            </Panel>

            {/* 06 · Status */}
            <Panel index={5}>
                <Status />
            </Panel>
        </main>
    );
}