import ResearchCard from "../../components/ResearchCard";

export default function Research() {
  const researchAreas = [
    {
      title: "Machine Learning",
      description:
        "Supervised and unsupervised learning approaches with focus on practical, interpretable models rather than black-box solutions.",
      tags: ["Classification", "Regression", "Clustering"],
      borderColor: "border-blue-500",
      tagColor: "bg-blue-50 text-blue-700",
    },
    {
      title: "Digital Signal Processing",
      description:
        "Advanced filtering, spectral analysis, and transformation techniques for signal enhancement and feature extraction.",
      tags: ["Filtering", "FFT", "Spectral Analysis"],
      borderColor: "border-cyan-500",
      tagColor: "bg-cyan-50 text-cyan-700",
    },
    {
      title: "Time-Series Analysis",
      description:
        "Forecasting and pattern recognition in sequential data using both statistical methods and modern machine learning approaches.",
      tags: ["Forecasting", "ARIMA", "LSTM"],
      borderColor: "border-teal-500",
      tagColor: "bg-teal-50 text-teal-700",
    },
    {
      title: "Mathematical Foundations",
      description:
        "Strong background in linear algebra, probability theory, statistics, and optimization—the core of robust ML and DSP work.",
      tags: ["Linear Algebra", "Statistics", "Optimization"],
      borderColor: "border-indigo-500",
      tagColor: "bg-indigo-50 text-indigo-700",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-gray-800">
        Research & Expertise
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {researchAreas.slice(0, 2).map((area, index) => (
              <ResearchCard key={index} {...area} />
            ))}
          </div>
          <div className="space-y-8">
            {researchAreas.slice(2, 4).map((area, index) => (
              <ResearchCard key={index} {...area} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
