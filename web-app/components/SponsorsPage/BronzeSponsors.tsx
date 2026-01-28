import { BronzeSponsor } from "@/sanity/types/sponsorsPage";
import Image from "next/image";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Link from "next/link";
import SponsorHeader from "./SponsorHeader";

interface BronzeSponsorsProps {
  sponsors: BronzeSponsor[];
}

const BronzeSponsors = ({ sponsors }: BronzeSponsorsProps) => {
  return (
    <div className="flex items-center flex-col gap-4 md:gap-12">
      <SponsorHeader 
        text="Bronze sponsor"
        count={sponsors.length}
      />
      <section className="w-full px-4 md:px-12 mx-auto justify-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key}
            className="w-full justify-start items-center flex flex-col gap-8"
          >
            <Link
              href={sponsor.website || "#"}
              target="_blank"
              className="h-[120px] flex items-center justify-center"
            >
              <Image
                src={imageBuilder(sponsor.logo)}
                alt={`${sponsor.name} logo`}
                width={400}
                height={600}
                className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BronzeSponsors;
