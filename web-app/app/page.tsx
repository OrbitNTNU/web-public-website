import LandingPage from "@/components/pages/LandingPage";
import {getLandingPage} from "@/sanity/fetch/SanityFetch";

export default async function Home() {
  const data = await getLandingPage();

  return <LandingPage sections={data?.sections ?? []} />;
}