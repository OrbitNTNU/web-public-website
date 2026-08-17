"use client";

import { memo, useEffect, useRef, useState } from "react";
import {SinceLaunchData} from "@/components/General/BiosatMock";


interface Props {
    data: SinceLaunchData;
}

type Parts = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const diff = (from: Date, to: Date): Parts => {
    const ms = Math.max(0, to.getTime() - from.getTime());
    const totalSeconds = Math.floor(ms / 1000);
    return {
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
    };
};

/**
 * SinceLaunch — data-driven from mock `sinceLaunchData`.
 * `lastLaunchDate` is an ISO date string.
 *
 * The interval only runs while the section is intersecting the viewport —
 * wasted ticks on other snap pages cost nothing.
 */
function SinceLaunchInner({ data }: Props) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [parts, setParts] = useState<Parts>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const launchDate = new Date(data.lastLaunchDate);
        setMounted(true);
        setParts(diff(launchDate, new Date()));

        const el = rootRef.current;
        let intervalId: number | null = null;

        const start = () => {
            if (intervalId != null) return;
            intervalId = window.setInterval(() => {
                setParts(diff(launchDate, new Date()));
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
                        setParts(diff(launchDate, new Date()));
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
    }, [data.lastLaunchDate]);

    const hidden = !mounted;

    const units: Array<{
        label: string;
        value: number;
        pad: number;
        desktopMinWidth: string;
        mobileMinWidth: string;
    }> = [
        {
            label: "DAYS",
            value: parts.days,
            pad: 1,
            desktopMinWidth: "4.2ch",
            mobileMinWidth: "4.4ch",
        },
        {
            label: "HOURS",
            value: parts.hours,
            pad: 2,
            desktopMinWidth: "2.4ch",
            mobileMinWidth: "2.4ch",
        },
        {
            label: "MINUTES",
            value: parts.minutes,
            pad: 2,
            desktopMinWidth: "2.4ch",
            mobileMinWidth: "2.4ch",
        },
        {
            label: "SECONDS",
            value: parts.seconds,
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
                {/* Desktop — single inline row */}
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

                {/* Mobile — stacked rows */}
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
}

const SinceLaunch = memo(SinceLaunchInner);
SinceLaunch.displayName = "SinceLaunch";

export default SinceLaunch;