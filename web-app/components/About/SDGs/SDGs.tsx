import SDGsDesktop from "./SDGsDesktop"
import SDGsMobile from "./SDGsMobile";

export const sdgs = [
    {
        id: 4,
        title: "Quality Education",
        description: "Orbit NTNU offers hands-on learning experiences through programs like SubOrbital, where first-year students design and build satellites under mentorship. This initiative provides practical engineering skills and fosters a deep understanding of space technology.",
        image: "/sdgs/E-WEB-Goal-04.png"
    },
    {
        id: 5,
        title: "Gender Equality",
        description: "Orbit NTNU actively promotes gender balance in STEM by encouraging female participation in satellite engineering projects. Initiatives like the SubOrbital program and collaborations with NTNU's gender equality measures support this commitment.",
        image: "/sdgs/E-WEB-Goal-05.png"
    },
    {
        id: 8,
        title: "Decent Work and Economic Growth",
        description: "Through projects like BioSat and SelfieSat, Orbit NTNU provides students with opportunities to engage in real-world space missions, enhancing their employability and contributing to the growth of the space industry.",
        image: "/sdgs/E-WEB-Goal-08.png"
    },
    {
        id: 9,
        title: "Industry, Innovation, and Infrastructure",
        description: "Orbit NTNU develops small satellites with in-house subsystems, demonstrating innovation in space technology. Collaborations with industry partners like KONGSBERG further strengthen the infrastructure for student-led space initiatives.",
        image: "/sdgs/E-WEB-Goal-09.png"
    },
    {
        id: 12,
        title: "Responsible Consumption and Production",
        description: "Orbit NTNU's projects, such as BioSat, focus on sustainable space missions. By designing satellites that can support plant life in space, they explore responsible use of resources in extraterrestrial environments.",
        image: "/sdgs/E-WEB-Goal-12.png"
    },
    {
        id: 13,
        title: "Climate Action",
        description: "Orbit NTNU's BioSat project aims to develop systems that can sustain plant life in space, contributing to research on climate resilience and the potential for sustainable life support systems in space exploration.",
        image: "/sdgs/E-WEB-Goal-13.png"
    },
    {
        id: 17,
        title: "Partnerships for the Goals",
        description: "Orbit NTNU collaborates with NTNU, KONGSBERG, and other organizations to advance space technology education and research. These partnerships enhance the impact of their projects and contribute to achieving the SDGs.",
        image: "/sdgs/E-WEB-Goal-17.png"
    }
];
const SDGs = () => {
    return (
        <>
            <section className="hidden 2xl:flex">
                <SDGsDesktop />
            </section>
            <section className="2xl:hidden">
                <SDGsMobile />
            </section>
        </>

    )
}

export default SDGs;