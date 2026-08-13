import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UsersSettings = () => {
  const { t } = useTranslation();
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('staff');

  // Mock staff users
  const staffUsers = [
    { id: 1, name: 'Admin User', email: 'admin@awonpharmacy.com', role: 'Admin', lastLogin: '2024-03-15 09:30' },
    { id: 2, name: 'Pharmacist One', email: 'pharmacist1@awonpharmacy.com', role: 'Pharmacist', lastLogin: '2024-03-15 08:45' },
    { id: 3, name: 'Sales Staff', email: 'sales@awonpharmacy.com', role: 'Sales', lastLogin: '2024-03-14 17:20' },
    { id: 4, name: 'Delivery Manager', email: 'delivery@awonpharmacy.com', role: 'Delivery', lastLogin: '2024-03-15 10:15' },
  ];

  // Mock customer users
  const customerUsers = [
    { id: 101, name: 'Ahmed Al-Saud', email: 'ahmed@example.com', orders: 12, registered: '2023-06-15' },
    { id: 102, name: 'Fatima Hassan', email: 'fatima@example.com', orders: 8, registered: '2023-08-22' },
    { id: 103, name: 'Mohammed Ali', email: 'mohammed@example.com', orders: 5, registered: '2023-11-10' },
    { id: 104, name: 'Sara Ahmed', email: 'sara@example.com', orders: 15, registered: '2023-04-05' },
    { id: 105, name: 'Khalid Omar', email: 'khalid@example.com', orders: 3, registered: '2024-01-18' },
  ];

  // Mock roles
  const roles = [
    { id: 1, name: 'Admin', permissions: ['all'] },
    { id: 2, name: 'Pharmacist', permissions: ['view_orders', 'manage_prescriptions', 'view_customers'] },
    { id: 3, name: 'Sales', permissions: ['view_orders', 'manage_products', 'view_customers'] },
    { id: 4, name: 'Delivery', permissions: ['view_orders', 'manage_deliveries'] },
  ];

  const handleSaveChanges = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{t('userManagement')}</h3>
      
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 inline-flex">
          <button 
            onClick={() => setActiveTab('staff')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'staff' ? 'bg-white shadow' : ''}`}
          >
            {t('staffUsers')}
          </button>
          <button 
            onClick={() => setActiveTab('customers')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'customers' ? 'bg-white shadow' : ''}`}
          >
            {t('customers')}
          </button>
          <button 
            onClick={() => setActiveTab('roles')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'roles' ? 'bg-white shadow' : ''}`}
          >
            {t('roles')}
          </button>
        </div>
      </div>
      
      {/* Staff Users Tab */}
      {activeTab === 'staff' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{t('staffMembers')}</h4>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              + {t('addStaffMember')}
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('role')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('lastLogin')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{t('edit')}</button>
                      <button className="text-red-600 hover:text-red-900">{t('delete')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Customers Tab */}
      {activeTab === 'customers' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{t('customerAccounts')}</h4>
            <div>
              <input
                type="text"
                placeholder={t('searchCustomers')}
                className="p-2 border rounded mr-2"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">
                {t('search')}
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('orders')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('registered')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customerUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{user.registered}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">{t('view')}</button>
                      <button className="text-red-600 hover:text-red-900">{t('block')}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">{t('userRoles')}</h4>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
              + {t('addRole')}
            </button>
          </div>
          
          <div className="space-y-4">
            {roles.map((role) => (
              <div key={role.id} className="border rounded p-4">
                <div className="flex justify-between items-center mb-2">
                  <h5 className="font-medium">{role.name}</h5>
                  <div>
                    <button className="text-blue-600 hover:text-blue-900 mr-3 text-sm">{t('edit')}</button>
                    {role.name !== 'Admin' && (
                      <button className="text-red-600 hover:text-red-900 text-sm">{t('delete')}</button>
                    )}
                  </div>
                </div>
                <div>
                  <h6 className="text-sm font-medium text-gray-700 mb-1">{t('permissions')}:</h6>
                  <div className="flex flex-wrap gap-2">
                    {role.permissions.map((permission, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="pt-4 mt-6 border-t flex items-center justify-between">
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
  );
};

export default UsersSettings;