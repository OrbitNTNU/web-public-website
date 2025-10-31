"use server";

import { getSponsorPage } from "@/sanity/fetch/SanityFetch";
import SponsorClientPage from "./SponsorClientPage";

export default async function SponsorPage() {
  const sponsors = await getSponsorPage();
  if (!sponsors) {
    return (
        <div>
          <h1>404: Sponsors page not found</h1>
        </div>
    );
  }

  return <SponsorClientPage sponsorsPage={sponsors} />;
}
