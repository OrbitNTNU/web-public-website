"use client";

import Image from "next/image";
import { memo } from "react";
import {HeroData} from "@/components/General/BiosatMock";


interface Props {
    data: HeroData;
}

/**
 * BioSat split hero.
 *
 *  - lg+: 2-column grid. Text on the left, desktop image on the right
 *         with a charcoal → transparent gradient cutaway from the left.
 *  - below lg: vertical stack. Text on top, mobile image below
 *              with a charcoal → transparent gradient cutaway from the top.
 */
function BioSatHeroInner({ data }: Props) {
    const desktopSrc = data.projectImageDesktop;
    const mobileSrc = data.projectImageMobile;

    return (
        <div className="relative w-full h-full overflow-hidden bg-charcoal">
            {/* Desktop: side-by-side */}
            <div className="hidden lg:grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.5fr)] w-full h-full">
                {/* Text column */}
                <div className="relative flex flex-col justify-center px-14 xl:px-24 py-24 bg-charcoal z-10">
                    <h1 className="text-7xl lg:text-7xl xl:text-8xl font-light text-strong mb-4">
                        {data.title}
                    </h1>
                    <p className="text-charcoal-light font-light max-w-md text-2xl leading-relaxed">
                        {data.subtitle}
                    </p>
                </div>

                {/* Image column */}
                <div className="relative overflow-hidden">
                    {desktopSrc && (
                        <Image
                            src={desktopSrc}
                            alt={`${data.title} hero`}
                            fill
                            priority
                            sizes="50vw"
                            className="object-cover"
                        />
                    )}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to right, var(--color-charcoal) 0%, rgba(17,17,19,0.9) 18%, rgba(17,17,19,0) 55%)",
                        }}
                    />
                </div>
            </div>

            {/* Below lg: stacked */}
            <div className="lg:hidden flex flex-col h-full">
                <div
                    className="flex flex-col justify-center px-8 sm:px-12 md:px-16 pt-24 pb-12 bg-charcoal"
                    style={{ flex: "0 0 40%" }}
                >
                    <h1 className="text-6xl sm:text-6xl md:text-6xl font-light text-strong mb-4">
                        {data.title}
                    </h1>
                    <p className="text-charcoal-light font-light text-lg leading-relaxed max-w-md">
                        {data.subtitle}
                    </p>
                </div>

                <div
                    className="relative w-full overflow-hidden"
                    style={{ flex: "1 1 auto", minHeight: 0 }}
                >
                    {mobileSrc && (
                        <Image
                            src={mobileSrc}
                            alt={`${data.title} hero`}
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                        />
                    )}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(to bottom, var(--color-charcoal) 0%, rgba(17,17,19,0.9) 18%, rgba(17,17,19,0) 55%)",
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

const BioSatHero = memo(BioSatHeroInner);
BioSatHero.displayName = "BioSatHero";

export default BioSatHero;