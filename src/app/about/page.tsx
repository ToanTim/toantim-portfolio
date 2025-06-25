import Link from "next/link";
import { ROUTES } from "../../router";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-gray-800">
              About Us
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-600 mb-6">
                  We are a team of passionate innovators dedicated to creating cutting-edge solutions 
                  that make a difference. Our expertise spans across multiple domains, bringing together 
                  technology and creativity.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  With years of experience in the industry, we've helped countless clients achieve 
                  their goals through strategic thinking and innovative approaches.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold">Innovation</span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold">Technology</span>
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">Excellence</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg opacity-90">
                  To empower businesses and individuals through innovative technology solutions 
                  that drive growth and create lasting impact.
                </p>
              </div>
            </div>
          </div>
        </div>
  );
}
