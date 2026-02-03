"use client";
import { JoinComponent } from "@/sanity/types/pages/joinPage";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface JoinCardProps {
  position: JoinComponent;
  link: string;
}

const JoinCard = ({ position, link }: JoinCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const router = useRouter();

  useEffect(() => {
    if (!contentRef.current) return;

    if (expanded) {
      setMaxHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setMaxHeight("160px"); // collapsed height (≈ 5 lines)
    }
  }, [expanded]);

  return (
    <div key={position.header} className="w-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
        <Image
          src={imageBuilder(position.image)}
          alt={position.header}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 mt-4">
        <h2>{position.header}</h2>
        <div
          ref={contentRef}
          style={{ maxHeight }}
          className="relative overflow-hidden transition-[max-height] duration-500 ease-in-out"
        >
          {!expanded && (
            <div className="pointer-events-none absolute bottom-0 left-0 h-12 w-full bg-gradient-to-t from-charcoal to-transparent" />
          )}
          <PortableText
            value={position.description}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="text-charcoal-light mb-4 leading-relaxed">
                    {children}
                  </p>
                ),
                h1: ({ children }) => <h1 className="mb-6 mt-8">{children}</h1>,
                h2: ({ children }) => <h2 className="mb-5 mt-7">{children}</h2>,
                h3: ({ children }) => <h3 className="mb-4 mt-6">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-charcoal-light pl-4 italic text-slate my-6">
                    {children}
                  </blockquote>
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
                        target === "_blank" ? "noopener noreferrer" : undefined
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
        </div>
        <span className="flex flex-row justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="cursor-pointer flex flex-row gap-2 mt-2 items-center justify-center group"
          >
            <span>{expanded ? "Show Less" : "Read More"}</span>
            <span className="material-icons">
              {expanded ? "expand_less" : "expand_more"}
            </span>
          </button>
          {link && (
              <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-2 mt-2 items-center justify-center group cursor-pointer"
              >
                <span>Apply here</span>
                <span className="material-icons group-hover:translate-x-1 transition-transform duration-300">
                  arrow_forward
                </span>
              </Link>
          )}

        </span>
      </div>
    </div>
  );
};

export default JoinCard;
