import React from 'react';

const BottomProductsSection = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-6 text-sm text-gray-700">
          <div>
            <h3 className="font-semibold mb-2">Fragrances</h3>
            <ul>
              <li>For Her</li>
              <li>For Him</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Makeup</h3>
            <ul>
              <li>Lipstick</li>
              <li>Makeup Tools</li>
              <li>Earrings</li>
              <li>Beauty Accessories</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Baby Care & Diapers</h3>
            <ul>
              <li>Regular Diapers</li>
              <li>Baby Wipes</li>
              <li>Baby Grooming</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Vitamins</h3>
            <ul>
              <li>Hair Vitamins</li>
              <li>Kids Vitamins</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Skin Care</h3>
            <ul>
              <li>Moisturizers</li>
              <li>Face Masks</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Baby Accessories</h3>
            <ul>
              <li>Strollers</li>
              <li>Pacifiers</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="mb-4 md:mb-0">
            &copy; 2025 Awon Pharmacy. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <img src="/images/payment/visa.png" alt="Visa" className="h-6" />
            <img src="/images/payment/mastercard.png" alt="Mastercard" className="h-6" />
            <img src="/images/payment/amex.png" alt="American Express" className="h-6" />
            <img src="/images/payment/cash.png" alt="Cash" className="h-6" />
            {/* Add other payment method icons as needed */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default BottomProductsSection;
