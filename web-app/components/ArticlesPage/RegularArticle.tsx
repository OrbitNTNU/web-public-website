import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

interface RegularArticleProps {
  article: {
    id: number;
    title: string;
    summary: string;
    date: string;
    imageUrl: string;
    link: string;
  };
  isMobile: boolean;
}

const RegularArticle = ({ article, isMobile }: RegularArticleProps) => {
  const router = useRouter();

  return (
    <motion.div
      key={article.id}
      className="flex flex-col group cursor-pointer mb-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: "tween",
        stiffness: 200,
        delay: isMobile ? 0 : 0.2, // 🚀 no delay on mobile
        duration: 0.4,
      }}
      onClick={() => void router.push(`${article.link}`)}
    >
      <div className="w-full aspect-[4/3] overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105 aspect-[4/3]"
          width={400}
          height={300}
          priority
        />
      </div>
      <div className="flex flex-col flex-1 mt-4">
        <small className="text-charcoal-light">{article.date}</small>
        <h3 className="mb-2">{article.title}</h3>
        <p className="text-charcoal-light flex-1">{article.summary}</p>
      </div>
    </motion.div>
  );
};

export default RegularArticle;
