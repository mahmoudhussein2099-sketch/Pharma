import React from 'react';

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: 'Online Consultation',
      description: 'Consult with certified pharmacists and doctors online',
      image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop',
      icon: '👨‍⚕️'
    },
    {
      id: 2,
      name: 'Prescription Delivery',
      description: 'Fast and secure delivery of your prescriptions',
      image: 'https://images.unsplash.com/photo-1622037022824-0c71d511ef3c?w=400&h=300&fit=crop',
      icon: '🚚'
    },
    {
      id: 3,
      name: 'Health Checkups',
      description: 'Regular health monitoring and checkup services',
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop',
      icon: '🩺'
    },
    {
      id: 4,
      name: 'Medication Reminders',
      description: 'Never miss your medication with smart reminders',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
      icon: '⏰'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Our Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(service => (
            <div 
              key={service.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                  {service.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;