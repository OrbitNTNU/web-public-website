import type { ArticlePageSection } from "@/sanity/types/pages/articlePage";
import Image from "next/image";
import {getArticle} from "@/sanity/fetch/SanityFetch";
import {Loading} from "@/components/Loading";

interface ArticlePageProps {
    params: { slug: string };
}

export default async function ArticlePage(props: ArticlePageProps) {
    const params = props.params;
    const article = await getArticle(params.slug);

    if (!article) {
        return <Loading/>;
    }

    return (
        <main>
            <article>
                <header>
                    <h1>{article.title}</h1>
                    <p>{new Date(article.publishedAt).toLocaleDateString()}</p>
                    {article.mainImage?.asset?.url && (
                        <Image
                            src={article.mainImage.asset.url}
                            alt={article.mainImage.alt ?? article.title}
                            width={1200}
                            height={600}
                        />
                    )}
                </header>

                <section>
                    {article.sections?.length ? (
                        article.sections.map((section: ArticlePageSection, index: number) => (
                            <div key={index}>
                                {section._type === "largeQuote" && (
                                    <blockquote>{section.quote}</blockquote>
                                )}

                                {section._type === "largeImage" && section.image?.asset?._ref && (
                                    <figure>
                                        <Image
                                            src={section.image.asset._ref}
                                            alt={"Placeholder"}
                                            width={800}
                                            height={600}
                                        />
                                        {section.caption && <figcaption>{section.caption}</figcaption>}
                                    </figure>
                                )}

                                {section._type === "spanningText" && <p>{section.text}</p>}

                                {section._type === "doubleImage" && (
                                    <div>
                                        <figure>
                                            <Image
                                                src={section.image1.asset._ref}
                                                alt={section.alt1 ?? ""}
                                                width={600}
                                                height={400}
                                            />
                                            {section.caption1 && <figcaption>{section.caption1}</figcaption>}
                                        </figure>
                                        <figure>
                                            <Image
                                                src={section.image2.asset._ref}
                                                alt={section.alt2 ?? ""}
                                                width={600}
                                                height={400}
                                            />
                                            {section.caption2 && <figcaption>{section.caption2}</figcaption>}
                                        </figure>
                                    </div>
                                )}

                                {section._type === "doubleImageCollage" && (
                                    <div>
                                        {section.items?.map((item, i) => (
                                            <div key={i}>
                                                {item.image1?.asset?._ref && (
                                                    <Image
                                                        src={item.image1.asset._ref}
                                                        alt={item.alt1 ?? ""}
                                                        width={600}
                                                        height={400}
                                                    />
                                                )}
                                                {item.image2?.asset?._ref && (
                                                    <Image
                                                        src={item.image2.asset._ref}
                                                        alt={item.alt2 ?? ""}
                                                        width={600}
                                                        height={400}
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {section._type === "singleImageCollage" && (
                                    <div>
                                        {section.items?.map((item, i) => (
                                            <figure key={i}>
                                                <Image
                                                    src={item.src}
                                                    alt={item.alt ?? ""}
                                                    width={600}
                                                    height={400}
                                                />
                                                {item.caption && <figcaption>{item.caption}</figcaption>}
                                            </figure>
                                        ))}
                                    </div>
                                )}

                                {section._type === "triImageCollage" && (
                                    <div>
                                        <figure>
                                            <Image
                                                src={section.src1}
                                                alt={section.alt1 ?? ""}
                                                width={400}
                                                height={300}
                                            />
                                        </figure>
                                        <figure>
                                            <Image
                                                src={section.src2}
                                                alt={section.alt2 ?? ""}
                                                width={400}
                                                height={300}
                                            />
                                        </figure>
                                        <figure>
                                            <Image
                                                src={section.src3}
                                                alt={section.alt3 ?? ""}
                                                width={400}
                                                height={300}
                                            />
                                        </figure>
                                        {section.caption && <p>{section.caption}</p>}
                                    </div>
                                )}

                                {section._type === "projectsShowcase" && (
                                    <div>
                                        <h3>Projects Showcase Section</h3>
                                    </div>
                                )}

                                {section._type === "instagramEmbed" && (
                                    <div>
                                        <h3>Instagram Embed</h3>
                                    </div>
                                )}

                                {section._type === "subOrbitalShowcase" && (
                                    <div>
                                        <h3>Sub Orbital Showcase Section</h3>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No content available for this article.</p>
                    )}
                </section>
            </article>
        </main>
    );
}
