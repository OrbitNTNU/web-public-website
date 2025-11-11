import { BronzeSponsor } from "@/sanity/types/sponsorsPage";
import Image from "next/image";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Link from "next/link";

interface BronzeSponsorsProps {
  sponsors: BronzeSponsor[];
}

const BronzeSponsors = ({ sponsors }: BronzeSponsorsProps) => {
  return (
    <div className="flex items-center flex-col gap-20">
      <h1>{`Bronze sponsor` + (sponsors.length > 1 ? "s" : "")}</h1>
      <section className="w-full px-4 md:px-12 mx-auto flex flex-row justify-center flex-wrap">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key}
            className="w-full md:w-1/4 justify-start items-center flex flex-col gap-8 px-0 py-8 md:p-8"
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
              />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BronzeSponsors;
