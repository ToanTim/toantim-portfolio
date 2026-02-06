"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import About from "./about/page";
import Contact from "./contact/page";
import Research from "./research/page";
import Project from "./projects/page";
import Timeline from "./timeline/page";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Smooth scroll function
    interface SmoothScrollEvent extends React.MouseEvent<
      HTMLAnchorElement,
      MouseEvent
    > {
      currentTarget: HTMLAnchorElement;
    }

    const handleSmoothScroll = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      if (!href) return;
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    };

    // Add event listeners to all navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach((link) => {
      link.addEventListener("click", handleSmoothScroll);
    });

    // Handle scroll to top button visibility
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Navbar />

      {/* Home Section */}
      <section
        id="home"
        className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      >
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Toan Tran (Tim)
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Machine Learning & Signal Processing Engineer
            </p>
            <div className="mb-6 mx-auto max-w-4xl">
              <div className="inline-block bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 rounded-lg px-6 py-3 backdrop-blur-sm">
                <p className="text-cyan-300 font-semibold text-base md:text-lg">
                  🔍 Seeking Thesis/Applied AI/ML Opportunities | Computer
                  Vision & MLOps | Python & C++
                </p>
              </div>
            </div>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Applying signal processing principles to machine learning
              problems. Based in Tampere, Finland.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a
                href="#projects"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border-2 border-white/20 hover:border-cyan-400 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Get in Touch
              </a>
            </div>
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://www.linkedin.com/in/toan-tran-tim/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM8.34 17.34V10.66H6V17.34H8.34ZM7.17 9.66C7.96 9.66 8.6 9 8.6 8.18C8.6 7.36 7.96 6.7 7.17 6.7C6.38 6.7 5.73 7.36 5.73 8.18C5.73 9 6.38 9.66 7.17 9.66ZM18 17.34V13.36C18 11.34 16.92 10.36 15.3 10.36C14.12 10.36 13.47 11.02 13.17 11.64V10.66H10.83C10.86 11.3 10.83 17.34 10.83 17.34H13.17V13.76C13.17 12.76 13.36 11.84 14.56 11.84C15.74 11.84 15.76 12.94 15.76 13.82V17.34H18Z" />
                </svg>
              </a>
              <a
                href="https://github.com/ToanTim"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="text-gray-300 hover:text-cyan-400 transition-colors"
              >
                <svg
                  className="w-7 h-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2C6.48 2 2 6.58 2 12.26C2 16.78 4.87 20.6 8.84 21.95C9.34 22.05 9.5 21.74 9.5 21.47C9.5 21.23 9.49 20.6 9.48 19.79C6.73 20.41 6.14 18.61 6.14 18.61C5.68 17.39 5.03 17.06 5.03 17.06C4.12 16.41 5.1 16.42 5.1 16.42C6.1 16.49 6.63 17.48 6.63 17.48C7.52 19.06 8.97 18.62 9.54 18.37C9.63 17.7 9.89 17.24 10.17 16.98C7.95 16.73 5.62 15.84 5.62 11.72C5.62 10.55 6.02 9.59 6.68 8.84C6.58 8.58 6.22 7.5 6.78 6.04C6.78 6.04 7.67 5.74 9.48 7.03C10.34 6.78 11.26 6.65 12.18 6.65C13.1 6.65 14.02 6.78 14.88 7.03C16.69 5.74 17.58 6.04 17.58 6.04C18.14 7.5 17.78 8.58 17.68 8.84C18.34 9.59 18.74 10.55 18.74 11.72C18.74 15.85 16.4 16.72 14.17 16.98C14.53 17.3 14.85 17.94 14.85 18.92C14.85 20.33 14.84 21.34 14.84 21.47C14.84 21.74 15 22.06 15.5 21.95C19.47 20.6 22 16.78 22 12.26C22 6.58 17.52 2 12 2Z" />
                </svg>
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                Python • NumPy • SciPy
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                PyTorch • Scikit-learn
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                DSP • Time-Series Analysis
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen pt-20 bg-gray-100">
        <About />
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="min-h-screen pt-20 bg-gray-100">
        <Timeline />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen pt-20 bg-white">
        <Project />
      </section>

      {/* Research Section */}
      <section id="research" className="min-h-screen pt-20 bg-gray-50">
        <Research />
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen pt-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
      >
        <Contact />
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
