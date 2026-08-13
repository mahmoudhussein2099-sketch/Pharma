import React from 'react';
import SpecialMessageCard from './SpecialMessageCard';

const messages = [
  "Enjoy exclusive offers and new arrivals! Stay healthy and save more with Awon Alqhtany Pharmacy.",
  "Check out our latest digital health tools and services designed for your convenience.",
  "Subscribe to our newsletter for personalized health tips and special discounts.",
  "Explore our new 3D virtual pharmacy tour from the comfort of your home.",
];

const SpecialMessageCardCarousel = ({ theme = 'light' }) => {
  return (
    <div className="overflow-x-auto py-4 px-2">
      <div className="flex space-x-6 max-w-full">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-80 transform transition-transform hover:scale-105 hover:shadow-2xl rounded-lg"
            style={{
              perspective: '1000px',
            }}
          >
            <SpecialMessageCard theme={theme}>
              <h3 className="text-2xl font-bold mb-2">Special Announcement</h3>
              <p className="text-lg">{msg}</p>
            </SpecialMessageCard>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialMessageCardCarousel;
