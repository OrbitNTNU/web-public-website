import { getArticle } from "@/sanity/fetch/SanityFetch";
import { Loading } from "@/components/General/Layout/Loading";
import ArticleSlugClientPage from "../ArticleSlugClientPage";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';


export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return <Loading />;
  }

  return <ArticleSlugClientPage article={article} />;
}
