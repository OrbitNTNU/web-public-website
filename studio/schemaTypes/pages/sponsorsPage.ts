import { defineType, defineField } from "sanity";

export default defineType({
  name: "sponsorsPage",
  title: "Sponsors Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
    }),

    // ─────────────── MAIN SPONSORS ───────────────
    defineField({
      name: "mainSponsors",
      title: "Main Sponsors",
      type: "array",
      of: [{ type: "mainSponsor" }],
    }),

    // ─────────────── PLATINUM SPONSORS ───────────────
    defineField({
      name: "platinumSponsors",
      title: "Platinum Sponsors",
      type: "array",
      of: [{ type: "platinumSponsor" }],
    }),

    // ─────────────── GOLD SPONSORS ───────────────
    defineField({
      name: "goldSponsors",
      title: "Gold Sponsors",
      type: "array",
      of: [{ type: "goldSponsor" }],
    }),

    // ─────────────── SILVER SPONSORS ───────────────
    defineField({
      name: "silverSponsors",
      title: "Silver Sponsors",
      type: "array",
      of: [{ type: "silverSponsor" }],
    }),

    // ─────────────── BRONZE SPONSORS ───────────────
    defineField({
      name: "bronzeSponsors",
      title: "Bronze Sponsors",
      type: "array",
      of: [{ type: "bronzeSponsor" }],
    }),

    // ─────────────── PARTNERS ───────────────
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [{ type: "partnerSponsor" }],
    }),
  ],
});
