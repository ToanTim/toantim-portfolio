export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-center text-gray-800">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-lg text-gray-600 mb-6">
              I work at the intersection of machine learning and signal
              processing, applying signal processing principles to data-driven
              problems. I am a Master's student in Signal Processing and Machine
              Learning at Tampere University, based in Tampere, Finland.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              My interests include supervised and unsupervised learning,
              time-series analysis, digital filtering, and spectral analysis. I
              am actively seeking thesis or applied AI/ML opportunities.
            </p>

            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                Signal Processing
              </span>
              <span className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-semibold">
                Machine Learning
              </span>
              <span className="bg-teal-100 text-teal-800 px-4 py-2 rounded-full text-sm font-semibold">
                Time-Series Analysis
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">What Makes Me Different</h3>
            <p className="text-lg opacity-90 mb-4">
              I approach problems from an AI/ML perspective while critically
              evaluating whether simpler analytical or signal-based methods can
              achieve better efficiency or reliability.
            </p>
            <p className="text-lg opacity-90">
              When machine learning is the right choice, I focus on building
              models that are accurate, explainable, and grounded in strong
              mathematical principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
