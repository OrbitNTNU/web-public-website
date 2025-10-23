// components/team/HeroSection.tsx
import { type HeroSection } from "@/sanity/types/teams";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Image from "next/image";

interface HeroSectionProps {
  content: HeroSection
}

const HeroSectionRender = ({ content }: HeroSectionProps) => {
  const { title, subtitle, backgroundImage, video } = content;

  return (
    <section className="relative h-[500px] flex items-center justify-center text-white">
      {backgroundImage && (
        <Image
          src={imageBuilder(backgroundImage)}
          alt={title}
          fill
          className="object-cover mt-4 md:mt-8 rounded-xl"
          priority
          style={{
            colorAdjust: 'exact',
          }}
        />
      )}
      {/* Gradient overlay */}
      <div
        className="absolute top-4 md:top-8 left-0 w-full h-full rounded-xl pointer-events-none"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 80%, rgba(0,0,0,0.2) 100%)",
          zIndex: 5,
        }}
      />
      <div className="relative z-10 text-left w-full ">
        <h1 className="font-merriweather">{title}</h1>
        {subtitle && <p className="md:ml-4 text-muted">{subtitle}</p>}
      </div>
      {video && (
        <video
          src={video}
          autoPlay
          muted
          loop
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}
    </section>
  );
};

export default HeroSectionRender;