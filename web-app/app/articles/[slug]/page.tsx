import { getArticle } from "@/sanity/fetch/SanityFetch";
import { Loading } from "@/components/General/Layout/Loading";
import ArticleSlugClientPage from "../ArticleSlugClientPage";

interface ArticlePageProps {
  params: { slug: string };
}

export const revalidate = 60;

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  const article = await getArticle(slug);

  if (!article) {
    return <Loading />;
  }

  return <ArticleSlugClientPage article={article} />;
}
