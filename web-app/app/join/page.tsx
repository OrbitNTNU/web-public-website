import { Loading } from "@/components/General/Layout/Loading";
import { getAllArticles } from "@/sanity/fetch/SanityFetch";
import JoinClientPage from "./JoinClientPage";

const data = {
  title: "Join Us!",
  text: "Become a part of ORBIT and embark on an exciting journey in satellite technology. Whether you're a student eager to learn or a professional looking to contribute, we welcome you to join our team. Explore our open positions and find out how you can make a difference with ORBIT.",
  buttons: [
    {
      buttonText: "View Open Positions",
      buttonLink: "https://orbitntnu.com/join#open-positions",
      icon: "work_outline",
    },
    {
      buttonText: "Contact Us",
      buttonLink: "mailto:contact@orbitntnu.com",
      icon: "mail_outline",
    },
    {
      buttonText: "Follow us on LinkedIn",
      buttonLink: "https://www.linkedin.com/company/orbitntnu/",
      icon: "link",
    },
    {
      buttonText: "Learn About Orbit",
      buttonLink: "https://orbitntnu.com/about",
      icon: "info_outline",
    },
  ],
  images: ["/tests/1.png", "/tests/2.png", "/tests/5.jpg", "/tests/6.png"],
};
export default async function JoinPage() {
  const articles = await getAllArticles();
  if (!articles) {
    return <Loading />;
  }

  return <JoinClientPage content={data} />;
}
