import React from 'react';

const BrandShowcase = () => {
  const brands = [
    { name: 'Panadol', logo: 'https://via.placeholder.com/120x60/0066CC/FFFFFF?text=Panadol' },
    { name: 'Centrum', logo: 'https://via.placeholder.com/120x60/FF6600/FFFFFF?text=Centrum' },
    { name: 'Johnson\'s', logo: 'https://via.placeholder.com/120x60/FFD700/000000?text=Johnson%27s' },
    { name: 'Neutrogena', logo: 'https://via.placeholder.com/120x60/FF69B4/FFFFFF?text=Neutrogena' },
    { name: 'Pampers', logo: 'https://via.placeholder.com/120x60/00CED1/FFFFFF?text=Pampers' },
    { name: 'Oral-B', logo: 'https://via.placeholder.com/120x60/4169E1/FFFFFF?text=Oral-B' },
    { name: 'Nivea', logo: 'https://via.placeholder.com/120x60/000080/FFFFFF?text=Nivea' },
    { name: 'Dove', logo: 'https://via.placeholder.com/120x60/87CEEB/000000?text=Dove' },
    { name: 'Colgate', logo: 'https://via.placeholder.com/120x60/DC143C/FFFFFF?text=Colgate' },
    { name: 'L\'Oreal', logo: 'https://via.placeholder.com/120x60/000000/FFFFFF?text=L%27Oreal' },
    { name: 'Garnier', logo: 'https://via.placeholder.com/120x60/228B22/FFFFFF?text=Garnier' },
    { name: 'Berocca', logo: 'https://via.placeholder.com/120x60/FF4500/FFFFFF?text=Berocca' }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Popular Brands
        </h2>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-8 pb-4" style={{ width: 'max-content' }}>
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="flex-shrink-0 bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;