import { getAboutPage } from "@/sanity/fetch/SanityFetch";
import AboutClientPage from "./AboutClientPage";

const AboutPage = async () => {
  const data = await getAboutPage();
  return <AboutClientPage sections={data?.sections ?? []} />;
};

export default AboutPage;
