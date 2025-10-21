import Image from "next/image";

const Framsat1_5Page = () => {
    return (
        <section className="w-screen h-screen overflow-hidden relative">
            {/* Background image */}
            <Image
                src="/tests/7.jpg"
                alt="Framsat Hero"
                fill
                className="object-cover absolute inset-0"
                priority
            />

            {/* Gradient overlay using brand colors */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
      linear-gradient(
        135deg,
        var(--color-framsat-pink) 0%,
        var(--color-framsat-red) 40%,
        var(--color-framsat-blue) 100%
      )
      `,
                    mixBlendMode: "soft-light",
                }}
            />
             {/* Center content */}
                    <div className="absolute flex flex-col items-center justify-center inset-0 text-center">
                      {/* Patch image with soft glow */}
                      <div className="relative">
                        <div
                          className="absolute inset-0 blur-2xl rounded-full opacity-100"
                          style={{
                            background: `radial-gradient(circle at center, var(--color-selfiesat-yellow) 0%, var(--color-selfiesat-dark-blue) 60%, transparent 100%)`,
                          }}
                        />
                        <Image
                          src="/patches/FS_1.5.png"
                          alt="SelfieSat Patch"
                          width={300}
                          height={300}
                          className="relative z-10 drop-shadow-[0_0_25px_rgba(66,101,179,0.5)]"
                        />
                      </div>
                    </div>
        </section>
    )
}

export default Framsat1_5Page;