"use client";

import { useState } from "react";
import Link from "next/link";
import { ImageSwiper } from "@/components";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Mock project data for local preview
const mockProject = {
  id: "696666ca375b657eaabe0ecf",
  title: "GestureDocs",
  description:
    "An innovative documentation tool controlled entirely by hand gestures using computer vision and machine learning.",
  image:
    "https://res.cloudinary.com/dkxe7c5qm/image/upload/v1768326610/HandDocs_1_qmt4zd.jpg",
  steps: [
    {
      id: "696666ca375b657eaabe0ed0",
      title: "First Demo",
      icon: "settings",
      content: {
        engineering: `
<div class="space-y-6 text-gray-100">

  <p class="text-lg leading-relaxed">
    After <strong>2–3 hours of experimenting</strong> (and wrestling a bit with code 😅), I finally got the <strong>hand-gesture demo running</strong>! Copilot helped me generate runnable code in about 5 minutes — but it didn’t work as intended. So I spent the next few hours <strong>debugging and optimizing</strong> until it was stable enough for a demo.
  </p>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🧩 Tech Stack</h4>
    <ul class="list-disc list-inside space-y-1">
      <li><strong>MediaPipe (Google)</strong> — real-time hand tracking</li>
      <li><strong>OpenCV</strong> — computer vision toolkit</li>
      <li><strong>PyAutoGUI</strong> — cross-platform GUI automation</li>
    </ul>

    <!-- YouTube Video Player -->
    <div class="mt-4 aspect-w-16 aspect-h-9">
      <iframe 
        class="rounded-lg shadow-md border border-gray-600"
        src="https://www.youtube.com/embed/MmyUTw7ZpCQ" 
        title="Gesture Demo Video"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
      ></iframe>
    </div>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">⚠️ Current Limitations</h4>
    <ul class="list-disc list-inside space-y-1">
      <li>Detects <strong>one hand at a time</strong></li>
      <li>Output is <strong>noisy</strong> — per-frame decisions create fluctuations (as a master’s student in Signal Processing & ML, denoising is my daily life 😄)</li>
      <li>Gesture logic is <strong>basic</strong> — based on number of fingers up & distance between thumb & index finger (basically an if-else jungle 🧠🌴)</li>
      <li>Works fine for demo, but architecture needs a <strong>full redesign</strong> (currently like building a house on a thin stick 🪵)</li>
    </ul>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">💻 Current File Structure</h4>
    <pre class="bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-green-400 font-mono">
Hand-gesture-controlled/
├── main.py              # Main application
├── hand_detector.py     # Hand detection module
├── gesture_recognizer.py # Gesture recognition module
├── pdf_controller.py    # PDF control module
├── mouse_controller.py  # Mouse control module
├── requirements.txt     # Dependencies
└── README.md            # Documentation
    </pre>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🚀 Next Steps / Thinking Ahead</h4>
    <ul class="list-disc list-inside space-y-1">
      <li>Decide which language to continue with: Python, C++, or Rust</li>
      <li>Explore career paths: GestureTek, MotionGestures, or gesture-based document tools</li>
      <li>Investigate turning this into an <strong>MLOps project</strong> for deployment and automation</li>
      <li>Focus on <strong>documentation</strong>, my favorite but most underrated step</li>
    </ul>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🔗 References</h4>
    <ul class="list-disc list-inside space-y-1">
      <li><a href="https://lnkd.in/dBZ3MZZY" class="text-blue-400 hover:underline">MotionGestures — hand gesture recognition technology</a></li>
      <li><a href="https://lnkd.in/dp9KtgJG" class="text-blue-400 hover:underline">GestureTek — interactive gesture-based systems</a></li>
      <li><a href="https://lnkd.in/dAsC6KZ9" class="text-blue-400 hover:underline">3D Gaussian Splatting for Real-Time Radiance Field Rendering</a></li>
    </ul>
  </div>

</div>
`,
      },
      images: [],
    },
    {
      id: "696666ca375b687eaabe0ed2",
      title: "Project Planning, Roadmap & Architecture Decisions",
      icon: "goals",
      content: {
        engineering: `
<div class="space-y-6 text-gray-100">

  <p class="text-lg leading-relaxed">
    💡 <strong>Day 2 of being active on LinkedIn</strong>.  
    After about a day and a half of preparing documentation for my <strong>Hand Gesture Controlled</strong> project — including the development roadmap, software architecture, and file structure — I finally have a much clearer idea of the direction I want to take.
  </p>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🎯 Project Goal</h4>
    <p class="mb-2">
      My main goal is to make this project <strong>accessible to end users</strong>. Ideally, anyone should be able to:
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>Run the code directly from my GitHub repository, or</li>
      <li>Interact with it through a web interface — without touching any code.</li>
    </ul>
    <p class="mt-2 text-gray-300">
      Along the way, I aim to deepen my understanding of <strong>MLOps, computer vision, deep learning, 3D reconstruction</strong>, and related topics. The system will follow an <strong>MLOps-inspired pipeline</strong> to encourage good practices in model training, testing, and deployment.
    </p>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🧭 Project Development Roadmap (Planning Stage)</h4>

    <div class="space-y-4">
      <div class="bg-gray-800 p-3 rounded-md border border-gray-600">
        <h5 class="font-semibold mb-1">☁️ Option 1: Cloud-Based Application</h5>
        <p class="text-sm text-gray-300 mb-1"><strong>Pros:</strong></p>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Easier deployment and access (anyone can try it in a few clicks)</li>
          <li>Potential integration with protocols like Model Context Protocol (MCP)</li>
        </ul>
        <p class="text-sm text-gray-300 mt-2"><strong>Cons:</strong></p>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Operational cost and cloud complexity</li>
          <li>Latency depending on internet speed</li>
          <li>Privacy concerns around user video data</li>
        </ul>
      </div>

      <div class="bg-gray-800 p-3 rounded-md border border-gray-600">
        <h5 class="font-semibold mb-1">🖥️ Option 2: Standalone Desktop Application</h5>
        <p class="text-sm text-gray-300 mb-1"><strong>Pros:</strong></p>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Works offline</li>
          <li>More responsive (no network latency)</li>
          <li>Easier local data and privacy control</li>
        </ul>
        <p class="text-sm text-gray-300 mt-2"><strong>Cons:</strong></p>
        <ul class="list-disc list-inside text-sm space-y-1">
          <li>Platform-dependent (Windows / Linux / macOS)</li>
          <li>Harder to update remotely</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🚀 Planned Roadmap (Step-by-Step)</h4>
    <ul class="list-disc list-inside space-y-2">
      <li>
        <strong>Phase 1:</strong> GitHub repository with local execution — aimed at developers and technical users.  
        I plan to open-source it to allow collaboration (still exploring how best to manage that).
      </li>
      <li>
        <strong>Phase 2:</strong> Limited-feature web demo — for non-technical users, while keeping cloud costs under control.
      </li>
      <li>
        <strong>Phase 3:</strong> Desktop application & SDK — a user-friendly app for everyday users and an SDK for developers who want to integrate gesture control into their own systems.
      </li>
    </ul>
    <p class="mt-2 text-gray-300">
      I also noticed that companies like <strong>MotionGestures</strong> and <strong>GestureTek</strong> follow a similar approach by offering both SDKs and end-user software.
    </p>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🧱 Software Architecture Considerations</h4>
    <p class="mb-2">
      I explored several architectural options:
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>Modular Monolithic</li>
      <li>Microservices</li>
      <li>Event-Driven (Pub/Sub)</li>
    </ul>
    <p class="mt-2 text-gray-300">
      After weighing the trade-offs, I decided to go with a <strong>Modular Monolithic architecture</strong> for now.  
      It’s simple, fast to iterate on, and ideal for early-stage experimentation — with the option to refactor into microservices later if the project grows.
    </p>
  </div>

  <p class="text-lg leading-relaxed">
    🧠 <strong>Next step:</strong> begin implementing the Phase 1 GitHub repository structure and build a baseline model.  
    Any feedback or suggestions from engineers who’ve worked on <strong>MLOps pipelines, gesture-recognition systems, or scalable architectures</strong> would be incredibly valuable.
  </p>

  <p class="text-lg font-semibold">
    Let’s keep learning, building, and improving 👊
  </p>

</div>
`,
      },
      images: [
        "https://res.cloudinary.com/dkxe7c5qm/image/upload/v1768326794/HandDocs_4_btbfbf.jpg",
      ],
    },
    {
      id: "696666ca375b657eaabe0ed2",
      title: "Scaling & MLOps Insights",
      icon: "wall",
      content: {
        engineering: `
<div class="space-y-6 text-gray-100">

  <p class="text-lg leading-relaxed">
    💡 I’m moving my gesture-recognition demo toward a <strong>scalable setup</strong>.
    I chose an <strong>MLOps development path</strong> combined with a <strong>Modular Monolithic architecture</strong>.
    This is my first attempt at thinking about scaling while keeping flexibility and structure in mind.
  </p>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🧱 Architecture — What I Built and Why</h4>
    <p class="mb-2">
      I split the system into three clear components to keep things modular but maintainable:
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Hand Detector</strong> – detects & tracks hand joints in real-time, forming the foundation of gesture input</li>
      <li><strong>Gesture Recognition</strong> – classifies gestures from the hand joints</li>
      <li><strong>Controller</strong> – maps recognized gestures to actions (volume up/down, scrolling, etc.)</li>
    </ul>
    <p class="mt-2 text-gray-300">
      By separating these components, I can iterate on one module without breaking the others. This reflects my focus on building a system that’s **scalable and maintainable** rather than just functional.
    </p>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">🔄 MLOps & Evaluation — How I’m Learning</h4>
    <p class="mb-2">
      Before automating anything, I’m focusing on understanding the ML pipeline: <em>data → training → evaluation → deployment</em>.
      I built an <strong>evaluation pipeline</strong> for the gesture recognition module to establish a baseline — the current demo doesn’t include any learning component yet, so it’s a great starting point.
    </p>
    <ul class="list-disc list-inside space-y-1">
      <li>Using <a href="https://lnkd.in/d6dDAnva" class="text-blue-400 hover:underline">HaGRID (Sample 30k, 384p)</a> validation data, the current demo model gets ~32% accuracy.</li>
      <li>Not great — but exactly what I expected. This helps me know where I’m starting before trying to improve anything.</li>
    </ul>
    <p class="mt-2 text-gray-300">
      These small steps give me confidence to iterate and experiment without losing track of what works and what doesn’t.
    </p>
  </div>

  <div class="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600">
    <h4 class="text-xl font-semibold mb-3">📁 Dataset Insights — What I’ve Learned</h4>
    <ul class="list-disc list-inside space-y-1">
      <li>Data collection for retraining is a major challenge, especially with privacy constraints in gesture-based systems.</li>
      <li>I learned about <strong>synthetic joint data</strong> generation for hand pose and gesture training (e.g., Hi5 dataset).</li>
      <li>This approach looks promising to reduce privacy risks while enabling continuous model improvement.</li>
    </ul>
    <p class="mt-2 text-gray-300">
      These reflections are helping me think critically about how gesture recognition systems can scale responsibly, and what challenges to anticipate.
    </p>
  </div>

  <p class="text-lg leading-relaxed">
    Overall, this stage is not just about coding a demo — it’s about <strong>understanding the ML pipeline, designing scalable architecture, and thinking ahead</strong>. 
    More updates coming as I iterate on <strong>data, models, and automation</strong> 🚀
  </p>

  

</div>
`,
      },
      images: [
        "https://res.cloudinary.com/dkxe7c5qm/image/upload/v1768326610/HandDocs_2_fgney3.jpg",
        "https://res.cloudinary.com/dkxe7c5qm/image/upload/v1768326609/HandDocs_3_uuuv31.jpg",
      ],
    },
  ],
};

export default function ProjectDetailPreview() {
  const [project] = useState(mockProject);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const currentStep = project.steps[currentIndex];

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      router.replace("/"); // redirect to homepage in production mode
    }
  }, [router]);

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < project.steps.length - 1)
      setCurrentIndex(currentIndex + 1);
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
                    onClick={() => setCurrentIndex(index)}
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
                  <p className="text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex justify-end">
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full max-w-md rounded-lg shadow-lg object-cover"
                  />
                </div>
              </div>
            )}

            {/* Step content */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
              <div
                dangerouslySetInnerHTML={{
                  __html: currentStep.content.engineering,
                }}
              />
            </div>

            <div className="text-sm text-gray-400 text-center">
              Step {currentIndex + 1} of {project.steps.length}
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
              </button>
            </div>

            {/* Step images */}
            {currentStep.images.length > 0 && (
              <div className="mt-4">
                <ImageSwiper
                  images={currentStep.images}
                  title={currentStep.title}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
