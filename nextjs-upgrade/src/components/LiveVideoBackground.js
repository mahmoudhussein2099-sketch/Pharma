import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LiveVideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Video playback error:', error);
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full h-[900px] overflow-hidden">
      <video 
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/istockphoto-1145285950-640_adpp_is.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/60 to-blue-900/60"></div>
      
      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Welcome to Awon Pharmacy
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Your trusted healthcare partner for all your pharmaceutical needs
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/products" 
              className="px-8 py-4 bg-white text-teal-600 rounded-full font-bold text-lg hover:bg-teal-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now
            </Link>
            <Link 
              to="/prescriptions" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
            >
              Upload Prescription
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveVideoBackground;