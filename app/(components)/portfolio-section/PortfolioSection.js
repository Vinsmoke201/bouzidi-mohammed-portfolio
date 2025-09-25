'use client';

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const projects = new Array({
  title: "Teaeft",
  description:
    "A clean, inviting menu design that reflects the cozy vibe of a coffee shop while making choices easy and enjoyable.",
  image: "teaeft.png",
  link: "https://www.figma.com/design/aN0nKX2eVyj5DI5iBpmji7/MED?node-id=0-1&p=f&t=RckAjb76YOiaNewo-0",
},
  {
    title: "Woosh motorcycle driver app design",
    description: "A clean, a look alike project of indrive but for motor cycles",
    image: "woosh.png",
    link: "https://www.figma.com/design/wMlpWNbw4wkoFyQybQaa2Q/Woosh?node-id=2-23&t=9zZfOr2b1rUyvdKd-1"
  },
  {
    title: "Social Security",
    description:
      "A clean, inviting menu design that reflects the cozy vibe of a coffee shop while making choices easy and enjoyable.",
    image: "social-security.png",
    link: "https://www.figma.com/design/WYAT4lOrSRFtiDxzp7Q5Py/SOCIAL-SECURITY-ADMINISTRATION?node-id=0-1&p=f&t=a8OpBX2gT54wCFDt-0",
  },
  {
    title: "Cinema",
    description:
      "A clean, design for an app to show all the movies in it.",
    image: "cinema.png",
    link: "https://www.figma.com/design/EAMWMCcd2OJANhqirPNqpJ/Cinema-L-----FIRST-DESIGN-EVER?node-id=12-1325&t=yYkZ4Q6riWTqrtz5-1",
  },
  {
    title: "Billetrie application CAN-25",
    description:
      "A clean, design for an app to show all the movies in it.",
    image: "billetrie-app.png",
    link: "https://www.figma.com/design/gzrcdWnid2sZg0YnRqPbs7/RANDOM-TESTS?node-id=0-1&t=X9wyNaDGqwgIdGIu-1",
  },
  {
    title: "MNTN",
    description:
      "A clean, design for an app to show all the movies in it.",
    image: "mntn.png",
    link: "https://www.figma.com/design/1NyTr2LsdCFI7gNdOKJMiA/IMPROVE-MNTN?node-id=0-1&t=Dmjna9MSr6vm2zGw-1",
  },
);

// New component for individual project
const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full h-[30vh] col-span-1 rounded-lg overflow-hidden group"
    >
      <div className="absolute inset-[50%] group-hover:inset-0 group-hover:w-full group-hover:h-full w-0 h-0 opacity-0 group-hover:opacity-100 bg-black/30 backdrop-blur-md flex flex-col z-10 gap-6 transition-all duration-1000">
        <a href={project.link} target="_blank" rel="noopener noreferrer">
          <img
            src="/Figma-Logo.png"
            className="w-10 h-10 mx-auto mt-6 cursor-pointer"
            alt="Figma Logo"
          />
        </a>
        <h1 className="mx-auto text-xl font-bold">{project.title}</h1>
        <p className="text-gray-400 mx-auto w-[80%] text-justify">{project.description}</p>
      </div>
      <img
        src={project.image}
        className="w-full h-full group-hover:scale-110 transition-all duration-700"
        loading="lazy"
        alt={project.title} // Already correct
      />
    </motion.div>
  );
};

const PortfolioSection = () => {
  const { t } = useTranslation("portfolio");

  return (
    <section id="portfolio" className="w-full min-h-screen flex flex-col">
      <h1 className="mx-auto mt-[6rem] text-4xl">{t("projetTitle")}</h1>
      <div className="grid grid-cols-3 w-[80%] m-auto gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;