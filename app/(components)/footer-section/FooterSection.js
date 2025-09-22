'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';
import { FaFigma, FaSquareXTwitter } from 'react-icons/fa6';

const FooterSection = () => {
    const { t } = useTranslation('portfolio');

    return (
        <section id="contact" className="w-full bg-[url('/footer-bg.png')] bg-cover bg-center text-white flex flex-col items-center justify-between min-h-[50vh] px-6 py-12 md:pt-12 lg:pt-24">
            <div className="flex flex-col md:flex-row w-full h-[80%] max-w-7xl gap-12 md:gap-8">
                {/* Brand Section */}
                <div className="flex flex-col w-full md:w-2/5 gap-6">
                    <Image
                        src="/Group 79.png"
                        width={40}
                        height={40}
                        alt="Logo"
                        className="object-contain"
                    />
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec.
                    </p>
                    <div className="flex flex-row gap-6 text-2xl text-gray-400">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <FaSquareXTwitter className="hover:text-white transition-colors duration-300" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FaFacebook className="hover:text-blue-600 transition-colors duration-300" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <FaInstagramSquare className="hover:text-pink-500 rounded-full transition-colors duration-300" />
                        </a>
                        <a href="https://figma.com" target="_blank" rel="noopener noreferrer" aria-label="Figma">
                            <FaFigma className="hover:text-white transition-colors duration-300" />
                        </a>
                    </div>
                </div>

                {/* Company Links */}
                <div className="flex flex-col w-full md:w-1/5 gap-4">
                    <h1 className="text-lg font-semibold text-white">Company</h1>
                    <a href="#about" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">About</a>
                    <a href="#features" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Features</a>
                    <a href="#works" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Works</a>
                    <a href="#career" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Career</a>
                </div>

                {/* Help Links */}
                <div className="flex flex-col w-full md:w-1/5 gap-4">
                    <h1 className="text-lg font-semibold text-white">Help</h1>
                    <a href="#support" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Customer Support</a>
                    <a href="#delivery" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Delivery Details</a>
                    <a href="#terms" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Terms & Conditions</a>
                    <a href="#privacy" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">Privacy Policy</a>
                </div>

                {/* Contact Info */}
                <div className="flex flex-col w-full md:w-1/5 gap-4">
                    <h1 className="text-lg font-semibold text-white">Contact</h1>
                    <p className="text-gray-400 text-sm md:text-base">Salé, Morocco</p>
                    <a href="mailto:mohamedbouzidi1110@gmail.com" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">mohamedbouzidi1110@gmail.com</a>
                    <a href="tel:+212608483107" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">+212 608 483107</a>
                    <a href="https://linkedin.com/in/mohamed-bouzidi" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm md:text-base transition-colors duration-300">LinkedIn Profile</a>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="w-full max-w-7xl mt-8 border-t border-gray-700 pt-6 flex justify-center">
                <span className="text-gray-400 text-sm md:text-base">
                    Created By Abdelilah AYACHE © 2025
                </span>
            </div>
        </section>
    );
};

export default FooterSection;