'use client';

import MultiArray from "@/components/About/MultiArray";
import SDGs from "@/components/About/SDGs/SDGs";

const About = () => {
    return (
        <>
            <h1 className="text-4xl font-bold mb-4">About Us</h1>
            <p className="text-lg text-center max-w-2xl">
                Welcome to our website! We are dedicated to providing the best content and resources for our community.
                Our mission is to inspire, educate, and connect people through engaging articles, projects, and events.
            </p>
            {/* <GlobeDots 
                title="We create the space industry's future talent"
                subtitle="We are designing and building small satellites that we launch into space. We want to create the next generation of talent by working on complex projects together."
            /> */}
            <div className="h-screen"></div>
            <MultiArray />
            <SDGs />
        </>
    );
}

export default About;

