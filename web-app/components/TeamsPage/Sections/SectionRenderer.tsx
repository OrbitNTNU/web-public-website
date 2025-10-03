import TextSectionRenderer from "./TextSectionRenderer";
import ImageSectionRenderer from "./ImageSectionRenderer";
import { ContentSection } from "@/sanity/types/teams";
import HeroSectionRender from "./HeroSectionRenderer";

interface SectionRendererProps {
  section: ContentSection;
}

export const SectionRenderer = ({ section }: SectionRendererProps) => {
  switch (section._type) {
    case "heroSection":
      return <HeroSectionRender content={section} />;
    case "textSection":
      return <TextSectionRenderer content={section} />;
    case "imageSection":
      return <ImageSectionRenderer content={section} />;
    default:
      return null;
  }
};