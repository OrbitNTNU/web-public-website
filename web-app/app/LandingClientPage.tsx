"use client";
import { LandingPageSection } from "@/sanity/types/pages/landingPage";
import Hero from "@/components/LandingPage/Hero";
import LargeQuote from "@/components/General/LargeQuote";
import LargeImage from "@/components/General/LargeImage";
import SpanningText from "@/components/General/SpanningText";
import DoubleImages from "@/components/General/DoubleImages";
import Projects from "@/components/General/Projects";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { Loading } from "@/components/General/Layout/Loading";
import SubOrbital from "@/components/General/SubOrbital";
import InstagramEmbed from "@/components/General/InstragramGrid/InstagramEmbed";
import ForSponsorsCard from "@/components/General/ForSponsorsCard";
import TeamOverview, { StrippedTeam } from "@/components/General/TeamOverview";

interface LandingPageProps {
  sections: LandingPageSection[];
  teams: StrippedTeam[];
}

export default function LandingPage({ sections, teams }: LandingPageProps) {
  if (!sections) return <Loading />;

  return (
    <>
    <section className="w-screen h-screen relative overflow-hidden min-h-screen">
      <Hero />
      </section>
      {/* <GlobeDots /> */}
      {sections.map((section) => {
        switch (section._type) {
          case "largeQuote":
            return (
              <LargeQuote
                key={section._key}
                text={section.quote}
                author={section.author}
              />
            );

          case "largeImage":
            return (
              <LargeImage
                key={section._key}
                src={imageBuilder(section.image)}
                alt={section.alt}
                caption={section.caption}
              />
            );

          case "spanningText":
            return <SpanningText key={section._key} text={section.text} />;

          case "doubleImage":
            return (
              <DoubleImages
                key={section._key}
                variant={section.variant}
                src1={imageBuilder(section.image1)}
                alt1={section.alt1 ?? ""}
                title1={section.title1}
                caption1={section.caption1}
                link1={section.link1}
                src2={imageBuilder(section.image2)}
                alt2={section.alt2 ?? ""}
                title2={section.title2}
                caption2={section.caption2}
                link2={section.link2}
              />
            );

          case "doubleImageCollage":
            return (
              <section key={section._key} className="flex flex-col gap-12">
                {section.items?.map((item) => (
                  <DoubleImages
                    key={item._key || Math.random().toString()}
                    variant={item.variant}
                    src1={imageBuilder(item.image1)}
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

          case "projectsShowcase":
            if (section.projectType === "bigProject") {
              return (
                <Projects key={section._key} projects={section.projects} />
              );
            }

            if (section.projectType === "subOrbitalProject") {
              return (
                <SubOrbital key={section._key} projects={section.projects} />
              );
            }

          case "instagramEmbed":
            return <InstagramEmbed key={section._key} />;

          case "joinCard":
            return <TeamOverview key={section._key} strippedTeamData={teams} />;

          case "forSponsorsCardRef":
            return <ForSponsorsCard key={section._key} data={section.data} />;

          default:
            return null;
        }
      })}
    </>
  );
}
