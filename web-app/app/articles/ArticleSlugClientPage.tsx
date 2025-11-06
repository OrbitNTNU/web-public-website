"use client";

import TextHeavy from "@/components/ArticlesPage/TextHeavy";
import DoubleImages from "@/components/General/DoubleImages";
import ImageAndCaption from "@/components/General/ImageAndCaption";
import LargeImage from "@/components/General/LargeImage";
import LargeQuote from "@/components/General/LargeQuote";
import { useNavbar } from "@/components/General/Layout/NavbarContext";
import SpanningText from "@/components/General/SpanningText";
import TriImageCollage from "@/components/General/TriImageCollage";
import { Article } from "@/sanity/types/pages/articlePage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ArticleSlugClientPageProps {
  article: Article;
}

const ArticleSlugClientPage = ({ article }: ArticleSlugClientPageProps) => {
  const router = useRouter();
  const { setInfo, resetInfo } = useNavbar();

  useEffect(() => {
    // Set the navbar info based on the article
    setInfo({
      baseHref: "/articles",
      detailedLocation: article?.title,
    });

    // Reset navbar info when leaving
    return () => resetInfo();
  }, [article]);

  return (
    <section className="w-full mx-auto px-4 md:px-12 max-w-[1600px] my-32 md:my-40 flex flex-col gap-8">
      <div className="flex flex-col gap-8">
        <Link
          className="flex flex-row gap-2 group cursor-pointer items-center"
          href="/articles"
        >
          <span className="material-icons text-3xl transition-transform duration-200 group-hover:-translate-x-2">
            chevron_left
          </span>
          <span>Go back to articles</span>
        </Link>
        <div className="flex flex-col gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {article.title}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="z-10"
          >
            <Image
              src={imageBuilder(article.mainImage)}
              alt={article.mainImage.alt || "Article Main Image"}
              width={1600}
              height={900}
              className="w-full h-auto"
            />
          </motion.div>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-charcoal-light"
          >
            {"Published on " +
              new Date(article.publishedAt).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </motion.span>
        </div>
      </div>
      <section className="max-w-7xl mx-auto flex flex-col gap-40 mt-20">
        {article.sections?.map((section) => {
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

            case "spanningText":
              return <SpanningText key={section._key} text={section.text} />;

            case "doubleImage":
              return (
                <DoubleImages
                  key={section._key}
                  variant={section.variant}
                  src1={imageBuilder(section.image1, {
                    width: 1200,
                    format: "webp",
                    quality: 70,
                  })}
                  alt1={section.alt1 ?? ""}
                  title1={section.title1}
                  caption1={section.caption1}
                  link1={section.link1}
                  src2={imageBuilder(section.image2, {
                    width: 1200,
                    format: "webp",
                    quality: 70,
                  })}
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

            case "imageAndCaption":
              return (
                <ImageAndCaption
                  key={section._key}
                  src={imageBuilder(section.src)}
                  alt={section.alt}
                  title={section.title}
                  caption={section.caption}
                  wideCaption={section.wideCaption}
                  variant={section.variant}
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
                    />
                  ))}
                </section>
              );
            case "triImageCollage":
              return (
                <TriImageCollage
                  key={section._key}
                  title={section.title}
                  caption={section.caption}
                  wideCaption={section.wideCaption}
                  src1={imageBuilder(section.src1)}
                  alt1={section.alt1}
                  src2={imageBuilder(section.src2)}
                  alt2={section.alt2}
                  src3={imageBuilder(section.src3)}
                  alt3={section.alt3}
                  variant={section.variant}
                />
              );
            case "textHeavy":
              return <TextHeavy key={section._key} content={section.content} />;
            default:
              return null;
          }
        })}
      </section>
    </section>
  );
};

export default ArticleSlugClientPage;
