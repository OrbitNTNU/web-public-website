"use client";

import { useScroll, useTransform } from "framer-motion";
import { ImageCard } from "@/app/landing/ImageCard";
import { useEffect, useState } from "react";

export default function JamesBond() {
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const { scrollYProgress } = useScroll();
    const radius = useTransform(scrollYProgress, [0, 0.6], [0, 400]);
    const angle = useTransform(scrollYProgress, [0, 0.8], [0, 6.28]); // 2π

    const cubesatAngle = useTransform(angle, (a) => a);
    const cubesatX = useTransform(cubesatAngle, (a) => Math.cos(a) * radius.get());
    const cubesatY = useTransform(cubesatAngle, (a) => Math.sin(a) * radius.get());

    const studentAngle = useTransform(angle, (a) => a + 1.25);
    const studentX = useTransform(studentAngle, (a) => Math.cos(a) * radius.get());
    const studentY = useTransform(studentAngle, (a) => Math.sin(a) * radius.get());

    const reportAngle = useTransform(angle, (a) => a + 2.5);
    const reportX = useTransform(reportAngle, (a) => Math.cos(a) * radius.get());
    const reportY = useTransform(reportAngle, (a) => Math.sin(a) * radius.get());

    const teamsAngle = useTransform(angle, (a) => a + 3.75);
    const teamsX = useTransform(teamsAngle, (a) => Math.cos(a) * radius.get());
    const teamsY = useTransform(teamsAngle, (a) => Math.sin(a) * radius.get());

    const contactAngle = useTransform(angle, (a) => a + 5);
    const contactX = useTransform(contactAngle, (a) => Math.cos(a) * radius.get());
    const contactY = useTransform(contactAngle, (a) => Math.sin(a) * radius.get());

    return (
        <main className="bg-charcoal text-cloud-white">
            {/* Intro */}
            <section className="h-[100vh] flex items-center justify-center">
                <h2 className="text-3xl font-light">....</h2>
            </section>

            {/* Spiral for desktop / stacked for mobile */}
            <section className="relative min-h-screen">
                {isMobile ? (
                    <div className="flex flex-col items-center text-center py-20 space-y-12">
                        <div>
                            <h1 className="text-2xl font-light tracking-wide">ABOUT</h1>
                            <p className="text-xs text-slate mt-1 font-light">DISCOVER</p>
                        </div>
                        <ImageCard src="/sat.png" alt="CubeSat" label="CUBESAT" className="w-64 h-80" staticMode />
                        <ImageCard src="/ntnu.png" alt="Student Driven" label="STUDENT DRIVEN" className="w-64 h-80" staticMode />
                        <ImageCard src="/aurora.png" alt="Report" label="REPORT" className="w-64 h-80" staticMode />
                        <ImageCard src="/orbitluv.png" alt="Teams" label="TEAMS" className="w-96 h-64" staticMode />
                        <ImageCard src="/fjell.png" alt="Contact" label="CONTACT" className="w-64 h-80" staticMode />
                    </div>
                ) : (
                    <section className="relative h-[800vh] mb-[50vh]">
                        <div className="sticky top-0 h-screen flex items-center justify-center overflow-visible">
                            {/* Center "ABOUT" */}
                            <div className="absolute text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h1 className="text-2xl font-light tracking-wide">ABOUT</h1>
                                <p className="text-xs text-slate mt-1 font-light">DISCOVER</p>
                            </div>

                            {/* Floating Images */}
                            <ImageCard src="/sat.png" alt="CubeSat" label="CUBESAT" x={cubesatX} y={cubesatY} className="w-64 h-80" />
                            <ImageCard src="/ntnu.png" alt="Student Driven" label="STUDENT DRIVEN" x={studentX} y={studentY} className="w-64 h-80" />
                            <ImageCard src="/aurora.png" alt="Report" label="REPORT" x={reportX} y={reportY} className="w-64 h-80" />
                            <ImageCard src="/orbitluv.png" alt="Teams" label="TEAMS" x={teamsX} y={teamsY} className="w-96 h-64" />
                            <ImageCard src="/fjell.png" alt="Contact" label="CONTACT" x={contactX} y={contactY} className="w-64 h-80" />
                        </div>
                    </section>
                )}
            </section>

            {/* Extra content */}
            <section className="h-[100vh] bg-translucent flex items-center justify-center relative">
                <h2 className="text-3xl font-light">AFTER THE SPIN...</h2>
            </section>
        </main>
    );
}
