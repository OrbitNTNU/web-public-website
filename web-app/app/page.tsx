import { fetchLandingPage } from "@/sanity/queries/landingPage";
import LandingPage from "@/pages/LandingPage";

export default async function Home() {
  const data = await fetchLandingPage(); 

  return <LandingPage sections={data.sections} />;
}