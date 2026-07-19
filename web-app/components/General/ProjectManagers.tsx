"use client";

import Image from "next/image";
import { PortableText } from "next-sanity";
import { memo } from "react";
import { Pm } from "@/sanity/types/components/PmSection";
import { imageBuilder } from "@/sanity/utils/imageBuilder";

type Props = {
    data: Pm;
    combined?: boolean;
};

const toDate = (value: string): Date | null => {
    if (!value) return null;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "numeric",
});

const formatPeriod = (start: string, end?: string | null): string => {
    const startDate = toDate(start);
    const endDate = end ? toDate(end) : null;
    const startLabel = startDate ? dateFormatter.format(startDate) : null;
    const endLabel = endDate ? dateFormatter.format(endDate) : "d.d.";
    if (!startLabel) return endLabel;
    return `${startLabel} - ${endLabel}`;
};

function ProjectManagersInner({ data, combined = false }: Props) {
    const cards = data.pmCards ?? [];

    return (
        <div
            className={`w-full h-full flex items-center px-8 md:px-20 lg:px-32 xl:px-40 ${
                combined ? "py-4 lg:py-2" : "py-16"
            }`}
        >
            <div
                className={`w-full grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] ${
                    combined ? "gap-8 lg:gap-14" : "gap-12 lg:gap-20"
                } items-center content-center`}
            >
                <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-strong mb-[16px] lg:mb-6">
                        {data.title}
                    </h2>
                    <div className="text-charcoal-light leading-relaxed max-w-lg text-sm md:text-base">
                        <PortableText value={data.body} />
                    </div>
                </div>

                {/* Desktop card row */}
                <div className="hidden md:grid grid-cols-5 gap-4 lg:gap-6 items-end">
                    {cards.map((pm, i) => {
                        const isCurrent = !pm.pmPeriodEnd;
                        const imgSrc = imageBuilder(pm.pmImage, {
                            width: isCurrent ? 480 : 280,
                            quality: 80,
                            format: "webp",
                            fit: "crop",
                        });

                        return (
                            <div
                                key={i}
                                className={`group flex flex-col ${
                                    isCurrent ? "col-span-2" : "col-span-1 lg:pb-4"
                                }`}
                            >
                                <div
                                    className={`relative w-full overflow-hidden rounded-sm ${
                                        isCurrent
                                            ? combined
                                                ? "aspect-[3/4] max-h-[32vh] ring-1 ring-biosat-green/50"
                                                : "aspect-[3/4] max-h-[44vh] ring-1 ring-biosat-green/50"
                                            : combined
                                            ? "aspect-[3/4] max-h-[26vh]"
                                            : "aspect-[3/4] max-h-[36vh]"
                                    }`}
                                >
                                    {imgSrc && (
                                        <Image
                                            src={imgSrc}
                                            alt={pm.pmName}
                                            fill
                                            sizes={
                                                isCurrent
                                                    ? "(min-width: 1024px) 420px, 45vw"
                                                    : "(min-width: 1024px) 200px, 22vw"
                                            }
                                            loading="lazy"
                                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    {isCurrent && (
                                        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] tracking-wider text-biosat-green uppercase">
                                            <span className="h-1.5 w-1.5 rounded-full bg-biosat-green" />
                                            Current
                                        </span>
                                    )}
                                </div>
                                <div className="mt-2 lg:mt-3">
                                    <p className={`text-strong ${isCurrent ? "text-base lg:text-lg" : "text-sm"}`}>
                                        {pm.pmName}
                                    </p>
                                    <p className="text-charcoal-light text-xs mt-0.5">
                                        {formatPeriod(pm.pmPeriodStart, pm.pmPeriodEnd)}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Mobile horizontal scroller */}
                <div className="md:hidden -mx-8">
                    <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-8 no-scrollbar">
                        {cards.map((pm, i) => {
                            const isCurrent = !pm.pmPeriodEnd;
                            const imgSrc = imageBuilder(pm.pmImage, {
                                width: 320,
                                quality: 80,
                                format: "webp",
                                fit: "crop",
                            });

                            return (
                                <div
                                    key={i}
                                    className={`flex-none snap-center ${isCurrent ? "w-[70%]" : "w-[50%]"}`}
                                >
                                    <div
                                        className={`relative w-full overflow-hidden rounded-sm ${
                                            isCurrent
                                                ? "aspect-[4/5] ring-2 ring-biosat-green/50"
                                                : "aspect-[3/4]"
                                        }`}
                                    >
                                        {imgSrc && (
                                            <Image
                                                src={imgSrc}
                                                alt={pm.pmName}
                                                fill
                                                sizes={isCurrent ? "45vw" : "30vw"}
                                                loading="lazy"
                                                className="object-cover"
                                            />
                                        )}
                                        {isCurrent && (
                                            <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] tracking-wider text-biosat-green uppercase">
                                                <span className="h-1.5 w-1.5 rounded-full bg-biosat-green" />
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <p className={`text-strong ${isCurrent ? "text-base" : "text-sm"}`}>
                                            {pm.pmName}
                                        </p>
                                        <p className="text-charcoal-light text-xs mt-1">
                                            {formatPeriod(pm.pmPeriodStart, pm.pmPeriodEnd)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

const ProjectManagers = memo(ProjectManagersInner);
ProjectManagers.displayName = "ProjectManagers";

export default ProjectManagers;
