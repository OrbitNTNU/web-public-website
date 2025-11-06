"use client";
import { useRouter } from "next/navigation";
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
        href={`/articles/${article.slug.current}`}
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
          <PortableText
            value={article.teaser}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-charcoal-light">{children}</p>
                ),
                h1: ({ children }) => <h1>{children}</h1>,
                h2: ({ children }) => <h2>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-charcoal-light pl-4 itali text-slate my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <pre className="bg-gray-100 text-sm p-3 rounded-md overflow-x-auto my-3">
                    <code>{children}</code>
                  </pre>
                ),
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-disc list-inside ml-4 mb-2 text-charcoal-light">
                    {children}
                  </ul>
                ),
                number: ({ children }) => (
                  <ol className="list-decimal list-inside ml-4 mb-2 text-charcoal-light">
                    {children}
                  </ol>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className="font-semibold text-cloud-white">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-cloud-white">{children}</em>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-200 rounded px-1 py-0.5 text-sm">
                    {children}
                  </code>
                ),
                link: ({ value, children }) => {
                  const target = (value?.href || "").startsWith("http")
                    ? "_blank"
                    : undefined;
                  return (
                    <a
                      href={value?.href}
                      target={target}
                      rel={
                        target === "_blank" ? "noopener noreferrer" : undefined
                      }
                      className="text-blue-600 hover:underline"
                    >
                      {children}
                    </a>
                  );
                },
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default RegularArticle;
