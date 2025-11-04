"use client";

import FeaturedArticle from "@/components/ArticlesPage/FeaturedArticle";
import RegularArticle from "@/components/ArticlesPage/RegularArticle";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {Article} from "@/sanity/types/pages/articlePage";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isMobile;
}

interface ArticlesClientPageProps {
    articles: Article[];
}

const ArticlesClientPage = ({ articles }: ArticlesClientPageProps) => {
    const isMobile = useIsMobile();

    const sorted = [...articles].sort(
        (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return (
        <section className="w-full mx-auto px-4 md:px-12 max-w-[1600px] my-40 flex flex-col gap-20">
            {/* Featured article */}
            {sorted.slice(0, 1).map((article) => (
                <FeaturedArticle
                    key={article._id}
                    article={article}
                    isMobile={isMobile}
                />
            ))}

            {/* All other articles */}
            <section>
                <motion.h3
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ type: "tween", stiffness: 200 }}
                    className="mb-8 tracking-wider"
                >
                    Our Articles
                </motion.h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sorted.slice(1).map((article) => (
                        <RegularArticle
                            key={article._id}
                            article={article}
                            isMobile={isMobile}
                        />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default ArticlesClientPage;
