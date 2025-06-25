export default function Project() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-gray-800">
        Our Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((project) => (
          <div
            key={project}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
          >
            <div className="h-48 bg-gradient-to-br from-orange-400 to-purple-500 group-hover:from-orange-500 group-hover:to-purple-600 transition-all duration-300"></div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                Project {project}
              </h3>
              <p className="text-gray-600 mb-4">
                A brief description of this amazing project and its impact on
                the industry.
              </p>
              <button className="text-orange-600 hover:text-orange-700 font-semibold hover:underline">
                Learn More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
