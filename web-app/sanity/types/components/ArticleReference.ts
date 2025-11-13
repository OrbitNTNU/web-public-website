import { Article } from "../pages/articlePage";

export interface ArticleReference {
  _key: string;
  _type: "articleReference";
  articles: Article[];
}
