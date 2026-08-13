import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

const AIPerformanceMonitor = () => {
  const { t } = useTranslation();
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await adminApi('/admin/ai/performance');
      setPerformanceData({
        overview: data.overview,
        issues: data.issues || [],
        recommendations: data.recommendations || [],
        trends: data.trends || { orders: [], revenue: [] },
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

  const handleFixIssue = (issueId) => {
    alert(`Issue #${issueId} was detected from live data. Fix the underlying cause and rescan.`);
  };

  const handleImplementRecommendation = (recId) => {
    alert(`Recommendation #${recId} logged.`);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('analyzingWebsitePerformance')}</p>
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
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('overview')}
          </button>
          <button
            onClick={() => setActiveTab('issues')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'issues'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('issues')} ({performanceData.issues.length})
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'recommendations'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('recommendations')}
          </button>
          <button
            onClick={() => setActiveTab('trends')}
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'trends'
                ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            {t('trends')}
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">{t('performanceOverview')}</h3>
              <div className="text-sm text-gray-500">
                {t('lastScan')}: {performanceData.overview.lastScan}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t('performanceScore')}</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{performanceData.overview.score}/100</div>
              </div>
              <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">SEO</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{performanceData.overview.seo}/100</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Accessibility</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{performanceData.overview.accessibility}/100</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">Order health</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{performanceData.overview.interactivity}/100</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t('aiInsights')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                This score is computed from live store data: stock levels, missing images/descriptions,
                cancelled orders and pending orders.
              </p>
              <button
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                onClick={() => setActiveTab('recommendations')}
              >
                {t('viewRecommendations')}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'issues' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('detectedIssues')}</h3>
            <div className="space-y-4">
              {performanceData.issues.map((issue) => (
                <div key={issue.id} className="border rounded-lg overflow-hidden">
                  <div className={`px-4 py-2 ${
                    issue.severity === 'high' ? 'bg-red-50 dark:bg-red-900/30' :
                    issue.severity === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/30' : 'bg-blue-50 dark:bg-blue-900/30'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          issue.severity === 'high' ? 'bg-red-500' : issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></span>
                        <span className="font-medium">{issue.page} - {issue.impact}</span>
                      </div>
                      <span className="text-xs uppercase font-semibold px-2 py-1 rounded bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                        {issue.severity}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="mb-2">{issue.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">{t('recommendation')}:</span> {issue.recommendation}
                      </div>
                      <button
                        onClick={() => handleFixIssue(issue.id)}
                        className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        {t('fix')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('aiRecommendations')}</h3>
            <div className="space-y-4">
              {performanceData.recommendations.map((rec) => (
                <div key={rec.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`inline-block px-2 py-1 text-xs rounded ${
                        rec.category === 'Performance' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                        rec.category === 'SEO' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                        rec.category === 'Accessibility' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300' :
                        'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'
                      }`}>
                        {rec.category}
                      </span>
                      <span className={`ml-2 inline-block px-2 py-1 text-xs rounded ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">+{rec.estimatedImprovement}</div>
                  </div>
                  <p className="mb-3">{rec.description}</p>
                  <button
                    onClick={() => handleImplementRecommendation(rec.id)}
                    className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    {t('implement')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'trends' && (
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('performanceTrends')}</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Orders — last 5 days</h4>
                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end">
                  {performanceData.trends.orders.map((d, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">{d.orders}</span>
                      <div
                        className="w-full bg-blue-500 mx-1 rounded-t-sm"
                        style={{ height: `${(d.orders / Math.max(1, ...performanceData.trends.orders.map((x) => x.orders))) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{performanceData.trends.orders[0]?.date}</span>
                  <span>{performanceData.trends.orders[performanceData.trends.orders.length - 1]?.date}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Revenue (SAR) — last 5 days</h4>
                <div className="h-24 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end">
                  {performanceData.trends.revenue.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <span className="text-xs text-gray-500 mb-1">{value}</span>
                      <div
                        className="w-full bg-green-500 mx-1 rounded-t-sm"
                        style={{ height: `${(value / Math.max(1, ...performanceData.trends.revenue)) * 100}%` }}
                      ></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>{performanceData.trends.orders[0]?.date}</span>
                  <span>{performanceData.trends.orders[performanceData.trends.orders.length - 1]?.date}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPerformanceMonitor;
