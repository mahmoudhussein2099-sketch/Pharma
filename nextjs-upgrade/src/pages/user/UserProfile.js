import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data - in a real app, this would come from an API
  const userData = {
    name: "Mohammed Al-Qhtani",
    email: "mohammed@example.com",
    phone: "+966 50 123 4567",
    address: "Riyadh, Saudi Arabia"
  };

  // Mock order history
  const orders = [
    { id: "ORD-001", date: "2023-12-15", status: "Delivered", total: "SAR 245.00" },
    { id: "ORD-002", date: "2024-01-20", status: "Processing", total: "SAR 189.50" },
    { id: "ORD-003", date: "2024-02-05", status: "Shipped", total: "SAR 320.75" }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">{t('myAccount')}</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
            >
              {t('personalInfo')}
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'orders' ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
            >
              {t('orderHistory')}
            </button>
            <button 
              onClick={() => setActiveTab('prescriptions')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'prescriptions' ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
            >
              {t('myPrescriptions')}
            </button>
            <button 
              onClick={() => setActiveTab('addresses')}
              className={`w-full text-left px-4 py-2 rounded-md ${activeTab === 'addresses' ? 'bg-teal-100 text-teal-800' : 'hover:bg-gray-100'}`}
            >
              {t('savedAddresses')}
            </button>
            <Link to="/admin-access" className="block w-full text-left px-4 py-2 rounded-md text-gray-500 hover:bg-gray-100 mt-8">
              {t('adminAccess')}
            </Link>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('personalInfo')}</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                    <input 
                      type="text" 
                      value={userData.name} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                    <input 
                      type="email" 
                      value={userData.email} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                    <input 
                      type="text" 
                      value={userData.phone} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('address')}</label>
                    <input 
                      type="text" 
                      value={userData.address} 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                      readOnly 
                    />
                  </div>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                  {t('editProfile')}
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('orderHistory')}</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('orderId')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('total')}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map(order => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-teal-600 hover:text-teal-800">{t('viewDetails')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === 'prescriptions' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('myPrescriptions')}</h2>
              <p className="text-gray-600 mb-4">{t('noPrescriptions')}</p>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                {t('uploadPrescription')}
              </button>
            </div>
          )}
          
          {activeTab === 'addresses' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('savedAddresses')}</h2>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <p className="font-medium">{userData.name}</p>
                <p>{userData.address}</p>
                <p>{userData.phone}</p>
                <div className="mt-2">
                  <button className="text-teal-600 hover:text-teal-800 mr-4">{t('edit')}</button>
                  <button className="text-red-600 hover:text-red-800">{t('delete')}</button>
                </div>
              </div>
              <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700">
                {t('addNewAddress')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;