"use client";

import { useEffect, useRef } from "react";
import HighLevelSpecs from "@/components/General/HighLevelSpecs";
import ProjectManagers from "@/components/General/ProjectManagers";
import TimelineCarousel from "@/components/General/TimelineCarousel";
import SinceLaunch from "@/components/General/SinceLaunch";
import Hero from "@/components/General/Hero";
import OperationsTimeline from "@/components/General/OperationsTimeline";
import {heroData, hlsData, otData, pmData, sinceLaunchData, timelineData} from "@/components/General/BiosatMock";



/**
 * BioSat project page with document-level scroll snap.
 *
 * Scroll model:
 *  - `html.biosat-snap` adds `scroll-snap-type: y mandatory` to the document.
 *  - Each `biosat-section` is 100vh with `scroll-snap-align: start`.
 *  - A page-level IntersectionObserver drives the shared `biosat-fade`
 *    reveal animation — no per-element framer-motion overhead.
 *
 * Sections are now fed from local mock data (see ./biosatMock).
 */
export default function BioSatClientPage() {
    const rootRef = useRef<HTMLElement | null>(null);

    // Enable document-level scroll snap while this route is mounted
    useEffect(() => {
        const htmlEl = document.documentElement;
        htmlEl.classList.add("biosat-snap");
        return () => {
            htmlEl.classList.remove("biosat-snap");
        };
    }, []);

    // Shared reveal observer — drives CSS fade-in when each section
    // enters the viewport (replaces per-element framer-motion observers)
    useEffect(() => {
        if (!("IntersectionObserver" in window)) return;
        const root = rootRef.current;
        if (!root) return;

        const targets = root.querySelectorAll<HTMLElement>(".biosat-fade");
        const io = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("biosat-in");
                        io.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.15 }
        );
        targets.forEach((t) => io.observe(t));
        return () => io.disconnect();
    }, []);

    return (
        <main ref={rootRef} className="relative w-full">
            {/* Hero */}
            <section className="biosat-section h-screen w-full">
                <Hero data={heroData} />
            </section>

            {/* Operations Timeline */}
            <section className="biosat-section biosat-fade h-screen w-full">
                <OperationsTimeline data={otData} />
            </section>

            {/* PM section — mobile only (standalone) */}
            <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                <ProjectManagers data={pmData} />
            </section>

            {/* HLS section — mobile only (standalone) */}
            <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                <HighLevelSpecs data={hlsData} />
            </section>

            {/* Desktop: combined PM + HLS in one snap point */}
            <section className="hidden lg:flex lg:flex-col biosat-section biosat-fade h-screen w-full">
                <div className="flex-1 min-h-0">
                    <ProjectManagers data={pmData} combined />
                </div>
                <div className="flex-1 min-h-0">
                    <HighLevelSpecs data={hlsData} combined />
                </div>
            </section>

            {/* Timeline Carousel */}
            <section className="biosat-section biosat-fade h-screen w-full">
                <TimelineCarousel data={timelineData} />
            </section>

            {/* Since Launch */}
            <section className="biosat-section biosat-fade h-screen w-full">
                <SinceLaunch data={sinceLaunchData} />
            </section>
        </main>
    );
}