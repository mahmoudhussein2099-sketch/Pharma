import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MockProductManagement from './MockProductManagement';
import Orders from './Orders';
import Analytics from './Analytics';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  
  // Function to handle quick action buttons
  const handleQuickAction = (action) => {
    switch(action) {
      case 'addProduct':
        setModalContent(<MockProductManagement />);
        setShowModal(true);
        break;
      case 'processOrders':
        setModalContent(<Orders />);
        setShowModal(true);
        break;
      case 'viewReports':
        setModalContent(<Analytics />);
        setShowModal(true);
        break;
      case 'manageInventory':
        setModalContent(
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">{t('inventoryManagement')}</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-bold">Panadol Extra</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SKU: MED-001</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('inStock')}</p>
                  <p className="font-bold">120</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  {t('update')}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-bold">Vitamin C</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SKU: VIT-002</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('inStock')}</p>
                  <p className="font-bold">85</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  {t('update')}
                </button>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-bold">Cough Syrup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">SKU: MED-003</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('inStock')}</p>
                  <p className="font-bold text-red-600">8</p>
                </div>
                <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  {t('update')}
                </button>
              </div>
            </div>
          </div>
        );
        setShowModal(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">{t('adminDashboard', 'Admin Dashboard')}</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('totalSales', 'Total Sales')}</h3>
            <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-400 text-xs font-medium px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">$24,580</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('thisMonth', 'This Month')}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('totalOrders', 'Total Orders')}</h3>
            <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-400 text-xs font-medium px-2 py-1 rounded-full">+8%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">342</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('thisMonth', 'This Month')}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('totalCustomers', 'Total Customers')}</h3>
            <span className="bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-400 text-xs font-medium px-2 py-1 rounded-full">+15%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">1,245</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('thisMonth', 'This Month')}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">{t('lowStock', 'Low Stock')}</h3>
            <span className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400 text-xs font-medium px-2 py-1 rounded-full">Alert</span>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">12</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('itemsNeedAttention', 'Items need attention')}</p>
        </div>
      </div>
      
      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t('recentOrders', 'Recent Orders')}</h2>
          <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
            {t('viewAll', 'View All')}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 dark:text-gray-400 text-sm">
                <th className="pb-3 font-medium">{t('orderId', 'Order ID')}</th>
                <th className="pb-3 font-medium">{t('customer', 'Customer')}</th>
                <th className="pb-3 font-medium">{t('date', 'Date')}</th>
                <th className="pb-3 font-medium">{t('amount', 'Amount')}</th>
                <th className="pb-3 font-medium">{t('status', 'Status')}</th>
                <th className="pb-3 font-medium">{t('action', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="py-3 pr-4">#ORD-7245</td>
                <td className="py-3 pr-4">John Smith</td>
                <td className="py-3 pr-4">June 23, 2025</td>
                <td className="py-3 pr-4">$125.00</td>
                <td className="py-3 pr-4">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                    {t('delivered', 'Delivered')}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    {t('view', 'View')}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">#ORD-7244</td>
                <td className="py-3 pr-4">Sarah Johnson</td>
                <td className="py-3 pr-4">June 23, 2025</td>
                <td className="py-3 pr-4">$75.50</td>
                <td className="py-3 pr-4">
                  <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                    {t('processing', 'Processing')}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    {t('view', 'View')}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">#ORD-7243</td>
                <td className="py-3 pr-4">Michael Brown</td>
                <td className="py-3 pr-4">June 22, 2025</td>
                <td className="py-3 pr-4">$249.99</td>
                <td className="py-3 pr-4">
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                    {t('shipped', 'Shipped')}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    {t('view', 'View')}
                  </button>
                </td>
              </tr>
              <tr>
                <td className="py-3 pr-4">#ORD-7242</td>
                <td className="py-3 pr-4">Emily Davis</td>
                <td className="py-3 pr-4">June 22, 2025</td>
                <td className="py-3 pr-4">$32.75</td>
                <td className="py-3 pr-4">
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                    {t('delivered', 'Delivered')}
                  </span>
                </td>
                <td className="py-3">
                  <button className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300">
                    {t('view', 'View')}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">{t('quickActions', 'Quick Actions')}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => handleQuickAction('addProduct')}
            className="bg-teal-600 hover:bg-teal-700 text-white p-4 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {t('addProduct', 'Add Product')}
          </button>
          
          <button 
            onClick={() => handleQuickAction('processOrders')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            {t('processOrders', 'Process Orders')}
          </button>
          
          <button 
            onClick={() => handleQuickAction('viewReports')}
            className="bg-purple-600 hover:bg-purple-700 text-white p-4 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            {t('viewReports', 'View Reports')}
          </button>
          
          <button 
            onClick={() => handleQuickAction('manageInventory')}
            className="bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-lg flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {t('manageInventory', 'Manage Inventory')}
          </button>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {modalContent && modalContent.type && modalContent.type.name === 'MockProductManagement' ? t('productManagement') :
                 modalContent && modalContent.type && modalContent.type.name === 'Orders' ? t('orderManagement') :
                 modalContent && modalContent.type && modalContent.type.name === 'Analytics' ? t('analytics') :
                 t('inventoryManagement')}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div>
              {modalContent}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;