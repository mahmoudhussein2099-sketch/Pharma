import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TaxesSettings = () => {
  const { t } = useTranslation();
  const [enableTax, setEnableTax] = useState(true);
  const [taxRate, setTaxRate] = useState(15);
  const [showTaxIncluded, setShowTaxIncluded] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('taxSettings')}</h3>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">{t('enableTaxCalculation')}</h4>
            <p className="text-sm text-gray-500">{t('enableTaxCalculationDesc')}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={enableTax}
              onChange={() => setEnableTax(!enableTax)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        {enableTax && (
          <>
            <div>
              <h4 className="font-medium mb-2">{t('defaultTaxRate')}</h4>
              <div className="flex items-center">
                <input 
                  type="number" 
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="w-24 p-2 border rounded mr-2" 
                />
                <span>%</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{t('defaultTaxRateDesc')}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">{t('showPricesWithTax')}</h4>
                <p className="text-sm text-gray-500">{t('showPricesWithTaxDesc')}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={showTaxIncluded}
                  onChange={() => setShowTaxIncluded(!showTaxIncluded)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t('taxClasses')}</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Standard Rate</p>
                    <p className="text-sm text-gray-500">Applied to most products</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      defaultValue="15"
                      className="w-16 p-1 border rounded mr-1 text-sm" 
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Reduced Rate</p>
                    <p className="text-sm text-gray-500">For essential medications</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      defaultValue="5"
                      className="w-16 p-1 border rounded mr-1 text-sm" 
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <p className="font-medium">Zero Rate</p>
                    <p className="text-sm text-gray-500">For prescription medications</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="number" 
                      defaultValue="0"
                      className="w-16 p-1 border rounded mr-1 text-sm" 
                    />
                    <span>%</span>
                  </div>
                </div>
              </div>
              <button className="mt-2 text-blue-600 hover:text-blue-800 text-sm">
                + {t('addTaxClass')}
              </button>
            </div>
          </>
        )}
        
        <div className="pt-4 border-t flex items-center justify-between">
          <button 
            onClick={handleSaveChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {t('saveChanges')}
          </button>
          
          {saveSuccess && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
              {t('settingsSaved')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxesSettings;