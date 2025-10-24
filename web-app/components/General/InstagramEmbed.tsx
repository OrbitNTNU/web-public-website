"use client";
import { useEffect } from "react";

export default function InstagramEmbed() {
  useEffect(() => {
    const container = document.getElementById("orbitntnu-juicer-feed");
    if (!container) return;

    // Clear previous content
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://www.juicer.io/embed/orbitntnu/embed-code.js";
    script.async = true;
    script.defer = true;
    container.appendChild(script);

    // Remove Juicer referral
    const referralInterval = setInterval(() => {
      const referral = container.querySelector("h1.referral");
      if (referral) {
        referral.remove();
        clearInterval(referralInterval);
      }
    }, 500);

    // Add padding to inner stacker
    const stackerInterval = setInterval(() => {
      const stacker = container.querySelector(".j-stacker");
      if (stacker) {
        stacker.classList.add("px-4", "md:px-12", "max-w-[2000px]", "mx-auto");
        clearInterval(stackerInterval);
      }
    }, 500);

    return () => {
      container.innerHTML = "";
      clearInterval(referralInterval);
      clearInterval(stackerInterval);
    };
  }, []);

  return (
      <div
        id="orbitntnu-juicer-feed"
        className="mx-auto"
      />
  );
}
