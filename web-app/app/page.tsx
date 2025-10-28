import LandingPage from "@/components/pages/LandingPage";
import { fetchLandingPage } from "@/sanity/queries/landingPage";

export default async function Home() {
  const data = await fetchLandingPage();

  return <LandingPage sections={data.sections} />;
}
