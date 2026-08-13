import React, { useEffect, useRef } from 'react';

const LiveBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 500; // Increased height for better visual impact
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particles array
    const particlesArray = [];
    const numberOfParticles = 150; // Increased number of particles
    
    // Create particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5})`;
        this.glow = Math.random() > 0.8; // Some particles will glow
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        // Wrap around edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect to some particles
        if (this.glow) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    }
    
    // Create particles
    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    };
    
    init();
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, '#0d9488'); // teal-600
      gradient.addColorStop(0.5, '#0891b2'); // cyan-600
      gradient.addColorStop(1, '#0284c7'); // sky-600
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle wave pattern
      drawWaves();
      
      // Update and draw particles
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect particles with lines
      connectParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Draw wave pattern
    const drawWaves = () => {
      const time = Date.now() * 0.001;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const y = Math.sin(x * 0.01 + time + i) * 20 + (canvas.height * 0.5) + (i * 40);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };
    
    // Connect particles with lines if they are close enough
    const connectParticles = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = 1 - distance / 100;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default LiveBackground;