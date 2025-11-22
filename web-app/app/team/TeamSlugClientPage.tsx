"use client";

import { Team } from "../team/TeamsClientPage";
import Link from "next/link";
import { useNavbar } from "@/components/General/Layout/NavbarContext";
import { motion } from "framer-motion";
import LargeQuote from "@/components/General/LargeQuote";
import LargeImage from "@/components/General/LargeImage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import DoubleImages from "@/components/General/DoubleImages";
import MemberCard from "@/components/General/MemberCard";
import RegularArticle from "@/components/ArticlesPage/RegularArticle";
import { useIsMobile } from "../articles/ArticleClientPage";
import DoubleImageWide from "@/components/General/DoubleImageWide";
import ImageAndCaption from "@/components/General/ImageAndCaption";
import { GalleryComponent } from "@/components/General/Gallery";
import { TeamPage } from "@/sanity/types/pages/teamsPage";
import { useEffect } from "react";

interface TeamSlugClientPageProps {
  teamDocument: TeamPage;
  team: Team;
}

export default function TeamSlugClientPage({
  teamDocument,
  team,
}: TeamSlugClientPageProps) {
  const { setInfo, resetInfo } = useNavbar();

  useEffect(() => {
    // Set the navbar info based on the team
    setInfo({
      baseHref: "/team",
      detailedLocation: team?.teamName,
    });

    // Reset navbar info when leaving
    return () => resetInfo();
  }, [team]);

  const isMobile = useIsMobile();

  return (
    <section className="w-full max-w-[2000px] mx-auto my-32 md:my-40 flex flex-col gap-20">
      <section className="w-full mx-auto flex flex-col gap-40 md:gap-80">
        <div className="mx-auto flex flex-col gap-8 w-full px-4 md:px-12">
          <Link
            className="flex flex-row gap-2 group cursor-pointer items-center"
            href="/team"
          >
            <span className="material-icons text-3xl transition-transform duration-200 group-hover:-translate-x-2">
              chevron_left
            </span>
            <span>Go back to team</span>
          </Link>
        </div>
        <div className="flex flex-col gap-4 md:items-end px-4 md:px-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {team.teamName}
          </motion.h1>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-charcoal-light w-full md:w-1/2 md:text-right"
          >
            {team.description}
          </motion.span>
        </div>
        {teamDocument.sections?.map((section) => {
          switch (section._type) {
            case "membersSection":
              return (
                <div className="w-full px-4 md:px-12" key={section._key}>
                  <motion.h3
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      type: "tween",
                      stiffness: 200,
                    }}
                    className="mb-8 tracking-wider"
                  >
                    The {team.teamName} Team
                  </motion.h3>
                  <motion.div
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.15 },
                      },
                    }}
                  >
                    {team.members
                      .sort((a, b) => {
                        const order: Record<string, number> = {
                          LEADER: 1,
                          BOARD: 2,
                          MEMBER: 3,
                        };
                        const rankA = order[a.privilege] ?? 99;
                        const rankB = order[b.privilege] ?? 99;
                        if (rankA !== rankB) return rankA - rankB;
                        return a.name.localeCompare(b.name, "en");
                      })
                      .map((member, index) => (
                        <motion.div
                          key={`${member.name}-${team.teamName}`}
                          variants={{
                            hidden: { y: 120, opacity: 0 },
                            visible: {
                              y: 0,
                              opacity: 1,
                              transition: {
                                duration: 0.6,
                                delay: index * 0.1,
                              },
                            },
                          }}
                        >
                          <MemberCard
                            image={member.image ?? ""}
                            memberName={member.name ?? ""}
                            position={member.title ?? ""}
                            phoneNumber={member.phoneNumber ?? ""}
                            linkedin={member.linkedin ?? ""}
                            mail={member.mail ?? ""}
                          />
                        </motion.div>
                      ))}
                  </motion.div>
                </div>
              );

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
                  src={imageBuilder(section.image, {
                    width: 1600,
                    format: "webp",
                    quality: 70,
                  })}
                  alt={section.alt}
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
            case "doubleImageWide":
              return (
                <DoubleImageWide
                  key={section._key}
                  src1={imageBuilder(section.image1, {
                    width: 1600,
                    format: "webp",
                    quality: 70,
                  })}
                  alt1="Double Image Wide"
                  caption1={section.caption1}
                  src2={imageBuilder(section.image2, {
                    width: 1600,
                    format: "webp",
                    quality: 70,
                  })}
                  alt2="Double Image Wide"
                  caption2={section.caption2}
                />
              );

            case "singleImageCollage":
              return (
                <section key={section._key} className="flex flex-col gap-12">
                  {section.items?.map((item, idx) => (
                    <ImageAndCaption
                      key={idx}
                      src={imageBuilder(item.src)}
                      alt={item.alt}
                      title={item.title}
                      caption={item.caption}
                      variant={item.variant}
                      link={item.link}
                    />
                  ))}
                </section>
              );

            case "triImageCollage":
              return <span key={section._key}>TriImageCollage</span>;

            case "flowingTriImageCollage":
              return <span key={section._key}>FlowingTriImageCollage</span>;

            case "articleReference":
              return (
                <div key={section._key} className="w-full px-4 md:px-12 mx-auto">
                  <motion.h3
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "tween", stiffness: 200 }}
                    className="mb-8 tracking-wider"
                  >
                    Check out our articles
                  </motion.h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {section.articles.map((article) => (
                      <RegularArticle
                        key={article._id}
                        article={article}
                        isMobile={isMobile}
                      />
                    ))}
                  </div>
                </div>
              );

            case "gallery":
              return (
                <GalleryComponent key={section._key} images={section.images} />
              );

            default:
              return null;
          }
        })}
      </section>
    </section>
  );
}
