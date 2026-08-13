import React, { useState } from 'react';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    'Panadol', 'Vitamin C', 'Face Mask', 'Baby Formula', 'Blood Pressure Monitor'
  ];

  return (
    <div className="bg-white shadow-lg -mt-8 relative z-10 mx-4 rounded-lg">
      <div className="container mx-auto px-6 py-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for medicines, health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;