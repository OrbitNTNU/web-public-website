"use client";

import Image from "next/image";
import {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    type PointerEvent as ReactPointerEvent,
} from "react";
import {TimelineData} from "@/components/General/BiosatMock";


interface Props {
    data: TimelineData;
}

// Cards further than this from the focused index are not mounted.
const VISIBLE_OFFSET = 3;

// Pixels of horizontal drag that equal "one card step".
const DRAG_STEP = 140;

// A flick above this velocity (px/ms) counts as a step even when the
// raw delta is below DRAG_STEP.
const FLICK_VELOCITY = 0.5;

const COMMIT_TRANSITION =
    "transform 380ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out";

type CardStyle = {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    opacity: number;
    zIndex: number;
};

const clamp = (n: number, min: number, max: number) =>
    Math.max(min, Math.min(max, n));

const styleForOffset = (offset: number): CardStyle => {
    const abs = Math.abs(offset);
    const sign = offset === 0 ? 0 : offset / abs;
    const clamped = Math.min(abs, VISIBLE_OFFSET + 1);

    const xStep = 230;
    const yStep = 38;
    const rotStep = 8;

    return {
        x: sign * clamped * xStep,
        y: clamped * yStep,
        rotate: sign * clamped * rotStep,
        scale: Math.max(0.5, 1 - clamped * 0.14),
        opacity:
            clamped > VISIBLE_OFFSET
                ? 0
                : Math.max(0, 1 - clamped * 0.18),
        zIndex: 40 - Math.floor(clamped),
    };
};

/**
 * TimelineCarousel — data-driven from mock `timelineData`.
 * Each card uses `imageTitle` as the title and `image` (URL string).
 */
