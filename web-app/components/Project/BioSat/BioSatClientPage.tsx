"use client";

import { useEffect, useRef } from "react";
import { BigProject, ProjectSection } from "@/sanity/types/project";
import { HerosProjectSection } from "@/sanity/types/components/HerosProjectSection";
import { OtSection } from "@/sanity/types/components/OtSection";
import { HlsSection } from "@/sanity/types/components/HlsSection";
import { TimelineSection } from "@/sanity/types/components/TimelineSection";
import { Pm } from "@/sanity/types/components/PmSection";
import { SinceLaunchSection } from "@/sanity/types/components/SinceLaunchSection";

import Hero from "@/components/General/Hero";
import OperationsTimeline from "@/components/General/OperationsTimeline";
import ProjectManagers from "@/components/General/ProjectManagers";
import HighLevelSpecs from "@/components/General/HighLevelSpecs";
import TimelineCarousel from "@/components/General/TimelineCarousel";
import SinceLaunch from "@/components/General/SinceLaunch";

interface Props {
    project: BigProject;
}

// Typed section finders
const findSection = <T extends ProjectSection>(
    sections: ProjectSection[],
    type: string
): T | undefined =>
    sections.find((s) => s._type === type) as T | undefined;

/**
 * BioSat project page with document-level scroll snap.
 *
 * Scroll model:
 *  - `html.biosat-snap` adds `scroll-snap-type: y mandatory` to the document.
 *  - Each `biosat-section` is 100vh with `scroll-snap-align: start`.
 *  - A page-level IntersectionObserver drives the shared `biosat-fade`
 *    reveal animation — no per-element framer-motion overhead.
 *
 * Sections are resolved from the Sanity `sections[]` array on the project.
 */
export default function BioSatClientPage({ project }: Props) {
    const rootRef = useRef<HTMLElement | null>(null);
    const sections = project.sections ?? [];

    // Pull each typed section from the Sanity array
    const hero = findSection<HerosProjectSection>(sections, "herosProjectSection");
    const ot = findSection<OtSection>(sections, "otSection");
    const pm = findSection<Pm>(sections, "pmSection");
    const hls = findSection<HlsSection>(sections, "hlsSection");
    const timeline = findSection<TimelineSection>(sections, "timelineSection");
    const tsl = findSection<SinceLaunchSection>(sections, "tslSection");

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
            {hero && (
                <section className="biosat-section h-screen w-full">
                    <Hero data={hero} />
                </section>
            )}

            {/* Operations Timeline */}
            {ot && (
                <section className="biosat-section biosat-fade h-screen w-full">
                    <OperationsTimeline data={ot} />
                </section>
            )}

            {/* PM section — mobile only (standalone) */}
            {pm && (
                <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                    <ProjectManagers data={pm} />
                </section>
            )}

            {/* HLS section — mobile only (standalone) */}
            {hls && (
                <section className="lg:hidden biosat-section biosat-fade h-screen w-full">
                    <HighLevelSpecs data={hls} />
                </section>
            )}

            {/* Desktop: combined PM + HLS in one snap point */}
            {pm && hls && (
                <section className="hidden lg:flex lg:flex-col biosat-section biosat-fade h-screen w-full">
                    <div className="flex-1 min-h-0">
                        <ProjectManagers data={pm} combined />
                    </div>
                    <div className="flex-1 min-h-0">
                        <HighLevelSpecs data={hls} combined />
                    </div>
                </section>
            )}

            {/* Timeline Carousel */}
            {timeline && (
                <section className="biosat-section biosat-fade h-screen w-full">
                    <TimelineCarousel data={timeline} />
                </section>
            )}

            {/* Since Launch */}
            {tsl && (
                <section className="biosat-section biosat-fade h-screen w-full">
                    <SinceLaunch data={tsl} />
                </section>
            )}
        </main>
    );
}
