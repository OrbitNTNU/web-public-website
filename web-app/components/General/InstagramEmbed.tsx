"use client";
import { useEffect } from "react";

export default function InstagramEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.juicer.io/embed/orbitntnu/embed-code.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    const referralInterval = setInterval(() => {
      const referral = document.querySelector("h1.referral");
      if (referral) {
        referral.remove();
        clearInterval(referralInterval);
      }
    }, 500);

    const stackerInterval = setInterval(() => {
      const stacker = document.querySelector(".j-stacker");
      if (stacker) {
        stacker.classList.add("px-4", "md:px-12", "max-w-[2000px]", "mx-auto");
        clearInterval(stackerInterval);
      } 
    }, 500);

    return () => {
      document.body.removeChild(script);
      clearInterval(referralInterval);
      clearInterval(stackerInterval);
    };
  }, []);

  return (
    <section className="px-4 md:px-12">
      <div
        id="orbitntnu-juicer-feed"
        className="max-w-[1200px] mx-auto"
      />
    </section>
  );
}
