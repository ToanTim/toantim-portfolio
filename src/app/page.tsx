"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import About from "./about/page";
import Contact from "./contact/page";
import Research from "./research/page";
import Project from "./projects/page";
export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Smooth scroll function
    interface SmoothScrollEvent
      extends React.MouseEvent<HTMLAnchorElement, MouseEvent> {
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
