"use client";

import { memo } from "react";
import RotatingPlant from "./RotatingPlant";
import { OtSection } from "@/sanity/types/components/OtSection";

interface Props {
    data: OtSection;
}

// These structural phases describe BioSat's mission. They are intentionally
// kept in source (not CMS-managed) because they reflect the satellite's
// fixed operational sequence, not editorial content.
const phases = [
    {
        title: "Commissioning",
        body: "Get in contact with BioSat. Deploy solar panels.",
    },
    {
        title: "Bio Phase",
        body: "Initiate seed germination mechanism inside BioBox. Turn on growth lights, heaters, and other sensors. Monitor temperature, pressure, humidity, gas composition and plant growth.",
    },
    {
        title: "SDR Phase",
        body: "After the plant has died the second payload (SDR) will monitor noise on the UHF band.",
    },
    {
        title: "De-commissioning",
        body: "De-orbit.",
    },
];

/**
 * Operations timeline — badge label comes from Sanity `otSection.heading`.
 * The phase list is structural content kept in source.
 */
function OperationsTimelineInner({ data }: Props) {
    return (
        <div className="w-full h-full flex items-center px-8 md:px-20 lg:px-32 xl:px-40 py-16">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Text column */}
                <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-md border border-pink-blast/80 bg-pink-blast/10 mb-10">
                        <span className="inline-block h-3 w-3 rounded-full border border-pink-blast" />
                        <span className="text-xl md:text-2xl tracking-wider font-light text-strong">
                            {data.heading}
                        </span>
                    </div>

                    <div className="flex flex-col gap-5 max-w-xl">
                        {phases.map((phase) => (
                            <div
                                key={phase.title}
                                className="text-charcoal-light leading-relaxed"
                            >
                                <span className="text-strong font-semibold">
                                    {phase.title}:
                                </span>{" "}
                                {phase.body}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Plant canvas column */}
                <div className="order-1 lg:order-2 relative w-full aspect-square max-h-[55vh] lg:max-h-[70vh] mx-auto">
                    <RotatingPlant speed={0.4} />
                </div>
            </div>
        </div>
    );
}

const OperationsTimeline = memo(OperationsTimelineInner);
OperationsTimeline.displayName = "OperationsTimeline";

export default OperationsTimeline;
