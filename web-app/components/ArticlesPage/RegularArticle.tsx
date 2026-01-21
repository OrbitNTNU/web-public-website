"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Article } from "@/sanity/types/pages/articlePage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { PortableText } from "next-sanity";
import Link from "next/link";

interface RegularArticleProps {
  article: Article;
  isMobile: boolean;
}

const RegularArticle = ({ article, isMobile }: RegularArticleProps) => {
  const imageUrl = imageBuilder(article.mainImage) ?? "/placeholder.jpg";

  const href =
    article.linkType === "internal"
      ? `/articles/${article.slug.current}`
      : article.link;

  const isExternal = article.linkType === "external";

  return (
    <motion.div
      className="flex flex-col group mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "tween",
        stiffness: 200,
        delay: isMobile ? 0 : 0.2,
        duration: 0.4,
      }}
    >
      <Link
        className="w-full aspect-[4/3] overflow-hidden z-20"
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        <Image
          src={imageUrl}
          alt={article.mainImage?.alt ?? article.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 aspect-[4/3]"
          width={400}
          height={300}
          priority
        />
      </Link>

      <div className="flex flex-col flex-1 mt-4">
        <small className="text-charcoal-light">
          {new Date(article.publishedAt).toLocaleDateString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </small>
        <h3 className="mb-2">{article.title}</h3>
        <div className="text-charcoal-light flex flex-col gap-2 mb-4 md:mb-0">
          <PortableText value={article.teaser} />
        </div>
      </div>
    </motion.div>
  );
};

export default RegularArticle;
