import { Loading } from "@/components/General/Layout/Loading";
import { getAllArticles } from "@/sanity/fetch/SanityFetch";
import ArticleClientPage from "@/app/articles/ArticleClientPage";

export default async function ArticlesPage() {
  const articles = await getAllArticles();
  if (!articles) {
    return <Loading />;
  }

  return <ArticleClientPage articles={articles} />;
}
