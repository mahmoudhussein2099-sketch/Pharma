import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock orders data
  const allOrders = [
    { 
      id: 'ORD-7845', 
      customer: 'Ahmed Al-Saud', 
      email: 'ahmed@example.com',
      phone: '+966 50 123 4567',
      date: '2024-03-15', 
      status: 'Delivered', 
      total: 'SAR 245.00',
      paymentMethod: 'Credit Card',
      address: 'King Fahd Road, Riyadh, Saudi Arabia',
      items: [
        { id: 1, name: 'Panadol Extra', quantity: 2, price: 'SAR 15.00', total: 'SAR 30.00' },
        { id: 2, name: 'Vitamin C 1000mg', quantity: 3, price: 'SAR 25.00', total: 'SAR 75.00' },
        { id: 3, name: 'Augmentin 625mg', quantity: 1, price: 'SAR 65.00', total: 'SAR 65.00' },
      ]
    },
    { 
      id: 'ORD-7844', 
      customer: 'Fatima Hassan', 
      email: 'fatima@example.com',
      phone: '+966 55 987 6543',
      date: '2024-03-15', 
      status: 'Processing', 
      total: 'SAR 189.50',
      paymentMethod: 'Apple Pay',
      address: 'Al Olaya Street, Riyadh, Saudi Arabia',
      items: [
        { id: 1, name: 'Baby Diapers Pack', quantity: 1, price: 'SAR 89.50', total: 'SAR 89.50' },
        { id: 2, name: 'Baby Wipes', quantity: 2, price: 'SAR 15.00', total: 'SAR 30.00' },
        { id: 3, name: 'Baby Shampoo', quantity: 1, price: 'SAR 35.00', total: 'SAR 35.00' },
      ]
    },
    { 
      id: 'ORD-7843', 
      customer: 'Mohammed Ali', 
      email: 'mohammed@example.com',
      phone: '+966 54 111 2222',
      date: '2024-03-14', 
      status: 'Shipped', 
      total: 'SAR 320.75',
      paymentMethod: 'Cash on Delivery',
      address: 'Prince Sultan Road, Jeddah, Saudi Arabia',
      items: [
        { id: 1, name: 'Blood Pressure Monitor', quantity: 1, price: 'SAR 220.75', total: 'SAR 220.75' },
        { id: 2, name: 'Thermometer', quantity: 1, price: 'SAR 45.00', total: 'SAR 45.00' },
        { id: 3, name: 'First Aid Kit', quantity: 1, price: 'SAR 55.00', total: 'SAR 55.00' },
      ]
    },
    { 
      id: 'ORD-7842', 
      customer: 'Sara Ahmed', 
      email: 'sara@example.com',
      phone: '+966 56 333 4444',
      date: '2024-03-14', 
      status: 'Delivered', 
      total: 'SAR 156.25',
      paymentMethod: 'Credit Card',
      address: 'King Abdullah Road, Dammam, Saudi Arabia',
      items: [
        { id: 1, name: 'Face Cream', quantity: 1, price: 'SAR 85.25', total: 'SAR 85.25' },
        { id: 2, name: 'Sunscreen SPF 50', quantity: 1, price: 'SAR 45.00', total: 'SAR 45.00' },
        { id: 3, name: 'Lip Balm', quantity: 2, price: 'SAR 13.00', total: 'SAR 26.00' },
      ]
    },
    { 
      id: 'ORD-7841', 
      customer: 'Khalid Omar', 
      email: 'khalid@example.com',
      phone: '+966 59 555 6666',
      date: '2024-03-13', 
      status: 'Delivered', 
      total: 'SAR 210.00',
      paymentMethod: 'Mada Card',
      address: 'Al Amir Faisal Bin Fahd Road, Khobar, Saudi Arabia',
      items: [
        { id: 1, name: 'Multivitamin', quantity: 2, price: 'SAR 45.00', total: 'SAR 90.00' },
        { id: 2, name: 'Omega-3 Fish Oil', quantity: 1, price: 'SAR 65.00', total: 'SAR 65.00' },
        { id: 3, name: 'Calcium Supplements', quantity: 1, price: 'SAR 55.00', total: 'SAR 55.00' },
      ]
    },
    { 
      id: 'ORD-7840', 
      customer: 'Noura Al-Qahtani', 
      email: 'noura@example.com',
      phone: '+966 58 777 8888',
      date: '2024-03-13', 
      status: 'Cancelled', 
      total: 'SAR 178.50',
      paymentMethod: 'Credit Card',
      address: 'Al Takhassusi Street, Riyadh, Saudi Arabia',
      items: [
        { id: 1, name: 'Cough Syrup', quantity: 1, price: 'SAR 32.50', total: 'SAR 32.50' },
        { id: 2, name: 'Throat Lozenges', quantity: 2, price: 'SAR 18.00', total: 'SAR 36.00' },
        { id: 3, name: 'Nasal Spray', quantity: 1, price: 'SAR 45.00', total: 'SAR 45.00' },
        { id: 4, name: 'Paracetamol', quantity: 2, price: 'SAR 12.50', total: 'SAR 25.00' },
        { id: 5, name: 'Vicks VapoRub', quantity: 1, price: 'SAR 40.00', total: 'SAR 40.00' },
      ]
    },
  ];

  // Filter orders based on active tab and search term
  const filteredOrders = allOrders.filter(order => {
    const matchesTab = activeTab === 'all' || order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    // In a real app, this would call an API to update the order status
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
    // For now, we'll just log the action
    // This would be replaced with state management in a real app
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('orderManagement')}</h2>
      </div>

      {/* Tabs and Search */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'all' ? 'bg-white shadow' : ''}`}
            >
              {t('all')}
            </button>
            <button 
              onClick={() => setActiveTab('processing')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'processing' ? 'bg-white shadow' : ''}`}
            >
              {t('processing')}
            </button>
            <button 
              onClick={() => setActiveTab('shipped')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'shipped' ? 'bg-white shadow' : ''}`}
            >
              {t('shipped')}
            </button>
            <button 
              onClick={() => setActiveTab('delivered')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'delivered' ? 'bg-white shadow' : ''}`}
            >
              {t('delivered')}
            </button>
            <button 
              onClick={() => setActiveTab('cancelled')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'cancelled' ? 'bg-white shadow' : ''}`}
            >
              {t('cancelled')}
            </button>
          </div>
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder={t('searchOrders')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('orderId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('customer')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('total')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleViewOrder(order)} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {t('view')}
                  </button>
                  <select 
                    className="border rounded px-2 py-1 text-sm"
                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    value={order.status}
                  >
                    <option value="Processing">{t('processing')}</option>
                    <option value="Shipped">{t('shipped')}</option>
                    <option value="Delivered">{t('delivered')}</option>
                    <option value="Cancelled">{t('cancelled')}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t('orderDetails')}: {selectedOrder.id}</h3>
                <button 
                  onClick={() => setShowOrderDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('customerInformation')}</h4>
                  <p><span className="font-medium">{t('name')}:</span> {selectedOrder.customer}</p>
                  <p><span className="font-medium">{t('email')}:</span> {selectedOrder.email}</p>
                  <p><span className="font-medium">{t('phone')}:</span> {selectedOrder.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('orderInformation')}</h4>
                  <p><span className="font-medium">{t('date')}:</span> {selectedOrder.date}</p>
                  <p><span className="font-medium">{t('status')}:</span> {selectedOrder.status}</p>
                  <p><span className="font-medium">{t('paymentMethod')}:</span> {selectedOrder.paymentMethod}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('shippingAddress')}</h4>
                <p>{selectedOrder.address}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('orderItems')}</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('product')}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('quantity')}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('total')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedOrder.items.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.price}</td>
                        <td className="px-4 py-2">{item.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="3" className="px-4 py-2 text-right font-medium">{t('total')}:</td>
                      <td className="px-4 py-2 font-bold">{selectedOrder.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="flex justify-end space-x-2">
                <button 
                  onClick={() => setShowOrderDetails(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {t('close')}
                </button>
                <button 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  onClick={() => {
                    // In a real app, this would print the order
                    console.log('Printing order:', selectedOrder.id);
                    window.print();
                  }}
                >
                  {t('printOrder')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;