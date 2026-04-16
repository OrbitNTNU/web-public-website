"use client";

import SDGs from "@/components/AboutPage/SDGs/SDGs";
import Statistics from "@/components/AboutPage/Statistics/Statistics";
import DoubleImages from "@/components/General/DoubleImages";
import ImageAndCaption from "@/components/General/ImageAndCaption";
import LargeImage from "@/components/General/LargeImage";
import LargeQuote from "@/components/General/LargeQuote";
import SpanningText from "@/components/General/SpanningText";
import TriImageCollage from "@/components/General/TriImageCollage";
import { Loading } from "@/components/General/Layout/Loading";
import { AboutPageSection } from "@/sanity/types/pages/aboutPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { StatisticsResponse } from "@/lib/getStatistics";

export default function AboutClientPage({
  sections,
  statistics,
}: {
  sections: AboutPageSection[];
  statistics: StatisticsResponse | undefined;
}) {
  const [typedKeys, setTypedKeys] = useState<string>("");
  const router = useRouter();

  // Easter egg: type "stars" to go to /about/stars
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setTypedKeys((prev) => (prev + e.key).slice(-5)); // only keep last 5 keys
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    // Reset typed keys after 5 seconds of inactivity
    if (typedKeys.toLowerCase() === "stars") {
      router.push("/about/our-stars?from=about");
    }
  }, [typedKeys]);

  if (!sections || !statistics) {
    return <Loading />;
  }

  return (
    <div className="w-full relative max-w-7xl mx-auto gap-40 my-40 flex flex-col">
      {sections.map((section: AboutPageSection) => {
        switch (section._type) {
          case "largeQuote":
            return (
              <LargeQuote
                key={section._key}
                text={section.quote}
                author={section.author}
              />
            );
          case "triImageCollage":
            return (
              <TriImageCollage
                key={section._key}
                title={section.title}
                caption={section.caption}
                wideCaption={section.wideCaption}
                src1={imageBuilder(section.src1, {
                  width: 1800,
                  quality: 75,
                  format: "webp"})}
                alt1={section.alt1}
                src2={imageBuilder(section.src2, {
                  width: 1800,
                  quality: 75,
                  format: "webp"})}
                alt2={section.alt2}
                src3={imageBuilder(section.src3, {
                  width: 1800,
                  quality: 75,
                  format: "webp"})}
                alt3={section.alt3}
                variant={section.variant}
              />
            );
          case "doubleImage":
            return (
              <DoubleImages
                key={section._key}
                variant={section.variant}
                src1={imageBuilder(section.image1, {
                  width: 1800,
                  quality: 75,
                  format: "webp",
                })}
                alt1={section.alt1 ?? ""}
                title1={section.title1}
                caption1={section.caption1}
                src2={imageBuilder(section.image2, {
                  width: 1800,
                  quality: 75,
                  format: "webp",
                })}
                alt2={section.alt2 ?? ""}
                title2={section.title2}
                caption2={section.caption2}
              />
            );
          case "doubleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item) => (
                  <DoubleImages
                    key={item._key || Math.random().toString()}
                    variant={item.variant}
                    src1={imageBuilder(item.image1, {
                      width: 1800,
                      quality: 75,
                      format: "webp",
                    })}
                    alt1={item.alt1 ?? ""}
                    title1={item.title1}
                    caption1={item.caption1}
                    link1={item.link1}
                    src2={imageBuilder(item.image2, {
                      width: 1800,
                      quality: 75,
                      format: "webp",
                    })}
                    alt2={item.alt2 ?? ""}
                    title2={item.title2}
                    caption2={item.caption2}
                    link2={item.link2}
                  />
                ))}
              </section>
            );
          case "singleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item, idx) => (
                  <ImageAndCaption
                    key={idx}
                    src={imageBuilder(item.src, {
                      width: 1800,
                      quality: 75,
                      format: "webp",
                    })}
                    alt={item.alt}
                    title={item.title}
                    caption={item.caption}
                    variant={item.variant}
                    link={item.link}
                  />
                ))}
              </section>
            );

          case "largeImage":
            return (
              <LargeImage
                key={section._key}
                src={imageBuilder(section.image, {
                  width: 1800,
                  quality: 75,
                  format: "webp",
                })}
                alt={section.alt}
                caption={section.caption}
              />
            );

          case "spanningText":
            return <SpanningText key={section._key} text={section.text} />;

          case "statistics":
            return <Statistics key={section._key} statistics={statistics} />;
          case "sdgSection":
            return <SDGs key={section._key} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
