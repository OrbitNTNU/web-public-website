'use client'

import { motion } from "framer-motion";
import { Image as SanityImage } from "@/sanity/types/image";
import { useState } from "react";
import Image from "next/image";
import { imageBuilder } from "@/sanity/utils/imageBuilder";

interface GalleryProps {
    images: {
        image: SanityImage;
        alt: string;
        tagline?: string;
        link?: string;
    }[];
}

export const GalleryComponent = ({ images }: GalleryProps) => {
    const [hoveredRowIndex, setHoveredRowIndex] = useState<number | null>(null);
    const [hoveredColIndex, setHoveredColIndex] = useState<number | null>(null);

    // Split images into rows of 3 (2 span each in 6-col grid)
    const rows = [];
    for (let i = 0; i < images.length; i += 3) {
        rows.push(images.slice(i, i + 3));
    }

    return (
        <div className="flex flex-col gap-4 w-full">
            {rows.map((rowImages, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-6 gap-4 w-full">
                    {rowImages.map((img, colIndex) => {
                        const isHovered = hoveredRowIndex === rowIndex && hoveredColIndex === colIndex;

                        // Determine how many columns this image spans
                        let span = 2; // default
                        if (hoveredRowIndex === rowIndex && hoveredColIndex !== null) {
                            span = isHovered ? 4 : 1; // expand hovered, shrink siblings
                        }

                        return (
                         <motion.div
  key={img.alt + colIndex}
  className="relative w-full cursor-pointer overflow-hidden"
  layout
  onHoverStart={() => {
    setHoveredRowIndex(rowIndex);
    setHoveredColIndex(colIndex);
  }}
  onHoverEnd={() => {
    setHoveredRowIndex(null);
    setHoveredColIndex(null);
  }}
  style={{
    gridColumn: `span ${span}`,
  }}
  transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }} // match container timing
>
  <div className="relative w-full h-[400px] overflow-hidden">
    <motion.div
      className="absolute top-0 left-1/2 -translate-x-1/2 h-full"
      animate={{
        width: isHovered ? "100%" : "200%", // zoomed-in initially, expands to container
      }}
      transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }} // match layout
    >
      <Image
        src={imageBuilder(img.image)}
        alt={img.alt}
        className="h-full object-cover w-full"
        priority
        width={800}
        height={600}
      />
    </motion.div>
  </div>


                                {img.tagline && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: isHovered ? 1 : 0 }}
                                        className="absolute bottom-2 left-2 text-cloud-white bg-charcoal rounded-full bg-opacity-50 px-4"
                                    >
                                        {img.tagline}
                                    </motion.p>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}
