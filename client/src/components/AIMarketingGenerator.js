import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { adminApi } from '../services/adminApi';

const AIMarketingGenerator = () => {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [liveData, setLiveData] = useState(null);
  const [error, setError] = useState('');
  const [marketingType, setMarketingType] = useState('social');
  const [targetAudience, setTargetAudience] = useState('general');
  const [product, setProduct] = useState('');
  const [prompt, setPrompt] = useState('');

  const loadLive = useCallback(async () => {
    try {
      const data = await adminApi('/admin/ai/marketing');
      setLiveData(data);
    } catch {}
  }, []);

  useEffect(() => {
    loadLive();
  }, [loadLive]);

  const handleGenerate = async () => {
    setGenerating(true);
    setError('');
    try {
      const data = liveData || (await adminApi('/admin/ai/marketing'));
      if (marketingType === 'social') {
        setGeneratedContent({ list: data.social || [] });
      } else {
        setGeneratedContent({ email: data.email });
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">{t('aiMarketingGenerator')}</h3>

      {liveData?.stats && (
        <div className="mb-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Discounted products</p>
            <p className="text-lg font-bold text-blue-700">{liveData.stats.discountedProducts}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Top category</p>
            <p className="text-lg font-bold text-green-700 capitalize">{liveData.stats.topCategory}</p>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Coupons</p>
            <p className="text-lg font-bold text-purple-700">{liveData.stats.coupons.length}</p>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Subscribers</p>
            <p className="text-lg font-bold text-orange-700">{liveData.stats.newsletterCount}</p>
          </div>
          <div className="bg-teal-50 p-3 rounded-lg">
            <p className="text-xs text-gray-500">Orders (30d)</p>
            <p className="text-lg font-bold text-teal-700">{liveData.stats.recentOrders}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('marketingType')}</label>
          <select
            value={marketingType}
            onChange={(e) => setMarketingType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="social">{t('socialMediaPost')}</option>
            <option value="email">{t('emailCampaign')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('targetAudience')}</label>
          <select
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="general">{t('generalAudience')}</option>
            <option value="parents">{t('parentsAndFamilies')}</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          disabled={generating}
          className={`px-6 py-3 rounded-lg ${generating ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium`}
        >
          {generating ? t('generating') : t('generateMarketingContent')}
        </button>
      </div>

      {error && <div className="mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      {generatedContent && (
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">{t('generatedContent')}</h4>

          {marketingType === 'social' ? (
            <div className="space-y-6">
              {(generatedContent.list || []).map((post, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium">{post.title}</h5>
                    <button
                      onClick={() => handleCopy(post.content)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      {t('copy')}
                    </button>
                  </div>
                  <p className="whitespace-pre-line mb-2">{post.content}</p>
                  {post.product ? (
                    <div className="bg-gray-100 p-2 rounded text-sm text-gray-500">
                      Featured product: {post.product.name} — SAR {post.product.price} ({post.product.discount}% off)
                    </div>
                  ) : (
                    <div className="bg-gray-100 p-2 rounded text-sm text-gray-500">
                      {t('suggestedImage')}: {post.image}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">{generatedContent.email.subject}</h5>
                <button
                  onClick={() => handleCopy(`Subject: ${generatedContent.email.subject}\n\n${generatedContent.email.body}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {t('copy')}
                </button>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">{t('subject')}:</span> {generatedContent.email.subject}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 mb-1">{t('body')}:</span>
                <p className="whitespace-pre-line border p-3 rounded bg-gray-50">{generatedContent.email.body}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIMarketingGenerator;
