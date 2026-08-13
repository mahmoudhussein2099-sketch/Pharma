import React, { useState } from 'react';

const FeaturedCollections = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'medications', 'wellness', 'beauty', 'baby'];

  const collections = [
    {
      id: 1,
      name: 'Pain Relief Collection',
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop',
      category: 'medications',
      itemCount: 24
    },
    {
      id: 2,
      name: 'Immunity Boosters',
      image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop',
      category: 'wellness',
      itemCount: 18
    },
    {
      id: 3,
      name: 'Baby Essentials',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
      category: 'baby',
      itemCount: 32
    },
    {
      id: 4,
      name: 'Beauty & Skincare',
      image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400&h=300&fit=crop',
      category: 'beauty',
      itemCount: 28
    },
    {
      id: 5,
      name: 'Chronic Care',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop',
      category: 'medications',
      itemCount: 15
    },
    {
      id: 6,
      name: 'Wellness Products',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
      category: 'wellness',
      itemCount: 22
    }
  ];

  const filteredCollections = activeFilter === 'all' 
    ? collections 
    : collections.filter(collection => collection.category === activeFilter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Featured Collections
        </h2>
        
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-md">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-600 hover:text-teal-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCollections.map(collection => (
            <div 
              key={collection.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group"
            >
              <div className="relative">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.itemCount} items</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;