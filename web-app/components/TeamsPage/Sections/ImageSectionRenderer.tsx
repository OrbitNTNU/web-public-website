import { ImageSection } from "@/sanity/types/teams";
import { imageBuilder } from "@/sanity/utils/imageBuilder";
import Image from "next/image";

interface ImageSectionProps {
  content: ImageSection;
}

const ImageSectionRenderer = ({ content }: ImageSectionProps) => {
  const { image, caption, alignment } = content;
  const imageUrl = imageBuilder(image);

  if (alignment === "center") {
    return (
      <section className="flex flex-col items-center py-12 max-w-5xl">
        {caption && (
          <h3 className="mb-8 w-full">
            {caption}
          </h3>
        )}
        <div className="relative w-full h-auto">
          <Image
            src={imageUrl}
            alt={caption ?? "Image"}
            width={500}
            height={image.hotspot?.height ? Math.round((500 / (image.hotspot?.width || 1)) * (image.hotspot?.height || 1)) : 300}
            className="object-cover rounded-lg h-auto w-full"
          />
        </div>
      </section>
    );
  }

  // For left and right alignments
  const isRight = alignment === "right";
  return (
    <section className="flex py-12 px-4 items-center max-w-5xl mx-auto">
      {!isRight && caption && (
        <div className="w-1/2 pr-8">
          <p className="text-xl font-semibold text-gray-800">{caption}</p>
        </div>
      )}
      <div className="relative w-1/2 h-64">
        <Image
          src={imageUrl}
          alt={caption ?? "Image"}
          fill
          className="object-cover rounded-lg"
        />
      </div>
      {isRight && caption && (
        <div className="w-1/2 pl-8">
          <p className="text-xl font-semibold text-gray-800">{caption}</p>
        </div>
      )}
    </section>
  );
};

export default ImageSectionRenderer;