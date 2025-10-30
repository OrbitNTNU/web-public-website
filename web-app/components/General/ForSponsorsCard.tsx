import { ForSponsorsCardType } from "@/sanity/types/forSponsorsCard";
import { motion } from "framer-motion";

interface ForSponsorsCardProps {
  data: ForSponsorsCardType["data"];
}

const ForSponsorsCard = ({ data }: ForSponsorsCardProps) => {
  return (
    <section className="w-full mx-auto px-4 md:px-12 max-w-7xl text-left md:text-center">
      {/* Header */}
      <div>
        <motion.h2
          className="mb-4"
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

      {/* Call to Action */}
      {data.ctaButtons && data.ctaButtons.length > 0 && (
        <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-4">
          {data.ctaButtons.map((button, index) => {
            const buttonColor = button.color;
            const buttonTextColor = button.textColor;
            const buttonHoverColor = button.hoverColor;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2 }}
              >
                <a
                  href={button.url}
                  className={`inline-block px-6 py-3 rounded-md shadow-lg transition-colors duration-300 ${buttonColor} hover:${buttonHoverColor} ${buttonTextColor} hover:opacity-90`}
                >
                  {button.text}
                </a>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ForSponsorsCard;
