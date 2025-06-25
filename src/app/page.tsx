"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import About from "./about/page";
import Contact from "./contact/page";
import Research from "./research/page";
import Project from "./projectss/page";
export default function Home() {
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

    // Cleanup
    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleSmoothScroll);
      });
    };
  }, []);

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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              Welcome to SignalMaster
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Innovative solutions for modern challenges. Discover our work,
              research, and connect with us.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#projects"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border-2 border-white/20 hover:border-orange-500 px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
              >
                Get in Touch
              </a>
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
    </div>
  );
}
