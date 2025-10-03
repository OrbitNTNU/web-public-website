import { motion, MotionValue } from "framer-motion";
import Image from "next/image";

interface ImageCardProps {
    src: string;
    alt: string;
    label: string;
    className?: string;
    x?: MotionValue<number>;
    y?: MotionValue<number>;
    staticMode?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({
                                                        src,
                                                        alt,
                                                        label,
                                                        className,
                                                        x,
                                                        y,
                                                        staticMode = false,
                                                    }) => {
    if (staticMode) {
        return (
            <div className={`relative group ${className}`}>
                <div className="relative w-full h-full">
                    <Image src={src} alt={alt} fill className="object-cover" />
                </div>
                <div className="mt-2 text-left">
          <span className="inline-block">
            <p className="text-sm font-light">{label}</p>
            <span className="block h-0.5 w-0 bg-white transition-all duration-300 origin-left group-hover:w-full"></span>
          </span>
                </div>
            </div>
        );
    }


    return (
        <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group ${className}`}
            style={{ x, y }}
        >
            <div className="relative w-full h-full">
                <Image src={src} alt={alt} fill className="object-cover" />
            </div>
            <div className="mt-2 text-left">
        <span className="inline-block">
          <p className="text-sm font-light">{label}</p>
          <span className="block h-0.5 w-0 bg-white transition-all duration-300 origin-left group-hover:w-full"></span>
        </span>
            </div>
        </motion.div>
    );
};
