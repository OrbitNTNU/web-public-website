"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import type { Article } from "@/sanity/types/pages/articlePage";

interface FeaturedArticleProps {
  article: Article;
  isMobile: boolean;
}

const FeaturedArticle = ({ article, isMobile }: FeaturedArticleProps) => {
  const router = useRouter();
  const imageUrl = article.mainImage?.asset?.url ?? "/placeholder.jpg";

  return (
    <div className="flex flex-col md:flex-row h-auto md:h-auto">
      {/* Text section */}
      <motion.div
        className="w-full md:w-1/3 flex flex-col justify-center my-auto px-0 py-6 md:p-6"
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
        <time className="text-charcoal-light" dateTime={article.publishedAt}>
          {new Date(article.publishedAt).toLocaleDateString()} (Latest Article)
        </time>
        <h2 className="mb-2">{article.title}</h2>
      </motion.div>

      {/* Image section */}
      <motion.div
        className="md:w-2/3 w-full relative flex-shrink-0"
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
          onClick={() => void router.push(`/articles/${article.slug.current}`)}
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
