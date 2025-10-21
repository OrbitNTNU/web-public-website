'use client';

import React, { useRef, useEffect } from "react";

interface SpanningTextProps {
    text: string;
}

const SpanningText: React.FC<SpanningTextProps> = ({ text }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrame: number;
        let offset = 0;

        const animate = () => {
            if (innerRef.current && containerRef.current) {
                offset -= 2; // Adjust speed here
                // Reset offset to loop seamlessly
                const width = innerRef.current.scrollWidth / 2;
                if (Math.abs(offset) >= width) {
                    offset = 0;
                }
                innerRef.current.style.transform = `translateX(${offset}px)`;
            }
            animationFrame = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    // Repeat text to fill screen, then duplicate for seamless loop
    const repeatedText = Array(20)
        .fill(text.toUpperCase())
        .join("   ");

    return (
        <div
            ref={containerRef}
            className="w-screen overflow-hidden whitespace-nowrap select-none relative"
        >
            {/* Left fade */}
            <div
                className="absolute left-0 top-0 h-full pointer-events-none z-20"
                style={{
                    width: "20rem",
                    background: "linear-gradient(to right, var(--color-charcoal) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
            <div
                className="absolute right-0 top-0 h-full pointer-events-none z-20"
                style={{
                    width: "20rem",
                    background: "linear-gradient(to left, var(--color-charcoal) 0%, rgba(255,255,255,0) 100%)",
                }}
            />
            <div
                ref={innerRef}
                className="inline-block whitespace-nowrap font-bold text-cloud-white relative z-10"
            >
                <span className="text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] xl:text-[16rem] font-thin -tracking-tight">
                    {repeatedText}
                    {repeatedText}
                </span>
            </div>
        </div>
    );
};

export default SpanningText;