import { PartnerSponsor } from "@/sanity/types/sponsorsPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Image from "next/image";
import Link from "next/link";

interface PartnerSponsorsProps {
  sponsors: PartnerSponsor[];
}

const PartnerSponsors = ({ sponsors }: PartnerSponsorsProps) => {
  return (
    <div className="flex items-center flex-col gap-20">
      <h1>{`Partner` + (sponsors.length > 1 ? "s" : "")}</h1>
      <section className="w-full px-4 md:px-12 mx-auto flex flex-row justify-center flex-wrap">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key}
            className="w-full md:w-1/5 justify-start items-center flex flex-col gap-8 px-0 py-4 md:p-4"
          >
            <Link
              href={sponsor.website || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={imageBuilder(sponsor.logo)}
                alt={`${sponsor.name} logo`}
                width={400}
                height={600}
                className="aspect-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PartnerSponsors;
