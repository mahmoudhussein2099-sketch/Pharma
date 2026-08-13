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
          className={`bg-card rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'performance' ? 'ring-2 ring-ring' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center me-4">
              <span className="text-primary text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold">{t('performanceAI')}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('performanceAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('sales')}
          className={`bg-card rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'sales' ? 'ring-2 ring-ring' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-success/15 rounded-full flex items-center justify-center me-4">
              <span className="text-success text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold">{t('salesAI')}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('salesAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('security')}
          className={`bg-card rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'security' ? 'ring-2 ring-ring' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-destructive/15 rounded-full flex items-center justify-center me-4">
              <span className="text-destructive text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold">{t('securityAI')}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('securityAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('marketing')}
          className={`bg-card rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'marketing' ? 'ring-2 ring-ring' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center me-4">
              <span className="text-purple-600 dark:text-purple-400 text-2xl">📣</span>
            </div>
            <h3 className="text-lg font-semibold">{t('marketingAI')}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('marketingAIDesc')}</p>
        </div>
        
        <div 
          onClick={() => setActiveTab('communication')}
          className={`bg-card rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow ${activeTab === 'communication' ? 'ring-2 ring-ring' : ''}`}
        >
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-warning/15 rounded-full flex items-center justify-center me-4">
              <span className="text-warning text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-semibold">{t('communicationAI')}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{t('communicationAIDesc')}</p>
        </div>
      </div>

      {/* Active AI Tool */}
      {activeTab === 'overview' && (
        <div className="bg-card rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-6">{t('aiToolsOverview')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h4 className="font-medium mb-4">{t('aiInsights')}</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-success me-2">✓</span>
                  <span>{t('aiInsight1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success me-2">✓</span>
                  <span>{t('aiInsight2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success me-2">✓</span>
                  <span>{t('aiInsight3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-success me-2">✓</span>
                  <span>{t('aiInsight4')}</span>
                </li>
              </ul>
            </div>
            <div className="border rounded-lg p-6">
              <h4 className="font-medium mb-4">{t('aiRecommendations')}</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary me-2">→</span>
                  <span>{t('aiRecommendation1')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary me-2">→</span>
                  <span>{t('aiRecommendation2')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary me-2">→</span>
                  <span>{t('aiRecommendation3')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary me-2">→</span>
                  <span>{t('aiRecommendation4')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-muted-foreground mb-4">{t('selectAiTool')}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setActiveTab('performance')} 
                className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                {t('performanceAI')}
              </button>
              <button 
                onClick={() => setActiveTab('sales')} 
                className="px-4 py-2 bg-success text-success-foreground rounded hover:bg-success/90"
              >
                {t('salesAI')}
              </button>
              <button 
                onClick={() => setActiveTab('security')} 
                className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
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
                className="px-4 py-2 bg-warning text-warning-foreground rounded hover:bg-warning/90"
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
        <div className="bg-card rounded-lg shadow-lg p-6">
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