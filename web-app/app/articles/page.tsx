'use client';
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockArticles = [
    {
        id: 1,
        title: "Exploring the Final Frontier: Our Latest Satellite Launch",
        summary: "Discover how our student-led team successfully launched a cutting-edge satellite into orbit, marking a significant milestone in our space exploration journey.",
        imageUrl: "/selfiesat/1.JPG",
        link: "/articles/satellite-launch",
        date: "2024-01-15"
    },
    {
        id: 2,
        title: "Behind the Scenes: Designing a CubeSat",
        summary: "Take a deep dive into the design and engineering process of our CubeSat project, showcasing the innovative solutions developed by our talented members.",
        imageUrl: "/tests/2.png",
        link: "/articles/cubesat-design",
        date: "2024-01-16"
    },
    {
        id: 3,
        title: "Inspiring the Next Generation of Space Enthusiasts",
        summary: "Learn about our outreach programs aimed at inspiring young minds to pursue careers in space technology and STEM fields.",
        imageUrl: "/tests/3.png",
        link: "/articles/outreach-programs",
        date: "2024-01-17"
    },
    {
        id: 4,
        title: "Sustainability in Space: Our Approach to Responsible Satellite Design",
        summary: "Explore how we integrate sustainability principles into our satellite projects, ensuring responsible use of resources in space exploration.",
        imageUrl: "/tests/4.png",
        link: "/articles/sustainable-satellite-design",
        date: "2024-01-18"
    },
    {
        id: 5,
        title: "Collaborating for Success: Partnerships that Propel Us Forward",
        summary: "Discover the key partnerships that have been instrumental in advancing our projects and enhancing our impact in the space industry.",
        imageUrl: "/tests/5.jpg",
        link: "/articles/partnerships",
        date: "2024-01-19"
    },
    {
        id: 6,
        title: "The Future of Student-Led Space Missions",
        summary: "Get insights into the future plans and upcoming missions of our student-led organization, as we continue to push the boundaries of space technology.",
        imageUrl: "/tests/6.png",
        link: "/articles/future-missions",
        date: "2024-01-20"
    },
    {
        id: 7,
        title: "From Classroom to Cosmos: How We Train the Next Generation of Space Engineers",
        summary: "Learn about our hands-on training programs that equip students with the skills and experience needed to excel in the space industry.",
        imageUrl: "/tests/7.jpg",
        link: "/articles/training-programs",
        date: "2024-01-21"
    },
    {
        id: 8,
        title: "Innovations in Satellite Technology: Our Latest Breakthroughs",
        summary: "Stay updated on the latest technological advancements and innovations developed by our team in the field of satellite engineering.",
        imageUrl: "/orbitluv.png",
        link: "/articles/satellite-innovations",
        date: "2024-01-22"
    },
    {
        id: 9,
        title: "Mission Accomplished: Highlights from Our Recent Space Endeavors",
        summary: "Reflect on the key achievements and milestones reached by our team in our latest space missions.",
        imageUrl: "/orbitbig.jpg",
        link: "/articles/mission-highlights",
        date: "2024-01-23"
    }
];

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

const ArticlesOverviewPage = () => {
    const router = useRouter();

    const isMobile = useIsMobile();

    return (
        <section className="w-full mx-auto px-4 md:px-12 max-w-[2000px] my-40 flex flex-col">
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
                Our articles
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                {mockArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((article, idx) => (
                    <motion.div
                        key={article.id}
                        className="flex flex-col group cursor-pointer"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: isMobile ? 0 : 0.2 * idx, // 🚀 no delay on mobile
                            duration: 0.4,
                        }}
                        onClick={() => void router.push(`${article.link}`)}
                    >
                        <div className="w-full h-[250px] sm:h-[275px] md:h-[300px] xl:h-[350px] overflow-hidden">
                            <Image
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                                width={400}
                                height={300}
                                priority
                            />
                        </div>
                        <div className="flex flex-col flex-1 mt-4">
                            <time className="text-sm text-charcoal-light" dateTime={article.date}>{article.date}</time>
                            <h4 className="mb-2">{article.title}</h4>
                            <p className="text-charcoal-light flex-1">{article.summary}</p>
                            <span className="mt-4 flex items-center">
                                Read more
                                <span className="material-icons align-middle ml-1">arrow_forward</span>
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

export default ArticlesOverviewPage;