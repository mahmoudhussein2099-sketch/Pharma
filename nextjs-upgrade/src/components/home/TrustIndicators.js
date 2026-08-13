import React from 'react';

const TrustIndicators = () => {
  const indicators = [
    {
      icon: '🏆',
      title: 'Licensed Pharmacy',
      description: 'Fully licensed and regulated by health authorities'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Same-day delivery available in major cities'
    },
    {
      icon: '💊',
      title: 'Genuine Products',
      description: 'All products sourced directly from manufacturers'
    },
    {
      icon: '👨‍⚕️',
      title: 'Expert Pharmacists',
      description: 'Qualified pharmacists available for consultation'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your health information is protected and confidential'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with regular discounts and offers'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Why Choose Awon Pharmacy?
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Your trusted healthcare partner with uncompromising quality and service
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {indicators.map((indicator, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{indicator.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {indicator.title}
              </h3>
              <p className="text-gray-600">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;