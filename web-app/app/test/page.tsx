import DoubleImages from '@/components/General/DoubleImages'
import LargeImage from '@/components/General/LargeImage'
import LargeQuote from '@/components/General/LargeQuote'
import GeneralCollage from '@/components/General/GeneralCollage'
import ImageAndCaption from '@/components/General/ImageAndCaption'
import Specifications from '@/components/General/Specifications'
import TriImageCollage from '@/components/General/TriImageCollage'
import Image from 'next/image'

const specs = [
  { label: "Status", value: "Deorbited" },
  { label: "Weight", value: "1.8 kg" },
  { label: "Size", value: "10x10x20 cm" },
  { label: "Orbit", value: "SSO 540 km" },
  { label: "Cameras", value: "4" },
  { label: "Power", value: "1.2 W" },
  { label: "Band", value: "UHF" },
  { label: "Frequency", value: "437.5 MHz ± Doppler" },
  { label: "Telemetry", value: "AX.25" },
  { label: "Modulation", value: "2-FSK" },
  { label: "Baudrate", value: "9600" },
  { label: "Framing", value: "AX.25 G3RUH" },
  { label: "Launch Vehicle", value: "SpaceX Falcon 9" },
]

const SelfieSatPage = () => {
  return (
    <>
      {/* Hero */}
      <section className="w-screen h-screen overflow-hidden relative">
        {/* Background image */}
        <Image
          src="/selfiesat/1.JPG"
          alt="SelfieSat Hero"
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
        var(--color-selfiesat-blue) 0%,
        var(--color-selfiesat-dark-blue) 20%,
        var(--color-selfiesat-green) 100%
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
              src="/patches/SS.png"
              alt="SelfieSat Patch"
              width={300}
              height={300}
              className="relative z-10 drop-shadow-[0_0_25px_rgba(66,101,179,0.5)]"
            />
          </div>
        </div>
      </section>

      <LargeQuote
        text="Norway's first operational student satellite."
      />
      <TriImageCollage
        title="SelfieSat in Action"
        caption="SelfieSat successfully captured and transmitted 118 complete space selfies during its mission."
        src1="/tests/1.png"
        alt1="SelfieSat Selfie 1"
        src2="/tests/2.png"
        alt2="SelfieSat Selfie 2"
        src3="/tests/3.png"
        alt3="SelfieSat Selfie 3"
        variant="large-left"
      />
      <Specifications
        title="SelfieSat Specifications"
        specifications={{
          "Status": "Deorbited",
          "Weight": "1.8 kg",
          "Size": "10x10x20 cm",
          "Orbit": "SSO 540 km",
          "Cameras": "4",
          "Power": "1.2 W",
          "Band": "UHF",
          "Frequency": "437.5 MHz ± Doppler",
          "Telemetry": "AX.25",
          "Modulation": "2-FSK",
          "Baudrate": "9600",
          "Framing": "AX.25 G3RUH",
          "Launch Vehicle": "SpaceX Falcon 9",
          "Launch Date": "05/05/2022"
        }}
        graphic='/selfiesat/3.jpg'
        additionalGraphic='/tests/3.png'
      />
      <GeneralCollage 
        title="Mission Highlights"
        caption="SelfieSat was launched on May 5, 2022, aboard a SpaceX Falcon 9 rocket as part of the NUTS-3 mission. The satellite operated successfully for several months, capturing stunning images of Earth and transmitting them back to ground stations."
        images={[
          { src: "/tests/2.png", alt: "SelfieSat Image 2" },
          { src: "/tests/1.png", alt: "SelfieSat Image 1" },
          { src: "/tests/3.png", alt: "SelfieSat Image 3" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/5.jpg", alt: "SelfieSat Image 5" },
          { src: "/tests/4.png", alt: "SelfieSat Image 4" },
        ]}
      />
      <DoubleImages
        src1="/tests/1.png"
        alt1="SelfieSat Image 4"
        caption1='SelfieSat was designed and built by students at the Norwegian University of Science and Technology (NTNU) as part of the NUTS-3 satellite project.'
        src2="/tests/2.png"
        alt2="SelfieSat Image 5"
        caption2='SelfieSat was equipped with four cameras to capture stunning images of Earth from space.'
        variant='half-half-long-right'
      />
      <TriImageCollage
        src1="/tests/1.png"
        alt1="SelfieSat Selfie 1"
        src2="/tests/2.png"
        alt2="SelfieSat Selfie 2"
        src3="/tests/3.png"
        alt3="SelfieSat Selfie 3"
        title='Mission Overview'
        wideCaption={true}
        variant="large-right"
      />
      <section className="flex flex-col gap-12">
        <ImageAndCaption
          src="/tests/1.png"
          alt="SelfieSat Image 6"
          title="Building SelfieSat"
        caption="SelfieSat successfully captured and transmitted 118 complete space selfies during its mission. The project was a remarkable achievement for the student team, demonstrating not only technical expertise but also the ability to collaborate across disciplines and overcome significant engineering challenges. Throughout its operational period, SelfieSat provided invaluable data and imagery, contributing to educational outreach and inspiring future generations of space enthusiasts."
          wideCaption={true}
          link="https://www.ntnu.edu/ie/selfiesat"
          variant="large-right"
        />
        <LargeImage 
          src="/tests/2.png"
          alt="SelfieSat in Testing" 
        />
        <ImageAndCaption
          src="/tests/3.png"
          alt="SelfieSat in Orbit"
          title="Operational Success"
          caption="Once in orbit, SelfieSat transmitted images back to Earth, marking a milestone for Norwegian student-led space missions and inspiring future projects."
          wideCaption={true}
          link="https://www.ntnu.edu/ie/selfiesat"
          variant="large-left"
        />
      </section>

    </>
  )
}

export default SelfieSatPage