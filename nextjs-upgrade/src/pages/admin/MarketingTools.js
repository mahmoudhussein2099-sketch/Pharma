import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AIMarketingGenerator from '../../components/AIMarketingGenerator';

const MarketingTools = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('campaigns');
  // const [selectedCampaign, setSelectedCampaign] = useState(null); // Commented out until needed
  const [showCampaignModal, setShowCampaignModal] = useState(false);

  // Mock campaigns data
  const campaigns = [
    { 
      id: 1, 
      name: 'Summer Sale', 
      type: 'Discount',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      budget: 'SAR 5,000',
      spent: 'SAR 2,340',
      reach: 12500,
      conversions: 320,
      roi: '215%'
    },
    { 
      id: 2, 
      name: 'Ramadan Offers', 
      type: 'Discount',
      status: 'Active',
      startDate: '2024-03-10',
      endDate: '2024-04-10',
      budget: 'SAR 8,000',
      spent: 'SAR 6,250',
      reach: 24800,
      conversions: 580,
      roi: '185%'
    },
    { 
      id: 3, 
      name: 'Back to School', 
      type: 'Promotion',
      status: 'Scheduled',
      startDate: '2024-08-15',
      endDate: '2024-09-15',
      budget: 'SAR 4,500',
      spent: 'SAR 0',
      reach: 0,
      conversions: 0,
      roi: '0%'
    },
    { 
      id: 4, 
      name: 'Winter Health', 
      type: 'Awareness',
      status: 'Completed',
      startDate: '2024-01-01',
      endDate: '2024-02-28',
      budget: 'SAR 6,000',
      spent: 'SAR 6,000',
      reach: 18700,
      conversions: 420,
      roi: '175%'
    },
  ];

  // Mock discounts data
  const discounts = [
    { 
      id: 1, 
      code: 'SUMMER20', 
      type: 'Percentage',
      value: '20%',
      minPurchase: 'SAR 100',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      usageLimit: 1000,
      usageCount: 345
    },
    { 
      id: 2, 
      code: 'RAMADAN15', 
      type: 'Percentage',
      value: '15%',
      minPurchase: 'SAR 150',
      status: 'Active',
      startDate: '2024-03-10',
      endDate: '2024-04-10',
      usageLimit: 2000,
      usageCount: 1245
    },
    { 
      id: 3, 
      code: 'FREESHIP', 
      type: 'Free Shipping',
      value: 'Free Shipping',
      minPurchase: 'SAR 200',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageLimit: 5000,
      usageCount: 2340
    },
    { 
      id: 4, 
      code: 'WELCOME10', 
      type: 'Percentage',
      value: '10%',
      minPurchase: 'SAR 50',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      usageLimit: null,
      usageCount: 4567
    },
  ];

  // Mock analytics data
  const campaignPerformanceData = [
    { name: 'Jan', sales: 4000, visitors: 2400, conversions: 240 },
    { name: 'Feb', sales: 3000, visitors: 1398, conversions: 210 },
    { name: 'Mar', sales: 2000, visitors: 9800, conversions: 290 },
    { name: 'Apr', sales: 2780, visitors: 3908, conversions: 200 },
    { name: 'May', sales: 1890, visitors: 4800, conversions: 218 },
    { name: 'Jun', sales: 2390, visitors: 3800, conversions: 250 },
    { name: 'Jul', sales: 3490, visitors: 4300, conversions: 210 },
  ];

  const channelData = [
    { name: 'Social Media', value: 35, color: '#0088FE' },
    { name: 'Email', value: 25, color: '#00C49F' },
    { name: 'Search', value: 20, color: '#FFBB28' },
    { name: 'Direct', value: 15, color: '#FF8042' },
    { name: 'Referral', value: 5, color: '#8884d8' },
  ];

  const handleCreateCampaign = () => {
    setShowCampaignModal(true);
  };

  const handleSaveCampaign = () => {
    // In a real app, this would save the campaign to the database
    setShowCampaignModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('marketingTools')}</h2>
        <button 
          onClick={handleCreateCampaign}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          {t('createCampaign')}
        </button>
      </div>

      {/* Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('activeCampaigns')}</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600">📣</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('totalReach')}</p>
            <p className="text-2xl font-bold">56,000</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600">👁️</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('conversions')}</p>
            <p className="text-2xl font-bold">1,320</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <span className="text-purple-600">🎯</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{t('averageROI')}</p>
            <p className="text-2xl font-bold">192%</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600">💰</span>
          </div>
        </div>
      </div>

      {/* Marketing Tabs */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 inline-flex">
          <button 
            onClick={() => setActiveTab('campaigns')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'campaigns' ? 'bg-white shadow' : ''}`}
          >
            {t('campaigns')}
          </button>
          <button 
            onClick={() => setActiveTab('discounts')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'discounts' ? 'bg-white shadow' : ''}`}
          >
            {t('discounts')}
          </button>
          <button 
            onClick={() => setActiveTab('analytics')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-white shadow' : ''}`}
          >
            {t('analytics')}
          </button>
          <button 
            onClick={() => setActiveTab('aiMarketing')} 
            className={`px-4 py-2 rounded-md ${activeTab === 'aiMarketing' ? 'bg-white shadow' : ''}`}
          >
            {t('aiMarketing')}
          </button>
        </div>
      </div>

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('campaignName')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dates')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('budget')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('reach')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('roi')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{campaign.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.startDate} - {campaign.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.budget}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.reach.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{campaign.roi}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button 
                      onClick={() => console.log('View campaign:', campaign)} 
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      {t('view')}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      {t('edit')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Discounts Tab */}
      {activeTab === 'discounts' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="text-lg font-semibold">{t('discountCodes')}</h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {t('createDiscount')}
            </button>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('code')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('type')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('value')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('minPurchase')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('dates')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('usage')}</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {discounts.map((discount) => (
                <tr key={discount.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{discount.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{discount.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{discount.value}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{discount.minPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      discount.status === 'Active' ? 'bg-green-100 text-green-800' :
                      discount.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {discount.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{discount.startDate} - {discount.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {discount.usageCount} / {discount.usageLimit || '∞'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-gray-600 hover:text-gray-900 mr-3">
                      {t('edit')}
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {t('delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Campaign Performance Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">{t('campaignPerformance')}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={campaignPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="visitors" stroke="#82ca9d" />
                <Line type="monotone" dataKey="conversions" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Marketing Channels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{t('marketingChannels')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">{t('conversionByChannel')}</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={channelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8">
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
      
      {/* AI Marketing Tab */}
      {activeTab === 'aiMarketing' && (
        <AIMarketingGenerator />
      )}

      {/* Create Campaign Modal */}
      {showCampaignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{t('createCampaign')}</h3>
                <button 
                  onClick={() => setShowCampaignModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('campaignName')}</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder={t('enterCampaignName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('campaignType')}</label>
                  <select className="w-full p-2 border rounded">
                    <option value="discount">{t('discount')}</option>
                    <option value="promotion">{t('promotion')}</option>
                    <option value="awareness">{t('awareness')}</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('startDate')}</label>
                    <input 
                      type="date"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t('endDate')}</label>
                    <input 
                      type="date"
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('budget')}</label>
                  <input 
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="SAR 5,000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
                  <textarea 
                    className="w-full p-2 border rounded"
                    rows="3"
                    placeholder={t('enterCampaignDescription')}
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('targetAudience')}</label>
                  <select className="w-full p-2 border rounded">
                    <option value="all">{t('allCustomers')}</option>
                    <option value="new">{t('newCustomers')}</option>
                    <option value="returning">{t('returningCustomers')}</option>
                    <option value="inactive">{t('inactiveCustomers')}</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-2">
                <button 
                  onClick={() => setShowCampaignModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  {t('cancel')}
                </button>
                <button 
                  onClick={handleSaveCampaign}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {t('createCampaign')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketingTools;