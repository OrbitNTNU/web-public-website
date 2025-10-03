import { type TextSection } from "@/sanity/types/teams";
import { PortableText } from "@portabletext/react";

interface TextSectionProps {
  content: TextSection
}

const TextSectionRenderer = ({ content }: TextSectionProps) => (
  <section className="max-w-5xl mx-auto py-12 px-4">
    {content.title && <h2>{content.title}</h2>}
    <PortableText
      value={content.body ?? []}
      components={{
        block: {
          h2: ({ children }) => <h2 className="my-4">{children}</h2>,
          h3: ({ children }) => <h3 className="my-4">{children}</h3>,
          normal: ({ children }) => <p className="my-2 text-muted">{children}</p>,
        },
        list: {
          bullet: ({ children }) => <ul className="w-full md:w-2/3 list-disc list-inside ml-4 my-4 text-muted">{children}</ul>,
          number: ({ children }) => <ol className="w-full md:w-2/3 list-decimal list-inside ml-4 my-4 text-muted">{children}</ol>,
        },
        listItem: {
          bullet: ({ children }) => <li className="ml-4 mb-2">{children}</li>,
          number: ({ children }) => <li className="ml-4 mb-2">{children}</li>,
        },
        marks: {
          underline: ({ children }) => (
            <span className="underline text-berry-blast">{children}</span>
          ),
          strong: ({ children }) => (
            <strong className="text-cloud-white">{children}</strong>
          ),
        },
      }}
    />
  </section>
);

export default TextSectionRenderer;