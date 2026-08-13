import Head from 'next/head'
import UserSidebar from '../src/components/dashboard/UserSidebar'

export default function Prescriptions() {
  return (
    <>
      <Head>
        <title>Upload Prescription - Awon Pharmacy</title>
        <meta name="description" content="Upload your prescription for quick processing" />
      </Head>

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-teal-600">Awon</span>
              <span className="text-2xl font-light text-gray-900">Pharmacy</span>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="/" className="text-gray-700 hover:text-teal-600 font-medium">Home</a>
              <a href="/products" className="text-gray-700 hover:text-teal-600 font-medium">Products</a>
              <a href="/prescriptions" className="text-teal-600 font-medium">Prescriptions</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen bg-gray-50">
        <div className="sidebar">
          <UserSidebar />
        </div>
        
        <div className="main-content">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Upload Prescription</h1>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">📄</div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Prescription</h2>
                  <p className="text-gray-600">Easy 3-step process to get your medications</p>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-teal-500 transition-colors">
                  <div className="text-4xl mb-4">📤</div>
                  <h3 className="text-xl font-semibold mb-2">Drop your prescription here</h3>
                  <p className="text-gray-600 mb-4">or click to browse files</p>
                  <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors">
                    Choose File
                  </button>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported formats: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                      <option>Delivery Option</option>
                      <option>Home Delivery</option>
                      <option>Pickup from Store</option>
                    </select>
                  </div>
                  
                  <button className="w-full mt-6 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium">
                    Submit Prescription
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}