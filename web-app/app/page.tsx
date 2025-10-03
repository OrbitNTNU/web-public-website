import IntroSlide from "../components/LandingPage/IntroSlide";
import Image from "next/image";
import Layout from "./layout";
import Hero from "@/app/landing/Hero";
import JamesBond from "@/app/landing/JamesBond";

export default function Home() {
  return (
    <Layout>
      <Hero/>
      <JamesBond/>
      <footer className="mt-16 text-xs text-[#b2b7ff] text-center opacity-80">
        &copy; {new Date().getFullYear()} Orbit Web3. All rights reserved.
      </footer>
    </Layout>
  );
}
