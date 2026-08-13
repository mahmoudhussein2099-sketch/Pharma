import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Delivery = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);

  // Mock delivery data
  const allDeliveries = [
    { 
      id: 'DEL-1001', 
      orderId: 'ORD-7845',
      customer: 'Ahmed Al-Saud', 
      address: 'King Fahd Road, Building 23, Apartment 405, Riyadh',
      phone: '+966 50 123 4567',
      items: [
        { name: 'Panadol Extra', quantity: 2, price: 'SAR 15.00' },
        { name: 'Vitamin C 1000mg', quantity: 3, price: 'SAR 25.00' },
        { name: 'Augmentin 625mg', quantity: 1, price: 'SAR 65.00' },
      ],
      total: 'SAR 245.00',
      status: 'Pending',
      scheduledDate: '2024-03-16',
      scheduledTime: '14:00-16:00',
      driver: null,
      notes: 'Please call before delivery',
      createdAt: '2024-03-15 14:32',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid'
    },
    { 
      id: 'DEL-1002', 
      orderId: 'ORD-7844',
      customer: 'Fatima Hassan', 
      address: 'Al Olaya Street, Building 45, Apartment 201, Riyadh',
      phone: '+966 55 987 6543',
      items: [
        { name: 'Baby Diapers Pack', quantity: 1, price: 'SAR 89.50' },
        { name: 'Baby Wipes', quantity: 2, price: 'SAR 15.00' },
        { name: 'Baby Shampoo', quantity: 1, price: 'SAR 35.00' },
      ],
      total: 'SAR 189.50',
      status: 'Out for Delivery',
      scheduledDate: '2024-03-15',
      scheduledTime: '16:00-18:00',
      driver: 'Khalid',
      notes: '',
      createdAt: '2024-03-15 09:15',
      paymentMethod: 'Apple Pay',
      paymentStatus: 'Paid'
    },
    { 
      id: 'DEL-1003', 
      orderId: 'ORD-7843',
      customer: 'Mohammed Ali', 
      address: 'Prince Sultan Road, Villa 78, Jeddah',
      phone: '+966 54 111 2222',
      items: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 'SAR 220.75' },
        { name: 'Thermometer', quantity: 1, price: 'SAR 45.00' },
        { name: 'First Aid Kit', quantity: 1, price: 'SAR 55.00' },
      ],
      total: 'SAR 320.75',
      status: 'Out for Delivery',
      scheduledDate: '2024-03-15',
      scheduledTime: '14:00-16:00',
      driver: 'Ahmed',
      notes: 'Leave with security if not home',
      createdAt: '2024-03-14 16:20',
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending'
    },
    { 
      id: 'DEL-1004', 
      orderId: 'ORD-7842',
      customer: 'Sara Ahmed', 
      address: 'King Abdullah Road, Building 12, Apartment 304, Dammam',
      phone: '+966 56 333 4444',
      items: [
        { name: 'Face Cream', quantity: 1, price: 'SAR 85.25' },
        { name: 'Sunscreen SPF 50', quantity: 1, price: 'SAR 45.00' },
        { name: 'Lip Balm', quantity: 2, price: 'SAR 13.00' },
      ],
      total: 'SAR 156.25',
      status: 'Delivered',
      scheduledDate: '2024-03-14',
      scheduledTime: '10:00-12:00',
      driver: 'Mohammed',
      deliveredAt: '2024-03-14 11:23',
      notes: '',
      createdAt: '2024-03-13 15:40',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid'
    },
    { 
      id: 'DEL-1005', 
      orderId: 'ORD-7841',
      customer: 'Khalid Omar', 
      address: 'Al Amir Faisal Bin Fahd Road, Building 34, Apartment 502, Khobar',
      phone: '+966 59 555 6666',
      items: [
        { name: 'Multivitamin', quantity: 2, price: 'SAR 45.00' },
        { name: 'Omega-3 Fish Oil', quantity: 1, price: 'SAR 65.00' },
        { name: 'Calcium Supplements', quantity: 1, price: 'SAR 55.00' },
      ],
      total: 'SAR 210.00',
      status: 'Delivered',
      scheduledDate: '2024-03-13',
      scheduledTime: '14:00-16:00',
      driver: 'Fahad',
      deliveredAt: '2024-03-13 15:10',
      notes: '',
      createdAt: '2024-03-12 11:25',
      paymentMethod: 'Mada Card',
      paymentStatus: 'Paid'
    },
    { 
      id: 'DEL-1006', 
      orderId: 'ORD-7840',
      customer: 'Noura Al-Qahtani', 
      address: 'Al Takhassusi Street, Building 56, Apartment 103, Riyadh',
      phone: '+966 58 777 8888',
      items: [
        { name: 'Cough Syrup', quantity: 1, price: 'SAR 32.50' },
        { name: 'Throat Lozenges', quantity: 2, price: 'SAR 18.00' },
        { name: 'Nasal Spray', quantity: 1, price: 'SAR 45.00' },
        { name: 'Paracetamol', quantity: 2, price: 'SAR 12.50' },
        { name: 'Vicks VapoRub', quantity: 1, price: 'SAR 40.00' },
      ],
      total: 'SAR 178.50',
      status: 'Cancelled',
      scheduledDate: '2024-03-13',
      scheduledTime: '16:00-18:00',
      driver: null,
      cancelledAt: '2024-03-13 10:15',
      cancelReason: 'Customer requested cancellation',
      notes: '',
      createdAt: '2024-03-12 09:30',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Refunded'
    },
  ];

  // Filter deliveries based on active tab and search term
  const filteredDeliveries = allDeliveries.filter(delivery => {
    const matchesTab = activeTab === 'all' || delivery.status.toLowerCase().replace(' ', '-') === activeTab;
    const matchesSearch = delivery.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         delivery.customer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count deliveries by status
  const deliveryCounts = {
    all: allDeliveries.length,
    pending: allDeliveries.filter(d => d.status === 'Pending').length,
    'out-for-delivery': allDeliveries.filter(d => d.status === 'Out for Delivery').length,
    delivered: allDeliveries.filter(d => d.status === 'Delivered').length,
    cancelled: allDeliveries.filter(d => d.status === 'Cancelled').length,
  };

  // List of drivers
  const drivers = ['Ahmed', 'Mohammed', 'Khalid', 'Fahad', 'Abdullah', 'Omar'];

  const handleViewDelivery = (delivery) => {
    setSelectedDelivery(delivery);
    setShowDeliveryDetails(true);
  };

  const handleUpdateStatus = (deliveryId, newStatus) => {
    // In a real app, this would call an API to update the delivery status
    console.log(`Updating delivery ${deliveryId} to status: ${newStatus}`);
    // For now, we'll just log the action
    // This would be replaced with state management in a real app
  };

  const handleAssignDriver = (deliveryId, driver) => {
    // In a real app, this would call an API to assign the driver
    console.log(`Assigning delivery ${deliveryId} to driver: ${driver}`);
    // For now, we'll just log the action
    // This would be replaced with state management in a real app
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('deliveryManagement')}</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">{t('totalDeliveries')}:</span>
          <span className="text-sm font-medium">{allDeliveries.length}</span>
        </div>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('allDeliveries')}</p>
            <p className="text-2xl font-bold">{deliveryCounts.all}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">📦</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('pending')}</p>
            <p className="text-2xl font-bold">{deliveryCounts.pending}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600">⏳</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('outForDelivery')}</p>
            <p className="text-2xl font-bold">{deliveryCounts['out-for-delivery']}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600">🚚</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('delivered')}</p>
            <p className="text-2xl font-bold">{deliveryCounts.delivered}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600">✓</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('cancelled')}</p>
            <p className="text-2xl font-bold">{deliveryCounts.cancelled}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600">✕</span>
          </div>
        </div>
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
              onClick={() => setActiveTab('pending')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'pending' ? 'bg-white shadow' : ''}`}
            >
              {t('pending')}
            </button>
            <button 
              onClick={() => setActiveTab('out-for-delivery')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'out-for-delivery' ? 'bg-white shadow' : ''}`}
            >
              {t('outForDelivery')}
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
              placeholder={t('searchDeliveries')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Deliveries Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('no')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('deliveryId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('orderId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('customer')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('scheduledDate')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('driver')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDeliveries.map((delivery, index) => (
              <tr key={delivery.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{delivery.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{delivery.orderId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{delivery.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{delivery.scheduledDate} ({delivery.scheduledTime})</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    delivery.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    delivery.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-800' :
                    delivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {delivery.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {delivery.driver || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleViewDelivery(delivery)} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {t('view')}
                  </button>
                  {delivery.status !== 'Delivered' && delivery.status !== 'Cancelled' && (
                    <select 
                      className="border rounded px-2 py-1 text-sm mr-2"
                      onChange={(e) => handleUpdateStatus(delivery.id, e.target.value)}
                      value={delivery.status}
                    >
                      <option value="Pending">{t('pending')}</option>
                      <option value="Out for Delivery">{t('outForDelivery')}</option>
                      <option value="Delivered">{t('delivered')}</option>
                      <option value="Cancelled">{t('cancelled')}</option>
                    </select>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Details Modal */}
      {showDeliveryDetails && selectedDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t('deliveryDetails')}: {selectedDelivery.id}</h3>
                <button 
                  onClick={() => setShowDeliveryDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('customerInformation')}</h4>
                  <p><span className="font-medium">{t('name')}:</span> {selectedDelivery.customer}</p>
                  <p><span className="font-medium">{t('phone')}:</span> {selectedDelivery.phone}</p>
                  <p><span className="font-medium">{t('address')}:</span> {selectedDelivery.address}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('deliveryInformation')}</h4>
                  <p><span className="font-medium">{t('orderId')}:</span> {selectedDelivery.orderId}</p>
                  <p><span className="font-medium">{t('scheduledDate')}:</span> {selectedDelivery.scheduledDate}</p>
                  <p><span className="font-medium">{t('scheduledTime')}:</span> {selectedDelivery.scheduledTime}</p>
                  <p>
                    <span className="font-medium">{t('status')}:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedDelivery.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      selectedDelivery.status === 'Out for Delivery' ? 'bg-orange-100 text-orange-800' :
                      selectedDelivery.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {selectedDelivery.status}
                    </span>
                  </p>
                  <p><span className="font-medium">{t('driver')}:</span> {selectedDelivery.driver || '-'}</p>
                  {selectedDelivery.deliveredAt && (
                    <p><span className="font-medium">{t('deliveredAt')}:</span> {selectedDelivery.deliveredAt}</p>
                  )}
                  {selectedDelivery.cancelledAt && (
                    <p><span className="font-medium">{t('cancelledAt')}:</span> {selectedDelivery.cancelledAt}</p>
                  )}
                  {selectedDelivery.cancelReason && (
                    <p><span className="font-medium">{t('cancelReason')}:</span> {selectedDelivery.cancelReason}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('orderItems')}</h4>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('item')}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('quantity')}</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {selectedDelivery.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.quantity}</td>
                        <td className="px-4 py-2">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan="2" className="px-4 py-2 text-right font-medium">{t('total')}:</td>
                      <td className="px-4 py-2 font-bold">{selectedDelivery.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('paymentInformation')}</h4>
                <p><span className="font-medium">{t('paymentMethod')}:</span> {selectedDelivery.paymentMethod}</p>
                <p>
                  <span className="font-medium">{t('paymentStatus')}:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                    selectedDelivery.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' :
                    selectedDelivery.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {selectedDelivery.paymentStatus}
                  </span>
                </p>
              </div>

              {selectedDelivery.notes && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{t('notes')}</h4>
                  <p className="bg-gray-50 p-4 rounded">{selectedDelivery.notes}</p>
                </div>
              )}

              {selectedDelivery.status !== 'Delivered' && selectedDelivery.status !== 'Cancelled' && (
                <>
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t('assignDriver')}</h4>
                    <div className="flex items-center">
                      <select 
                        className="border rounded px-3 py-2 mr-2"
                        defaultValue={selectedDelivery.driver || ''}
                        onChange={(e) => handleAssignDriver(selectedDelivery.id, e.target.value || null)}
                      >
                        <option value="">{t('selectDriver')}</option>
                        {drivers.map(driver => (
                          <option key={driver} value={driver}>{driver}</option>
                        ))}
                      </select>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded">
                        {t('assign')}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">{t('updateStatus')}</h4>
                    <div className="flex items-center">
                      <select 
                        className="border rounded px-3 py-2 mr-2"
                        defaultValue={selectedDelivery.status}
                        onChange={(e) => handleUpdateStatus(selectedDelivery.id, e.target.value)}
                      >
                        <option value="Pending">{t('pending')}</option>
                        <option value="Out for Delivery">{t('outForDelivery')}</option>
                        <option value="Delivered">{t('delivered')}</option>
                        <option value="Cancelled">{t('cancelled')}</option>
                      </select>
                      <button className="bg-green-600 text-white px-4 py-2 rounded">
                        {t('update')}
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end">
                <button 
                  onClick={() => setShowDeliveryDetails(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delivery;