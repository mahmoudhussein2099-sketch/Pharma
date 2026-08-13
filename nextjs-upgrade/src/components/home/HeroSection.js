import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {

  return (
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
                to="/products"
                className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-2xl border border-cyan-400/50"
              >
                <span className="relative z-10">Shop Now</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
              </Link>
              <Link 
                to="/prescriptions"
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
  );
};

export default HeroSection;