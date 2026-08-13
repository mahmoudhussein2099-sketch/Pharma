import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const AIPerformanceMonitor = () => {
  const { t } = useTranslation();
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Simulate loading performance data
    setTimeout(() => {
      setPerformanceData({
        overview: {
          score: 87,
          loadTime: '1.2s',
          interactivity: 92,
          accessibility: 85,
          seo: 90,
          lastScan: new Date().toLocaleString()
        },
        issues: [
          { id: 1, severity: 'high', description: 'Large images on homepage slowing load time', page: 'Home', impact: 'Performance', recommendation: 'Optimize images to reduce file size' },
          { id: 2, severity: 'medium', description: 'Missing alt text on product images', page: 'Products', impact: 'Accessibility', recommendation: 'Add descriptive alt text to all product images' },
          { id: 3, severity: 'low', description: 'Console errors in checkout flow', page: 'Checkout', impact: 'User Experience', recommendation: 'Fix JavaScript errors in checkout process' }
        ],
        recommendations: [
          { id: 1, category: 'Performance', description: 'Implement lazy loading for images', priority: 'high', estimatedImprovement: '15%' },
          { id: 2, category: 'SEO', description: 'Add structured data for products', priority: 'medium', estimatedImprovement: '10%' },
          { id: 3, category: 'Accessibility', description: 'Improve keyboard navigation', priority: 'medium', estimatedImprovement: '8%' },
          { id: 4, category: 'UX', description: 'Simplify checkout process', priority: 'high', estimatedImprovement: '20%' }
        ],
        trends: {
          loadTime: [1.8, 1.6, 1.5, 1.3, 1.2],
          userSatisfaction: [82, 85, 84, 88, 90],
          conversionRate: [2.1, 2.3, 2.4, 2.6, 2.8]
        }
      });
      setLoading(false);
    }, 1500);
  }, []);

  const handleFixIssue = (issueId) => {
    // In a real app, this would trigger an automated fix or create a task
    alert(`Fixing issue #${issueId}. This would trigger an automated fix in a real application.`);
  };

  const handleImplementRecommendation = (recId) => {
    // In a real app, this would implement the recommendation or create a task
    alert(`Implementing recommendation #${recId}. This would apply changes in a real application.`);
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
                <div className="text-sm text-gray-500 dark:text-gray-400">{t('loadTime')}</div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{performanceData.overview.loadTime}</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t('accessibility')}</div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{performanceData.overview.accessibility}/100</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <div className="text-sm text-gray-500 dark:text-gray-400">{t('seo')}</div>
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{performanceData.overview.seo}/100</div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2">{t('aiInsights')}</h4>
              <p className="text-gray-600 dark:text-gray-300">
                {t('aiPerformanceInsight')}
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
                    issue.severity === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/30' :
                    'bg-blue-50 dark:bg-blue-900/30'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                          issue.severity === 'high' ? 'bg-red-500' :
                          issue.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-blue-500'
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
                        rec.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                      }`}>
                        {rec.priority}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                      +{rec.estimatedImprovement}
                    </div>
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
                <h4 className="font-medium mb-2">{t('loadTime')} ({t('last5Days')})</h4>
                <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end">
                  {performanceData.trends.loadTime.map((value, index) => (
                    <div 
                      key={index}
                      className="flex-1 bg-blue-500 mx-1 rounded-t-sm"
                      style={{ height: `${(value / 2) * 100}%` }}
                      title={`${value}s`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>5 {t('daysAgo')}</span>
                  <span>{t('today')}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">{t('userSatisfaction')} ({t('last5Days')})</h4>
                <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end">
                  {performanceData.trends.userSatisfaction.map((value, index) => (
                    <div 
                      key={index}
                      className="flex-1 bg-green-500 mx-1 rounded-t-sm"
                      style={{ height: `${value}%` }}
                      title={`${value}%`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>5 {t('daysAgo')}</span>
                  <span>{t('today')}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">{t('conversionRate')} ({t('last5Days')})</h4>
                <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-end">
                  {performanceData.trends.conversionRate.map((value, index) => (
                    <div 
                      key={index}
                      className="flex-1 bg-purple-500 mx-1 rounded-t-sm"
                      style={{ height: `${value * 30}%` }}
                      title={`${value}%`}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>5 {t('daysAgo')}</span>
                  <span>{t('today')}</span>
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