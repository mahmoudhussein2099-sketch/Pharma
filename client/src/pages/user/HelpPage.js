import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Phone } from 'lucide-react';

const HelpPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('faq');

  const faqs = [
    {
      question: t('howToOrder', 'How do I place an order?'),
      answer: t('howToOrderAnswer', 'You can place an order by browsing our products and adding them to your cart.')
    },
    {
      question: t('deliveryTime', 'How long does delivery take?'),
      answer: t('deliveryTimeAnswer', 'Standard delivery takes 2-3 business days, express delivery takes 1 day.')
    },
    {
      question: t('returnPolicy', 'What is your return policy?'),
      answer: t('returnPolicyAnswer', 'We accept returns within 30 days of purchase for unopened items.')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-foreground">
          {t('help', 'Help Center')}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="rounded-xl shadow-lg p-6 h-fit bg-card">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('faq')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'faq' 
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {t('faq', 'FAQ')}
              </button>
              <button 
                onClick={() => setActiveTab('contact')}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'contact' 
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
              >
                {t('contactSupport', 'Contact Support')}
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'faq' && (
              <div className="rounded-xl shadow-lg p-8 bg-card">
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  {t('frequentlyAskedQuestions', 'Frequently Asked Questions')}
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-border rounded-lg p-4">
                      <h3 className="font-medium mb-2 text-foreground">
                        {faq.question}
                      </h3>
                      <p className="text-muted-foreground">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="rounded-xl shadow-lg p-8 bg-card">
                <h2 className="text-xl font-semibold mb-6 text-foreground">
                  {t('contactSupport', 'Contact Support')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center me-4">
                      <MessageCircle className="h-6 w-6 text-primary" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {t('liveChat', 'Live Chat')}
                      </h3>
                      <p className="text-muted-foreground">
                        {t('liveChatDesc', 'Chat with our support team')}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 border border-border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center me-4">
                      <Phone className="h-6 w-6 text-primary" strokeWidth={1.6} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {t('phoneSupport', 'Phone Support')}
                      </h3>
                      <p className="text-muted-foreground">
                        <a href="tel:+966172530257" className="hover:text-primary">+966 17 253 0257</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;