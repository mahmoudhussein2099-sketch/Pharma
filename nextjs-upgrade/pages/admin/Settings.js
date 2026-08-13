import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(i18n.language);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('settings')}</h2>
        {saveSuccess && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded">
            {t('settingsSaved')}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Sidebar */}
        <div className="bg-white rounded-lg shadow p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'general' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('general')}
            </button>
            <button 
              onClick={() => setActiveTab('appearance')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'appearance' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('appearance')}
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('notifications')}
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'security' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('security')}
            </button>
            <button 
              onClick={() => setActiveTab('payments')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'payments' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('payments')}
            </button>
            <button 
              onClick={() => setActiveTab('shipping')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'shipping' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('shipping')}
            </button>
            <button 
              onClick={() => setActiveTab('taxes')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'taxes' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('taxes')}
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('users')}
            </button>
            <button 
              onClick={() => setActiveTab('backup')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'backup' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('backup')}
            </button>
            <button 
              onClick={() => setActiveTab('about')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'about' ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}
            >
              {t('about')}
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 bg-white rounded-lg shadow p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('generalSettings')}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t('storeInformation')}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('storeName')}</label>
                      <input 
                        type="text" 
                        defaultValue="Awon Pharmacy" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('storeEmail')}</label>
                      <input 
                        type="email" 
                        defaultValue="info@awonpharmacy.com" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('storePhone')}</label>
                      <input 
                        type="text" 
                        defaultValue="+966 11 234 5678" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('storeAddress')}</label>
                      <textarea 
                        defaultValue="King Fahd Road, Riyadh, Saudi Arabia" 
                        className="w-full p-2 border rounded" 
                        rows="3"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{t('currency')}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('defaultCurrency')}</label>
                      <select className="w-full p-2 border rounded">
                        <option value="SAR">Saudi Riyal (SAR)</option>
                        <option value="USD">US Dollar (USD)</option>
                        <option value="EUR">Euro (EUR)</option>
                        <option value="GBP">British Pound (GBP)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('currencySymbolPosition')}</label>
                      <select className="w-full p-2 border rounded">
                        <option value="before">Before (SAR 100)</option>
                        <option value="after">After (100 SAR)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('appearanceSettings')}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t('theme')}</h4>
                  <div className="flex space-x-4">
                    <div 
                      onClick={() => handleThemeChange('light')}
                      className={`cursor-pointer border rounded-lg p-4 ${theme === 'light' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    >
                      <div className="w-32 h-20 bg-white border border-gray-200 mb-2 flex items-center justify-center">
                        <div className="w-16 h-4 bg-gray-800"></div>
                      </div>
                      <div className="text-center">{t('lightTheme')}</div>
                    </div>
                    <div 
                      onClick={() => handleThemeChange('dark')}
                      className={`cursor-pointer border rounded-lg p-4 ${theme === 'dark' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    >
                      <div className="w-32 h-20 bg-gray-800 border border-gray-700 mb-2 flex items-center justify-center">
                        <div className="w-16 h-4 bg-white"></div>
                      </div>
                      <div className="text-center">{t('darkTheme')}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">{t('language')}</h4>
                  <div className="flex space-x-4">
                    <div 
                      onClick={() => handleLanguageChange('en')}
                      className={`cursor-pointer border rounded-lg p-4 ${language === 'en' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    >
                      <div className="w-32 h-20 flex items-center justify-center">
                        <span className="text-2xl">🇺🇸</span>
                      </div>
                      <div className="text-center">English</div>
                    </div>
                    <div 
                      onClick={() => handleLanguageChange('ar')}
                      className={`cursor-pointer border rounded-lg p-4 ${language === 'ar' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    >
                      <div className="w-32 h-20 flex items-center justify-center">
                        <span className="text-2xl">🇸🇦</span>
                      </div>
                      <div className="text-center">العربية</div>
                    </div>
                    <div 
                      onClick={() => handleLanguageChange('hi')}
                      className={`cursor-pointer border rounded-lg p-4 ${language === 'hi' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    >
                      <div className="w-32 h-20 flex items-center justify-center">
                        <span className="text-2xl">🇮🇳</span>
                      </div>
                      <div className="text-center">हिन्दी</div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('notificationSettings')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t('enableNotifications')}</h4>
                    <p className="text-sm text-gray-500">{t('enableNotificationsDesc')}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notificationsEnabled}
                      onChange={() => setNotificationsEnabled(!notificationsEnabled)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                {notificationsEnabled && (
                  <div className="space-y-4 pl-4 border-l-2 border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{t('emailNotifications')}</h4>
                        <p className="text-sm text-gray-500">{t('emailNotificationsDesc')}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={emailNotifications}
                          onChange={() => setEmailNotifications(!emailNotifications)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{t('smsNotifications')}</h4>
                        <p className="text-sm text-gray-500">{t('smsNotificationsDesc')}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={smsNotifications}
                          onChange={() => setSmsNotifications(!smsNotifications)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{t('pushNotifications')}</h4>
                        <p className="text-sm text-gray-500">{t('pushNotificationsDesc')}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={pushNotifications}
                          onChange={() => setPushNotifications(!pushNotifications)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                )}
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('securitySettings')}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t('changePassword')}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('currentPassword')}</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('newPassword')}</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t('confirmNewPassword')}</label>
                      <input 
                        type="password" 
                        className="w-full p-2 border rounded" 
                      />
                    </div>
                    <button 
                      onClick={handleSaveChanges}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                      {t('updatePassword')}
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">{t('twoFactorAuthentication')}</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{t('twoFactorAuthDesc')}</p>
                    </div>
                    <button 
                      onClick={handleSaveChanges}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      {t('enable2FA')}
                    </button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">{t('sessionManagement')}</h4>
                  <p className="text-sm text-gray-500 mb-2">{t('activeSessionsDesc')}</p>
                  <div className="bg-gray-50 p-4 rounded mb-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Chrome on Windows</p>
                        <p className="text-sm text-gray-500">Riyadh, Saudi Arabia • Current session</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {t('active')}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Safari on iPhone</p>
                        <p className="text-sm text-gray-500">Riyadh, Saudi Arabia • Last active: 2 days ago</p>
                      </div>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        {t('revoke')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('paymentSettings')}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t('paymentMethods')}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 text-xl">💳</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Credit/Debit Cards</h5>
                          <p className="text-sm text-gray-500">Accept Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-green-600 text-xl">💰</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Cash on Delivery</h5>
                          <p className="text-sm text-gray-500">Accept cash payments on delivery</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-purple-600 text-xl">📱</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Apple Pay</h5>
                          <p className="text-sm text-gray-500">Accept Apple Pay payments</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Shipping Tab */}
          {activeTab === 'shipping' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('shippingSettings')}</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">{t('shippingMethods')}</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-blue-600 text-xl">🚚</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Standard Delivery</h5>
                          <p className="text-sm text-gray-500">2-3 business days</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          className="w-20 p-2 border rounded mr-2" 
                          defaultValue="15.00"
                        />
                        <span>SAR</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-green-600 text-xl">⚡</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Express Delivery</h5>
                          <p className="text-sm text-gray-500">Next day delivery</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          className="w-20 p-2 border rounded mr-2" 
                          defaultValue="30.00"
                        />
                        <span>SAR</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                          <span className="text-yellow-600 text-xl">🏪</span>
                        </div>
                        <div>
                          <h5 className="font-medium">Store Pickup</h5>
                          <p className="text-sm text-gray-500">Collect from store</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="text" 
                          className="w-20 p-2 border rounded mr-2" 
                          defaultValue="0.00"
                        />
                        <span>SAR</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <button 
                    onClick={handleSaveChanges}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {t('saveChanges')}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Taxes Tab */}
          {activeTab === 'taxes' && (
            <div>
              {React.createElement(require('../../components/settings/TaxesSettings').default)}
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              {React.createElement(require('../../components/settings/UsersSettings').default)}
            </div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <div>
              {React.createElement(require('../../components/settings/BackupSettings').default)}
            </div>
          )}

          {/* About Tab */}
          {activeTab === 'about' && (
            <div>
              {React.createElement(require('../../components/settings/AboutSettings').default)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;