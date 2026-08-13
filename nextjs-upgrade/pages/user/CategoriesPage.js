import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import UserSidebar from '../../components/dashboard/UserSidebar';

const CategoriesPage = () => {
  const { t } = useTranslation();

  const mainCategories = [
    {
      id: 'prescription',
      name: 'Prescription Medicines',
      description: 'Doctor-prescribed medications for various health conditions',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
      color: 'bg-blue-500',
      itemCount: 180
    },
    {
      id: 'otc',
      name: 'Over-the-Counter',
      description: 'Non-prescription medicines for common health issues',
      image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?w=400&h=300&fit=crop',
      color: 'bg-green-500',
      itemCount: 120
    },
    {
      id: 'vitamins',
      name: 'Vitamins & Supplements',
      description: 'Essential vitamins and nutritional supplements',
      image: 'https://images.unsplash.com/photo-1577460551100-907ba84418ce?w=400&h=300&fit=crop',
      color: 'bg-orange-500',
      itemCount: 150
    },
    {
      id: 'baby',
      name: 'Baby & Mother Care',
      description: 'Products for babies, mothers, and maternity care',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop',
      color: 'bg-pink-500',
      itemCount: 95
    },
    {
      id: 'beauty',
      name: 'Beauty & Personal Care',
      description: 'Skincare, haircare, and personal hygiene products',
      image: 'https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=400&h=300&fit=crop',
      color: 'bg-purple-500',
      itemCount: 200
    },
    {
      id: 'medical',
      name: 'Medical Devices',
      description: 'Healthcare devices and monitoring equipment',
      image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=300&fit=crop',
      color: 'bg-teal-500',
      itemCount: 45
    },
    {
      id: 'firstaid',
      name: 'First Aid & Safety',
      description: 'Emergency care and safety equipment',
      image: 'https://images.unsplash.com/photo-1603398938795-b6d0b6b1b1b1?w=400&h=300&fit=crop',
      color: 'bg-red-500',
      itemCount: 80
    },
    {
      id: 'eye',
      name: 'Eye & Vision Care',
      description: 'Contact lenses, eye drops, and vision care products',
      image: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=300&fit=crop',
      color: 'bg-indigo-500',
      itemCount: 65
    }
  ];

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Categories</h1>
            <p className="text-gray-600">Browse our complete range of healthcare products</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainCategories.map(category => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <div className={`w-4 h-4 rounded-full ${category.color}`}></div>
                  </div>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm font-medium text-gray-700">
                    {category.itemCount}+ items
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-medium">
                    <span>Browse Products</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;