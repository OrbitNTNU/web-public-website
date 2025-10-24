'use client';
import GlobeDots from "@/components/General/GlobeDots";
import SDGs from "@/components/General/SDGs/SDGs";

const About = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
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
            <SDGs />
        </div>
    );
}

export default About;

