'use client';

import SDGs from "@/components/About/SDGs/SDGs";
import DoubleImages from "@/components/General/DoubleImages";
import ImageAndCaption from "@/components/General/ImageAndCaption";
import { ImageCard } from "@/components/General/ImageCard";
import JamesBond from "@/components/General/JamesBond";
import LargeQuote from "@/components/General/LargeQuote";
import SpanningText from "@/components/General/SpanningText";
import TriImageCollage from "@/components/General/TriImageCollage";
import Hero from "../landing/Hero";
import AboutHero from "@/components/About/AboutHero";
import ForSponsorsCard from "@/components/General/ForSponsorsCard";
import JoinCard from "@/components/General/JoinCard";

const About = () => {
    return (
        <div className="w-full relative max-w-7xl mx-auto gap-20 md:gap-40 my-40 flex flex-col">
            {/* <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-center max-w-2xl">
                Welcome to our website! We are dedicated to providing the best content and resources for our community.
                Our mission is to inspire, educate, and connect people through engaging articles, projects, and events.
            </p>
            <GlobeDots 
                title="We create the space industry's future talent"
                subtitle="We are designing and building small satellites that we launch into space. We want to create the next generation of talent by working on complex projects together."
            />
            <div className="h-screen"></div> */}
            {/* <MultiArray /> */}
            {/* <AboutHero /> */}
            <section className="px-4 md:px-12">
                <div className="w-full">
                    <span
                        className="text-2xl text-cloud-white md:text-3xl"
                    >
                        About Orbit NTNU
                    </span>
                    <span
                        className="block text-2xl text-charcoal-light sm:ml-2 sm:inline md:text-3xl"
                    >
                        - Empowering students to reach new heights in space technology and exploration. Orbit NTNU is Norway’s largest student organization dedicated to space technology, providing hands-on experience in designing, building, and operating small satellites.
                    </span>
                </div>
            </section>
            <DoubleImages
                variant="two-third-one-third"
                src1="/tests/1.png"
                alt1="Orbit NTNU members working on a satellite"
                title1="Building Satellites, Building Skills"
                caption1="Orbit NTNU brings together students from a wide range of engineering, science, and management disciplines — including electronics, computer science, mechanical design, systems engineering, and communications. Together, they collaborate to design, build, and operate small satellites from the ground up. Every member, from first-year students to graduate engineers, plays a vital role in developing satellite systems, testing hardware, writing mission control software, and preparing for space operations. This multidisciplinary teamwork reflects the real-world collaboration that drives the space industry, turning theoretical knowledge into tangible, orbit-ready technology."

                src2="/tests/2.png"
                alt2="Orbit NTNU outreach event with children"
                title2="Inspiring the Next Generation"
                caption2="Beyond building satellites, Orbit NTNU is deeply committed to engaging with the community and inspiring the next generation of space engineers. Our outreach team organizes hands-on workshops, talks, and exhibitions for schools, science fairs, and public events — giving children and students a glimpse into how satellites work and what it takes to reach space. Through these programs, we hope to ignite curiosity, promote STEM education, and show that space technology is something anyone can be part of, regardless of background. Every outreach event is a chance to share our passion for exploration and empower others to dream bigger."
            />
            <SDGs />
            <TriImageCollage
                title="A brief history"
                caption="Founded in 2018, Orbit NTNU is Norway’s largest student organization dedicated to space technology. Based at the Norwegian University of Science and Technology (NTNU), we give students hands-on experience in designing, building, and operating small satellites. Through projects like SelfieSat and FramSat, our members work across disciplines such as electronics, computer science, mechanical design, and communications - bridging the gap between academia and the space industry."
                wideCaption={true}

                src1="/tests/4.png"
                alt1="Orbit NTNU members working on a satellite"
                src2="/tests/2.png"
                alt2="Orbit NTNU satellite launch"
                src3="/tests/3.png"
                alt3="Orbit NTNU outreach event"
            />
            
            {/* <JamesBond /> */}
            <LargeQuote
                text="Empowering students to reach new heights in space technology and exploration."
            />
            <TriImageCollage
                variant="large-right"
                src1="/tests/4.png"
                alt1="Orbit NTNU members working on a satellite"
                src2="/tests/2.png"
                alt2="Orbit NTNU satellite launch"
                src3="/tests/3.png"
                alt3="Orbit NTNU outreach event"
            />
            {/* <ForSponsorsCard /> */}
            <ImageAndCaption
                title="About Orbit NTNU"
                caption={"Orbit NTNU is Norway’s largest student organization dedicated to space technology.\n\nFounded in 2018 and based at the Norwegian University of Science and Technology (NTNU), we provide students with hands-on experience in designing, building, and operating small satellites.\n\nOur multidisciplinary teams work on real satellite projects, gaining practical skills that prepare them for careers in the space industry."}
                src="/tests/1.png"
                alt="Orbit NTNU students working on satellite subsystem"
                wideCaption={true}
                variant="large-right"
                link="/teams"
            />
            {/* <JoinCard /> */}
        </div>
    );
}

export default About;

