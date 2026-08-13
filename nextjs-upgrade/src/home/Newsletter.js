import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 bg-teal-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Health Tips & Offers
          </h2>
          <p className="text-teal-100 mb-8 text-lg">
            Subscribe to our newsletter and get exclusive discounts, health tips, and product updates
          </p>
          
          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </form>
          ) : (
            <div className="bg-white bg-opacity-20 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-4xl mb-2">✅</div>
              <p className="text-white font-semibold">Thank you for subscribing!</p>
              <p className="text-teal-100 text-sm">You'll receive our latest updates and offers.</p>
            </div>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-teal-100 text-sm">
            <div className="flex items-center">
              <span className="mr-2">🎁</span>
              Exclusive Offers
            </div>
            <div className="flex items-center">
              <span className="mr-2">💊</span>
              Health Tips
            </div>
            <div className="flex items-center">
              <span className="mr-2">📱</span>
              New Products
            </div>
            <div className="flex items-center">
              <span className="mr-2">🚚</span>
              Delivery Updates
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;