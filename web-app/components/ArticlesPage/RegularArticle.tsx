"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Article } from "@/sanity/types/pages/articlePage";

interface RegularArticleProps {
  article: Article;
  isMobile: boolean;
}

const RegularArticle = ({ article, isMobile }: RegularArticleProps) => {
  const router = useRouter();
  const imageUrl = article.mainImage?.asset?.url ?? "/placeholder.jpg";

  return (
      <motion.div
          className="flex flex-col group cursor-pointer mb-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            type: "tween",
            stiffness: 200,
            delay: isMobile ? 0 : 0.2,
            duration: 0.4,
          }}
          onClick={() => void router.push(`/articles/${article.slug.current}`)}
      >
        <div className="w-full aspect-[4/3] overflow-hidden">
          <Image
              src={imageUrl}
              alt={article.mainImage?.alt ?? article.title}
              className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 aspect-[4/3]"
              width={400}
              height={300}
              priority
          />
        </div>

        <div className="flex flex-col flex-1 mt-4">
          <small className="text-charcoal-light">
            {new Date(article.publishedAt).toLocaleDateString()}
          </small>
          <h3 className="mb-2">{article.title}</h3>
        </div>
      </motion.div>
  );
};

export default RegularArticle;
