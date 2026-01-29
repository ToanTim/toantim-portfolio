"use client";

import { useState, useEffect, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { ProjectData, Step } from "../../../types/types";
import { getProjectById } from "@/utils/fetchProjectApi";
import { ImageSwiper } from "@/components";
import { ProjectDetailSkeleton } from "@/components/skeletons";

export default function ProjectDetail() {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [activeStep, setActiveStep] = useState(project?.steps[0]?.id || null);
  const [currentIndex, setCurrentIndex] = useState(0); //It is 0 because the step index start at 0
  useEffect(() => {
    setLoading(true);
    getProjectById(projectId).then((data) => {
      setProject(data);
      //console.log(data);
      setTimeout(() => {
        setLoading(false);
      }, 500); // So it not gonna blinkning too fast

      // If no data, redirect to /#projects
      if (!data) {
        router.push("/#projects");
      }
    });
  }, [projectId, router]);

  if (loading) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return null;
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setActiveStep(project.steps[currentIndex - 1].id);
      setCurrentIndex(currentIndex - 1);
      //console.log(currentIndex);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  const project_step_length = project.steps.length;
  const handleNext = () => {
    if (currentIndex < project_step_length - 1) {
      setActiveStep(project.steps[currentIndex + 1].id);
      setCurrentIndex(currentIndex + 1);
      //console.log(currentIndex);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/#projects"
                className="text-sm text-gray-400 hover:text-cyan-400 mb-2 inline-flex items-center transition"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Projects
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                {project.title}
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Stepper */}
          <aside className="lg:w-64 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-gray-800 rounded-lg shadow-xl p-4 border border-gray-700">
              <h3 className="font-semibold text-gray-200 mb-4 text-sm uppercase tracking-wide">
                Project Timeline
              </h3>
              <div className="space-y-1">
                {project.steps.map((step, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }, 100);
                    }}
                    className={`w-full text-left p-3 rounded-lg transition ${
                      currentIndex === index
                        ? "bg-cyan-500/20 border-l-4 border-cyan-500"
                        : "hover:bg-gray-700/50 border-l-4 border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          currentIndex === index
                            ? "bg-cyan-500 text-white"
                            : currentIndex > index
                              ? "bg-gray-600 text-white"
                              : "bg-gray-700 text-gray-400"
                        }`}
                      >
                        {currentIndex > index ? "✓" : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-gray-400 mb-0.5">
                          Step {step.id}
                        </div>
                        <div
                          className={`text-sm font-medium break-words whitespace-normal ${
                            currentIndex === index
                              ? "text-cyan-400"
                              : "text-gray-300"
                          }`}
                        >
                          {step.icon} {step.title}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Problem statement and image */}
            {project.image && (
              <div className="mb-6 grid md:grid-cols-2 gap-6 items-center bg-gray-800 rounded-lg p-6 border border-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Problem Statement
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* GitHub Repository Link */}
                  {project.github_link && (
                    <a
                      href={project.github_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      {/* GitHub Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5"
                      >
                        <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.16 0 0 .97-.31 3.18 1.18a11.06 11.06 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.64.24 2.86.12 3.16.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.26 5.68.41.36.78 1.08.78 2.18v3.23c0 .31.21.67.8.56A11.52 11.52 0 0023.5 12.02C23.5 5.74 18.27.5 12 .5z" />
                      </svg>
                      View on GitHub
                    </a>
                  )}
                </div>

                <div className="flex justify-end">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full max-w-md rounded-lg shadow-lg object-cover border border-gray-700"
                  />
                </div>
              </div>
            )}

            {/* Step content */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
              <h1 className="text-2xl font-bold text-white mb-4 text-center">
                {project.steps[currentIndex].title}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: project.steps[currentIndex].content.engineering,
                }}
              />
            </div>

            <div className="text-sm text-gray-400 text-center">
              Slide {currentIndex + 1} of {project.steps.length}
            </div>

            {/* Navigation Footer */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  currentIndex === 0
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                    : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex + 1 === project.steps.length}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
                  currentIndex === project.steps.length - 1
                    ? "bg-gray-800 text-gray-600 cursor-not-allowed border border-gray-700"
                    : "bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg hover:shadow-cyan-500/50"
                }`}
              >
                Next
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Step image with swiper/slider */}
            <div
              style={{
                display:
                  project.steps[currentIndex].images &&
                  project.steps[currentIndex].images.length > 0
                    ? "block"
                    : "none",
              }}
            >
              <ImageSwiper
                key={currentIndex}
                images={project.steps[currentIndex].images || []}
                title={project.steps[currentIndex].title || ""}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
