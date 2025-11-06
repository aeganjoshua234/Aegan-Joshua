import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Find Your Dream Property
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Cloud-based real estate management made simple
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/properties"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Properties
              </Link>
              <Link
                href="/signup"
                className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border-2 border-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">🏠</div>
            <h3 className="text-xl font-bold mb-2">Property Management</h3>
            <p className="text-gray-600">
              Easily manage all your properties in one place with our intuitive cloud-based platform.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">☁️</div>
            <h3 className="text-xl font-bold mb-2">Cloud Storage</h3>
            <p className="text-gray-600">
              All your data securely stored in the cloud with Firebase, accessible anywhere, anytime.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
            <p className="text-gray-600">
              Get instant updates on property status, inquiries, and market changes in real-time.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose RealEstate Pro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="text-green-500 text-2xl mr-3">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Easy to Use</h4>
                <p className="text-gray-600">Intuitive interface designed for agents and clients</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-green-500 text-2xl mr-3">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Secure & Reliable</h4>
                <p className="text-gray-600">Enterprise-grade security with Firebase</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-green-500 text-2xl mr-3">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Mobile Friendly</h4>
                <p className="text-gray-600">Access your properties from any device</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-green-500 text-2xl mr-3">✓</div>
              <div>
                <h4 className="font-semibold mb-1">Real-time Sync</h4>
                <p className="text-gray-600">Changes sync instantly across all devices</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
