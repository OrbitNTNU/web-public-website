import Image from "next/image";

interface LargeImageProps {
    src: string;
    alt: string;
    caption?: string;
}

const LargeImage = ({ src, alt, caption }: LargeImageProps) => {
    return (
        <div className="w-full  mx-auto relative">
            <Image
                src={src}
                alt={alt}
                className="w-full h-auto rounded-lg shadow-lg aspect-[16/9] object-cover"
                width={1600}
                height={600}
                style={{
                    filter: "brightness(0.8)",
                }}
            />
            {caption && (
                <h3 className="absolute bottom-16 left-16 font-black italic">
                    {caption.toUpperCase()}
                </h3>
            )}
        </div>
    );
}

export default LargeImage;