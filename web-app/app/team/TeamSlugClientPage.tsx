"use client";

import DoubleImages from "@/components/General/DoubleImages";
import LargeImage from "@/components/General/LargeImage";
import LargeQuote from "@/components/General/LargeQuote";
import { TeamPage } from "@/sanity/types/pages/teamsPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";

interface TeamSlugClientPageProps {
  teamDocument: TeamPage;
}

export default function TeamSlugClientPage({ teamDocument }: TeamSlugClientPageProps) {

  console.log(teamDocument)
  
  return (
      <>
        {teamDocument.sections.map((section) => {
          switch (section._type) {
            case "largeQuote":
              return <LargeQuote key={section._key} text={section.quote} />;
  
            case "largeImage":
              return (
                <LargeImage
                  key={section._key}
                  src={imageBuilder(section.image, {
                    width: 1600,
                    format: "webp",
                    quality: 70,
                  })}
                  alt="Large Image"
                  caption={section.caption}
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
                        width: 1200,
                        format: "webp",
                        quality: 70,
                      })}
                      alt1={item.alt1 ?? ""}
                      title1={item.title1}
                      caption1={item.caption1}
                      link1={item.link1}
                      src2={imageBuilder(item.image2, {
                        width: 1200,
                        format: "webp",
                        quality: 70,
                      })}
                      alt2={item.alt2 ?? ""}
                      title2={item.title2}
                      caption2={item.caption2}
                      link2={item.link2}
                    />
                  ))}
                </section>
              );
  
            default:
              return null;
          }
        })}
      </>
    );
}
