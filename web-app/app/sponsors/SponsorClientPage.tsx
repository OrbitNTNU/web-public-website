"use client";

import { SponsorsPage } from "@/sanity/types/sponsorsPage";
import MainSponsors from "@/components/SponsorsPage/MainSponsors";
import PlatinumSponsors from "@/components/SponsorsPage/PlatinumSponsors";
import BronzeSponsors from "@/components/SponsorsPage/BronzeSponsors";
import PartnerSponsors from "@/components/SponsorsPage/PartnerSponsors";
import GoldSponsors from "@/components/SponsorsPage/GoldSponsors";
import SilverSponsors from "@/components/SponsorsPage/SilverSponsors";
import AllThanks from "@/components/SponsorsPage/AllThanks";

export default function SponsorClientPage({
  sponsorsPage,
}: {
  sponsorsPage: SponsorsPage;
}) {
  const mainSponsors = sponsorsPage.mainSponsors || [];
  const platinumSponsors = sponsorsPage.platinumSponsors || [];
  const goldSponsors = sponsorsPage.goldSponsors || [];
  const silverSponsors = sponsorsPage.silverSponsors || [];
  const bronzeSponsors = sponsorsPage.bronzeSponsors || [];
  const partnerSponsors = sponsorsPage.partners || [];

  const allSponsors = [
    ...mainSponsors,
    ...platinumSponsors,
    ...goldSponsors,
    ...silverSponsors,
    ...bronzeSponsors,
    ...partnerSponsors,
  ];

  return (
    <div className="w-full relative max-w-[1600px] mx-auto gap-20 md:gap-40 my-20 md:my-40 flex flex-col">
      {mainSponsors && <MainSponsors sponsors={mainSponsors} />}
      {platinumSponsors && <PlatinumSponsors sponsors={platinumSponsors} />}
      {goldSponsors && <GoldSponsors sponsors={goldSponsors} />}
      {silverSponsors && <SilverSponsors sponsors={silverSponsors} />}
      {bronzeSponsors && <BronzeSponsors sponsors={bronzeSponsors} />}
      {partnerSponsors && <PartnerSponsors sponsors={partnerSponsors} />}
      <AllThanks sponsors={allSponsors} />
    </div>
  );
}
