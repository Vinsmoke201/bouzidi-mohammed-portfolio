'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const languages = [
        { code: 'en', name: 'English', flag: <img src="en.webp" className='w-4' /> },
        { code: 'fr', name: 'Français', flag: <img src="fr.png" className='w-4' /> }
    ];

    useEffect(() => {
        setMounted(true);

        // Get initial language from localStorage or browser preference
        const savedLanguage = localStorage.getItem('language');
        const browserLanguage = navigator.language.split('-')[0]; // Get 'en' from 'en-US'
        const supportedLanguages = ['en', 'fr'];

        let initialLanguage = 'en'; // default fallback

        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
            initialLanguage = savedLanguage;
        } else if (supportedLanguages.includes(browserLanguage)) {
            initialLanguage = browserLanguage;
        }

        // Change i18n language if different from current
        if (i18n.language !== initialLanguage) {
            i18n.changeLanguage(initialLanguage);
        }

        // Store the initial language if not already saved
        if (!savedLanguage) {
            localStorage.setItem('language', initialLanguage);
        }
    }, [i18n]);

    const handleLanguageChange = (languageCode) => {
        // Change i18next language
        i18n.changeLanguage(languageCode);

        // Store in localStorage
        localStorage.setItem('language', languageCode);

        // Close dropdown
        setIsOpen(false);

        console.log(`Language changed to: ${languageCode}`);
    };

    // Prevent hydration mismatch
    if (!mounted) {
        return (
            <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg bg-accent hover:bg-primary/20 transition-colors">
                    <span className="text-sm">🇺🇸 EN</span>
                </button>
            </div>
        );
    }

    // Get current language from i18next
    const currentLanguage = i18n.language || 'en';
    const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex flex-row items-center space-x-2 p-2 rounded-lg bg-accent hover:bg-primary/20 transition-colors"
                aria-label="Select language"
            >
                <span className="text-sm flex flex-row w-fit">
                    {currentLang.flag}
                </span>
                <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown */}
                    <div className="absolute right-0 mt-2 py-2 w-40 bg-background border border-accent rounded-lg shadow-lg z-20">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full flex-row text-left px-4 py-2 text-sm hover:bg-accent transition-colors flex items-center  ${currentLanguage === language.code
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-foreground'
                                    }`}
                            >
                                <span className='mr-2'>{language.flag}</span>
                                <span>{language.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}