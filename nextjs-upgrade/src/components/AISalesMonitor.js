import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AISalesMonitor = () => {
  const { t } = useTranslation();
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('insights');

  useEffect(() => {
    // Simulate loading sales data
    setTimeout(() => {
      setSalesData({
        insights: [
          { id: 1, type: 'positive', title: 'Sales Growth', description: 'Sales have increased by 15% compared to last month', action: 'Continue current marketing strategy' },
          { id: 2, type: 'negative', title: 'Cart Abandonment', description: 'Cart abandonment rate has increased to 68%', action: 'Simplify checkout process and add exit intent popups' },
          { id: 3, type: 'opportunity', title: 'Cross-selling Potential', description: 'Customers who buy vitamins often need supplements', action: 'Create product bundles for vitamins and supplements' },
          { id: 4, type: 'warning', title: 'Inventory Alert', description: 'Pain relief medications are running low', action: 'Restock pain relief medications within 7 days' }
        ],
        topProducts: [
          { id: 1, name: 'Panadol Extra', sales: 245, revenue: 'SAR 3,675', trend: 'up' },
          { id: 2, name: 'Vitamin C 1000mg', sales: 187, revenue: 'SAR 4,675', trend: 'up' },
          { id: 3, name: 'Augmentin 625mg', sales: 154, revenue: 'SAR 10,010', trend: 'down' },
          { id: 4, name: 'Baby Diapers Pack', sales: 143, revenue: 'SAR 12,870', trend: 'up' },
          { id: 5, name: 'Blood Pressure Monitor', sales: 132, revenue: 'SAR 29,040', trend: 'stable' }
        ],
        customerSegments: [
          { id: 1, segment: 'Parents', percentage: 35, growth: 5 },
          { id: 2, segment: 'Seniors', percentage: 25, growth: 2 },
          { id: 3, segment: 'Young Adults', percentage: 20, growth: 8 },
          { id: 4, segment: 'Middle-aged Adults', percentage: 15, growth: -3 },
          { id: 5, segment: 'Others', percentage: 5, growth: 0 }
        ],
        weaknesses: [
          { id: 1, area: 'Mobile Checkout', description: 'High abandonment rate on mobile checkout', impact: 'high', solution: 'Optimize mobile checkout flow' },
          { id: 2, area: 'Product Descriptions', description: 'Incomplete product information for medications', impact: 'medium', solution: 'Add detailed descriptions and usage instructions' },
          { id: 3, area: 'Customer Retention', description: 'Low repeat purchase rate (15%)', impact: 'high', solution: 'Implement loyalty program and follow-up emails' },
          { id: 4, area: 'Search Functionality', description: 'Users cannot find products easily', impact: 'medium', solution: 'Improve search algorithm and add filters' }
        ]
      });
      setLoading(false);
    }, 1500);
  }, []);

  const handleImplementSolution = (id) => {
    // In a real app, this would implement the solution or create a task
    alert(`Implementing solution for weakness #${id}. This would apply changes in a real application.`);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('analyzingSalesData')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'insights'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('aiInsights')}
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'products'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('topProducts')}
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'customers'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('customerSegments')}
          </button>
          <button
            onClick={() => setActiveTab('weaknesses')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'weaknesses'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('weaknesses')}
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'insights' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('aiGeneratedInsights')}</h3>
            <div className="space-y-4">
              {salesData.insights.map((insight) => (
                <div 
                  key={insight.id} 
                  className={`border-l-4 p-4 rounded-r-lg ${
                    insight.type === 'positive' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                    insight.type === 'negative' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                    insight.type === 'opportunity' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' :
                    'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                  }`}
                >
                  <h4 className="font-medium mb-1">{insight.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{insight.description}</p>
                  <div className="flex items-center">
                    <span className="text-sm font-medium mr-2">{t('recommendedAction')}:</span>
                    <span className="text-sm">{insight.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('topSellingProducts')}</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('rank')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('product')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('unitsSold')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('revenue')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('trend')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {salesData.topProducts.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.revenue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.trend === 'up' && (
                          <span className="text-green-600 dark:text-green-400">↑</span>
                        )}
                        {product.trend === 'down' && (
                          <span className="text-red-600 dark:text-red-400">↓</span>
                        )}
                        {product.trend === 'stable' && (
                          <span className="text-gray-600 dark:text-gray-400">→</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('customerSegmentation')}</h3>
            <div className="space-y-4">
              {salesData.customerSegments.map((segment) => (
                <div key={segment.id} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{segment.percentage}%</span>
                      {segment.growth > 0 && (
                        <span className="text-xs text-green-600 dark:text-green-400">+{segment.growth}%</span>
                      )}
                      {segment.growth < 0 && (
                        <span className="text-xs text-red-600 dark:text-red-400">{segment.growth}%</span>
                      )}
                      {segment.growth === 0 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400">0%</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${segment.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2">{t('aiRecommendation')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {t('customerSegmentRecommendation')}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'weaknesses' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('identifiedWeaknesses')}</h3>
            <div className="space-y-4">
              {salesData.weaknesses.map((weakness) => (
                <div key={weakness.id} className="border rounded-lg overflow-hidden">
                  <div className={`px-4 py-2 ${
                    weakness.impact === 'high' ? 'bg-red-50 dark:bg-red-900/30' :
                    'bg-yellow-50 dark:bg-yellow-900/30'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{weakness.area}</span>
                      <span className={`text-xs uppercase font-semibold px-2 py-1 rounded bg-white dark:bg-gray-800 ${
                        weakness.impact === 'high' ? 'text-red-700 dark:text-red-300' :
                        'text-yellow-700 dark:text-yellow-300'
                      }`}>
                        {weakness.impact} {t('impact')}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2">{weakness.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{t('solution')}:</span> {weakness.solution}
                      </div>
                      <button 
                        onClick={() => handleImplementSolution(weakness.id)}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        {t('implement')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISalesMonitor;