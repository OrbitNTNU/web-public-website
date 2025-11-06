import { PortableText, PortableTextBlock } from "next-sanity";

interface TextHeavyProps {
  content: PortableTextBlock[];
}

const TextHeavy: React.FC<TextHeavyProps> = ({ content }) => {
  return (
    <div className="px-4 md:px-12 w-full max-w-4xl mx-auto flex flex-col leading-relaxed text-base">
      {content.map((block) => (
        <PortableText
          key={block._key}
          value={block}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="text-charcoal-light my-4">{children}</p>
              ),
              break: () => <div className="h-8" />,
              h1: ({ children }) => <h1 className="mt-12 mb-6">{children}</h1>,
              h2: ({ children }) => <h2 className="mt-10 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="mt-8 mb-3">{children}</h3>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-charcoal-light pl-4 italic text-slate my-6">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <pre className="bg-gray-100 text-sm p-3 rounded-md overflow-x-auto my-4">
                  <code>{children}</code>
                </pre>
              ),
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc list-inside ml-6 my-2 text-charcoal-light space-y-1">
                  {children}
                </ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal list-inside ml-6 my-2 text-charcoal-light space-y-1">
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
                <code className="bg-gray-200 rounded px-1 py-0.5 text-sm font-mono">
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
                    className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
                  >
                    {children}
                  </a>
                );
              },
            },
          }}
        />
      ))}
    </div>
  );
};

export default TextHeavy;
