"use client";
import { motion } from "framer-motion";

const disciplines = [
    {
        icon: <span className="text-berry-blast material-icons">engineering</span>,
        title: "Engineering & Design",
        desc: "Design and build satellite systems — from mechanical structures to electronic payloads and communication modules.",
    },
    {
        icon: <span className="text-emerald-fizz material-icons">code</span>,
        title: "Software & Web",
        desc: "Develop mission software, web platforms, and embedded control systems that bring our satellites to life.",
    },
    {
        icon: <span className="text-pink-blast material-icons">campaign</span>,
        title: "Marketing & Outreach",
        desc: "Help share Orbit’s story with the world — manage branding, public relations, and events that inspire future engineers.",
    },
    {
        icon: <span className="text-orange-sherbert material-icons">people</span>,
        title: "Human Resources & Organization",
        desc: "Shape the culture of Orbit NTNU by recruiting new members, hosting social events, and ensuring our teams thrive.",
    },
    {
        icon: <span className="text-sky-mint material-icons">psychology</span>,
        title: "Operations & Management",
        desc: "Coordinate teams, track milestones, and ensure our projects launch on time — literally.",
    },
    {
        icon: <span className="text-laser-lemon material-icons">account_balance</span>,
        title: "Finance & Sponsorship",
        desc: "Manage budgets, secure funding, and build relationships with sponsors to fuel our ambitious space missions.",
    }
];

const benefits = [
    {
        icon: <span className="text-berry-blast material-icons">rocket_launch</span>,
        title: "Launch Real Space Projects",
        desc: "Work on actual satellite missions like SelfieSat and FramSat, gaining hands-on experience few students ever get.",
    },
    {
        icon: <span className="text-emerald-fizz material-icons">school</span>,
        title: "Learn by Doing",
        desc: "Develop practical skills in engineering, teamwork, and leadership while collaborating with other motivated students.",
    },
    {
        icon: <span className="text-pink-blast material-icons">favorite</span>,
        title: "Find Your Community",
        desc: "Be part of a passionate and inclusive group that celebrates curiosity, creativity, and space exploration.",
    },
    {
        icon: <span className="text-sky-mint material-icons">precision_manufacturing</span>,
        title: "Access Labs & Resources",
        desc: "Use advanced facilities at NTNU to prototype, test, and refine real satellite components and systems.",
    },
];

const JoinCard = () => {
    return (
        <section className="w-full mx-auto px-4 md:px-12 max-w-7xl text-left md:text-center">
            {/* Header */}
            <div>
                <motion.h2 className="mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Curious about joining Orbit NTNU?
                </motion.h2>
                <motion.p
                    className="mb-10 w-full md:w-2/3 text-slate mx-auto leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    Are you curious about space, technology, or teamwork? At Orbit NTNU, students from all disciplines
                    - from mechanical engineering to marketing — collaborate to design, build, and operate satellites.
                    Whether you’re into code, communication, or creativity, there’s a place for you in Orbit.
                </motion.p>
            </div>

            {/* Disciplines */}
            <h3 className="mb-8 tracking-wider">Some of the fields we cover:</h3>
            <div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
                {disciplines.map((item, i) => (
                    <motion.div
                        key={i}
                        className="shadow-md border-1 border-slate rounded-md p-6 flex flex-col items-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}

                    >
                        <div className="text-4xl mb-4">{item.icon}</div>
                        <h3 className="mb-2">{item.title}</h3>
                        <p className="text-slate leading-relaxed">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Benefits */}
            <h3 className="mb-8 tracking-wider">What we offer:</h3>
            <div
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
                {benefits.map((item, i) => (
                    <motion.div
                        key={i}
                        className="shadow-md border-1 border-slate rounded-md p-6 flex flex-col items-start"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                            type: "tween",
                            stiffness: 200,
                            delay: 0.2 * i,
                        }}
                    >
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h4 className="mb-1">{item.title}</h4>
                        <p className="text-slate">{item.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8 md:mt-12">
                <a
                    href="/join"
                    className="bg-berry-blast hover:bg-sky-mint text-cloud-white py-4 px-8 rounded-md shadow-lg transition-colors duration-300"
                >
                    Learn More & Apply
                </a>
            </div>
        </section>
    );
};

export default JoinCard;
