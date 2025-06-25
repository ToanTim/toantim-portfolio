
export default function Research() {
  return (
    <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center text-gray-800">
            Research & Innovation
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">AI & Machine Learning</h3>
                  <p className="text-gray-600">
                    Exploring the frontiers of artificial intelligence to create smarter, more efficient solutions.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Signal Processing</h3>
                  <p className="text-gray-600">
                    Advanced signal processing techniques for next-generation communication systems.
                  </p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">IoT Solutions</h3>
                  <p className="text-gray-600">
                    Connecting the world through innovative Internet of Things applications and platforms.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Quantum Computing</h3>
                  <p className="text-gray-600">
                    Pioneering research in quantum algorithms and their practical applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}
