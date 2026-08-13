import React from 'react';
import { Link } from 'react-router-dom';

const CategoryGrid = () => {
  const categories = [
    {
      id: 'medications',
      name: 'Medications & Supplements',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=200&fit=crop'
    },
    {
      id: 'personal-care',
      name: 'Personal Care & Beauty',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=300&h=200&fit=crop'
    },
    {
      id: 'baby-care',
      name: 'Baby & Mother Care',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop'
    },
    {
      id: 'medical-devices',
      name: 'Medical Devices',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=300&h=200&fit=crop'
    },
    {
      id: 'health-wellness',
      name: 'Health & Wellness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    },
    {
      id: 'vitamins',
      name: 'Vitamins & Nutrition',
      image: 'https://images.unsplash.com/photo-1577460551100-907ba84418ce?w=300&h=200&fit=crop'
    },
    {
      id: 'skincare',
      name: 'Skincare & Cosmetics',
      image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=300&h=200&fit=crop'
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/categories/${category.id}`}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-center group-hover:text-teal-600 transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;