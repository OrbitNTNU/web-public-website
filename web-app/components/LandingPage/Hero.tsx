"use client";



import GlobeDots from "@/components/General/GlobeDots";

export default function Hero() {
    return (
        <section className="w-screen h-screen relative overflow-hidden bg-black">
            {/*
      <video
        src="/landing-video.mp4"
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        style={{ minHeight: "100vh" }}
      >
        Your browser does not support the video tag.
      </video>
      */}

            {/* Globe background (video replacement) */}
            <div className="absolute inset-0">
                <GlobeDots speed={0.25} />
            </div>

            {/* Optional dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none" />

            {/* Arrow Down */}
            <div
                className="cursor-pointer absolute bottom-10 w-full flex items-center justify-center animate-bounce z-10"
                onClick={() =>
                    window.scrollBy({ top: window.innerHeight, behavior: "smooth" })
                }
            >
                <p className="material-icons text-white" style={{ fontSize: "3rem" }}>
                    keyboard_arrow_down
                </p>
            </div>
        </section>
    );
}
