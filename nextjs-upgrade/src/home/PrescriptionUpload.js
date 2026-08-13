import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PrescriptionUpload = () => {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(1);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    deliveryOption: 'pickup'
  });
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
      
      // Move to next step
      setActiveStep(2);
    }
  };
  
  const handleContactInfoChange = (e) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would upload the file and contact info to a server
    console.log('File:', file);
    console.log('Contact Info:', contactInfo);
    setActiveStep(3);
  };
  
  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setContactInfo({
      name: '',
      phone: '',
      deliveryOption: 'pickup'
    });
    setActiveStep(1);
  };

  return (
    <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl overflow-hidden shadow-lg">
      <div className="p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">{t('uploadPrescription')}</h2>
        <p className="text-teal-100 mb-6">{t('uploadPrescriptionTagline')}</p>
        
        {/* Progress Steps */}
        <div className="flex items-center mb-8">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 1 ? 'bg-white text-teal-600' : 'bg-teal-400 text-white'
          } font-bold`}>
            1
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            activeStep >= 2 ? 'bg-white' : 'bg-teal-400'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 2 ? 'bg-white text-teal-600' : 'bg-teal-400 text-white'
          } font-bold`}>
            2
          </div>
          <div className={`flex-1 h-1 mx-2 ${
            activeStep >= 3 ? 'bg-white' : 'bg-teal-400'
          }`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            activeStep >= 3 ? 'bg-white text-teal-600' : 'bg-teal-400 text-white'
          } font-bold`}>
            3
          </div>
        </div>
        
        {/* Step 1: Upload */}
        {activeStep === 1 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">{t('step1UploadPrescription')}</h3>
            <div className="border-2 border-dashed border-white/50 rounded-lg p-8 text-center">
              <div className="mb-4">
                <svg className="w-12 h-12 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="mb-4">{t('dragDropPrescription')}</p>
              <input
                type="file"
                id="prescription"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="prescription"
                className="inline-block px-6 py-3 bg-white text-teal-600 rounded-lg font-medium cursor-pointer hover:bg-teal-50"
              >
                {t('browsePrescription')}
              </label>
              <p className="mt-4 text-sm text-teal-100">{t('acceptedFileTypes')}</p>
            </div>
          </div>
        )}
        
        {/* Step 2: Contact Info */}
        {activeStep === 2 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">{t('step2ContactInfo')}</h3>
            
            {previewUrl && (
              <div className="mb-4 flex items-center">
                <div className="w-16 h-16 bg-white rounded-lg overflow-hidden mr-4 flex items-center justify-center">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-teal-100">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button 
                  onClick={resetForm}
                  className="ml-auto text-teal-100 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">{t('fullName')}</label>
                <input
                  type="text"
                  name="name"
                  value={contactInfo.name}
                  onChange={handleContactInfoChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                  placeholder={t('enterFullName')}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">{t('phoneNumber')}</label>
                <input
                  type="tel"
                  name="phone"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70"
                  placeholder={t('enterPhoneNumber')}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">{t('deliveryOption')}</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="pickup"
                      checked={contactInfo.deliveryOption === 'pickup'}
                      onChange={handleContactInfoChange}
                      className="mr-2"
                    />
                    {t('pickup')}
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="deliveryOption"
                      value="delivery"
                      checked={contactInfo.deliveryOption === 'delivery'}
                      onChange={handleContactInfoChange}
                      className="mr-2"
                    />
                    {t('delivery')}
                  </label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg"
                >
                  {t('back')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-50"
                >
                  {t('submit')}
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* Step 3: Confirmation */}
        {activeStep === 3 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">{t('thankYou')}</h3>
            <p className="mb-6">{t('prescriptionReceived')}</p>
            <p className="text-sm mb-4">{t('prescriptionConfirmation')}</p>
            <button
              onClick={resetForm}
              className="px-6 py-2 bg-white text-teal-600 rounded-lg font-medium hover:bg-teal-50"
            >
              {t('uploadAnother')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;