"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";


const DEADLINE = new Date("2026-08-24T23:59:00+02:00");

const INFO_MEETINGS = [
    {
        title: "Orbit x Propulse",
        date: "Aug 18",
        time: "16:00",
        location: "R7",
        accent: "bg-sky-mint",
    },
    {
        title: "Girls in Space",
        date: "Aug 19",
        time: "16:00",
        location: "FRAM",
        accent: "bg-laser-lemon",
    },
] as const;

type TimeLeft = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

const getTimeLeft = (): TimeLeft => {
    const diff = DEADLINE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const UNIT_LABEL: Record<keyof TimeLeft, string> = {
    days: "DAYS",
    hours: "HRS",
    minutes: "MIN",
    seconds: "SEC",
};

const CountdownDigit = ({
                            unit,
                            value,
                        }: {
    unit: keyof TimeLeft;
    value: number;
}) => (
    <div className="flex flex-col items-center">
    <span className="font-mono tabular-nums text-6xl leading-none text-cloud-white sm:text-7xl md:text-8xl">
      {String(value).padStart(2, "0")}
    </span>
        <span className="mt-2 text-[10px] tracking-[0.25em] text-charcoal-light md:text-xs">
      {UNIT_LABEL[unit]}
    </span>
    </div>
);

const CalendarIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-4 w-4 shrink-0"
    >
        <rect x="3" y="5" width="18" height="16" rx="1.5" />
        <path d="M3 9.5h18M8 3v3.5M16 3v3.5" strokeLinecap="round" />
    </svg>
);

const PinIcon = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-4 w-4 shrink-0"
    >
        <path d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z" />
        <circle cx="12" cy="9.5" r="2.25" />
    </svg>
);

const fallIn: Variants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function RecruitmentSection() {
    const [mounted, setMounted] = useState(false);
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        setMounted(true);
        setTimeLeft(getTimeLeft());
        const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(interval);
    }, []);

    const closed = mounted && DEADLINE.getTime() - Date.now() <= 0;

    return (
        <section className="flex w-full flex-col gap-16 px-4 md:px-12 pt-12 md:pt-4 pb-12 md:pb-4">
            {/* Mission clock */}
            <motion.div
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                variants={fallIn}
            >
                <div className="mb-6 flex items-center gap-2">

                    <span className="text-2xl tracking-[0.25em] text-charcoal-light">
            Recruitment 2026 · Application Deadline
          </span>
                </div>

                {closed ? (
                    <p className="text-2xl text-cloud-white md:text-3xl">
                        The application deadline has passed.
                    </p>
                ) : (
                    <>
                        <div className="flex flex-wrap gap-8 sm:gap-12">
                            <CountdownDigit unit="days" value={timeLeft.days} />
                            <CountdownDigit unit="hours" value={timeLeft.hours} />
                            <CountdownDigit unit="minutes" value={timeLeft.minutes} />
                            <CountdownDigit unit="seconds" value={timeLeft.seconds} />
                        </div>
                        <p className="mt-6 text-sm text-charcoal-light">
                            Applications close{" "}
                            <span className="text-cloud-white">August 24 at 23:59</span>.
                        </p>
                    </>
                )}
            </motion.div>

            {/* Info meetings */}
            <div className="flex flex-col gap-10">
        <span className="text-lg tracking-[0.25em] text-charcoal-light">
          Info Meetings
        </span>
                <div className="flex flex-col gap-8">
                    {INFO_MEETINGS.map((event, i) => (
                        <motion.div
                            key={event.title}
                            custom={i + 1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fallIn}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-center gap-2">
                                <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${event.accent}`} />
                                <span className="text-xl text-cloud-white md:text-2xl">
                  {event.title}
                </span>
                            </div>
                            <div className="flex flex-col gap-1 text-sm text-charcoal-light sm:flex-row sm:gap-6">
                <span className="flex items-center gap-2">
                  <CalendarIcon />
                    {event.date} · {event.time}
                </span>
                                <span className="flex items-center gap-2">
                  <PinIcon />
                                    {event.location}
                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}