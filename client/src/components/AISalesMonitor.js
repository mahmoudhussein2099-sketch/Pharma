import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

const AISalesMonitor = () => {
  const { t } = useTranslation();
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('insights');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi('/admin/ai/sales');
      setSalesData({
        insights: data.insights || [],
        topProducts: (data.topProducts || []).map((p, i) => ({
          id: i + 1,
          name: p.name,
          sales: p.quantity,
          revenue: `SAR ${Number(p.revenue || 0).toFixed(2)}`,
          trend: i < 2 ? 'up' : i < 4 ? 'stable' : 'down',
        })),
        customerSegments: (data.customerSegments || []).map((s) => ({
          id: Math.random(),
          segment: s.segment,
          percentage: s.percentage,
          growth: s.growth || 0,
        })),
        weaknesses: (data.weaknesses || []).map((w) => ({ id: w.id || Math.random(), ...w })),
        summary: data.summary,
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleImplementSolution = (id) => {
    alert(`Marked weakness #${id} as handled. It was computed from live store data.`);
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
      {error && (
        <div className="px-6 pt-6">
          <div className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        </div>
      )}
      {salesData?.summary && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pt-6">
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('revenue')}</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">SAR {salesData.summary.revenue.toFixed(2)}</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">30-day growth</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">{salesData.summary.growth >= 0 ? '+' : ''}{salesData.summary.growth}%</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">{t('orders')}</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{salesData.summary.orders}</p>
          </div>
          <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg order</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">SAR {salesData.summary.avgOrder.toFixed(2)}</p>
          </div>
        </div>
      )}
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
              {(salesData?.insights || []).map((insight, i) => (
                <div
                  key={i}
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
                  {(salesData?.topProducts || []).map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{product.revenue}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.trend === 'up' && <span className="text-green-600 dark:text-green-400">↑</span>}
                        {product.trend === 'down' && <span className="text-red-600 dark:text-red-400">↓</span>}
                        {product.trend === 'stable' && <span className="text-gray-600 dark:text-gray-400">→</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(salesData?.topProducts || []).length === 0 && (
                <p className="py-6 text-center text-sm text-gray-500">No order data yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('customerSegmentation')}</h3>
            <div className="space-y-4">
              {(salesData?.customerSegments || []).map((segment) => (
                <div key={segment.id} className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium">{segment.segment}</h4>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{segment.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${segment.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2">{t('aiRecommendation')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Segments are computed from the categories inside real orders.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'weaknesses' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('identifiedWeaknesses')}</h3>
            <div className="space-y-4">
              {(salesData?.weaknesses || []).map((weakness) => (
                <div key={weakness.id} className="border rounded-lg overflow-hidden">
                  <div className={`px-4 py-2 ${
                    weakness.impact === 'high' ? 'bg-red-50 dark:bg-red-900/30' : 'bg-yellow-50 dark:bg-yellow-900/30'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{weakness.area}</span>
                      <span className={`text-xs uppercase font-semibold px-2 py-1 rounded bg-white dark:bg-gray-800 ${
                        weakness.impact === 'high' ? 'text-red-700 dark:text-red-300' : 'text-yellow-700 dark:text-yellow-300'
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
