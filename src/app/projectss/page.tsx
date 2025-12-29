export default function Project() {
  const projects = [
    {
      title: "Signal Classification using ML",
      description:
        "Built machine learning models to classify real-world signals using time-domain and frequency-domain feature extraction techniques.",
      tech: ["Python", "Scikit-learn", "NumPy", "SciPy"],
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      title: "Time-Series Forecasting System",
      description:
        "Designed and evaluated forecasting models for sequential data using both statistical and machine learning approaches.",
      tech: ["Python", "PyTorch", "Pandas", "Statistics"],
      gradient: "from-cyan-400 to-teal-500",
    },
    {
      title: "Noise Reduction Pipeline",
      description:
        "Implemented digital filtering techniques to remove noise from signals and improve downstream model performance.",
      tech: ["Python", "SciPy", "DSP", "MATLAB"],
      gradient: "from-teal-400 to-green-500",
    },
    {
      title: "End-to-End ML Workflow",
      description:
        "Developed a complete ML pipeline including data preprocessing, model training, validation, and performance evaluation.",
      tech: ["Python", "Scikit-learn", "MLOps", "Git"],
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "DSP Research Experiment",
      description:
        "Conducted signal processing experiments to study how transformations affect model accuracy and robustness.",
      tech: ["Python", "MATLAB", "Research", "Analysis"],
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-gray-800">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div
              className={`h-48 bg-gradient-to-br ${project.gradient} group-hover:scale-105 transition-transform duration-300`}
            ></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
