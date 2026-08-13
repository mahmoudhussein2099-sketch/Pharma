import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const TestimonialsSection = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: '/images/testimonials/person1.jpg',
      rating: 5,
      text: 'Awon Pharmacy has been my go-to for all health needs. Their online ordering system is so convenient, and the delivery is always prompt. The pharmacists are knowledgeable and take time to answer all my questions.',
      date: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Mohammed Al-Farsi',
      role: 'Parent',
      image: '/images/testimonials/person2.jpg',
      rating: 5,
      text: 'As a parent of young children, I appreciate the wide range of baby care products available at Awon Pharmacy. The quality is excellent, and the prices are reasonable. Their baby care specialists have given me valuable advice.',
      date: '1 month ago'
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Healthcare Professional',
      image: '/images/testimonials/person3.jpg',
      rating: 4,
      text: 'I recommend Awon Pharmacy to all my patients. Their prescription service is efficient, and they always have medications in stock. The staff is professional and friendly, making the experience pleasant for everyone.',
      date: '3 weeks ago'
    },
    {
      id: 4,
      name: 'Ahmed Hassan',
      role: 'Elderly Customer',
      image: '/images/testimonials/person4.jpg',
      rating: 5,
      text: 'The medication reminder service has been a lifesaver for me. I never forget to take my pills now, and the home delivery option saves me from having to go out. The staff is always patient and helpful with my questions.',
      date: '2 months ago'
    },
    {
      id: 5,
      name: 'Lisa Rodriguez',
      role: 'Fitness Enthusiast',
      image: '/images/testimonials/person5.jpg',
      rating: 5,
      text: 'I rely on Awon Pharmacy for all my supplements and vitamins. Their selection is impressive, and the staff is knowledgeable about fitness nutrition. The loyalty program gives great discounts too!',
      date: '1 week ago'
    }
  ];

  // Handle carousel navigation
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-teal-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('customerTestimonials', 'Customer Testimonials')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('customerTestimonialsSubtitle', 'See what our customers have to say about their experience')}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Current Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            {/* Quote Icon */}
            <div className="absolute -top-6 -left-6 bg-teal-500 rounded-full w-12 h-12 flex items-center justify-center text-white">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            {/* Testimonial Content */}
            <div className="mb-6 pt-6">
              <p className="text-gray-600 dark:text-gray-300 text-lg italic">
                "{testimonials[activeIndex].text}"
              </p>
            </div>
            
            {/* Rating Stars */}
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-5 h-5 ${i < testimonials[activeIndex].rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            
            {/* Customer Info */}
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-full mr-4 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xl">
                {testimonials[activeIndex].name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">{testimonials[activeIndex].name}</h4>
                <div className="flex items-center">
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[activeIndex].role}</span>
                  <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{testimonials[activeIndex].date}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full transition-colors ${
                index === activeIndex ? 'bg-teal-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;