function TimelineCarouselInner({ data }: Props) {
    const items = data.timelineCollection ?? [];

    const [focused, setFocused] = useState(0);
    const focusedRef = useRef(focused);

    const arcRef = useRef<HTMLDivElement | null>(null);
    const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const dragRef = useRef({
        active: false,
        pointerId: -1,
        startX: 0,
        lastX: 0,
        startT: 0,
        lastT: 0,
        focusedAtStart: 0,
        moved: false,
    });

    const writeCard = useCallback(
        (i: number, offsetFromFocus: number, transitionOn: boolean) => {
            const el = cardRefs.current[i];
            if (!el) return;
            const s = styleForOffset(offsetFromFocus);
            el.style.transform = `translate3d(calc(-50% + ${s.x}px), ${s.y}px, 0) rotate(${s.rotate}deg) scale(${s.scale})`;
            el.style.opacity = String(s.opacity);
            el.style.zIndex = String(s.zIndex);
            el.style.transition = transitionOn ? COMMIT_TRANSITION : "none";
            el.style.pointerEvents =
                Math.abs(offsetFromFocus) > VISIBLE_OFFSET ? "none" : "auto";
        },
        []
    );

    const applyCommitted = useCallback(
        (transitionOn: boolean) => {
            for (let i = 0; i < items.length; i++) {
                writeCard(i, i - focusedRef.current, transitionOn);
            }
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

            for (let i = 0; i < items.length; i++) {
                writeCard(i, i - frac, false);
            }

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
            let target = clamp(
                Math.round(d.focusedAtStart - dx / DRAG_STEP),
                0,
                maxIdx
            );

            if (
                Math.abs(velocity) >= FLICK_VELOCITY &&
                Math.abs(dx) < DRAG_STEP
            ) {
                target = clamp(
                    d.focusedAtStart - Math.sign(velocity),
                    0,
                    maxIdx
                );
            }

            focusedRef.current = target;
            if (target !== focused) {
                setFocused(target);
            } else {
                applyCommitted(true);
            }
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

    const onClickCapture = useCallback((e: React.MouseEvent) => {
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
            if (e.key === "ArrowLeft") {
                setFocused((f) => Math.max(0, f - 1));
            } else if (e.key === "ArrowRight") {
                setFocused((f) => Math.min(items.length - 1, f + 1));
            }
        };
        el.addEventListener("keydown", onKey);
        return () => el.removeEventListener("keydown", onKey);
    }, [items.length]);

    const setCardRef = useCallback(
        (idx: number) => (node: HTMLButtonElement | null) => {
            cardRefs.current[idx] = node;
        },
        []
    );

    const activeItem = items[focused];

    if (!activeItem || items.length === 0) return null;

    return (
        <div className="w-full h-full flex flex-col px-8 md:px-20 lg:px-32 xl:px-40 pt-24 md:pt-32 lg:pt-36 pb-8 overflow-hidden biosat-carousel">
            {/* Title + subtitle */}
            <div className="relative z-20 text-center min-h-[120px]">
                <div key={`${focused}-${activeItem.imageTitle}`} className="biosat-swap">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-strong mb-3">
                        {activeItem.imageTitle}
                    </h2>
                    {data.subheading && focused === 0 && (
                        <p className="text-base md:text-xl lg:text-2xl text-charcoal-light">
                            {data.subheading}
                        </p>
                    )}
                </div>
            </div>

            {/* Arc carousel */}
            <div
                ref={arcRef}
                tabIndex={0}
                role="region"
                aria-label={data.heading}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={finishDrag}
                onPointerCancel={onPointerCancel}
                onClickCapture={onClickCapture}
                className="relative flex-1 flex justify-center items-start min-h-0 mt-10 cursor-grab active:cursor-grabbing focus:outline-none"
            >
                <div className="relative w-full h-full flex justify-center">
                    {items.map((item, idx) => {
                        const offset = idx - focused;
                        if (Math.abs(offset) > VISIBLE_OFFSET) return null;
                        const isFocused = offset === 0;

                        const imgSrc = item.image;

                        return (
                            <button
                                key={item._key ?? idx}
                                ref={setCardRef(idx)}
                                type="button"
                                draggable={false}
                                onClick={() => {
                                    if (dragRef.current.moved) return;
                                    setFocused(idx);
                                }}
                                aria-label={`Show ${item.imageTitle}`}
                                className={`absolute top-0 left-1/2 w-[240px] h-[300px] sm:w-[280px] sm:h-[340px] md:w-[320px] md:h-[400px] lg:w-[360px] lg:h-[460px] rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-biosat-green will-change-transform ${
                                    isFocused ? "shadow-2xl" : "shadow-lg"
                                }`}
                            >
                                <div className="relative w-full h-full">
                                    {imgSrc && (
                                        <Image
                                            src={imgSrc}
                                            alt={item.imageTitle}
                                            fill
                                            sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 280px"
                                            loading={
                                                Math.abs(offset) <= 1
                                                    ? "eager"
                                                    : "lazy"
                                            }
                                            draggable={false}
                                            className={`object-cover ${
                                                isFocused
                                                    ? "brightness-110 saturate-110"
                                                    : "brightness-75"
                                            }`}
                                        />
                                    )}
                                    {!isFocused && (
                                        <div className="absolute inset-0 bg-charcoal/25" />
                                    )}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Arc line + index */}
            <div className="relative mt-6">
                <svg
                    viewBox="0 0 1200 160"
                    preserveAspectRatio="none"
                    className="absolute inset-x-0 top-0 w-full h-[110px] md:h-[130px] pointer-events-none"
                    aria-hidden
                >
                    <path
                        d="M 0 140 Q 600 -30 1200 140"
                        fill="none"
                        stroke="rgba(245,245,245,0.25)"
                        strokeWidth="4"
                    />
                </svg>
                <div className="relative z-10 flex items-center justify-center h-[110px] md:h-[130px]">
                    <span
                        key={`idx-${focused}`}
                        className="biosat-swap text-2xl md:text-4xl lg:text-5xl font-light text-strong"
                    >
                        {focused + 1} / {items.length}
                    </span>
                </div>
            </div>

            {/* Pagination + prev/next */}
            <div className="flex flex-col items-center gap-5 mt-2">
                <div className="flex gap-2">
                    {items.map((item, idx) => (
                        <button
                            key={item._key ?? idx}
                            type="button"
                            onClick={() => setFocused(idx)}
                            aria-label={`Jump to ${item.imageTitle}`}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === focused
                                    ? "bg-biosat-green w-10"
                                    : "bg-charcoal-light/40 w-3 hover:bg-charcoal-light/70"
                            }`}
                        />
                    ))}
                </div>
                <div className="flex gap-5 text-charcoal-light">
                    <button
                        type="button"
                        onClick={() => setFocused((f) => Math.max(0, f - 1))}
                        disabled={focused === 0}
                        className="px-7 py-3 text-base md:text-lg border border-charcoal-light/40 rounded-lg hover:text-strong hover:border-strong/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        ← Prev
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            setFocused((f) => Math.min(items.length - 1, f + 1))
                        }
                        disabled={focused === items.length - 1}
                        className="px-7 py-3 text-base md:text-lg border border-charcoal-light/40 rounded-lg hover:text-strong hover:border-strong/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
}

const TimelineCarousel = memo(TimelineCarouselInner);
TimelineCarousel.displayName = "TimelineCarousel";

export default TimelineCarousel;