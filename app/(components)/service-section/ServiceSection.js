'use client';

import { motion } from "framer-motion";
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

  const {t} = useTranslation("portfolio")


  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative w-[20rem] h-[22rem] group"
    >
      <div className="absolute bg-[#012C8D] w-full h-full group-hover:-rotate-5 transition-transform duration-700 -z-10 rounded-md" />
      <div className="w-full h-full flex flex-col gap-6 transition-colors duration-700 bg-[#000B20] border-2 border-gray-200/20 hover:border-2 hover:border-[#1059AD] rounded-md p-6">
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