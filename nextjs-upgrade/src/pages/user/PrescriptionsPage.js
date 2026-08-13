import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../components/dashboard/UserSidebar';

const PrescriptionsPage = () => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryOption: 'pickup',
    address: '',
    notes: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setCurrentStep(2);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setUploadedFile(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      deliveryOption: 'pickup',
      address: '',
      notes: ''
    });
  };

  const steps = [
    { number: 1, title: 'Upload', description: 'Upload your prescription' },
    { number: 2, title: 'Details', description: 'Add contact details' },
    { number: 3, title: 'Confirm', description: 'Review and confirm' }
  ];

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Prescription</h1>
            <p className="text-gray-600">Easy 3-step process to get your medications delivered</p>
          </div>

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

          {/* Content */}
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
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                {uploadedFile && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">📄</div>
                      <div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">{(uploadedFile.size / 1024).toFixed(2)} KB</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <select 
                    name="deliveryOption"
                    value={formData.deliveryOption}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="pickup">Pickup from Store</option>
                    <option value="delivery">Home Delivery</option>
                  </select>
                </div>

                {formData.deliveryOption === 'delivery' && (
                  <div className="mb-6">
                    <textarea
                      name="address"
                      placeholder="Delivery Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}

                <div className="mb-6">
                  <textarea
                    name="notes"
                    placeholder="Additional Notes (Optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Submit Prescription
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-xl font-semibold mb-2">Prescription Submitted Successfully!</h3>
                <p className="text-gray-600 mb-6">
                  We'll review your prescription and contact you within 2 hours with availability and pricing.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold mb-2">What happens next?</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Our pharmacist will review your prescription</li>
                    <li>• We'll check medication availability</li>
                    <li>• You'll receive a call with pricing and pickup/delivery details</li>
                    <li>• Payment can be made upon pickup or delivery</li>
                  </ul>
                </div>
                <button 
                  onClick={resetForm}
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Upload Another Prescription
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionsPage;