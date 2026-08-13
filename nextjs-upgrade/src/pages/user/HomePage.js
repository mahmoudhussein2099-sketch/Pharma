import React from 'react';
import UserSidebar from '../../components/dashboard/UserSidebar';
import HeroSection from '../../components/home/HeroSection';
import SearchSection from '../../components/home/SearchSection';
import CategoryGrid from '../../components/home/CategoryGrid';
import BrandShowcase from '../../components/home/BrandShowcase';
import FeaturedCollections from '../../components/home/FeaturedCollections';
import ServicesSection from '../../components/home/ServicesSection';
import ProductShowcase from '../../components/home/ProductShowcase';
import PrescriptionUploadSection from '../../components/home/PrescriptionUploadSection';
import TrustIndicators from '../../components/home/TrustIndicators';
import AppDownload from '../../components/home/AppDownload';
import Newsletter from '../../components/home/Newsletter';

const HomePage = () => {
  return (
    <div className="flex">
      {/* Left Sidebar */}
      <UserSidebar />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Search Bar */}
        <SearchSection />
        
        {/* Category Grid */}
        <CategoryGrid />
        
        {/* Brand Showcase */}
        <BrandShowcase />
        
        {/* Featured Collections */}
        <FeaturedCollections />
        
        {/* Services Section */}
        <ServicesSection />
        
        {/* Product Showcase */}
        <ProductShowcase />
        
        {/* Prescription Upload */}
        <PrescriptionUploadSection />
        
        {/* Trust Indicators */}
        <TrustIndicators />
        
        {/* Newsletter */}
        <Newsletter />
        
        {/* App Download (Floating) */}
        <AppDownload />
      </div>
    </div>
  );
};

export default HomePage;