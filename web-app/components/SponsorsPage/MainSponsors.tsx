import { MainSponsor } from "@/sanity/types/sponsorsPage";
import Image from "next/image";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { motion } from "framer-motion";
import SponsorHeader from "./SponsorHeader";

interface MainSponsorsProps {
  sponsors: MainSponsor[];
}

const MainSponsors = ({ sponsors }: MainSponsorsProps) => {
  return (
    <div className="flex items-center flex-col gap-4 md:gap-12">
      <SponsorHeader 
        text="Main sponsor"
        count={sponsors.length}
      />
      <section className="w-full px-4 md:px-12 mx-auto flex flex-row items-center justify-center flex-wrap">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key}
            className="w-full sm:w-1/2 lg:w-2/3 justify-center items-center flex flex-col lg:flex-row gap-8 px-0 py-4 md:p-4"
          >
            <Link
              href={sponsor.website || "#"}
              target="_blank"
              rel="noopener noreferrer w-full"
              className="w-full lg:w-1/3"
            >
                <Image
                    src={imageBuilder(sponsor.logo, {
                        width: 400,
                        quality: 100,
                        format: "webp",
                    })}
                    alt={`${sponsor.name} logo`}
                    width={400}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
                />
            </Link>
            <section className="flex flex-col gap-4 w-full lg:w-2/3">
              <h2>{sponsor.name}</h2>
              <PortableText
                value={sponsor.description ?? []}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="text-charcoal-light">{children}</p>
                    ),
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-charcoal-light pl-4 itali text-slate my-4">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <pre className="bg-gray-100 text-sm p-3 rounded-md overflow-x-auto my-3">
                        <code>{children}</code>
                      </pre>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside ml-4 mb-2 text-charcoal-light">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside ml-4 mb-2 text-charcoal-light">
                        {children}
                      </ol>
                    ),
                  },
                  marks: {
                    strong: ({ children }) => (
                      <strong className="font-semibold text-cloud-white">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-cloud-white">{children}</em>
                    ),
                    code: ({ children }) => (
                      <code className="bg-gray-200 rounded px-1 py-0.5 text-sm">
                        {children}
                      </code>
                    ),
                    link: ({ value, children }) => {
                      const target = (value?.href || "").startsWith("http")
                        ? "_blank"
                        : undefined;
                      return (
                        <a
                          href={value?.href}
                          target={target}
                          rel={
                            target === "_blank"
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="text-blue-600 hover:underline"
                        >
                          {children}
                        </a>
                      );
                    },
                  },
                }}
              />
            </section>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MainSponsors;
