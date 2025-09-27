'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image'; // Added for image optimization
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
    const [showCVPopup, setShowCVPopup] = useState(false); // New state for CV popup

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

    // Handle CV popup
    const handleCVClick = () => {
        setShowCVPopup(true);
    };

    const closeCVPopup = () => {
        setShowCVPopup(false);
    };

    // Handle escape key to close popup
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                setShowCVPopup(false);
            }
        };

        if (showCVPopup) {
            document.addEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.body.style.overflow = 'unset';
        };
    }, [showCVPopup]);

    return (
        <>
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
        ${scrolled ? "w-[80%]" : "w-[85%]"} rounded-full bg-gray-800/20 backdrop-blur-md`}
                >
                    <nav className="w-full h-full flex flex-row">
                        <Image
                            src="/logo.svg"
                            width={48} // Approximate width based on h-[2rem]
                            height={48}
                            className="my-auto ml-[4rem]"
                            alt="Logo"
                        />
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-[6rem] right-[9rem] z-[50] h-[75%] pointer-events-none"
                >
                    <img
                        src="/me.png"
                        className="object-contain top-[6rem] right-[9rem] z-[50] h-[100%]" // Changed to contain to preserve aspect ratio
                        alt="Profile picture"
                    />
                </motion.div>

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
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className='z-10 w-40 group pointer-events-auto'
                    >
                        <div className='relative'>
                            <div className='absolute inset-0 rounded-full z-[-10] w-full h-full bg-[#003DD7] transition-transform duration-1000 group-hover:-rotate-8' />
                            <button 
                                onClick={handleCVClick}
                                className='relative cursor-pointer h-full w-full bg-[#00227a] border border-[#001336] backdrop-blur-lg px-4 py-3 rounded-full text-white hover:bg-[#003299] transition-colors duration-300'
                            >
                                {t("getCV")}
                            </button>
                        </div>
                    </motion.div>
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
                        { value: 1, label: t("experienceYear") },
                        { value: 5, label: t("client") },
                        { value: 8, label: t("completProject") },
                        { value: 2, label: t("achievments") }
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

            {/* CV Popup Modal */}
            <AnimatePresence>
                {showCVPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
                        onClick={closeCVPopup}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-[#000B20]/30 backdrop-blur-lg rounded-lg shadow-2xl w-full max-w-5xl h-[80vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeCVPopup}
                                className="absolute top-4 right-4 z-10 bg-red-800 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-200"
                                aria-label="Close CV popup"
                            >
                                <svg 
                                    className="w-4 h-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* PDF Title */}
                            <div className="bg-[#000B20]/30 backdrop-blur-lg p-4">
                                <h3 className="text-lg font-semibold text-white">Mohamed Bouzidi - CV</h3>
                            </div>

                            {/* PDF Iframe */}
                            <iframe
                                src="/mohamed bouzidi.pdf"
                                className="w-[90%] m-auto h-[90%] border-0"
                                title="Mohamed Bouzidi CV"
                            >
                                <p className="p-4 text-center text-gray-600">
                                    Your browser does not support PDFs. 
                                    <a 
                                        href="/mohamed bouzidi.pdf" 
                                        className="text-blue-600 hover:text-blue-800 underline ml-2"
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        Download the PDF
                                    </a>
                                </p>
                            </iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default TopSection;