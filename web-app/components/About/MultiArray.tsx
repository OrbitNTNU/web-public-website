import { motion } from "framer-motion";

export const steps = [
  {
    number: "140+",
    title: "Active Members",
    icon: "groups",
    description:
      "Our team consists of over 140 passionate students spanning mechanical, electrical, software, economics, computer science, and systems engineering, all collaborating on satellite design, mission planning, and outreach activities.",
  },
  {
    number: "4+",
    title: "Projects",
    icon: "rocket_launch",
    description:
      "From SelfieSat to FramSat, we run multiple projects simultaneously. Each project has dedicated teams covering spacecraft subsystems, software development, communications, and mission operations, giving students hands-on experience across disciplines.",
  },
  {
    number: ">500",
    title: "Annual Workshops",
    icon: "school",
    description:
      "We host over 500 workshops every year, teaching everything from mechanical assembly and electronics integration to coding, orbital simulations, and project management, helping students gain expertise in real-world engineering challenges.",
  },
];

const MultiArray = () => {
  return (
    <section className="max-w-[2000px] mx-auto px-4 md:px-12 w-full">
      <motion.h3
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "tween", stiffness: 200 }}
        className="mb-8 tracking-wider"
      >
        Key Figures
      </motion.h3>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-20">
        {steps.map((step, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              type: "tween",
              stiffness: 200,
              delay: 0.2 * idx,
            }}
          >
            <span className="material-icons" style={{ fontSize: "5rem" }}>{step.icon}</span>
            <h1 className="text-berry-blast">{step.number}</h1>
            <h2>{step.title}</h2>
            <p className="text-charcoal-light">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MultiArray;