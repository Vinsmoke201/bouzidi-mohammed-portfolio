'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import LanguageSelector from "../navigation/language-chooser";
import CountUp from '../shared/CountUp';
import LiquidEther from "../shared/LiquidEther";

const TopSection = () => {
    const { t } = useTranslation("portfolio");

    const [headerRef, headerInView] = useInView({ triggerOnce: true });
    const [introRef, introInView] = useInView({ triggerOnce: true });
    const [statsRef, statsInView] = useInView({ triggerOnce: true });
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [activeSection, setActiveSection] = useState("about");

    useEffect(() => {
        const sections = ["about", "services", "reviews", "portfolio", "contact"];
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);



    return (
        <section id='about' className="w-full h-screen relative">
            <LiquidEther
                colors={['#003DD7', '#000000', '#5937C8']}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
            />

            {/* Header Navigation */}
            <motion.header
                ref={headerRef}
                initial={{ opacity: 0, y: -30 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-[999] h-[3.5rem] pointer-events-auto transition-all duration-500
    ${scrolled ? "w-[75%]" : "w-[80%]"} rounded-full bg-gray-800/20 backdrop-blur-md`}
            >
                <nav className="w-full h-full flex flex-row">
                    <img src={"/Group 79.png"} className="h-[2rem] my-auto ml-[4rem]" />
                    <ul className="flex flex-row justify-between w-[50%] my-auto ml-auto mr-4">
                        {[
                            { id: "about", label: "About" },
                            { id: "services", label: "My Services" },
                            { id: "reviews", label: "Reviews" },
                            { id: "portfolio", label: "Portfolio" },
                            { id: "contact", label: "Contact Me" }
                        ].map(({ id, label }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`text-white text-lg px-4 py-2 rounded-full transition-colors
              ${activeSection === id ? "bg-gray-700/70" : "hover:bg-gray-700/70"}`}
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="flex items-center space-x-3 my-auto ml-4 mr-4">
                        <LanguageSelector />
                    </div>
                </nav>
            </motion.header>

            {/* Profile Image */}
            <motion.img
                src="/me.png"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-[6rem] right-[9rem] z-[50] h-[75%] pointer-events-none"
            />

            {/* Intro Text */}
            <motion.div
                ref={introRef}
                initial={{ opacity: 0, x: -50 }}
                animate={introInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="absolute top-[30%] left-[10%] flex flex-col pointer-events-none w-[50%] gap-y-5"
            >
                <h1 className='text-white text-xl'>
                    {t("greeting")}, {t("introducing")} <span className='font-bold'>{t("firstname")}</span>
                </h1>
                <h1 className='text-7xl'>{t("profession")}</h1>
                <p className='text-lg text-justify text-gray-400'>{t("about")}</p>
            </motion.div>

            {/* CV Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className='absolute bottom-[26%] left-[10%] z-10 w-40 group'
            >
                <div className='relative'>
                    <div className='absolute inset-0 rounded-full z-[-10] w-full h-full bg-[#003DD7] transition-transform duration-1000 group-hover:-rotate-8' />
                    <button className='relative cursor-pointer h-full w-full bg-[#00227a] border border-[#001336] backdrop-blur-lg px-4 py-3 rounded-full'>
                        {t("getCV")}
                    </button>
                </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                ref={statsRef}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className='absolute rounded-2xl justify-between px-16 py-3 border-2 border-[#01205a] bg-gradient-to-b from-[#000A1D]/50 to-[#010617]/50 backdrop-blur-xl bottom-[3%] w-[80%] left-[10%] flex flex-row pointer-events-none z-[10]'
            >
                {[
                    { value: 12, label: t("experienceYear") },
                    { value: 60, label: t("client") },
                    { value: 240, label: t("completProject") },
                    { value: 20, label: t("achievments") }
                ].map((item, index) => (
                    <div key={index} className='flex flex-col'>
                        <div className='flex flex-row text-5xl mx-auto'>
                            <CountUp from={0} to={item.value} separator="," direction="up" duration={1} className="count-up-text" />
                            <span>+</span>
                        </div>
                        <p className='text-gray-400 mx-auto'>{item.label}</p>
                    </div>
                ))}
            </motion.div>
        </section>
    );
};

export default TopSection;