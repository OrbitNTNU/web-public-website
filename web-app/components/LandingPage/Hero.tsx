"use client";

import GlobeDots from "@/components/General/GlobeDots";

export const satellites = [
  {
    radius: 1.15,
    speed: 0.6,
    phase: 0,
    color: "var(--color-selfiesat-blue)",
    name: "SelfieSat",
  }, // blue
  {
    radius: 1.2,
    speed: 0.45,
    phase: Math.PI / 2,
    color: "var(--color-framsat-yellow)",
    name: "FramSat 1",
  }, // yellow
  {
    radius: 1.3,
    speed: 0.25,
    phase: Math.PI * 1.5,
    color: "var(--color-framsat-pink)",
    name: "FramSat 1.5",
  }, // red
  {
    radius: 1.25,
    speed: 0.35,
    phase: Math.PI,
    color: "var(--color-biosat-green)",
    name: "BioSat",
  }, // green
];

export default function Hero() {
  return (
    <section className="w-screen h-screen relative overflow-hidden min-h-screen">
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
      <div className="w-full md:w-1/2 absolute top-1/5 sm:top-1/3 p-4 md:p-8 2xl:p-8 flex flex-col justify-center transform -translate-y-1/2 z-10 space-y-4 md:space-y-6">
        <h2 className="text-muted">Your space journey starts here.</h2>
        <h1 className="hidden md:block text-2xl md:text-7xl">Orbit NTNU</h1>
      </div>
      {/* Globe background (video replacement) */}
      <div className="absolute inset-0">
        <GlobeDots speed={0.1} />
      </div>

      {/* Optional dark overlay for contrast */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* <section className="w-full md:w-1/2 absolute top-4/5 sm:top-2/3 p-4 md:p-8 2xl:p-8 flex flex-col justify-center transform -translate-y-1/2 z-10 space-y-4 md:space-y-6">
        {satellites.map((sat, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <div className="h-4 w-4" style={{ backgroundColor: sat.color }} />
            <span>{sat.name}</span>
          </div>
        ))}
      </section> */}
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
