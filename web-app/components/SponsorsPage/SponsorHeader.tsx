import { motion } from "framer-motion";

interface SponsorHeaderProps {
  text: string;
  count: number;
}

const SponsorHeader = ({ text, count }: SponsorHeaderProps) => {
  return (
    <div className="px-4 2xl:px-0 flex items-center gap-4 lg:gap-8 w-full">
      {/* Left line */}
      <motion.div
        className="flex-1 h-px bg-gray-300 origin-right"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      <h1 className="whitespace-nowrap">
        {text}
        {count > 1 ? "s" : ""}
      </h1>

      {/* Right line */}
      <motion.div
        className="flex-1 h-px bg-gray-300 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
};

export default SponsorHeader;
