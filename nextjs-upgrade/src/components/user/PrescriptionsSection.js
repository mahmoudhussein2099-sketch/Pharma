import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PrescriptionsSection = ({ prescriptions }) => {
  const { t } = useTranslation();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [notes, setNotes] = useState('');
  
  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      
      // Create preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would upload the file to the server here
    console.log('Uploading prescription:', { file, notes });
    
    // Reset form
    setFile(null);
    setPreviewUrl(null);
    setNotes('');
    setShowUploadForm(false);
    
    // Show success message
    alert(t('prescriptionUploaded'));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('myPrescriptions')}</h2>
        
        <button 
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('uploadPrescription')}
        </button>
      </div>
      
      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-800 dark:text-white mb-4">
            {t('uploadNewPrescription')}
          </h3>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('prescriptionImage')}
              </label>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-7">
                    {previewUrl ? (
                      <img 
                        src={previewUrl} 
                        alt="Prescription preview" 
                        className="max-h-20 object-contain mb-2"
                      />
                    ) : (
                      <>
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="pt-1 text-sm text-gray-500 dark:text-gray-400">
                          {t('dragOrClickToUpload')}
                        </p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    className="opacity-0" 
                    accept="image/*" 
                    onChange={handleFileChange}
                    required
                  />
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('additionalNotes')}
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                rows="3"
                placeholder={t('enterAdditionalNotes')}
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                type="button"
                onClick={() => setShowUploadForm(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                {t('cancel')}
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                {t('upload')}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Prescriptions List */}
      {prescriptions.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('noPrescriptionsFound')}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {t('uploadPrescriptionToOrder')}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map(prescription => (
            <div 
              key={prescription.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 flex flex-col sm:flex-row">
                {/* Prescription Image */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                  {prescription.image ? (
                    <img 
                      src={prescription.image} 
                      alt="Prescription" 
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )}
                </div>
                
                {/* Prescription Details */}
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {prescription.doctor}
                    </h3>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      prescription.status === 'pending' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200' :
                      prescription.status === 'approved' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {t(prescription.status)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {t('uploaded')}: {prescription.date}
                  </p>
                  
                  {prescription.notes && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      {prescription.notes}
                    </p>
                  )}
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm">
                      {t('viewDetails')}
                    </button>
                    
                    {prescription.status === 'approved' && (
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">
                        {t('orderMedication')}
                      </button>
                    )}
                    
                    {prescription.status === 'pending' && (
                      <button className="px-3 py-1 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-sm">
                        {t('cancel')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionsSection;