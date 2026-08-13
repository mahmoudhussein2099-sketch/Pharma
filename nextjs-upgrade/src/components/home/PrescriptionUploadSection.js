import React, { useState } from 'react';

const PrescriptionUploadSection = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const steps = [
    { number: 1, title: 'Upload', description: 'Upload your prescription' },
    { number: 2, title: 'Details', description: 'Add contact details' },
    { number: 3, title: 'Confirm', description: 'Review and confirm' }
  ];

  return (
    <section className="py-16 bg-teal-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Upload Your Prescription
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Easy 3-step process to get your medications delivered
          </p>
          
          {/* Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      currentStep >= step.number 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.number}
                    </div>
                    <div className="text-center mt-2">
                      <div className="font-medium text-sm">{step.title}</div>
                      <div className="text-xs text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-1 mx-4 ${
                      currentStep > step.number ? 'bg-teal-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Upload Area */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {currentStep === 1 && (
              <div className="text-center">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 hover:border-teal-500 transition-colors">
                  <div className="text-6xl mb-4">📄</div>
                  <h3 className="text-xl font-semibold mb-2">Drop your prescription here</h3>
                  <p className="text-gray-600 mb-4">or click to browse files</p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="prescription-upload"
                  />
                  <label
                    htmlFor="prescription-upload"
                    className="bg-teal-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-teal-700 transition-colors inline-block"
                  >
                    Choose File
                  </label>
                  <p className="text-sm text-gray-500 mt-4">
                    Supported formats: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                    <option>Delivery Option</option>
                    <option>Home Delivery</option>
                    <option>Pickup from Store</option>
                  </select>
                </div>
                <div className="flex justify-between mt-8">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">Prescription Submitted!</h3>
                <p className="text-gray-600 mb-6">
                  We'll review your prescription and contact you within 2 hours
                </p>
                <button 
                  onClick={() => {
                    setCurrentStep(1);
                    setUploadedFile(null);
                  }}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Upload Another
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrescriptionUploadSection;