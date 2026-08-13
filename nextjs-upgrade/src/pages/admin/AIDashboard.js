import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AIPerformanceMonitor from '../../components/AIPerformanceMonitor';
import AISalesMonitor from '../../components/AISalesMonitor';
import AISecurityScanner from '../../components/AISecurityScanner';
import AIMarketingGenerator from '../../components/AIMarketingGenerator';
import AIResponseGenerator from '../../components/AIResponseGenerator';

const AIDashboard = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{t('aiDashboard')}</h2>
      </div>

      {/* AI Tools Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div 
          onClick={() => setActiveTab('performance')}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'performance' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mr-4">
              <span className="text-blue-600 dark:text-blue-400 text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold">{t('performanceAI')}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('performanceAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('sales')}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'sales' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mr-4">
              <span className="text-green-600 dark:text-green-400 text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold">{t('salesAI')}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('salesAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('security')}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'security' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mr-4">
              <span className="text-red-600 dark:text-red-400 text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold">{t('securityAI')}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('securityAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('marketing')}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'marketing' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-4">
              <span className="text-purple-600 dark:text-purple-400 text-2xl">📣</span>
            </div>
            <h3 className="text-lg font-semibold">{t('marketingAI')}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('marketingAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('communication')}
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'communication' ? 'ring-2 ring-blue-500' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/50 rounded-full flex items-center justify-center mr-4">
              <span className="text-yellow-600 dark:text-yellow-400 text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold">{t('communicationAI')}</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t('communicationAIDesc')}</p>
        </div>
      </div>

      {/* Active AI Tool */}
      {activeTab === 'overview' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">{t('aiToolsOverview')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h4 className="font-medium mb-4">{t('aiInsights')}</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('aiInsight1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('aiInsight2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('aiInsight3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  <span>{t('aiInsight4')}</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h4 className="font-medium mb-4">{t('aiRecommendations')}</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>{t('aiRecommendation1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>{t('aiRecommendation2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>{t('aiRecommendation3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">→</span>
                  <span>{t('aiRecommendation4')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">{t('selectAiTool')}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTab('performance')} 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {t('performanceAI')}
              </button>
              <button 
                onClick={() => setActiveTab('sales')} 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {t('salesAI')}
              </button>
              <button 
                onClick={() => setActiveTab('security')} 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t('securityAI')}
              </button>
              <button 
                onClick={() => setActiveTab('marketing')} 
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {t('marketingAI')}
              </button>
              <button 
                onClick={() => setActiveTab('communication')} 
                className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
              >
                {t('communicationAI')}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && <AIPerformanceMonitor />}
      {activeTab === 'sales' && <AISalesMonitor />}
      {activeTab === 'security' && <AISecurityScanner />}
      {activeTab === 'marketing' && <AIMarketingGenerator />}
      {activeTab === 'communication' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">{t('communicationAI')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-4">{t('customerInquiries')}</h4>
              <AIResponseGenerator 
                onSelectResponse={(response) => console.log('Selected response:', response)} 
                messageType="inquiry" 
              />
            </div>
            <div>
              <h4 className="font-medium mb-4">{t('orderResponses')}</h4>
              <AIResponseGenerator 
                onSelectResponse={(response) => console.log('Selected response:', response)} 
                messageType="order" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDashboard;