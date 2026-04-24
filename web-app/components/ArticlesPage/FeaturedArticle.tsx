"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Article } from "@/sanity/types/pages/articlePage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { PortableText } from "next-sanity";

interface FeaturedArticleProps {
  article: Article;
  isMobile: boolean;
}

const FeaturedArticle = ({ article, isMobile }: FeaturedArticleProps) => {
  const router = useRouter();
  const imageUrl = imageBuilder(article.mainImage) ?? "/placeholder.jpg";

  const handleNavigate = () => {
    if (article.linkType === "internal") {
      void router.push(`/articles/${article.slug.current}`);
    } else {
      window.open(article.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-auto">
      {/* Text section */}
      <motion.div
        className="w-full md:w-1/2 xl:w-1/3 flex flex-col justify-center my-auto md:p-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: isMobile ? 0 : 0.4,
          duration: 0.5,
        }}
      >
        <span className="text-charcoal-light">
          {new Date(article.publishedAt).toLocaleDateString("en-UK", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          (Latest Article)
        </span>
        <h2 className="my-2">{article.title}</h2>
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
          <a>
            <button
              onClick={handleNavigate}
              className="mt-4 text-cloud-white rounded-md transition-colors duration-200 flex flex-row gap-2 cursor-pointer group"
            >
              Read Full Article
              <span className="material-icons group-hover:translate-x-2 transition duration-300">
                arrow_forward
              </span>
            </button>
          </a>
        </div>
      </motion.div>

      {/* Image section */}
      <motion.div
        className="md:w-1/2 xl:w-2/3 w-full relative flex-shrink-0"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "tween",
          stiffness: 200,
          delay: isMobile ? 0 : 0.2,
          duration: 0.5,
        }}
      >
        <div
          className="w-full pb-[75%] relative overflow-hidden cursor-pointer"
          onClick={handleNavigate}
        >
          <Image
            src={imageUrl}
            alt={article.mainImage?.alt ?? article.title}
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-400 hover:scale-105"
            fill
            priority
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedArticle;
