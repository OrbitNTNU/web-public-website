"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

const IMG = {
    fs1: "/framsat/FS1.jpg",
    herman: "/framsat/herman.jpg",
    hermanHelga: "/framsat/hermanoghelga.jpeg",
    fromSpace: "/framsat/imagefromspace.png",
    nora: "/framsat/nora.jpg",
    teamRocket: "/framsat/portrettmedlemmerforanrakett.jpeg",
    shakeTest: "/framsat/ristetest-24.jpg",
    trail: "/framsat/trail.JPG",
    patch: "/framsat/FS_1.png",
} as const;


const SECTIONS = [
    { index: "01", label: "Mission" },
    { index: "02", label: "Team" },
    { index: "03", label: "Specifications" },
    { index: "04", label: "Launch" },
    { index: "05", label: "Signals" },
    { index: "06", label: "Status" },
] as const;

const hero = {
    title: "FramSat-1",
    kicker: "In orbit · First orbital launch from Norway",
    subtitle:
        "A 1U nanosatellite designed, built and tested by students at Orbit NTNU — carried to orbit on the first successful launch from Norwegian, and European mainland.",
    meta: [
        { label: "Class", value: "1U cubesat" },
        { label: "Orbit", value: "SSO · 560 km" },
        { label: "Launched", value: "5 Sep 2026" },
    ],
};

const marqueeWords = [
    "First orbital launch from Norway",
    "First from the European mainland",
    "Built by students · Orbit NTNU",
    "EIDEL × UiO sun sensor",
];

const statement =
    "The first satellite to reach orbit from Norwegian soil — and from the European mainland.";

const mission = {
    title: "The mission",
    body: [
        "FramSat is a platform for demonstrating bleeding-edge Norwegian technology in space, flown across two satellites — FramSat-1 and FramSat-1.5.",
        "It's Orbit NTNU's first partner mission: a satellite bus built entirely in-house around an experimental sun sensor from EIDEL AS and the University of Oslo, funded by NTNU and the Norwegian Space Agency. Developing our own systems on volunteer hours puts us in a rare position — able to fly payloads that would never be affordable on commercial platforms.",
    ],
    facts: [
        { label: "Satellites", value: "FramSat-1 & 1.5" },
        { label: "Payload partners", value: "EIDEL · UiO" },
        { label: "Funding", value: "Norwegian Space Agency" },
        { label: "Partner institution", value: "Norwegian University of Science and Technology" },
    ],
    image: IMG.fs1,
};

const teamIntro = {
    title: "Carried across generations",
    body: "FramSat-1 passed through the hands of several project managers on its way from concept to orbit — each inheriting a growing mission and handing it on.",
    image: IMG.teamRocket,
};
type PM = { name: string; image: string | null; period: string; current: boolean };
const pmCards: PM[] = [
    {name: "Torbjørn brattvold", image: null, period: "Fall 2021 - Spring 2022", current: false},
    { name: "Mathias Askeland", image: null, period: "Spring 2022 — Spring 2024", current: false },
    { name: "Herman Castberg", image: IMG.herman, period: "Spring 2024 — Present", current: true },
];

const specs = [
    { label: "Platform", value: "1U Cubesat" },
    { label: "Dimensions", value: "10 × 10 × 10 cm" },
    { label: "Mass", value: "≈ 1.3 kg" },
    { label: "Orbit", value: "Sun-synchronous" },
    { label: "Altitude", value: "560 km" },
    { label: "Radio band", value: "UHF" },
    { label: "Payload", value: "EIDEL sun sensor" },
    { label: "Payload partners", value: "EIDEL · UiO" },
    { label: "Ground station", value: "NTNU Gløshaugen" },
    { label: "Launch vehicle", value: "ISAR Spectrum" },
    { label: "Launch site", value: "Andøya Spaceport" },
    { label: "Launched", value: "5 Sep 2026" },
    { label: "Built by", value: "Orbit NTNU" },
    { label: "Funding", value: "Norwegian Space Agency" },
    { label: "Partner Institution", value: "Norwegian University of Science and Technology" },
];

