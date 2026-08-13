import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AIMarketingGenerator = () => {
  const { t } = useTranslation();
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [marketingType, setMarketingType] = useState('social');
  const [targetAudience, setTargetAudience] = useState('general');
  const [product, setProduct] = useState('');
  const [prompt, setPrompt] = useState('');

  // Sample AI-generated marketing content
  const sampleContent = {
    social: {
      general: [
        {
          title: "Health Essentials Sale",
          content: "🌟 SPECIAL OFFER! 🌟\n\nStock up on health essentials at Awon Pharmacy! Enjoy 20% OFF on vitamins, supplements, and more. Visit us in-store or order online for fast delivery.\n\n#HealthEssentials #AwonPharmacy #SpecialOffer",
          image: "health_essentials.jpg"
        },
        {
          title: "Immune Support",
          content: "Boost your immunity with our premium range of supplements! 💪\n\nOur pharmacists recommend Vitamin C, Zinc, and Vitamin D for everyday immune support. Now available at special prices!\n\n#ImmuneHealth #StayHealthy #AwonPharmacy",
          image: "immune_support.jpg"
        }
      ],
      parents: [
        {
          title: "Baby Care Essentials",
          content: "Parents, we've got you covered! 👶\n\nOur baby care section is stocked with all essentials from trusted brands. Get 15% OFF on all baby products this week!\n\n#BabyCare #ParentingEssentials #AwonPharmacy",
          image: "baby_care.jpg"
        },
        {
          title: "Kids Health",
          content: "Your child's health is our priority! 🧒\n\nDiscover our range of children's vitamins, gentle medications, and health supplements specially formulated for growing bodies.\n\n#KidsHealth #ChildrenWellness #AwonPharmacy",
          image: "kids_health.jpg"
        }
      ]
    },
    email: {
      general: {
        subject: "Special Health Offers Just For You | Awon Pharmacy",
        body: `Dear Valued Customer,

We hope this email finds you well. At Awon Pharmacy, we're committed to your health and wellbeing.

This week's special offers:
• 20% OFF all vitamins and supplements
• Buy 1 Get 1 Free on selected skincare products
• Free health consultation with purchases over SAR 200

Visit us in-store or shop online for fast delivery.

Stay healthy,
The Awon Pharmacy Team`
      },
      parents: {
        subject: "Baby & Child Care Specials | Awon Pharmacy",
        body: `Dear Parent,

We understand that your child's health is your top priority, and it's ours too.

This week's family specials:
• 15% OFF all baby care products
• Special prices on children's vitamins
• Free baby care guide with purchases over SAR 150

Our pharmacists are always available to answer any questions about your child's health needs.

Wishing your family good health,
The Awon Pharmacy Team`
      }
    }
  };

  const handleGenerate = () => {
    setGenerating(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      if (marketingType === 'social') {
        setGeneratedContent(sampleContent.social[targetAudience]);
      } else {
        setGeneratedContent(sampleContent.email[targetAudience]);
      }
      setGenerating(false);
    }, 1500);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-6">{t('aiMarketingGenerator')}</h3>
      
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
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('product')} ({t('optional')})</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder={t('enterProductName')}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">{t('additionalPrompt')} ({t('optional')})</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={t('enterAdditionalDetails')}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
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
      
      {generatedContent && (
        <div className="border-t pt-6">
          <h4 className="font-medium mb-4">{t('generatedContent')}</h4>
          
          {marketingType === 'social' ? (
            <div className="space-y-6">
              {generatedContent.map((post, index) => (
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
                  <div className="bg-gray-100 p-2 rounded text-sm text-gray-500">
                    {t('suggestedImage')}: {post.image}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h5 className="font-medium">{generatedContent.subject}</h5>
                <button
                  onClick={() => handleCopy(`Subject: ${generatedContent.subject}\n\n${generatedContent.body}`)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {t('copy')}
                </button>
              </div>
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">{t('subject')}:</span> {generatedContent.subject}
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700 mb-1">{t('body')}:</span>
                <p className="whitespace-pre-line border p-3 rounded bg-gray-50">{generatedContent.body}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIMarketingGenerator;