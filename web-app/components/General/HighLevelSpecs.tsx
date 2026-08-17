"use client";

import { memo } from "react";
import {HlsData} from "@/components/General/BiosatMock";


type Props = {
    data: HlsData;
    combined?: boolean;
};

function HighLevelSpecsInner({ data, combined = false }: Props) {
    const items = data.hls ?? [];

    return (
        <div
            className={`w-full h-full flex flex-col justify-center px-8 md:px-20 lg:px-32 xl:px-40 ${
                combined ? "py-4 lg:py-2" : "py-16"
            }`}
        >
            <h2
                className={`text-5xl leading-[72px] md:text-5xl lg:text-6xl font-light text-strong text-right ${
                    combined ? "mb-6 lg:mb-8" : "mb-10 lg:mb-14"
                }`}
            >
                {data.title}
            </h2>

            {/* Desktop horizontal grid */}
            <div
                className="hidden md:grid gap-6 md:gap-10 relative"
                style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
            >
                <div className="absolute top-0 left-0 right-0 h-px bg-charcoal-light/30" />
                {items.map((item) => (
                    <div key={item.hlsHeader} className="flex flex-col pt-3">
                        <span className="text-charcoal-light text-xs mb-5">
                            {item.hlsHeader}
                        </span>
                        <span className="text-base font-light lg:text-lg">
                            {item.hlsBody}
                        </span>
                    </div>
                ))}
            </div>

            {/* Mobile stacked list */}
            <div className="md:hidden flex flex-col divide-y divide-charcoal-light/20">
                {items.map((item) => (
                    <div key={item.hlsHeader} className="py-4 flex flex-col">
                        <span className="text-charcoal-light text-xs mb-5">
                            {item.hlsHeader}
                        </span>
                        <span className="font-light text-base">
                            {item.hlsBody}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const HighLevelSpecs = memo(HighLevelSpecsInner);
HighLevelSpecs.displayName = "HighLevelSpecs";

export default HighLevelSpecs;