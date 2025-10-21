import Image from "next/image";

const BiosatPage = () => {
    return (
        <section className="w-screen h-screen overflow-hidden relative">
            {/* Background image */}
            <Image
                src="/biosat/BioSat_Small.PNG"
                alt="SelfieSat Hero"
                fill
                className="object-cover absolute inset-0"
                priority
            />

        </section>
    )
}

export default BiosatPage;