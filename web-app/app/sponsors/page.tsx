"use client";
import { Loading } from "@/components/Loading";
import { fetchSponsorsPage } from "@/sanity/queries/sponsorsPage";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import {
  SponsorsPage,
  BaseSponsor,
  RichSponsor,
} from "@/sanity/types/sponsorsPage";
import Image from "next/image";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Header from "@/components/General/Header";

const TIER_COLORS: Record<string, string> = {
  main: "bg-[var(--color-laser-lemon)] text-[var(--color-dark-gray)]",
  platinum: "bg-[var(--color-moonlight)] text-[var(--color-cloud-white)]",
  gold: "bg-[var(--color-orange-sherbert)] text-[var(--color-dark-gray)]",
  silver: "bg-[var(--color-charcoal-light)] text-[var(--color-cloud-white)]",
  bronze: "bg-[var(--color-dark-emerald)] text-[var(--color-cloud-white)]",
  partner: "bg-[var(--color-night-sky)] text-[var(--color-cloud-white)]",
};

export default function SponsorPage() {
  const [sponsorsPage, setSponsorsPage] = useState<SponsorsPage | null>(null);

  useEffect(() => {
    void fetchSponsorsPage().then((data) => setSponsorsPage(data || null));
  }, []);

  if (!sponsorsPage) return <Loading />;

  const renderSponsor = (
    sponsor: BaseSponsor | RichSponsor,
    tier: string,
    index: number,
  ) => {
    const logoUrl = imageBuilder(sponsor.logo);
    const extraUrl =
      "imageWithUs" in sponsor && sponsor.imageWithUs
        ? imageBuilder(sponsor.imageWithUs)
        : null;

    const isGoldSilver = tier === "gold" || tier === "silver";
    const reversed = isGoldSilver && index % 2 === 1;

    const content = (
      <>
        <div className="flex flex-col items-center text-center w-full md:w-auto md:flex-1">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt={sponsor.name}
              width={120}
              height={120}
              className="mb-2 object-contain"
            />
          )}
          <div>{sponsor.name}</div>
          {sponsor.website && (
            <a
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="underline mb-1 block"
            >
              Visit Website
            </a>
          )}
          {"description" in sponsor && sponsor.description && (
            <div className="text-sm w-full">
              <PortableText value={sponsor.description} />
            </div>
          )}
          {"imageWithUs" in sponsor && sponsor.imageWithUs && extraUrl && (
            <Image
              src={extraUrl}
              alt={`${sponsor.name} extra`}
              width={200}
              height={120}
              className="mt-2 object-cover rounded"
            />
          )}
        </div>
      </>
    );

    return (
      <div
        key={sponsor._key}
        className={`p-4 rounded shadow flex flex-col w-full ${TIER_COLORS[tier]} ${tier === "main" ? "mb-8" : "mb-4"}`}
      >
        {isGoldSilver ? (
          <div className={`grid grid-cols-3 gap-4 items-center`}>
            {reversed ? (
              <>
                <div className="col-span-2">{content}</div>
                <div className="flex justify-center">
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={sponsor.name}
                      width={120}
                      height={120}
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center">
                  {logoUrl && (
                    <Image
                      src={logoUrl}
                      alt={sponsor.name}
                      width={120}
                      height={120}
                    />
                  )}
                </div>
                <div className="col-span-2">{content}</div>
              </>
            )}
          </div>
        ) : (
          content
        )}
      </div>
    );
  };

  const renderTierSection = (
    title: string,
    sponsors: (BaseSponsor | RichSponsor)[],
    tier: string,
  ) => {
    if (!sponsors || sponsors.length === 0) return null;
    return (
      <section className="mb-12 w-full px-4 md:px-12">
        <div className="mb-4">{title}</div>
        <div className="flex flex-col gap-4">
          {sponsors.map((s, i) => renderSponsor(s, tier, i))}
        </div>
      </section>
    );
  };

  return (
    <div className="w-full relative max-w-[2000px] mx-auto gap-20 md:gap-40 my-20 md:my-40 flex flex-col">
      <Header title={sponsorsPage.title} subtitle={sponsorsPage.caption} />
      {renderTierSection("Main Sponsors", sponsorsPage.mainSponsors, "main")}
      {renderTierSection(
        "Platinum Sponsors",
        sponsorsPage.platinumSponsors,
        "platinum",
      )}
      {renderTierSection("Gold Sponsors", sponsorsPage.goldSponsors, "gold")}
      {renderTierSection(
        "Silver Sponsors",
        sponsorsPage.silverSponsors,
        "silver",
      )}
      {renderTierSection(
        "Bronze Sponsors",
        sponsorsPage.bronzeSponsors,
        "bronze",
      )}
      {renderTierSection("Partners", sponsorsPage.partners, "partner")}
    </div>
  );
}
