import Image from "next/image";

export default function Hero() {
    return (
        <section className="w-screen mb-40">
            <Image
                src="/orbitbig.jpg"
                alt="Orbitbig Hero"
                fill
                className="object-cover object-bottom"
                priority
            />
        </section>
    );
}
