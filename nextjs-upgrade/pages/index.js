import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from '../src/components/Link';
import Header from '../src/components/layout/Header';
import Footer from '../src/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Awon Pharmacy - Your Health, Our Priority</title>
        <meta name="description" content="Quality medications and healthcare products delivered to your doorstep with professional care" />
        <meta property="og:title" content="Awon Pharmacy" />
        <meta property="og:description" content="Your trusted healthcare partner" />
        <meta property="og:image" content="/awon-pharmacy.webp" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[600px] overflow-hidden">
            {/* Enhanced Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/awon-pharmacy.webp" 
                alt="Awon Pharmacy"
                className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-all duration-[3000ms] ease-out"
                style={{
                  filter: 'brightness(1.2) contrast(1.4) saturate(1.3) hue-rotate(10deg) blur(0.5px)',
                  backgroundBlendMode: 'overlay',
                  imageRendering: 'crisp-edges'
                }}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&h=600&fit=crop';
                }}
              />
              
              {/* Futuristic 2025 Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/70 via-teal-800/40 to-blue-900/60"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-purple-900/30"></div>
              
              {/* Modern Holographic Effects */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-emerald-400/15 to-cyan-400/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
              
              {/* Futuristic Grid Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* Neon Glow Effects */}
              <div className="absolute top-10 right-10 w-2 h-20 bg-cyan-400 blur-sm animate-pulse opacity-60"></div>
              <div className="absolute bottom-20 left-20 w-20 h-2 bg-teal-400 blur-sm animate-pulse opacity-60" style={{animationDelay: '1.5s'}}></div>
            </div>
            
            <div className="relative container mx-auto px-4 h-full flex items-center z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                <div className="text-white">
                  {/* Enhanced Typography */}
                  <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    <span className="block text-white drop-shadow-2xl">Your Health,</span>
                    <span className="block bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                      Our Priority
                    </span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-100 drop-shadow-lg leading-relaxed max-w-lg">
                    Quality medications and healthcare products delivered to your doorstep with professional care
                  </p>
                  
                  {/* Enhanced Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link 
                      href="/products"
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-cyan-400/50"
                    >
                      <span className="relative z-10">Shop Now</span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                    </Link>
                    <Link 
                      href="/prescriptions"
                      className="group relative px-8 py-4 border-2 border-cyan-400/80 text-white rounded-xl font-semibold hover:bg-cyan-400/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/10"
                    >
                      <span className="relative z-10">Upload Prescription</span>
                    </Link>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="mt-8 flex items-center space-x-6 text-sm text-gray-200">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      Licensed Pharmacy
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      24/7 Service
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-2 shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>
                      Fast Delivery
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Right Side Content */}
                <div className="hidden lg:flex justify-center items-center">
                  <div className="relative">
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-full backdrop-blur-sm animate-bounce border border-cyan-400/50" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full backdrop-blur-sm animate-bounce border border-blue-400/50" style={{animationDelay: '1.5s'}}></div>
                    
                    {/* Main Content Card */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-cyan-400/30 shadow-2xl">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">🏥</div>
                        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">Awon Pharmacy</h3>
                        <p className="text-gray-200 mb-4">Your Trusted Healthcare Partner</p>
                        <div className="flex justify-center space-x-4 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-lg text-cyan-400">1000+</div>
                            <div className="text-gray-300">Products</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg text-teal-400">24/7</div>
                            <div className="text-gray-300">Service</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg text-blue-400">MOH</div>
                            <div className="text-gray-300">Licensed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom Fade Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
          </section>

          {/* Featured Products Section */}
          <section className="py-20 bg-gradient-to-b from-white to-teal-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Discover our selection of high-quality medications and healthcare products</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Product Cards would go here */}
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="h-48 bg-gray-200 relative">
                      <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        20% OFF
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">Product Name</h3>
                      <p className="text-gray-600 text-sm mb-2">Brief description of the product</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">$19.99</span>
                        <button className="bg-teal-500 text-white px-3 py-1 rounded-lg text-sm">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link href="/products" className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  View All Products
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Comprehensive healthcare services to meet all your needs</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Prescription Delivery</h3>
                  <p className="text-white/80 mb-4">Get your medications delivered directly to your doorstep</p>
                  <Link href="/services/delivery" className="inline-flex items-center text-sm font-medium">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Health Consultations</h3>
                  <p className="text-white/80 mb-4">Speak with our licensed pharmacists for expert health advice</p>
                  <Link href="/services/consultations" className="inline-flex items-center text-sm font-medium">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl p-6 text-white shadow-lg">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Medication Reminders</h3>
                  <p className="text-white/80 mb-4">Never miss a dose with our automated reminder service</p>
                  <Link href="/services/reminders" className="inline-flex items-center text-sm font-medium">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-16 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to experience better healthcare?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who trust Awon Pharmacy for their healthcare needs</p>
              <Link href="/register" className="inline-block px-8 py-4 bg-white text-teal-600 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Create an Account
              </Link>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
}