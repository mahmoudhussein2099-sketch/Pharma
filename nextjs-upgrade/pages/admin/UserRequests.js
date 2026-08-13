import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const UserRequests = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showRequestDetails, setShowRequestDetails] = useState(false);

  // Mock user requests data
  const allRequests = [
    { 
      id: 'REQ-1001', 
      customer: 'Ahmed Al-Saud', 
      email: 'ahmed@example.com',
      phone: '+966 50 123 4567',
      type: 'Prescription',
      subject: 'Prescription Refill Request',
      message: 'I need a refill for my blood pressure medication (Lisinopril 10mg). My prescription number is PRE-5678.',
      status: 'New',
      priority: 'High',
      date: '2024-03-15 14:32',
      assignedTo: null,
      attachments: [
        { name: 'prescription.jpg', size: '1.2 MB', type: 'image/jpeg' }
      ]
    },
    { 
      id: 'REQ-1002', 
      customer: 'Fatima Hassan', 
      email: 'fatima@example.com',
      phone: '+966 55 987 6543',
      type: 'Order Issue',
      subject: 'Wrong Item Delivered',
      message: 'I received the wrong medication in my order #ORD-7844. I ordered Panadol Extra but received regular Panadol.',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-03-15 13:45',
      assignedTo: 'Mohammed',
      attachments: [
        { name: 'order_receipt.pdf', size: '450 KB', type: 'application/pdf' },
        { name: 'wrong_item.jpg', size: '980 KB', type: 'image/jpeg' }
      ]
    },
    { 
      id: 'REQ-1003', 
      customer: 'Mohammed Ali', 
      email: 'mohammed@example.com',
      phone: '+966 54 111 2222',
      type: 'Product Inquiry',
      subject: 'Blood Pressure Monitor Availability',
      message: 'Do you have the Omron M3 Blood Pressure Monitor in stock? If yes, what is the price?',
      status: 'Resolved',
      priority: 'Low',
      date: '2024-03-15 11:20',
      assignedTo: 'Sara',
      attachments: []
    },
    { 
      id: 'REQ-1004', 
      customer: 'Sara Ahmed', 
      email: 'sara@example.com',
      phone: '+966 56 333 4444',
      type: 'Consultation',
      subject: 'Skincare Product Recommendation',
      message: 'I have sensitive skin and I\'m looking for a gentle cleanser and moisturizer. Can you recommend some products?',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-03-14 16:55',
      assignedTo: 'Khalid',
      attachments: []
    },
    { 
      id: 'REQ-1005', 
      customer: 'Khalid Omar', 
      email: 'khalid@example.com',
      phone: '+966 59 555 6666',
      type: 'Prescription',
      subject: 'Prescription Status Check',
      message: 'I submitted my prescription for Lipitor yesterday. Can you tell me if it\'s ready for pickup?',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-03-14 10:15',
      assignedTo: 'Ahmed',
      attachments: []
    },
    { 
      id: 'REQ-1006', 
      customer: 'Noura Al-Qahtani', 
      email: 'noura@example.com',
      phone: '+966 58 777 8888',
      type: 'Return',
      subject: 'Return Request for Expired Product',
      message: 'I purchased a vitamin supplement that I just noticed is expired. Order #ORD-7840. I would like to return it for a refund.',
      status: 'New',
      priority: 'High',
      date: '2024-03-13 09:30',
      assignedTo: null,
      attachments: [
        { name: 'expired_product.jpg', size: '1.5 MB', type: 'image/jpeg' }
      ]
    },
    { 
      id: 'REQ-1007', 
      customer: 'Abdullah Mohammed', 
      email: 'abdullah@example.com',
      phone: '+966 53 222 3333',
      type: 'Delivery',
      subject: 'Change Delivery Address',
      message: 'I need to change the delivery address for my order #ORD-7839. The new address is: King Fahd Road, Building 45, Apartment 302, Riyadh.',
      status: 'In Progress',
      priority: 'High',
      date: '2024-03-13 08:15',
      assignedTo: 'Fatima',
      attachments: []
    },
  ];

  // Filter requests based on active tab and search term
  const filteredRequests = allRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status.toLowerCase().replace(' ', '-') === activeTab;
    const matchesSearch = request.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         request.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Count requests by status
  const requestCounts = {
    all: allRequests.length,
    new: allRequests.filter(r => r.status === 'New').length,
    'in-progress': allRequests.filter(r => r.status === 'In Progress').length,
    resolved: allRequests.filter(r => r.status === 'Resolved').length,
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  const handleUpdateStatus = (requestId, newStatus) => {
    // In a real app, this would call an API to update the request status
    console.log(`Updating request ${requestId} to status: ${newStatus}`);
    // For now, we'll just log the action
    // This would be replaced with state management in a real app
  };

  const handleAssignRequest = (requestId, assignee) => {
    // In a real app, this would call an API to assign the request
    console.log(`Assigning request ${requestId} to: ${assignee}`);
    // For now, we'll just log the action
    // This would be replaced with state management in a real app
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('userRequests')}</h2>
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-500">{t('totalRequests')}:</span>
          <span className="text-sm font-medium">{allRequests.length}</span>
        </div>
      </div>

      {/* Request Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('allRequests')}</p>
            <p className="text-2xl font-bold">{requestCounts.all}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">📋</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('newRequests')}</p>
            <p className="text-2xl font-bold">{requestCounts.new}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600">🆕</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('inProgressRequests')}</p>
            <p className="text-2xl font-bold">{requestCounts['in-progress']}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600">⏳</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('resolvedRequests')}</p>
            <p className="text-2xl font-bold">{requestCounts.resolved}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600">✓</span>
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
              {t('all')} ({requestCounts.all})
            </button>
            <button 
              onClick={() => setActiveTab('new')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'new' ? 'bg-white shadow' : ''}`}
            >
              {t('new')} ({requestCounts.new})
            </button>
            <button 
              onClick={() => setActiveTab('in-progress')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'in-progress' ? 'bg-white shadow' : ''}`}
            >
              {t('inProgress')} ({requestCounts['in-progress']})
            </button>
            <button 
              onClick={() => setActiveTab('resolved')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'resolved' ? 'bg-white shadow' : ''}`}
            >
              {t('resolved')} ({requestCounts.resolved})
            </button>
          </div>
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder={t('searchRequests')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('no')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('requestId')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('customer')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('subject')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('priority')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('assignedTo')}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request, index) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{request.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{request.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{request.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{request.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.status === 'New' ? 'bg-green-100 text-green-800' :
                    request.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {request.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    request.priority === 'High' ? 'bg-red-100 text-red-800' :
                    request.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {request.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {request.assignedTo || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button 
                    onClick={() => handleViewRequest(request)} 
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    {t('view')}
                  </button>
                  <select 
                    className="border rounded px-2 py-1 text-sm mr-2"
                    onChange={(e) => handleUpdateStatus(request.id, e.target.value)}
                    value={request.status}
                  >
                    <option value="New">{t('new')}</option>
                    <option value="In Progress">{t('inProgress')}</option>
                    <option value="Resolved">{t('resolved')}</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Request Details Modal */}
      {showRequestDetails && selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t('requestDetails')}: {selectedRequest.id}</h3>
                <button 
                  onClick={() => setShowRequestDetails(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">{t('customerInformation')}</h4>
                  <p><span className="font-medium">{t('name')}:</span> {selectedRequest.customer}</p>
                  <p><span className="font-medium">{t('email')}:</span> {selectedRequest.email}</p>
                  <p><span className="font-medium">{t('phone')}:</span> {selectedRequest.phone}</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{t('requestInformation')}</h4>
                  <p><span className="font-medium">{t('type')}:</span> {selectedRequest.type}</p>
                  <p><span className="font-medium">{t('date')}:</span> {selectedRequest.date}</p>
                  <p>
                    <span className="font-medium">{t('status')}:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedRequest.status === 'New' ? 'bg-green-100 text-green-800' :
                      selectedRequest.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedRequest.status}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">{t('priority')}:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedRequest.priority === 'High' ? 'bg-red-100 text-red-800' :
                      selectedRequest.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedRequest.priority}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('subject')}</h4>
                <p className="font-medium">{selectedRequest.subject}</p>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('message')}</h4>
                <p className="bg-gray-50 p-4 rounded">{selectedRequest.message}</p>
              </div>

              {selectedRequest.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">{t('attachments')}</h4>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                        <span className="text-gray-500 mr-2">📎</span>
                        <span className="flex-1">{attachment.name}</span>
                        <span className="text-sm text-gray-500">{attachment.size}</span>
                        <button className="ml-2 text-blue-600 hover:text-blue-800 text-sm">
                          {t('view')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('assignTo')}</h4>
                <div className="flex items-center">
                  <select 
                    className="border rounded px-3 py-2 mr-2"
                    defaultValue={selectedRequest.assignedTo || ''}
                    onChange={(e) => handleAssignRequest(selectedRequest.id, e.target.value || null)}
                  >
                    <option value="">{t('unassigned')}</option>
                    <option value="Ahmed">Ahmed</option>
                    <option value="Fatima">Fatima</option>
                    <option value="Mohammed">Mohammed</option>
                    <option value="Sara">Sara</option>
                    <option value="Khalid">Khalid</option>
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
                    defaultValue={selectedRequest.status}
                    onChange={(e) => handleUpdateStatus(selectedRequest.id, e.target.value)}
                  >
                    <option value="New">{t('new')}</option>
                    <option value="In Progress">{t('inProgress')}</option>
                    <option value="Resolved">{t('resolved')}</option>
                  </select>
                  <button className="bg-green-600 text-white px-4 py-2 rounded">
                    {t('update')}
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold mb-2">{t('addResponse')}</h4>
                <textarea 
                  className="w-full border rounded p-2" 
                  rows="4"
                  placeholder={t('typeYourResponse')}
                ></textarea>
                <div className="mt-2 flex justify-end">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    {t('sendResponse')}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={() => setShowRequestDetails(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded mr-2"
                >
                  {t('close')}
                </button>
                <button className="bg-red-600 text-white px-4 py-2 rounded">
                  {t('deleteRequest')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRequests;