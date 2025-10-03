import IntroSlide from "../components/LandingPage/IntroSlide";
import Image from "next/image";
import Layout from "./layout";

export default function Home() {
  return (
    <Layout>
      <IntroSlide />
      <div className="w-full text-blue-500">
        <span>hdjaskd</span>
      </div>
      <div className="text-cloudWhite">default white text</div>
      <div className="text-blue-500">blue text</div>
      <main className="flex flex-col items-center gap-10 w-full max-w-xl">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={120}
          height={30}
          className="mb-4 dark:invert"
          priority
        />
        <h1 className="text-4xl font-extrabold text-white text-center tracking-tight drop-shadow-lg">
          Welcome to Orbit Web3
        </h1>
        <p className="text-lg text-[#b2b7ff] text-center max-w-md">
          Experience the future of the decentralized web. Fast, secure, and built for the next generation of internet applications.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
          <a
            href="https://app.orbit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#00ffe7] text-[#1a2980] font-semibold rounded-full px-6 py-3 shadow-lg hover:bg-[#00c9b7] transition-colors text-base flex items-center justify-center"
          >
            Launch App
          </a>
          <a
            href="https://docs.orbit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 border border-white/20 text-white font-semibold rounded-full px-6 py-3 hover:bg-white/20 transition-colors text-base flex items-center justify-center"
          >
            Read Docs
          </a>
        </div>
        <div className="flex gap-6 mt-8">
          <a
            href="https://twitter.com/orbit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Image src="/twitter.svg" alt="Twitter" width={28} height={28} />
          </a>
          <a
            href="https://discord.gg/orbit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Image src="/discord.svg" alt="Discord" width={28} height={28} />
          </a>
          <a
            href="https://github.com/orbit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <Image src="/github.svg" alt="GitHub" width={28} height={28} />
          </a>
        </div>
      </main>
      <footer className="mt-16 text-xs text-[#b2b7ff] text-center opacity-80">
        &copy; {new Date().getFullYear()} Orbit Web3. All rights reserved.
      </footer>
    </Layout>
  );
}
