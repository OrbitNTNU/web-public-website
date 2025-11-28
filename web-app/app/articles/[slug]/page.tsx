import { getArticle } from "@/sanity/fetch/SanityFetch";
import { Loading } from "@/components/General/Layout/Loading";
import ArticleSlugClientPage from "../ArticleSlugClientPage";

interface ArticlePageProps {
  params: { slug: string };
}
export const revalidate = false;
export default async function ArticlePage(props: ArticlePageProps) {
  const { params } = props;
  const article = await getArticle(params.slug);

  if (!article) {
    return <Loading />;
  }

  return <ArticleSlugClientPage article={article} />;
}
