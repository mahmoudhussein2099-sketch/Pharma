import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext';
import AdminDashboard from './AdminDashboard';
import MockProductManagement from './MockProductManagement';
import Orders from './Orders';
import MarketingTools from './MarketingTools';
import Analytics from './Analytics';
import AISecurity from './AISecurity';
import WhatsAppMessages from './WhatsAppMessages';
import UserRequests from './UserRequests';
import Delivery from './Delivery';
import BlockList from './BlockList';
import Settings from './Settings';
import AIDashboard from './AIDashboard';
import LanguageSwitcher from '../../components/LanguageSwitcher';
import ThemeSwitcher from '../../components/ThemeSwitcher';

const UnifiedDashboard = () => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation items
  const navItems = [
    { id: 'dashboard', name: t('dashboard'), icon: '📊' },
    { id: 'products', name: t('products'), icon: '📦' },
    { id: 'orders', name: t('orders'), icon: '🛒' },
    { id: 'marketing', name: t('marketing'), icon: '📣' },
    { id: 'analytics', name: t('analytics'), icon: '📈' },
    { id: 'security', name: t('aiSecurity'), icon: '🔒' },
    { id: 'whatsapp', name: t('whatsApp'), icon: '💬' },
    { id: 'requests', name: t('userRequests'), icon: '📝' },
    { id: 'delivery', name: t('delivery'), icon: '🚚' },
    { id: 'blocklist', name: t('blockList'), icon: '⛔' },
    { id: 'ai', name: t('aiTools'), icon: '🤖' },
    { id: 'settings', name: t('settings'), icon: '⚙️' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className={`w-64 flex flex-col ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h1 className="text-xl font-bold text-teal-600">Awon Pharmacy</h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('adminPanel')}</p>
          
          <div className="flex items-center justify-between mt-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
        
        {/* Navigation - with flex-grow to push logout to bottom */}
        <div className="flex-grow overflow-y-auto p-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center p-3 mb-1 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-teal-100 text-teal-800'
                  : darkMode 
                    ? 'text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
        
        {/* Logout button - now part of flex layout */}
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            {t('logout', 'Logout')}
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
        {activeTab === 'dashboard' && <AdminDashboard />}
        {activeTab === 'products' && <MockProductManagement />}
        {activeTab === 'orders' && <Orders />}
        {activeTab === 'marketing' && <MarketingTools />}
        {activeTab === 'analytics' && <Analytics />}
        {activeTab === 'security' && <AISecurity />}
        {activeTab === 'whatsapp' && <WhatsAppMessages />}
        {activeTab === 'requests' && <UserRequests />}
        {activeTab === 'delivery' && <Delivery />}
        {activeTab === 'blocklist' && <BlockList />}
        {activeTab === 'ai' && <AIDashboard />}
        {activeTab === 'settings' && <Settings />}
      </div>
    </div>
  );
};

export default UnifiedDashboard;