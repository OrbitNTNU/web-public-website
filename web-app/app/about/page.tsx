"use client";

import SDGs from "@/components/AboutPage/SDGs/SDGs";
import DoubleImages from "@/components/General/DoubleImages";
import ImageAndCaption from "@/components/General/ImageAndCaption";
import LargeQuote from "@/components/General/LargeQuote";
import TriImageCollage from "@/components/General/TriImageCollage";
import Statistics from "@/components/AboutPage/Statistics/Statistics";

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
      <LargeQuote text="Learning by doing is at the heart of our approach." />
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
      <SDGs />
      <DoubleImages
        variant="two-third-one-third"
        src1="/tests/1.png"
        alt1="Orbit NTNU members working on a satellite"
        title1="Building Satellites, Building Skills"
        caption1="Orbit NTNU brings together students from a wide range of engineering, science, and management disciplines — including electronics, computer science, mechanical design, systems engineering, and communications. Together, they collaborate to design, build, and operate small satellites from the ground up. "
        src2="/tests/2.png"
        alt2="Orbit NTNU outreach event with children"
        title2="Inspiring the Next Generation"
        caption2="Beyond building satellites, Orbit NTNU is deeply committed to engaging with the community and inspiring the next generation of space engineers. Every outreach event is a chance to share our passion for exploration and empower others to dream bigger."
      />
      {/* <JamesBond /> */}
      <LargeQuote text="Empowering students to reach new heights in space technology and exploration." />

      {/* <ForSponsorsCard /> */}
      <section className="flex flex-col gap-12">
        <ImageAndCaption
          title="About Orbit NTNU"
          caption={
            "Orbit NTNU is Norway’s largest student organization dedicated to space technology.\n\nFounded in 2018 and based at the Norwegian University of Science and Technology (NTNU), we provide students with hands-on experience in designing, building, and operating small satellites.\n\nOur multidisciplinary teams work on real satellite projects, gaining practical skills that prepare them for careers in the space industry."
          }
          src="/tests/1.png"
          alt="Orbit NTNU students working on satellite subsystem"
          wideCaption={true}
          variant="large-left"
          link="/teams"
        />
        <ImageAndCaption
          title="About Orbit NTNU"
          caption={
            "Orbit NTNU is Norway’s largest student organization dedicated to space technology.\n\nFounded in 2018 and based at the Norwegian University of Science and Technology (NTNU), we provide students with hands-on experience in designing, building, and operating small satellites.\n\nOur multidisciplinary teams work on real satellite projects, gaining practical skills that prepare them for careers in the space industry."
          }
          src="/tests/7.jpg"
          alt="Orbit NTNU students working on satellite subsystem"
          wideCaption={true}
          variant="large-right"
          link="/teams"
        />
      </section>
      {/* <JoinCard /> */}
      <LargeQuote text="Our members define who we are and what we achieve." />
      <Statistics />
      <TriImageCollage
        variant="large-right"
        src1="/tests/4.png"
        alt1="Orbit NTNU members working on a satellite"
        src2="/tests/2.png"
        alt2="Orbit NTNU satellite launch"
        src3="/tests/3.png"
        alt3="Orbit NTNU outreach event"
      />
    </div>
  );
};

export default About;
