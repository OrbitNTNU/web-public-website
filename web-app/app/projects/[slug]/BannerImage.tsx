import Image from "next/image";

interface BannerImageProps {
    backgroundSrc: string;
    patchSrc: string;
    colors: string[];
    isBiosat?: boolean;
}

const BannerImage: React.FC<BannerImageProps> = ({ backgroundSrc, patchSrc, colors, isBiosat = false }) => {
    // Build gradient from colors (fallback if not enough)
    const gradient =
        colors && colors.length > 0
            ? `linear-gradient(135deg, 
        ${colors
                .map((c, i) => `${c} ${(i / (colors.length - 1)) * 100}%`)
                .join(", ")}),
       linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.6))`
            : "linear-gradient(135deg, rgba(0,0,0,0.85), rgba(0,0,0,1))";
    const glowGradient =
        colors && colors.length > 0
            ? `radial-gradient(circle at center, 
            ${colors[0]} 0%, 
            ${colors[1] || colors[0]} 40%, 
            ${colors[2] || "transparent"} 80%, 
            transparent 100%)`
            : `radial-gradient(circle at center, #FEAA02 0%, #0E2F4C 60%, transparent 100%)`;

    return (
        <section className="w-screen h-screen overflow-hidden absolute top-0 left-0">
            {/* Background image */}
            <Image
                src={backgroundSrc}
                alt="SelfieSat Hero"
                fill
                className="object-cover absolute inset-0"
                priority
            />

            {!isBiosat && (
                <div
                    className="absolute inset-0"
                    style={{
                        background: gradient,
                        mixBlendMode: "color",
                        opacity: 0.85,
                    }}
                />
            )}

            {!isBiosat && (
                <div className="absolute flex flex-col items-center justify-center inset-0 text-center">
                    <div className="relative">
                        {/* Dynamic soft glow */}
                        <div
                            className="absolute inset-0 blur-3xl rounded-full opacity-100"
                            style={{
                                background: glowGradient,
                                filter: "blur(80px)",
                            }}
                        />

                        {/* Patch image */}
                        <Image
                            src={patchSrc}
                            alt="Patch"
                            width={300}
                            height={300}
                            className="relative z-10 drop-shadow-[0_0_25px_rgba(66,101,179,0.5)]"
                        />
                    </div>
                </div>
            )}
        </section >
    );
};

export default BannerImage;
