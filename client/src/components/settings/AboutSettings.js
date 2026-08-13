import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutSettings = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('aboutSystem')}</h3>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-teal-700">Awon Pharmacy Management System</h2>
              <p className="text-gray-500">Version 1.0.0</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">{t('systemInformation')}</h4>
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('version')}:</td>
                    <td>1.0.0</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('releaseDate')}:</td>
                    <td>March 15, 2024</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('license')}:</td>
                    <td>Commercial</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('database')}:</td>
                    <td>MongoDB 5.0.6</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('server')}:</td>
                    <td>Node.js 16.14.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t('systemStatus')}</h4>
              <table className="min-w-full">
                <tbody>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('status')}:</td>
                    <td>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {t('operational')}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('uptime')}:</td>
                    <td>15 days, 7 hours</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('lastUpdate')}:</td>
                    <td>March 1, 2024</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium">{t('nextUpdate')}:</td>
                    <td>April 1, 2024</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-medium mb-4">{t('systemComponents')}</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Frontend</p>
                <p className="text-sm text-gray-500">React 18.2.0, TailwindCSS 3.3.0</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {t('upToDate')}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Backend API</p>
                <p className="text-sm text-gray-500">Express 4.18.2, MongoDB 5.0.6</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {t('upToDate')}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Authentication</p>
                <p className="text-sm text-gray-500">JWT, bcrypt</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                {t('upToDate')}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">Payment Processing</p>
                <p className="text-sm text-gray-500">Stripe API</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                {t('updateAvailable')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h4 className="font-medium mb-4">{t('support')}</h4>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{t('technicalSupport')}</p>
              <p className="text-sm">support@awonpharmacy.com</p>
              <p className="text-sm">+966 11 234 5678</p>
            </div>
            
            <div>
              <p className="font-medium">{t('documentation')}</p>
              <div className="flex space-x-2 mt-1">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  {t('userManual')}
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  {t('apiDocs')}
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
                  {t('faq')}
                </button>
              </div>
            </div>
            
            <div>
              <p className="font-medium">{t('updates')}</p>
              <button className="mt-1 px-3 py-1 bg-green-600 text-white rounded text-sm">
                {t('checkForUpdates')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>© 2024 Awon Pharmacy. All rights reserved.</p>
          <p>Developed by Awon Technology Team</p>
        </div>
      </div>
    </div>
  );
};

export default AboutSettings;