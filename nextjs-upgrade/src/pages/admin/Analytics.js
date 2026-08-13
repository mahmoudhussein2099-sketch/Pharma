import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Analytics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('month');

  // Sample data for charts
  const salesData = [
    { date: 'Jan', amount: 12500 },
    { date: 'Feb', amount: 14200 },
    { date: 'Mar', amount: 15800 },
    { date: 'Apr', amount: 16900 },
    { date: 'May', amount: 18500 },
    { date: 'Jun', amount: 22400 },
  ];

  const customerData = [
    { date: 'Jan', count: 120 },
    { date: 'Feb', count: 145 },
    { date: 'Mar', count: 165 },
    { date: 'Apr', count: 178 },
    { date: 'May', count: 210 },
    { date: 'Jun', count: 245 },
  ];

  const productData = [
    { name: 'Panadol', sales: 1245 },
    { name: 'Vitamin C', sales: 980 },
    { name: 'Cough Syrup', sales: 745 },
    { name: 'Augmentin', sales: 620 },
    { name: 'Baby Diapers', sales: 580 },
  ];

  // Calculate max value for chart scaling
  const maxSales = Math.max(...salesData.map(item => item.amount));
  const maxCustomers = Math.max(...customerData.map(item => item.count));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('analytics')}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setDateRange('week')}
            className={`px-3 py-1 rounded ${dateRange === 'week' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {t('week')}
          </button>
          <button 
            onClick={() => setDateRange('month')}
            className={`px-3 py-1 rounded ${dateRange === 'month' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {t('month')}
          </button>
          <button 
            onClick={() => setDateRange('year')}
            className={`px-3 py-1 rounded ${dateRange === 'year' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
          >
            {t('year')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1 inline-flex">
          <button 
            onClick={() => setActiveTab('sales')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'sales' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}
          >
            {t('sales')}
          </button>
          <button 
            onClick={() => setActiveTab('customers')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'customers' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}
          >
            {t('customers')}
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'products' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}
          >
            {t('products')}
          </button>
        </div>
      </div>

      {/* Sales Chart */}
      {activeTab === 'sales' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('salesOverTime')}</h3>
          <div className="h-64 flex items-end space-x-2">
            {salesData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-blue-500 rounded-t"
                  style={{ height: `${(item.amount / maxSales) * 100}%` }}
                ></div>
                <div className="mt-2 text-sm">{item.date}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">SAR {item.amount}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalSales')}</div>
              <div className="text-2xl font-bold">SAR 100,300</div>
              <div className="text-sm text-green-500">+15% {t('fromLastPeriod')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('averageOrderValue')}</div>
              <div className="text-2xl font-bold">SAR 85.40</div>
              <div className="text-sm text-green-500">+5% {t('fromLastPeriod')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('conversionRate')}</div>
              <div className="text-2xl font-bold">3.2%</div>
              <div className="text-sm text-red-500">-0.5% {t('fromLastPeriod')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Customers Chart */}
      {activeTab === 'customers' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('customerGrowth')}</h3>
          <div className="h-64 flex items-end space-x-2">
            {customerData.map((item, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${(item.count / maxCustomers) * 100}%` }}
                ></div>
                <div className="mt-2 text-sm">{item.date}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{item.count}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalCustomers')}</div>
              <div className="text-2xl font-bold">1,245</div>
              <div className="text-sm text-green-500">+12% {t('fromLastPeriod')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('newCustomers')}</div>
              <div className="text-2xl font-bold">245</div>
              <div className="text-sm text-green-500">+18% {t('fromLastPeriod')}</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('customerRetention')}</div>
              <div className="text-2xl font-bold">76%</div>
              <div className="text-sm text-green-500">+2% {t('fromLastPeriod')}</div>
            </div>
          </div>
        </div>
      )}

      {/* Products Chart */}
      {activeTab === 'products' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">{t('topSellingProducts')}</h3>
          <div className="space-y-4">
            {productData.map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="w-32 text-sm">{product.name}</div>
                <div className="flex-1">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${(product.sales / productData[0].sales) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-right text-sm">{product.sales}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('totalProducts')}</div>
              <div className="text-2xl font-bold">245</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('lowStockProducts')}</div>
              <div className="text-2xl font-bold">12</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">{t('outOfStockProducts')}</div>
              <div className="text-2xl font-bold">3</div>
            </div>
          </div>
        </div>
      )}

      {/* Export Options */}
      <div className="mt-6 flex justify-end">
        <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded mr-2">
          {t('exportCSV')}
        </button>
        <button className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded mr-2">
          {t('exportPDF')}
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {t('printReport')}
        </button>
      </div>
    </div>
  );
};

export default Analytics;