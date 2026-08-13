import React, { useRef, useEffect } from 'react';

const LiveVideoBackground = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      // Try to play the video
      const playPromise = videoRef.current.play();
      
      // Handle play promise to avoid interruption errors
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Video playback error:', error);
        });
      }
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <video 
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-pharmaceutical-tablets-and-capsules-close-up-footage-22498-large.mp4" type="video/mp4" />
      </video>
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-teal-900/80 to-blue-900/80"></div>
    </div>
  );
};

export default LiveVideoBackground;