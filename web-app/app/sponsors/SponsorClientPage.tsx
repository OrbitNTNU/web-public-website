"use client";

import Header from "@/components/General/Header";
import { SponsorsPage } from "@/sanity/types/sponsorsPage";
import MainSponsors from "@/components/SponsorsPage/MainSponsors";
import PlatinumSponsors from "@/components/SponsorsPage/PlatinumSponsors";
import BronzeSponsors from "@/components/SponsorsPage/BronzeSponsors";
import PartnerSponsors from "@/components/SponsorsPage/PartnerSponsors";
import GoldSponsors from "@/components/SponsorsPage/GoldSponsors";
import SilverSponsors from "@/components/SponsorsPage/SilverSponsors";

export default function SponsorClientPage({
  sponsorsPage,
}: {
  sponsorsPage: SponsorsPage;
}) {
  return (
    <div className="w-full relative max-w-[1600px] mx-auto gap-20 md:gap-40 my-20 md:my-40 flex flex-col">
      <Header title={sponsorsPage.title} subtitle={sponsorsPage.caption} />
      {sponsorsPage.mainSponsors && (
        <MainSponsors sponsors={sponsorsPage.mainSponsors} />
      )}
      {sponsorsPage.platinumSponsors && (
        <PlatinumSponsors sponsors={sponsorsPage.platinumSponsors} />
      )}
      {sponsorsPage.goldSponsors && (
        <GoldSponsors sponsors={sponsorsPage.goldSponsors} />
      )}
      {sponsorsPage.silverSponsors && (
        <SilverSponsors sponsors={sponsorsPage.silverSponsors} />
      )}
      {sponsorsPage.bronzeSponsors && (
        <BronzeSponsors sponsors={sponsorsPage.bronzeSponsors} />
      )}
      {sponsorsPage.partners && (
        <PartnerSponsors sponsors={sponsorsPage.partners} />
      )}
    </div>
  );
}
