// ─────────────── SPONSORS PAGE TYPES ───────────────

import { PortableTextBlock } from "@portabletext/react";
import { Image } from "./image";

// Generic sponsor base
export interface BaseSponsor {
  _key: string;
  name: string;
  logo: Image;
  website?: string;
}

// For sponsors with text content
export interface RichSponsor extends BaseSponsor {
  description: PortableTextBlock; // Sanity block content
  imageWithUs?: Image;
}

// Tier-specific interfaces
export interface MainSponsor extends RichSponsor {}
export interface PlatinumSponsor extends RichSponsor {}
export interface GoldSponsor extends RichSponsor {}
export interface SilverSponsor extends Omit<RichSponsor, "imageWithUs"> {}
export interface BronzeSponsor extends BaseSponsor {}
export interface PartnerSponsor extends BaseSponsor {}

// Sponsor page structure
export interface SponsorsPage {
  _type: "sponsorsPage";
  _id: string;
  title: string;
  caption?: string;
  mainSponsors: MainSponsor[];
  platinumSponsors: PlatinumSponsor[];
  goldSponsors: GoldSponsor[];
  silverSponsors: SilverSponsor[];
  bronzeSponsors: BronzeSponsor[];
  partners: PartnerSponsor[];
}
