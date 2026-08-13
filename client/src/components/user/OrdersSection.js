import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const OrdersSection = ({ orders }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab;
  });
  
  // Get count of orders by status
  const getOrderCount = (status) => {
    return orders.filter(order => order.status.toLowerCase() === status).length;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">{t('myOrders')}</h2>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6">
        <button 
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 whitespace-nowrap ${
            activeTab === 'all' 
              ? 'bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 font-medium rounded-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          }`}
        >
          {t('allOrders')} ({orders.length})
        </button>
        
        <button 
          onClick={() => setActiveTab('processing')}
          className={`px-4 py-2 ml-2 whitespace-nowrap ${
            activeTab === 'processing' 
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-medium rounded-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          }`}
        >
          {t('processing')} ({getOrderCount('processing')})
        </button>
        
        <button 
          onClick={() => setActiveTab('shipped')}
          className={`px-4 py-2 ml-2 whitespace-nowrap ${
            activeTab === 'shipped' 
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 font-medium rounded-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          }`}
        >
          {t('shipped')} ({getOrderCount('shipped')})
        </button>
        
        <button 
          onClick={() => setActiveTab('delivered')}
          className={`px-4 py-2 ml-2 whitespace-nowrap ${
            activeTab === 'delivered' 
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-medium rounded-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          }`}
        >
          {t('delivered')} ({getOrderCount('delivered')})
        </button>
        
        <button 
          onClick={() => setActiveTab('cancelled')}
          className={`px-4 py-2 ml-2 whitespace-nowrap ${
            activeTab === 'cancelled' 
              ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 font-medium rounded-lg' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg'
          }`}
        >
          {t('cancelled')} ({getOrderCount('cancelled')})
        </button>
      </div>
      
      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 dark:text-gray-500 text-5xl mb-4">📦</div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('noOrdersFound')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {activeTab === 'all' 
                ? t('noOrdersYet') 
                : t('noOrdersInStatus', { status: t(activeTab) })}
            </p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div 
              key={order.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="bg-gray-50 dark:bg-gray-750 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 dark:border-gray-700">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      {t('orderNumber')}: {order.number}
                    </h3>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      order.status === 'processing' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      order.status === 'shipped' ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200' :
                      order.status === 'delivered' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                    }`}>
                      {t(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {t('ordered')}: {order.date}
                  </p>
                </div>
                
                <div className="mt-2 sm:mt-0">
                  <span className="font-bold text-gray-800 dark:text-white">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
              
              {/* Order Items */}
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center"
                    >
                      <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-4">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="max-w-full max-h-full object-contain"
                          />
                        ) : (
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-800 dark:text-white">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {t('quantity')}: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="text-sm font-medium text-gray-800 dark:text-white">
                        ${(item.quantity * item.price).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Order Actions */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm">
                    {t('trackOrder')}
                  </button>
                  
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm">
                    {t('viewDetails')}
                  </button>
                  
                  {order.status !== 'delivered' && order.status !== 'cancelled' && (
                    <button className="px-4 py-2 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-sm ml-auto">
                      {t('cancelOrder')}
                    </button>
                  )}
                  
                  {order.status === 'delivered' && (
                    <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm ml-auto">
                      {t('buyAgain')}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersSection;