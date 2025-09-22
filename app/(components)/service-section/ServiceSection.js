'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillProduct } from "react-icons/ai";
import { SiCssdesignawards } from "react-icons/si";
import { TbBrandAppleNews } from "react-icons/tb";
import { useInView } from "react-intersection-observer";

const services = [
  {
    icon: <SiCssdesignawards className="text-[#1059AD] text-5xl" />,
    nameKey: "services.0.name",
    descKey: "services.0.description",
  },
  {
    icon: <AiFillProduct className="text-[#1059AD] text-5xl" />,
    nameKey: "services.1.name",
    descKey: "services.1.description",
  },
  {
    icon: <TbBrandAppleNews className="text-[#1059AD] text-5xl" />,
    nameKey: "services.2.name",
    descKey: "services.2.description",
  },
];

const ServiceCard = ({ service, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const { t } = useTranslation("portfolio");
  const [isHovered, setIsHovered] = useState(false);

  // Define animation variants for the card
  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    rest: { scale: 1, transition: { duration: 0.3 } },
  };

  // Define animation variants for the background div
  const bgVariants = {
    rest: { rotate: 0, transition: { duration: 0.7 } },
    hover: { rotate: -5, transition: { duration: 0.7 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={inView ? "animate" : "initial"}
      variants={cardVariants}
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className="relative w-[20rem] h-[22rem] group"
    >
      <motion.div
        className="absolute bg-[#012C8D] w-full h-full rounded-md -z-10"
        variants={bgVariants}
        animate={isHovered ? "hover" : "rest"}
      />
      <div
        className={`w-full h-full flex flex-col gap-6 transition-colors duration-700 bg-[#000B20] border-2 ${
          isHovered ? "border-[#1059AD]" : "border-gray-200/20"
        } rounded-md p-6`}
      >
        {service.icon}
        <h2 className="text-xl font-bold">{t(service.nameKey)}</h2>
        <p className="text-justify text-gray-400">{t(service.descKey)}</p>
      </div>
    </motion.div>
  );
};

const ServiceSection = () => {
  const { t } = useTranslation("portfolio");

  return (
    <section id="services" className="w-full h-screen flex flex-col">
      <h1 className="mx-auto mt-[6rem] text-4xl">Services</h1>
      <div className="flex flex-row w-[75%] mx-auto mt-[8rem] justify-between">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;