import { ForSponsorsCardType } from "@/sanity/types/forSponsorsCard";
import { motion } from "framer-motion";

interface ForSponsorsCardProps {
  data: ForSponsorsCardType["data"];
}

const ForSponsorsCard = ({ data }: ForSponsorsCardProps) => {
  return (
    <section className="w-full mx-auto px-4 md:px-12 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {data.title}
        </motion.h1>
        <motion.p
          className="w-full md:w-1/2 text-charcoal-light leading-relaxed md:text-right"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {data.intro}
        </motion.p>
      </div>

    </section>
  );
};

export default ForSponsorsCard;