const launch = {
    title: "Launch",
    when: "5 September 2026 · 20:12 UTC",
    lead: "ISAR Aerospace launched Spectrum from Andøya Spaceport with FramSat-1 on board — the first successful orbital launch from Norway, and from the European mainland. ISAR and Orbit NTNU made history together.",
    image: IMG.trail,
    alt: "Spectrum's launch trail over Andøya",
    caption: "Spectrum's ascent from Andøya Spaceport.",
};

const signals = {
    title: "First signals",
    lead: "FramSat-1 separated from Spectrum's second stage and unfolded its antennas about 30 minutes later. Using NTNU's UHF antenna at Gløshaugen in Trondheim, Orbit NTNU received its first signals roughly three hours after ignition.",
    sequence: [
        { time: "20:12 UTC", label: "Ignition", note: "Spectrum lifts off from Andøya Spaceport." },
        { time: "T + ~70 min", label: "Satelite deployed", note: "~70 minutes after separation from the second stage." },
        { time: "T + ~100 min", label: "Antennas deployed", note: "~100 minutes after separation from the second stage." },
        { time: "23:22 UTC", label: "First signals", note: "Received at Gløshaugen — about 3 hours after ignition." },
    ],
    repo: {
        label: "Telemetry decoder",
        text: "Amateur radio operators can receive and decode FramSat-1's downlink with our open-source decoder.",
        href: "https://github.com/OrbitNTNU/framsat1-telemetry-decoder",
    },
};


const launchDate = "2026-09-05T20:12:00Z";

const PAD_X = "px-6 sm:px-10 md:px-16 lg:px-24 xl:px-40";
const EASE = [0.22, 1, 0.36, 1] as const;

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

function SmileyPlaceholder() {
    return (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
            <svg width="60" height="60" viewBox="0 0 48 48" aria-label="Smiling Face" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17" cy="20" r="2.5" fill="var(--color-cloud-white)" />
                <circle cx="31" cy="20" r="2.5" fill="var(--color-cloud-white)" />
                <path d="M17 29c2 3 12 3 14 0" stroke="var(--color-cloud-white)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
        </div>
    );
}

function Patch() {
    return (
        <div className="flex flex-col items-center w-48 md:w-56 lg:w-64 shrink-0">
            <div className="relative aspect-square w-full">
                <Image
                    src={IMG.patch}
                    alt="FramSat-1 mission patch"
                    fill
                    sizes="256px"
                    className="object-contain"
                />
            </div>

            <span className="mt-3 text-xs tracking-[0.2em] uppercase text-charcoal-light">
                Mission patch
            </span>
        </div>
    );
}

function PMCard({ pm }: { pm: PM }) {
    const current = pm.current;
    return (
        <figure className="group flex flex-col">
            <div
                className={`relative w-full aspect-[3/4] overflow-hidden ${
                    current ? "ring-1 ring-framsat-yellow" : "ring-1 ring-charcoal-light/15"
                }`}
            >
                {pm.image ? (
                    <Image
                        src={pm.image}
                        alt={pm.name}
                        fill
                        sizes="(min-width:768px) 26vw, 45vw"
                        loading="lazy"
                        className={`object-cover transition-transform duration-700 group-hover:scale-[1.04] ${
                            current ? "" : "grayscale-[0.4]"
                        }`}
                    />
                ) : (
                    <SmileyPlaceholder />
                )}
                {current && (
                    <span className="absolute top-3 left-3 inline-flex items-center bg-framsat-yellow px-2.5 py-1">
                        <span className="text-[11px] md:text-xs font-light tracking-[0.2em] uppercase text-charcoal">
                            Current
                        </span>
                    </span>
                )}
            </div>
            <figcaption className="mt-3">
                <p className="text-cloud-white font-light text-base md:text-lg">{pm.name}</p>
                <p className="text-charcoal-light text-sm mt-1 tracking-wide">{pm.period}</p>
            </figcaption>
        </figure>
    );
}

