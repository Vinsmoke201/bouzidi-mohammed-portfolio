'use client';

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";

const projects = Array(6).fill({
  title: "Coffee Shop Menu Design",
  description:
    "A clean, inviting menu design that reflects the cozy vibe of a coffee shop while making choices easy and enjoyable.",
  image: "project.png",
  link: "https://www.figma.com/design/eNs94iYmFc0mvwDcCtZUPS/Untitled?node-id=4-6&t=11rnVH1Og3g7ugTE-0",
});

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