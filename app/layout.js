import { Geist, Geist_Mono } from "next/font/google";
import ClientI18nProvider from "./(components)/ClientI18nProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mohamed Bouzidi - UX/UI Designer Portfolio",
  description:
    "Portfolio of Mohamed Bouzidi, a passionate UX/UI designer from Morocco. Explore his work in user-centered design, branding, and digital experiences using Figma, Photoshop, and Illustrator.",
  keywords: [
    "Mohamed Bouzidi",
    "UX/UI Designer",
    "Figma",
    "Graphic Design",
    "User Experience",
    "User Interface",
    "Brand Identity",
    "Portfolio",
    "Moroccan Designer",
    "SNRT",
    "Netopia",
  ],
  openGraph: {
    title: "Mohamed Bouzidi - UX/UI Designer",
    description:
      "Discover the creative journey of Mohamed Bouzidi, from SNRT to Netopia, crafting intuitive and engaging digital experiences.",
    images: ["/profile.jpg"],
    url: "https://bouzidi-mohamed.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', theme);
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full magicpattern text-foreground transition-colors duration-300`}
      >
        <ClientI18nProvider className="pointer-events-none w-0 h-0">
          
          {children}
        </ClientI18nProvider>
      </body>
    </html>
  );
}