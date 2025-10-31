import { SilverSponsor } from "@/sanity/types/sponsorsPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { PortableText } from "next-sanity";
import Image from "next/image";

interface SilverSponsorsProps {
  sponsors: SilverSponsor[];
}

const SilverSponsors = ({ sponsors }: SilverSponsorsProps) => {
  const handleClick = (url: string | undefined) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="flex items-center flex-col gap-20">
      <h1>{`Silver sponsor` + (sponsors.length > 1 ? "s" : "")}</h1>
      <section className="w-full px-4 md:px-12 mx-auto flex flex-row justify-center flex-wrap">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor._key}
            className="w-full md:w-1/4 justify-start items-center flex flex-col gap-8 p-8"
          >
            <Image
              src={imageBuilder(sponsor.logo)}
              alt={`${sponsor.name} logo`}
              width={400}
              height={600}
              className="h-[300px] w-auto aspect-auto hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => handleClick(sponsor.website)}
            />
            <section className="flex flex-col gap-4">
              <PortableText
                value={sponsor.description}
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

export default SilverSponsors;
