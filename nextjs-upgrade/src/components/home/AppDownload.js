import React, { useState } from 'react';

const AppDownload = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border">
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-sm"
        >
          ×
        </button>
        
        <div className="p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center text-white text-2xl">
                📱
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 mb-1">
                Download Our App
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Get exclusive offers and faster checkout
              </p>
              
              <div className="flex space-x-2 mb-4">
                <a 
                  href="#" 
                  className="flex items-center bg-black text-white px-3 py-1.5 rounded-lg text-xs hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-1">📱</span>
                  App Store
                </a>
                <a 
                  href="#" 
                  className="flex items-center bg-black text-white px-3 py-1.5 rounded-lg text-xs hover:bg-gray-800 transition-colors"
                >
                  <span className="mr-1">🤖</span>
                  Google Play
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="w-12 h-12 bg-black text-white text-xs flex items-center justify-center">
                  QR
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Scan QR Code</p>
                <p className="text-xs text-gray-600">Quick download link</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;