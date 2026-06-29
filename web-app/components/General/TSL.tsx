"use client"

import { motion, useInView } from "framer-motion";
import {useEffect, useRef, useState} from "react";

interface LaunchProps {
    lastLaunchDate: string,
}

type DateParts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const dateDifference = (from: Date, to: Date) => {
    const ms = Math.max(0, to.getTime() - from.getTime());
    const totalSeconds = Math.floor(ms / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    }
}

const TSL =  ({ lastLaunchDate }: LaunchProps) => {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [dateParts, setParts] = useState<DateParts>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        setMounted(true);
        setParts(dateDifference(new Date(lastLaunchDate), new Date()));

        const el = rootRef.current;
        let intervalId: number | null = null;

        const start = () => {
            if (intervalId != null) return;
            intervalId = window.setInterval(() => {
                setParts(dateDifference(new Date(lastLaunchDate), new Date()));
            }, 1000);
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
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        setParts(dateDifference(new Date(lastLaunchDate), new Date()));
                        start();
                    } else {
                        stop();
                    }
                },
                { threshold: 0.15 }
            );
            observer.observe(el);
        } else {
            start();
        }

        return () => {
            stop();
            observer?.disconnect();
        };
    }, []);

    const hidden = !mounted;

    // Each unit carries its own max-digit estimate so we can reserve
    // width up front. Width is locked in ch-units so a digit switch
    // (9→10, 99→100) never reshuffles its neighbours.
    const units: Array<{
        label: string;
        value: number;
        pad: number;
        desktopMinWidth: string;
        mobileMinWidth: string;
    }> = [
        {
            label: "DAYS",
            value: dateParts.days,
            pad: 1,
            desktopMinWidth: "4.2ch",
            mobileMinWidth: "4.4ch",
        },
        {
            label: "HOURS",
            value: dateParts.hours,
            pad: 2,
            desktopMinWidth: "2.4ch",
            mobileMinWidth: "2.4ch",
        },
        {
            label: "MINUTES",
            value: dateParts.minutes,
            pad: 2,
            desktopMinWidth: "2.4ch",
            mobileMinWidth: "2.4ch",
        },
        {
            label: "SECONDS",
            value: dateParts.seconds,
            pad: 2,
            desktopMinWidth: "2.4ch",
            mobileMinWidth: "2.4ch",
        },
    ];

    return (
        <div
            ref={rootRef}
            className="w-full h-full flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-20 lg:py-28"
        >
            <div className="w-full max-w-7xl mx-auto text-center flex flex-col items-center justify-center gap-14 md:gap-20 lg:gap-24">
                {/* Desktop — single inline row, one horizontal line.
                    Each "VALUE LABEL" pair sits side-by-side with a
                    fixed ch-width on the value so ticks don't shove
                    the labels around. Matches the wireframe's
                    '1365 DAYS 15 HOURS 34 MINUTES 36 SECONDS' read. */}
                <div
                    className={`hidden md:flex items-baseline justify-center flex-wrap gap-x-6 lg:gap-x-10 xl:gap-x-12 gap-y-4 text-strong transition-opacity ${
                        hidden ? "opacity-0" : "opacity-100"
                    }`}
                >
                    {units.map(({ label, value, pad, desktopMinWidth }, i) => (
                        <span
                            key={label}
                            className="inline-flex items-baseline gap-3 lg:gap-4"
                        >
                            <span
                                className="inline-block text-right text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light tabular-nums leading-none"
                                style={{ minWidth: desktopMinWidth }}
                            >
                                {String(value).padStart(pad, "0")}
                            </span>
                            <span className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-[0.12em] leading-none">
                                {label}
                            </span>
                            {i < units.length - 1 && (
                                <span className="sr-only">,</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Mobile — stacked rows, big number on left, label on
                    right; matches the wireframe's vertical list. */}
                <div className="md:hidden w-full flex flex-col gap-7 text-strong">
                    {units.map(({ label, value, pad, mobileMinWidth }) => (
                        <div
                            key={label}
                            className={`flex items-baseline justify-between px-2 transition-opacity ${
                                hidden ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <span
                                className="inline-block text-left text-3xl sm:text-5xl font-semibold tabular-nums leading-none"
                                style={{ minWidth: mobileMinWidth }}
                            >
                                {String(value).padStart(pad, "0")}
                            </span>
                            <span className="text-3xl sm:text-3xl font-semibold tracking-[0.08em]">
                                {label}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-base md:text-2xl lg:text-3xl tracking-[0.45em] text-charcoal-light font-light">
                    SINCE LAUNCH
                </p>
            </div>
        </div>
    );
};

export default TSL;