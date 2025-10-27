"use client";
import { JoinCardType } from "@/sanity/types/joinCard";
import { motion } from "framer-motion";

interface JoinCardProps {
    data: JoinCardType["data"];
}

const JoinCard = ({ data }: JoinCardProps) => {

    return (
        <section className="w-full mx-auto px-4 md:px-12 max-w-7xl text-left md:text-center">
            {/* Header */}
            <div>
                <motion.h2 className="mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {data.title}
                </motion.h2>
                <motion.p
                    className="mb-10 w-full md:w-2/3 text-charcoal-light mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    {data.intro}
                </motion.p>
            </div>

            {/* Disciplines */}
            <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
                {data.disciplines.map((item, i) => (
                    <motion.div
                        key={i}
                        className="shadow-md border-1 border-charcoal-light rounded-md p-6 flex flex-col"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}

                    >
                        <div
                            className={`mb-4 material-icons ${item.color}`}
                            style={{ fontSize: "3rem" }}
                        >
                            {item.icon}
                        </div>
                        <h3 className="mb-2">{item.title}</h3>
                        <p className="text-charcoal-light leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Benefits */}
            <h3 className="mb-8 tracking-wider">What we offer:</h3>
            <div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
                {data.benefits.map((item, i) => (
                    <motion.div
                        key={i}
                        className="shadow-md border-1 border-charcoal-light rounded-md p-6 flex flex-col"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: 0.2 * i,
                        }}
                    >
                        <div
                            className={`mb-4 material-icons ${item.color}`}
                            style={{ fontSize: "2rem" }}
                        >
                            {item.icon}
                        </div>
                        <h4 className="mb-1">{item.title}</h4>
                        <p className="text-charcoal-light">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8 md:mt-12">
                <a
                    href={data.ctaUrl}
                    className="bg-berry-blast hover:bg-sky-mint text-cloud-white py-4 px-8 rounded-md shadow-lg transition-colors duration-300"
                >
                    {data.ctaText}
                </a>
            </div>
        </section>
    );
};

export default JoinCard;
