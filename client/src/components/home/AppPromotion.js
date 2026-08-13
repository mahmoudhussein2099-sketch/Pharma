import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AppPromotion = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-6">
            <div className="flex">
              <div className="mr-4">
                <div className="w-24 h-24 bg-teal-500 rounded-xl flex items-center justify-center">
                  <span className="text-4xl text-white">📱</span>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {t('downloadOurApp')}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {t('appPromotionTagline')}
                </p>
                <div className="flex space-x-2">
                  <a 
                    href="#" 
                    className="bg-black text-white px-3 py-1.5 rounded-lg text-xs flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.33-.84 3.55-.77 1.5.09 2.64.62 3.37 1.53-3.25 1.95-2.75 6.36.62 7.69-.7 1.43-1.6 2.76-2.62 3.74zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.12-1.66 4.1-3.74 4.25z" />
                    </svg>
                    App Store
                  </a>
                  <a 
                    href="#" 
                    className="bg-black text-white px-3 py-1.5 rounded-lg text-xs flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.609 1.814L13.792 12 3.609 22.186a.996.996 0 0 1-.273-.635V2.449c0-.228.08-.44.273-.635zM14.392 12l7.334 7.334c.319.32.427.961.2 1.393-.75.142-.156.271-.249.364l-2.865 2.865L8.268 12 18.812 1.044l2.865 2.865a1.83 1.83 0 0 1 .249.364c.226.432.118 1.073-.2 1.393L14.392 12z" />
                    </svg>
                    Google Play
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mr-4 flex items-center justify-center">
                  <div className="text-3xl">📲</div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                    {t('scanQRCode')}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {t('scanQRCodeDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPromotion;