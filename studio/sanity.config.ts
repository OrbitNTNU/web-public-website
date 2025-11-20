import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { deskStructure } from "./deskStructure";
import { schemaTypes } from "./schemaTypes";
import { presentationTool } from "sanity/presentation";

export default defineConfig({
  name: "default",
  title: "orbitntnu-web",

  projectId: "mt6p5031",
  dataset: "production",

  plugins: [
    structureTool({
      structure: deskStructure,
    }),

    visionTool(),
    colorInput(),

    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "https://web-public-website.vercel.app/api/draft",
        },
      },
    }),
  ],


  schema: {
    types: schemaTypes,
  },
});