const Hero = memo(function Hero() {
    const clip: CSSProperties = {
        backgroundImage:
            "linear-gradient(115deg, var(--color-framsat-pink), var(--color-framsat-red) 35%, var(--color-framsat-yellow) 65%, var(--color-framsat-blue))",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: "1px rgba(245,245,245,0.14)",
        fontSize: "clamp(2.5rem, 11vw, 13rem)",
    };
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-charcoal">
            <div className={`${PAD_X} w-full`}>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
                    className="text-framsat-yellow tracking-[0.3em] uppercase text-sm md:text-base font-light mb-5 md:mb-7"
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

const DOT_COLORS = [
    "var(--color-framsat-pink)",
    "var(--color-framsat-blue)",
    "var(--color-framsat-yellow)",
    "var(--color-framsat-red)",
];
const Marquee = memo(function Marquee() {
    const strip = [...marqueeWords, ...marqueeWords];
    return (
        <div className="relative w-full overflow-hidden border-y border-charcoal-light/30 py-6 md:py-8">
            <div className="framsat-marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
                {strip.map((w, i) => (
                    <span key={i} className="flex items-center">
                        <span className="text-cloud-white font-light tracking-[0.05em] text-2xl md:text-4xl px-6 md:px-10">
                            {w}
                        </span>
                        <span className="text-2xl md:text-4xl" style={{ color: DOT_COLORS[i % DOT_COLORS.length] }}>•</span>
                    </span>
                ))}
            </div>
        </div>
    );
});
Marquee.displayName = "Marquee";

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

const Mission = memo(function Mission() {
    return (
        <div
            className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}
            style={{ backgroundColor: "color-mix(in srgb, var(--color-framsat-blue) 30%, #04060a)" }}
        >
            <GhostNumeral n="01" className="-left-6 top-1/4" stroke="color-mix(in srgb, var(--color-framsat-pink) 20%, transparent)" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-14 lg:gap-24 items-center">
                <div className="order-2 lg:order-1">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-8 lg:mb-10">
                        {mission.title}
                    </h2>
                    <div className="space-y-5 max-w-xl">
                        {mission.body.map((p, i) => (
                            <p key={i} className="text-cloud-white/80 leading-relaxed text-base md:text-lg">{p}</p>
                        ))}
                    </div>
                    <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-cloud-white/25 pt-8 max-w-2xl">
                        {mission.facts.map((f) => (
                            <div key={f.label}>
                                <dt className="text-xs tracking-[0.18em] uppercase text-framsat-yellow mb-1.5">{f.label}</dt>
                                <dd className="text-cloud-white font-light">{f.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div className="order-1 lg:order-2 flex items-center justify-center">
                    <div className="relative w-full aspect-square max-h-[48vh] lg:max-h-[60vh] overflow-hidden bg-cloud-white/5">
                        <Image
                            src={mission.image}
                            alt="FramSat-1 flight model"
                            fill
                            sizes="(max-width:1024px) 90vw, 40vw"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
});
Mission.displayName = "Mission";

const Team = memo(function Team() {
    const [torbjørn, mathias, herman] = pmCards;
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="02" className="-left-6 top-1/4" stroke="color-mix(in srgb, var(--color-framsat-blue) 15%, transparent)" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <div
                    className="w-full max-w-5xl mb-12 lg:mb-16 grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center gap-8 md:gap-12">
                    <div className="max-w-2xl">
                        <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                            {teamIntro.title}
                        </h2>

                        <p className="text-charcoal-light leading-relaxed max-w-xl">
                            {teamIntro.body}
                        </p>
                    </div>

                    <Patch/>
                </div>
                <Reveal>
                    <p className="text-sm md:text-base font-light tracking-[0.28em] uppercase text-framsat-yellow mb-8 md:mb-12">
                        Project managers
                    </p>

                    <div
                        className="grid grid-cols-3 gap-6 sm:gap-10 lg:gap-16 items-center max-w-5xl mx-auto w-full mb-16 lg:mb-24">
                        <PMCard pm={torbjørn}/>
                        <PMCard pm={mathias}/>
                        <PMCard pm={herman}/>
                    </div>
                </Reveal>

                <Reveal>
                    <div
                        className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden bg-charcoal-light/10">
                        <Image
                            src={teamIntro.image}
                            alt="Orbit NTNU members in front of the rocket"
                            fill
                            sizes="100vw"
                            className="object-cover"
                        />
                    </div>
                </Reveal>
            </div>
        </div>
    );
});
Team.displayName = "Team";

const Specifications = memo(function Specifications() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="03" className="-right-6 top-10"
                          stroke="color-mix(in srgb, var(--color-framsat-yellow) 15%, transparent)"/>

            <div className="relative z-10 w-full max-w-[1600px] mx-auto flex flex-col justify-center">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 lg:gap-16 items-end mb-12 lg:mb-16">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl max-w-2xl">
                        Insights!
                    </h2>
                    <Reveal>
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-charcoal-light/10">
                            <Image
                                src={IMG.shakeTest}
                                alt="Vibration (shake) testing, 2024"
                                fill
                                sizes="(max-width:1024px) 90vw, 40vw"
                                className="object-cover"
                            />
                        </div>
                        <p className="text-charcoal-light text-sm mt-3">Vibration (shake) testing</p>
                    </Reveal>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 lg:gap-x-14 border-t border-charcoal-light/35">
                    {specs.map((s) => (
                        <div
                            key={s.label}
                            className="group flex flex-col py-5 md:py-6 border-b border-charcoal-light/25"
                        >
                            <span className="text-xs md:text-sm tracking-[0.16em] uppercase font-light text-charcoal-light mb-2">
                                {s.label}
                            </span>
                            <span className="font-light text-cloud-white text-lg md:text-xl lg:text-2xl group-hover:text-framsat-yellow transition-colors duration-300">
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

const Launch = memo(function Launch() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="04" className="-left-6 top-16" stroke="color-mix(in srgb, var(--color-framsat-red) 15%, transparent)" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <Reveal>
                    <span className="inline-block text-framsat-yellow text-sm md:text-base font-light tracking-[0.22em] uppercase mb-6">
                        {launch.when}
                    </span>
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-6">
                        {launch.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed text-base md:text-lg max-w-xl">
                        {launch.lead}
                    </p>
                </Reveal>

                <Reveal delay={0.12}>
                    <div className="relative w-full aspect-[4/5] overflow-hidden bg-charcoal-light/10">
                        <Image
                            src={launch.image}
                            alt={launch.alt}
                            fill
                            sizes="(max-width:1024px) 90vw, 45vw"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-charcoal-light text-sm mt-3">{launch.caption}</p>
                </Reveal>
            </div>
        </div>
    );
});
Launch.displayName = "Launch";

const Signals = memo(function Signals() {
    return (
        <div className={`relative w-full min-h-screen flex items-center overflow-hidden ${PAD_X} py-28 md:py-36`}>
            <GhostNumeral n="05" className="-left-6 bottom-6" stroke="color-mix(in srgb, var(--color-framsat-pink) 16%, transparent)" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto">
                <Reveal className="max-w-2xl mb-12 md:mb-16">
                    <h2 className="font-light text-cloud-white text-4xl md:text-5xl lg:text-6xl mb-5">
                        {signals.title}
                    </h2>
                    <p className="text-charcoal-light leading-relaxed text-base md:text-lg">{signals.lead}</p>
                </Reveal>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-12 lg:gap-20 items-start">
                    <ol className="flex flex-col">
                        {signals.sequence.map((s) => (
                            <li
                                key={s.label}
                                className="grid grid-cols-[7.5rem_1fr] gap-5 md:gap-8 py-5 border-t border-charcoal-light/30 last:border-b"
                            >
                                <span className="text-framsat-yellow text-sm md:text-base font-light tracking-[0.08em] tabular-nums pt-1">
                                    {s.time}
                                </span>
                                <div>
                                    <p className="text-cloud-white font-light text-lg mb-1">{s.label}</p>
                                    <p className="text-charcoal-light leading-relaxed">{s.note}</p>
                                </div>
                            </li>
                        ))}
                    </ol>

                    <Reveal delay={0.1}>
                        <div className="lg:pl-4">
                            <span className="text-xs tracking-[0.2em] uppercase text-framsat-yellow">
                                {signals.repo.label}
                            </span>
                            <p className="text-cloud-white/90 leading-relaxed mt-4 mb-6 max-w-md">{signals.repo.text}</p>
                            <a
                                href={signals.repo.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="FramSat-1 telemetry decoder on GitHub"
                                className="inline-flex text-cloud-white transition-colors duration-300 hover:text-framsat-pink"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-9 w-9">
                                    <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.575.106.785-.25.785-.556 0-.274-.01-1.002-.015-1.967-3.196.695-3.87-1.54-3.87-1.54-.523-1.328-1.277-1.682-1.277-1.682-1.044-.714.079-.699.079-.699 1.155.081 1.763 1.186 1.763 1.186 1.026 1.758 2.693 1.25 3.35.956.104-.743.402-1.25.73-1.538-2.552-.29-5.236-1.276-5.236-5.68 0-1.255.448-2.28 1.184-3.084-.119-.29-.513-1.459.112-3.042 0 0 .966-.31 3.165 1.178a11 11 0 0 1 5.762 0c2.198-1.489 3.163-1.178 3.163-1.178.626 1.583.232 2.752.114 3.042.737.804 1.183 1.829 1.183 3.084 0 4.415-2.688 5.386-5.248 5.671.413.355.78 1.057.78 2.131 0 1.539-.014 2.78-.014 3.158 0 .309.207.667.79.554A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
                                </svg>
                            </a>
                        </div>
                    </Reveal>
                </div>
            </div>
        </div>
    );
});
Signals.displayName = "Signals";

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
        setParts(diff(d, new Date()));
        const el = rootRef.current;
        let intervalId: number | null = null;
        const start = () => {
            if (intervalId != null) return;
            intervalId = window.setInterval(() => setParts(diff(d, new Date())), 1000);
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
                        setParts(diff(d, new Date()));
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
                    In orbit
                </span>

                {/* colossal DAYS */}
                <div className="flex items-start justify-center">
                    <span className="font-light tabular-nums leading-[0.8] text-cloud-white text-[clamp(6rem,26vw,26rem)]">
                        {parts.days}
                    </span>
                    <span className="mt-3 md:mt-6 ml-3 md:ml-5 text-sm md:text-lg font-light tracking-[0.25em] uppercase text-framsat-yellow [writing-mode:vertical-rl]">
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
                    <span className="h-1 w-12 bg-framsat-yellow" />
                    <span className="text-cloud-white text-sm md:text-base font-light tracking-[0.25em] uppercase">
                        Launched from Andøya · 5 September 2026, 20:12 UTC
                    </span>
                    <span className="h-1 w-12 bg-framsat-yellow" />
                </div>
            </div>
        </div>
    );
});
Status.displayName = "Status";

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
                        <span className={`h-[3px] transition-all duration-300 ${on ? "w-10 bg-framsat-yellow" : "w-5 bg-charcoal-light/50 group-hover:w-7"}`} />
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
            id={`framsat-section-${index}`}
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

export default function FramSatOneClientPage() {
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
        document.getElementById(`framsat-section-${i}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, []);

    return (
        <main ref={rootRef} className="relative w-full">
            {/* self-contained motion: marquee + reduced-motion guard */}
            <style>{`
              @keyframes framsat-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
              .framsat-marquee-track { animation: framsat-marquee 34s linear infinite; }
              @media (prefers-reduced-motion: reduce) {
                .framsat-marquee-track { animation: none; }
              }
            `}</style>

            <SectionNav active={active} onSelect={goTo} />

            {/* 01 · Mission */}
            <section id="framsat-section-0" data-index={0}>
                <Hero />
                <Marquee />
            </section>

            <Statement />

            <Mission />

            {/* 02 · Team */}
            <Panel index={1}>
                <Team />
            </Panel>

            {/* 03 · Specifications */}
            <Panel index={2}>
                <Specifications />
            </Panel>

            {/* 04 · Launch */}
            <Panel index={3}>
                <Launch />
            </Panel>

            {/* 05 · Signals */}
            <Panel index={4}>
                <Signals />
            </Panel>

            {/* 06 · Status */}
            <Panel index={5}>
                <Status />
            </Panel>
        </main>
    );
}