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
        origin: "https://web-public-website.vercel.app",
        preview: "/",
        previewMode: {
          enable: "/api/draft",
        },
      },
    }),

  ],


  schema: {
    types: schemaTypes,
  },
});
