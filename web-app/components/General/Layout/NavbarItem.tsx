import { motion } from "framer-motion";
import Link from "next/link";

interface NavbarItemProps {
  item: { label: string; href: string };
  index: number;
  activeIndex: number;
  detailedLocation: string;
  isBaseWithDetail: boolean;
  isActive: boolean;
  mounted: boolean;
  detailWidth: number;
  detailRef: React.RefObject<HTMLDivElement | null>;
}

export default function NavbarItem({
  item,
  index,
  activeIndex,
  detailedLocation,
  isBaseWithDetail,
  isActive,
  mounted,
  detailWidth,
  detailRef
}: NavbarItemProps) {

  return (
    <motion.div
      key={item.label}
      className="relative inline-block group align-items-center"
      animate={{
        x: detailedLocation && index < activeIndex ? -detailWidth : 0,
      }}
      transition={{ type:"spring", stiffness: 300, damping: 25 }}
    >
      <Link
        href={item.href}
        tabIndex={0}
        className="cursor-pointer text-cloud-white font-medium no-underline uppercase tracking-wider transition-colors duration-200 text-sm"
      >
        {item.label}
      </Link>

      {/* Animated underline */}
      {mounted && (
        <span
          className={`absolute left-0 bottom-0 h-[2px] bg-cloud-white rounded origin-left transition-all duration-300 ease-out
          ${isActive || isBaseWithDetail ? "w-full" : "w-0 group-hover:w-full"}`}
        />
      )}

      {/* Detailed location */}
      {isBaseWithDetail && (
        <motion.div
          ref={detailRef}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 right-full items-center text-charcoal-light whitespace-nowrap flex flex-row gap-2"
        >
          {detailedLocation}
          <span className="material-icons mr-2">chevron_left</span>
        </motion.div>
      )}
    </motion.div>
  );
}
