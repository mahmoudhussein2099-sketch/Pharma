import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const BlockList = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBlockItem, setNewBlockItem] = useState({ type: 'user', value: '', reason: '' });

  // Mock blocked users data
  const blockedUsers = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@example.com',
      phone: '+966 50 111 2222',
      reason: 'Multiple fraudulent orders',
      blockedAt: '2024-02-15',
      blockedBy: 'Admin'
    },
    { 
      id: 2, 
      name: 'Alice Johnson', 
      email: 'alice.johnson@example.com',
      phone: '+966 55 333 4444',
      reason: 'Abusive behavior towards staff',
      blockedAt: '2024-02-20',
      blockedBy: 'Admin'
    },
    { 
      id: 3, 
      name: 'Mohammed Khan', 
      email: 'mohammed.khan@example.com',
      phone: '+966 54 555 6666',
      reason: 'Payment fraud attempts',
      blockedAt: '2024-03-05',
      blockedBy: 'System'
    },
  ];

  // Mock blocked IPs data
  const blockedIPs = [
    { 
      id: 1, 
      ip: '185.176.43.72', 
      location: 'Moscow, Russia',
      reason: 'Multiple failed login attempts',
      blockedAt: '2024-02-10',
      blockedBy: 'System'
    },
    { 
      id: 2, 
      ip: '103.235.46.108', 
      location: 'Lagos, Nigeria',
      reason: 'Suspicious activity',
      blockedAt: '2024-02-25',
      blockedBy: 'System'
    },
    { 
      id: 3, 
      ip: '45.227.253.98', 
      location: 'Caracas, Venezuela',
      reason: 'Attempted SQL injection',
      blockedAt: '2024-03-08',
      blockedBy: 'System'
    },
  ];

  // Mock blocked emails data
  const blockedEmails = [
    { 
      id: 1, 
      email: 'spam@example.com', 
      reason: 'Spam',
      blockedAt: '2024-01-15',
      blockedBy: 'Admin'
    },
    { 
      id: 2, 
      email: 'phishing@scam.com', 
      reason: 'Phishing attempts',
      blockedAt: '2024-02-05',
      blockedBy: 'Admin'
    },
    { 
      id: 3, 
      email: 'abuse@fakeemail.com', 
      reason: 'Abusive messages',
      blockedAt: '2024-03-01',
      blockedBy: 'Admin'
    },
  ];

  // Filter data based on active tab and search term
  const getFilteredData = () => {
    let data = [];
    
    if (activeTab === 'users') {
      data = blockedUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.includes(searchTerm)
      );
    } else if (activeTab === 'ips') {
      data = blockedIPs.filter(ip => 
        ip.ip.includes(searchTerm) ||
        ip.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'emails') {
      data = blockedEmails.filter(email => 
        email.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return data;
  };

  const handleAddToBlockList = () => {
    // In a real app, this would call an API to add the item to the block list
    console.log('Adding to block list:', newBlockItem);
    
    // Reset form and close modal
    setNewBlockItem({ type: 'user', value: '', reason: '' });
    setShowAddModal(false);
  };

  const handleRemoveFromBlockList = (id) => {
    // In a real app, this would call an API to remove the item from the block list
    console.log('Removing from block list, ID:', id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('blockList')}</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          {t('addToBlockList')}
        </button>
      </div>

      {/* Block List Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('blockedUsers')}</p>
            <p className="text-2xl font-bold">{blockedUsers.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600">👤</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('blockedIPs')}</p>
            <p className="text-2xl font-bold">{blockedIPs.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600">🌐</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('blockedEmails')}</p>
            <p className="text-2xl font-bold">{blockedEmails.length}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <span className="text-red-600">✉️</span>
          </div>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('users')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'users' ? 'bg-white shadow' : ''}`}
            >
              {t('users')}
            </button>
            <button 
              onClick={() => setActiveTab('ips')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'ips' ? 'bg-white shadow' : ''}`}
            >
              {t('ipAddresses')}
            </button>
            <button 
              onClick={() => setActiveTab('emails')} 
              className={`px-4 py-2 rounded-md ${activeTab === 'emails' ? 'bg-white shadow' : ''}`}
            >
              {t('emails')}
            </button>
          </div>
          <div className="flex-1 max-w-xs">
            <input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Block List Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activeTab === 'users' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('phone')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('reason')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedAt')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedBy')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredData().map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.blockedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{user.blockedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleRemoveFromBlockList(user.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      {t('unblock')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'ips' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('ipAddress')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('location')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('reason')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedAt')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedBy')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredData().map((ip) => (
                <tr key={ip.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{ip.ip}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ip.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ip.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ip.blockedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ip.blockedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleRemoveFromBlockList(ip.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      {t('unblock')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'emails' && (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('reason')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedAt')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('blockedBy')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {getFilteredData().map((email) => (
                <tr key={email.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{email.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{email.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{email.blockedAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{email.blockedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => handleRemoveFromBlockList(email.id)} 
                      className="text-red-600 hover:text-red-900"
                    >
                      {t('unblock')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add to Block List Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t('addToBlockList')}</h3>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('blockType')}</label>
                  <select 
                    value={newBlockItem.type}
                    onChange={(e) => setNewBlockItem({...newBlockItem, type: e.target.value})}
                    className="w-full p-2 border rounded"
                  >
                    <option value="user">{t('user')}</option>
                    <option value="ip">{t('ipAddress')}</option>
                    <option value="email">{t('email')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {newBlockItem.type === 'user' ? t('userEmail') : 
                     newBlockItem.type === 'ip' ? t('ipAddress') : 
                     t('email')}
                  </label>
                  <input 
                    type="text"
                    value={newBlockItem.value}
                    onChange={(e) => setNewBlockItem({...newBlockItem, value: e.target.value})}
                    className="w-full p-2 border rounded"
                    placeholder={
                      newBlockItem.type === 'user' ? 'user@example.com' : 
                      newBlockItem.type === 'ip' ? '192.168.1.1' : 
                      'blocked@example.com'
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('reason')}</label>
                  <textarea 
                    value={newBlockItem.reason}
                    onChange={(e) => setNewBlockItem({...newBlockItem, reason: e.target.value})}
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder={t('enterBlockReason')}
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={handleAddToBlockList}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  {t('block')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockList;