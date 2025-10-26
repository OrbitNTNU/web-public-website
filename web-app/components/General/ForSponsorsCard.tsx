import { motion } from "framer-motion";

const ForSponsorsCard = () => {
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
                    Partner with Us
                </motion.h2>
                <motion.p
                    className="mb-10 w-full md:w-2/3 text-charcoal-light mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    By sponsoring Orbit NTNU, you&apos;re not just supporting a student organization; you&apos;re investing in the future of space exploration and technology. Join us on this exciting journey and help shape the next generation of innovators.
                </motion.p>
            </div>

            {/* Call to Action */}
            <span className="flex flex-row gap-4 justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 }}
                >
                    <a
                        href="/sponsor/about"
                        className="inline-block bg-emerald-fizz text-charcoal px-6 py-3 rounded-md shadow-lg hover:bg-sky-mint transition-colors duration-300"
                    >
                        Learn More About Sponsorship
                    </a>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 }}
                >
                    <a
                        href="/sponsors"
                        className="inline-block bg-pink-blast text-cloud-white px-6 py-3 rounded-md shadow-lg hover:bg-dark-pink transition-colors duration-300"
                    >
                        See Our Current Sponsors
                    </a>
                </motion.div>
            </span>

        </section>
    );
};

export default ForSponsorsCard;