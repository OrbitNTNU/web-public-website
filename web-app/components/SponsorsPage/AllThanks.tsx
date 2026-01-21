import Image from "next/image";
import {
  BronzeSponsor,
  GoldSponsor,
  MainSponsor,
  PartnerSponsor,
  PlatinumSponsor,
  SilverSponsor,
} from "@/sanity/types/sponsorsPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { motion } from "framer-motion";

interface AllThanksProps {
  sponsors: (
    | MainSponsor
    | PlatinumSponsor
    | GoldSponsor
    | SilverSponsor
    | BronzeSponsor
    | PartnerSponsor
  )[];
}

const AllThanks = ({ sponsors }: AllThanksProps) => {
  const handleClick = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <section className="w-full px-4 md:px-12 mx-auto">
      <motion.h1
        className="mb-8 flex items-center gap-2 text-cloud-white text-center justify-center flex-col"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Thank you
        <p className="text-charcoal-light">
          For all your support and dedication to helping us succeed.
        </p>
      </motion.h1>
      <div
        className="w-full columns-2 md:columns-3 lg:columns-4 2xl:columns-5 gap-6 [column-fill:_balance]"
      >
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key || sponsor.name}
            className={`mb-6 break-inside-avoid flex justify-center items-center cursor-pointer hover:scale-105 transition-transform duration-300`}
            onClick={() => handleClick(sponsor.website)}
          >
            <Image
              src={imageBuilder(sponsor.logo)}
              alt={`${sponsor.name} logo`}
              width={400}
              height={200}
              className="object-contain w-full h-auto"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllThanks;
