import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LiveBanner = () => {
  const { t } = useTranslation();
  
  // Banner data
  const bannerData = {
    title: 'Summer Health Essentials',
    subtitle: 'Stay protected and healthy this summer with our essential products',
    discount: 25,
    endDate: '2024-08-31',
    buttonText: 'Shop Now',
    buttonLink: '/products?campaign=summer',
    fallbackImage: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
  };

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Static Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={bannerData.fallbackImage}
          alt="Banner Background"
          className="w-full h-full object-cover"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/80"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {bannerData.title}
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              {bannerData.subtitle}
            </p>
            
            {/* Discount Badge */}
            <div className="inline-block bg-yellow-500 text-yellow-900 text-3xl font-bold px-6 py-3 rounded-full mb-8 transform rotate-3 shadow-lg">
              {bannerData.discount}% OFF
            </div>
            
            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-white/80 mb-3">{t('offerEndsIn', 'Offer ends in')}:</p>
              <div className="flex space-x-4">
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-center">
                  <span className="block text-3xl font-bold">30</span>
                  <span className="text-xs text-white/70">{t('days', 'Days')}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-center">
                  <span className="block text-3xl font-bold">12</span>
                  <span className="text-xs text-white/70">{t('hours', 'Hours')}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-center">
                  <span className="block text-3xl font-bold">45</span>
                  <span className="text-xs text-white/70">{t('minutes', 'Minutes')}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-lg px-4 py-3 text-center">
                  <span className="block text-3xl font-bold">20</span>
                  <span className="text-xs text-white/70">{t('seconds', 'Seconds')}</span>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <Link 
              to={bannerData.buttonLink} 
              className="inline-block bg-white text-teal-800 font-bold text-lg px-8 py-4 rounded-full hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {bannerData.buttonText}
            </Link>
          </div>
          
          {/* Product Showcase */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative">
              {/* Main Product */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Summer Health Bundle" 
                  className="w-full h-auto object-contain max-h-80 rounded-lg"
                />
              </div>
              
              {/* Floating Product 1 */}
              <div className="absolute -top-10 -left-10 bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1584308666994-53e3e1d3a0a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Sunscreen" 
                  className="w-24 h-24 object-contain rounded-full"
                />
              </div>
              
              {/* Floating Product 2 */}
              <div className="absolute -bottom-5 -right-5 bg-white/10 backdrop-blur-md rounded-full p-4 shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Vitamin C" 
                  className="w-20 h-20 object-contain rounded-full"
                />
              </div>
              
              {/* Floating Product 3 */}
              <div className="absolute top-1/2 -right-8 bg-white/10 backdrop-blur-md rounded-full p-3 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://images.unsplash.com/photo-1550989459-eedf9f6ceb78?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" 
                  alt="Hydration" 
                  className="w-16 h-16 object-contain rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveBanner;