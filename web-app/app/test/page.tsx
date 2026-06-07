"use client";

import { useEffect, useRef } from "react";
import BioSatHero from "@/components/Project/BioSatTest/BioSatHero";
import OperationsTimeline from "@/components/Project/BioSatTest/OperationsTimeline";
import ProjectManagers from "@/components/Project/BioSatTest/ProjectManagers";
import HighLevelSpecs from "@/components/Project/BioSatTest/HighLevelSpecs";
import TimelineCarousel from "@/components/Project/BioSatTest/TimelineCarousel";
import SinceLaunch from "@/components/Project/BioSatTest/SinceLaunch";

/**
 * BioSat frontend test page.
 *
 * Scroll model:
 *  - The DOCUMENT is the scroll container. Sections stack in normal
 *    flow beneath each other so the background scrolls with the
 *    content (no more "sections floating over a fixed background"
 *    effect). See globals.css → `html.biosat-snap`.
 *  - `scroll-snap-type: y mandatory` is applied to <html> via the
 *    `biosat-snap` class that this component toggles on mount.
 *  - Each `biosat-section` is 100vh and a snap anchor.
 *  - The site footer (rendered by the root layout) gets
 *    `scroll-snap-align: end`, so scrolling down past the last section
 *    lands on the footer pinned to the viewport bottom, and scrolling
 *    back up re-engages section snap.
 *
 * Responsive rules:
 *  - PMs and High Level Specs render TWICE: as two independent snap
 *    sections on mobile, and as a single combined snap section split
 *    top/bottom on desktop.
 *
 * Performance:
 *  - Below-fold sections are dynamic-imported and hydrate lazily.
 *  - `content-visibility: auto` on every section skips layout/paint
 *    work for anything off-screen.
 *  - A single page-level IntersectionObserver toggles the reveal
 *    class on each `biosat-fade` element — replacing dozens of
 *    per-element framer-motion observers.
 */

export default function Page() {
    const rootRef = useRef<HTMLElement | null>(null);

    // Enable document-level scroll snap while this route is mounted,
    // and clean up on unmount so other routes don't inherit it.
    useEffect(() => {
        const htmlEl = document.documentElement;
        htmlEl.classList.add("biosat-snap");
        return () => {
            htmlEl.classList.remove("biosat-snap");
        };
    }, []);

    // Shared reveal observer — drives a single CSS fade-in per section
    // when it enters the viewport. We observe against the viewport
    // (root: null) because the document is the scroll container now.
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
            <section className="biosat-section h-screen w-full">
                <BioSatHero />
            </section>

            <section className="biosat-section biosat-fade h-screen w-full">
                <OperationsTimeline />
            </section>

            {/* Mobile: PMs alone */}
            <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                <ProjectManagers />
            </section>

            {/* Mobile: Specs alone */}
            <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                <HighLevelSpecs />
            </section>

            {/* Desktop: combined — top half PMs, bottom half Specs, one snap point */}
            <section className="hidden lg:flex lg:flex-col biosat-section biosat-fade h-screen w-full">
                <div className="flex-1 min-h-0">
                    <ProjectManagers combined />
                </div>
                <div className="flex-1 min-h-0">
                    <HighLevelSpecs combined />
                </div>
            </section>

            <section className="biosat-section biosat-fade h-screen w-full">
                <TimelineCarousel />
            </section>

            <section className="biosat-section biosat-fade h-screen w-full">
                <SinceLaunch
                    lastLaunchDate="2024-05-01T12:00:00Z"
                />
            </section>
        </main>
    );
}
